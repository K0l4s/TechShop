import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { CategoryService } from "../../../services/CategoryService";
import { Category } from '../../../models/Categories';
import EditCategoryPage from './EditCategories';

const ListCategoriesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.fetchCategory();
                if (Array.isArray(response)) {
                    console.log('Categories fetched:', response);
                    setCategories(response);
                } else {
                    console.error('Cấu trúc phản hồi không hợp lệ:', response);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };
        fetchCategory();
    }, []);

    const filteredCategories = categories.filter((category) => {
        return (
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.id.toString().includes(searchQuery)
        );
    });

    const handleConfirmDeleteCategory = async () => {
        if (selectedCategory) {
            console.log('Attempting to delete category:', selectedCategory);
            try {
                // Gọi API soft-delete để xóa danh mục
                const response = await CategoryService.softDeleteCategory(selectedCategory.id);
                console.log('API response after delete attempt:', response);

                // Cập nhật lại danh sách danh mục sau khi xóa
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.id === selectedCategory.id
                            ? { ...category, active: false } // Đánh dấu category là inactive
                            : category
                    )
                );
                handleCloseDeleteCategory(); // Đóng modal xóa
                console.log('Category successfully marked as inactive');
            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
            }
        }
    };

    const handleDeleteCategory = (category: Category) => {
        setSelectedCategory(category);
        setShowDeleteCategory(true);
    };

    const handleCloseDeleteCategory = () => {
        setShowDeleteCategory(false);
        setSelectedCategory(null);
    };

    const handleAddCategory = () => {
        navigate(`/admin/add-categories/`);
    };

    const handleEditClick = (id: string) => {
        setSelectedCategoryId(id);
        setIsModalOpenEdit(true);
    };

    const handleCloseEditModal = () => {
        setIsModalOpenEdit(false);
    };

    return (
        <div className="p-6 max-w-7xl space-y-2 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Danh sách danh mục</h2>

            {/* Thanh tìm kiếm */}
            <div className="bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-blue-500 overflow-hidden max-w-md w-full rounded-md">
                <input type="text"
                    placeholder="Nhập tên hoặc Mã Danh mục"
                    className="w-full outline-none text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            {/* Nút thêm danh mục */}
            <button
                onClick={handleAddCategory}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-4">
                + Thêm Danh Mục
            </button>

            {/* Bảng danh mục */}
            <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">ID</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Tên Danh Mục</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Sản phẩm</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id} className="hover:bg-purple-50">
                            <td className="py-2 px-4 border-b text-sm">{category.id}</td>
                            <td className="py-2 px-4 border-b text-sm">{category.name}</td>
                            <td className="py-2 px-4 border-b text-sm">
                                {/* Liệt kê các sản phẩm trong mỗi danh mục */}
                                {category.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="cursor-pointer text-blue-500 underline"
                                    >
                                        {product.name} - {product.brandName}
                                    </div>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b text-sm">
                                <button
                                    onClick={() => handleEditClick(category.id.toString())}
                                    className="group rounded-full p-2 mr-2 hover:bg-blue-100"
                                >
                                    <CiEdit size={25} style={{ color: "#34a1f4" }} />
                                </button>

                                <button
                                    onClick={() => handleDeleteCategory(category)} // Show delete confirmation
                                    className="group rounded-full p-2 mr-2 hover:bg-red-100"
                                >
                                    <RiDeleteBin6Line size={25} style={{ color: "#f43434" }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal xác nhận xóa danh mục */}
            {showDeleteCategory && selectedCategory && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
                        <h3 className="text-xl font-semibold mb-4">Xác nhận xóa danh mục</h3>
                        <p>Bạn có chắc chắn muốn xóa danh mục "{selectedCategory.name}" không?</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={handleCloseDeleteCategory}
                                className="bg-gray-300 px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmDeleteCategory}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chỉnh sửa danh mục */}
            <EditCategoryPage
                isOpen={isModalOpenEdit}
                onClose={handleCloseEditModal}
                categoryId={selectedCategoryId}
            />
        </div>
    );
};

export default ListCategoriesPage;
