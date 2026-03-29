import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'A' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', avatar: 'B' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager', status: 'Inactive', avatar: 'C' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'User', status: 'Active', avatar: 'D' },
  { id: 5, name: 'Eva Brown', email: 'eva@example.com', role: 'User', status: 'Pending', avatar: 'E' },
];

const UsersPage: React.FC = () => (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {mockUsers.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#C62828', fontSize: 13 }}>{u.avatar}</Avatar>
                      <Typography variant="body2" fontWeight={600}>{u.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13 }}>{u.email}</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>{u.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.status}
                      size="small"
                      color={u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : 'default'}
                      sx={{ fontWeight: 600, fontSize: 11 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </Box>
);

export default UsersPage;
