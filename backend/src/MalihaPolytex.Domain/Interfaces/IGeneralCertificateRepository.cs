using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IGeneralCertificateRepository
{
    Task<IEnumerable<GeneralCertificate>> GetAllAsync();

    Task<GeneralCertificate?> GetByIdAsync(int generalCertificateId);

    Task<int> CreateAsync(GeneralCertificate generalCertificate);

    Task UpdateAsync(GeneralCertificate generalCertificate);

    Task DeleteAsync(int generalCertificateId);
}