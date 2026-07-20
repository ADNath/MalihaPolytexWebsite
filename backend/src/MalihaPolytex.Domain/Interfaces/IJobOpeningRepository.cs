using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IJobOpeningRepository
{
    Task<IEnumerable<JobOpening>> GetAllAsync();

    Task<JobOpening?> GetByIdAsync(int id);

    Task<int> CreateAsync(JobOpening jobOpening);

    Task UpdateAsync(JobOpening jobOpening);

    Task DeleteAsync(int id);
}