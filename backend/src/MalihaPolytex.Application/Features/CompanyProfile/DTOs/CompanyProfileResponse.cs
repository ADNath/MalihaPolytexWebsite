namespace MalihaPolytex.Application.Features.CompanyProfiles.DTOs;

public class CompanyProfileResponse
{
    public int CompanyProfileId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string PdfUrl { get; set; } = string.Empty;

    public DateTime UpdatedAt { get; set; }

    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}