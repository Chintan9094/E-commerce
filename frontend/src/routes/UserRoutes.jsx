import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoutes from "./AuthRoutes";

import HomePage from "../pages/user/HomePage";
import ProductListingPage from "../pages/user/ProductListingPage";
import ProductDetailsPage from "../pages/user/ProductDetailsPage";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import OrderSuccessPage from "../pages/user/OrderSuccessPage";
import MyOrdersPage from "../pages/user/MyOrdersPage";
import OrderDetailsPage from "../pages/user/OrderDetailsPage";
import ProfilePage from "../pages/user/ProfilePage";
import AddressManagementPage from "../pages/user/AddressManagementPage";
import WishlistPage from "../pages/user/WishlistPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthRoutes />} />
      <Route path="/register" element={<AuthRoutes />} />

      <Route
        path="/"
        element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListingPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="addresses" element={<AddressManagementPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
