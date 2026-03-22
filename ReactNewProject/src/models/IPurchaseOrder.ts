import { IProduct } from "./IProduct";
import { orderStatus } from "./mode";

export interface IPurchaseOrder {
    orderId: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    status: orderStatus;
    postalCode: string;
    amount: number;
    Date: Date;
    Products: IProduct[];
    supplierName?: string;
}
