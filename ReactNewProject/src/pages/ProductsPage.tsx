import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent, CardMedia, CardActions,
  Typography, Box, Button, Chip, TextField, InputAdornment,
  IconButton, Rating, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, CircularProgress,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IProduct } from '../models/IProduct';
import { productapi } from '../api/productapi';
import { useUserContext } from '../contexts/UserContext';

const ProductsPage: React.FC = () => {
  const { addItem, openCart } = useUserContext();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [snack, setSnack] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productapi.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const toggleFav = (id: number) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product: IProduct) => {
    const qty = quantities[product.id] || 1;
    addItem(product, qty);
    setSnack(`${qty}x ${product.name}`);
    openCart();
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  const filtered = products.filter(
    (p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Products</Typography>
        <Typography variant="body2" color="text.secondary">{products.length} items available</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)} sx={{ borderRadius: 2 }}>
            {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)}
          size="small" sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#9e9e9e', fontSize: 20 }} /></InputAdornment> }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', transition: 'all 0.25s' }, transition: 'all 0.25s' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia component="img" height="180" image={product.image} alt={product.name} sx={{ objectFit: 'cover' }} />
                  <IconButton size="small" onClick={() => toggleFav(product.id)} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#fff' } }}>
                    {favorites.includes(product.id)
                      ? <FavoriteIcon sx={{ color: '#D32F2F', fontSize: 18 }} />
                      : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                  </IconButton>
                  <Chip label={product.category} size="small" sx={{ position: 'absolute', top: 8, left: 8, fontSize: 11, height: 22, bgcolor: 'rgba(255,255,255,0.92)' }} />
                </Box>
                <CardContent sx={{ flex: 1, pb: 1 }}>
                  <Typography variant="body1" fontWeight={600} gutterBottom noWrap>{product.name}</Typography>
                  <Typography variant="body1" fontWeight={500} gutterBottom noWrap>{'InStock: ' + product.stockCount}</Typography>
                  <Typography variant="h6" fontWeight={800} color="primary">${product.price.toFixed(2)}</Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, display: 'flex', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e0e0e0', borderRadius: 1, p: 0.25, minWidth: 90 }}>
                    <IconButton size="small" onClick={() => handleQtyChange(product.id, -1)} disabled={(quantities[product.id] || 1) <= 1}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography fontWeight={600} sx={{ minWidth: 16, textAlign: 'center', fontSize: '0.875rem' }}>
                      {quantities[product.id] || 1}
                    </Typography>
                    <IconButton size="small" onClick={() => handleQtyChange(product.id, 1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Button fullWidth variant="contained" size="small" startIcon={<AddShoppingCartIcon />} onClick={() => handleAddToCart(product)} sx={{ borderRadius: 2, fontWeight: 600, height: '100%' }}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filtered.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">No products found</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      <Snackbar open={!!snack} autoHideDuration={2500} onClose={() => setSnack('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" onClose={() => setSnack('')} sx={{ borderRadius: 2 }}>
          <strong>{snack}</strong> added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsPage;
