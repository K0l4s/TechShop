import { axiosInstance, axiosInstanceAuth } from "../utils/axiosIntance";


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
    getTotalTodayOrders: async () => {
        try {
            const response = await axiosInstance.get("/api/v1/orders/day")
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            throw error;
        }
    }
};
