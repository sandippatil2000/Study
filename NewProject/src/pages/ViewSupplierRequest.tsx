import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import FactCheck from '@mui/icons-material/FactCheck';
import type { ISupplierRequest } from '../models/SupplierRequest';
import { supplierApi } from '../api/SupplierApi';
import AttachmentList from '../components/AttachmentList';

// ─── Status chip colour map ───────────────────────────────────────────────────

type ChipColor = 'default' | 'warning' | 'info' | 'success' | 'error';

const STATUS_COLOR: Record<string, ChipColor> = {
  Pending: 'warning',
  Processing: 'info',
  Completed: 'success',
  Cancelled: 'error',
};

// ─── Read-only field component ────────────────────────────────────────────────

interface ReadFieldProps {
  label: string;
  value: string;
  type?: string;
}

const ReadField: React.FC<ReadFieldProps> = ({ label, value, type = 'text' }) => (
  <TextField
    label={label}
    value={value}
    type={type}
    size="small"
    InputProps={{ readOnly: true }}
    variant="outlined"
    sx={{
      width: '75%',
      '& .MuiOutlinedInput-root': {
        bgcolor: 'action.hover',
        '& fieldset': { borderColor: 'divider' },
        '&:hover fieldset': { borderColor: 'divider' },
        '&.Mui-focused fieldset': { borderColor: 'divider' },
      },
      '& .MuiInputBase-input': {
        color: 'text.primary',
        WebkitTextFillColor: 'unset',
      },
    }}
  />
);


// ─── Main Page ────────────────────────────────────────────────────────────────

interface ViewSupplierRequestProps {
  SupplierId?: number;
}

const ViewSupplierRequest: React.FC<ViewSupplierRequestProps> = ({ SupplierId }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [request, setRequest] = useState<ISupplierRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const fetchId = SupplierId !== undefined ? SupplierId : (id ? Number(id) : null);
        if (fetchId) {
          const data = await supplierApi.GetSupplierRequestById(fetchId);
          if (data) {
            setRequest(data);
          } else {
            setError('Supplier request not found');
          }
        } else {
          setError('Invalid request ID');
        }
      } catch (err) {
        setError('Failed to fetch supplier details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const stateRequest = (location.state as { request?: ISupplierRequest } | null)?.request;
    if (stateRequest && SupplierId === undefined) {
      setRequest(stateRequest);
      setLoading(false);
    } else {
      fetchRequest();
    }
  }, [id, SupplierId, location.state]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !request) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error || 'Request missing'}</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/supplierRequests')}>
          Back to List
        </Button>
      </Box>
    );
  }

  const statusColor: ChipColor = STATUS_COLOR[request.Status] ?? 'default';

  return (
    <Box>
      {/* ── Page Header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            onClick={() => navigate('/supplierRequests')}
            size="small"
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="h5" fontWeight={600}>
                Supplier Request
              </Typography>
              <Typography variant="h5" fontWeight={400} color="text.secondary">
                #{request.RequestId}
              </Typography>
              <Chip
                label={request.Status}
                color={statusColor}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Read-only view of the supplier request details.
            </Typography>
          </Box>
        </Box>

        {/* Edit shortcut */}
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/supplierRequests/edit/${request.RequestId}`)}
          sx={{ textTransform: 'none' }}
        >
          Edit
        </Button>


      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>

          {/* ── Section: Supplier Information ── */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Supplier Information
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ReadField label="First Name" value={request.FirstName} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ReadField label="Last Name" value={request.LastName} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ReadField label="Email Address" value={request.Email} type="email" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ReadField label="Supplier" value={request.Supplier} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ReadField label="Status" value={request.Status} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ReadField
                label="Date"
                value={request.Date instanceof Date
                  ? request.Date.toLocaleDateString()
                  : new Date(request.Date).toLocaleDateString()}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* ── Section: Attachments ── */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Attachments
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <AttachmentList
                label="Supplier File"
                files={request.SupplierFile ? [request.SupplierFile] : []}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AttachmentList label="Product Files" files={request.ProductFiles} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* ── Actions ── */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => navigate('/supplierRequests')}
              sx={{ textTransform: 'none', minWidth: 110 }}
            >
              Back to List
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/supplierRequests/edit/${request.RequestId}`)}
              sx={{ textTransform: 'none', fontWeight: 700, minWidth: 130 }}
            >
              Edit Request
            </Button>
            {/* Validate shortcut */}
            <Button
              variant="contained"
              startIcon={<FactCheck />}
              onClick={() => navigate(`/supplierRequests/validate/${request.RequestId}`)}
              sx={{ textTransform: 'none' }}
            >
              Continue To Valdiate
            </Button>
          </Stack>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewSupplierRequest;
