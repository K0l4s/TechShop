import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

// Define the data type for categories
interface Category {
    id: string;
    code: string;
    name: string;
    image: string;
}

const ListCategoriesPage: React.FC = () => {
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 'CM001',
            code: 'DM001',
            name: 'Laptop',
            image: 'https://via.placeholder.com/50',
        },
        {
            id: 'CM002',
            code: 'DM002',
            name: 'Màn hình',
            image: 'https://via.placeholder.com/50',
        },
    ]);

    const navigate = useNavigate();

    const handleBack = () => {
        setIsSearchVisible(false);
        setSearchQuery('');
    };

    const filteredCategories = categories.filter((category) => {
        return (
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleDeleteCategory = (id: string) => {
        setCategories((prev) => prev.filter((category) => category.id !== id));
    };

    const handleEditCategory = (categoryId: string) => {
        navigate(`/admin/edit-categories/${categoryId}`);
    };
    const handleAddCategory = () => {
        navigate(`/admin/add-categories`);
    };

    return (
        <div className="p-6 max-w-7xl space-y-2  mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Danh sách danh mục</h2>

            {/* Search Bar */}
            <div className="bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-blue-500 overflow-hidden max-w-md w-full rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-gray-600 mr-3">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                <input type="text"
                    placeholder="Nhâp tên hoặc Mã Danh mục"
                    className="w-full outline-none text-sm" />
            </div>

            {/* Add Category Button */}
            <button
                onClick={() => handleAddCategory()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-4">
                + Thêm Danh Mục

            </button>

            {/* Categories Table */}
            <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">ID</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Mã Danh Mục</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Tên Danh Mục</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Hình Ảnh</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-bold">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id} className="hover:bg-purple-50">
                            <td className="py-2 px-4 border-b text-sm">{category.id}</td>
                            <td className="py-2 px-4 border-b text-sm">{category.code}</td>
                            <td className="py-2 px-4 border-b text-sm">{category.name}</td>
                            <td className="py-2 px-4 border-b text-sm">
                                <img src={category.image} className="w-20 h-20 object-cover rounded-md" />
                            </td>
                            <td className="py-2 px-4 border-b text-sm">
                                <button
                                    onClick={() => handleEditCategory(category.id)}
                                    className="group rounded-full p-2 mr-2 hover:bg-blue-100"
                                >
                                    <CiEdit size={25} style={{ color: "#34a1f4" }}
                                        className="group-hover:text-white group-hover:bg-blue-100
                                     group-hover:p-2 rounded-full 
                                     transition-all duration-300"
                                    />
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="group rounded-full p-2 mr-2 hover:bg-red-100"
                                >
                                    <RiDeleteBin6Line size={25} style={{ color: "#f43434" }}
                                        className="group-hover:text-white 
                                        group-hover:bg-red-100 group-hover:p-2 
                                        rounded-full transition-all duration-300"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategoriesPage;
