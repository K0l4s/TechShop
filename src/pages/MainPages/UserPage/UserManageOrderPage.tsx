import React from "react";
import Sidebar from "../../../components/User/Sidebar";
import OrderCard from "../../../components/User/OrderCard"; // Component hiển thị đơn hàng

// Dữ liệu mẫu của đơn hàng
const orderProducts = [
  { name: "Sản phẩm A", quantity: 2, price: 50000 },
  { name: "Sản phẩm B", quantity: 1, price: 75000 },
];

const UserManageOrder: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header có thể được thêm nếu cần */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

          {/* Chỉ render component OrderCard để hiển thị đơn hàng từ API/dữ liệu ảo */}
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default UserManageOrder;
