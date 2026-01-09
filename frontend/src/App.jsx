import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import SellerRoutes from './routes/SellerRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />
        
        <Route path="/user/*" element={<UserRoutes />} />
        
        <Route path="/seller/*" element={<SellerRoutes />} />
        
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
