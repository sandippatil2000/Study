import React, { useState } from 'react';
import './ProductsPage.css';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../contexts/CartContext';

// Mock product data
const MOCK_PRODUCTS = [
  { id: 'p1', name: 'Wireless Headphones', category: 'Electronics', price: 99.99, availableQuantity: 15, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
  { id: 'p2', name: 'Smart Watch', category: 'Electronics', price: 199.99, availableQuantity: 8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
  { id: 'p3', name: 'Running Shoes', category: 'Apparel', price: 89.99, availableQuantity: 24, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' },
  { id: 'p4', name: 'Coffee Maker', category: 'Home', price: 79.99, availableQuantity: 12, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400' },
  { id: 'p5', name: 'Backpack', category: 'Accessories', price: 45.00, availableQuantity: 30, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' },
  { id: 'p6', name: 'Desk Lamp', category: 'Home', price: 29.99, availableQuantity: 18, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400' },
];

const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home', 'Accessories'];

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const { addItem, items, updateQuantity } = useCart();

  const handleSearch = () => {
    const filtered = MOCK_PRODUCTS.filter(p => {
      const matchCat = category === 'All' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
    setProducts(filtered);
  };

  const handleAddToCart = (product: any, qty: number) => {
    for(let i=0; i<qty; i++){
       addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  const QuantityControl = ({ product }: { product: any }) => {
    const cartItem = items.find(i => i.id === product.id);
    const qty = cartItem ? cartItem.quantity : 0;
    const [localQty, setLocalQty] = useState(1);

    return (
      <Box className="products-quantity-box">
        {qty > 0 ? (
           <Box className="products-quantity-controls">
             <IconButton size="small" onClick={() => updateQuantity(product.id, qty - 1)}>
               <RemoveIcon fontSize="small" />
             </IconButton>
             <Typography variant="body2" className="products-quantity-text">{qty}</Typography>
             <IconButton size="small" onClick={() => updateQuantity(product.id, qty + 1)} disabled={qty >= product.availableQuantity}>
               <AddIcon fontSize="small" />
             </IconButton>
           </Box>
        ) : (
          <Box className="products-add-to-cart-box">
            <Box className="products-quantity-controls">
               <IconButton size="small" onClick={() => setLocalQty(Math.max(1, localQty - 1))}>
                 <RemoveIcon fontSize="small" />
               </IconButton>
               <Typography variant="body2" className="products-quantity-text">{localQty}</Typography>
               <IconButton size="small" onClick={() => setLocalQty(Math.min(product.availableQuantity, localQty + 1))}>
                 <AddIcon fontSize="small" />
               </IconButton>
             </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ShoppingCartIcon />}
              onClick={() => handleAddToCart(product, localQty)}
              sx={{ minWidth: 'auto', px: 1.5 }}
            >
              Add
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Box className="products-header-box">
        <Typography variant="h5" fontWeight={700} className="products-title-text">Products</Typography>
        <Card className="products-filter-card">
          <Box className="products-filter-box">
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              className="products-category-select"
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              className="products-search-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Card>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card className="products-product-card">
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                className="products-product-image"
              />
              <CardContent className="products-product-content">
                <Box className="products-product-title-row">
                  <Typography variant="subtitle1" fontWeight={700} className="products-product-name">
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={800} className="products-product-price">
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <Chip label={product.category} size="small" className="products-product-chip" />
                
                <Box className="products-product-bottom">
                  <Typography variant="caption" color="text.secondary" display="block">
                    Available: {product.availableQuantity}
                  </Typography>
                  <QuantityControl product={product} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {products.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1" align="center" className="products-empty-text">
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductsPage;
