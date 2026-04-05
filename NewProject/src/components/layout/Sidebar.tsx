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
  //Divider,
  Collapse,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
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
  FiberManualRecord as DotIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export const DRAWER_WIDTH = 200;
export const MINI_DRAWER_WIDTH = 52;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 16 }} />, path: '/dashboard' },
  {
    label: 'Users',
    icon: <PeopleIcon sx={{ fontSize: 16 }} />,
    children: [
      { label: 'All Users', path: '/users' },
      { label: 'Manage Users', path: '/users/ManageUsers' },
    ],
  },
  {
    label: 'Supplier',
    icon: <ShoppingCartIcon sx={{ fontSize: 16 }} />,
    badge: 'New',
    children: [
      { label: 'Supplier Requests', path: '/supplierRequests' },
      { label: 'Create Request', path: '/supplierRequests/create' },
    ],
  },
  {
    label: 'Validation',
    icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    children: [
      { label: 'Validation Requests', path: '/ValidationRequests' },
    ],
  },
  { label: 'Reports', icon: <BarChartIcon sx={{ fontSize: 16 }} />, path: '/reports' },
  { label: 'Components', icon: <LayersIcon sx={{ fontSize: 16 }} />, path: '/components' },
  { label: 'Pages', icon: <DescriptionIcon sx={{ fontSize: 16 }} />, path: '/pages' },
  { label: 'Premium', icon: <StarIcon sx={{ fontSize: 16 }} />, path: '/premium', badge: 'Pro' },
  { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: 16 }} />, path: '/settings' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// ─── Shared drawer content ────────────────────────────────────────────────────
const DrawerContent: React.FC<{
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
  isMobile?: boolean;
}> = ({ collapsed, onToggleCollapse, onClose, isMobile = false }) => {
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

  const drawerWidth = isMobile ? DRAWER_WIDTH : collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        width: drawerWidth,
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        background: '#fff',
      }}
    >
      {/* ── Logo / Brand ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed && !isMobile ? 'center' : 'space-between',
          px: collapsed && !isMobile ? 0 : 1.5,
          py: 0.75,
          background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 55%, #E53935 100%)',
          minHeight: 44,
          transition: 'padding 0.25s ease',
          position: 'relative',
          overflow: 'hidden',
          // Decorative shimmer overlay
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-40%',
            right: '-10%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-50%',
            left: '-5%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, zIndex: 1 }}>
          {/* Animated logo icon */}
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: 1,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <ShoppingCartIcon sx={{ color: 'white', fontSize: 15 }} />
          </Box>

          {(!collapsed || isMobile) && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  fontSize: 12.5,
                  letterSpacing: 0.3,
                }}
              >
                One Shop
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 9,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                Electronics
              </Typography>
            </Box>
          )}
        </Box>

        {(!collapsed || isMobile) && (
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{
              color: 'rgba(255,255,255,0.85)',
              p: 0.4,
              zIndex: 1,
              borderRadius: 1.0,
              display: { xs: 'none', md: 'flex' },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
                color: '#fff',
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      {/* Collapsed expand button */}
      {collapsed && !isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 0.6,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{
              p: 0.4,
              borderRadius: 1.0,
              color: '#C62828',
              '&:hover': { bgcolor: 'rgba(198,40,40,0.08)', color: '#B71C1C' },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      {/* Gradient separator */}
      <Box
        sx={{
          height: 2,
          background: 'linear-gradient(90deg, #C62828 0%, #FF6B6B 50%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      {/* ── Navigation ── */}
      <List sx={{ flex: 1, py: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map((item) => {
          const isActive = item.path
            ? location.pathname === item.path
            : item.children?.some((c) => location.pathname === c.path);

          return (
            <React.Fragment key={item.label}>
              <ListItem disablePadding sx={{ mb: 0.15 }}>
                <Tooltip title={collapsed && !isMobile ? item.label : ''} placement="right" arrow>
                  <ListItemButton
                    onClick={() => (item.children ? toggleMenu(item.label) : handleNav(item.path || '/'))}
                    selected={!!isActive}
                    sx={{
                      mx: 0.75,
                      borderRadius: 1,
                      justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                      px: collapsed && !isMobile ? 0.5 : 1.25,
                      minHeight: 32,
                      transition: 'all 0.18s ease',
                      position: 'relative',
                      overflow: 'hidden',

                      // Active state: gradient background + left accent bar
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                        color: 'white',
                        boxShadow: '0 3px 10px rgba(198,40,40,0.35)',
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '& .MuiListItemText-primary': { color: 'white', fontWeight: 700 },
                        '&:hover': {
                          background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 100%)',
                          boxShadow: '0 4px 14px rgba(198,40,40,0.45)',
                        },
                        // Left accent stripe on active
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '15%',
                          bottom: '15%',
                          width: 0,
                          borderRadius: '0 3px 3px 0',
                          background: 'rgba(255,255,255,0.7)',
                        },
                      },

                      // Hover state
                      '&:not(.Mui-selected):hover': {
                        background: 'rgba(198,40,40,0.07)',
                        color: '#C62828',
                        transform: 'translateX(2px)',
                        '& .MuiListItemIcon-root': { color: '#C62828' },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed && !isMobile ? 0 : 28,
                        color: isActive ? 'white' : 'text.secondary',
                        justifyContent: 'center',
                        transition: 'color 0.18s',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {(!collapsed || isMobile) && (
                      <>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 11.5,
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? 'white' : 'text.primary',
                          }}
                        />
                        {/* Badge */}
                        {item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{
                              height: 15,
                              fontSize: 8,
                              fontWeight: 700,
                              bgcolor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(198,40,40,0.12)',
                              color: isActive ? '#fff' : '#C62828',
                              border: isActive ? '1px solid rgba(255,255,255,0.3)' : 'none',
                              mr: 0.5,
                              '& .MuiChip-label': { px: 0.75 },
                            }}
                          />
                        )}
                        {item.children && (
                          openMenus[item.label]
                            ? <ExpandLess sx={{ fontSize: 15, color: isActive ? 'rgba(255,255,255,0.8)' : 'text.disabled' }} />
                            : <ExpandMore sx={{ fontSize: 15, color: isActive ? 'rgba(255,255,255,0.8)' : 'text.disabled' }} />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>

              {/* Sub-items */}
              {(!collapsed || isMobile) && item.children && (
                <Collapse in={openMenus[item.label]} timeout={200} unmountOnExit>
                  <List disablePadding sx={{ mb: 0.5 }}>
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <ListItem key={child.label} disablePadding>
                          <ListItemButton
                            onClick={() => handleNav(child.path)}
                            selected={isChildActive}
                            sx={{
                              pl: 3.5,
                              mx: 0.75,
                              borderRadius: 1.0,
                              mb: 0.15,
                              minHeight: 26,
                              transition: 'all 0.15s ease',
                              '&.Mui-selected': {
                                bgcolor: 'rgba(198,40,40,0.1)',
                                color: '#C62828',
                              },
                              '&:not(.Mui-selected):hover': {
                                bgcolor: 'rgba(198,40,40,0.05)',
                                color: '#C62828',
                                transform: 'translateX(2px)',
                              },
                            }}
                          >
                            {/* Sub-item dot indicator */}
                            <DotIcon
                              sx={{
                                fontSize: 6,
                                mr: 1,
                                color: isChildActive ? '#C62828' : 'text.disabled',
                                transition: 'color 0.15s',
                                flexShrink: 0,
                              }}
                            />
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{
                                fontSize: 10.5,
                                fontWeight: isChildActive ? 600 : 400,
                                color: isChildActive ? '#C62828' : 'text.secondary',
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      {/* ── Footer ── */}
      {(!collapsed || isMobile) && (
        <Box
          sx={{
            px: 1.5,
            py: 1.25,
            borderTop: '1px solid rgba(0,0,0,0.06)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(198,40,40,0.03) 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 22,
                height: 22,
                background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                fontSize: 9,
                fontWeight: 700,
                boxShadow: '0 2px 6px rgba(198,40,40,0.3)',
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: 9.5, display: 'block', lineHeight: 1.2 }}>
                AdminPro
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ fontSize: 8, lineHeight: 1 }}>
                v1.0.0 · All rights reserved
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Collapsed footer dot */}
      {collapsed && !isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1,
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C62828, #FF6B6B)',
              boxShadow: '0 0 6px rgba(198,40,40,0.5)',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose, collapsed, onToggleCollapse }) => {
  const drawerWidth = collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  const sharedPaperSx = {
    border: 'none',
    boxShadow: '3px 0 16px rgba(0,0,0,0.08)',
    overflowX: 'hidden' as const,
    transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  };

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
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            ...sharedPaperSx,
          },
        }}
      >
        <DrawerContent
          collapsed={false}
          onToggleCollapse={onToggleCollapse}
          onClose={onClose}
          isMobile
        />
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            ...sharedPaperSx,
          },
        }}
        open
      >
        <DrawerContent
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
          onClose={onClose}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;
