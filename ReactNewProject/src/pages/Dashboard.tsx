import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionUser } from '../common/CommonFunction';
import {
  Grid, Card, CardContent, Typography, Box, Chip,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const stats = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, icon: <AttachMoneyIcon />, color: '#D32F2F', bg: '#FFEBEE' },
  { label: 'Total Purchase Orders', value: '3,842', change: '+8.2%', up: true, icon: <ShoppingCartIcon />, color: '#1565C0', bg: '#E3F2FD' },
  { label: 'Users', value: '12,091', change: '+5.1%', up: true, icon: <PeopleIcon />, color: '#2E7D32', bg: '#E8F5E9' },
  { label: 'Products', value: '1,247', change: '-2.3%', up: false, icon: <InventoryIcon />, color: '#E65100', bg: '#FFF3E0' },
];

const recentPurchaseOrders = [
  { id: '#10045', user: 'Alice Johnson', product: 'Nike Air Max 90', amount: '$120.00', status: 'Delivered', date: 'Mar 12' },
  { id: '#10044', user: 'Bob Smith', product: 'Samsung Galaxy S24', amount: '$999.00', status: 'Processing', date: 'Mar 12' },
  { id: '#10043', user: 'Carol White', product: 'Apple Watch Series 9', amount: '$399.00', status: 'Shipped', date: 'Mar 11' },
  { id: '#10042', user: 'David Lee', product: 'Sony WH-1000XM5', amount: '$350.00', status: 'Delivered', date: 'Mar 11' },
  { id: '#10041', user: 'Eva Brown', product: 'MacBook Air M3', amount: '$1299.00', status: 'Cancelled', date: 'Mar 10' },
];


const statusColors: Record<string, 'success' | 'warning' | 'info' | 'error' | 'default'> = {
  Delivered: 'success', Processing: 'warning', Shipped: 'info', Cancelled: 'error',
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getSessionUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
  <Box>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" fontWeight={700}>Welcome, {user.firstName} 👋</Typography>
      <Typography variant="body2" color="text.secondary">Here's what's happening with your store today.</Typography>
    </Box>

    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>{stat.label}</Typography>
                  <Typography variant="h4" fontWeight={800}>{stat.value}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    {stat.up ? <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 16 }} /> : <TrendingDownIcon sx={{ color: '#F44336', fontSize: 16 }} />}
                    <Typography variant="caption" sx={{ color: stat.up ? '#4CAF50' : '#F44336', fontWeight: 600 }}>
                      {stat.change} vs last month
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ px: 3, py: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={700}>Recent Purchase Orders</Typography>
              <Chip label="View All" size="small" clickable color="primary" variant="outlined" />
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 700, color: '#757575', bgcolor: '#FAFAFA', fontSize: 12 } }}>
                    <TableCell>Order ID</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPurchaseOrders.map((order) => (
                    <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                      <TableCell><Typography variant="body2" fontWeight={600} color="primary">{order.id}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{order.user}</Typography></TableCell>
                      <TableCell><Typography variant="body2" noWrap sx={{ maxWidth: 140 }}>{order.product}</Typography></TableCell>
                      <TableCell align="right"><Typography variant="body2" fontWeight={600}>{order.amount}</Typography></TableCell>
                      <TableCell><Chip label={order.status} size="small" color={statusColors[order.status]} sx={{ fontSize: 11, height: 22 }} /></TableCell>
                      <TableCell><Typography variant="caption" color="text.secondary">{order.date}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
  );
};

export default Dashboard;
