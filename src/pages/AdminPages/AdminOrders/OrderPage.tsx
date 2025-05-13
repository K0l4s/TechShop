import React, { useState, useEffect } from 'react';
import { LuScanEye } from 'react-icons/lu'; // Import the LuScanEye icon

interface ShippingMethod {
    id: number;
    name: string;
    costPerKm: number;
}

interface Item {
    id: number;
    productId: number;
    productName: string;
    productImage: string | null;
    productPrice: number;
    productSalePrice: number;
    quantity: number;
    unitPrice: number;
    reviewed: boolean;
}

interface Order {
    id: number;
    status: string;
    totalPrice: number;
    shippingFee: number;
    shippingAddr: string;
    shippingMethod: ShippingMethod;
    discountCode: string;
    createdAt: string;
    items: Item[];
}

const ListOrderPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [paymentFilter, setPaymentFilter] = useState<string>(''); // Payment filter
    const [statusFilter, setStatusFilter] = useState<string>(''); // Order status filter


    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('all'); // Track the active tab
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Selected order for modal

    useEffect(() => {
        // Fetch order data (replace with your API call)
        const fetchOrders = async () => {
            // Simulating an API call
            const response = {
                data: [
                    {
                        id: 8,
                        status: 'COMPLETED',
                        totalPrice: 2970000,
                        shippingFee: 20000,
                        shippingAddr: '123 Lê Văn Việt, phường Hiệp Phú, TP. Thủ Đức',
                        shippingMethod: {
                            id: 1,
                            name: 'STANDARD',
                            costPerKm: 10000,
                        },
                        discountCode: 'G10K',
                        createdAt: '2025-04-17T20:58:14.994122',
                        items: [
                            {
                                id: 15,
                                productId: 4,
                                productName: 'MacBook Pro M2',
                                productImage: "https://res.cloudinary.com/ddfq7ifig/image/upload/v1745069090/hrg77dconn6ingcdjmae.jpg",
                                productPrice: 1500000,
                                productSalePrice: 1200000,
                                quantity: 2,
                                unitPrice: 1200000,
                                reviewed: false,
                            },
                            {
                                id: 16,
                                productId: 5,
                                productName: 'Dell XPS 15',
                                productImage: "https://res.cloudinary.com/ddfq7ifig/image/upload/v1745593998/ipohogryy8bjcryeqzq6.jpg",
                                productPrice: 150000,
                                productSalePrice: 140000,
                                quantity: 4,
                                unitPrice: 140000,
                                reviewed: false,
                            },
                        ],
                    },
                    {
                        "id": 14,
                        "status": "PENDING",
                        "totalPrice": 1490000,
                        "shippingFee": 20000,
                        "shippingAddr": "123 Lê Văn Việt, phường Hiệp Phú, TP. Thủ Đức",
                        "shippingMethod": {
                            "id": 1,
                            "name": "STANDARD",
                            "costPerKm": 10000
                        },
                        "discountCode": "G10K",
                        "createdAt": "2025-04-28T18:35:53.505932",
                        "items": [
                            {
                                "id": 27,
                                "productId": 15,
                                "productName": "CASE PC",
                                "productImage": "https://res.cloudinary.com/ddfq7ifig/image/upload/v1745593998/ipohogryy8bjcryeqzq6.jpg",
                                "productPrice": 150000,
                                "productSalePrice": 140000,
                                "quantity": 2,
                                "unitPrice": 140000,
                                "reviewed": false
                            },
                            {
                                "id": 28,
                                "productId": 17,
                                "productName": "TEST PRODUCT",
                                "productImage": "https://res.cloudinary.com/ddfq7ifig/image/upload/v1745069172/jthgal8bwb5wd1ihbya1.jpg",
                                "productPrice": 1500000,
                                "productSalePrice": 1200000,
                                "quantity": 1,
                                "unitPrice": 1200000,
                                "reviewed": false
                            }
                        ]
                    }
                ],
            };
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handlePaymentFilter = (status: string) => {
        setPaymentFilter(status);
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
    };

    const filteredOrders = orders.filter((order) => {
        return (
            (order.shippingAddr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toString().includes(searchQuery.toLowerCase())) &&
            (selectedTab === 'all' || order.status === selectedTab)
        );
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN'); // Định dạng theo chuẩn Việt Nam
    };
    const countOrdersByStatus = (status: string) => {
        return orders.filter((order) => order.status === status).length;
    };


    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h2>
            {/* Navigation Bar */}
            <div className="mb-4 flex gap-4 border-b">
                <button
                    className={`px-4 py-2 ${selectedTab === 'all' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('all')}
                >
                    Tất cả
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'PENDING' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('PENDING')}
                >
                    Chờ thanh toán
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'SHIPPING' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('SHIPPING')}
                >
                    Vận chuyển
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'SHIPPED' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('SHIPPED')}
                >
                    Chờ giao hàng ({countOrdersByStatus('SHIPPED')})
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'COMPLETED' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('COMPLETED')}
                >
                    Hoàn thành
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'CANCELLED' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('CANCELLED')}
                >
                    Đã hủy
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'REFUND' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('REFUND')}
                >
                    Trả hàng/Hoàn tiền
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Tìm mã đơn hàng hoặc địa chỉ"
                    className="px-4 py-2 w-1/3 border rounded-md"
                />
            </div>

            {/* Orders Table */}
            <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Mã đơn hàng</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Địa chỉ</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Phí vận chuyển</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Phương thức vận chuyển</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Mã giảm giá</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Tổng Đơn</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Trạng thái</th>
                        <th className="py-2 px-4 border-b text-center text-sm font-bold">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-purple-50">
                            <td className="py-2 px-4 border-b text-center text-sm">{order.id}</td>
                            <td className="py-2 px-4 border-b text-center text-sm">{order.shippingAddr}</td>
                            <td className="py-2 px-4 border-b text-center text-sm">{formatCurrency(order.shippingFee)} VND</td>
                            <td className="py-2 px-4 border-b text-center text-sm">{order.shippingMethod.name}</td>
                            <td className="py-2 px-4 border-b text-center text-sm">{order.discountCode}</td>
                            <td className="py-2 px-4 border-b text-center text-sm">{formatCurrency(order.totalPrice)} VND</td>
                            <td className="py-2 px-4 border-b text-center text-sm">{order.status}</td>
                            <td className="py-2 px-4 border-b text-center text-sm">
                                <LuScanEye
                                    className="inline-block mr-2 text-2xl hover:text-green-600 cursor-pointer transition duration-300 ease-in-out"
                                    onClick={() => handleViewDetails(order)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Order Details */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 shadow-lg rounded-lg w-120 h-auto max-w-3xl">
                        <h1 className="mt-4 text-center font-semibold text-2xl">Thông tin đơn hàng</h1>
                        <div className="mb-4">
                            <div className="py-2 px-4 text-left text-sm">
                                <strong>ID KHÁCH HÀNG:</strong> {selectedOrder.id}
                            </div>
                            <div className="py-2 px-4 text-left text-sm">
                                <strong>ĐỊA CHỈ:</strong> {selectedOrder.shippingAddr}
                            </div>
                            <div className="py-2 px-4 text-left text-sm">
                                <strong>NGÀY TẠO ĐƠN:</strong> {formatDate(selectedOrder.createdAt)}
                            </div>
                        </div>

                        <h2 className="mt-4 text-center font-semibold">Sản phẩm đã mua</h2>
                        <table className="min-w-full mt-2 border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-center text-sm font-bold">Sản phẩm</th>
                                    <th className="py-2 px-4 border-b text-center text-sm font-bold">Ảnh</th>
                                    <th className="py-2 px-4 border-b text-center text-sm font-bold">Số lượng</th>
                                    <th className="py-2 px-4 border-b text-center text-sm font-bold">Giá</th>
                                    <th className="py-2 px-4 border-b text-center text-sm font-bold">Giảm còn</th>
                                    <th className="py-2 px-4 border-b text-center text-sm font-bold">Tổng giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-2 px-4 border-b text-center text-sm">{item.productName}</td>
                                        <td className="py-2 px-4 border-b text-center text-sm">
                                            <img
                                                src={item.productImage ?? '/path/to/default/image.jpg'}
                                                alt={item.productName}
                                                className="w-16 h-16 object-contain"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b text-center text-sm">{item.quantity}</td>
                                        <td className="py-2 px-4 border-b text-center text-sm">{formatCurrency(item.productPrice)} VND</td>
                                        <td className="py-2 px-4 border-b text-center text-sm">{formatCurrency(item.productSalePrice)} VND</td>
                                        <td className="py-2 px-4 border-b text-center text-sm">{formatCurrency(item.unitPrice * item.quantity)} VND</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                        {/* Hiển thị phí vận chuyển và tổng giá ngoài bảng */}
                        <div className="py-2 px-4 text-right text-sm">
                            <strong>TỔNG CỘNG: </strong> {formatCurrency(selectedOrder.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0))} VND
                        </div>
                        <div className="py-2 px-4 text-right text-sm">
                            <strong>PHÍ VẬN CHUYỂN: </strong> {formatCurrency(selectedOrder.shippingFee - selectedOrder.shippingMethod.costPerKm)} VND
                        </div>
                        <div className="py-2 px-4 text-right text-sm">
                            <strong>TỔNG GIÁ: </strong> {formatCurrency(selectedOrder.totalPrice)} VND
                        </div>

                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListOrderPage;
