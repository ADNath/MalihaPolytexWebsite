using System.ComponentModel.DataAnnotations;

namespace MalihaPolytex.Application.Features.HomepageContact.DTOs;

public class UpdateHomepageContactRequest
{
    [Required]
    public List<string> SalesPhones { get; set; } = [];

    [Required]
    public List<string> BusinessEmails { get; set; } = [];

    public bool IsActive { get; set; } = true;
}