import { axiosInstance } from "../utils/axiosIntance";
import Cookie from "js-cookie";
import { RegisterRequest, RegisterResponse, VerifyOTPRequest, VerifyOTPResponse } from "../models/Auth";
import { LoginRequest, LoginResponse } from "../models/Auth";


export const authenticateApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log("📢 Đang gửi request đăng nhập:", data);
      const response = await axiosInstance.post<LoginResponse>(
        `/api/v1/auth/login`,
        data
      );

      console.log("✅ Đăng nhập thành công:", response.data);

      if (response.data.accessToken) {
        Cookie.set("token", response.data.accessToken, { expires: 7 });
        console.log("🔑 Token đã được lưu:", response.data.accessToken);
      }

      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
      throw error;
    }
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      console.log("📢 Đang gửi request đăng ký:", data);
      const response = await axiosInstance.post<RegisterResponse>(
        `/api/v1/auth/register`,
        data
      );

      console.log("✅ Phản hồi từ server:", response.data);

      if (response.data.token) {
        Cookie.set("token", response.data.token, { expires: 7 });
        console.log("🔑 Token đã được lưu:", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi đăng ký:", error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    return axiosInstance.get(`/api/v1/demo`);
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    try {
      console.log(`📢 Xác thực mã OTP cho: ${data.email}`);
      const response = await axiosInstance.put<VerifyOTPResponse>(
        `/api/v1/auth/check-code`,
        data
      );

      console.log("✅ Xác thực thành công!");
      return response.data;
    } catch (error: any) {
      console.error("❌ Xác thực thất bại:", error.response?.data || error.message);
      return { message: "Xác thực thất bại" };
    }
  },
};
