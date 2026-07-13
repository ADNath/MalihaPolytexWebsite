namespace MalihaPolytex.Domain.Entities;

public class ManagementMember
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
}