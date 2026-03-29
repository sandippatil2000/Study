import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Logout,
  Settings,
  Person,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  Description as DescriptionIcon,
  Settings as SettingsNavIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavMenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navMenuItems: NavMenuItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
  {
    label: 'Users',
    icon: <PeopleIcon fontSize="small" />,
    children: [
      { label: 'All Users', path: '/users' },
      { label: 'Add User', path: '/users/add' },
    ],
  },
  {
    label: 'Supplier',
    icon: <ShoppingCartIcon />,
    children: [
      { label: 'Supplier Requests', path: '/supplierRequests' },
      { label: 'Create Request', path: '/supplierRequests/create' },
    ],
  },

  { label: 'Reports', icon: <BarChartIcon fontSize="small" />, path: '/reports' },
  { label: 'Settings', icon: <SettingsNavIcon fontSize="small" />, path: '/settings' },
];

interface NavbarProps {
  onMenuToggle: () => void;
  collapsed: boolean;
  sidebarWidth: number;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, sidebarWidth }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [navAnchor, setNavAnchor] = useState<{ el: HTMLElement; item: NavMenuItem } | null>(null);

  let currentPageTitle = '';
  for (const item of navMenuItems) {
    if (item.path && location.pathname.startsWith(item.path)) {
      currentPageTitle = item.label;
    }
    if (item.children) {
      const childMatch = item.children.find(c => c.path === location.pathname);
      if (childMatch) {
        currentPageTitle = childMatch.label;
        break;
      }
    }
    if (currentPageTitle) break;
  }
  if (!currentPageTitle) currentPageTitle = 'Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/login');
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        ml: { md: `${sidebarWidth}px` },
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'width 0.25s ease, margin 0.25s ease',
      }}
      elevation={0}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: { xs: 56, md: 64 }, flexWrap: 'wrap', py: 0.5 }}>
        <IconButton
          edge="start"
          onClick={onMenuToggle}
          sx={{ display: { md: 'none' }, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page Title */}
        <Typography variant="h5" fontWeight={700} sx={{ ml: { xs: 1, sm: 2 }, display: 'flex', alignItems: 'center' }}>
          {currentPageTitle}
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* Nav Menu Items — desktop only */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'end',
            gap: 0.25,
            ml: 1,
          }}
        >
          {navMenuItems.map((item) => {
            const isActive = item.path
              ? location.pathname === item.path
              : item.children?.some((c) => location.pathname === c.path);
            return (
              <Button
                key={item.label}
                startIcon={item.icon}
                endIcon={item.children ? <ExpandMoreIcon sx={{ fontSize: '14px !important' }} /> : undefined}
                onClick={(e) =>
                  item.children
                    ? setNavAnchor({ el: e.currentTarget, item })
                    : navigate(item.path || '/')
                }
                size="medium"
                sx={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#C62828' : 'text.secondary',
                  backgroundColor: isActive ? 'rgba(198,40,40,0.08)' : 'transparent',
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 1,
                  minWidth: 0,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(198,40,40,0.08)',
                    color: '#C62828',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Dropdown for nav items with children */}
        <Menu
          anchorEl={navAnchor?.el}
          open={Boolean(navAnchor)}
          onClose={() => setNavAnchor(null)}
          PaperProps={{ sx: { borderRadius: 2, mt: 0.5, minWidth: 160 } }}
        >
          {navAnchor?.item.children?.map((child) => (
            <MenuItem
              key={child.label}
              selected={location.pathname === child.path}
              onClick={() => { navigate(child.path); setNavAnchor(null); }}
              sx={{
                fontSize: 13,
                '&.Mui-selected': { color: '#C62828', fontWeight: 600 },
              }}
            >
              {child.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          PaperProps={{ sx: { width: 300, borderRadius: 2, mt: 1 } }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={700}>Notifications</Typography>
          </Box>
          {['New user registered', 'Order #1234 placed', 'Server alert: High CPU', 'Report generated'].map((msg, i) => (
            <MenuItem key={i} sx={{ py: 1.5, fontSize: 13, gap: 1 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: '#C62828', fontSize: 12 }}>{i + 1}</Avatar>
              {msg}
            </MenuItem>
          ))}
        </Menu>

        {/* User Avatar */}
        <Tooltip title="Account">
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar sx={{ width: 40, height: 40, bgcolor: '#C62828', fontSize: 16 }}>
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                {user?.name || 'Admin'}
              </Typography>
              <Chip
                label={user?.role || 'Admin'}
                size="small"
                sx={{ height: 16, fontSize: 10, bgcolor: '#ffebee', color: '#C62828', fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 180 } }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={700}>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
          </Box>
          <MenuItem sx={{ gap: 1.5, py: 1.2 }}><Person fontSize="small" /> Profile</MenuItem>
          <MenuItem sx={{ gap: 1.5, py: 1.2 }}><Settings fontSize="small" /> Settings</MenuItem>
          <MenuItem sx={{ gap: 1.5, py: 1.2, color: 'error.main' }} onClick={handleLogout}>
            <Logout fontSize="small" /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
