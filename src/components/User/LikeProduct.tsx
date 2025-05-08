import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { LikeService } from "../../services/LikeService"; // điều chỉnh đường dẫn nếu cần

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  favorite_id?: number; // nếu API không trả về trường này, biến thành optional
  id: number;
  name: string;
  price: string; // ví dụ: "100000"
  image?: string;
}

const LikeProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái tải

  // Hàm định dạng giá tiền: "100000" --> "100.000 VNĐ"
  const formatPrice = (price: string) => {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("vi-VN") + " VNĐ";
  };

  // Hàm lấy danh sách sản phẩm yêu thích từ API
  const fetchFavorites = async () => {
    try {
      setLoading(true); // Bắt đầu tải dữ liệu
      const data = await LikeService.getFavorites(1);
      // Nếu một sản phẩm không có favorite_id, dùng giá trị của id làm fallback
      const formattedData = data.map((item: any) => ({
        ...item,
        favorite_id: item.favorite_id || item.id,
      }));
      setProducts(formattedData);
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error.message || error);
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  // Gọi API ngay khi component được mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Hàm xoá sản phẩm khỏi danh sách yêu thích
  const removeProduct = async (favoriteId: number | undefined) => {
    if (!favoriteId) {
      console.error("Favorite id is undefined, không thể xoá sản phẩm này");
      return;
    }
    try {
      await LikeService.deleteFavorite(favoriteId);
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => (product.favorite_id || product.id) !== favoriteId
        )
      );
    } catch (error: any) {
      console.error(
        "Lỗi khi xoá sản phẩm yêu thích:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {loading ? (
        <p className="text-lg font-medium">Đang tải danh sách sản phẩm...</p>
      ) : products.length === 0 ? (
        <p className="text-lg font-medium text-gray-500">
          Không có sản phẩm yêu thích
        </p>
      ) : (
        products.map((product) => {
          // Đảm bảo mỗi phần tử có key duy nhất
          const uniqueKey = product.favorite_id || product.id;
          return (
            <div
              key={uniqueKey}
              className="flex items-center bg-white shadow-md rounded-lg p-4 w-[400px]"
            >
              {/* Hiển thị thông tin sản phẩm */}
              <div className="flex-1 ml-4">
                <p className="text-lg font-medium">{product.name}</p>
                <p className="text-red-500 font-semibold">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Icon thùng rác để xoá sản phẩm */}
              <button
                onClick={() => removeProduct(product.favorite_id || product.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={18} />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LikeProduct;
