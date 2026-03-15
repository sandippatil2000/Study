import { IProduct } from '../models/IProduct';

const mockProducts: IProduct[] = [
  { id: 1, name: 'Nike Air Max 90', price: 120, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', category: 'Shoes', stockCount: 50 },
  { id: 2, name: 'Samsung Galaxy S24', price: 999, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', category: 'Electronics', stockCount: 20 },
  { id: 3, name: 'Apple Watch Series 9', price: 399, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop', category: 'Electronics', stockCount: 30 },
  { id: 4, name: 'Sony WH-1000XM5', price: 350, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', category: 'Audio', stockCount: 15 },
  { id: 5, name: 'MacBook Air M3', price: 1299, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', category: 'Electronics', stockCount: 8 },
  { id: 6, name: 'Adidas Ultraboost 23', price: 180, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop', category: 'Shoes', stockCount: 40 },
  { id: 7, name: 'iPad Pro 12.9"', price: 1099, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop', category: 'Electronics', stockCount: 12 },
  { id: 8, name: 'Leather Backpack', price: 89, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', category: 'Accessories', stockCount: 100 },
  { id: 9, name: 'Ray-Ban Aviator', price: 154, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop', category: 'Accessories', stockCount: 45 },
  { id: 10, name: 'Instant Pot Duo', price: 99, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop', category: 'Home', stockCount: 75 },
  { id: 11, name: 'Yoga Mat Premium', price: 65, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop', category: 'Sports', stockCount: 30 },
  { id: 12, name: "Levi's 501 Jeans", price: 79, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop', category: 'Clothing', stockCount: 60 },
];

export const productapi = {
  getProducts: async (): Promise<IProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockProducts]);
      }, 500);
    });
  }
};
