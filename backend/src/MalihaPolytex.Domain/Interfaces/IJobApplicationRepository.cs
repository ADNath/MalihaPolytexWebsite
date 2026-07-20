using MalihaPolytex.Domain.Entities;

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
}