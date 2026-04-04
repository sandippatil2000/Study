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
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 15 }} />, path: '/dashboard' },
  {
    label: 'Users',
    icon: <PeopleIcon sx={{ fontSize: 15 }} />,
    children: [
      { label: 'All Users', path: '/users' },
      { label: 'Add User', path: '/users/add' },
    ],
  },
  {
    label: 'Supplier',
    icon: <ShoppingCartIcon sx={{ fontSize: 15 }} />,
    children: [
      { label: 'Supplier Requests', path: '/supplierRequests' },
      { label: 'Create Request', path: '/supplierRequests/create' },
    ],
  },
  {
    label: 'Validation',
    icon: <ShoppingCartIcon sx={{ fontSize: 15 }} />,
    children: [
      { label: 'Validation Requests', path: '/ValidationRequests' },
    ],
  },
  { label: 'Reports', icon: <BarChartIcon sx={{ fontSize: 15 }} />, path: '/reports' },
  { label: 'Settings', icon: <SettingsNavIcon sx={{ fontSize: 15 }} />, path: '/settings' },
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
      {/* Compact Toolbar: 40px desktop, 44px mobile */}
      <Toolbar
        variant="dense"
        sx={{
          gap: 1,
          minHeight: { xs: '44px !important', md: '40px !important' },
          px: { xs: 1, md: 1.5 },
          py: 0,
        }}
      >
        <IconButton
          edge="start"
          size="small"
          onClick={onMenuToggle}
          sx={{ display: { md: 'none' }, color: 'text.primary', p: 0.5 }}
        >
          <MenuIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Page Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ ml: { xs: 0.5, sm: 1 }, fontSize: '0.82rem', display: 'flex', alignItems: 'center' }}
        >
          {currentPageTitle}
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* Nav Menu Items — desktop only */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.25,
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
                endIcon={item.children ? <ExpandMoreIcon sx={{ fontSize: '12px !important' }} /> : undefined}
                onClick={(e) =>
                  item.children
                    ? setNavAnchor({ el: e.currentTarget, item })
                    : navigate(item.path || '/')
                }
                size="small"
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#C62828' : 'text.secondary',
                  backgroundColor: isActive ? 'rgba(198,40,40,0.08)' : 'transparent',
                  borderRadius: 1.5,
                  px: 1,
                  py: 0.4,
                  minWidth: 0,
                  textTransform: 'none',
                  lineHeight: 1.4,
                  '& .MuiButton-startIcon': { mr: 0.5 },
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
          PaperProps={{ sx: { borderRadius: 1.5, mt: 0.5, minWidth: 140 } }}
        >
          {navAnchor?.item.children?.map((child) => (
            <MenuItem
              key={child.label}
              selected={location.pathname === child.path}
              onClick={() => { navigate(child.path); setNavAnchor(null); }}
              sx={{
                fontSize: '0.75rem',
                py: 0.8,
                '&.Mui-selected': { color: '#C62828', fontWeight: 600 },
              }}
            >
              {child.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton size="small" onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
            <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 14, height: 14 } }}>
              <NotificationsIcon sx={{ fontSize: 18 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          PaperProps={{ sx: { width: 260, borderRadius: 2, mt: 0.5 } }}
        >
          <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" fontWeight={700}>Notifications</Typography>
          </Box>
          {['New user registered', 'Order #1234 placed', 'Server alert: High CPU', 'Report generated'].map((msg, i) => (
            <MenuItem key={i} sx={{ py: 1, fontSize: '0.72rem', gap: 1 }}>
              <Avatar sx={{ width: 22, height: 22, bgcolor: '#C62828', fontSize: 10 }}>{i + 1}</Avatar>
              {msg}
            </MenuItem>
          ))}
        </Menu>

        {/* User Avatar */}
        <Tooltip title="Account">
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', ml: 0.5 }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar sx={{ width: 28, height: 28, bgcolor: '#C62828', fontSize: 12 }}>
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={600} lineHeight={1.2} sx={{ fontSize: '0.72rem' }}>
                {user?.name || 'Admin'}
              </Typography>
              <Chip
                label={user?.role || 'Admin'}
                size="small"
                sx={{ height: 14, fontSize: 9, bgcolor: '#ffebee', color: '#C62828', fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { borderRadius: 2, mt: 0.5, minWidth: 160 } }}
        >
          <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" fontWeight={700}>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary" display="block">{user?.email}</Typography>
          </Box>
          <MenuItem
            sx={{ gap: 1, py: 0.8, fontSize: '0.75rem' }}
            onClick={() => {
              setAnchorEl(null);
              if (user?.id) navigate(`/users/view/${user.id}`);
            }}
          >
            <Person sx={{ fontSize: 15 }} /> Profile
          </MenuItem>
          <MenuItem sx={{ gap: 1, py: 0.8, fontSize: '0.75rem' }}><Settings sx={{ fontSize: 15 }} /> Settings</MenuItem>
          <MenuItem sx={{ gap: 1, py: 0.8, fontSize: '0.75rem', color: 'error.main' }} onClick={handleLogout}>
            <Logout sx={{ fontSize: 15 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
