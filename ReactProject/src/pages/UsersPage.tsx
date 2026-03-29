import React from 'react';
import './UsersPage.css';
import { Box, Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Robert Kim', email: 'robert@example.com', role: 'Editor', status: 'Active' },
  { name: 'Maria Garcia', email: 'maria@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
  { name: 'Tom Wilson', email: 'tom@example.com', role: 'Viewer', status: 'Inactive' },
];

const roleColors: Record<string, string> = { Admin: '#D32F2F', Editor: '#1565C0', Viewer: '#2E7D32' };

const UsersPage: React.FC = () => (
  <Box>
    <Box className="users-header-box">
      <Box className="users-icon-wrapper">
        <PeopleIcon fontSize="small" />
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={700}>Users</Typography>
        <Typography variant="body2" color="text.secondary">{users.length} total members</Typography>
      </Box>
    </Box>
    <Grid container spacing={2}>
      {users.map((u) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={u.email}>
          <Card>
            <CardContent className="users-card-content">
              <Avatar className="users-avatar" sx={{ bgcolor: `${roleColors[u.role]}22`, color: roleColors[u.role] }}>
                {u.name[0]}
              </Avatar>
              <Box className="users-info-box">
                <Typography variant="body1" fontWeight={600}>{u.name}</Typography>
                <Typography variant="caption" color="text.secondary">{u.email}</Typography>
              </Box>
              <Box className="users-chips-box">
                <Chip label={u.role} size="small" className="users-role-chip" sx={{ bgcolor: `${roleColors[u.role]}18`, color: roleColors[u.role] }} />
                <Chip label={u.status} size="small" variant="outlined" className="users-status-chip" sx={{ color: u.status === 'Active' ? '#2E7D32' : '#9e9e9e', borderColor: u.status === 'Active' ? '#2E7D32' : '#ccc' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default UsersPage;
