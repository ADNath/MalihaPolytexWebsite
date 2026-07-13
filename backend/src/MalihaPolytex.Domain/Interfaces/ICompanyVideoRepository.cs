using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface ICompanyVideoRepository
{
    Task<IEnumerable<CompanyVideo>> GetAllAsync();

    Task<CompanyVideo?> GetByIdAsync(int companyVideoId);

    Task<int> CreateAsync(CompanyVideo companyVideo);

    Task UpdateAsync(CompanyVideo companyVideo);

    Task DeleteAsync(int companyVideoId);
}