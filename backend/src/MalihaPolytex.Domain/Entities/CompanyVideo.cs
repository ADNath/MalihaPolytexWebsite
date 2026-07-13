namespace MalihaPolytex.Domain.Entities;

public class CompanyVideo
{
    public int CompanyVideoId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string VideoUrl { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
}