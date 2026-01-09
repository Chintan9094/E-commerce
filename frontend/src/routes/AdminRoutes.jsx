import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsersPage from '../pages/admin/ManageUsersPage';
import ManageSellersPage from '../pages/admin/ManageSellersPage';
import ManageProductsPage from '../pages/admin/ManageProductsPage';
import ManageOrdersPage from '../pages/admin/ManageOrdersPage';
import CategoriesManagementPage from '../pages/admin/CategoriesManagementPage';
import ReportsPage from '../pages/admin/ReportsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="sellers" element={<ManageSellersPage />} />
        <Route path="products" element={<ManageProductsPage />} />
        <Route path="orders" element={<ManageOrdersPage />} />
        <Route path="categories" element={<CategoriesManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
