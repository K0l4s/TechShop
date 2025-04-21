import React, { useState, useEffect } from "react";
import HinhQuangCao from "../../assets/HinhQuangCaoDoc.jpg";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../services/CartService";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartService.getCart();
        // Nếu API trả về đối tượng có chứa key "items" (ví dụ: { items: [...] })
        const productData = Array.isArray(response)
          ? response
          : response.items || [];
        setProducts(productData);
      } catch (error) {
        console.error("Lỗi khi load giỏ hàng", error);
        // Có thể set thêm state lỗi để hiển thị thông báo
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleSelectAll = async () => {
    try {
      if (selectedProducts.length === 0) {
        const response = await cartService.selectAllItems(); // API chọn tất cả
        setSelectedProducts(
          response.selectedProductIds || products.map((p) => p.id)
        );
      } else {
        await cartService.deselectAllItems(); // API bỏ chọn tất cả
        setSelectedProducts([]);
      }
    } catch (error) {
      console.error("Lỗi khi chọn/bỏ chọn tất cả sản phẩm", error);
    }
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id]
    );
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearAll(); // API xóa toàn bộ giỏ hàng
      setProducts([]);
      setSelectedProducts([]);
    } catch (error) {
      console.error("Lỗi khi xóa tất cả sản phẩm trong giỏ hàng", error);
    }
  };

  const handleQuantityChange = async (id: number, delta: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );

    try {
      if (delta > 0) {
        await cartService.incrementItemQuantity(id);
      } else {
        await cartService.decrementItemQuantity(id);
      }
    } catch (error) {
      console.error("Cập nhật số lượng thất bại", error);
    }
  };

  const handleRemoveProduct = async (id: number) => {
    try {
      await cartService.deleteCartItem(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((pid) => pid !== id)
      );
    } catch (error) {
      console.error("Xóa sản phẩm thất bại", error);
    }
  };

  const totalAmount = products
    .filter((p) => selectedProducts.includes(p.id))
    .reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <p className="text-center text-xl font-semibold">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-3 gap-6">
      {/* Bên trái: Giỏ hàng */}
      <div className="col-span-2">
        {/* Header giỏ hàng */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Giỏ hàng</h2>
        </div>
        <div className="flex justify-between mb-2">
          <button
            onClick={handleSelectAll}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {products.length === 0 || selectedProducts.length === 0
              ? "Chọn tất cả"
              : "Bỏ chọn tất cả"}
          </button>

          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Xóa tất cả
          </button>
        </div>

        {/* Tiêu đề cột (chỉ hiển thị khi có sản phẩm) */}
        {products.length > 0 && (
          <div className="grid grid-cols-5 gap-4 font-bold bg-gray-200 p-3 rounded-lg">
            <div className="flex flex-col col-span-2 items-center">
              <span>Sản phẩm</span>
            </div>
            <span className="text-center">Đơn giá</span>
            <span className="text-center">Số lượng</span>
            <span className="text-center">Thành tiền</span>
          </div>
        )}

        {/* Danh sách sản phẩm hoặc thông báo giỏ hàng rỗng */}
        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="p-4 text-center text-lg font-medium">
              Giỏ hàng của bạn đang trống!
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-5 gap-4 items-center border p-4 rounded-lg shadow"
              >
                {/* Ảnh + tên sản phẩm */}
                <div className="flex items-center col-span-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="w-5 h-5 rounded-full accent-blue-500 mr-4"
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>

                {/* Đơn giá */}
                <p className="text-center">
                  {product.price.toLocaleString()}đ
                </p>

                {/* Số lượng có nút tăng giảm */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="bg-gray-300 text-black px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-center">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="bg-gray-300 text-black px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  {/* Nút Xóa */}
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-blue-400 text-sm hover:text-blue-600"
                  >
                    Xóa
                  </button>
                </div>

                {/* Thành tiền */}
                <p className="text-center font-bold text-red-500">
                  {(product.price * product.quantity).toLocaleString()}đ
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bên phải: Thanh toán + Hình quảng cáo */}
      <div className="flex flex-col space-y-4">
        {/* Thanh toán */}
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-lg font-bold">Thanh toán</h3>
          <p className="text-xl font-bold text-red-500">
            Tổng cộng: {totalAmount.toLocaleString()}đ
          </p>
          <button
            disabled={selectedProducts.length === 0}
            onClick={() => navigate("/order-confirmation")}
            className="bg-green-500 text-white font-bold px-4 py-2 rounded w-full mt-2"
          >
            Đặt hàng
          </button>
        </div>

        {/* Hình quảng cáo */}
        <img
          src={HinhQuangCao}
          alt="Quảng cáo"
          style={{ width: "100%", height: "475px", objectFit: "cover" }}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Cart;
