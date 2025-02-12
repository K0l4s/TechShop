import { BiMenu } from "react-icons/bi"
import default_avatar from "../../assets/default_avatar.png"
import { IoIosArrowDown } from "react-icons/io"

const AdminNavbar = () => {
  return (
    <div className="w-full bg-[#16283C] h-12 flex justify-between items-center  sticky top-0 text-white">
      <div className="h-full flex items-center px-4">
        <BiMenu className="rounded-full bg-purple-500 h-8 w-8 p-2 hover:bg-purple-400 cursor-pointer" />
        <div className="h-full flex items-center cursor-pointer">
          <img src="/image/logo.png" alt="" className="h-full p-3" />
          <p className="text-lg font-bold ">TECH GROUP</p>
        </div>
      </div>
      <div className="h-full flex items-center hover:bg-gray-500 cursor-pointer px-4">
        <img src={default_avatar} alt="avatar" className="w-auto h-full rounded-full p-2" />
        <p className="text-lg font-semibold">Kolas</p>
        <IoIosArrowDown className="text-2xl" />
      </div>
    </div>
  )
}

export default AdminNavbar