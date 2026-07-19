namespace MalihaPolytex.Domain.Entities;

public class GeneralCertificate
{
    public int GeneralCertificateId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Image { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public string IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? UpdatedBy { get; set; }
}