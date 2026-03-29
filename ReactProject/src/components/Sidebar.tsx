import React, { useState } from 'react';
import './Sidebar.css';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DRAWER_WIDTH = 220;
const MINI_WIDTH = 60;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Products', icon: <InventoryIcon />, path: '/dashboard/products' },
  { label: 'Users', icon: <PeopleIcon />, path: '/dashboard/users' },
  { label: 'Notifications', icon: <NotificationsIcon />, path: '/dashboard/notifications' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const width = collapsed ? MINI_WIDTH : DRAWER_WIDTH;

  return (
      <Drawer
      variant="permanent"
      className="sidebar-drawer"
      sx={{
        width,
        '& .MuiDrawer-paper': { width },
      }}
      classes={{ paper: 'sidebar-paper' }}
    >
      {/* Logo area */}
      <Toolbar className={`sidebar-toolbar ${collapsed ? 'sidebar-toolbar-collapsed' : 'sidebar-toolbar-expanded'}`}>
        {!collapsed && (
          <Box className="sidebar-logo-container">
            <Box className="sidebar-logo-icon">
              R
            </Box>
            <Typography variant="h6" fontWeight={800} className="sidebar-logo-text">
              RedDash
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          size="small"
          className="sidebar-collapse-btn"
        >
          {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>
      </Toolbar>

      {/* User avatar */}
      {!collapsed && (
        <Box sx={{ px: 2, pb: 2, pt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 3, p: 1.5 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, width: 40, height: 40 }}>
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#fff', lineHeight: 1.2 }}>
                {user?.username || 'User'}
              </Typography>
              <Chip label={user?.role || 'Admin'} size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', mt: 0.3 }} />
            </Box>
          </Box>
        </Box>
      )}

      <Divider className="sidebar-divider" />

      {/* Nav list */}
      <List className="sidebar-nav-list">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Tooltip key={item.path} title={collapsed ? item.label : ''} placement="right">
              <ListItemButton
                onClick={() => navigate(item.path)}
                className={`sidebar-nav-item ${collapsed ? 'sidebar-nav-item-collapsed' : 'sidebar-nav-item-expanded'} ${active ? 'sidebar-nav-item-active' : ''}`}
              >
                <ListItemIcon className={`sidebar-nav-icon ${collapsed ? 'sidebar-nav-icon-collapsed' : 'sidebar-nav-icon-expanded'}`}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 500, color: '#fff' }}
                  />
                )}
                {!collapsed && active && (
                  <Box className="sidebar-nav-indicator" />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider className="sidebar-divider" />
      <List className="sidebar-bottom-list">
        <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
          <ListItemButton
            onClick={logout}
            sx={{
              borderRadius: 2,
              minHeight: 40,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1.5 : 2,
              '&:hover': { background: 'rgba(255,255,255,0.15)' },
            }}
          >
            <ListItemIcon sx={{ color: 'rgba(255,255,255,0.8)', minWidth: collapsed ? 0 : 36, mr: collapsed ? 0 : 1 }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
