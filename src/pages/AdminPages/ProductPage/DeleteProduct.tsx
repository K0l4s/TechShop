import React from "react";

interface DeleteProductProps {
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
  handleClose,
  handleDelete,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px] text-center">
        <h2 className="text-xl font-bold mb-4 text-red-600">Xác nhận xóa</h2>
        <p className="mb-6">Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
