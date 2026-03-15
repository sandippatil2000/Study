import React, { createContext, useContext, useReducer, ReactNode } from 'react';

import { IProduct as Product } from '../models/IProduct';
import { IUser } from '../models/IUser';
export type { Product };

export interface CartItem extends Product {
  quantity: number;
}

interface UserState {
  items: CartItem[];
  isCartOpen: boolean;
  user?: IUser;
}

type UserAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'SET_USER'; payload: IUser | undefined };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.product.id ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload.product, quantity: action.payload.quantity }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'OPEN_CART':
      return { ...state, isCartOpen: true };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setUser: (user: IUser | undefined) => void;
  totalItems: number;
  totalPrice: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { items: [], isCartOpen: false });

  const addItem = (product: Product, quantity: number = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const setUser = (user: IUser | undefined) => dispatch({ type: 'SET_USER', payload: user });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <UserContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart, setUser, totalItems, totalPrice }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};
