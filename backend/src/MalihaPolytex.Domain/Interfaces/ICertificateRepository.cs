using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface ICertificateRepository
{
    Task<IEnumerable<Certificate>> GetAllAsync();

    Task<Certificate?> GetByIdAsync(int certificateId);

    Task<int> CreateAsync(Certificate certificate);

    Task UpdateAsync(Certificate certificate);

    Task DeleteAsync(int certificateId);
}