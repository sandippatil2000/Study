import React from 'react';
import './DashboardHome.css';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PurchaseOrdersTable from '../components/PurchaseOrdersTable';


const stats = [
  {
    label: 'Total Revenue',
    value: '$84,254',
    change: '+12.5%',
    positive: true,
    icon: <AttachMoneyIcon />,
    color: '#D32F2F',
    bg: 'rgba(211,47,47,0.1)',
  },
  {
    label: 'Total Users',
    value: '18,472',
    change: '+8.2%',
    positive: true,
    icon: <PeopleIcon />,
    color: '#1565C0',
    bg: 'rgba(21,101,192,0.1)',
  },
  {
    label: 'New Orders',
    value: '3,821',
    change: '+22.4%',
    positive: true,
    icon: <ShoppingCartIcon />,
    color: '#2E7D32',
    bg: 'rgba(46,125,50,0.1)',
  },
  {
    label: 'Growth Rate',
    value: '24.8%',
    change: '-2.1%',
    positive: false,
    icon: <TrendingUpIcon />,
    color: '#E65100',
    bg: 'rgba(230,81,0,0.1)',
  },
];


const DashboardHome: React.FC = () => {
  return (
    <Box>
      {/* Welcome banner */}
      <Box className="welcome-banner">
        <Box className="welcome-banner-circle-1" />
        <Box className="welcome-banner-circle-2" />
        <Typography variant="h5" fontWeight={800} mb={0.5}>Welcome back! 👋</Typography>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>Here's what's happening with your business today.</Typography>
      </Box>

      {/* Stats cards */}
      <Grid container spacing={2} className="stats-grid">
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Card>
              <CardContent className="stat-card-content">
                <Box className="stat-header">
                  <Box className="stat-icon-wrapper" style={{ backgroundColor: stat.bg, color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Chip
                    label={stat.change}
                    size="small"
                    className={`stat-chip ${stat.positive ? 'positive' : 'negative'}`}
                  />
                </Box>
                <Typography variant="h6" fontWeight={800} mb={0.2}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary" fontSize={12}>{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders Data Table */}
      <Box className="recent-orders-wrapper">
        <PurchaseOrdersTable />
      </Box>

    </Box>
  );
};

export default DashboardHome;
