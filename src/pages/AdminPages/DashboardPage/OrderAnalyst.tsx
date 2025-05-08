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
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

const getMonthRange = (year: number, month: number) => {
    const startDate = new Date(year, month - 1, 1); // JS tháng bắt đầu từ 0
    const endDate = new Date(year, month, 0); // ngày cuối tháng
    const format = (date: Date) => date.toISOString().split('T')[0];
    return {
        startDate: format(startDate),
        endDate: format(endDate),
    };
};

const OrderAnalyst = () => {
    const today = new Date();
    const [selectedYear, setSelectedYear] = React.useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState(today.getMonth() + 1); // JS tháng bắt đầu từ 0
    const [monthlyStats, setMonthlyStats] = React.useState<any[]>([]);
    const [todayStats, setTodayStats] = React.useState<any>();
    const [chartType, setChartType] = React.useState<'bar' | 'line'>('bar');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { startDate, endDate } = getMonthRange(selectedYear, selectedMonth);
                const response = await dashboardApi.getTotalBetweenOrders(startDate, endDate);
                const data = response.body;

                if (Array.isArray(data)) {
                    setMonthlyStats(data);

                    const now = new Date();
                    const todayIndex = now.getDate() - 1;
                    setTodayStats(data[todayIndex] ?? {});
                }
            } catch (error) {
                console.error('Error fetching monthly order data:', error);
            }
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    const returnRate =
        todayStats?.totalCanceled && todayStats?.totalDelivered
            ? ((todayStats.totalCanceled * 100) / (todayStats.totalCanceled + todayStats.totalDelivered)).toFixed(2)
            : 0;

    const stats = [
        { label: 'Total', value: todayStats?.total, icon: <FaShoppingCart className="text-blue-500" /> },
        { label: 'Confirmed', value: todayStats?.totalConfirm, icon: <FaCheckCircle className="text-green-500" /> },
        { label: 'Pending', value: todayStats?.totalPending, icon: <FaClock className="text-yellow-500" /> },
        { label: 'Processing', value: todayStats?.totalProcess, icon: <FaSpinner className="text-purple-500" /> },
        { label: 'Delivering', value: todayStats?.totalDelivering, icon: <FaTruck className="text-orange-500" /> },
        { label: 'Delivered', value: todayStats?.totalDelivered, icon: <FaBoxOpen className="text-teal-500" /> },
        { label: 'Canceled', value: todayStats?.totalCanceled, icon: <FaTimesCircle className="text-red-500" /> },
    ];

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    const chartData = {
        total: monthlyStats.slice(0, daysInMonth).map((d) => d?.total || 0),
        delivered: monthlyStats.slice(0, daysInMonth).map((d) => d?.totalDelivered || 0),
        canceled: monthlyStats.slice(0, daysInMonth).map((d) => d?.totalCanceled || 0),
    };

    const renderChart = () => {
        const commonProps = {
            xAxis: [{
                id: 'days',
                data: labels,
                scaleType: 'band' as const,
                label: 'Ngày',
                labelStyle: {
                    fill: '#ffffff'
                },
                tickLabelStyle: {
                    fill: '#ffffff'
                }
            }],
            yAxis: [{
                labelStyle: {
                    fill: '#ffffff'
                },
                tickLabelStyle: {
                    fill: '#ffffff'
                }
            }],
            series: [
                {
                    data: chartData.total,
                    label: 'Total',
                    color: '#3b82f6',
                    valueFormatter: (value: number | null) => value?.toString() || '0',
                    labelStyle: {
                        fill: '#ffffff'
                    }
                },
                {
                    data: chartData.delivered,
                    label: 'Delivered',
                    color: '#14b8a6',
                    valueFormatter: (value: number | null) => value?.toString() || '0',
                    labelStyle: {
                        fill: '#ffffff'
                    }
                },
                {
                    data: chartData.canceled,
                    label: 'Canceled',
                    color: '#ef4444',
                    valueFormatter: (value: number | null) => value?.toString() || '0',
                    labelStyle: {
                        fill: '#ffffff'
                    }
                },
            ],
            width: Math.max(800, daysInMonth * 20),
            height: 400,
            slotProps: {
                legend: {
                    labelStyle: {
                        fill: '#ffffff'
                    }
                }
            }
        };

        return chartType === 'bar' ? (
            <BarChart {...commonProps} />
        ) : (
            <LineChart {...commonProps} />
        );
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Daily Order Stats</h2>

            </div>

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

            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Monthly order chart</h3>
                    <div className="flex items-center gap-4">
                        <select
                            className="p-2 rounded border dark:bg-gray-800 dark:text-white"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Tháng {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            className="p-2 rounded border dark:bg-gray-800 dark:text-white"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {[2023, 2024, 2025].map((year) => (
                                <option key={year} value={year}>
                                    Năm {year}
                                </option>
                            ))}
                        </select>
                        <p className='text-white'>Chart Type:</p>
                        <select
                            className="p-2 rounded border dark:bg-gray-800 dark:text-white"
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value as 'bar' | 'line')}
                        >
                            <option value="bar">Bar Chart</option>
                            <option value="line">Line Chart</option>
                        </select>
                    </div>

                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm overflow-x-auto">
                    {renderChart()}
                </div>
            </div>
        </div>
    );
};

export default OrderAnalyst;
