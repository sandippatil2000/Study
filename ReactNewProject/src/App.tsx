import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { UserProvider } from './contexts/UserContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import PurchaseOrdersPage from './pages/PurchaseOrdersPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import CartPage from './pages/CartPage';
import CreatePurchaseOrderPage from './pages/CreatePurchaseOrderPage';
import UpdatePurchaseOrderpage from './pages/UpdatePurchaseOrderpage';
import UserProfilePage from './pages/UserProfilePage';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<PurchaseOrdersPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="create-order" element={<CreatePurchaseOrderPage />} />
            <Route path="update-order" element={<UpdatePurchaseOrderpage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>
);

export default App;
