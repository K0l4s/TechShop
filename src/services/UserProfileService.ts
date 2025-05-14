// src/services/ProfileService.ts

import { axiosInstanceAuth } from "../utils/axiosIntance";

export const ProfileService = {
  // Lấy thông tin profile của người dùng dựa vào userId - mặc định nếu không truyền là 5
  getProfile: async (userId: number = 5): Promise<any> => {
    try {
      const response = await axiosInstanceAuth.get(`/api/v1/users/profile/${userId}`);
      console.log("getProfile response:", response.data);
      // Kiểm tra các cấu trúc dữ liệu khác nhau: nếu có response.data.body hoặc response.data.data thì dùng chúng, còn không trả về response.data
      return response.data.body || response.data.data || response.data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  },

  // Cập nhật thông tin profile của người dùng với userId mặc định là 5 nếu không truyền vào
  updateProfile: async (userId: number = 5, profileData: any): Promise<any> => {
    try {
      const response = await axiosInstanceAuth.put(`/api/v1/users/profile/update/${userId}`, profileData);
      return response.data.body || response.data.data || response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  }
};
