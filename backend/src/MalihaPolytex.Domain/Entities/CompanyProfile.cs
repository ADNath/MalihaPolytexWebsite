namespace MalihaPolytex.Domain.Entities;

public class CompanyProfile
{
    public int CompanyProfileId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string PdfUrl { get; set; } = string.Empty;


    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
}