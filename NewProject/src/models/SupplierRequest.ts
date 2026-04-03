export interface ISupplierRequest {
    RequestId: number;
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Description: string;
    Supplier: string;
    Date: Date;
    Status: string;
    SupplierFile?: string | null;   // filename string (from API / mock)
    ProductFiles?: string[];        // filename strings
    FileType?: string;
}
