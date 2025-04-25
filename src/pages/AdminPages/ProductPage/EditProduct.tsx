import React, { useState, useEffect } from "react";
import { ProductService } from "../../../services/ProductService";
import { Product, EditProductProps } from "../../../models/Product";

const EditProduct: React.FC<EditProductProps> = ({
  product,
  handleClose,
  setProducts,
}) => {
  const [formData, setFormData] = useState<Product>({ ...product });
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  // Lưu trữ dữ liệu ban đầu
  const [initialAttributes] = useState(product.attributes || []);
  const [initialVariants] = useState(product.variants || []);

  // Dữ liệu hiện tại (bao gồm cả mới thêm)
  const [attributes, setAttributes] = useState(product.attributes || []);
  const [variants, setVariants] = useState(product.variants || []);

  useEffect(() => {
    setFormData({ ...product });
    setAttributes(product.attributes || []);
    setVariants(product.variants || []);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAttributeChange = (index: number, key: string, value: string) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [key]: value };
    setAttributes(updatedAttributes);
  };

  const handleVariantChange = (
    index: number,
    key: keyof Product["variants"][number],
    value: string | number
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [key]: value };
    setVariants(updatedVariants);
  };

  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      { id: Date.now(), attName: "", attValue: "" },
    ]);
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now(), sku: "", variantName: "", price: 0, stock: 0 },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = new FormData();

    // Gửi thông tin cơ bản
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price.toString());
    if (formData.salePrice !== undefined) {
      productData.append("salePrice", formData.salePrice.toString());
    }
    productData.append("stock", formData.stock.toString());
    productData.append("categoryId", formData.categoryId.toString());
    productData.append("brandId", formData.brandId.toString());

    // Gửi ảnh nếu có
    if (images && images.length > 0) {
      Array.from(images).forEach((image) => {
        productData.append("images", image);
      });
    }

    // Chỉ gửi attributes mới
    const newAttributes = attributes
      .filter(
        (attr) =>
          !initialAttributes.some(
            (initialAttr) =>
              initialAttr.attName === attr.attName &&
              initialAttr.attValue === attr.attValue
          )
      )
      .map(({ attName, attValue }) => ({ attName, attValue }));
    if (newAttributes.length > 0) {
      productData.append("attributesJson", JSON.stringify(newAttributes));
    }

    // Chỉ gửi variants mới
    const newVariants = variants
      .filter(
        (variant) =>
          !initialVariants.some(
            (initialVariant) =>
              initialVariant.sku === variant.sku &&
              initialVariant.variantName === variant.variantName &&
              initialVariant.price === variant.price &&
              initialVariant.stock === variant.stock
          )
      )
      .map(({ sku, variantName, price, stock }) => ({
        sku,
        variantName,
        price,
        stock,
      }));
    if (newVariants.length > 0) {
      productData.append("variantsJson", JSON.stringify(newVariants));
    }
    // In dữ liệu ra console
    console.log("Dữ liệu gửi đi:");
    for (const [key, value] of productData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const updatedProduct = await ProductService.updateProduct(
        product.id,
        productData
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto">
      <div className="bg-white w-full max-w-3xl mt-10 mb-10 p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sửa Sản Phẩm
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Tên Sản Phẩm", name: "name", type: "text" },
              { label: "Số Lượng", name: "stock", type: "number" },
              { label: "Giá", name: "price", type: "number" },
              { label: "Giá Khuyến Mãi", name: "salePrice", type: "number" },
              { label: "Danh Mục", name: "categoryId", type: "text" },
              { label: "Thương Hiệu", name: "brandId", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={String(formData[name as keyof typeof formData] ?? "")}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Mô Tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              rows={4}
              placeholder="Mô tả sản phẩm..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Ảnh Sản Phẩm
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="block text-sm font-semibold text-gray-700">
              Thuộc Tính (Attributes)
            </legend>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-4 mt-2 items-center">
                <input
                  type="text"
                  placeholder="Tên thuộc tính"
                  value={attr.attName}
                  onChange={(e) =>
                    handleAttributeChange(index, "attName", e.target.value)
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Giá trị"
                  value={attr.attValue}
                  onChange={(e) =>
                    handleAttributeChange(index, "attValue", e.target.value)
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAttribute}
              className="mt-3 px-4 py-2 text-sm bg-white text-black border border-black rounded-lg hover:bg-gray-100"
            >
              Thêm Attribute
            </button>
          </fieldset>

          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="block text-sm font-semibold text-gray-700">
              Biến Thể (Variants)
            </legend>
            {variants.map((variant, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2"
              >
                <input
                  type="text"
                  placeholder="SKU"
                  value={variant.sku}
                  onChange={(e) =>
                    handleVariantChange(index, "sku", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Tên biến thể"
                  value={variant.variantName}
                  onChange={(e) =>
                    handleVariantChange(index, "variantName", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Giá"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", Number(e.target.value))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Tồn kho"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", Number(e.target.value))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVariant}
              className="mt-3 px-4 py-2 text-sm bg-white text-black border border-black rounded-lg hover:bg-gray-100"
            >
              Thêm Variant
            </button>
          </fieldset>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Lưu Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProduct;
