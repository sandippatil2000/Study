import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ISupplierRequest } from '../models/SupplierRequest';
import { supplierApi } from '../api/SupplierApi';
import {
  Box,
  Grid,
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
  TextField,
  MenuItem,
  Button,
  Stack,
  InputAdornment,
  Tooltip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RequestStatus } from '../models/RequestStatus';

// ---- Status Badge Colors ----
const statusColor: Record<string, 'success' | 'warning' | 'info' | 'error' | 'default'> = {
  Completed: 'success',
  Pending: 'warning',
  Processing: 'info',
  Cancelled: 'error',
};

const status = ['All', ...Object.values(RequestStatus)];

// ---- Default Filter State ----
const defaultFilters = {
  name: '',
  fromDate: '',
  toDate: '',
  status: 'All',
};

// ---- Page Component ----
const ValidationRequests: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ISupplierRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [applied, setApplied] = useState(defaultFilters);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await supplierApi.GetSupplierRequests();
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch supplier requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    setApplied({ ...filters });
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    setApplied(defaultFilters);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((row) => {
      const fullName = `${row.FirstName} ${row.LastName}`.toLowerCase();

      // Name filter
      if (applied.name && !fullName.includes(applied.name.toLowerCase())) return false;

      // From date filter
      if (applied.fromDate) {
        const from = new Date(applied.fromDate);
        if (row.Date < from) return false;
      }

      // To date filter
      if (applied.toDate) {
        const to = new Date(applied.toDate);
        to.setHours(23, 59, 59, 999);
        if (row.Date > to) return false;
      }

      // Status filter
      if (applied.status !== 'All' && row.Status !== applied.status) return false;

      return true;
    });
  }, [applied, requests]);

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Supplier Requests</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          onClick={() => navigate('/supplierRequests/create')}
          sx={{ textTransform: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}
        >
          New Request
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Recent Supplier Requests Table */}
        <Grid size={{ xs: 12, lg: 12 }}>
          <Card>
            <CardContent>
              {/* Table Header */}


              {/* ---- Filter Bar ---- */}
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <FilterListIcon fontSize="small" color="action" />
                  <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                    Filters
                  </Typography>
                </Stack>
                <Grid container spacing={2} alignItems="flex-end">
                  {/* Name */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      label="Name"
                      size="small"
                      fullWidth
                      value={filters.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Search by name…"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  {/* From Date */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      label="From Date"
                      type="date"
                      size="small"
                      fullWidth
                      value={filters.fromDate}
                      onChange={(e) => handleChange('fromDate', e.target.value)}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>

                  {/* To Date */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      label="To Date"
                      type="date"
                      size="small"
                      fullWidth
                      value={filters.toDate}
                      onChange={(e) => handleChange('toDate', e.target.value)}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>

                  {/* Status */}
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField
                      label="Status"
                      select
                      size="small"
                      fullWidth
                      value={filters.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                    >
                      {status.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Actions */}
                  <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleApply}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClear}
                        startIcon={<ClearIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {filteredRequests.length} result{filteredRequests.length !== 1 ? 's' : ''} found
                  </Typography>
                </Box>
              </Box>
              {/* ---- Table ---- */}
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { fontWeight: 700, fontSize: 12, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'divider' } }}>
                      <TableCell>Request ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Supplier</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Assigned To</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                          <CircularProgress size={24} sx={{ color: '#C62828' }} />
                        </TableCell>
                      </TableRow>
                    ) : filteredRequests.length > 0 ? (
                      filteredRequests.map((row) => (
                        <TableRow key={row.RequestId} hover>
                          <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>{row.RequestId}</TableCell>
                          <TableCell sx={{ fontSize: 13 }}>{row.FirstName} {row.LastName}</TableCell>
                          <TableCell sx={{ fontSize: 13 }}>{row.Email}</TableCell>
                          <TableCell sx={{ fontSize: 13 }}>{row.Supplier}</TableCell>
                          <TableCell sx={{ fontSize: 13 }}>{row.Date.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.Status}
                              color={statusColor[row.Status]}
                              size="small"
                              sx={{ fontWeight: 600, fontSize: 11 }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: 13 }}>{row.AssignedTo ?? '—'}</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={0.5} justifyContent="center">
                              <Tooltip title="View">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    navigate(`/supplierRequests/view/${row.RequestId}`, { state: { request: row } })
                                  }
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center" sx={{ py: 4, color: 'text.secondary', fontSize: 14 }}>
                          No records match the selected filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ValidationRequests;
