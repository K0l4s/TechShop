import { axiosInstance, axiosInstanceAuth } from "../utils/axiosIntance";
import Cookie from "js-cookie";
import { LoginRequest, LoginResponse } from "../models/Auth";


export const dashboardApi = {
    topProducts: async () => {
        try {

            const response = await axiosInstanceAuth.get("/api/v1/admin/dashboard/top-10-products")
            return response.data;

        } catch (error: any) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            throw error;
        }
    },
};
