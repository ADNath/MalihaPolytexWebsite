namespace MalihaPolytex.Application.Features.WhatWeDoItems.DTOs;

public class WhatWeDoItemResponse
{
    public int WhatWeDoItemId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}