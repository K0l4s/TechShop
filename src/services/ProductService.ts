import { axiosInstanceAuth } from "../utils/axiosIntance"; // dùng đúng file đã cấu hình

export const ProductService = {
  fetchProducts: async () => {
    const response = await axiosInstanceAuth.get("/api/v1/admin/product");
    return response.data.body;
  },

  addProduct: async (product: FormData) => {
    const response = await axiosInstanceAuth.post(
      "/api/v1/admin/product/create",
      product,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.body;
  },

  updateProduct: async (id: number, data: FormData) => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/product/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.body;
  },
  softDeleteProduct: async (id: number) => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/product/${id}/soft-delete`
    );
    return response.data.body;
  },
  restoreProduct: async (id: number) => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/product/${id}/restore`
    );
    return response.data.body;
  },
  // Update a product variant
  updateProductVariant: async (id: number, data: any) => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/product-variant/update/${id}`,
      data
    );
    return response.data.body;
  },

  // Delete a product variant
  deleteProductVariant: async (id: number) => {
    const response = await axiosInstanceAuth.delete(
      `/api/v1/admin/product-variant/delete/${id}`
    );
    return response.data.body;
  },

  // Update a product attribute
  updateProductAttribute: async (id: number, data: any) => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/product-attribute/update/${id}`,
      data
    );
    return response.data.body;
  },

  // Delete a product attribute
  deleteProductAttribute: async (id: number) => {
    const response = await axiosInstanceAuth.delete(
      `/api/v1/admin/product-attribute/delete/${id}`
    );
    return response.data.body;
  },
};
