import React, { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, Link as MuiLink, CircularProgress
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        p: { xs: 2, sm: 4 }, position: 'relative', overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', top: -80, left: -80, width: 350, height: 350, borderRadius: '50%', background: 'rgba(211,47,47,0.12)', filter: 'blur(80px)' }} />
      <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 450, height: 450, borderRadius: '50%', background: 'rgba(211,47,47,0.08)', filter: 'blur(100px)' }} />

      <Card sx={{ width: '100%', maxWidth: 480, borderRadius: 3, boxShadow: '0 25px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1 }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
             <Box sx={{ width: 48, height: 48, borderRadius: '12px', background: 'linear-gradient(135deg, #D32F2F, #EF5350)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ShoppingCartIcon sx={{ color: '#fff', fontSize: 26 }} />
             </Box>
             <Box>
               <Typography variant="h4" fontWeight={800}>ShopDash</Typography>
               <Typography variant="caption" color="text.secondary">Reset your password</Typography>
             </Box>
          </Box>

          {success ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 72, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} gutterBottom>Email Sent!</Typography>
              <Typography variant="body2" color="text.secondary">
                If an account exists for that email, we've sent password reset instructions.
                Redirecting back to login...
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, p: 2, bgcolor: '#FFEBEE', borderRadius: 2 }}>
                <LockResetIcon sx={{ color: '#D32F2F' }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>Forgot Password?</Typography>
                  <Typography variant="caption" color="text.secondary">Enter your email to receive a reset link</Typography>
                </Box>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Email Address *"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  size="medium"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button fullWidth variant="outlined" color="inherit" size="large" onClick={() => navigate('/login')} disabled={loading} sx={{ py: 1.4, fontWeight: 700, fontSize: 15, borderRadius: 2, color: '#757575', borderColor: '#e0e0e0' }}>
                    Cancel
                  </Button>
                  <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.4, fontWeight: 700, fontSize: 15, borderRadius: 2 }}>
                    {loading ? <CircularProgress size={22} color="inherit" /> : 'Send Link'}
                  </Button>
                </Box>
              </Box>
              <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
                Remembered your password?{' '}
                <MuiLink component={Link} to="/login" color="primary" fontWeight={600} underline="hover">Sign in</MuiLink>
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPasswordPage;
