import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, Table, TableBody,
  TableCell, TableHead, TableRow, TablePagination, TextField,
  InputAdornment, IconButton, Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { IPurchaseOrder } from '../models/IPurchaseOrder';
import { purchaseorderapi } from '../api/purchaseorderapi';
const statusMap: Record<string, 'success' | 'warning' | 'info' | 'error'> = {
  Delivered: 'success', Processing: 'warning', Shipped: 'info', Cancelled: 'error',
};

const PurchaseOrdersPage: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = React.useState<IPurchaseOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await purchaseorderapi.getPurchaseOrders();
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
                  <TableCell>Supplier Name</TableCell>
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
                    <TableCell><Typography variant="body2">{order.supplierName || '-'}</Typography></TableCell>
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
                      <Tooltip title="Edit">
                        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
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
