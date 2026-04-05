import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  LocalPostOffice as PostalIcon,
  Badge as BadgeIcon,
  ToggleOn as StatusIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../api/UserApi';
import type { IUser } from '../models/User';

const ViewUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id) return;
      try {
        const fetchedUser = await userApi.GetUserById(Number(id));
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setError('User not found.');
        }
      } catch (err) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  /* ── shared sx for read-only fields ── */
  const readonlySx = {
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

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: '#C62828' }} size={32} />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alert severity="error">{error || 'User not found'}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card
        sx={{
          width: '100%',
          maxWidth: 800,
          borderRadius: 2.5,
          /* glassmorphism — matches Navbar AppBar style */
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
            height: '3px',
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
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

          {/* ── Header: avatar + title ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
            {/* Spinning gradient ring (mirrors Navbar avatar ring) */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C62828, #FF6B6B)',
                  animation: 'spin 3s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  border: '2px solid #fff',
                  boxShadow: '0 4px 14px rgba(198,40,40,0.45)',
                }}
              >
                <Typography variant="h6" color="white" fontWeight={800} sx={{ fontSize: '1.1rem' }}>
                  {user.Avatar || user.FirstName?.charAt(0)}
                </Typography>
              </Box>
            </Box>

            <Box>
              {/* Section title — gradient text matching Navbar page title */}
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #C62828 0%, #B71C1C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: 0.2,
                  lineHeight: 1.3,
                }}
              >
                {user.FirstName} {user.LastName}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
                User Profile · Read Only
              </Typography>
            </Box>

            {/* Thin vertical accent bar — mirrors Navbar page-title bar */}
            <Box
              sx={{
                ml: 'auto',
                width: 3,
                height: 32,
                borderRadius: 4,
                background: 'linear-gradient(180deg, #C62828 0%, #FF6B6B 100%)',
                flexShrink: 0,
              }}
            />
          </Box>

          {/* ── Fields ── */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth size="small"
                label="First Name"
                value={user.FirstName || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth size="small"
                label="Last Name"
                value={user.LastName || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth size="small"
                label="Email Address"
                value={user.Email || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth size="small"
                label="Supplier"
                value={user.Supplier || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><BusinessIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField
                fullWidth size="small"
                label="Address"
                value={user.Address || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth size="small"
                label="Postal Code"
                value={user.PostalCode || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><PostalIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth size="small"
                label="Role"
                value={user.Role || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth size="small"
                label="Status"
                value={user.Status || ''}
                sx={readonlySx}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start"><StatusIcon /></InputAdornment>,
                }}
              />
            </Grid>
          </Grid>

          {/* ── Back button — matches Navbar active nav-button style ── */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3.5 }}>
            <Button
              size="small"
              startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
              onClick={() => navigate('/users')}
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
              Back to Users
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewUserPage;
