namespace MalihaPolytex.Application.Features.ManagementMembers.DTOs;

public class ManagementMemberRequest
{
    public string Name { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}