import { axiosInstance } from "../utils/axiosIntance";
import { axiosInstanceAuth } from "../utils/axiosIntance";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Chạy: npm install jwt-decode nếu chưa có
import {
  RegisterRequest,
  RegisterResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
} from "../models/Auth";

export const authenticateApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log("📢 Đang gửi request đăng nhập:", data);
      const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/login", data);
      console.log("✅ Đăng nhập thành công:", response.data);

      if (response.data.accessToken) {
        // Lưu token vào cookie với option path: "/" để các request sau có thể truy cập
        Cookie.set("token", response.data.accessToken, { expires: 7, path: "/" });
        console.log("🔑 Token đã được lưu:", response.data.accessToken);
      } else {
        throw new Error("Không nhận được token từ backend");
      }

      // Nếu có thông tin user trong response, lưu luôn user_id
      if ((response.data as any).user && (response.data as any).user.id) {
        const loginUser = (response.data as any).user;
        localStorage.setItem("userId", loginUser.id.toString());
        console.log("🆔 User ID đã được lưu từ login response:", loginUser.id);
      } else {
        // Nếu không có, cố gắng giải mã token để lấy user id
        try {
          const decoded: any = jwtDecode(response.data.accessToken);
          if (decoded && decoded.id) {
            localStorage.setItem("userId", decoded.id.toString());
            console.log("🆔 User ID đã được lưu từ token decode:", decoded.id);
          } else if (decoded && decoded.sub) {
            // Nếu token chỉ chứa sub (email), lưu email vào localStorage
            localStorage.setItem("userEmail", decoded.sub);
            console.warn("Token chỉ chứa sub (email); đã lưu vào userEmail:", decoded.sub);
          } else {
            console.warn("Không tìm thấy thông tin user từ token decode");
          }
        } catch (e) {
          console.warn("Không thể giải mã token để lấy user id:", e);
        }
      }

      // Reload lại trang để đảm bảo các component sau có thể đọc được giá trị mới trong localStorage
      window.location.reload();

      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
      throw error;
    }
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      console.log("📢 Đang gửi request đăng ký:", data);
      const response = await axiosInstance.post<RegisterResponse>("/api/v1/auth/register", data);
      console.log("✅ Phản hồi từ server:", response.data);
      if (response.data.token) {
        Cookie.set("token", response.data.token, { expires: 7, path: "/" });
        console.log("🔑 Token đã được lưu:", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi đăng ký:", error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    return axiosInstance.get("/api/v1/demo");
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    try {
      console.log(`📢 Xác thực mã OTP cho: ${data.email}`);
      const response = await axiosInstance.put<VerifyOTPResponse>("/api/v1/auth/check-code", data);
      console.log("✅ Xác thực thành công!");
      return response.data;
    } catch (error: any) {
      console.error("❌ Xác thực thất bại:", error.response?.data || error.message);
      return { message: "Xác thực thất bại" };
    }
  },
};
