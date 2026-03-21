import { IProduct } from '../models/IProduct';
import product1Image from '../assets/products/1.jpg';
import product2Image from '../assets/products/2.jpg';
import product3Image from '../assets/products/3.jpg';
import product4Image from '../assets/products/4.jpg';
import product5Image from '../assets/products/5.jpg';
import product6Image from '../assets/products/6.jpg';
import product7Image from '../assets/products/7.jpg';
import product8Image from '../assets/products/8.jpg';
import product9Image from '../assets/products/9.jpg';
import product10Image from '../assets/products/10.jpg';
import product11Image from '../assets/products/11.jpg';
import product12Image from '../assets/products/12.jpg';

const mockProducts: IProduct[] = [
  { id: 1, name: 'Nike Air Max 90', price: 120, image: product1Image, category: 'Shoes', stockCount: 50 },
  { id: 2, name: 'Samsung Galaxy S24', price: 999, image: product2Image, category: 'Electronics', stockCount: 20 },
  { id: 3, name: 'Apple Watch Series 9', price: 399, image: product3Image, category: 'Electronics', stockCount: 30 },
  { id: 4, name: 'Sony WH-1000XM5', price: 350, image: product4Image, category: 'Audio', stockCount: 15 },
  { id: 5, name: 'MacBook Air M3', price: 1299, image: product5Image, category: 'Electronics', stockCount: 8 },
  { id: 6, name: 'Adidas Ultraboost 23', price: 180, image: product6Image, category: 'Shoes', stockCount: 40 },
  { id: 7, name: 'iPad Pro 12.9"', price: 1099, image: product7Image, category: 'Electronics', stockCount: 12 },
  { id: 8, name: 'Leather Backpack', price: 89, image: product8Image, category: 'Accessories', stockCount: 100 },
  { id: 9, name: 'Ray-Ban Aviator', price: 154, image: product9Image, category: 'Accessories', stockCount: 45 },
  { id: 10, name: 'Instant Pot Duo', price: 99, image: product10Image, category: 'Home', stockCount: 75 },
  { id: 11, name: 'Yoga Mat Premium', price: 65, image: product11Image, category: 'Sports', stockCount: 30 },
  { id: 12, name: "Levi's 501 Jeans", price: 79, image: product12Image, category: 'Clothing', stockCount: 60 },
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
