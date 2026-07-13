namespace MalihaPolytex.Domain.Entities;

public class Certificate
{
    public int CertificateId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Image { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
}