import React from 'react';
import './CartPage.css';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, totalCount, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <Box>
      <Box className="cart-header-box">
        <Box className="cart-icon-wrapper">
          <ShoppingCartIcon />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={700}>Shopping Cart</Typography>
          <Typography variant="body2" color="text.secondary">
            {totalCount} item{totalCount !== 1 ? 's' : ''} in your cart
          </Typography>
        </Box>
      </Box>

      {items.length === 0 ? (
        <Card>
          <CardContent className="cart-empty-content">
            <ShoppingCartIcon className="cart-empty-icon" />
            <Typography variant="h6" color="text.secondary" fontWeight={600}>Your cart is empty</Typography>
            <Typography variant="body2" color="text.secondary">Add some items from the products page</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/products')} className="cart-empty-btn">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent className="cart-list-card-content">
                {items.map((item, index) => (
                  <Box key={item.id}>
                    <Box className="cart-item-row">
                      {/* Item avatar */}
                      <Avatar
                        src={item.image}
                        className="cart-item-avatar"
                      >
                        {item.name[0]}
                      </Avatar>

                      {/* Info */}
                      <Box className="cart-item-info">
                        <Typography variant="h6" fontWeight={700} noWrap className="cart-item-name">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toFixed(2)} each
                        </Typography>
                      </Box>

                      {/* Quantity & Price */}
                      <Box className="cart-item-actions-wrapper">
                        <Box className="cart-item-qty-box">
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="cart-item-qty-btn"
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body1" fontWeight={700} className="cart-item-qty-text">
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="cart-item-qty-btn"
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        <Typography variant="h6" color="primary.main" fontWeight={800} className="cart-item-total-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>

                        <IconButton
                          onClick={() => removeItem(item.id)}
                          className="cart-item-delete-btn"
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    {index < items.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="cart-summary-card">
              <CardContent className="cart-summary-content">
                <Typography variant="h6" fontWeight={700} className="cart-summary-title">Order Summary</Typography>
                
                <Box className="cart-summary-row">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight={600}>${totalPrice.toFixed(2)}</Typography>
                </Box>
                <Box className="cart-summary-row">
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography color="success.main" fontWeight={600}>Free</Typography>
                </Box>
                <Box className="cart-summary-row">
                  <Typography color="text.secondary">Estimated Tax</Typography>
                  <Typography fontWeight={600}>${(totalPrice * 0.08).toFixed(2)}</Typography>
                </Box>
                
                <Divider className="cart-summary-divider" />
                
                <Box className="cart-summary-total-row">
                  <Typography variant="h6" fontWeight={800}>Total</Typography>
                  <Typography variant="h6" fontWeight={800} color="primary.main">
                    ${(totalPrice + (totalPrice * 0.08)).toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  className="cart-checkout-btn"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
