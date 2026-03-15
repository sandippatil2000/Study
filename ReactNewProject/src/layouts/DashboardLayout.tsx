import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export const DRAWER_WIDTH = 240;
export const COLLAPSED_WIDTH = 80;

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/products': 'Products',
  '/dashboard/orders': 'Purchase Orders',
  '/dashboard/users': 'Users',
  '/dashboard/cart': 'Cart',
  '/dashboard/settings': 'Settings',
};

const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';
  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Sidebar 
        mobileOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        isCollapsed={isCollapsed} 
      />
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { md: `calc(100% - ${currentWidth}px)` }, 
          minHeight: '100vh',
          transition: 'width 0.3s ease',
        }}
      >
        <Navbar 
          onMenuClick={() => setMobileOpen(true)} 
          onDesktopMenuClick={() => setIsCollapsed(!isCollapsed)}
          isCollapsed={isCollapsed}
          pageTitle={pageTitle} 
        />
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
