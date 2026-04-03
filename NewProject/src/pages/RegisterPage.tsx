import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { userApi } from '../api/UserApi';
import type { IUser } from '../models/User';

type RegisterFormData = Pick<IUser, 'FirstName' | 'LastName' | 'Supplier' | 'Email' | 'Address' | 'PostalCode'>;

interface FormErrors {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Supplier?: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    FirstName: '',
    LastName: '',
    Email: '',
    Supplier: '',
    Address: '',
    PostalCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in ({} as FormErrors)) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.FirstName.trim()) newErrors.FirstName = 'First name is required.';
    if (!formData.LastName.trim()) newErrors.LastName = 'Last name is required.';
    if (!formData.Email.trim()) {
      newErrors.Email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = 'Enter a valid email address.';
    }
    if (!formData.Supplier.trim()) newErrors.Supplier = 'Supplier is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setApiError('');

    try {
      await userApi.CreateUser({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Email: formData.Email,
        Supplier: formData.Supplier,
        Address: formData.Address,
        PostalCode: formData.PostalCode,
        Role: '',
        Status: '',
        Avatar: (formData.FirstName.charAt(0) + formData.LastName.charAt(0)).toUpperCase(),
        Approved: 'None'
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setApiError(err.message || 'Failed to register user.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8E0000 0%, #C62828 40%, #EF5350 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
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

      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          mx: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
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
              Register User
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please fill in your details to create an account
            </Typography>
          </Box>

          {apiError && <Alert severity="error" sx={{ mb: 3 }}>{apiError}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>Registration successful! Redirecting to login...</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                  size="small"
                  error={!!errors.FirstName}
                  helperText={errors.FirstName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  required
                  size="small"
                  error={!!errors.LastName}
                  helperText={errors.LastName}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  size="small"
                  error={!!errors.Email}
                  helperText={errors.Email}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Supplier"
                  name="Supplier"
                  value={formData.Supplier}
                  onChange={handleChange}
                  required
                  size="small"
                  error={!!errors.Supplier}
                  helperText={errors.Supplier}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  fullWidth
                  label="Address"
                  name="Address"
                  value={formData.Address || ''}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="PostalCode"
                  value={formData.PostalCode || ''}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                mb: 2,
                background: 'linear-gradient(135deg, #C62828, #8E0000)',
                py: 1.25,
                fontSize: 15,
                fontWeight: 600,
                '&:hover': { background: 'linear-gradient(135deg, #8E0000, #C62828)' },
              }}
            >
              Register
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" color="primary" underline="hover" fontWeight={600}>
                Sign in
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
