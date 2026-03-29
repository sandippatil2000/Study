import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType, LoginCredentials } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (credentials: LoginCredentials): Promise<void> => {
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));
    if (credentials.email && credentials.password) {
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email: credentials.email,
        role: 'Administrator',
        avatar: '',
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const loginWithSSO = async (provider: string): Promise<void> => {
    await new Promise((res) => setTimeout(res, 1200));
    const mockUser: User = {
      id: '2',
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      role: 'Administrator',
      avatar: '',
    };
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginWithSSO, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
