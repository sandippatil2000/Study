import { IUser } from '../models/IUser';

// let mockUsers: IUser[] = [
//   { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@email.com', password: 'password123', address: '123 Main St, New York, NY 10001', postalCode: '10001', orders: 12, spent: 1840, status: 'Active', joined: 'Jan 2025', avatar: 'AJ', supplierName: 'Global Tech Supplies' },
//   { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@email.com', password: 'password123', address: '456 Market St, San Francisco, CA 94103', postalCode: '94103', orders: 8, spent: 2310, status: 'Active', joined: 'Feb 2025', avatar: 'BS', supplierName: 'NextGen Solutions' },
//   { id: 3, firstName: 'Carol', lastName: 'White', email: 'carol@email.com', password: 'password123', address: '789 Broadway, Austin, TX 78701', postalCode: '78701', orders: 5, spent: 780, status: 'Active', joined: 'Mar 2025', avatar: 'CW', supplierName: 'Innovative Corp' },
//   { id: 4, firstName: 'David', lastName: 'Lee', email: 'david@email.com', password: 'password123', address: '101 Ocean Ave, Miami, FL 33139', postalCode: '33139', orders: 3, spent: 420, status: 'Inactive', joined: 'Dec 2024', avatar: 'DL', supplierName: 'Quality Goods Ltd' },
//   { id: 5, firstName: 'Eva', lastName: 'Brown', email: 'eva@email.com', password: 'password123', address: '202 Lake Shore Dr, Chicago, IL 60611', postalCode: '60611', orders: 20, spent: 5600, status: 'Active', joined: 'Nov 2024', avatar: 'EB', supplierName: 'Premium Sourcing' },
//   { id: 6, firstName: 'Frank', lastName: 'Martinez', email: 'frank@email.com', password: 'password123', address: '303 Broad St, Philadelphia, PA 19102', postalCode: '19102', orders: 7, spent: 1200, status: 'Active', joined: 'Oct 2024', avatar: 'FM', supplierName: 'Reliable Vendors' },
//   { id: 7, firstName: 'Grace', lastName: 'Kim', email: 'grace@email.com', password: 'password123', address: '404 Pike St, Seattle, WA 98101', postalCode: '98101', orders: 15, spent: 3200, status: 'Active', joined: 'Sep 2024', avatar: 'GK', supplierName: 'Top Tier Imports' },
//   { id: 8, firstName: 'Henry', lastName: 'Wilson', email: 'henry@email.com', password: 'password123', address: '505 Peachtree St, Atlanta, GA 30308', postalCode: '30308', orders: 2, spent: 199, status: 'Inactive', joined: 'Aug 2024', avatar: 'HW', supplierName: 'Alpha Wholesale' },
// ];

const API_BASE_URL = 'https://localhost:7003/api/Users';

export const userapi = {
  authenticate: async (email: string, password: string): Promise<IUser | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  },

  getuser: async (): Promise<IUser[]> => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Fetch users error:', error);
      return [];
    }
  },

  getUserById: async (id: number): Promise<IUser | undefined> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) return undefined;
      return await response.json();
    } catch (error) {
      console.error(`Fetch user by id ${id} error:`, error);
      return undefined;
    }
  },

  createUser: async (user: Omit<IUser, 'id'>): Promise<IUser> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }
    return await response.json();
  },

  updateUser: async (id: number, updates: Partial<IUser>): Promise<IUser | undefined> => {
    try {
      // First get existing user because PUT replaces entire user object
      const getResponse = await fetch(`${API_BASE_URL}/${id}`);
      if (!getResponse.ok) return undefined;
      const existingUser = await getResponse.json();

      const updatedUser = { ...existingUser, ...updates };

      const putResponse = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      
      if (!putResponse.ok) return undefined;
      return await putResponse.json();
    } catch (error) {
      console.error(`Update user ${id} error:`, error);
      return undefined;
    }
  },

  deleteUser: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error(`Delete user ${id} error:`, error);
      return false;
    }
  },

  activateUser: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/activate`, {
        method: 'PATCH'
      });
      return response.ok;
    } catch (error) {
      console.error(`Activate user ${id} error:`, error);
      return false;
    }
  },

  deactivateUser: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/deactivate`, {
        method: 'PATCH'
      });
      return response.ok;
    } catch (error) {
      console.error(`Deactivate user ${id} error:`, error);
      return false;
    }
  }
};
