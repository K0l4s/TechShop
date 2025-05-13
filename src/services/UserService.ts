import { axiosInstanceAuth } from "../utils/axiosIntance"; // dùng đúng file đã cấu hình

export const UserService = {
  checkOrder: async (idProduct: string) => {
    const response = await axiosInstanceAuth.get(`/api/v1/product/${idProduct}`);
    return response.data.body;
  },
  getAllNotification: async (status: string, page: number) =>{ 
    const response = await axiosInstanceAuth.get(`api/v1/orders?status=${status}&page=${page}&size=5`);
    return response.data.body;
  }
};
