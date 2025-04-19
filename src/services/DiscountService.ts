import { axiosInstanceAuth } from "../utils/axiosIntance";

export const DiscountService = {
  fetchDiscounts: async () => {
    const response = await axiosInstanceAuth.get("/api/v1/admin/discounts");
    return response.data.body;
  },

  addDiscount: async (discount: {
    code: string;
    quantity?: number;
    value?: number;
    startDate?: string; // ISO format string
    endDate?: string; // ISO format string
  }) => {
    const params = new URLSearchParams();
    params.append("code", discount.code);
    if (discount.quantity)
      params.append("quantity", discount.quantity.toString());
    if (discount.value) params.append("value", discount.value.toString());
    if (discount.startDate) params.append("startDate", discount.startDate);
    if (discount.endDate) params.append("endDate", discount.endDate);

    const response = await axiosInstanceAuth.post(
      "/api/v1/admin/discounts/add",
      params, // Truyền params vào body
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Đảm bảo content type đúng
        },
      }
    );
    return response.data.body;
  },

  updateDiscount: async (
    id: number,
    discount: {
      code?: string;
      quantity?: number;
      value?: number;
      startDate?: string;
      endDate?: string;
    }
  ) => {
    const params = new URLSearchParams();
    params.append("id", id.toString());
    if (discount.code) params.append("code", discount.code);
    if (discount.quantity)
      params.append("quantity", discount.quantity.toString());
    if (discount.value) params.append("value", discount.value.toString());
    if (discount.startDate) params.append("startDate", discount.startDate);
    if (discount.endDate) params.append("endDate", discount.endDate);

    const response = await axiosInstanceAuth.put(
      "/api/v1/admin/discounts/update",
      params, // Truyền params vào body
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Đảm bảo content type đúng
        },
      }
    );
    return response.data.body;
  },

  deleteDiscount: async (id: number) => {
    try {
      await axiosInstanceAuth.delete("/api/v1/admin/discounts/del", {
        params: { id },
      });
    } catch (error) {
      console.error("Lỗi khi xóa mã giảm giá:", error);
      throw error;
    }
  },
};
