import { BiChevronDown, BiChevronRight } from "react-icons/bi"
import Tooltip from "../../../components/Custom/Tooltip"
import { useEffect, useState } from "react"
import { topProducts } from "../../../models/Dashboard"
import { dashboardApi } from "../../../services/DashboardService"
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { FaBoxesStacked } from "react-icons/fa6"
import { UserService } from "../../../services/UserService"

interface TopCustomer {
  user: {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string | null;
    phone: string | null;
    gender: boolean;
    role: string;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  amountSpent: number;
}

const Dashboard = () => {
  const [topproducts, setTopProducts] = useState<topProducts[]>([])
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [totalOrders, setTotalOrders] = useState(0);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  });

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await dashboardApi.topProducts()
        console.log(response)
        setTopProducts(response.body)
      } catch (error) {
        console.error("Error fetching top products:", error)
      }
    }
    fetchTopProducts()

    const fetchTopCustomers = async () => {
      try {
        const response = await UserService.getTop10Customer();
        console.log(response)
          setTopCustomers(response.items);
          console.log(response.items);
        
      } catch (error) {
        console.error("Error fetching top customers:", error);
      }
    };
    fetchTopCustomers();

    const fetchMonthlyStats = async () => {
      try {
        const { startDate, endDate } = getMonthRange(selectedYear, selectedMonth);
        const response = await dashboardApi.getTotalBetweenOrders(startDate, endDate);
        if (Array.isArray(response.body)) {
          setMonthlyStats(response.body);
        }
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
    };
    fetchMonthlyStats();

    const fetchTotalOrders = async () => {
      try {
        const response = await dashboardApi.getTotalOrders(startDate, endDate);
        setTotalOrders(response.body.totalOrders);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };
    fetchTotalOrders();
  }, [selectedMonth, selectedYear, startDate, endDate])

  const [isViewMore, setIsViewMore] = useState(false)

  const handleViewMore = () => {
    setIsViewMore(!isViewMore)
  }

  const getMonthRange = (year: number, month: number) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const format = (date: Date) => date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return {
      startDate: format(startDate),
      endDate: format(endDate),
    };
  };

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
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">Dashboard</h1>
      <div className="flex justify-between items-center w-10/12 m-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mt-2">
          <p className="text-black dark:text-white">From</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-1 text-sm border rounded dark:bg-white bg-gray-800 text-white dark:text-black dark:border-white border-gray-700"
          />
          <p className="text-black dark:text-white">To</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-1 text-sm border rounded dark:bg-white bg-gray-800 text-white dark:text-black dark:border-white border-gray-700"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-center mt-5">

        <div className="w-56 h-56 shadow-md rounded-xl bg-white flex flex-col items-center justify-center">
          <FaBoxesStacked size={100} className="text-blue-500" />
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold">+{totalOrders}</h3>
            <p className="text-md font-medium text-gray-500">Orders</p>
          </div>
        </div>
      </div>

      <div className="w-10/12 m-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Monthly Order Chart</h3>
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

      {/* top product & top customer */}
      <div className="grid grid-cols-2 gap-10 m-auto mt-10 w-10/12">
        {/* Top Products */}
        <section className="w-full shadow-xl rounded-xl p-5 text-center bg-white">
          <h1 className="text-3xl font-bold mb-5">Top Products</h1>
          <div className="space-y-4">
            {topproducts?.length === 0 ? (
              <div className="flex items-center justify-center p-3 shadow rounded-lg bg-gray-50 text-gray-500">
                <p>No products available</p>
              </div>
            ) : null}
            {topproducts?.map((product, index) => (
              <div
                key={index}
                className={`flex items-center  justify-between p-3 shadow rounded-lg 
                  ${index === 0
                    ? "bg-yellow-400 text-white"
                    : index === 1
                      ? "bg-gray-300 text-black"
                      : index === 2
                        ? "bg-amber-700 text-white"
                        : "bg-gray-50"
                  }
                  `}
              >
                <div className="relative">
                  {index === 0 || index === 1 || index === 2 ? (
                    <img src="https://cdn-icons-png.flaticon.com/512/4453/4453262.png" alt="" className="w-12 h-12 object-cover rounded-full" />
                  ) : null}
                </div>
                <p className="flex-1 text-lg font-medium">{product.name}</p>
                <Tooltip text="View more" position="top">
                  <BiChevronRight
                    size={20}
                    className="cursor-pointer hover:text-blue-500"
                  />
                </Tooltip>
              </div>
            ))}
          </div>
          <div className="mt-3 text-gray-500 flex justify-center">
            <Tooltip text="View more" position="top">
              <BiChevronDown size={20} className="cursor-pointer" />
            </Tooltip>
          </div>
        </section>

        {/* Top Customers */}
        <section className="w-full shadow-xl rounded-xl p-5 text-center bg-white">
          <h1 className="text-3xl font-bold mb-5">Top Customers</h1>
          <div className="space-y-4">
            {topCustomers.length === 0 ? (
              <div className="flex items-center justify-center p-3 shadow rounded-lg bg-gray-50 text-gray-500">
                <p>No user available</p>
              </div>
            ) : null}
            {topCustomers?.map((customer, index) => (
              <div key={index} className={`flex items-center justify-between p-3 shadow rounded-lg ${index === 0
                ? "bg-yellow-400 text-white"
                : index === 1
                  ? "bg-gray-300 text-black"
                  : index === 2
                    ? "bg-amber-700 text-white"
                    : "bg-gray-50"
                }`}
              >
                <img 
                  src={customer.user.avatar || "https://cdn-icons-png.flaticon.com/512/4453/4453262.png"} 
                  alt={customer.user.username} 
                  className="w-12 h-12 object-cover rounded-full" 
                />
                <p className="flex-1 text-lg font-medium">
                  {customer.user.firstname || customer.user.username}
                </p>
                <span className="text-lg font-bold">{customer.amountSpent}vnđ</span>
                <Tooltip text="View more" position="top">
                  <BiChevronRight size={20} className="cursor-pointer hover:text-blue-500" />
                </Tooltip>
              </div>
            ))}
          </div>
          <div className="mt-3 text-gray-500 flex justify-center">
            <Tooltip text="View more" position="top">
              <BiChevronDown size={20} className="cursor-pointer hover:text-blue-500" />
            </Tooltip>
          </div>
        </section>
      </div>
      <div className="display flex justify-center items-center mt-10 w-10/12 m-auto">
        <Tooltip text="View more" position="top">
          <BiChevronDown size={20} onClick={handleViewMore} className="cursor-pointer hover:text-blue-500" />
        </Tooltip>
      </div>

    </div>
  )
}

export default Dashboard