import { IUser } from '../models/IUser';

export const getSessionUser = (): IUser | null => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr) as IUser;
    } catch (e) {
      console.error('Error parsing session user', e);
      return null;
    }
  }
  return null;
};

