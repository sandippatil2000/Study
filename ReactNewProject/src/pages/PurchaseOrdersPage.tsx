import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, Table, TableBody,
  TableCell, TableHead, TableRow, TablePagination, TextField,
  InputAdornment, IconButton, Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const purchaseOrders = [
  { id: '#10045', user: 'Alice Johnson', email: 'alice@email.com', product: 'Nike Air Max 90', amount: 120, status: 'Delivered', date: '2026-03-12', items: 1 },
  { id: '#10044', user: 'Bob Smith', email: 'bob@email.com', product: 'Samsung Galaxy S24', amount: 999, status: 'Processing', date: '2026-03-12', items: 1 },
  { id: '#10043', user: 'Carol White', email: 'carol@email.com', product: 'Apple Watch Series 9', amount: 399, status: 'Shipped', date: '2026-03-11', items: 1 },
  { id: '#10042', user: 'David Lee', email: 'david@email.com', product: 'Sony WH-1000XM5', amount: 350, status: 'Delivered', date: '2026-03-11', items: 1 },
  { id: '#10041', user: 'Eva Brown', email: 'eva@email.com', product: 'MacBook Air M3', amount: 1299, status: 'Cancelled', date: '2026-03-10', items: 1 },
  { id: '#10040', user: 'Frank Martinez', email: 'frank@email.com', product: 'iPhone 15 Pro', amount: 1199, status: 'Delivered', date: '2026-03-10', items: 1 },
  { id: '#10039', user: 'Grace Kim', email: 'grace@email.com', product: 'Adidas Ultraboost', amount: 180, status: 'Processing', date: '2026-03-09', items: 2 },
  { id: '#10038', user: 'Henry Wilson', email: 'henry@email.com', product: 'iPad Pro', amount: 1099, status: 'Shipped', date: '2026-03-09', items: 1 },
  { id: '#10037', user: 'Iris Taylor', email: 'iris@email.com', product: 'Leather Backpack', amount: 89, status: 'Delivered', date: '2026-03-08', items: 1 },
  { id: '#10036', user: 'Jack Davis', email: 'jack@email.com', product: 'Ray-Ban Aviator', amount: 154, status: 'Delivered', date: '2026-03-08', items: 1 },
  { id: '#10035', user: 'Kate Johnson', email: 'kate@email.com', product: 'Yoga Mat Premium', amount: 65, status: 'Processing', date: '2026-03-07', items: 3 },
  { id: '#10034', user: 'Leo Adams', email: 'leo@email.com', product: "Levi's 501 Jeans", amount: 79, status: 'Cancelled', date: '2026-03-07', items: 1 },
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
      (o.id.toLowerCase().includes(search.toLowerCase()) || o.user.toLowerCase().includes(search.toLowerCase()))
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
                  <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                    <TableCell><Typography variant="body2" fontWeight={700} color="primary">{order.id}</Typography></TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{order.user}</Typography>
                    </TableCell>
                    <TableCell align="center"><Typography variant="body2">{order.items}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700}>${order.amount.toLocaleString()}</Typography></TableCell>
                    <TableCell>
                      <Chip label={order.status} color={statusMap[order.status]} size="small" sx={{ fontSize: 11, height: 22 }} />
                    </TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{order.date}</Typography></TableCell>
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
