import { BiChevronDown, BiChevronRight } from "react-icons/bi"
import RevenueChart from "../../../components/Admin/Chart/RevenueChart"
import Tooltip from "../../../components/Custom/Tooltip"
import { useEffect, useState } from "react"
import { topProducts } from "../../../models/Dashboard"
import { dashboardApi } from "../../../services/DashboardService"

// const topproducts = [
//   {
//     img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
//     name: "Product 1",
//     sold: 100,
//   },
//   {
//     img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
//     name: "Product 2",
//     sold: 200,
//   },
//   {
//     img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
//     name: "Product 3",
//     sold: 300,
//   },
//   {
//     img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
//     name: "Product 4",
//     sold: 400,
//   },
//   {
//     img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
//     name: "Product 5",
//     sold: 500,
//   }
// ]

const topcustomers = [
  {
    img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
    name: "Customer 1",
    paid: 1000,
  },
  {
    img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
    name: "Customer 2",
    paid: 2000,
  },
  {
    img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
    name: "Customer 3",
    paid: 3000,
  },
  {
    img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
    name: "Customer 4",
    paid: 4000,
  },
  {
    img: "https://file.hstatic.net/1000026716/file/gearvn-ram-la-gi-4_ddc9d716da8549b4b1d5658c039dbcd3.jpg",
    name: "Customer 5",
    paid: 5000,
  }
]
const Dashboard = () => {
  const [topproducts, setTopProducts] = useState<topProducts[]>([
    //Demo data
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 100,
      salePrice: 80,
      stock: 50,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: 200,
      salePrice: 150,
      stock: 30,
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description 3",
      price: 300,
      salePrice: 250,
      stock: 20,
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description 4",
      price: 400,
      salePrice: 350,
      stock: 10,
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description 5",
      price: 500,
      salePrice: 450,
      stock: 5,
    },
    // Add more products as needed
  ])
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await dashboardApi.topProducts()
        // const data = await response.json()
        console.log(response)
        setTopProducts(response.body)
      } catch (error) {
        console.error("Error fetching top products:", error)
      }
    }
    fetchTopProducts()
  }
  , [])
  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center">
        <div className="w-56 h-56 shadow-md rounded-xl bg-white flex flex-col items-center justify-center">
          <div className="w-32 h-32">
            <img src="/image/logo.png" alt="" className="w-full object-fit object-cover" />
          </div>
          <h3 className="text-3xl font-bold">+150K</h3>
          <p className="text-md font-medium text-gray-500">Customers</p>
        </div>

        <div className="w-56 h-56 shadow-md rounded-lg bg-white flex flex-col items-center justify-center">
          <div className="w-32 h-32">
            <img src="/image/logo.png" alt="" className="w-full object-fit object-cover" />
          </div>
          <h3 className="text-3xl font-bold">+150K</h3>
          <p className="text-md font-medium text-gray-500">Customers</p>
        </div>

        <div className="w-56 h-56 shadow-md rounded-lg bg-white flex flex-col items-center justify-center">
          <div className="w-32 h-32">
            <img src="/image/logo.png" alt="" className="w-full object-fit object-cover" />
          </div>
          <h3 className="text-3xl font-bold">+150K</h3>
          <p className="text-md font-medium text-gray-500">Customers</p>
        </div>

        <div className="w-56 h-56 shadow-md rounded-lg bg-white flex flex-col items-center justify-center">
          <div className="w-32 h-32">
            <img src="/image/logo.png" alt="" className="w-full object-fit object-cover" />
          </div>
          <h3 className="text-3xl font-bold">+150K</h3>
          <p className="text-md font-medium text-gray-500">Customers</p>
        </div>
      </div>
      <div className="w-10/12 m-auto mt-10 bg-white shadow-md rounded-xl">
        <h1 className="text-3xl font-bold p-5 text-center">Revenue Chart</h1>

        <div className="w-7/12 m-auto border border-slate-500 border-dashed rounded-3xl border-sky-500/40 mb-5"></div>
        <RevenueChart />
      </div>
      {/* top product & top customer */}
      <div className="grid grid-cols-2 gap-10 m-auto mt-10 w-10/12">
        {/* Top Products */}
        <section className="w-full shadow-xl rounded-xl p-5 text-center bg-white">
          <h1 className="text-3xl font-bold mb-5">Top Products</h1>
          <div className="space-y-4">
            {topproducts.map((product, index) => (
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
                    <img src="https://cdn-icons-png.flaticon.com/512/4453/4453262.png" alt="" className="absolute w-5 right-0 -top-1" />
                  ) : null}
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4453/4453262.png"
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <p className="flex-1 text-lg font-medium">{product.name}</p>
                <span className="text-lg font-bold">{product.stock}</span>
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
            {topcustomers.map((customer, index) => (
              <div key={index} className={`flex items-center justify-between p-3 shadow rounded-lg ${index === 0
                ? "bg-yellow-400 text-white" // Top 1 - Vàng
                : index === 1
                  ? "bg-gray-300 text-black" // Top 2 - Bạc
                  : index === 2
                    ? "bg-amber-700 text-white" // Top 3 - Đồng
                    : "bg-gray-50"
                }`}
              >
                <img src={customer.img} alt={customer.name} className="w-12 h-12 object-cover rounded-full" />
                <p className="flex-1 text-lg font-medium">{customer.name}</p>
                <span className="text-lg font-bold">${customer.paid}</span>
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
    </div>
  )
}

export default Dashboard