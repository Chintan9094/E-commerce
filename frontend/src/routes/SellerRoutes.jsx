import { Routes, Route, Navigate } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoutes from "./AuthRoutes";
import SellerDashboard from "../pages/seller/SellerDashboard";

import ProductListPage from "../pages/seller/ProductListPage";
import AddProductPage from "../pages/seller/AddProductPage";
import EditProductPage from "../pages/seller/EditProductPage";
import SellerOrdersPage from "../pages/seller/SellerOrdersPage";
import SellerOrderDetailsPage from "../pages/seller/SellerOrderDetailsPage";
import EarningsPage from "../pages/seller/EarningsPage";
import SellerProfilePage from "../pages/seller/SellerProfilePage";


const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AuthRoutes />} />
      <Route path="register" element={<AuthRoutes />} />

      <Route
        path="/"
        element={
          <ProtectedRoute role="seller">
            <SellerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SellerDashboard />} />
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/add" element={<AddProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="orders" element={<SellerOrdersPage />} />
        <Route path="orders/:id" element={<SellerOrderDetailsPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="profile" element={<SellerProfilePage />} />
      </Route>
    </Routes>
  );
};

export default SellerRoutes;
