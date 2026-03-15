import React, { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Divider, IconButton, InputAdornment, Alert, Link as MuiLink,
  CircularProgress, Checkbox, FormControlLabel, Chip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Window';
import AppleIcon from '@mui/icons-material/Apple';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { userapi } from '../api/userapi';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    
    try {
      const user = await userapi.authenticate(email, password);
      if (user) {
        const expiry = new Date().getTime() + 5 * 60 * 1000;
        sessionStorage.setItem('user', JSON.stringify({ ...user, expiry }));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. (Hint: use alice@email.com)');
      }
    } catch (err) {
      setError('An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleSso = (provider: string) => {
    setSsoLoading(provider);
    setTimeout(() => { setSsoLoading(''); navigate('/dashboard'); }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'flex',
        // background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        background: 'linear-gradient(135deg, #EF5350 0%, #b20502ff 50%, #0f3460 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(211,47,47,0.15)', filter: 'blur(80px)' }} />
      <Box sx={{ position: 'absolute', bottom: -150, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(211,47,47,0.08)', filter: 'blur(100px)' }} />

      {/* Left branding panel */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 6, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: '12px', background: 'linear-gradient(135deg, #D32F2F, #EF5350)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCartIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, letterSpacing: -0.5 }}>ShopDash</Typography>
        </Box>
        <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, textAlign: 'center', lineHeight: 1.2, mb: 2 }}>
          Welcome back to<br /><Box component="span" sx={{ color: '#EF5350' }}>ShopDash</Box>
        </Typography>
      </Box>

      {/* Right login card */}
      <Box sx={{ flex: { xs: 1, md: '0 0 480px' }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 }, position: 'relative', zIndex: 1 }}>
        <Card sx={{ width: '100%', maxWidth: 440, borderRadius: 3, boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg, #D32F2F, #EF5350)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingCartIcon sx={{ color: '#fff', fontSize: 22 }} />
                </Box>
                <Typography variant="h5" fontWeight={800}>ShopDash</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: '#FFEBEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LockOutlinedIcon sx={{ color: '#D32F2F', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800}>Sign In</Typography>
                <Typography variant="caption" color="text.secondary">Sign in to your account</Typography>
              </Box>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}



            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email Address" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} fullWidth variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                label="Password" type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)} fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} size="small" color="primary" />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <MuiLink component={Link} to="/reset-password" underline="hover" variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                  Forgot password?
                </MuiLink>
              </Box>
              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.4, fontWeight: 700, fontSize: 15, borderRadius: 2 }}>
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>

            <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register" color="primary" fontWeight={600} underline="hover">
                Create account
              </MuiLink>
            </Typography>
            <Divider sx={{ mb: 3 }}>
              <Chip label="or sign in with email" size="small" sx={{ fontSize: 11 }} />
            </Divider>
            {/* SSO */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              {[
                { key: 'google', label: 'Continue with Google', icon: <GoogleIcon sx={{ color: '#EA4335' }} /> },
                { key: 'microsoft', label: 'Continue with Microsoft', icon: <MicrosoftIcon sx={{ color: '#00A4EF' }} /> },
                { key: 'apple', label: 'Continue with Apple', icon: <AppleIcon /> },
              ].map(({ key, label, icon }) => (
                <Button
                  key={key}
                  fullWidth variant="outlined" size="large"
                  startIcon={ssoLoading === key ? <CircularProgress size={18} /> : icon}
                  onClick={() => handleSso(key)}
                  disabled={!!ssoLoading}
                  sx={{ borderColor: '#e0e0e0', color: '#333', '&:hover': { borderColor: '#D32F2F', bgcolor: '#FFEBEE' }, py: 1.2, justifyContent: 'flex-start', px: 3, borderRadius: 2 }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </CardContent>

        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
