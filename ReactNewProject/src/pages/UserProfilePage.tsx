import React from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Avatar } from '@mui/material';
import { getSessionUser } from '../common/CommonFunction';
import { useLocation } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  const location = useLocation();
  const user = location.state?.selectedUser || getSessionUser();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          User not found. Please log in.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View your personal information
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#D32F2F', fontSize: 32, fontWeight: 700 }}>
              {user.avatar || user.firstName?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              value={user.firstName || ''}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={user.lastName || ''}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              value={user.email || ''}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Status"
              value={user.status || ''}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
              <TextField
                fullWidth
                label="Address"
                value={user.address || ''}
                InputProps={{ readOnly: true }}
                variant="outlined"
                multiline
                rows={2}
              />
            </Box>
            <TextField
              fullWidth
              label="Postal Code"
              value={user.postalCode || ''}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Joined Date"
              value={user.joined || ''}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Total Orders"
              value={user.orders?.toString() || '0'}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Total Spent"
              value={`$${user.spent?.toFixed(2) || '0.00'}`}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            {user.supplierName && (
              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <TextField
                  fullWidth
                  label="Supplier Name"
                  value={user.supplierName}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfilePage;
