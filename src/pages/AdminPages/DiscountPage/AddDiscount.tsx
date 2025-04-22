import React, { useState } from "react";
import { DiscountService } from "../../../services/DiscountService";

interface AddDiscountProps {
  onSuccess: () => void; // Hàm callback sau khi thêm thành công
}

const AddDiscount: React.FC<AddDiscountProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    code: "",
    quantity: "",
    value: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toLocalDateTime = (dateString: string, isStartDate: boolean) => {
    const date = new Date(dateString + "T00:00:00");

    // Nếu là startDate, giữ nguyên 00:00:00
    // Nếu là endDate, đặt thành 23:59:59
    if (!isStartDate) {
      date.setHours(23, 59, 59, 0); // Đặt giờ, phút, giây, và milliseconds
    }

    // Điều chỉnh thời gian để bù múi giờ
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Chuyển phút sang milliseconds
    const adjustedDate = new Date(date.getTime() - timezoneOffset);

    return adjustedDate.toISOString().slice(0, 19);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      code: formData.code,
      quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
      value: formData.value ? parseFloat(formData.value) : undefined,
      startDate: formData.startDate
        ? toLocalDateTime(formData.startDate, true)
        : undefined,
      endDate: formData.endDate
        ? toLocalDateTime(formData.endDate, false)
        : undefined,
    };

    try {
      await DiscountService.addDiscount(payload);
      setFormData({
        code: "",
        quantity: "",
        value: "",
        startDate: "",
        endDate: "",
      });
      onSuccess(); // Gọi hàm callback để cập nhật lại danh sách
    } catch (error) {
      console.error("Lỗi khi thêm mã giảm giá:", error);
      alert("Thêm mã giảm giá thất bại. Vui lòng thử lại!");
    }
  };

  const handleCancel = () => {
    setFormData({
      code: "",
      quantity: "",
      value: "",
      startDate: "",
      endDate: "",
    });
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Thêm Mã Giảm Giá
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
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiscount;
