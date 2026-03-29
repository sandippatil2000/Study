import React from 'react';
import './PurchaseOrdersTable.css';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// Sample 10 PO records
const MOCK_ORDERS = [
  { id: 'PD-1001', expectedDate: '12 Oct 2026', userName: 'Alice Johnson', status: 'Delivered' },
  { id: 'PD-1002', expectedDate: '13 Oct 2026', userName: 'Robert Kim', status: 'Processing' },
  { id: 'PD-1003', expectedDate: '14 Oct 2026', userName: 'Maria Garcia', status: 'Pending' },
  { id: 'PD-1004', expectedDate: '12 Oct 2026', userName: 'David Lee', status: 'Delivered' },
  { id: 'PD-1005', expectedDate: '15 Oct 2026', userName: 'Sarah Chen', status: 'Cancelled' },
  { id: 'PD-1006', expectedDate: '16 Oct 2026', userName: 'Tom Wilson', status: 'Processing' },
  { id: 'PD-1007', expectedDate: '11 Oct 2026', userName: 'Emma Davis', status: 'Delivered' },
  { id: 'PD-1008', expectedDate: '17 Oct 2026', userName: 'James Brown', status: 'Pending' },
  { id: 'PD-1009', expectedDate: '18 Oct 2026', userName: 'Olivia Taylor', status: 'Processing' },
  { id: 'PD-1010', expectedDate: '19 Oct 2026', userName: 'William Anderson', status: 'Processing' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return { color: '#2E7D32', bg: 'rgba(76,175,80,0.12)' };
    case 'Processing': return { color: '#1565C0', bg: 'rgba(21,101,192,0.12)' };
    case 'Pending': return { color: '#E65100', bg: 'rgba(230,81,0,0.12)' };
    case 'Cancelled': return { color: '#D32F2F', bg: 'rgba(211,47,47,0.12)' };
    default: return { color: '#757575', bg: 'rgba(158,158,158,0.12)' };
  }
};

const RecentOrdersTable: React.FC = () => {
  const [filterDate, setFilterDate] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchDate = filterDate ? order.expectedDate.includes(filterDate) : true;
    const matchStatus = filterStatus === 'All' ? true : order.status === filterStatus;
    return matchDate && matchStatus;
  });

  return (
    <Card className="po-table-card">
      <CardContent className="po-table-card-content">
        <Box className="po-table-header-box">
          <Typography variant="h6" fontWeight={700}>Purchase Orders</Typography>

          <Box className="po-table-filters-box">
            <TextField
              size="small"
              label="Filter by Date"
              placeholder="e.g. 12 Oct 2026"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="po-table-filter-input"
            />
            <TextField
              select
              size="small"
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="po-table-filter-input"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </Box>
        </Box>
        <TableContainer>
          <Table className="po-table-table">
            <TableHead className="po-table-head">
              <TableRow>
                <TableCell className="po-table-head-cell">PO Id</TableCell>
                <TableCell className="po-table-head-cell">User Name</TableCell>
                <TableCell className="po-table-head-cell">PO Date</TableCell>
                <TableCell className="po-table-head-cell">Status</TableCell>
                <TableCell align="right" className="po-table-head-cell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? filteredOrders.map((order) => {
                const colors = getStatusColor(order.status);
                return (
                  <TableRow key={order.id} hover className="po-table-row">
                    <TableCell className="po-table-cell po-table-id-cell">
                      {order.id}
                    </TableCell>
                    <TableCell className="po-table-cell po-table-name-cell">
                      {order.userName}
                    </TableCell>
                    <TableCell className="po-table-cell po-table-date-cell">
                      {order.expectedDate}
                    </TableCell>
                    <TableCell className="po-table-cell">
                      <Chip
                        label={order.status}
                        size="small"
                        className="po-table-status-chip"
                        style={{ backgroundColor: colors.bg, color: colors.color }}
                      />
                    </TableCell>
                    <TableCell align="right" className="po-table-actions-cell">
                      <Box className="po-table-actions-box">
                        <Tooltip title="View Order">
                          <IconButton size="small" color="primary" className="po-table-view-btn">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Order">
                          <IconButton size="small" color="info" className="po-table-edit-btn">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" className="po-table-empty-cell">
                    No purchase orders found matching the filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;
