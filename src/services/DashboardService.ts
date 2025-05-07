import {  axiosInstance, axiosInstanceAuth } from "../utils/axiosIntance";


export const dashboardApi = {
    topProducts: async () => {
        try {

            const response = await axiosInstance.get("/api/v1/admin/product/top-10-products")
            return response.data;

        } catch (error: any) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            throw error;
        }
    },
    getTotalTodayOrders: async () => {
        try {
            const response = await axiosInstanceAuth.get("/api/v1/orders/day")
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            throw error;
        }
    },
    getTotalBetweenOrders: async (startDate: string, endDate:string) => {
        try {
            const response = await axiosInstanceAuth.get("/api/v1/orders/time?startDate=" + startDate + "&endDate=" + endDate)
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            throw error;
        }
    },
    getTotalOrders: async (startDate: string, endDate:string) => {
        try {
            const response = await axiosInstanceAuth.get("/api/v1/orders/stats?startDate=" + startDate + "&endDate=" + endDate)
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            throw error;
        }
    }
};
