using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IHomepageContactRepository
{
    Task<IEnumerable<HomepageContact>> GetAllAsync();

    Task<HomepageContact?> GetByIdAsync(int homepageContactId);

    Task<int> CreateAsync(HomepageContact homepageContact);

    Task UpdateAsync(HomepageContact homepageContact);

    Task DeleteAsync(int homepageContactId);
}