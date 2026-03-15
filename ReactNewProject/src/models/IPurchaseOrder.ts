import { IProduct } from "./IProduct";

export interface IPurchaseOrder {
    orderId: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    status: string;
    postalCode: string;
    amount: number;
    Date: Date;
    Products: IProduct[];
}
