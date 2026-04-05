import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { supplierApi } from '../api/SupplierApi';
import FileUpload from '../components/FileUpload';
import '../styles/CommonStyles.css';

// ---- Constants ----
const STATUS_OPTIONS = ['Pending', 'Processing', 'Completed', 'Cancelled'];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  supplier: string;
  status: string;
  description: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  supplier?: string;
  status?: string;
  description?: string;
  supplierFile?: string;
}




// ---- Main Page ----
const CreateSupplierRequest: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    supplier: '',
    status: 'Pending',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [supplierFile, setSupplierFile] = useState<File[]>([]);
  const [productFiles, setProductFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [successRequestId, setSuccessRequestId] = useState<number | null>(null);
  const [apiStatus, setApiStatus] = useState<{ message: string; severity: 'error' | 'success' | 'info' | 'warning' } | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {
    };
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.supplier.trim()) newErrors.supplier = 'Supplier is required.';
    if (!form.status) newErrors.status = 'Status is required.';
    if (!form.description) newErrors.description = 'Description is required.';
    if (supplierFile.length === 0) newErrors.supplierFile = 'Supplier file is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setApiStatus(null);

    try {
      const response = await supplierApi.CreateSupplierRequest({
        UserId: 0, // Defaulting system mock user ID
        FirstName: form.firstName,
        LastName: form.lastName,
        Email: form.email,
        Supplier: form.supplier,
        Description: form.description,
        Status: form.status,
        Date: new Date(),
        SupplierFile: supplierFile.length > 0 ? supplierFile[0].name : null,
        ProductFiles: productFiles.map(f => f.name)
      });

      setSuccessRequestId(response.RequestId);
      setSubmitted(true);
    } catch (error: any) {
      setApiStatus({ message: error.message || 'Failed to save supplier request', severity: 'error' });
    }
  };

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', email: '', supplier: '', status: 'Pending', description: '' });
    setErrors({});
    setSupplierFile([]);
    setProductFiles([]);
    setSubmitted(false);
    setSuccessRequestId(null);
    setApiStatus(null);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <IconButton onClick={() => navigate('/supplierRequests')} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={600}>Create Supplier Request</Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below to submit a new supplier request.
          </Typography>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={successRequestId !== null}
        onClose={() => navigate('/supplierRequests')}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 52, color: 'success.main', mb: 1, display: 'block', mx: 'auto' }} />
          <Typography variant="h6" fontWeight={700}>Order Placed Successfully!</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Supplier Request has been submitted successfully.
          </Typography>
          <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mt: 1 }}>
            Supplier Request ID: #{successRequestId}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={() => navigate('/supplierRequests')} sx={{ px: 4, fontWeight: 600 }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Section: Personal Info */}
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Supplier Information
            </Typography>

            {apiStatus && (
              <Alert severity={apiStatus.severity} sx={{ mb: 3 }}>
                {apiStatus.message}
              </Alert>
            )}

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="First Name"
                  size="small"
                  sx={{ width: '75%' }}
                  required
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  disabled={submitted}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Last Name"
                  size="small"
                  sx={{ width: '75%' }}
                  required
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  disabled={submitted}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Email Address"
                  type="email"
                  size="small"
                  sx={{ width: '75%' }}
                  required
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={submitted}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Supplier"
                  size="small"
                  sx={{ width: '75%' }}
                  required
                  value={form.supplier}
                  onChange={(e) => handleChange('supplier', e.target.value)}
                  error={!!errors.supplier}
                  helperText={errors.supplier}
                  disabled={submitted}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Description"
                  size="small"
                  sx={{ width: '75%' }}
                  required
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description}
                  disabled={submitted}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Status"
                  select
                  size="small"
                  sx={{ width: '75%' }}
                  required
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  error={!!errors.status}
                  helperText={errors.status}
                  disabled={submitted}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>


            <Divider sx={{ my: 3 }} />

            {/* Section: File Uploads */}
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Attachments
            </Typography>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <FileUpload
                  label="Supplier File"
                  multiple={false}
                  files={supplierFile}
                  onFilesChange={(files) => {
                    setSupplierFile(files);
                    if (errors.supplierFile && files.length > 0) {
                      setErrors((prev) => ({ ...prev, supplierFile: undefined }));
                    }
                  }}
                  error={!!errors.supplierFile}
                  helperText={errors.supplierFile}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FileUpload
                  label="Product Files"
                  multiple={true}
                  files={productFiles}
                  onFilesChange={setProductFiles}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Actions */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate('/supplierRequests')}
                //sx={{ textTransform: 'none' }}
                className='common-button-nonfill'
              >
                Cancel
              </Button>
              <Button
                type="reset"
                variant="outlined"
                color="warning"
                size="small"
                onClick={handleReset}
                disabled={submitted}
                //sx={{ textTransform: 'none' }}
                className='common-button-nonfill'
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={submitted}
                //sx={{ textTransform: 'none', fontWeight: 700 }}
                className='common-button-fill'
              >
                Save Request
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateSupplierRequest;
