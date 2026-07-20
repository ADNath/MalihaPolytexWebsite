using MalihaPolytex.Application.Features.JobApplications.DTOs;

namespace MalihaPolytex.Application.Features.JobApplications.Interfaces;

public interface IJobApplicationService
{
    Task<IEnumerable<JobApplicationResponse>> GetAllAsync();

    Task<JobApplicationResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(JobApplicationCreateRequest request);

    Task UpdateStatusAsync(
        int jobApplicationId,
        JobApplicationStatusUpdateRequest request);

    Task DeleteAsync(int id);
}