import React, { useState, useEffect } from "react";
import { DiscountService } from "../../../services/DiscountService";

interface EditDiscountProps {
  handleClose: () => void;
  discount: {
    id: number;
    code: string;
    quantity: number;
    value: number;
    startDate: string;
    endDate: string;
  };
}

const EditDiscount: React.FC<EditDiscountProps> = ({
  handleClose,
  discount,
}) => {
  const [formData, setFormData] = useState({
    code: discount.code || "", // Fallback to empty string if discount.code is undefined
    quantity: discount.quantity || 0, // Fallback to 0 if discount.quantity is undefined
    value: discount.value || 0, // Fallback to 0 if discount.value is undefined
    startDate: discount.startDate || "", // Fallback to empty string if discount.startDate is undefined
    endDate: discount.endDate || "", // Fallback to empty string if discount.endDate is undefined
  });

  useEffect(() => {
    // This ensures formData is updated when discount prop changes
    setFormData({
      code: discount.code || "",
      quantity: discount.quantity || 0,
      value: discount.value || 0,
      startDate: discount.startDate || "",
      endDate: discount.endDate || "",
    });
  }, [discount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "value" ? Number(value) : value,
    }));
  };

  // Convert date to a format including time as 00:00:00 (start) or 23:59:59 (end)
  const toLocalDateTime = (dateString: string, isStartDate: boolean) => {
    const date = new Date(
      dateString + (isStartDate ? "T00:00:00" : "T23:59:59")
    );

    // Điều chỉnh thời gian để bù múi giờ
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Chuyển phút sang milliseconds
    const adjustedDate = new Date(date.getTime() - timezoneOffset);

    return adjustedDate.toISOString().slice(0, 19);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      startDate: formData.startDate
        ? toLocalDateTime(formData.startDate, true)
        : undefined,
      endDate: formData.endDate
        ? toLocalDateTime(formData.endDate, false)
        : undefined,
    };

    try {
      await DiscountService.updateDiscount(discount.id, updatedFormData);
      handleClose(); // Close modal and reload the discount list
    } catch (error) {
      console.error("Lỗi khi cập nhật mã giảm giá:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Chỉnh Sửa Mã Giảm Giá
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Mã Giảm Giá
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Số Lượng
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Giá Trị
              </label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Ngày Bắt Đầu
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Ngày Kết Thúc
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDiscount;
