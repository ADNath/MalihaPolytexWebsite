using System.ComponentModel.DataAnnotations;

namespace MalihaPolyTex.Api.Models.ContactInquiry;

public class ContactInquiryRequest
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(150)]
    public string? Company { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(200)]
    public string? Subject { get; set; }

    [Required]
    public string Message { get; set; } = string.Empty;
}