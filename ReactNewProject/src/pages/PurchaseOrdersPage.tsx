import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, Table, TableBody,
  TableCell, TableHead, TableRow, TablePagination, TextField,
  InputAdornment, IconButton, Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { IPurchaseOrder } from '../models/IPurchaseOrder';

const purchaseOrders: IPurchaseOrder[] = [
  { orderId: 10045, firstName: 'Alice', lastName: 'Johnson', email: 'alice@email.com', address: '123 Main St', postalCode: '10001', amount: 120, status: 'Delivered', Date: new Date('2026-03-12'), Products: [{ id: 1, name: 'Nike Air Max 90', price: 120, category: 'Shoes', image: '', stockCount: 0 }] },
  { orderId: 10044, firstName: 'Bob', lastName: 'Smith', email: 'bob@email.com', address: '456 Oak Ave', postalCode: '10002', amount: 999, status: 'Processing', Date: new Date('2026-03-12'), Products: [{ id: 2, name: 'Samsung Galaxy S24', price: 999, category: 'Electronics', image: '', stockCount: 0 }] },
  { orderId: 10043, firstName: 'Carol', lastName: 'White', email: 'carol@email.com', address: '789 Pine Rd', postalCode: '10003', amount: 399, status: 'Shipped', Date: new Date('2026-03-11'), Products: [{ id: 3, name: 'Apple Watch Series 9', price: 399, category: 'Electronics', image: '', stockCount: 0 }] },
  { orderId: 10042, firstName: 'David', lastName: 'Lee', email: 'david@email.com', address: '321 Elm St', postalCode: '10004', amount: 350, status: 'Delivered', Date: new Date('2026-03-11'), Products: [{ id: 4, name: 'Sony WH-1000XM5', price: 350, category: 'Electronics', image: '', stockCount: 0 }] },
  { orderId: 10041, firstName: 'Eva', lastName: 'Brown', email: 'eva@email.com', address: '654 Maple Dr', postalCode: '10005', amount: 1299, status: 'Cancelled', Date: new Date('2026-03-10'), Products: [{ id: 5, name: 'MacBook Air M3', price: 1299, category: 'Electronics', image: '', stockCount: 0 }] },
  { orderId: 10040, firstName: 'Frank', lastName: 'Martinez', email: 'frank@email.com', address: '987 Cedar Ln', postalCode: '10006', amount: 1199, status: 'Delivered', Date: new Date('2026-03-10'), Products: [{ id: 6, name: 'iPhone 15 Pro', price: 1199, category: 'Electronics', image: '', stockCount: 0 }] },
  { orderId: 10039, firstName: 'Grace', lastName: 'Kim', email: 'grace@email.com', address: '147 Birch Blvd', postalCode: '10007', amount: 180, status: 'Processing', Date: new Date('2026-03-09'), Products: [{ id: 7, name: 'Adidas Ultraboost', price: 90, category: 'Shoes', image: '', stockCount: 0 }, { id: 8, name: 'Adidas Cap', price: 90, category: 'Accessories', image: '', stockCount: 0 }] },
  { orderId: 10038, firstName: 'Henry', lastName: 'Wilson', email: 'henry@email.com', address: '258 Spruce Way', postalCode: '10008', amount: 1099, status: 'Shipped', Date: new Date('2026-03-09'), Products: [{ id: 9, name: 'iPad Pro', price: 1099, category: 'Electronics', image: '', stockCount: 0 }] },
  { orderId: 10037, firstName: 'Iris', lastName: 'Taylor', email: 'iris@email.com', address: '369 Walnut Ct', postalCode: '10009', amount: 89, status: 'Delivered', Date: new Date('2026-03-08'), Products: [{ id: 10, name: 'Leather Backpack', price: 89, category: 'Bags', image: '', stockCount: 0 }] },
  { orderId: 10036, firstName: 'Jack', lastName: 'Davis', email: 'jack@email.com', address: '741 Ash Ave', postalCode: '10010', amount: 154, status: 'Delivered', Date: new Date('2026-03-08'), Products: [{ id: 11, name: 'Ray-Ban Aviator', price: 154, category: 'Accessories', image: '', stockCount: 0 }] },
  { orderId: 10035, firstName: 'Kate', lastName: 'Johnson', email: 'kate@email.com', address: '852 Willow Pl', postalCode: '10011', amount: 65, status: 'Processing', Date: new Date('2026-03-07'), Products: [{ id: 12, name: 'Yoga Mat Premium', price: 22, category: 'Fitness', image: '', stockCount: 0 }, { id: 13, name: 'Resistance Band', price: 22, category: 'Fitness', image: '', stockCount: 0 }, { id: 14, name: 'Water Bottle', price: 21, category: 'Fitness', image: '', stockCount: 0 }] },
  { orderId: 10034, firstName: 'Leo', lastName: 'Adams', email: 'leo@email.com', address: '963 Poplar St', postalCode: '10012', amount: 79, status: 'Cancelled', Date: new Date('2026-03-07'), Products: [{ id: 15, name: "Levi's 501 Jeans", price: 79, category: 'Clothing', image: '', stockCount: 0 }] },
];

const statusMap: Record<string, 'success' | 'warning' | 'info' | 'error'> = {
  Delivered: 'success', Processing: 'warning', Shipped: 'info', Cancelled: 'error',
};

const PurchaseOrdersPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const filtered = purchaseOrders.filter(
    (o) =>
      (statusFilter === 'All' || o.status === statusFilter) &&
      (
        String(o.orderId).includes(search.toLowerCase()) ||
        `${o.firstName} ${o.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Purchase Orders</Typography>
        <Typography variant="body2" color="text.secondary">{purchaseOrders.length} total purchase orders</Typography>
      </Box>

      {/* Summary chips */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'].map((s) => {
          const count = s === 'All' ? purchaseOrders.length : purchaseOrders.filter((o) => o.status === s).length;
          return (
            <Chip
              key={s}
              label={`${s} (${count})`}
              color={s === 'All' ? 'default' : statusMap[s]}
              variant={statusFilter === s ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(s)}
              clickable
              size="small"
            />
          );
        })}
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ px: 2.5, py: 2, display: 'flex', gap: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <TextField
              placeholder="Search by order ID or user…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ flex: 1, maxWidth: 360, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#9e9e9e', fontSize: 18 }} /></InputAdornment> }}
            />
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, color: '#757575', bgcolor: '#FAFAFA', fontSize: 12 } }}>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell align="center">Items</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((order) => (
                  <TableRow key={order.orderId} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                    <TableCell><Typography variant="body2" fontWeight={700} color="primary">#{order.orderId}</Typography></TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{order.firstName} {order.lastName}</Typography>
                    </TableCell>
                    <TableCell align="center"><Typography variant="body2">{order.Products.length}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700}>${order.amount.toLocaleString()}</Typography></TableCell>
                    <TableCell>
                      <Chip label={order.status} color={statusMap[order.status]} size="small" sx={{ fontSize: 11, height: 22 }} />
                    </TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{order.Date.toLocaleDateString()}</Typography></TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Track Shipment">
                        <IconButton size="small"><LocalShippingIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
            rowsPerPageOptions={[5, 8, 12]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PurchaseOrdersPage;
