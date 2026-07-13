namespace MalihaPolytex.Application.Features.Certificates.DTOs;

public class CertificateResponse
{
    public int CertificateId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Image { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}