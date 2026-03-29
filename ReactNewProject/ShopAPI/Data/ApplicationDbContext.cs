using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

namespace ShopAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, FirstName = "Alice", LastName = "Johnson", Email = "alice@email.com", Password = "password123", Address = "123 Main St, New York, NY 10001", PostalCode = "10001", Orders = 12, Spent = 1840m, Status = "Active", Joined = "Jan 2025", Avatar = "AJ", SupplierName = "Global Tech Supplies" },
            new User { Id = 2, FirstName = "Bob", LastName = "Smith", Email = "bob@email.com", Password = "password123", Address = "456 Market St, San Francisco, CA 94103", PostalCode = "94103", Orders = 8, Spent = 2310m, Status = "Active", Joined = "Feb 2025", Avatar = "BS", SupplierName = "NextGen Solutions" },
            new User { Id = 3, FirstName = "Carol", LastName = "White", Email = "carol@email.com", Password = "password123", Address = "789 Broadway, Austin, TX 78701", PostalCode = "78701", Orders = 5, Spent = 780m, Status = "Active", Joined = "Mar 2025", Avatar = "CW", SupplierName = "Innovative Corp" },
            new User { Id = 4, FirstName = "David", LastName = "Lee", Email = "david@email.com", Password = "password123", Address = "101 Ocean Ave, Miami, FL 33139", PostalCode = "33139", Orders = 3, Spent = 420m, Status = "Inactive", Joined = "Dec 2024", Avatar = "DL", SupplierName = "Quality Goods Ltd" },
            new User { Id = 5, FirstName = "Eva", LastName = "Brown", Email = "eva@email.com", Password = "password123", Address = "202 Lake Shore Dr, Chicago, IL 60611", PostalCode = "60611", Orders = 20, Spent = 5600m, Status = "Active", Joined = "Nov 2024", Avatar = "EB", SupplierName = "Premium Sourcing" },
            new User { Id = 6, FirstName = "Frank", LastName = "Martinez", Email = "frank@email.com", Password = "password123", Address = "303 Broad St, Philadelphia, PA 19102", PostalCode = "19102", Orders = 7, Spent = 1200m, Status = "Active", Joined = "Oct 2024", Avatar = "FM", SupplierName = "Reliable Vendors" },
            new User { Id = 7, FirstName = "Grace", LastName = "Kim", Email = "grace@email.com", Password = "password123", Address = "404 Pike St, Seattle, WA 98101", PostalCode = "98101", Orders = 15, Spent = 3200m, Status = "Active", Joined = "Sep 2024", Avatar = "GK", SupplierName = "Top Tier Imports" },
            new User { Id = 8, FirstName = "Henry", LastName = "Wilson", Email = "henry@email.com", Password = "password123", Address = "505 Peachtree St, Atlanta, GA 30308", PostalCode = "30308", Orders = 2, Spent = 199m, Status = "Inactive", Joined = "Aug 2024", Avatar = "HW", SupplierName = "Alpha Wholesale" }
        );
    }
}
