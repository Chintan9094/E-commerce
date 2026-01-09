import { Routes, Route } from 'react-router-dom';
import SellerLayout from '../layouts/SellerLayout';
import SellerDashboard from '../pages/seller/SellerDashboard';
import ProductListPage from '../pages/seller/ProductListPage';
import AddProductPage from '../pages/seller/AddProductPage';
import EditProductPage from '../pages/seller/EditProductPage';
import SellerOrdersPage from '../pages/seller/SellerOrdersPage';
import SellerOrderDetailsPage from '../pages/seller/SellerOrderDetailsPage';
import EarningsPage from '../pages/seller/EarningsPage';
import SellerProfilePage from '../pages/seller/SellerProfilePage';
import SellerLoginPage from '../pages/seller/SellerLoginPage';

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SellerLoginPage />} />
      <Route path="/" element={<SellerLayout />}>
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
