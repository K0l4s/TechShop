import React, { useState } from "react";
import { ProductService } from "../../../services/ProductService";
import { AddProductProps } from "../../../models/Product";

const AddProduct: React.FC<AddProductProps> = ({
  handleClose,
  setProducts,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    salePrice: 0,
    stock: 0,
    categoryId: 0,
    brandId: 0,
    active: true,
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [attributes, setAttributes] = useState<
    { attName: string; attValue: string }[]
  >([]);
  const [variants, setVariants] = useState<
    { sku: string; variantName: string; price: number; stock: number }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "active" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : ["price", "salePrice", "stock", "categoryId", "brandId"].includes(
              name
            )
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { attName: "", attValue: "" }]);
  };

  const handleAttributeChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...attributes];
    updated[index][field as "attName" | "attValue"] = value;
    setAttributes(updated);
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { sku: "", variantName: "", price: 0, stock: 0 },
    ]);
  };

  const handleVariantChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...variants];
    updated[index][field as keyof (typeof variants)[number]] = value as never;
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });

    if (images) {
      Array.from(images).forEach((img) => {
        formDataToSend.append("images", img);
      });
    }

    if (attributes.length > 0) {
      formDataToSend.append("attributesJson", JSON.stringify(attributes));
    }

    if (variants.length > 0) {
      formDataToSend.append("variantsJson", JSON.stringify(variants));
    }

    try {
      const newProduct = await ProductService.addProduct(formDataToSend);
      setProducts((prev) => [...prev, newProduct]);
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto">
      <div className="bg-white w-full max-w-3xl mt-10 mb-10 p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Thêm Sản Phẩm
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Tên Sản Phẩm", name: "name", type: "text" },
              { label: "Số Lượng", name: "stock", type: "number" },
              { label: "Giá", name: "price", type: "number" },
              { label: "Giá Khuyến Mãi", name: "salePrice", type: "number" },
              { label: "Danh Mục", name: "categoryId", type: "number" },
              { label: "Thương Hiệu", name: "brandId", type: "number" },
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

export default AddProduct;
