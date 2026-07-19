namespace MalihaPolyTex.Api.Models.ContactInquiry;

public class ContactInquiryResponse
{
    public int InquiryId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Company { get; set; }

    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    public string? Subject { get; set; }

    public string Message { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}