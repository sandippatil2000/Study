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

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({ search: '', role: 'All', status: 'All' });
  const [applied, setApplied] = useState({ search: '', role: 'All', status: 'All' });

  const handleApply = () => setApplied({ ...filters });

  const handleClear = () => {
    setFilters({ search: '', role: 'All', status: 'All' });
    setApplied({ search: '', role: 'All', status: 'All' });
  };

  const filteredUsers = users.filter((user) => {
    if (applied.status !== 'All' && user.Status !== applied.status) return false;
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

  /* ── shared sx for filter fields — mirrors ViewUserPage readonlySx ── */
  const filterFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(4px)',
      fontSize: '0.78rem',
      '& fieldset': { borderColor: 'rgba(198,40,40,0.18)' },
      '&:hover fieldset': { borderColor: 'rgba(198,40,40,0.4)' },
      '&.Mui-focused fieldset': {
        borderColor: '#C62828',
        boxShadow: '0 0 0 3px rgba(198,40,40,0.1)',
      },
    },
    '& .MuiInputLabel-root': { fontSize: '0.75rem', color: 'text.secondary' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#C62828' },
    '& .MuiInputAdornment-root svg': { fontSize: 14, color: 'rgba(198,40,40,0.6)' },
  };

  /* ── shared icon button sx ── */
  const iconBtnSx = {
    p: 0.5,
    borderRadius: 1.5,
    transition: 'all 0.2s',
    '&:hover': { background: 'rgba(198,40,40,0.08)', color: '#C62828', transform: 'translateY(-1px)' },
  };

  return (
    <Box>
      {/* ── Page Header ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Vertical accent bar — mirrors Navbar page-title bar */}
          <Box
            sx={{
              width: 3,
              height: 22,
              borderRadius: 4,
              background: 'linear-gradient(180deg, #C62828 0%, #FF6B6B 100%)',
              flexShrink: 0,
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #C62828 0%, #B71C1C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: 0.2,
            }}
          >
            Users
          </Typography>
        </Box>

        {/* Add User — gradient filled pill (matches Navbar active nav-button) */}
        <Button
          size="small"
          startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => navigate('/users/add')}
          sx={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
            borderRadius: 5,
            px: 2,
            py: 0.6,
            textTransform: 'none',
            lineHeight: 1.4,
            boxShadow: '0 2px 8px rgba(198,40,40,0.35)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(198,40,40,0.45)',
            },
          }}
        >
          Add User
        </Button>
      </Box>

      {/* ── Main Card — glassmorphism, mirrors ViewUserPage card ── */}
      <Card
        sx={{
          borderRadius: 2.5,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(198,40,40,0.1)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.10)',
          position: 'relative',
          overflow: 'hidden',
          /* animated gradient accent line — mirrors Navbar ::after */
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '0px',
            background: 'linear-gradient(90deg, #C62828 0%, #FF6B6B 40%, #C62828 70%, #8E0000 100%)',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s ease infinite',
          },
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>

          {/* ── Filter Bar ── */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(198,40,40,0.03)',
              border: '1px solid rgba(198,40,40,0.12)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1.5 }}>
              <FilterListIcon sx={{ fontSize: 14, color: '#C62828' }} />
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  fontSize: '0.72rem',
                  background: 'linear-gradient(135deg, #C62828 0%, #B71C1C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: 0.3,
                  textTransform: 'uppercase',
                }}
              >
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
                  sx={filterFieldSx}
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
                  sx={filterFieldSx}
                >
                  <MenuItem value="All" sx={{ fontSize: '0.78rem' }}>All</MenuItem>
                  {Object.values(Role).map((r) => (
                    <MenuItem key={r} value={r} sx={{ fontSize: '0.78rem' }}>{r}</MenuItem>
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
                  sx={filterFieldSx}
                >
                  {['All', 'Active', 'Pending', 'Inactive'].map((s) => (
                    <MenuItem key={s} value={s} sx={{ fontSize: '0.78rem' }}>{s}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 'auto' }}>
                <Stack direction="row" spacing={1}>
                  {/* Apply — gradient filled pill */}
                  <Button
                    size="small"
                    onClick={handleApply}
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                      borderRadius: 5,
                      px: 1.75,
                      py: 0.55,
                      textTransform: 'none',
                      lineHeight: 1.4,
                      boxShadow: '0 2px 8px rgba(198,40,40,0.3)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(198,40,40,0.45)',
                      },
                    }}
                  >
                    Apply
                  </Button>
                  {/* Clear — outlined ghost pill */}
                  <Button
                    size="small"
                    onClick={handleClear}
                    startIcon={<ClearIcon sx={{ fontSize: '13px !important' }} />}
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#C62828',
                      border: '1px solid rgba(198,40,40,0.4)',
                      borderRadius: 5,
                      px: 1.75,
                      py: 0.55,
                      textTransform: 'none',
                      lineHeight: 1.4,
                      background: 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(198,40,40,0.07)',
                        borderColor: '#C62828',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* ── Results chip ── */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
            <Chip
              label={`${filteredUsers.length} result${filteredUsers.length !== 1 ? 's' : ''}`}
              size="small"
              sx={{
                fontSize: '0.68rem',
                fontWeight: 600,
                height: 20,
                bgcolor: 'rgba(198,40,40,0.08)',
                color: '#C62828',
                border: '1px solid rgba(198,40,40,0.2)',
              }}
            />
          </Box>

          {/* ── Table ── */}
          <TableContainer
            sx={{
              borderRadius: 2,
              border: '1px solid rgba(198,40,40,0.1)',
              overflow: 'hidden',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    background: 'linear-gradient(135deg, rgba(198,40,40,0.08) 0%, rgba(229,57,53,0.05) 100%)',
                    '& th': {
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      color: '#C62828',
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                      borderBottom: '2px solid rgba(198,40,40,0.15)',
                      py: 1.2,
                    },
                  }}
                >
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
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={24} sx={{ color: '#C62828' }} />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.UserId}
                      hover
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(198,40,40,0.02)',
                        transition: 'background 0.15s ease',
                        '&:hover': { backgroundColor: 'rgba(198,40,40,0.05) !important' },
                        '& td': {
                          borderBottom: '1px solid rgba(198,40,40,0.07)',
                          fontSize: '0.78rem',
                          py: 1,
                        },
                      }}
                    >
                      {/* User cell */}
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
                      <TableCell sx={{ color: 'text.secondary' }}>{user.Email}</TableCell>
                      <TableCell>{user.Role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.Status}
                          size="small"
                          color={user.Status === 'Active' ? 'success' : user.Status === 'Pending' ? 'warning' : 'default'}
                          sx={{ fontWeight: 600, fontSize: '0.68rem', height: 20 }}
                        />
                      </TableCell>
                      {/* Approved toggle */}
                      <TableCell align="center">
                        <Tooltip title={user.Approved === 'Approved' ? 'Reject User' : 'Approve User'}>
                          <IconButton size="small" onClick={() => handleApprovalToggle(user)} sx={iconBtnSx}>
                            {user.Approved === 'Approved' ? (
                              <CheckCircleIcon color="success" sx={{ fontSize: 17 }} />
                            ) : user.Approved === 'Rejected' ? (
                              <CancelIcon color="error" sx={{ fontSize: 17 }} />
                            ) : (
                              <HourglassEmptyIcon color="action" sx={{ fontSize: 17 }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      {/* Actions */}
                      <TableCell align="center">
                        <Stack direction="row" justifyContent="center" spacing={0.25}>
                          <Tooltip title="View User">
                            <IconButton size="small" onClick={() => navigate(`/users/view/${user.UserId}`)} sx={iconBtnSx}>
                              <VisibilityIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                          {user.Status === 'Active' ? (
                            <Tooltip title="Deactivate">
                              <IconButton size="small" onClick={() => handleToggleStatus(user)} sx={iconBtnSx}>
                                <PersonOffIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Activate">
                              <IconButton size="small" onClick={() => handleToggleStatus(user)} sx={iconBtnSx}>
                                <PersonAddIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
                        No users found.
                      </Typography>
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

export default UsersPage;
