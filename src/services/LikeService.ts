import { axiosInstanceAuth } from "../utils/axiosIntance";

export const LikeService = {
  // Lấy danh sách sản phẩm yêu thích của người dùng (userId có thể truyền vào)
  getFavorites: async (userId: number) => {
    const response = await axiosInstanceAuth.get(`/api/v1/product/favorites?userId=${userId}`);
    // Giả sử backend trả về kết quả trong response.data.body
    return response.data.body;
  },

  // Xoá sản phẩm khỏi danh sách yêu thích dựa theo favorite_id
  deleteFavorite: async (favoriteId: number) => {
    const response = await axiosInstanceAuth.delete(`/api/v1/product/favorites/${favoriteId}`);
    return response.data;
  }
};