import React, { useEffect } from 'react';
import {
  Box, Typography, Button, IconButton,
  List, ListItem, Avatar, Chip, Paper, Divider,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { getSessionUser } from '../common/CommonFunction';

const CreatePurchaseOrderPage: React.FC = () => {
  const { state, removeItem, updateQuantity, totalItems, totalPrice, setPurchaseOrder } = useUserContext();
  const navigate = useNavigate();
  const user = getSessionUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmitOrder = () => {
    if (!user) return;
    const order = {
      orderId: Date.now(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address || '',
      postalCode: user.postalCode || '',
      status: 'Pending',
      amount: totalPrice,
      Date: new Date(),
      Products: state.items,
    };
    setPurchaseOrder(order);
    alert(`Order submitted successfully! Order ID: ${order.orderId}`);
  };

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, md: 2 } }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptIcon fontSize="small" color="primary" /> Create Purchase Order
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: { md: 2 } }}>
          {/* User Details Panel */}
          <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #eee', overflow: 'hidden', mb: 3 }}>
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 2, display: 'flex', gap: 1 }}>
                <PersonIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>Name</Typography>
                  <Typography variant="body2" fontWeight={600}>{user.firstName} {user.lastName}</Typography>
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ py: 1, px: 2, display: 'flex', gap: 1 }}>
                <EmailIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>Email Address</Typography>
                  <Typography variant="body2" fontWeight={600}>{user.email}</Typography>
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ py: 1, px: 2, display: 'flex', gap: 1 }}>
                <LocationOnIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>Shipping Address</Typography>
                  <Typography variant="body2" fontWeight={600}>{user.address || 'No address provided'}</Typography>
                </Box>
              </ListItem>
            </List>
          </Paper>

          {/* Cart Items */}
          <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #eee', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#FAFAFA', p: 1.5, borderBottom: '1px solid #eee' }}>
              <Typography variant="body2" fontWeight={700}>Order Items</Typography>
            </Box>
            {state.items.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Your cart is empty.</Typography>
                <Button variant="outlined" size="small" sx={{ mt: 1.5 }} onClick={() => navigate('/dashboard/products')}>
                  Browse Products
                </Button>
              </Box>
            ) : (
              <List disablePadding>
                {state.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem sx={{ py: 1, px: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      <Avatar src={item.image} variant="rounded" sx={{ width: 48, height: 48, borderRadius: 1 }} />
                      <Box sx={{ flex: 1, minWidth: 150 }}>
                        <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                        <Chip label={item.category} size="small" sx={{ mt: 0.5, mb: 0.5, height: 18, fontSize: 10 }} />
                        <Typography variant="body2" fontWeight={700} color="primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                          <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small" sx={{ p: 0.5 }}>
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ px: 1.5, minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small" sx={{ p: 0.5 }}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Button startIcon={<DeleteOutlineIcon fontSize="small" />} color="error" size="small" sx={{ fontSize: 11 }} onClick={() => removeItem(item.id)}>
                          Remove
                        </Button>
                      </Box>
                    </ListItem>
                    {index < state.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Box>

        <Box sx={{ flex: { md: 1 } }}>
          <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, border: '1px solid #eee', position: 'sticky', top: 24 }}>
            <Typography variant="body2" fontWeight={700} gutterBottom>Order Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 1.5 }}>
              <Typography variant="body2" color="text.secondary">Items ({totalItems})</Typography>
              <Typography variant="body2" fontWeight={600}>${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" fontWeight={700}>Total</Typography>
              <Typography variant="body2" fontWeight={700} color="primary">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<CheckCircleIcon fontSize="small" />}
              sx={{ py: 0.8, fontWeight: 600, fontSize: 13 }}
              disabled={state.items.length === 0}
              onClick={handleSubmitOrder}
            >
              Submit Order
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePurchaseOrderPage;
