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

export const DRAWER_WIDTH = 190;
export const MINI_DRAWER_WIDTH = 48;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 16 }} />, path: '/dashboard' },
  {
    label: 'Users',
    icon: <PeopleIcon sx={{ fontSize: 16 }} />,
    children: [
      { label: 'All Users', path: '/users' },
      { label: 'Add User', path: '/users/add' },
    ],
  },
  {
    label: 'Supplier',
    icon: <ShoppingCartIcon sx={{ fontSize: 16 }} />,
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
  { label: 'Reports', icon: <BarChartIcon sx={{ fontSize: 16 }} />, path: '/reports' },
  { label: 'Components', icon: <LayersIcon sx={{ fontSize: 16 }} />, path: '/components' },
  { label: 'Pages', icon: <DescriptionIcon sx={{ fontSize: 16 }} />, path: '/pages' },
  { label: 'Premium', icon: <StarIcon sx={{ fontSize: 16 }} />, path: '/premium' },
  { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: 16 }} />, path: '/settings' },
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
          px: collapsed ? 0 : 1.5,
          py: 0.5,
          background: 'linear-gradient(135deg, #C62828 0%, #8E0000 100%)',
          minHeight: 40,
          transition: 'padding 0.25s ease',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingCartIcon sx={{ color: 'white', width: 20, height: 20, flexShrink: 0 }} />
          {!collapsed && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2, fontSize: 12 }}>
                One Shop
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 9 }}>
                Electronics Shop
              </Typography>
            </Box>
          )}
        </Box>

        {!collapsed && (
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{ color: 'white', p: 0.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
          >
            <ChevronLeftIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      {/* Collapsed toggle */}
      {collapsed && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{ color: '#C62828', p: 0.5, '&:hover': { bgcolor: 'rgba(198,40,40,0.08)' } }}
          >
            <ChevronRightIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      {!collapsed && <Divider />}

      {/* Navigation */}
      <List sx={{ flex: 1, py: 0.5, overflowY: 'auto', overflowX: 'hidden' }}>
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
                      mx: 0.5,
                      borderRadius: 1,
                      mb: 0.1,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      px: collapsed ? 0.5 : 1,
                      minHeight: 28,
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
                        minWidth: collapsed ? 0 : 26,
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
                          primaryTypographyProps={{ fontSize: 11, fontWeight: 500 }}
                        />
                        {item.children && (
                          openMenus[item.label]
                            ? <ExpandLess sx={{ fontSize: 15 }} />
                            : <ExpandMore sx={{ fontSize: 15 }} />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>

              {/* Sub-items */}
              {!collapsed && item.children && (
                <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.label} disablePadding>
                        <ListItemButton
                          onClick={() => handleNav(child.path)}
                          selected={location.pathname === child.path}
                          sx={{
                            pl: 4,
                            mx: 0.5,
                            borderRadius: 1,
                            mb: 0.1,
                            minHeight: 24,
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(198, 40, 40, 0.12)',
                              color: '#C62828',
                            },
                          }}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{ fontSize: 10 }}
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
        <Box sx={{ px: 1.5, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ fontSize: 9 }}>
            AdminPro v1.0.0
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
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
              gap: 1,
              px: 1.5,
              py: 0.5,
              background: 'linear-gradient(135deg, #C62828 0%, #8E0000 100%)',
              minHeight: 40,
            }}
          >
            <ShoppingCartIcon sx={{ color: 'white', width: 20, height: 20 }} />
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2, fontSize: 12 }}>One Shop</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 9 }}>Electronics Shop</Typography>
            </Box>
          </Box>
          <Divider />
          <List sx={{ flex: 1, py: 0.5 }}>
            {navItems.map((item) => {
              const isActive = item.path
                ? location.pathname === item.path
                : item.children?.some((c) => location.pathname === c.path);

              return (
                <React.Fragment key={item.label}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => (item.children ? toggleMenu(item.label) : handleNav(item.path || '/'))}
                      selected={!!isActive}
                      sx={{
                        mx: 0.5, borderRadius: 1, mb: 0.1, minHeight: 28,
                        '&.Mui-selected': { backgroundColor: '#C62828', color: 'white', '& .MuiListItemIcon-root': { color: 'white' } },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 26, color: isActive ? 'white' : 'text.secondary' }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 11, fontWeight: 500 }} />
                      {item.children && (
                        openMenus[item.label] ? <ExpandLess sx={{ fontSize: 15 }} /> : <ExpandMore sx={{ fontSize: 15 }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                  {item.children && (
                    <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {item.children.map((child) => (
                          <ListItem key={child.label} disablePadding>
                            <ListItemButton
                              onClick={() => handleNav(child.path)}
                              selected={location.pathname === child.path}
                              sx={{
                                pl: 4, mx: 0.5, borderRadius: 1, mb: 0.1, minHeight: 24,
                                '&.Mui-selected': { backgroundColor: 'rgba(198, 40, 40, 0.12)', color: '#C62828' },
                              }}
                            >
                              <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: 10 }} />
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
        </Box>
      </Drawer>

      {/* Desktop Permanent Drawer */}
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
