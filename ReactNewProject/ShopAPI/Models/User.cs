namespace ShopAPI.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Password { get; set; }
    public string Address { get; set; } = string.Empty;
    public int Orders { get; set; }
    public decimal Spent { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Joined { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string? SupplierName { get; set; }
}
