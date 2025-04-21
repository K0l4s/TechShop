import { axiosInstanceAuth } from "../utils/axiosIntance";
import { GetUserProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from "../models/UserProfile";

// Ở đây, chúng ta luôn dùng userId là 5 để test
const TEST_USER_ID = 5;

export const userInformationService = {
  // Lấy thông tin user: GET /api/v1/users/profile/5
  getMyProfile: async (): Promise<GetUserProfileResponse> => {
    try {
      const response = await axiosInstanceAuth.get(`/api/v1/users/profile/${TEST_USER_ID}`);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy thông tin người dùng:", error.response?.data || error);
      throw error;
    }
  },

  // Cập nhật thông tin user: PUT /api/v1/users/profile/update/5
  updateMyProfile: async (
    data: UpdateUserProfileRequest
  ): Promise<UpdateUserProfileResponse> => {
    try {
      const response = await axiosInstanceAuth.put(`/api/v1/users/profile/update/${TEST_USER_ID}`, data);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error.response?.data || error);
      throw error;
    }
  },
};
