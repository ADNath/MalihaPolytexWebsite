namespace MalihaPolytex.Domain.Entities;

public class JobApplicationSearchRequest
{
    public string? Search { get; set; }

    public int? JobId { get; set; }

    public byte? StatusId { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}