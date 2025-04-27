import { axiosInstanceAuth } from "../utils/axiosIntance";
import { GetUserProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from "../models/UserProfile";

const getUserIdFromStorage = (): string => {
  // Nếu không tìm thấy userId, trả về default "5"
  return localStorage.getItem("userId") || "5";
};

export const userInformationService = {
  // Lấy thông tin user dựa trên userId
  getMyProfile: async (): Promise<GetUserProfileResponse> => {
    const userId = getUserIdFromStorage();
    try {
      const response = await axiosInstanceAuth.get(`/api/v1/users/profile/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy thông tin người dùng:", error.response?.data || error);
      throw error;
    }
  },

  // Cập nhật thông tin user dựa trên userId
  updateMyProfile: async (data: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
    const userId = getUserIdFromStorage();
    try {
      const response = await axiosInstanceAuth.put(`/api/v1/users/profile/update/${userId}`, data);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error.response?.data || error);
      throw error;
    }
  },
};
