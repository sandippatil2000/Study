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
  Divider,
  ListItemIcon,
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
  CheckCircleOutline,
  WarningAmber,
  PersonAdd,
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
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 14 }} />, path: '/dashboard' },
  {
    label: 'Users',
    icon: <PeopleIcon sx={{ fontSize: 14 }} />,
    children: [
      { label: 'All Users', path: '/users' },
      { label: 'Add User', path: '/users/add' },
    ],
  },
  {
    label: 'Supplier',
    icon: <ShoppingCartIcon sx={{ fontSize: 14 }} />,
    children: [
      { label: 'Supplier Requests', path: '/supplierRequests' },
      { label: 'Create Request', path: '/supplierRequests/create' },
    ],
  },
  {
    label: 'Validation',
    icon: <ShoppingCartIcon sx={{ fontSize: 14 }} />,
    children: [
      { label: 'Validation Requests', path: '/ValidationRequests' },
    ],
  },
  { label: 'Reports', icon: <BarChartIcon sx={{ fontSize: 14 }} />, path: '/reports' },
  { label: 'Settings', icon: <SettingsNavIcon sx={{ fontSize: 14 }} />, path: '/settings' },
];

const mockNotifications = [
  { id: 1, msg: 'New user registered', sub: 'Just now', icon: <PersonAdd sx={{ fontSize: 14 }} />, color: '#4CAF50' },
  { id: 2, msg: 'Order #1234 placed', sub: '5m ago', icon: <ShoppingCartIcon sx={{ fontSize: 14 }} />, color: '#2196F3' },
  { id: 3, msg: 'Server alert: High CPU', sub: '12m ago', icon: <WarningAmber sx={{ fontSize: 14 }} />, color: '#FF9800' },
  { id: 4, msg: 'Report generated', sub: '1h ago', icon: <CheckCircleOutline sx={{ fontSize: 14 }} />, color: '#9C27B0' },
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
      const childMatch = item.children.find((c) => c.path === location.pathname);
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

  //const userInitial = user?.name?.charAt(0).toUpperCase() || 'A';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        ml: { md: `${sidebarWidth}px` },
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: 'text.primary',
        borderBottom: 'none',
        transition: 'width 0.25s ease, margin 0.25s ease',
        // Glowing bottom gradient accent line
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #C62828 0%, #FF6B6B 40%, #C62828 70%, #8E0000 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 3s ease infinite',
        },
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          gap: 0.75,
          minHeight: { xs: '46px !important', md: '42px !important' },
          px: { xs: 1.5, md: 2 },
          py: 0,
        }}
      >
        {/* Mobile menu toggle */}
        <IconButton
          edge="start"
          size="small"
          onClick={onMenuToggle}
          sx={{
            display: { md: 'none' },
            color: 'text.primary',
            p: 0.5,
            borderRadius: 1.5,
            '&:hover': { background: 'rgba(198,40,40,0.08)', color: '#C62828' },
          }}
        >
          <MenuIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Page Title with gradient text */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, ml: { xs: 0.5, sm: 0.5 } }}>
          <Box
            sx={{
              width: 3,
              height: 18,
              borderRadius: 4,
              background: 'linear-gradient(180deg, #C62828 0%, #FF6B6B 100%)',
              flexShrink: 0,
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #C62828 0%, #B71C1C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: 0.2,
            }}
          >
            {currentPageTitle}
          </Typography>
        </Box>

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
                endIcon={
                  item.children ? (
                    <ExpandMoreIcon
                      sx={{
                        fontSize: '11px !important',
                        transition: 'transform 0.2s',
                        transform: navAnchor?.item.label === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  ) : undefined
                }
                onClick={(e) =>
                  item.children
                    ? setNavAnchor({ el: e.currentTarget, item })
                    : navigate(item.path || '/')
                }
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#fff' : 'text.secondary',
                  background: isActive
                    ? 'linear-gradient(135deg, #C62828 0%, #E53935 100%)'
                    : 'transparent',
                  borderRadius: 5,
                  px: 1.25,
                  py: 0.4,
                  minWidth: 0,
                  textTransform: 'none',
                  lineHeight: 1.4,
                  boxShadow: isActive ? '0 2px 8px rgba(198,40,40,0.35)' : 'none',
                  transition: 'all 0.2s ease',
                  '& .MuiButton-startIcon': { mr: 0.5, ml: 0 },
                  '&:hover': {
                    background: isActive
                      ? 'linear-gradient(135deg, #B71C1C 0%, #C62828 100%)'
                      : 'rgba(198,40,40,0.07)',
                    color: isActive ? '#fff' : '#C62828',
                    transform: 'translateY(-1px)',
                    boxShadow: isActive ? '0 4px 12px rgba(198,40,40,0.45)' : 'none',
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
          TransitionProps={{ timeout: 180 }}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 155,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              backdropFilter: 'blur(8px)',
              overflow: 'visible',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: -6,
                left: 18,
                width: 12,
                height: 12,
                bgcolor: 'background.paper',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRight: 'none',
                borderBottom: 'none',
                transform: 'rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          {navAnchor?.item.children?.map((child) => (
            <MenuItem
              key={child.label}
              selected={location.pathname === child.path}
              onClick={() => { navigate(child.path); setNavAnchor(null); }}
              sx={{
                fontSize: '0.73rem',
                py: 0.85,
                mx: 0.5,
                borderRadius: 1.5,
                mb: 0.25,
                fontWeight: location.pathname === child.path ? 600 : 400,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(198,40,40,0.1) 0%, rgba(229,57,53,0.08) 100%)',
                  color: '#C62828',
                },
                '&:hover': { background: 'rgba(198,40,40,0.06)', color: '#C62828' },
              }}
            >
              {child.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Divider */}
        {/* <Box
          sx={{
            width: 1,
            height: 20,
            bgcolor: 'divider',
            borderRadius: 1,
            display: { xs: 'none', md: 'block' },
            mx: 0.5,
          }}
        /> */}

        {/* Notifications */}
        <Tooltip title="Notifications" arrow>
          <IconButton
            size="small"
            onClick={(e) => setNotifAnchor(e.currentTarget)}
            sx={{
              p: 0.6,
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                background: 'rgba(198,40,40,0.08)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Badge
              badgeContent={mockNotifications.length}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: 8,
                  minWidth: 14,
                  height: 14,
                  fontWeight: 700,
                  boxShadow: '0 0 0 2px #fff',
                  animation: 'pulse 2s ease-in-out infinite',
                },
                '@keyframes pulse': {
                  '0%, 100%': { boxShadow: '0 0 0 2px #fff, 0 0 0 4px rgba(198,40,40,0)' },
                  '50%': { boxShadow: '0 0 0 2px #fff, 0 0 0 5px rgba(198,40,40,0.35)' },
                },
              }}
            >
              <NotificationsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Notifications Dropdown */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          TransitionProps={{ timeout: 180 }}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 280,
              borderRadius: 2.5,
              mt: 1,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
              overflow: 'hidden',
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.2,
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption" fontWeight={700} sx={{ color: '#fff', fontSize: '0.72rem' }}>
              🔔 Notifications
            </Typography>
            <Chip
              label={`${mockNotifications.length} new`}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 9, height: 16, fontWeight: 600 }}
            />
          </Box>

          {mockNotifications.map((n, i) => (
            <MenuItem
              key={n.id}
              sx={{
                py: 1,
                px: 1.5,
                gap: 1,
                alignItems: 'flex-start',
                borderBottom: i < mockNotifications.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                '&:hover': { background: 'rgba(198,40,40,0.04)' },
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: n.color,
                  fontSize: 12,
                  flexShrink: 0,
                  mt: 0.2,
                  boxShadow: `0 2px 8px ${n.color}50`,
                }}
              >
                {n.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" display="block" fontWeight={600} sx={{ fontSize: '0.71rem', lineHeight: 1.3 }}>
                  {n.msg}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>
                  {n.sub}
                </Typography>
              </Box>
            </MenuItem>
          ))}

          <Box sx={{ px: 2, py: 0.8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                color: '#C62828',
                fontWeight: 600,
                fontSize: '0.68rem',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View all notifications
            </Typography>
          </Box>
        </Menu>

        {/* User Avatar Trigger */}
        <Tooltip title="Account" arrow>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              cursor: 'pointer',
              ml: 0.5,
              pl: 1,
              pr: 0.75,
              py: 0.35,
              borderRadius: 6,
              border: '1px solid transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(198,40,40,0.06)',
                border: '1px solid rgba(198,40,40,0.18)',
                transform: 'translateY(-1px)',
              },
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {/* Avatar with glow ring */}
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C62828, #FF6B6B)',
                  zIndex: 0,
                  animation: 'spin 3s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              <Avatar
                sx={{
                  width: 26,
                  height: 26,
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 1,
                  position: 'relative',
                  border: '1.5px solid #fff',
                  boxShadow: '0 2px 8px rgba(198,40,40,0.4)',
                }}
              >
                {/* {user?.userInitial} */}
              </Avatar>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={700} lineHeight={1.2} sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                {user?.firstname || ''}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#C62828', fontWeight: 600, lineHeight: 1 }}>
                {user?.role || ''}
              </Typography>
            </Box>

            <ExpandMoreIcon sx={{ fontSize: 13, color: 'text.disabled', display: { xs: 'none', sm: 'block' } }} />
          </Box>
        </Tooltip>

        {/* Account Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          TransitionProps={{ timeout: 180 }}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: 2.5,
              mt: 1,
              minWidth: 190,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
              overflow: 'hidden',
            },
          }}
        >
          {/* Profile header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: 'rgba(255,255,255,0.25)',
                fontSize: 13,
                fontWeight: 700,
                border: '2px solid rgba(255,255,255,0.5)',
              }}
            >
              {/* {user?.userInitial} */}
            </Avatar>
            <Box>
              <Typography variant="caption" fontWeight={700} sx={{ color: '#fff', display: 'block', fontSize: '0.72rem' }}>
                {user?.name || 'Admin'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.62rem' }}>
                {user?.email || ''}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ py: 0.5 }}>
            <MenuItem
              sx={{ gap: 1.2, py: 0.85, mx: 0.5, borderRadius: 1.5, mb: 0.25, fontSize: '0.73rem', '&:hover': { background: 'rgba(198,40,40,0.06)', color: '#C62828' } }}
              onClick={() => { setAnchorEl(null); if (user?.id) navigate(`/users/view/${user.id}`); }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Person sx={{ fontSize: 15, color: '#C62828' }} />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem
              sx={{ gap: 1.2, py: 0.85, mx: 0.5, borderRadius: 1.5, mb: 0.25, fontSize: '0.73rem', '&:hover': { background: 'rgba(198,40,40,0.06)', color: '#C62828' } }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Settings sx={{ fontSize: 15, color: 'text.secondary' }} />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />

            <MenuItem
              sx={{ gap: 1.2, py: 0.85, mx: 0.5, borderRadius: 1.5, fontSize: '0.73rem', color: 'error.main', '&:hover': { background: 'rgba(211,47,47,0.07)' } }}
              onClick={handleLogout}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Logout sx={{ fontSize: 15, color: 'error.main' }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
