namespace MalihaPolytex.Application.Features.HeroSlides.DTOs;

public class HeroSlideResponse
{
    public int HeroSlideId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Subtitle { get; set; }

    public string? Description { get; set; }

    public string? ButtonText { get; set; }

    public string? ButtonUrl { get; set; }

    public string DesktopImage { get; set; } = string.Empty;

    public string? MobileImage { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}