import React, { useState, useEffect } from 'react';
import { LuScanEye } from 'react-icons/lu';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import { OrderService } from "../../../services/OrderService";
import { Order } from "../../../models/Order";

const ListOrderPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await OrderService.fetchOrders();
                console.log(response);
                setOrders(response.items);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId: number, newStatus: string) => {
        try {
            const currentOrder = orders.find((order) => order.id === orderId);
            if (!currentOrder) {
                toast.error('Không tìm thấy đơn hàng');
                return;
            }

            const statusFlow = ['PENDING', 'CONFIRMED', 'DELIVERING', 'DELIVERED', 'CANCELLED'];

            const currentStatusIndex = statusFlow.indexOf(currentOrder.status);
            const newStatusIndex = statusFlow.indexOf(newStatus);


            if (newStatusIndex < currentStatusIndex) {
                toast.error('Không thể quay lại trạng thái cũ');
                return;
            }

            const response = await OrderService.updateOrderStatus(orderId, newStatus);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            toast.success('Cập nhật trạng thái thành công');
        } catch (error) {
            toast.error('Cập nhật trạng thái thất bại');
            console.error('Cập nhật trạng thái thất bại', error);
        }
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
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
        return amount.toLocaleString('vi-VN');
    };

    const countOrdersByStatus = (status: string) => {
        return orders.filter((order) => order.status === status).length;
    };
    function removeVietnameseTones(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const handlePrintPDF = () => {
        if (!selectedOrder) {
            return;
        }
        const doc = new jsPDF();

        doc.setFont("times", "normal");

        // Add Order Information
        doc.setFontSize(16);
        doc.text("THONG TIN DON HANG", 20, 20);
        doc.setFontSize(12);
        doc.text(`ID KHACH HANG: ${selectedOrder.id}`, 20, 30);
        doc.text(`DIA CHI: ${removeVietnameseTones(selectedOrder.shippingAddr)}`, 20, 40);
        doc.text(`NGAY TAO DON: ${removeVietnameseTones(formatDate(selectedOrder.createdAt))}`, 20, 50);

        doc.text("SAN PHAM DA MUA", 20, 60);

        // Add Table Headers
        doc.setFontSize(13);
        const headers = ['San Pham', 'Anh', 'So luong', 'Gia', 'Giam con', 'Tong gia'];
        const xPositions = [20, 60, 100, 140, 180, 220];
        for (let i = 0; i < headers.length; i++) {
            doc.text(headers[i], xPositions[i], 70);
        }

        // Add Table Content
        selectedOrder.items.forEach((item, index) => {
            const yPosition = 80 + (index * 10);
            doc.text(item.productName, xPositions[0], yPosition);
            doc.text(item.quantity.toString(), xPositions[2], yPosition);
            doc.text(formatCurrency(item.productPrice), xPositions[3], yPosition);
            doc.text(formatCurrency(item.productSalePrice), xPositions[4], yPosition);
            doc.text(formatCurrency(item.unitPrice * item.quantity), xPositions[5], yPosition);
        });

        // Add Total
        doc.text(`TONG CONG: ${formatCurrency(selectedOrder.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0))} VND`, 20, 100);
        doc.text(`PHI VAN CHUYEN: ${formatCurrency(selectedOrder.shippingFee - selectedOrder.shippingMethod.costPerKm)} VND`, 20, 110);
        doc.text(`TONG GIA: ${formatCurrency(selectedOrder.totalPrice)} VND`, 20, 120);

        // Save PDF
        doc.save(`order_${selectedOrder.id}.pdf`);
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
                    Chờ thanh toán <span className="text-red-500"> ({countOrdersByStatus('PENDING')})</span>
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'CONFIRMED' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('CONFIRMED')}
                >
                    Đã xác nhận <span className="text-red-500"> ({countOrdersByStatus('CONFIRMED')})</span>
                </button>
                {/* <button
                    className={`px-4 py-2 ${selectedTab === 'PROCESSING' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('PROCESSING')}
                >
                    Đang chuẩn bị hàng <span className="text-red-500"> ({countOrdersByStatus('PROCESSING')})</span>
                </button> */}
                <button
                    className={`px-4 py-2 ${selectedTab === 'DELIVERING' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('DELIVERING')}
                >
                    Đang vận chuyển <span className="text-red-500"> ({countOrdersByStatus('DELIVERING')})</span>
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'DELIVERED' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('DELIVERED')}
                >
                    Hoàn thành <span className="text-red-500"> ({countOrdersByStatus('DELIVERED')})</span>
                </button>
                <button
                    className={`px-4 py-2 ${selectedTab === 'CANCELLED' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'}`}
                    onClick={() => setSelectedTab('CANCELLED')}
                >
                    Đã hủy <span className="text-red-500"> ({countOrdersByStatus('CANCELLED')})</span>
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
                            <td className="py-2 px-4 border-b text-center text-sm">
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className="border px-2 py-1 rounded-md"
                                >
                                    <option value="PENDING">Chờ thanh toán</option>
                                    <option value="CONFIRMED">Đã xác nhận</option>
                                    {/* <option value="PROCESSING">Đang chuẩn bị hàng</option> */}
                                    <option value="DELIVERING">Đang vận chuyển</option>
                                    <option value="DELIVERED">Hoàn thành</option>
                                    <option value="CANCELLED">Đã hủy</option>
                                </select>
                            </td>
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
                                <strong>ĐỊA CHỈ:</strong> {removeVietnameseTones(selectedOrder.shippingAddr)}
                            </div>
                            <div className="py-2 px-4 text-left text-sm">
                                <strong>NGÀY TẠO ĐƠN:</strong> {removeVietnameseTones(formatDate(selectedOrder.createdAt))}
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
                            <button
                                onClick={handlePrintPDF}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                            >
                                In PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ListOrderPage;
