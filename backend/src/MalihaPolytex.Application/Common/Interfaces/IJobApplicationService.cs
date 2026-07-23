using MalihaPolytex.Application.Common.Pagination;
using MalihaPolytex.Application.Features.JobApplications.DTOs;

namespace MalihaPolytex.Application.Features.JobApplications.Interfaces;

public interface IJobApplicationService
{
    Task<IEnumerable<JobApplicationResponse>> GetAllAsync();

    Task<JobApplicationResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(JobApplicationCreateRequest request);

    Task UpdateStatusAsync(
        int jobApplicationId,
        JobApplicationStatusUpdateRequest request,
        string? modifiedBy);

    Task DeleteAsync(int id);

    Task<PagedResult<JobApplicationResponse>> SearchAsync(
        JobApplicationSearchRequestDto request);

    Task<IEnumerable<string>> GetJobTitlesAsync();

    Task<MemoryStream> DownloadResumesAsync(
        IEnumerable<int> jobApplicationIds);
}