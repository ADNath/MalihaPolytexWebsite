using Microsoft.AspNetCore.Http;

namespace MalihaPolytex.Application.DTOs.GeneralCertificates;

public class CreateGeneralCertificateRequest
{
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? Image { get; set; }

    public int DisplayOrder { get; set; }

    public string IsActive { get; set; }

    public string? CreatedBy { get; set; }
}