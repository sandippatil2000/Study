import React from 'react';
import {
  Box, Typography, Button, IconButton,
  List, ListItem, Avatar, Chip, Paper, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useUserContext();
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1.5, md: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ShoppingBagIcon fontSize="medium" color="primary" /> Shopping Cart
      </Typography>

      {state.items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 4, border: '1px solid #eee' }}>
          <ShoppingBagIcon sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Add some products to get started!
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/dashboard/products')}>
            Browse Products
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: { md: 2 } }}>
            <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #eee', overflow: 'hidden' }}>
              <List disablePadding>
                {state.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem sx={{ py: 1.5, px: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Avatar src={item.image} variant="rounded" sx={{ width: 64, height: 64, borderRadius: 1.5 }} />
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                        <Chip label={item.category} size="small" sx={{ mt: 0.5, mb: 0.5, height: 20, fontSize: 11 }} />
                        <Typography variant="subtitle1" fontWeight={700} color="primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                          <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small" sx={{ p: 1 }}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1" sx={{ px: 2, minWidth: 32, textAlign: 'center', fontWeight: 600 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small" sx={{ p: 1 }}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Button startIcon={<DeleteOutlineIcon />} color="error" size="small" onClick={() => removeItem(item.id)}>
                          Remove
                        </Button>
                      </Box>
                    </ListItem>
                    {index < state.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="inherit" onClick={clearCart} sx={{ color: '#757575', borderColor: '#e0e0e0' }}>
                Clear Cart
              </Button>
            </Box>
          </Box>

          <Box sx={{ flex: { md: 1 } }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #eee', position: 'sticky', top: 24 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>Order Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, mt: 2 }}>
                <Typography color="text.secondary">Items ({totalItems})</Typography>
                <Typography fontWeight={600}>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
                <Typography variant="subtitle1" fontWeight={700} color="primary">${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="medium"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{ py: 1, fontWeight: 600, fontSize: 14 }}
                onClick={() => navigate('/dashboard/create-order')}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
