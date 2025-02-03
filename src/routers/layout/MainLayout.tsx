import { Outlet } from "react-router-dom"
import MainNavbar from "../../components/Navbar/MainNavbar"


const MainLayout = () => {
  return (
    <>
    <MainNavbar/>
    <Outlet />
</>
  )
}

export default MainLayout