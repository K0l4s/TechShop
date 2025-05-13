import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

interface Customer {
    id: string;
    customerCode: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const ListCustomerPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [customers] = useState<Customer[]>([
        {
            id: 'KH001',
            customerCode: 'KH001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '0123321012',
            address: '905 D. Kha Van Cân, Linh Chiều, Thủ Đức, Hồ Chí Minh',
        },
        {
            id: 'KH002',
            customerCode: 'KH002',
            name: 'Nguyễn Văn B',
            email: 'nguyenvanb@gmail.com',
            phone: '0123321012',
            address: '905 D. Kha Van Cân, Linh Chiều, Thủ Đức, Hồ Chí Minh',
        }
    ]);

    const navigate = useNavigate();

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


    const handleEditCustomer = (customer: Customer) => {
        navigate(`/admin/edit-user/${customer.customerCode}`);
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
                <input type="text"
                    placeholder="Nhâp tên hoặc Mã Khách hàng"
                    className="w-full outline-none text-sm" />
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">ID</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Mã Khách Hàng</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Tên Khách Hàng</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Email</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Số Điện Thoại</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Địa Chỉ</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-bold">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-purple-50">
                                <td className="py-2 px-4 border-b text-sm">{customer.id}</td>
                                <td className="py-2 px-4 border-b text-sm">{customer.customerCode}</td>
                                <td className="py-2 px-4 border-b text-sm">{customer.name}</td>
                                <td className="py-2 px-4 border-b text-sm">{customer.email}</td>
                                <td className="py-2 px-4 border-b text-sm">{customer.phone}</td>
                                <td className="py-2 px-4 border-b text-sm">{customer.address}</td>
                                <td className="py-2 px-4 border-b text-sm">
                                    <button className="group rounded-full p-2 mr-2 hover:bg-red-100">
                                        <RiDeleteBin6Line size={25} style={{ color: "#f43434" }}
                                            className="group-hover:text-white group-hover:bg-red-100 group-hover:p-2 rounded-full transition-all duration-300" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCustomerPage;
