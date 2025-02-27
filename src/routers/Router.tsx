import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/AuthPages/LoginPage'
import AdminLayout from './layout/AdminLayout'
import LandingPage from '../pages/MainPages/LandingPage/LandingPage'
import MainLayout from './layout/MainLayout'
import Dashboard from '../pages/AdminPages/DashboardPage/Dashboard'
import ListCustomerPage from '../pages/AdminPages/AdminUser/CustomerPage'
import EditCustomerPage from '../pages/AdminPages/AdminUser/EditUser'
import ListCategoriesPage from '../pages/AdminPages/AdminCategories/CategoriesPage'
import AddCategoryPage from '../pages/AdminPages/AdminCategories/AddCategories'
import EditCategoryPage from '../pages/AdminPages/AdminCategories/EditCategories'
import ListOrderPage from '../pages/AdminPages/AdminOrders/OrderPage'
const Router = () => {
  return (
    <Routes>
      {/* Các path không cần chỉnh layout */}
      <Route path="/login" element={<LoginPage />} />
      {/* Các path cần chỉnh layout */}
      {/* Admin */}
      <Route path="/admin/*" element={<AdminLayout />} >
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<ListCustomerPage />} />
        <Route path="edit-user" element={<EditCustomerPage />} />
        <Route path="categories" element={<ListCategoriesPage />} />
        <Route path="add-categories" element={<AddCategoryPage />} />
        <Route path="edit-categories" element={<EditCategoryPage />} />
        <Route path="orders" element={<ListOrderPage />} />

      </Route>
      {/* User */}
      <Route path="*" element={<MainLayout />} >
        <Route path="" element={<LandingPage />} />
      </Route>
    </Routes>
  )
}

export default Router