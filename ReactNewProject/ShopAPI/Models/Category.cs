using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

namespace ShopAPI.Models;

[Table("Category")]
public class Category
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    // Navigation property
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
