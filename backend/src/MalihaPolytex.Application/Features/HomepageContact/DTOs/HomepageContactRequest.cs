using System.ComponentModel.DataAnnotations;

namespace MalihaPolytex.Application.Features.HomepageContacts.DTOs;

public class HomepageContactRequest
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public List<string> Phones { get; set; } = [];

    [Required]
    public List<string> Emails { get; set; } = [];

    [Range(0, int.MaxValue)]
    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;
}