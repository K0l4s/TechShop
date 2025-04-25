import { useState } from "react";
import {
  Product,
  ProductAttribute,
  ProductImage,
  ProductVariant,
} from "../../../models/Product";
import { ProductService } from "../../../services/ProductService";

interface Props {
  product: Product;
}
const VariantsAttribute = ({ product }: Props) => {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [editingAttr, setEditingAttr] = useState<ProductAttribute | null>(null);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
    null
  );
  const [deletingItem, setDeletingItem] = useState<{
    type: "attribute" | "variant";
    id: string | number;
  } | null>(null);

  const handleEditAttribute = (attr: ProductAttribute) => {
    setEditingAttr({ ...attr });
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant({ ...variant });
  };

  const handleDeleteConfirm = (type: "attribute" | "variant", id: number) => {
    setDeletingItem({ type, id });
  };

  const cancelModals = () => {
    setEditingAttr(null);
    setEditingVariant(null);
    setDeletingItem(null);
  };

  const submitAttributeEdit = async () => {
    if (!editingAttr) return;
    try {
      await ProductService.updateProductAttribute(editingAttr.id, {
        attName: editingAttr.attName,
        attValue: editingAttr.attValue,
      });
      console.log("Sửa thuộc tính thành công!");
      const updatedAttributes = product.attributes.map((attr) =>
        attr.id === editingAttr.id ? editingAttr : attr
      );
      product.attributes = updatedAttributes;
    } catch (error) {
      console.error("Lỗi khi sửa thuộc tính:", error);
    }
    cancelModals();
  };

  const submitVariantEdit = async () => {
    if (!editingVariant) return;
    try {
      await ProductService.updateProductVariant(editingVariant.id, {
        variantName: editingVariant.variantName,
        sku: editingVariant.sku,
        price: editingVariant.price,
        stock: editingVariant.stock,
      });
      console.log("Sửa biến thể thành công!");
      const updatedVariants = product.variants.map((variant) =>
        variant.id === editingVariant.id ? editingVariant : variant
      );
      product.variants = updatedVariants;
    } catch (error) {
      console.error("Lỗi khi sửa biến thể:", error);
    }
    cancelModals();
  };
  const confirmDelete = async () => {
    if (!deletingItem) return;

    try {
      if (deletingItem.type === "attribute") {
        await ProductService.deleteProductAttribute(Number(deletingItem.id));
        console.log("Xóa thuộc tính thành công!");
        product.attributes = product.attributes.filter(
          (attr) => attr.id !== Number(deletingItem.id)
        );
      } else if (deletingItem.type === "variant") {
        await ProductService.deleteProductVariant(Number(deletingItem.id));
        console.log("Xóa biến thể thành công!");
        product.variants = product.variants.filter(
          (variant) => variant.id !== Number(deletingItem.id)
        );
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }

    cancelModals();
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-xl shadow-md">
      {/* Images model */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setSelectedImage(null)} // Đóng khi nhấn nền đen
        >
          <div
            className="relative max-w-[80vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // Ngăn click ảnh bị lan ra ngoài
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.altText || "Hình ảnh sản phẩm"}
              className="w-full h-full object-contain rounded-md"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Images */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Hình Ảnh</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {product.images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.imageUrl}
                alt={image.altText || "Hình ảnh sản phẩm"}
                className="w-full h-32 object-cover rounded-md shadow-sm"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Attribute */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Thuộc Tính</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          {product.attributes.map((attr) => (
            <div
              key={attr.id}
              className="relative p-3 border rounded-md bg-gray-50 shadow-sm"
            >
              <p className="font-medium">Tên: {attr.attName}</p>
              <p className="font-medium">Giá trị: {attr.attValue}</p>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEditAttribute(attr)}
                  className="text-blue-500 text-sm"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDeleteConfirm("attribute", attr.id)}
                  className="text-red-500 text-sm"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Các Biến Thể
        </h3>
        <div className="space-y-4">
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className="relative border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                <p>
                  <span className="font-medium">SKU:</span> {variant.sku}
                </p>
                <p>
                  <span className="font-medium">Tên:</span>{" "}
                  {variant.variantName}
                </p>
                <p>
                  <span className="font-medium">Giá:</span>{" "}
                  {variant.price.toLocaleString("vi-VN")} VND
                </p>
                <p>
                  <span className="font-medium">Số lượng:</span> {variant.stock}
                </p>
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEditVariant(variant)}
                  className="text-blue-500 text-sm"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDeleteConfirm("variant", variant.id)}
                  className="text-red-500 text-sm"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal sửa thuộc tính */}
      {editingAttr && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Sửa Thuộc Tính</h2>
            <input
              className="w-full border rounded p-2 mb-3"
              placeholder="Tên"
              value={editingAttr.attName}
              onChange={(e) =>
                setEditingAttr({ ...editingAttr, attName: e.target.value })
              }
            />
            <input
              className="w-full border rounded p-2 mb-4"
              placeholder="Giá trị"
              value={editingAttr.attValue}
              onChange={(e) =>
                setEditingAttr({ ...editingAttr, attValue: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button onClick={cancelModals} className="text-gray-500">
                Hủy
              </button>
              <button
                onClick={submitAttributeEdit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal sửa biến thể */}
      {editingVariant && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Sửa Biến Thể</h2>
            <input
              className="w-full border rounded p-2 mb-3"
              placeholder="Tên biến thể"
              value={editingVariant.variantName}
              onChange={(e) =>
                setEditingVariant({
                  ...editingVariant,
                  variantName: e.target.value,
                })
              }
            />
            <input
              className="w-full border rounded p-2 mb-3"
              placeholder="SKU"
              value={editingVariant.sku}
              onChange={(e) =>
                setEditingVariant({ ...editingVariant, sku: e.target.value })
              }
            />
            <input
              className="w-full border rounded p-2 mb-3"
              type="number"
              placeholder="Giá"
              value={editingVariant.price}
              onChange={(e) =>
                setEditingVariant({ ...editingVariant, price: +e.target.value })
              }
            />
            <input
              className="w-full border rounded p-2 mb-4"
              type="number"
              placeholder="Số lượng"
              value={editingVariant.stock}
              onChange={(e) =>
                setEditingVariant({ ...editingVariant, stock: +e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button onClick={cancelModals} className="text-gray-500">
                Hủy
              </button>
              <button
                onClick={submitVariantEdit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Xóa */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">
            <p className="text-lg">
              Bạn có chắc muốn xóa{" "}
              {deletingItem.type === "attribute" ? "thuộc tính" : "biến thể"}{" "}
              này không?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={cancelModals}
                className="px-4 py-1 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantsAttribute;
