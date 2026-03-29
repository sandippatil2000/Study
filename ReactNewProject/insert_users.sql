USE Shop;
GO

SET IDENTITY_INSERT Users ON;
GO

INSERT INTO Users (Id, FirstName, LastName, Email, Password, Address, PostalCode, Orders, Spent, Status, Joined, Avatar, SupplierName)
VALUES
(1, 'Alice', 'Johnson', 'alice@email.com', 'password123', '123 Main St, New York, NY 10001', '10001', 12, 1840, 'Active', 'Jan 2025', 'AJ', 'Global Tech Supplies'),
(2, 'Bob', 'Smith', 'bob@email.com', 'password123', '456 Market St, San Francisco, CA 94103', '94103', 8, 2310, 'Active', 'Feb 2025', 'BS', 'NextGen Solutions'),
(3, 'Carol', 'White', 'carol@email.com', 'password123', '789 Broadway, Austin, TX 78701', '78701', 5, 780, 'Active', 'Mar 2025', 'CW', 'Innovative Corp'),
(4, 'David', 'Lee', 'david@email.com', 'password123', '101 Ocean Ave, Miami, FL 33139', '33139', 3, 420, 'Inactive', 'Dec 2024', 'DL', 'Quality Goods Ltd'),
(5, 'Eva', 'Brown', 'eva@email.com', 'password123', '202 Lake Shore Dr, Chicago, IL 60611', '60611', 20, 5600, 'Active', 'Nov 2024', 'EB', 'Premium Sourcing'),
(6, 'Frank', 'Martinez', 'frank@email.com', 'password123', '303 Broad St, Philadelphia, PA 19102', '19102', 7, 1200, 'Active', 'Oct 2024', 'FM', 'Reliable Vendors'),
(7, 'Grace', 'Kim', 'grace@email.com', 'password123', '404 Pike St, Seattle, WA 98101', '98101', 15, 3200, 'Active', 'Sep 2024', 'GK', 'Top Tier Imports'),
(8, 'Henry', 'Wilson', 'henry@email.com', 'password123', '505 Peachtree St, Atlanta, GA 30308', '30308', 2, 199, 'Inactive', 'Aug 2024', 'HW', 'Alpha Wholesale');
GO

SET IDENTITY_INSERT Users OFF;
GO
