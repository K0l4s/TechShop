import { axiosInstanceAuth } from "../utils/axiosIntance"; // dùng đúng file đã cấu hình

export const ProductService = {
  fetchProducts: async () => {
    const response = await axiosInstanceAuth.get("/api/v1/admin/product");
    return response.data.body;
  },

  addProduct: async (product: any) => {
    const response = await axiosInstanceAuth.post(
      "/api/v1/admin/product",
      product
    );
    return response.data.body;
  },

  updateProduct: async (id: number, product: any) => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/product/${id}`,
      product
    );
    return response.data.body;
  },

  deleteProduct: async (id: number) => {
    await axiosInstanceAuth.delete(`/api/v1/admin/product/${id}`);
  },
};
