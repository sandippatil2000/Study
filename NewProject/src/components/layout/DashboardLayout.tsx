import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar, { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from './Sidebar';
import Navbar from './Navbar';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${sidebarWidth}px)` },
          // ml: { md: `${sidebarWidth}px` },
          minHeight: '100vh',
          transition: 'margin 0.25s ease, width 0.25s ease',
        }}
      >
        <Navbar
          onMenuToggle={() => setMobileOpen(true)}
          collapsed={collapsed}
          sidebarWidth={sidebarWidth}
        />
        <Toolbar />
        <Box component="div" sx={{ p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
