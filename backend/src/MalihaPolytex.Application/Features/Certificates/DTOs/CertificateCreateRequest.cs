namespace MalihaPolytex.Application.Features.Certificates.DTOs;

public class CertificateCreateRequest
{
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Image { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}