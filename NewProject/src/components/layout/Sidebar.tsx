import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Layers as LayersIcon,
  Description as DescriptionIcon,
  Star as StarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export const DRAWER_WIDTH = 250;
export const MINI_DRAWER_WIDTH = 64;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  {
    label: 'Users',
    icon: <PeopleIcon />,
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

  { label: 'Reports', icon: <BarChartIcon />, path: '/reports' },
  { label: 'Components', icon: <LayersIcon />, path: '/components' },
  { label: 'Pages', icon: <DescriptionIcon />, path: '/pages' },
  { label: 'Premium', icon: <StarIcon />, path: '/premium' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose, collapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    if (!collapsed) setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawerWidth = collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        width: drawerWidth,
        transition: 'width 0.25s ease',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: collapsed ? 0 : 2,
          py: 1.5,
          background: 'linear-gradient(135deg, #C62828 0%, #8E0000 100%)',
          minHeight: 64,
          transition: 'padding 0.25s ease',
        }}
      >
        {/* Avatar always visible */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ShoppingCartIcon
            sx={{
              color: 'white',
              width: 36,
              height: 36,
              flexShrink: 0,
            }}
          />
          {/* Text hidden when collapsed */}
          {!collapsed && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2, fontSize: 16 }}>
                One Shop
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>
                Electronics Shop
              </Typography>
            </Box>
          )}
        </Box>

        {/* Toggle button — only on desktop sidebar */}
        {!collapsed && (
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Collapsed toggle button below logo */}
      {collapsed && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{ color: '#C62828', '&:hover': { bgcolor: 'rgba(198,40,40,0.08)' } }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {!collapsed && <Divider />}

      {/* Navigation */}
      <List sx={{ flex: 1, py: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map((item) => {
          const isActive = item.path
            ? location.pathname === item.path
            : item.children?.some((c) => location.pathname === c.path);

          return (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                  <ListItemButton
                    onClick={() => (item.children ? toggleMenu(item.label) : handleNav(item.path || '/'))}
                    selected={!!isActive}
                    sx={{
                      mx: 1,
                      borderRadius: 2,
                      mb: 0.25,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      px: collapsed ? 1 : 2,
                      minHeight: 44,
                      transition: 'padding 0.25s ease',
                      '&.Mui-selected': {
                        backgroundColor: '#C62828',
                        color: 'white',
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '&:hover': { backgroundColor: '#8E0000' },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(198, 40, 40, 0.08)',
                        color: '#C62828',
                        '& .MuiListItemIcon-root': { color: '#C62828' },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 38,
                        color: isActive ? 'white' : 'text.secondary',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {!collapsed && (
                      <>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                        />
                        {item.children && (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>

              {/* Sub-items — only in expanded mode */}
              {!collapsed && item.children && (
                <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.label} disablePadding>
                        <ListItemButton
                          onClick={() => handleNav(child.path)}
                          selected={location.pathname === child.path}
                          sx={{
                            pl: 7,
                            mx: 1,
                            borderRadius: 2,
                            mb: 0.25,
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(198, 40, 40, 0.12)',
                              color: '#C62828',
                            },
                          }}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{ fontSize: 13 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      {/* Footer */}
      {!collapsed && (
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            AdminPro v1.0.0
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer — always full width */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {/* Mobile always shows full sidebar */}
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            width: DRAWER_WIDTH,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2.5,
              py: 2,
              background: 'linear-gradient(135deg, #C62828 0%, #8E0000 100%)',
              minHeight: 64,
            }}
          >
            <ShoppingCartIcon sx={{ color: 'white', width: 36, height: 36 }} />
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2, fontSize: 16 }}>AdminPro</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>Dashboard Suite</Typography>
            </Box>
          </Box>
          <Divider />
          <List sx={{ flex: 1, py: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => (item.path ? handleNav(item.path) : undefined)}
                  selected={item.path ? location.pathname === item.path : false}
                  sx={{
                    mx: 1, borderRadius: 2, mb: 0.25,
                    '&.Mui-selected': { backgroundColor: '#C62828', color: 'white', '& .MuiListItemIcon-root': { color: 'white' } },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Permanent Drawer — desktop, collapsible */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          transition: 'width 0.25s ease',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
            overflowX: 'hidden',
            transition: 'width 0.25s ease',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
