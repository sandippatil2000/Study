import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import SupplierRequests from './pages/SupplierRequests';
import CreateSupplierRequest from './pages/CreateSupplierRequest';
import ValidateFilePage from './pages/ValidateFilePage';
import ViewSupplierRequest from './pages/ViewSupplierRequest';
import ViewUserPage from './pages/ViewUserPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/users" element={<UsersPage />} />
                      <Route path="/users/view/:id" element={<ViewUserPage />} />
                      <Route path="/supplierRequests" element={<SupplierRequests />} />
                      <Route path="/supplierRequests/create" element={<CreateSupplierRequest />} />
                      <Route path="/supplierRequests/validate" element={<ValidateFilePage />} />
                      <Route path="/supplierRequests/view/:id" element={<ViewSupplierRequest />} />
                      <Route path="/supplierRequests/edit/:id" element={<ViewSupplierRequest />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
