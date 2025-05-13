import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryService } from "../../../services/CategoryService";
import { toast, ToastContainer } from 'react-toastify';

interface EditCategoryPageProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: string;
}

const EditCategoryPage: React.FC<EditCategoryPageProps> = ({ isOpen, onClose, categoryId }) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const categoryIdNumber = Number(categoryId);

        if (isNaN(categoryIdNumber)) {
            toast.error('ID không hợp lệ');
            setLoading(false);
            return;
        }

        try {
            await CategoryService.updateCategory(categoryIdNumber, { name: categoryName });
            toast.success('Danh mục đã được cập nhật thành công!');
            setTimeout(() => {
                navigate(0);
            }, 1500);
        } catch (error) {
            toast.error('Không thể cập nhật danh mục, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className="p-6 w-full sm:w-1/3 md:w-1/2 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Chỉnh sửa danh mục</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="categoryName" className="block text-sm font-bold text-gray-600">Tên Danh mục</label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                            placeholder="Nhập tên danh mục"
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-start gap-4">
                        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-md" disabled={loading}>
                            {loading ? 'Đang cập nhật...' : 'Lưu'}
                        </button>
                        <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
            {/* Đảm bảo ToastContainer được khai báo đúng và hiển thị */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default EditCategoryPage;
