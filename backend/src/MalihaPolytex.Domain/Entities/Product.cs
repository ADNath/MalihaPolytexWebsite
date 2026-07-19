namespace MalihaPolytex.Domain.Entities;

public class Product
{
    public int ProductId { get; set; }

    public string Category { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Image { get; set; } = string.Empty;

    public string? Denier { get; set; }

    public string? CuttingLength { get; set; }

    public string? Color { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
}