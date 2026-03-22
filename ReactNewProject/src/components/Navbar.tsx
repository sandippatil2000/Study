import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Box,
  Menu, MenuItem, Tooltip, InputBase, Chip, Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from '../layouts/DashboardLayout';
import { getSessionUser } from '../common/CommonFunction';

interface NavbarProps {
  onMenuClick: () => void;
  onDesktopMenuClick: () => void;
  isCollapsed: boolean;
  pageTitle?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onDesktopMenuClick, isCollapsed, pageTitle = 'Dashboard' }) => {
  const { totalItems, setUser } = useUserContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const user = getSessionUser();

  const handleProfileOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);
  const handleLogout = () => { sessionStorage.removeItem('user'); handleProfileClose(); navigate('/login'); };

  const notifications = [
    { id: 1, text: 'New order #1045 received', time: '2 min ago', type: 'order' },
    { id: 2, text: 'Product "Air Max 90" low stock', time: '15 min ago', type: 'warning' },
    { id: 3, text: 'John Doe registered', time: '1 hr ago', type: 'user' },
  ];

  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${currentWidth}px)` },
        ml: { md: `${currentWidth}px` },
        backgroundColor: '#ffffff',
        color: '#1a1a2e',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        transition: 'width 0.3s ease, margin-left 0.3s ease',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Mobile menu toggle */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 1, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop menu toggle */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onDesktopMenuClick}
          sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page title */}
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e', flexGrow: 0, mr: 2 }}>
          {pageTitle}
        </Typography>



        <Box sx={{ flex: 1 }} />
        {/* Nav menu chips */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5 }}>
          {['Home', 'Products', 'Purchase Orders', 'Deals'].map((item) => (
            <Chip
              key={item}
              label={item}
              size="small"
              onClick={() => {
                const paths: Record<string, string> = {
                  Home: '/dashboard',
                  Products: '/dashboard/products',
                  'Purchase Orders': '/dashboard/orders',
                  Deals: '/dashboard/products',
                };
                navigate(paths[item]);
              }}
              sx={{
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: 13,
                '&:hover': { backgroundColor: '#FFEBEE', color: '#D32F2F' },
              }}
            />
          ))}
        </Box>



        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon sx={{ color: '#D32F2F' }} />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          PaperProps={{ sx: { width: 320, mt: 1, borderRadius: 2 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={700}>Notifications</Typography>
          </Box>
          <Divider />
          {notifications.map((n) => (
            <MenuItem key={n.id} sx={{ py: 1.5, display: 'block' }}>
              <Typography variant="body2" fontWeight={500}>{n.text}</Typography>
              <Typography variant="caption" color="text.secondary">{n.time}</Typography>
            </MenuItem>
          ))}
        </Menu>

        {/* Cart */}
        <Tooltip title="Shopping Cart">
          <IconButton onClick={() => { setUser(user ? user : undefined); navigate('/dashboard/cart'); }} sx={{ mx: 0.5 }}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon sx={{ color: '#D32F2F' }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile */}
        <Tooltip title="Account">
          <IconButton onClick={handleProfileOpen} sx={{ p: 0.5 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: '#D32F2F', fontSize: 14 }}>{user?.avatar || 'U'}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
          PaperProps={{ sx: { width: 200, mt: 1, borderRadius: 2 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="body2" fontWeight={700}>{user ? `${user.firstName} ${user.lastName}` : 'Guest User'}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.email || 'guest@shopdash.com'}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { handleProfileClose(); navigate('/dashboard/profile'); }}>
            <AccountCircleIcon sx={{ mr: 1.5, fontSize: 18 }} /> Profile
          </MenuItem>
          <MenuItem onClick={() => { handleProfileClose(); navigate('/dashboard/settings'); }}>
            <SettingsIcon sx={{ mr: 1.5, fontSize: 18 }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>
            <HelpOutlineIcon sx={{ mr: 1.5, fontSize: 18 }} /> Help
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: '#D32F2F' }}>
            <LogoutIcon sx={{ mr: 1.5, fontSize: 18 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
