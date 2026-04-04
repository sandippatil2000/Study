import { Role } from '../models/Role';
import type { IUser } from '../models/User';

let mockUsers: IUser[] = [
    { UserId: 1, FirstName: 'Alice', LastName: 'Johnson', Supplier: 'Supplier A', Email: 'alice@example.com', Role: Role.Admin, Status: 'Active', Avatar: 'AJ', Approved: 'Approved' },
    { UserId: 2, FirstName: 'Bob', LastName: 'Smith', Supplier: 'Supplier B', Email: 'bob@example.com', Role: Role.Requester, Status: 'Active', Avatar: 'BS', Approved: 'Approved' },
    { UserId: 3, FirstName: 'Carol', LastName: 'White', Supplier: 'Supplier C', Email: 'carol@example.com', Role: Role.Requester, Status: 'Inactive', Avatar: 'CW', Approved: 'Approved' },
    { UserId: 4, FirstName: 'David', LastName: 'Lee', Supplier: 'Supplier D', Email: 'david@example.com', Role: Role.MDTeam, Status: 'Active', Avatar: 'DL', Approved: 'Approved' },
    { UserId: 5, FirstName: 'Eva', LastName: 'Brown', Supplier: 'Supplier E', Email: 'eva@example.com', Role: Role.Supplier, Status: 'Pending', Avatar: 'EB', Approved: 'Rejected' },
];

export const userApi = {
    // Authenticate user
    Authenticate: async (email: string, password?: string): Promise<IUser> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockUsers.find(u => u.Email === email && password);
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 500);
        });
    },

    // Get all users
    GetUsers: async (): Promise<IUser[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 500));
    },

    // Get user by ID
    GetUserById: async (id: number): Promise<IUser | undefined> => {
        return new Promise((resolve) => setTimeout(() => resolve(mockUsers.find(u => u.UserId === id)), 500));
    },
    // Create new user
    CreateUser: async (user: Omit<IUser, 'UserId'>): Promise<IUser> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser: IUser = {
                    ...user,
                    UserId: mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.UserId)) + 1 : 1
                };
                mockUsers.push(newUser);
                resolve(newUser);
            }, 500);
        });
    },

    // Update existing user
    UpdateUser: async (id: number, updatedData: Partial<IUser>): Promise<IUser> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockUsers.findIndex(u => u.UserId === id);
                if (index === -1) {
                    reject(new Error('User not found'));
                    return;
                }
                mockUsers[index] = { ...mockUsers[index], ...updatedData };
                resolve(mockUsers[index]);
            }, 500);
        });
    },

    // Delete user
    DeleteUser: async (id: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockUsers.findIndex(u => u.UserId === id);
                if (index === -1) {
                    reject(new Error('User not found'));
                    return;
                }
                mockUsers = mockUsers.filter(u => u.UserId !== id);
                resolve();
            }, 500);
        });
    }
};
