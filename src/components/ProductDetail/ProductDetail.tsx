import React from "react";

interface ProductDetailProps {
  product: {
    name: string;
    price: number;
    image: string;
    description: string;
  };
  similarProducts: { id: number; name: string; price: string; image: string }[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, similarProducts }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <img src={product.image} alt={product.name} className="w-full max-w-xs h-auto object-contain rounded-lg mx-auto" />
      <h2 className="text-2xl font-bold text-red-600 mt-4">{product.name}</h2>
      <p className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()}đ</p>

      <div className="flex justify-center space-x-4 mt-4">
        <button className="bg-red-500 text-white px-6 py-2 font-bold rounded-lg">Yêu thích</button>
        <button className="bg-yellow-500 text-white px-6 py-2 font-bold rounded-lg">Giỏ hàng</button>
        <button className="bg-green-500 text-white px-6 py-2 font-bold rounded-lg">Đặt hàng</button>
      </div>

      <div className="text-left mt-6 px-6">
        <h3 className="text-lg font-bold">Thông tin sản phẩm:</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="text-left mt-6 px-6">
        <h3 className="text-lg font-bold">Đánh giá & Nhận xét:</h3>
        <div className="mt-3">
          <p className="flex items-center">
            <span className="text-xl">⭐️⭐️⭐️⭐️⭐️</span>
            <span className="ml-2 font-semibold">Paul</span>
          </p>
          <p className="text-gray-600">Sản phẩm tốt</p>
        </div>
        <div className="mt-3">
          <p className="flex items-center">
            <span className="text-xl">⭐️⭐️⭐️</span>
            <span className="ml-2 font-semibold">David</span>
          </p>
          <p className="text-gray-600">Sản phẩm bình thường</p>
        </div>
      </div>

      <div className="text-left mt-6 px-6">
        <h3 className="text-lg font-bold text-center">Sản phẩm tương tự</h3>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {similarProducts.map((sp) => (
            <div key={sp.id} className="border p-4 text-center rounded-lg">
              <img src={sp.image} alt={sp.name} className="w-full h-24 object-cover rounded" />
              <p className="text-gray-700 mt-2">{sp.name}</p>
              <p className="text-red-600 font-bold">{sp.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
