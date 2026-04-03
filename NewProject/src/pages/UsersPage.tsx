import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, HourglassEmpty as HourglassEmptyIcon } from '@mui/icons-material';
import { userApi } from '../api/UserApi';
import type { IUser } from '../models/User';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          <Typography variant="body2" color="text.secondary">Manage your system users</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ background: 'linear-gradient(135deg, #C62828, #8E0000)' }}>
          Add User
        </Button>
      </Box>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
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
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.UserId} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#C62828', fontSize: 13 }}>{user.Avatar}</Avatar>
                          <Typography variant="body2" fontWeight={600}>{user.FirstName} {user.LastName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{user.Email}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{user.Role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.Status}
                          size="small"
                          color={user.Status === 'Active' ? 'success' : user.Status === 'Pending' ? 'warning' : 'default'}
                          sx={{ fontWeight: 600, fontSize: 11 }}
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

export default UsersPage;
