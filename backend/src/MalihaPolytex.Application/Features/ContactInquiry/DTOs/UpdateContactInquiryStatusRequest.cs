using System.ComponentModel.DataAnnotations;

namespace MalihaPolyTex.Api.Models.ContactInquiry;

public class UpdateContactInquiryStatusRequest
{
    [Required]
    [MaxLength(20)]
    public string Status { get; set; } = string.Empty;
}