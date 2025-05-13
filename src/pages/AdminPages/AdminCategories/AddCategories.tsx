import React, { useState } from 'react';
import { CategoryService } from "../../../services/CategoryService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AddCategoryPage: React.FC = () => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    // Hàm xử lý gửi form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('name', categoryName);

            console.log('Dữ liệu gửi đi: ', categoryName);

            const response = await CategoryService.addCategory({ name: categoryName });
            console.log('Thêm danh mục thành công:', response);


            setCategoryName('');
            toast.success('Danh mục đã được thêm thành công!');
            setTimeout(() => {
                navigate('/admin/categories');
            }, 2000);

        } catch (err) {
            console.error('Lỗi khi thêm danh mục:', err);
            setError('Không thể thêm danh mục, vui lòng thử lại.');
            toast.error('Không thể thêm danh mục, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/categories');
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Thêm danh mục</h2>

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                {/* Nhập tên danh mục */}
                <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-sm font-bold text-gray-600">Tên Danh Mục</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nhập tên danh mục"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Nút submit */}
                <div className="flex justify-start gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md"
                    >
                        {loading ? 'Đang thêm...' : 'Thêm Danh Mục'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel} // Xử lý khi nhấn "Hủy"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
                    >
                        Hủy
                    </button>
                </div>
            </form>

            {/* Thêm ToastContainer vào cuối trang */}
            <ToastContainer />
        </div>
    );
};

export default AddCategoryPage;
