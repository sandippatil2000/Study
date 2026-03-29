import React, { useState } from 'react';
import './RegisterPage.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: 'Too weak', color: '#f44336' },
    { label: 'Weak', color: '#ff9800' },
    { label: 'Fair', color: '#ffc107' },
    { label: 'Strong', color: '#4caf50' },
    { label: 'Very strong', color: '#2e7d32' },
  ];
  return { score, ...map[score] };
};

const steps = ['Account Info', 'Address'];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    postalCode: '',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const pwStrength = getPasswordStrength(form.password);

  const validateStep = () => {
    if (activeStep === 0) {
      if (!form.username || !form.email || !form.password || !form.confirmPassword) {
        setError('Please fill in all required fields.'); return false;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.'); return false;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.'); return false;
      }
    }
    if (activeStep === 1) {
      if (!form.address || !form.postalCode) {
        setError('Please fill in all required fields.'); return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (!validateStep()) return;
    if (activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
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
      {/* Decorative elements */}
      {[300, 500, 200].map((size, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            top: i === 0 ? -60 : i === 1 ? '30%' : 'auto',
            bottom: i === 2 ? -40 : 'auto',
            left: i === 1 ? -100 : 'auto',
            right: i === 0 ? -60 : 'auto',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Left branding  */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          px: 8,
          color: '#fff',
        }}
      >
        <Typography variant="h4" fontWeight={800} letterSpacing={1} mb={3}>
          🚀 RedDash
        </Typography>
        <Typography variant="h3" fontWeight={700} lineHeight={1.2} mb={2}>
          Join us today.<br />Get started for free.
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.75, maxWidth: 360 }}>
          Create your account and gain access to advanced analytics, user management, and a beautiful dashboard.
        </Typography>
      </Box>

      {/* Register card */}
      <Box
        sx={{
          flex: { xs: 1, md: '0 0 500px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 4 },
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 460, borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
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
                <PersonAddIcon sx={{ color: '#fff' }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>Create Account</Typography>
                <Typography variant="body2" color="text.secondary">It's quick and free</Typography>
              </Box>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        '&.Mui-active': { color: '#D32F2F' },
                        '&.Mui-completed': { color: '#D32F2F' },
                      },
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

            {activeStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  id="reg-username"
                  label="User Name"
                  fullWidth
                  value={form.username}
                  onChange={handleChange('username')}
                  autoComplete="username"
                />
                <TextField
                  id="reg-email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={form.email}
                  onChange={handleChange('email')}
                  autoComplete="email"
                />
                <Box>
                  <TextField
                    id="reg-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={form.password}
                    onChange={handleChange('password')}
                    autoComplete="new-password"
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
                  {form.password && (
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(pwStrength.score / 4) * 100}
                        sx={{
                          height: 5,
                          borderRadius: 5,
                          bgcolor: '#eee',
                          '& .MuiLinearProgress-bar': { bgcolor: pwStrength.color, borderRadius: 5 },
                        }}
                      />
                      <Typography variant="caption" sx={{ color: pwStrength.color, fontWeight: 600, mt: 0.3, display: 'block' }}>
                        {pwStrength.label}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <TextField
                  id="reg-confirm-password"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  autoComplete="new-password"
                  error={!!form.confirmPassword && form.password !== form.confirmPassword}
                  helperText={form.confirmPassword && form.password !== form.confirmPassword ? 'Passwords do not match' : ''}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  id="reg-address"
                  label="Address"
                  fullWidth
                  multiline
                  rows={3}
                  value={form.address}
                  onChange={handleChange('address')}
                  placeholder="123 Main Street, City, State"
                />
                <TextField
                  id="reg-postal"
                  label="Postal Code"
                  fullWidth
                  value={form.postalCode}
                  onChange={handleChange('postalCode')}
                  inputProps={{ maxLength: 10 }}
                />
              </Box>
            )}

            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setActiveStep((s) => s - 1)}
                  sx={{ flex: 1, py: 1.5, borderColor: '#D32F2F', color: '#D32F2F' }}
                >
                  Back
                </Button>
              )}
              <Button
                id="register-next-btn"
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={loading}
                sx={{ flex: 2, py: 1.5, fontWeight: 700, fontSize: 15 }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : activeStep === steps.length - 1 ? (
                  'Create Account'
                ) : (
                  'Continue'
                )}
              </Button>
            </Box>

            <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2.5 }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" color="primary" fontWeight={600} underline="hover">
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RegisterPage;
