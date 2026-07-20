namespace MalihaPolytex.Application.Features.JobApplications.DTOs;

public class JobApplicationStatusUpdateRequest
{
    public byte StatusId { get; set; }

    public string? Remarks { get; set; }
}