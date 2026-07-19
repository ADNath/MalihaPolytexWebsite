namespace MalihaPolytex.Application.Features.HomepageContacts.DTOs;

public class HomepageContactResponse
{
    public int HomepageContactId { get; set; }

    public string Title { get; set; } = string.Empty;

    public List<string> Phones { get; set; } = [];

    public List<string> Emails { get; set; } = [];

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
    public string Address { get; set; } = string.Empty;

    public string? MapUrl { get; set; }

    public string? OfficeHours { get; set; }
}