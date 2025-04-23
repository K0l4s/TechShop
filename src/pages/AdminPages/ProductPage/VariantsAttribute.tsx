import { Product } from "../../../models/Product";

interface Props {
  product: Product;
}

const VariantsAttribute = ({ product }: Props) => {
  return (
    <div className="space-y-4">
      {/* Ảnh sản phẩm */}
      <div>
        <h3 className="font-semibold">Ảnh Sản Phẩm:</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          {product.images.map((img) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt={img.altText}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* Thuộc tính */}
      <div>
        <h3 className="font-semibold">Thuộc Tính:</h3>
        <ul className="list-disc list-inside">
          {product.attributes.map((attr) => (
            <li key={attr.id}>
              <strong>{attr.attName}:</strong> {attr.attValue}
            </li>
          ))}
        </ul>
      </div>

      {/* Biến thể */}
      <div>
        <h3 className="font-semibold">Các Biến Thể:</h3>
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className="border p-3 rounded-lg mb-2 bg-gray-50"
          >
            <p>
              <strong>SKU:</strong> {variant.sku}
            </p>
            <p>
              <strong>Tên Biến Thể:</strong> {variant.variantName}
            </p>
            <p>
              <strong>Giá:</strong> {variant.price.toLocaleString("vi-VN")} VND
            </p>
            <p>
              <strong>Số lượng:</strong> {variant.stock}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantsAttribute;
