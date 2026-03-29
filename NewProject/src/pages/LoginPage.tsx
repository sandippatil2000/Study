import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Link,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  Microsoft as MicrosoftIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, loginWithSSO } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password, rememberMe });
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSSO = async (provider: string) => {
    setError('');
    setSsoLoading(provider);
    try {
      await loginWithSSO(provider);
      navigate('/dashboard');
    } catch {
      setError(`Failed to sign in with ${provider}.`);
    } finally {
      setSsoLoading('');
    }
  };

  const ssoProviders = [
    { name: 'Google', icon: <GoogleIcon />, color: '#EA4335' },
    { name: 'Microsoft', icon: <MicrosoftIcon />, color: '#00a1f1' },
    { name: 'GitHub', icon: <GitHubIcon />, color: '#24292e' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #8E0000 0%, #C62828 40%, #EF5350 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <Box sx={{
        position: 'absolute', top: -100, right: -100, width: 400, height: 400,
        borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -80, left: -80, width: 300, height: 300,
        borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
      }} />

      {/* Left branding panel (visible on lg+) */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: 8,
          color: 'white',
        }}
      >
        <Typography variant="h3" fontWeight={800} gutterBottom>
          AdminPro
        </Typography>
        <Typography variant="h5" fontWeight={400} sx={{ opacity: 0.9, mb: 3 }}>
          Your complete dashboard solution
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.75, maxWidth: 360, lineHeight: 1.8 }}>
          Manage your team, track performance, analyze data, and make informed decisions
          — all from one powerful interface.
        </Typography>
        <Stack direction="row" spacing={2} mt={5}>
          {['Users Managed', 'Reports', 'Uptime'].map((stat, i) => (
            <Box key={stat} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700}>{['10K+', '500+', '99.9%'][i]}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>{stat}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Login Card */}
      <Box
        sx={{
          flex: { xs: 1, lg: '0 0 auto' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 4,
          width: { lg: 480 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #C62828, #8E0000)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Typography variant="h5" color="white" fontWeight={800}>A</Typography>
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Welcome back!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account to continue
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

            {/* Login Form */}
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="small"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="small"
                sx={{ mb: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ color: '#C62828', '&.Mui-checked': { color: '#C62828' } }}
                    />
                  }
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link href="#" variant="body2" color="primary" underline="hover">
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #C62828, #8E0000)',
                  py: 1.25,
                  fontSize: 15,
                  fontWeight: 600,
                  '&:hover': { background: 'linear-gradient(135deg, #8E0000, #C62828)' },
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>

            {/* SSO Divider */}
            <Divider sx={{ my: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                OR CONTINUE WITH
              </Typography>
            </Divider>

            {/* SSO Buttons */}
            <Stack spacing={1.5}>
              {ssoProviders.map((provider) => (
                <Button
                  key={provider.name}
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSSO(provider.name)}
                  disabled={ssoLoading === provider.name}
                  startIcon={
                    ssoLoading === provider.name
                      ? <CircularProgress size={18} color="inherit" />
                      : provider.icon
                  }
                  sx={{
                    borderColor: '#e0e0e0',
                    color: 'text.primary',
                    py: 1,
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: provider.color,
                      color: provider.color,
                      backgroundColor: `${provider.color}08`,
                    },
                  }}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
            </Stack>

            {/* Footer */}
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
              Don't have an account?{' '}
              <Link href="#" color="primary" underline="hover" fontWeight={600}>
                Contact admin
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
