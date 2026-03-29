import React from 'react';
import './SettingsPage.css';
import { Box, Card, CardContent, Typography, Switch, FormControlLabel, Divider, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsPage: React.FC = () => {
  const [notif, setNotif] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [emailAlerts, setEmailAlerts] = React.useState(true);

  return (
    <Box>
      <Box className="settings-header-box">
        <Box className="settings-icon-wrapper">
          <SettingsIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>Settings</Typography>
          <Typography variant="body2" color="text.secondary">Manage your preferences</Typography>
        </Box>
      </Box>
      <Card className="settings-card">
        <CardContent className="settings-card-content">
          <Typography variant="subtitle2" fontWeight={700} className="settings-title">Preferences</Typography>
          <FormControlLabel
            control={<Switch checked={notif} onChange={(e) => setNotif(e.target.checked)} color="primary" />}
            label="Push Notifications"
          />
          <Divider className="settings-divider" />
          <FormControlLabel
            control={<Switch checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} color="primary" />}
            label="Email Alerts"
          />
          <Divider className="settings-divider" />
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} color="primary" />}
            label="Dark Mode (Coming Soon)"
            disabled
          />
          <Box className="settings-save-box">
            <Button variant="contained" color="primary">Save Changes</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
