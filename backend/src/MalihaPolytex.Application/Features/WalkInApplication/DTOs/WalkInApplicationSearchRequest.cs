using MalihaPolytex.Application.Common.Pagination;

namespace MalihaPolytex.Application.WalkInApplications.Models;

public class WalkInApplicationSearchRequest : PagedRequest
{
    public string? Designation { get; set; }

    public int? MinExperience { get; set; }

    public int? MaxExperience { get; set; }

    public byte? StatusId { get; set; }
}