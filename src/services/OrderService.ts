import { axiosInstanceAuth } from "../utils/axiosIntance";
export const OrderService = {
    fetchOrders: async () => {
        const response = await axiosInstanceAuth.get("/api/v1/admin/orders?status=ALL&page=0&size=10");
        return response.data.body;
    },

    updateOrderStatus: async (orderId: number, newStatus: string) => {
        const response = await axiosInstanceAuth.put(
            `/api/v1/admin/orders/${orderId}/status?status=${newStatus}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer token"
                },
            }
        );
        return response.data.body;
    }

};