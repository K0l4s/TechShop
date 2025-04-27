import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { likeService } from "../../services/LikeService";
import { LikeProduct as Product } from "../../models/LikeProduct";

const LikeProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const data = await likeService.getFavorites();
      console.log("Fetched favorites:", data);
      setProducts(data);
    } catch (error) {
      console.error("Không thể tải sản phẩm yêu thích:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng favorite record id để xóa
  const removeProduct = async (favoriteId: number) => {
    try {
      await likeService.removeFromFavorites(favoriteId);
      setProducts((prev) => prev.filter((product) => product.id !== favoriteId));
    } catch (error) {
      console.error("Không thể xóa sản phẩm yêu thích:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p>Đang tải sản phẩm yêu thích...</p>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {products.length === 0 ? (
        <p className="text-gray-500">Chưa có sản phẩm yêu thích.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id} // sử dụng favorite record id làm key
            className="flex items-center bg-white shadow-md rounded-lg p-4 w-[400px]"
          >
            {/* Placeholder hình ảnh */}
            <div className="w-16 h-16 bg-gray-800 text-white flex items-center justify-center rounded-md font-bold text-sm">
              {product.name ? product.name.split(" ")[0] : "N/A"}
            </div>

            {/* Thông tin sản phẩm (chỉ hiển thị tên và giá gốc) */}
            <div className="flex-1 ml-4">
              <p className="text-base font-semibold">{product.name || "N/A"}</p>
              <p className="text-green-500 font-bold">
                Giá:{" "}
                {product.price !== undefined ? product.price.toLocaleString() : "N/A"}₫
              </p>
            </div>

            {/* Nút xóa yêu thích */}
            <button
              onClick={() => removeProduct(product.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default LikeProduct;
