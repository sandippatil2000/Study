using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopAPI.Models;

[Table("Products")]
public class Product
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }


    [MaxLength(200)]
    public string Image { get; set; } = string.Empty;

    // Foreign Key
    [Required]
    public int CategoryId { get; set; }

    // Navigation property
    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }

    [Required]
    public int StockCount { get; set; } = 0;
}
