import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

// ─── Types ───────────────────────────────────────────────────────────────────

type ValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid';

interface ValidationError {
  row: number;
  column: string;
  message: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Mock validation (replace with real API call) ────────────────────────────

const runMockValidation = (
  _file: File,
): Promise<{ valid: boolean; errors: ValidationError[] }> =>
  new Promise((resolve) =>
    setTimeout(() => {
      // Randomly pass/fail for demo purposes
      const pass = Math.random() > 0.4;
      resolve(
        pass
          ? { valid: true, errors: [] }
          : {
              valid: false,
              errors: [
                { row: 3, column: 'SupplierCode', message: 'Value is required.' },
                { row: 7, column: 'UnitPrice', message: 'Must be a positive number.' },
              ],
            },
      );
    }, 1800),
  );

// ─── File Upload Zone ─────────────────────────────────────────────────────────

interface FileUploadZoneProps {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ file, onChange, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    onChange(list[0]);
  };

  return (
    <Box>
      {/* Drop Zone */}
      <Box
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        sx={{
          border: '2px dashed',
          borderColor: dragging ? 'primary.main' : disabled ? 'action.disabled' : 'divider',
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          bgcolor: dragging ? 'action.hover' : disabled ? 'action.disabledBackground' : 'background.default',
          transition: 'all 0.2s ease',
          '&:hover': disabled
            ? {}
            : {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
        }}
      >
        <CloudUploadIcon
          sx={{ fontSize: 44, color: disabled ? 'action.disabled' : 'primary.main', mb: 1 }}
        />
        <Typography variant="body1" fontWeight={600} color={disabled ? 'text.disabled' : 'text.primary'}>
          Click to browse or drag &amp; drop
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Accepted formats: .xlsx, .csv, .xls &nbsp;·&nbsp; Max 10 MB
        </Typography>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.csv,.xls"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
        />
      </Box>

      {/* Selected File */}
      {file && (
        <List dense sx={{ mt: 1.5 }}>
          <ListItem
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1.5,
              bgcolor: 'background.paper',
            }}
            secondaryAction={
              !disabled && (
                <Tooltip title="Remove file">
                  <IconButton edge="end" size="small" color="error" onClick={() => onChange(null)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )
            }
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <InsertDriveFileIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 300 }}>
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
        </List>
      )}
    </Box>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ValidateFilePage: React.FC = () => {
  const navigate = useNavigate();

  const [supplierFile, setSupplierFile] = useState<File | null>(null);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isValidating = validationStatus === 'validating';
  const isValid = validationStatus === 'valid';
  const isInvalid = validationStatus === 'invalid';

  // ---- Validate ----
  const handleValidate = async () => {
    if (!supplierFile) return;
    setValidationStatus('validating');
    setValidationErrors([]);
    const result = await runMockValidation(supplierFile);
    setValidationStatus(result.valid ? 'valid' : 'invalid');
    setValidationErrors(result.errors);
  };

  // ---- Download Validated File ----
  const handleDownload = () => {
    if (!supplierFile) return;
    // In a real app, the server returns a validated/annotated file.
    // Here we just trigger a re-download of the original file as a demo.
    const url = URL.createObjectURL(supplierFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `validated_${supplierFile.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- Submit ----
  const handleSubmit = () => {
    if (!isValid) return;
    // TODO: integrate with API
    console.log('Submitting validated file:', supplierFile);
    setSubmitted(true);
  };

  // ---- Cancel ----
  const handleCancel = () => {
    navigate('/supplierRequests');
  };

  // ---- Reset after success ----
  const handleReset = () => {
    setSupplierFile(null);
    setValidationStatus('idle');
    setValidationErrors([]);
    setSubmitted(false);
  };

  return (
    <Box>
      {/* ── Page Header ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <IconButton
          onClick={() => navigate('/supplierRequests')}
          size="small"
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Validate Supplier File
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload your supplier file, validate it, then submit when ready.
          </Typography>
        </Box>
      </Box>

      {/* ── Success Banner ── */}
      {submitted && (
        <Alert
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 3 }}
          action={
            <Button size="small" color="inherit" onClick={handleReset}>
              Upload Another
            </Button>
          }
        >
          File submitted successfully!
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>

          {/* ── Section: File Upload ── */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
            Supplier File
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Upload the supplier data file you want to validate before submission.
          </Typography>

          <Box sx={{ maxWidth: 680 }}>
            <FileUploadZone
              file={supplierFile}
              onChange={(f) => {
                setSupplierFile(f);
                setValidationStatus('idle');
                setValidationErrors([]);
                setSubmitted(false);
              }}
              disabled={isValidating || submitted}
            />
          </Box>

          {/* ── Validation Progress ── */}
          {isValidating && (
            <Box sx={{ mt: 3, maxWidth: 680 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Validating file…
              </Typography>
              <LinearProgress sx={{ borderRadius: 1 }} />
            </Box>
          )}

          {/* ── Validation Result Badge ── */}
          {(isValid || isInvalid) && !submitted && (
            <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {isValid ? (
                <Chip
                  icon={<VerifiedIcon />}
                  label="File is valid — ready to submit"
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              ) : (
                <Chip
                  icon={<ErrorIcon />}
                  label={`${validationErrors.length} error(s) found`}
                  color="error"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
          )}

          {/* ── Validation Errors Table ── */}
          {isInvalid && validationErrors.length > 0 && !submitted && (
            <Box
              sx={{
                mt: 2,
                maxWidth: 680,
                border: '1px solid',
                borderColor: 'error.light',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '80px 160px 1fr',
                  bgcolor: 'error.light',
                  px: 2,
                  py: 1,
                }}
              >
                {['Row', 'Column', 'Issue'].map((h) => (
                  <Typography key={h} variant="caption" fontWeight={700} color="error.contrastText">
                    {h}
                  </Typography>
                ))}
              </Box>
              {/* Rows */}
              {validationErrors.map((err, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '80px 160px 1fr',
                    px: 2,
                    py: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    bgcolor: i % 2 === 0 ? 'background.paper' : 'action.hover',
                  }}
                >
                  <Typography variant="body2">{err.row}</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {err.column}
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    {err.message}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* ── Action Buttons ── */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            {/* Validate */}
            <Button
              id="btn-validate"
              variant="outlined"
              color="primary"
              startIcon={<VerifiedIcon />}
              onClick={handleValidate}
              disabled={!supplierFile || isValidating || submitted}
              sx={{ textTransform: 'none', minWidth: 130 }}
            >
              Validate
            </Button>

            {/* Download Validated File */}
            <Button
              id="btn-download-validated"
              variant="outlined"
              color="secondary"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              disabled={!isValid || submitted}
              sx={{ textTransform: 'none', minWidth: 200 }}
            >
              Download Validated File
            </Button>

            {/* Submit */}
            <Button
              id="btn-submit"
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!isValid || submitted}
              sx={{ textTransform: 'none', fontWeight: 700, minWidth: 130 }}
            >
              Submit
            </Button>

            {/* Cancel */}
            <Button
              id="btn-cancel"
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{ textTransform: 'none', minWidth: 120 }}
            >
              Cancel
            </Button>
          </Stack>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ValidateFilePage;
