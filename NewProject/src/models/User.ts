export interface IUser {
    UserId: number,
    FirstName: string,
    LastName: string,
    Supplier: string,
    Email: string,
    Address?: string,
    PostalCode?: string,
    Role: string,
    Status: string,
    Avatar: string
    Approved: string // None, Approved, Rejected

}
