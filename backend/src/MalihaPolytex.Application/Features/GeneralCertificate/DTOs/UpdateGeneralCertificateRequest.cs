using Microsoft.AspNetCore.Http;

namespace MalihaPolytex.Application.DTOs.GeneralCertificates;

public class UpdateGeneralCertificateRequest
{
    public int GeneralCertificateId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? Image { get; set; }

    public string? ExistingImage { get; set; }

    public int DisplayOrder { get; set; }

    public string IsActive { get; set; }

    public string? UpdatedBy { get; set; }
    public string Address { get; set; } = string.Empty;

    public string? MapUrl { get; set; }

    public string? OfficeHours { get; set; }
}