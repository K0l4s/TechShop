import React from 'react';
import { dashboardApi } from '../../../services/DashboardService';
import {
    FaShoppingCart,
    FaCheckCircle,
    FaClock,
    FaSpinner,
    FaTruck,
    FaBoxOpen,
    FaTimesCircle,
    FaPercentage,
} from 'react-icons/fa';

const OrderAnalyst = () => {
    const [dataset, setDataset] = React.useState<any>();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardApi.getTotalTodayOrders();
                setDataset(response.body);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const returnRate =
        dataset?.totalCanceled && dataset?.totalDelivered
            ? ((dataset.totalCanceled * 100) /
                (dataset.totalCanceled + dataset.totalDelivered)).toFixed(2)
            : 0;

    const stats = [
        { label: 'Total', value: dataset?.total, icon: <FaShoppingCart className="text-blue-500" /> },
        { label: 'Confirmed', value: dataset?.totalConfirm, icon: <FaCheckCircle className="text-green-500" /> },
        { label: 'Pending', value: dataset?.totalPending, icon: <FaClock className="text-yellow-500" /> },
        { label: 'Processing', value: dataset?.totalProcess, icon: <FaSpinner className="text-purple-500" /> },
        { label: 'Delivering', value: dataset?.totalDelivering, icon: <FaTruck className="text-orange-500" /> },
        { label: 'Delivered', value: dataset?.totalDelivered, icon: <FaBoxOpen className="text-teal-500" /> },
        { label: 'Canceled', value: dataset?.totalCanceled, icon: <FaTimesCircle className="text-red-500" /> },
    ];

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Today Processing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
                    >
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{item.value ?? 0}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center gap-4">
                <FaPercentage className="text-yellow-500 text-2xl" />
                <div>
                    <p className="text-gray-700 dark:text-yellow-200">Return Rate</p>
                    <p className="text-xl font-bold text-yellow-700 dark:text-yellow-100">{returnRate}%</p>
                </div>
            </div>
        </div>
    );
};

export default OrderAnalyst;
