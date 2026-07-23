namespace MalihaPolytex.Domain.Entities.Common;

public class PagedRequest
{
    private const int MaxPageSize = 100;

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 25;

    public string? Search { get; set; }

    public string? SortBy { get; set; }

    public string? SortDirection { get; set; } = "desc";

    public int Offset => (Page - 1) * PageSize;

    public void Normalize()
    {
        if (Page < 1)
            Page = 1;

        if (PageSize < 1)
            PageSize = 25;

        if (PageSize > MaxPageSize)
            PageSize = MaxPageSize;

        SortDirection = string.Equals(SortDirection, "asc", StringComparison.OrdinalIgnoreCase)
            ? "asc"
            : "desc";
    }
}