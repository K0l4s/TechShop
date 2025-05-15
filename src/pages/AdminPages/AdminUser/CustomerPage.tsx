import React, { useState, useEffect } from 'react';
import { UserService } from '../../../services/UserService';
import { User } from "../../../models/Users";


const ListCustomerPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await UserService.getAllUser();

            if (response && Array.isArray(response.content)) {
                setUsers(response.content);
                console.log('Users fetched:', response.content);
            } else {
                console.error('Cấu trúc phản hồi không hợp lệ:', response);
                setError('Dữ liệu người dùng trả về không đúng định dạng');
            }
        } catch (err) {
            setError('Lấy dữ liệu khách hàng thất bại');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllUser();
    }, []);

    const filteredCustomers = users.filter((users) =>
        users.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        users.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="p-4 max-w-7xl space-y-4 mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Danh sách khách hàng</h1>

            <div className="bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-blue-500 overflow-hidden max-w-md w-full rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-gray-600 mr-3">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                <input
                    type="text"
                    placeholder="Nhập tên hoặc Email khách hàng"
                    className="w-full outline-none text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className='overflow-x-auto'>
                <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b text-center text-sm font-bold">ID</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Tên Người dùng</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Vai trò</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Email</th>
                            <th className="py-2 px-4 border-b text-center text-sm font-bold">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length === 0 && !loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4">Không tìm thấy khách hàng</td>
                            </tr>
                        ) : (
                            filteredCustomers.map((users) => (
                                <tr key={users.id} className="hover:bg-purple-50">
                                    <td className="py-2 px-4 border-b text-center text-sm">{users.id}</td>
                                    <td className="py-2 px-4 border-b text-left text-sm">{users.username}</td>
                                    <td className="py-2 px-4 border-b text-left text-sm">{users.role}</td>
                                    <td className="py-2 px-4 border-b text-left text-sm">{users.email}</td>
                                    <td className="py-2 px-4 border-b text-center text-sm">{formatDate(users.createdAt.toLocaleString())}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCustomerPage;
