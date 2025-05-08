// src/services/ProfileService.ts

import { axiosInstanceAuth } from "../utils/axiosIntance";

export const ProfileService = {
  // Lấy thông tin profile của người dùng dựa vào userId  
  getProfile: async (userId: number): Promise<any> => {
    try {
      const response = await axiosInstanceAuth.get(`/api/v1/users/profile/${userId}`);
      console.log("getProfile response:", response.data);
      // Kiểm tra các cấu trúc dữ liệu khác nhau:
      // Nếu API bọc dữ liệu trong body, data hoặc trả về trực tiếp dữ liệu
      return response.data.body || response.data.data || response.data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  },

  // Cập nhật thông tin profile của người dùng
  updateProfile: async (userId: number, profileData: any): Promise<any> => {
    try {
      const response = await axiosInstanceAuth.put(`/api/v1/users/profile/update/${userId}`, profileData);
      return response.data.body || response.data.data || response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  }
};
