import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton,
  List, ListItem, Avatar, Chip, Paper, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress, Select, MenuItem, FormControl, InputLabel, TextField, Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSessionUser } from '../common/CommonFunction';
import { purchaseorderapi } from '../api/purchaseorderapi';
import { productapi } from '../api/productapi';
import { IProduct } from '../models/IProduct';
import { CartItem } from '../contexts/UserContext';
import { Mode } from '../models/mode';

const UpdatePurchaseOrderpage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [availableProducts, setAvailableProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [updatedOrderId, setUpdatedOrderId] = useState<number | null>(null);

  // Add Product Dialog States
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addQuantity, setAddQuantity] = useState<number>(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const queryMode = searchParams.get('mode');
  const [mode] = useState<Mode>(queryMode === 'view' ? Mode.view : Mode.edit);
  const user = getSessionUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      if (mode !== Mode.view) {
        const products = await productapi.getProducts();
        setAvailableProducts(products);
      }

      if (orderId) {
        const order = await purchaseorderapi.getPurchaseOrderById(Number(orderId));
        if (order) {
          const initialItems: CartItem[] = order.Products.map(p => ({
            ...p,
            quantity: (p as any).quantity || 1
          }));
          setItems(initialItems);
        }
      }
      setLoading(false);
    };

    fetchInitialData();
  }, [orderId, mode]);

  const handleOpenAddDialog = () => {
    setSelectedCategory('All');
    setSelectedProductId('');
    setAddQuantity(1);
    setAddDialogOpen(true);
  };

  const categories = ['All', ...Array.from(new Set(availableProducts.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All'
    ? availableProducts
    : availableProducts.filter(p => p.category === selectedCategory);

  const handleAddProduct = () => {
    if (!selectedProductId) return;
    const selectedProduct = availableProducts.find(p => p.id === selectedProductId);
    if (!selectedProduct) return;

    setItems(prev => {
      const existing = prev.find(i => i.id === selectedProduct.id);
      if (existing) {
        return prev.map(i => i.id === selectedProduct.id ? { ...i, quantity: i.quantity + addQuantity } : i);
      }
      return [...prev, { ...selectedProduct, quantity: addQuantity }];
    });
    setAddDialogOpen(false);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i).filter(i => i.quantity > 0));
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmitOrder = async () => {
    if (!user || !orderId) return;
    await purchaseorderapi.updatePurchaseOrder(Number(orderId), {
      amount: totalPrice,
      Products: items
    });
    setUpdatedOrderId(Number(orderId));
    setSuccessDialogOpen(true);
  };

  const handleDialogOk = () => {
    setSuccessDialogOpen(false);
    navigate('/dashboard/orders');
  };

  if (!user) return null;
  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>;

  return (
    <>
      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, md: 2 } }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptIcon fontSize="small" color="primary" /> {mode === Mode.view ? 'View' : 'Update'} Purchase Order #{orderId}
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
              <Box sx={{ bgcolor: '#FAFAFA', p: 1.5, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight={700}>Order Items</Typography>
                {mode !== Mode.view && (
                  <Button startIcon={<AddIcon />} size="small" variant="outlined" onClick={handleOpenAddDialog} sx={{ fontSize: 11, fontWeight: 700 }}>
                    Add Product
                  </Button>
                )}
              </Box>
              {items.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Order has no items.</Typography>
                </Box>
              ) : (
                <List disablePadding>
                  {items.map((item, index) => (
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
                          {mode === Mode.view ? (
                            <Typography variant="body2" sx={{ px: 1.5, textAlign: 'center', fontWeight: 600 }}>
                              Qty: {item.quantity}
                            </Typography>
                          ) : (
                            <>
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
                            </>
                          )}
                        </Box>
                      </ListItem>
                      {index < items.length - 1 && <Divider />}
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
              {mode !== Mode.view && (
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  startIcon={<CheckCircleIcon fontSize="small" />}
                  sx={{ py: 0.8, fontWeight: 600, fontSize: 13 }}
                  disabled={items.length === 0}
                  onClick={handleSubmitOrder}
                >
                  Update Order
                </Button>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleDialogOk} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 52, color: 'success.main', mb: 1, display: 'block', mx: 'auto' }} />
          <Typography variant="h6" fontWeight={700}>Order Updated Successfully!</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            The purchase order has been updated successfully.
          </Typography>
          <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mt: 1 }}>
            Order ID: #{updatedOrderId}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={handleDialogOk} sx={{ px: 4, fontWeight: 600 }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Product Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add Product</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProductId('');
              }}
            >
              {categories.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            options={filteredProducts}
            getOptionLabel={(option) => `${option.name} - $${option.price}`}
            value={filteredProducts.find(p => p.id === selectedProductId) || null}
            onChange={(e, newValue) => setSelectedProductId(newValue ? (newValue as IProduct).id : '')}
            renderInput={(params) => <TextField {...params} label="Search Product" />}
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={addQuantity}
            onChange={(e) => setAddQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            fullWidth
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 2 }}>
          <Button onClick={() => setAddDialogOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleAddProduct} disabled={!selectedProductId}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdatePurchaseOrderpage;
