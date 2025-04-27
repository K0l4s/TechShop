import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { orderService } from "../../services/OrderService";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null;
  productPrice: number;
  productSalePrice: number;
  quantity: number;
  unitPrice: number;
  reviewed: boolean;
}

interface ShippingMethod {
  id: number;
  name: string;
  costPerKm: number;
}

interface Order {
  id: number;
  status: string;
  totalPrice: number;
  shippingFee: number;
  shippingAddr: string;
  shippingMethod: ShippingMethod;
  discountCode: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrdersResponse {
  success: boolean;
  message: string;
  body: {
    items: Order[];
    currentPage: number;
    totalPages: number;
  };
}

const OrderCard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      const response = (await orderService.getUserOrders()) as OrdersResponse;
      console.log("Fetched orders:", response);
      if (response.success && response.body && response.body.items) {
        setOrders(response.body.items);
      }
    } catch (error) {
      console.error("Không thể tải đơn hàng của người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Đang tải đơn hàng của bạn...</p>;

  if (orders.length === 0)
    return <p>Bạn chưa có đơn hàng nào.</p>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {orders.map((order: Order) => (
        <div
          key={order.id}
          className="border p-4 rounded-lg w-[400px] shadow-md"
        >
          <h3 className="font-bold text-lg">Đơn hàng #{order.id}</h3>
          <p>Trạng thái: {order.status}</p>
          <p>Tổng giá: {order.totalPrice.toLocaleString()}₫</p>
          <p>Phí ship: {order.shippingFee.toLocaleString()}₫</p>
          <p>Địa chỉ nhận hàng: {order.shippingAddr}</p>
          <p>Ngày tạo: {new Date(order.createdAt).toLocaleString()}</p>
          <div className="mt-2">
            <h4 className="font-semibold">Sản phẩm trong đơn:</h4>
            {order.items.map((item: OrderItem) => (
              <div key={item.id} className="ml-4 border-t pt-2">
                <p>{item.productName}</p>
                <p>Số lượng: {item.quantity}</p>
                <p>Đơn giá: {item.productSalePrice.toLocaleString()}₫</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
