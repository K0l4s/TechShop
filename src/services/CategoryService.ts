import { axiosInstanceAuth } from "../utils/axiosIntance";

export const CategoryService = {
    fetchCategory: async () => {
        const response = await axiosInstanceAuth.get("/api/v1/admin/category");
        return response.data.body;
    },

    addCategory: async (category: { name: string }) => {
        const response = await axiosInstanceAuth.post(
            "/api/v1/admin/category",
            category,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.body;
    },

    updateCategory: async (id: number, data: any) => {
        const response = await axiosInstanceAuth.put(
            `/api/v1/admin/category/${id}`,
            data,
        );
        return response.data.body;
    },

    softDeleteCategory: async (id: number) => {
        const response = await axiosInstanceAuth.put(
            `/api/v1/admin/category/${id}/soft-delete`
        );
        return response.data.body;
    },

};
