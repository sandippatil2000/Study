import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Button, CircularProgress, IconButton, Tooltip, TextField, InputAdornment, Grid, Stack, MenuItem } from '@mui/material';
import { Add as AddIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, HourglassEmpty as HourglassEmptyIcon, Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import { userApi } from '../api/UserApi';
import type { IUser } from '../models/User';
import { Role } from '../models/Role';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import '../styles/CommonStyles.css';

const ManageUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({ search: '', role: 'All', status: 'All' });
  const [applied, setApplied] = useState({ search: '', role: 'All', status: 'All' });

  const handleApply = () => {
    setApplied({ ...filters });
  };

  const handleClear = () => {
    setFilters({ search: '', role: 'All', status: 'All' });
    setApplied({ search: '', role: 'All', status: 'All' });
  };

  const filteredUsers = users.filter((user) => {
    // Status filter
    if (applied.status !== 'All' && user.Status !== applied.status) return false;

    // Role filter
    if (applied.role !== 'All' && user.Role !== applied.role) return false;

    const query = applied.search.toLowerCase();
    if (query) {
      const fullName = `${user.FirstName} ${user.LastName}`.toLowerCase();
      const email = user.Email.toLowerCase();
      if (!fullName.includes(query) && !email.includes(query)) return false;
    }

    return true;
  });

  const handleApprovalToggle = async (user: IUser) => {
    try {
      const newStatus = user.Approved === 'Approved' ? 'Rejected' : 'Approved';
      const updatedUser = await userApi.UpdateUser(user.UserId, { Approved: newStatus });
      setUsers(prev => prev.map(u => u.UserId === user.UserId ? updatedUser : u));
    } catch (error) {
      console.error('Failed to update user approval:', error);
    }
  };

  const handleToggleStatus = async (user: IUser) => {
    try {
      const newStatus = user.Status === 'Active' ? 'Inactive' : 'Active';
      const updatedUser = await userApi.UpdateUser(user.UserId, { Status: newStatus });
      setUsers(prev => prev.map(u => u.UserId === user.UserId ? updatedUser : u));
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApi.GetUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Users</Typography>
        </Box>
      </Box>
      <Card>
        <CardContent>
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
              <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                <TextField
                  label="Search"
                  size="small"
                  fullWidth
                  placeholder="Search by User or Email..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
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
              <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                <TextField
                  label="Role"
                  select
                  size="small"
                  fullWidth
                  value={filters.role}
                  onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                >
                  <MenuItem value="All">All</MenuItem>
                  {Object.values(Role).map((r) => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                <TextField
                  label="Status"
                  select
                  size="small"
                  fullWidth
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  {['All', 'Active', 'Pending', 'Inactive'].map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 'auto' }}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleApply}
                    //sx={{ textTransform: 'none', fontWeight: 600 }}
                    className='common-button-fill'
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClear}
                    startIcon={<ClearIcon />}
                    //sx={{ textTransform: 'none' }}
                    className='common-button-nonfill'
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
                {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} found
              </Typography>
            </Box>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, fontSize: 12, color: 'text.secondary' } }}>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Approved</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <CircularProgress size={24} sx={{ color: '#C62828' }} />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.UserId} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                          <Avatar
                            sx={{
                              width: 30,
                              height: 30,
                              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                              fontSize: 12,
                              fontWeight: 700,
                              boxShadow: '0 2px 8px rgba(198,40,40,0.35)',
                            }}
                          >
                            {user.Avatar}
                          </Avatar>
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.78rem' }}>
                            {user.FirstName} {user.LastName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{user.Email}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{user.Role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.Status}
                          size="small"
                          color={user.Status === 'Active' ? 'success' : user.Status === 'Pending' ? 'warning' : 'default'}
                          //sx={{ fontWeight: 600, fontSize: 11 }}
                          sx={{ fontWeight: 600, fontSize: '0.68rem', height: 20 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={user.Approved === 'Approved' ? 'Reject User' : 'Approve User'}>
                          <IconButton size="small" onClick={() => handleApprovalToggle(user)}>
                            {user.Approved === 'Approved' ? (
                              <CheckCircleIcon color="success" fontSize="small" />
                            ) : user.Approved === 'Rejected' ? (
                              <CancelIcon color="error" fontSize="small" />
                            ) : (
                              <HourglassEmptyIcon color="action" fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View User">
                          <IconButton size="small" onClick={() => navigate(`/users/view/${user.UserId}`)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {user.Status === 'Active' ? (
                          <Tooltip title="Deactivate">
                            <IconButton size="small" onClick={() => handleToggleStatus(user)}>
                              <PersonOffIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Activate">
                            <IconButton size="small" onClick={() => handleToggleStatus(user)}>
                              <PersonAddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" color="text.secondary">No users found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageUsersPage;
