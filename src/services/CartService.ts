import { axiosInstance } from "../utils/axiosIntance";

export const cartService = {
  getCart: async () => {
    try {
      const response = await axiosInstance.get("http://localhost:9099/api/v1/cart");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin giỏ hàng:", error);
      throw error;
    }
  },

  addToCart: async (productId: string, quantity: number): Promise<any> => {
    try {
      const response = await axiosInstance.post("http://localhost:9099/api/v1/cart/add", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      throw error;
    }
  },  

  updateItemQuantity: async (productId: number, quantity: number) => {
    try {
      const response = await axiosInstance.post("http://localhost:9099/api/v1/cart/update", {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi cập nhật số lượng sản phẩm:", error);
      throw error;
    }
  },
  
  deleteCartItem: async (id: number) => {
    try {
      const response = await axiosInstance.post(`http://localhost:9099/api/v1/cart/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
      throw error;
    }
  },

  deselectAllItems: async () => {
    try {
      const response = await axiosInstance.post("http://localhost:9099/api/v1/cart/deselect-all");
      return response.data;
    } catch (error) {
      console.error("Lỗi bỏ chọn tất cả sản phẩm:", error);
      throw error;
    }
  },

  selectAllItems: async () => {
    try {
      const response = await axiosInstance.post("http://localhost:9099/api/v1/cart/select-all");
      return response.data;
    } catch (error) {
      console.error("Lỗi chọn tất cả sản phẩm:", error);
      throw error;
    }
  },

  clearAll: async () => {
    try {
      const response = await axiosInstance.post("http://localhost:9099/api/v1/cart/clear");
      return response.data;
    } catch (error) {
      console.error("Lỗi xóa toàn bộ giỏ hàng:", error);
      throw error;
    }
  },

  // Tăng số lượng sản phẩm
  incrementItemQuantity: async (id: number) => {
    try {
      const response = await axiosInstance.post(`http://localhost:9099/api/v1/cart/${id}/increment`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tăng số lượng sản phẩm:", error);
      throw error;
    }
  },

  // Giảm số lượng sản phẩm
  decrementItemQuantity: async (id: number) => {
    try {
      const response = await axiosInstance.post(`http://localhost:9099/api/v1/cart/${id}/decrement`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi giảm số lượng sản phẩm:", error);
      throw error;
    }
  },
};
