import { axiosInstance } from "../utils/axiosIntance";

// Dữ liệu ảo mô phỏng kết quả trả về từ API với nhiều đơn hàng
const fakeOrdersResponse = {
  success: true,
  message: "Lấy đơn hàng thành công",
  body: {
    items: [
      {
        id: 8,
        status: "PENDING",
        totalPrice: 510000,
        shippingFee: 20000,
        shippingAddr: "123 Lê Văn Việt, phường Hiệp Phú, TP. Thủ Đức",
        shippingMethod: {
          id: 1,
          name: "STANDARD",
          costPerKm: 10000,
        },
        discountCode: "G10K",
        createdAt: "2025-04-17T20:58:14.994122",
        items: [
          {
            id: 15,
            productId: 4,
            productName: "MacBook Pro M2",
            productImage: null,
            productPrice: 35990000,
            productSalePrice: 34990000,
            quantity: 2,
            unitPrice: 150000,
            reviewed: false,
          },
          {
            id: 16,
            productId: 5,
            productName: "Dell XPS 15",
            productImage: null,
            productPrice: 42990000,
            productSalePrice: 41990000,
            quantity: 1,
            unitPrice: 200000,
            reviewed: false,
          },
        ],
      },
      // ... các đơn hàng khác ...
    ],
    currentPage: 0,
    totalPages: 2,
  },
};

export const orderService = {
  /**
   * Lấy danh sách đơn hàng của người dùng.
   * Đường dẫn: GET http://localhost:9099/api/v1/orders?status=DELIVERED&page=0&size=5
   * Hiện tại, sử dụng dữ liệu ảo (fake data) để test.
   */
  getUserOrders: async (
    status: string = "DELIVERED",
    page: number = 0,
    size: number = 5
  ) => {
    try {
      // Khi backend thực, uncomment đoạn code dưới:
      /* 
      const response = await axiosInstance.get("http://localhost:9099/api/v1/orders", {
        params: { status, page, size },
      });
      return response.data;
      */
      // Sử dụng dữ liệu ảo:
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fakeOrdersResponse);
        }, 500);
      });
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng của người dùng:", error);
      throw error;
    }
  },
};
