import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import MicrosoftIcon from '@mui/icons-material/Window';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = (provider: string) => {
    // Simulate SSO — replace with real OAuth flow
    alert(`SSO login with ${provider} — integrate your OAuth provider here.`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 40%, #212121 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      {[
        { size: 400, top: -100, left: -100, opacity: 0.08 },
        { size: 600, top: 200, right: -200, opacity: 0.05 },
        { size: 300, bottom: -50, left: 100, opacity: 0.07 },
      ].map((c, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: c.size,
            height: c.size,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            top: c.top,
            left: c.left,
            right: (c as any).right,
            bottom: (c as any).bottom,
            opacity: c.opacity,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Left branding */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: 8,
          color: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 800,
              backdropFilter: 'blur(10px)',
            }}
          >
            R
          </Box>
          <Typography variant="h4" fontWeight={800} letterSpacing={1}>
            RedDash
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2, mb: 2 }}>
          Welcome back to<br />your dashboard
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.75, maxWidth: 380 }}>
          Sign in to access your analytics, manage users and explore your workspace.
        </Typography>
      </Box>

      {/* Login card */}
      <Box
        sx={{
          flex: { xs: 1, md: '0 0 480px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 4 },
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 440, borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #D32F2F, #B71C1C)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockOutlinedIcon sx={{ color: '#fff' }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>Sign In</Typography>
                <Typography variant="body2" color="text.secondary">Access your account</Typography>
              </Box>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

            {/* Login form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                id="login-email"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                autoComplete="email"
              />
              <TextField
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1 }}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
                <Link component="a" href="#" variant="caption" color="primary" underline="hover">
                  Forgot password?
                </Link>
              </Box>

              <Button
                id="login-submit-btn"
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mb: 2.5, py: 1.5, fontWeight: 700, fontSize: 16 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>

            {/* SSO divider */}
            <Divider sx={{ mb: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                Or continue with
              </Typography>
            </Divider>

            {/* SSO buttons */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              <Button
                id="sso-google-btn"
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSSOLogin('Google')}
                sx={{
                  borderColor: '#E0E0E0',
                  color: 'text.primary',
                  '&:hover': { borderColor: '#D32F2F', bgcolor: 'rgba(211,47,47,0.04)', boxShadow: 'none' },
                  py: 1.2,
                }}
              >
                Google
              </Button>
              <Button
                id="sso-github-btn"
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                onClick={() => handleSSOLogin('GitHub')}
                sx={{
                  borderColor: '#E0E0E0',
                  color: 'text.primary',
                  '&:hover': { borderColor: '#D32F2F', bgcolor: 'rgba(211,47,47,0.04)', boxShadow: 'none' },
                  py: 1.2,
                }}
              >
                GitHub
              </Button>
              <Button
                id="sso-microsoft-btn"
                fullWidth
                variant="outlined"
                startIcon={<MicrosoftIcon />}
                onClick={() => handleSSOLogin('Microsoft')}
                sx={{
                  borderColor: '#E0E0E0',
                  color: 'text.primary',
                  '&:hover': { borderColor: '#D32F2F', bgcolor: 'rgba(211,47,47,0.04)', boxShadow: 'none' },
                  py: 1.2,
                }}
              >
                MS
              </Button>
            </Box>

            <Typography variant="body2" align="center" color="text.secondary">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" color="primary" fontWeight={600} underline="hover">
                Create one
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
