import { IUser } from '../models/IUser';

let mockUsers: IUser[] = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@email.com', password: 'password123', address: '123 Main St, New York, NY 10001', postalCode: '10001', orders: 12, spent: 1840, status: 'Active', joined: 'Jan 2025', avatar: 'AJ', supplierName: 'Global Tech Supplies' },
  { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@email.com', password: 'password123', address: '456 Market St, San Francisco, CA 94103', postalCode: '94103', orders: 8, spent: 2310, status: 'Active', joined: 'Feb 2025', avatar: 'BS', supplierName: 'NextGen Solutions' },
  { id: 3, firstName: 'Carol', lastName: 'White', email: 'carol@email.com', password: 'password123', address: '789 Broadway, Austin, TX 78701', postalCode: '78701', orders: 5, spent: 780, status: 'Active', joined: 'Mar 2025', avatar: 'CW', supplierName: 'Innovative Corp' },
  { id: 4, firstName: 'David', lastName: 'Lee', email: 'david@email.com', password: 'password123', address: '101 Ocean Ave, Miami, FL 33139', postalCode: '33139', orders: 3, spent: 420, status: 'Inactive', joined: 'Dec 2024', avatar: 'DL', supplierName: 'Quality Goods Ltd' },
  { id: 5, firstName: 'Eva', lastName: 'Brown', email: 'eva@email.com', password: 'password123', address: '202 Lake Shore Dr, Chicago, IL 60611', postalCode: '60611', orders: 20, spent: 5600, status: 'Active', joined: 'Nov 2024', avatar: 'EB', supplierName: 'Premium Sourcing' },
  { id: 6, firstName: 'Frank', lastName: 'Martinez', email: 'frank@email.com', password: 'password123', address: '303 Broad St, Philadelphia, PA 19102', postalCode: '19102', orders: 7, spent: 1200, status: 'Active', joined: 'Oct 2024', avatar: 'FM', supplierName: 'Reliable Vendors' },
  { id: 7, firstName: 'Grace', lastName: 'Kim', email: 'grace@email.com', password: 'password123', address: '404 Pike St, Seattle, WA 98101', postalCode: '98101', orders: 15, spent: 3200, status: 'Active', joined: 'Sep 2024', avatar: 'GK', supplierName: 'Top Tier Imports' },
  { id: 8, firstName: 'Henry', lastName: 'Wilson', email: 'henry@email.com', password: 'password123', address: '505 Peachtree St, Atlanta, GA 30308', postalCode: '30308', orders: 2, spent: 199, status: 'Inactive', joined: 'Aug 2024', avatar: 'HW', supplierName: 'Alpha Wholesale' },
];

export const userapi = {
  authenticate: async (email: string, password: string): Promise<IUser | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user && password === user.password) {
          resolve({ ...user });
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  getuser: async (): Promise<IUser[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 500));
  },

  getUserById: async (id: number): Promise<IUser | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === id);
        resolve(user ? { ...user } : undefined);
      }, 500);
    });
  },

  createUser: async (user: Omit<IUser, 'id'>): Promise<IUser> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: IUser = {
          ...user,
          id: mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }, 500);
    });
  },

  updateUser: async (id: number, updates: Partial<IUser>): Promise<IUser | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex(u => u.id === id);
        if (index > -1) {
          mockUsers[index] = { ...mockUsers[index], ...updates };
          resolve({ ...mockUsers[index] });
        } else {
          resolve(undefined);
        }
      }, 500);
    });
  },

  deleteUser: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockUsers.length;
        mockUsers = mockUsers.filter(u => u.id !== id);
        resolve(mockUsers.length < initialLength);
      }, 500);
    });
  }
};
