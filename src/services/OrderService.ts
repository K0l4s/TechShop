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
      {
        id: 7,
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
        createdAt: "2025-04-17T18:51:29.873721",
        items: [
          {
            id: 13,
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
            id: 14,
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
      {
        id: 6,
        status: "SHIPPED",
        totalPrice: 600000,
        shippingFee: 25000,
        shippingAddr: "456 Lê Văn Sỹ, Phường 14, TP. Hồ Chí Minh",
        shippingMethod: {
          id: 2,
          name: "EXPRESS",
          costPerKm: 15000,
        },
        discountCode: "SALE20",
        createdAt: "2025-04-16T15:30:00.000000",
        items: [
          {
            id: 11,
            productId: 6,
            productName: "iPhone 13 Pro",
            productImage: null,
            productPrice: 29990000,
            productSalePrice: 27990000,
            quantity: 1,
            unitPrice: 100000,
            reviewed: false,
          },
          {
            id: 12,
            productId: 7,
            productName: "Samsung Galaxy S22",
            productImage: null,
            productPrice: 24990000,
            productSalePrice: 23990000,
            quantity: 1,
            unitPrice: 150000,
            reviewed: false,
          },
        ],
      },
      {
        id: 5,
        status: "DELIVERED",
        totalPrice: 720000,
        shippingFee: 30000,
        shippingAddr: "789 Nguyễn Huệ, TP. Đà Nẵng",
        shippingMethod: {
          id: 1,
          name: "STANDARD",
          costPerKm: 10000,
        },
        discountCode: "WELCOME5",
        createdAt: "2025-04-15T10:45:00.000000",
        items: [
          {
            id: 9,
            productId: 8,
            productName: "Lenovo ThinkPad X1",
            productImage: null,
            productPrice: 34990000,
            productSalePrice: 33990000,
            quantity: 1,
            unitPrice: 200000,
            reviewed: true,
          },
          {
            id: 10,
            productId: 9,
            productName: "HP Spectre x360",
            productImage: null,
            productPrice: 37990000,
            productSalePrice: 36990000,
            quantity: 1,
            unitPrice: 250000,
            reviewed: true,
          },
        ],
      },
    ],
    currentPage: 0,
    totalPages: 2,
  },
};

export const orderService = {
  /**
   * Lấy danh sách đơn hàng của người dùng.
   * Đường dẫn: http://localhost:9099/api/v1/orders?status=DELIVERED&page=0&size=5
   * Hiện tại, sử dụng dữ liệu ảo (fake data) để test.
   */
  getUserOrders: async (
    status: string = "DELIVERED",
    page: number = 0,
    size: number = 5
  ) => {
    try {
      // Khi backend thực, uncomment đoạn code dưới đây:
      // const response = await axiosInstance.get("http://localhost:9099/api/v1/orders", {
      //   params: { status, page, size },
      // });
      // return response.data;

      // Dữ liệu ảo:
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
