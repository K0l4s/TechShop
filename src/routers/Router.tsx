import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/AuthPages/LoginPage'
import RegisterPage from '../pages/AuthPages/RegisterPage'
import OTPVerificationPage from '../pages/AuthPages/OTPVerificationPage'
import ForgotPasswordPage from '../pages/AuthPages/ForgotPasswordPage'
import AdminLayout from './layout/AdminLayout'
import LandingPage from '../pages/MainPages/LandingPage/LandingPage'
import MainLayout from './layout/MainLayout'
import Dashboard from '../pages/AdminPages/DashboardPage/Dashboard'
import CartPage from '../pages/MainPages/CartPage/CartPage'
import UserInformationPage from '../pages/MainPages/UserPage/UserInformationPage'
import UserManageOrderPage from '../pages/MainPages/UserPage/UserManageOrderPage'
import LikePage from '../pages/MainPages/LikePage/LikePage'

const Router = () => {
  return (
    <Routes>
        {/* Các path không cần chỉnh layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/user-information" element={<UserInformationPage/>} />
        <Route path="/user-manage-order" element={<UserManageOrderPage/>} />
        <Route path="/like-page" element={<LikePage/>} />
        {/* Các path cần chỉnh layout */}
        {/* Admin */}
        <Route path="/admin/*" element={<AdminLayout />} >
            <Route path="" element={<Dashboard/>} />
            <Route path="user" element={<div>Admin User</div>} />
        </Route>
        {/* User */}
        <Route path="*" element={<MainLayout />} >
            <Route path="" element={<LandingPage/>} />
        </Route>
    </Routes>
  )
}

export default Router