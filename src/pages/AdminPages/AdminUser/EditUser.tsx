import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define the data type for customers
interface Customer {
    id: string;
    customerCode: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const EditCustomerPage: React.FC = () => {
    const { customerCode } = useParams<{ customerCode: string }>();
    const navigate = useNavigate();

    const customers: Customer[] = [
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
        },
    ];

    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const foundCustomer = customers.find((c) => c.customerCode === customerCode);
        setCustomer(foundCustomer || null);
    }, [customerCode]);

    if (!customer) {
        return <div>Customer not found</div>;
    }

    const handleSave = () => {
        alert('Customer data saved');
        navigate('/admin/users');
    };

    const handleCancel = () => {
        navigate('/admin/users');
    };

    return (
        <div className="w-full mx-auto bg-white p-6 shadow-lg rounded-lg ml-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Chỉnh sửa thông tin khách hàng {customer.id} </h2>

            {/* Name Field */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold text-gray-600">Họ và tên</label>
                <input
                    type="text"
                    id="name"
                    defaultValue={customer.name}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập họ và tên"
                />
            </div>

            {/* Phone Field */}
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-600">Số điện thoại</label>
                <input
                    type="text"
                    id="phone"
                    defaultValue={customer.phone}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập số điện thoại"
                />
            </div>

            {/* Address Field */}
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-bold text-gray-600">Địa chỉ</label>
                <input
                    type="text"
                    id="address"
                    defaultValue={customer.address}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập địa chỉ"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white px-6 py-2 rounded-md"
                >
                    Lưu
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
                >
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default EditCustomerPage;
