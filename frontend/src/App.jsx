import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import SellerRoutes from './routes/SellerRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useAuth } from './context/AuthContext';
import Loader from './components/common/Loader';
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user ? (
            user.role === "admin" ? 
              <Navigate to="/admin/dashboard" replace /> :
            user.role === "seller" ?
              <Navigate to="/seller/dashboard" replace /> :
              <Navigate to="/user" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        } />
        
        <Route path="/user/*" element={<UserRoutes />} />
        
        <Route path="/seller/*" element={<SellerRoutes />} />
        
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
