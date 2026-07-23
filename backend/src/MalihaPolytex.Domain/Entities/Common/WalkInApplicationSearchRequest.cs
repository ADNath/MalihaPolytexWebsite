using MalihaPolytex.Domain.Entities.Common;

namespace MalihaPolytex.Domain.Entities;

public class WalkInApplicationSearchRequest : PagedRequest
{
    public string? Designation { get; set; }

    public int? MinExperience { get; set; }

    public int? MaxExperience { get; set; }

    public byte? StatusId { get; set; }
}