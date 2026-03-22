import { IPurchaseOrder } from '../models/IPurchaseOrder';
import { orderStatus } from '../models/mode';

let purchaseOrders: IPurchaseOrder[] = [
  { orderId: 10045, firstName: 'Alice', lastName: 'Johnson', email: 'alice@email.com', address: '123 Main St', postalCode: '10001', amount: 120, status: orderStatus.Submitted, Date: new Date('2026-03-12'), Products: [{ id: 1, name: 'Nike Air Max 90', price: 120, category: 'Shoes', image: '', stockCount: 0 }], supplierName: 'Global Tech Supplies' },
  { orderId: 10044, firstName: 'Bob', lastName: 'Smith', email: 'bob@email.com', address: '456 Oak Ave', postalCode: '10002', amount: 999, status: orderStatus.Processing, Date: new Date('2026-03-12'), Products: [{ id: 2, name: 'Samsung Galaxy S24', price: 999, category: 'Electronics', image: '', stockCount: 0 }], supplierName: 'NextGen Solutions' },
  { orderId: 10043, firstName: 'Carol', lastName: 'White', email: 'carol@email.com', address: '789 Pine Rd', postalCode: '10003', amount: 399, status: orderStatus.Shipped, Date: new Date('2026-03-11'), Products: [{ id: 3, name: 'Apple Watch Series 9', price: 399, category: 'Electronics', image: '', stockCount: 0 }], supplierName: 'Innovative Corp' },
  { orderId: 10042, firstName: 'David', lastName: 'Lee', email: 'david@email.com', address: '321 Elm St', postalCode: '10004', amount: 350, status: orderStatus.Submitted, Date: new Date('2026-03-11'), Products: [{ id: 4, name: 'Sony WH-1000XM5', price: 350, category: 'Electronics', image: '', stockCount: 0 }], supplierName: 'Quality Goods Ltd' },
  { orderId: 10041, firstName: 'Eva', lastName: 'Brown', email: 'eva@email.com', address: '654 Maple Dr', postalCode: '10005', amount: 1299, status: orderStatus.Cancelled, Date: new Date('2026-03-10'), Products: [{ id: 5, name: 'MacBook Air M3', price: 1299, category: 'Electronics', image: '', stockCount: 0 }], supplierName: 'Premium Sourcing' },
  { orderId: 10040, firstName: 'Frank', lastName: 'Martinez', email: 'frank@email.com', address: '987 Cedar Ln', postalCode: '10006', amount: 1199, status: orderStatus.Submitted, Date: new Date('2026-03-10'), Products: [{ id: 6, name: 'iPhone 15 Pro', price: 1199, category: 'Electronics', image: '', stockCount: 0 }], supplierName: 'Reliable Vendors' },
  { orderId: 10039, firstName: 'Grace', lastName: 'Kim', email: 'grace@email.com', address: '147 Birch Blvd', postalCode: '10007', amount: 180, status: orderStatus.Processing, Date: new Date('2026-03-09'), Products: [{ id: 7, name: 'Adidas Ultraboost', price: 90, category: 'Shoes', image: '', stockCount: 0 }, { id: 8, name: 'Adidas Cap', price: 90, category: 'Accessories', image: '', stockCount: 0 }], supplierName: 'Top Tier Imports' },
  { orderId: 10038, firstName: 'Henry', lastName: 'Wilson', email: 'henry@email.com', address: '258 Spruce Way', postalCode: '10008', amount: 1099, status: orderStatus.Shipped, Date: new Date('2026-03-09'), Products: [{ id: 9, name: 'iPad Pro', price: 1099, category: 'Electronics', image: '', stockCount: 0 }], supplierName: 'Alpha Wholesale' },
  { orderId: 10037, firstName: 'Iris', lastName: 'Taylor', email: 'iris@email.com', address: '369 Walnut Ct', postalCode: '10009', amount: 89, status: orderStatus.Submitted, Date: new Date('2026-03-08'), Products: [{ id: 10, name: 'Leather Backpack', price: 89, category: 'Bags', image: '', stockCount: 0 }], supplierName: 'Global Tech Supplies' },
  { orderId: 10036, firstName: 'Jack', lastName: 'Davis', email: 'jack@email.com', address: '741 Ash Ave', postalCode: '10010', amount: 154, status: orderStatus.Submitted, Date: new Date('2026-03-08'), Products: [{ id: 11, name: 'Ray-Ban Aviator', price: 154, category: 'Accessories', image: '', stockCount: 0 }], supplierName: 'NextGen Solutions' },
  { orderId: 10035, firstName: 'Kate', lastName: 'Johnson', email: 'kate@email.com', address: '852 Willow Pl', postalCode: '10011', amount: 65, status: orderStatus.Processing, Date: new Date('2026-03-07'), Products: [{ id: 12, name: 'Yoga Mat Premium', price: 22, category: 'Fitness', image: '', stockCount: 0 }, { id: 13, name: 'Resistance Band', price: 22, category: 'Fitness', image: '', stockCount: 0 }, { id: 14, name: 'Water Bottle', price: 21, category: 'Fitness', image: '', stockCount: 0 }], supplierName: 'Innovative Corp' },
  { orderId: 10034, firstName: 'Leo', lastName: 'Adams', email: 'leo@email.com', address: '963 Poplar St', postalCode: '10012', amount: 79, status: orderStatus.Cancelled, Date: new Date('2026-03-07'), Products: [{ id: 15, name: "Levi's 501 Jeans", price: 79, category: 'Clothing', image: '', stockCount: 0 }], supplierName: 'Quality Goods Ltd' },
];

export const purchaseorderapi = {
  getPurchaseOrders: async (): Promise<IPurchaseOrder[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...purchaseOrders]), 500));
  },

  getPurchaseOrderById: async (id: number): Promise<IPurchaseOrder | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = purchaseOrders.find(o => o.orderId === id);
        resolve(order ? { ...order } : undefined);
      }, 500);
    });
  },

  createPurchaseOrder: async (order: Omit<IPurchaseOrder, 'orderId'>): Promise<IPurchaseOrder> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: IPurchaseOrder = {
          ...order,
          orderId: purchaseOrders.length > 0 ? Math.max(...purchaseOrders.map(o => o.orderId)) + 1 : 10000
        };
        purchaseOrders.push(newOrder);
        resolve({ ...newOrder });
      }, 500);
    });
  },

  updatePurchaseOrder: async (id: number, updates: Partial<IPurchaseOrder>): Promise<IPurchaseOrder | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = purchaseOrders.findIndex(o => o.orderId === id);
        if (index > -1) {
          purchaseOrders[index] = { ...purchaseOrders[index], ...updates };
          resolve({ ...purchaseOrders[index] });
        } else {
          resolve(undefined);
        }
      }, 500);
    });
  },

  deletePurchaseOrder: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = purchaseOrders.length;
        purchaseOrders = purchaseOrders.filter(o => o.orderId !== id);
        resolve(purchaseOrders.length < initialLength);
      }, 500);
    });
  }
};
