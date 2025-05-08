import React, { useEffect, useState } from "react";
import { DiscountService } from "../../../services/DiscountService";
import AddDiscount from "./AddDiscount";
import EditDiscount from "./EditDiscount";
import DeleteDiscount from "./DeleteDiscount";
import { Discount } from "../../../models/Discount";

const DiscountPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<Discount | null>(
    null
  );

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const data = await DiscountService.fetchDiscounts();
      setDiscounts(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách mã giảm giá:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh Sách Mã Giảm Giá</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-white text-black px-4 py-2 rounded-lg border border-gray-600 font-bold hover:bg-gray-200 transition duration-300"
        >
          + Mã Giảm Giá
        </button>
      </div>

      {/* Modal Thêm Mới Mã Giảm Giá */}
      {showAddModal && (
        <AddDiscount
          onSuccess={() => {
            setShowAddModal(false);
            fetchDiscounts();
          }}
        />
      )}

      {/* Modal Chỉnh Sửa Mã Giảm Giá */}
      {editingDiscount && (
        <EditDiscount
          handleClose={() => {
            setEditingDiscount(null);
            fetchDiscounts();
          }}
          discount={editingDiscount}
        />
      )}

      {/* Modal Xóa Mã Giảm Giá */}
      {showDeleteModal && discountToDelete && (
        <DeleteDiscount
          handleClose={() => setShowDeleteModal(false)}
          discountId={discountToDelete.id}
          token="your-auth-token-here"
          onDeleteSuccess={() => {
            setShowDeleteModal(false);
            fetchDiscounts();
          }}
        />
      )}

      {/* Bảng Danh Sách Mã Giảm Giá */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border font-normal text-center">ID</th>
              <th className="py-2 px-4 border font-normal text-center">
                Mã Giảm Giá
              </th>
              <th className="py-2 px-4 border font-normal text-center">
                Giá Trị
              </th>
              <th className="py-2 px-4 border font-normal text-center">
                Số Lượng
              </th>
              <th className="py-2 px-4 border font-normal text-center">
                Ngày Bắt Đầu
              </th>
              <th className="py-2 px-4 border font-normal text-center">
                Ngày Kết Thúc
              </th>
              <th className="py-2 px-4 border font-normal text-center">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr
                key={discount.id}
                className={`${discount.active ? "bg-white" : "bg-red-200"}`}
              >
                <td className="py-2 px-4 border text-center">{discount.id}</td>
                <td className="py-2 px-4 border text-center">
                  {discount.code}
                </td>
                <td className="py-2 px-4 border text-center">
                  {discount.value}
                </td>
                <td className="py-2 px-4 border text-center">
                  {discount.quantity}
                </td>
                <td className="py-2 px-4 border text-center">
                  {discount.startDate}
                </td>
                <td className="py-2 px-4 border text-center">
                  {discount.endDate}
                </td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex justify-center gap-6">
                    {discount.active ? (
                      <>
                        <button
                          onClick={() => setEditingDiscount(discount)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          Sửa
                        </button>

                        <button
                          onClick={() => {
                            setDiscountToDelete(discount);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Xóa
                        </button>
                      </>
                    ) : (
                      <p className="text-red-500 font-bold">Đã Xóa</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountPage;
