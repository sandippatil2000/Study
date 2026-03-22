export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  address: string;
  orders: number;
  spent: number;
  status: string;
  joined: string;
  avatar: string;
  postalCode: string;
  supplierName?: string;
}
