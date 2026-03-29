import React, { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  InputAdornment, IconButton, Alert, Link as MuiLink,
  CircularProgress, LinearProgress,
  Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { userapi } from '../api/userapi';

const getPasswordStrength = (pw: string): number => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
type StrengthColor = 'error' | 'warning' | 'info' | 'success';
const strengthColor: ('error' | StrengthColor)[] = ['error', 'error', 'warning', 'info', 'success'];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', supplierName: '', address: '', postalCode: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const strength = getPasswordStrength(form.password);

  const validate = (): string => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.address || !form.postalCode)
      return 'All fields are required.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (!/^\d{4,10}$/.test(form.postalCode)) return 'Postal code must be 4–10 digits.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await userapi.createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        address: form.address,
        postalCode: form.postalCode,
        supplierName: form.supplierName,
        orders: 0,
        spent: 0,
        status: 'Active',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        avatar: (form.firstName[0] + form.lastName[0]).toUpperCase(),
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
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

      <Card sx={{ width: '100%', maxWidth: 560, borderRadius: 3, boxShadow: '0 25px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1 }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', background: 'linear-gradient(135deg, #D32F2F, #EF5350)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCartIcon sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={800}>ShopDash</Typography>
              <Typography variant="caption" color="text.secondary">Create your account</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, p: 2, bgcolor: '#FFEBEE', borderRadius: 2 }}>
            <PersonAddIcon sx={{ color: '#D32F2F' }} />
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>Create Account</Typography>
              <Typography variant="caption" color="text.secondary">Fill in your details to get started</Typography>
            </Box>
          </Box>

          {success ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 72, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} gutterBottom>Account Created!</Typography>
              <Typography variant="body2" color="text.secondary">Redirecting you to the login page…</Typography>
            </Box>
          ) : (
            <>
              {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="First Name *" value={form.firstName} onChange={handleChange('firstName')} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Last Name *" value={form.lastName} onChange={handleChange('lastName')} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Email Address *" type="email" value={form.email} onChange={handleChange('email')} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Password *" type={showPassword ? 'text' : 'password'}
                      value={form.password} onChange={handleChange('password')} fullWidth size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }}
                    />
                    {form.password && (
                      <Box sx={{ mt: 1 }}>
                        <LinearProgress variant="determinate" value={(strength / 4) * 100} color={strengthColor[strength]} sx={{ borderRadius: 1, height: 6 }} />
                        <Typography variant="caption" color={`${strengthColor[strength]}.main`} sx={{ fontWeight: 600 }}>
                          Password strength: {strengthLabel[strength]}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Confirm Password *" type={showConfirm ? 'text' : 'password'}
                      value={form.confirmPassword} onChange={handleChange('confirmPassword')} fullWidth size="small"
                      error={!!form.confirmPassword && form.password !== form.confirmPassword}
                      helperText={form.confirmPassword && form.password !== form.confirmPassword ? 'Passwords do not match' : ''}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">{showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Supplier Name" value={form.supplierName} onChange={handleChange('supplierName')} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Address *" value={form.address} onChange={handleChange('address')} fullWidth size="small" multiline rows={2} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Postal Code *" value={form.postalCode} onChange={handleChange('postalCode')} fullWidth size="small" inputProps={{ maxLength: 10 }} helperText="4–10 digit postal code" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button fullWidth variant="outlined" color="inherit" size="large" onClick={() => navigate('/login')} disabled={loading} sx={{ py: 1.4, fontWeight: 700, fontSize: 15, borderRadius: 2, color: '#757575', borderColor: '#e0e0e0' }}>
                      Cancel
                    </Button>
                    <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.4, fontWeight: 700, fontSize: 15, borderRadius: 2 }}>
                      {loading ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
                Already have an account?{' '}
                <MuiLink component={Link} to="/login" color="primary" fontWeight={600} underline="hover">Sign in</MuiLink>
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
