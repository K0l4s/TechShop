import { axiosInstance } from "../utils/axiosIntance";
import Cookie from "js-cookie";
import { RegisterRequest, RegisterResponse, VerifyOTPRequest, VerifyOTPResponse, ForgotPasswordRequest, ForgotPasswordResponse } from "../models/Auth";
import { LoginRequest, LoginResponse, ResetPasswordRequest } from "../models/Auth";


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

  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    try {
      console.log("🔐 Gửi yêu cầu đặt lại mật khẩu:", data);
      const response = await axiosInstance.put<{ message: string }>(
        `/api/v1/auth/reset-password`,
        data
      );
      console.log("✅ Đặt lại mật khẩu thành công:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi đặt lại mật khẩu:", error.response?.data || error.message);
      throw error;
    }
  },  
  

  forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      console.log("📧 Gửi yêu cầu quên mật khẩu:", data);
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        `/api/v1/auth/forgot-password`,
        data
      );
      console.log("✅ Gửi email thành công:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi gửi email:", error.response?.data || error.message);
      throw error;
    }
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
