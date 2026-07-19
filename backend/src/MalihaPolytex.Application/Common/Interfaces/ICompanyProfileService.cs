using MalihaPolytex.Application.Features.CompanyProfiles.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface ICompanyProfileService
{
    Task<IEnumerable<CompanyProfileResponse>> GetAllAsync();
    Task<CompanyProfileResponse?> GetByIdAsync(int companyProfileId);
    Task<int> CreateAsync(CompanyProfileRequest request);
    Task UpdateAsync(int companyProfileId, CompanyProfileRequest request);
    Task DeleteAsync(int companyProfileId);
}