namespace MalihaPolytex.Domain.Entities;

public class HomepageContact
{
    public int HomepageContactId { get; set; }

    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// JSON array of phone numbers.
    /// </summary>
    public string Phones { get; set; } = "[]";

    /// <summary>
    /// JSON array of email addresses.
    /// </summary>
    public string Emails { get; set; } = "[]";

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }
    public string Address { get; set; } = string.Empty;

    public string? MapUrl { get; set; }

    public string? OfficeHours { get; set; }
}