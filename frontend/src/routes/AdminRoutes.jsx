import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoutes from "./AuthRoutes";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ManageSellersPage from "../pages/admin/ManageSellersPage";
import ManageProductsPage from "../pages/admin/ManageProductsPage";
import ManageOrdersPage from "../pages/admin/ManageOrdersPage";
import CategoriesManagementPage from "../pages/admin/CategoriesManagementPage";
import ReportsPage from "../pages/admin/ReportsPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AuthRoutes />} />
      <Route path="register" element={<AuthRoutes />} />

      <Route
        path="/"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
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
