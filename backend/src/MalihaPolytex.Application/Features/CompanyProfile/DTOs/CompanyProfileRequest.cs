namespace MalihaPolytex.Application.Features.CompanyProfiles.DTOs;

public class CompanyProfileRequest
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string PdfUrl { get; set; } = string.Empty;


    public bool IsActive { get; set; }
}