import React from "react";
import { DiscountService } from "../../../services/DiscountService";

interface DeleteDiscountProps {
  handleClose: () => void;
  discountId: number; // ID của mã giảm giá
  token: string; // Token xác thực
}

const DeleteDiscount: React.FC<DeleteDiscountProps> = ({
  handleClose,
  discountId,
  token,
}) => {
  const handleDelete = async (id: number, token: string) => {
    try {
      await DiscountService.deleteDiscount(id, token);
      // Call any action to update the UI or refetch data if needed
      handleClose(); // Close the modal after successful delete
    } catch (error) {
      console.error("Lỗi khi xóa mã giảm giá:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex justify-center items-center">
      <div className="bg-[#ff6b6b] pt-8 pr-16 pb-8 pl-16 rounded-2xl shadow-lg w-auto relative text-white">
        <p className="mb-8 text-center">
          Bạn chắc chắn muốn xóa dữ liệu. <br />
          Sau khi xóa, dữ liệu sẽ không thể khôi phục.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleDelete(discountId, token)} // Truyền token khi gọi hàm xóa
            className="bg-red-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-800 transition duration-300"
          >
            Xóa
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDiscount;
