import React, { useState } from 'react';
import './Topbar.css';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  Tooltip,
  Chip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopbarProps {
  title?: string;
}

const navLinks = [
  { label: 'Home', path: '/dashboard', icon: <HomeIcon fontSize="small" /> },
  { label: 'Products', path: '/dashboard/products', icon: <InventoryIcon fontSize="small" /> },
  { label: 'Categories', path: '/dashboard/analytics', icon: <CategoryIcon fontSize="small" /> },
  { label: 'Deals', path: '/dashboard/deals', icon: <LocalOfferIcon fontSize="small" /> },
];

const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const { totalCount, totalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar className="topbar-toolbar">

          {/* Brand / Title */}
          <Typography
            variant="h6"
            color="primary"
            className="topbar-brand"
          >
            {title}
          </Typography>

          {/* Navigation Menu Items */}
          <Box className="topbar-nav-container">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  startIcon={link.icon}
                  size="small"
                  className={`topbar-nav-link ${active ? 'topbar-nav-link-active' : 'topbar-nav-link-inactive'}`}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>




          
          <Box className="topbar-spacer" />

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton color="inherit" size="small">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Cart button */}
          <Tooltip title={`Cart · $${totalPrice.toFixed(2)}`}>
            <Box className="topbar-cart-wrapper">
              <IconButton
                id="cart-btn"
                onClick={() => navigate('/dashboard/cart')}
                className={`topbar-cart-btn ${totalCount > 0 ? 'topbar-cart-btn-active' : 'topbar-cart-btn-inactive'}`}
              >
                <Badge
                  badgeContent={totalCount}
                  color="error"
                  className="topbar-cart-badge"
                >
                  <ShoppingCartIcon sx={{ color: totalCount > 0 ? 'primary.main' : 'text.secondary', fontSize: 22 }} />
                </Badge>
                {totalCount > 0 && (
                  <Chip
                    label={`$${totalPrice.toFixed(2)}`}
                    size="small"
                    className="topbar-cart-chip"
                  />
                )}
              </IconButton>
            </Box>
          </Tooltip>

          {/* Avatar menu */}
          <Box
            onClick={handleMenuOpen}
            className="topbar-avatar-container"
          >
            <Avatar className="topbar-avatar">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Box className="topbar-user-info">
              <Typography variant="body2" fontWeight={600} lineHeight={1.2} fontSize={13}>
                {user?.username || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontSize={10}>
                {user?.role || 'Admin'}
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { minWidth: 180, borderRadius: 3, mt: 1, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
            }}
          >
            <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/settings'); }}>
              <AccountCircleIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/settings'); }}>
              <SettingsIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} /> Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>

        {/* Mobile nav strip */}
        <Box className="topbar-mobile-nav">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                size="small"
                className={`topbar-mobile-nav-link ${active ? 'topbar-nav-link-active' : 'topbar-nav-link-inactive'}`}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>
      </AppBar>
    </>
  );
};

export default Topbar;
