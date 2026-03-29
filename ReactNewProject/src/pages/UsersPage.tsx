import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Avatar, Chip,
  Table, TableBody, TableCell, TableHead, TableRow, TablePagination,
  TextField, InputAdornment, IconButton, Tooltip, Rating, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

import { IUser } from '../models/IUser';
import { userapi } from '../api/userapi';

const avatarColors = ['#D32F2F', '#1565C0', '#2E7D32', '#E65100', '#6A1B9A', '#00838F', '#AD1457', '#37474F'];

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userapi.getuser();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (user: IUser) => {
    try {
      let success = false;
      if (user.status === 'Active') {
        success = await userapi.deactivateUser(user.id);
      } else {
        success = await userapi.activateUser(user.id);
      }

      if (success) {
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: user.status === 'Active' ? 'Inactive' : 'Active' } : u
        ));
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Users</Typography>
        <Typography variant="body2" color="text.secondary">{users.length} total users</Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <TextField
              placeholder="Search user name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ maxWidth: 360, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#9e9e9e', fontSize: 18 }} /></InputAdornment> }}
            />
          </Box>
          <Box sx={{ overflowX: 'auto', minHeight: 300 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 700, color: '#757575', bgcolor: '#FAFAFA', fontSize: 12 } }}>
                    <TableCell>User</TableCell>
                    <TableCell align="center">Orders</TableCell>
                    <TableCell>Supplier Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((user, i) => (
                    <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: avatarColors[i % avatarColors.length], fontSize: 13, fontWeight: 700 }}>
                            {user.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>{user.firstName} {user.lastName}</Typography>
                            <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center"><Typography variant="body2" fontWeight={600}>{user.orders}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{user.supplierName || '-'}</Typography></TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          color={user.status === 'Active' ? 'success' : 'default'}
                          size="small"
                          sx={{ fontSize: 11, height: 22 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View User">
                          <IconButton size="small" onClick={() => navigate('/dashboard/profile', { state: { selectedUser: user } })}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {user.status === 'Active' ? (
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
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
          {!loading && (
            <TablePagination
              component="div"
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={() => { }}
              rowsPerPageOptions={[6]}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersPage;
