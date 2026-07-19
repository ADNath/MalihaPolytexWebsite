namespace MalihaPolytex.Application.Features.Products.DTOs;

public class ProductUpdateRequest
{
    public int ProductId { get; set; }

    public string Category { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Image { get; set; }

    public string? Denier { get; set; }

    public string? CuttingLength { get; set; }

    public string? Color { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}