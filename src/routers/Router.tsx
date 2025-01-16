import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/AuthPage/LoginPage'
import AdminLayout from './layout/AdminLayout'
import LandingPage from '../pages/LandingPage/LandingPage'
import MainLayout from './layout/MainLayout'

const Router = () => {
  return (
    <Routes>
        {/* Các path không cần chỉnh layout */}
        <Route path="/login" element={<LoginPage />} />
        {/* Các path cần chỉnh layout */}
        {/* Admin */}
        <Route path="/admin/*" element={<AdminLayout />} >
            <Route path="" element={<div>Admin Home</div>} />
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