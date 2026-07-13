using MalihaPolytex.Application.Features.HomepageContacts.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IHomepageContactService
{
    Task<IEnumerable<HomepageContactResponse>> GetAllAsync();

    Task<HomepageContactResponse?> GetByIdAsync(int homepageContactId);

    Task<int> CreateAsync(HomepageContactRequest request);

    Task UpdateAsync(int homepageContactId, HomepageContactRequest request);

    Task DeleteAsync(int homepageContactId);
}