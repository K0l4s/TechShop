import { axiosInstanceAuth } from "../utils/axiosIntance"; // dùng đúng file đã cấu hình

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}

export interface Warranty {
  id: number;
  wcode: string;
  userId: number;
  userEmail: string;
  userName: string;
  productId: number;
  productName: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  startDate: string;
  endDate: string;
  updatedAt: string;
  cancellationReason: string | null;
  active: boolean;
}

export interface Pageable<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  numberOfElements: number;
  empty: boolean;
}

export const UserService = {
  checkOrder: async (idProduct: string) => {
    const response = await axiosInstanceAuth.get(`/api/v1/admin/product/${idProduct}`);
    return response.data.body;
  },
  getAllNotification: async () =>{ 
    const response = await axiosInstanceAuth.get(`api/v1/notifications`);
    return response.data.body;
  },
  getUnreadCount: async () => {
    const response = await axiosInstanceAuth.get(`/api/v1/notifications/count`);
    return response.data.body.unreadCount;
  },

  getNotificationsByType: async (type: string) => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/notifications/type/${type}`
    );
    return response.data.body;
  },

  getUnreadNotifications: async () => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/notifications/unread`
    );
    return response.data.body;
  },

  getNotificationById: async (id: number) => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/notifications/${id}`
    );
    return response.data.body;
  },

  markNotificationsRead: async (ids: number[]) => {
    const response = await axiosInstanceAuth.post(
      `/api/v1/notifications/read`,
      { ids }
    );
    return response.data.body;
  },

  markAllNotificationsRead: async () => {
    const response = await axiosInstanceAuth.post(
      `/api/v1/notifications/read-all`
    );
    return response.data.body;
  },

  deleteNotification: async (id: number) => {
    const response = await axiosInstanceAuth.delete(
      `/api/v1/notifications/${id}`
    );
    return response.data.body;
  },

  createWarranty: async (body: {
    userId: number;
    productId: number;
    status: "ACTIVE" | "EXPIRED" | "CANCELLED";
    endDate: string;
  }): Promise<Warranty> => {
    const response = await axiosInstanceAuth.post(
      `/api/v1/admin/warranties`,
      body
    );
    return response.data.body;
  },

  getWarranties: async (page: number, size: number): Promise<Pageable<Warranty>> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties?page=${page}&size=${size}`
    );
    return response.data.body;
  },

  getWarrantyById: async (id: number): Promise<Warranty> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties/${id}`
    );
    return response.data.body;
  },

  getWarrantyByCode: async (wcode: string): Promise<Warranty> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties/code/${wcode}`
    );
    return response.data.body;
  },

  getWarrantiesByStatus: async (
    status: "ACTIVE" | "EXPIRED" | "CANCELLED",
    page: number,
    size: number
  ): Promise<Pageable<Warranty>> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties/status/${status}?page=${page}&size=${size}`
    );
    return response.data.body;
  },

  getWarrantiesByProduct: async (
    productId: number
  ): Promise<Warranty[]> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties/product/${productId}`
    );
    return response.data.body;
  },

  getAboutToExpire: async (
    page: number,
    size: number
  ): Promise<Pageable<Warranty>> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties/about-to-expire?page=${page}&size=${size}`
    );
    return response.data.body;
  },

  getExpired: async (
    page: number,
    size: number
  ): Promise<Pageable<Warranty>> => {
    const response = await axiosInstanceAuth.get(
      `/api/v1/admin/warranties/expired?page=${page}&size=${size}`
    );
    return response.data.body;
  },

  updateWarranty: async (
    id: number,
    body: { endDate: string }
  ): Promise<Warranty> => {
    const response = await axiosInstanceAuth.put(
      `/api/v1/admin/warranties/${id}`,
      body
    );
    return response.data.body;
  },

  updateStatus: async (
    id: number,
    status: "ACTIVE" | "EXPIRED" | "CANCELLED"
  ): Promise<Warranty> => {
    const response = await axiosInstanceAuth.patch(
      `/api/v1/admin/warranties/${id}/status?status=${status}`
    );
    return response.data.body;
  },

  cancelWarranty: async (
    id: number,
    reason: string
  ): Promise<Warranty> => {
    const response = await axiosInstanceAuth.patch(
      `/api/v1/admin/warranties/${id}/cancel?reason=${encodeURIComponent(
        reason
      )}`
    );
    return response.data.body;
  },

  deleteWarranty: async (id: number): Promise<void> => {
    await axiosInstanceAuth.delete(
      `/api/v1/admin/warranties/${id}`
    );
  },
};
