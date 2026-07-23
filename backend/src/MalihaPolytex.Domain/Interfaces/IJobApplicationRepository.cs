using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Entities.Common;

namespace MalihaPolytex.Domain.Interfaces;

public interface IJobApplicationRepository
{
    Task<IEnumerable<JobApplication>> GetAllAsync();

    Task<JobApplication?> GetByIdAsync(int id);

    Task<int> CreateAsync(JobApplication jobApplication);

    Task UpdateStatusAsync(
        int jobApplicationId,
        byte statusId,
        string? remarks,
        string? modifiedBy);

    Task DeleteAsync(int id);

    Task<PagedResult<JobApplication>> SearchAsync(
        JobApplicationSearchRequest request);

    Task<IEnumerable<string>> GetJobTitlesAsync();

    Task<MemoryStream> DownloadResumesAsync(
        IEnumerable<int> jobApplicationIds);
}