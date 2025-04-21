import { axiosInstanceAuth } from "../utils/axiosIntance";
import { LikeProduct } from "../models/LikeProduct";

export const likeService = {
  /**
   * Lấy danh sách sản phẩm yêu thích từ backend
   * Endpoint: GET http://localhost:9099/api/v1/product/favorites
   */
  getFavorites: async (): Promise<LikeProduct[]> => {
    try {
      const response = await axiosInstanceAuth.get(`/api/v1/product/favorites`);
      console.log("getFavorites response:", response.data);
      // Giả sử API trả về dữ liệu dạng { success: true, data: LikeProduct[] }
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error.response?.data || error);
      throw error;
    }
  },

  /**
   * Thêm sản phẩm vào danh sách yêu thích
   * Endpoint: POST http://localhost:9099/api/v1/product/favorites
   * Body: { product_id: number }
   */
  addToFavorites: async (productId: number): Promise<{ success: boolean; message: string; data: LikeProduct[] }> => {
    try {
      const response = await axiosInstanceAuth.post(`/api/v1/product/favorites`, { product_id: productId });
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi thêm sản phẩm có ID ${productId} vào yêu thích:`, error.response?.data || error);
      throw error;
    }
  },

  /**
   * Xóa sản phẩm khỏi danh sách yêu thích
   * Endpoint: DELETE http://localhost:9099/api/v1/product/favorites/{productId}
   */
  removeFromFavorites: async (productId: number): Promise<{ success: boolean; message: string; data: LikeProduct[] }> => {
    try {
      const response = await axiosInstanceAuth.delete(`/api/v1/product/favorites/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa sản phẩm có ID ${productId} khỏi danh sách yêu thích:`, error.response?.data || error);
      throw error;
    }
  },
};
