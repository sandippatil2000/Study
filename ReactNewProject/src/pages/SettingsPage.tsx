import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Divider,
  TextField, Button, Switch, Avatar,
  Chip, Alert, Snackbar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';

const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@shopdash.com', phone: '+1 555-0100', bio: 'Store administrator' });
  const [store, setStore] = useState({ name: 'ShopDash Store', currency: 'USD', timezone: 'UTC-5', taxRate: '8.5' });
  const [notifications, setNotifications] = useState({ newOrders: true, lowStock: true, newUsers: false, weeklyReport: true });

  const handleSave = () => setSaved(true);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Settings</Typography>
        <Typography variant="body2" color="text.secondary">Manage your account and store preferences</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <PersonIcon sx={{ color: '#D32F2F' }} />
                <Typography variant="h6" fontWeight={700}>Profile Settings</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, p: 2, bgcolor: '#FAFAFA', borderRadius: 2 }}>
                <Avatar sx={{ width: 72, height: 72, bgcolor: '#D32F2F', fontSize: 26, fontWeight: 700 }}>AD</Avatar>
                <Box>
                  <Typography fontWeight={700}>{profile.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>{profile.email}</Typography>
                  <Button size="small" variant="outlined" color="primary" sx={{ borderRadius: 2, fontSize: 12 }}>Change Avatar</Button>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Email Address" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Phone Number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="Bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} fullWidth size="small" multiline rows={2} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <StoreIcon sx={{ color: '#D32F2F' }} />
                <Typography variant="h6" fontWeight={700}>Store Info</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Store Name" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <TextField label="Currency" value={store.currency} onChange={(e) => setStore({ ...store, currency: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <TextField label="Timezone" value={store.timezone} onChange={(e) => setStore({ ...store, timezone: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <TextField label="Tax Rate (%)" value={store.taxRate} onChange={(e) => setStore({ ...store, taxRate: e.target.value })} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <NotificationsIcon sx={{ color: '#D32F2F' }} />
                <Typography variant="h6" fontWeight={700}>Notifications</Typography>
              </Box>
              {[
                { key: 'newOrders', label: 'New Purchase Orders', desc: 'Get notified when a new purchase order is placed' },
                { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Alert when product stock falls below 10' },
                { key: 'newUsers', label: 'New Users', desc: 'When a new user registers' },
                { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a weekly sales summary' },
              ].map(({ key, label, desc }, i) => (
                <Box key={key}>
                  {i > 0 && <Divider sx={{ my: 1 }} />}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{label}</Typography>
                      <Typography variant="caption" color="text.secondary">{desc}</Typography>
                    </Box>
                    <Switch checked={notifications[key as keyof typeof notifications]} onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })} color="primary" />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <SecurityIcon sx={{ color: '#D32F2F' }} />
                <Typography variant="h6" fontWeight={700}>Security</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Current Password" type="password" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <TextField label="New Password" type="password" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <TextField label="Confirm New Password" type="password" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <Button variant="outlined" color="primary" sx={{ borderRadius: 2, alignSelf: 'flex-start' }}>Update Password</Button>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Two-Factor Authentication</Typography>
                    <Typography variant="caption" color="text.secondary">Add an extra layer of security</Typography>
                  </Box>
                  <Chip label="Enable" color="primary" size="small" clickable variant="outlined" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={handleSave} sx={{ borderRadius: 2, px: 4, fontWeight: 700 }}>
              Save All Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" onClose={() => setSaved(false)} sx={{ borderRadius: 2 }}>Settings saved successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
