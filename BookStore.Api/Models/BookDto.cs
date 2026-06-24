using System.ComponentModel.DataAnnotations;

namespace BookStore.Api.Models;

public class BookDto
{
    [Required]
    public string Isbn { get; set; } = string.Empty;

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Category { get; set; } = string.Empty;

    [Required]
    public List<string> Authors { get; set; } = new();

    [Range(1, 3000)]
    public int Year { get; set; }

    [Range(0.01, 999999)]
    public decimal Price { get; set; }
}