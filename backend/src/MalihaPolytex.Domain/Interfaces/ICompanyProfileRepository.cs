using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface ICompanyProfileRepository
{
    Task<IEnumerable<CompanyProfile>> GetAllAsync();
    Task<CompanyProfile?> GetByIdAsync(int companyProfileId);
    Task<int> CreateAsync(CompanyProfile companyProfile);
    Task UpdateAsync(CompanyProfile companyProfile);
    Task DeleteAsync(int companyProfileId);
}