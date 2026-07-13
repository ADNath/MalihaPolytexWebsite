namespace MalihaPolytex.Application.Features.CompanyVideos.DTOs;

public class CompanyVideoResponse
{
    public int CompanyVideoId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string VideoUrl { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}