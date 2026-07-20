using MalihaPolytex.Application.Features.JobOpenings.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IJobOpeningService
{
    Task<IEnumerable<JobOpeningResponse>> GetAllAsync();

    Task<JobOpeningResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(JobOpeningCreateRequest request);

    Task UpdateAsync(
        int id,
        JobOpeningCreateRequest request);

    Task DeleteAsync(int id);
}