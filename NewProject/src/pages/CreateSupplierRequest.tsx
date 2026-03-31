import React, { useState, useRef } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
}

// ---- File Upload Zone Component ----
interface FileUploadZoneProps {
  label: string;
  multiple?: boolean;
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  label,
  multiple = false,
  files,
  onFilesChange,
  accept = '*',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming);
    onFilesChange(multiple ? [...files, ...newFiles] : [newFiles[0]]);
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Box>
      <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>

      {/* Drop Zone */}
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        sx={{
          border: '2px dashed',
          borderColor: dragging ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 1.5,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: dragging ? 'action.hover' : 'background.default',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 24, color: 'primary.main', mb: 0.5 }} />
        <Typography variant="body2" fontWeight={600}>
          Click to browse or drag & drop
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {multiple ? 'Multiple files supported' : 'Single file only'}
        </Typography>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </Box>

      {/* File List */}
      {files.length > 0 && (
        <List dense sx={{ mt: 1 }}>
          {files.map((file, index) => (
            <ListItem
              key={index}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1.5,
                mb: 0.5,
                bgcolor: 'background.paper',
                pr: 1,
              }}
              secondaryAction={
                <Tooltip title="Remove">
                  <IconButton edge="end" size="small" onClick={() => removeFile(index)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <InsertDriveFileIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 260 }}>
                    {file.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {formatSize(file.size)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

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

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {
      description: ''
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
    if (!form.description) newErrors.status = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Integrate with API
    console.log('Submitting:', { ...form, supplierFile, productFiles });
    navigate('/supplierRequests/validate');
  };

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', email: '', supplier: '', status: 'Pending', description: '' });
    setErrors({});
    setSupplierFile([]);
    setProductFiles([]);
    setSubmitted(false);
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

      {/* Success Banner */}
      {submitted && (
        <Alert
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 3 }}
          action={
            <Button size="small" color="inherit" onClick={handleReset}>
              New Request
            </Button>
          }
        >
          Supplier request submitted successfully!
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Section: Personal Info */}
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Supplier Information
            </Typography>
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
                  value={form.supplier}
                  onChange={(e) => handleChange('description', e.target.value)}
                  error={!!errors.supplier}
                  helperText={errors.supplier}
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
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <FileUploadZone
                  label="Supplier File"
                  multiple={false}
                  files={supplierFile}

                  onFilesChange={setSupplierFile}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FileUploadZone
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
                onClick={() => navigate('/supplierRequests')}
                sx={{ textTransform: 'none', minWidth: 110 }}
              >
                Cancel
              </Button>
              <Button
                type="reset"
                variant="outlined"
                color="warning"
                onClick={handleReset}
                disabled={submitted}
                sx={{ textTransform: 'none', minWidth: 110 }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitted}
                sx={{ textTransform: 'none', fontWeight: 700, minWidth: 160 }}
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
