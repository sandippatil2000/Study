import React from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography, Divider, Box, Avatar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate, useLocation } from 'react-router-dom';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from '../layouts/DashboardLayout';
import { getSessionUser } from '../common/CommonFunction';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Products', icon: <InventoryIcon />, path: '/dashboard/products' },
  { label: 'Purchase Orders', icon: <ReceiptIcon />, path: '/dashboard/orders' },
  { label: 'Users', icon: <PeopleIcon />, path: '/dashboard/users' },
  { label: 'Cart', icon: <ShoppingCartIcon />, path: '/dashboard/cart' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose, isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getSessionUser();

  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#D32F2F', overflowX: 'hidden' }}>
      <Toolbar sx={{ px: isCollapsed ? 1 : 2, py: 2, justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: '8px', background: 'linear-gradient(135deg, #ef5c5cff, #b20502ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}
          >
            <ShoppingCartIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          {!isCollapsed && (
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
              ShopDash
            </Typography>
          )}
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(87, 74, 74, 0.08)' }} />
      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); onClose(); }}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'rgba(211,47,47,0.2)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                  py: 1,
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? '#EF5350' : 'rgba(255,255,255)', minWidth: isCollapsed ? 'auto' : 40, justifyContent: 'center' }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14, fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    }}
                  />
                )}
                {isActive && !isCollapsed && (
                  <Box
                    sx={{
                      width: 4, height: 32, borderRadius: 2,
                      backgroundColor: '#fff', ml: 1,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <Box sx={{ p: isCollapsed ? 1 : 2, display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: 1.5 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: '#D32F2F', fontSize: 14, flexShrink: 0 }}>{user?.avatar || 'U'}</Avatar>
        {!isCollapsed && (
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, whiteSpace: 'nowrap' }}>
              {user?.email || 'guest@shopdash.com'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: currentWidth }, flexShrink: { md: 0 }, transition: 'width 0.3s ease' }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: currentWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            transition: 'width 0.3s ease',
            overflowX: 'hidden'
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
