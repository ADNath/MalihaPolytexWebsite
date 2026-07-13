using MalihaPolytex.Application.Features.CompanyVideos.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface ICompanyVideoService
{
    Task<IEnumerable<CompanyVideoResponse>> GetAllAsync();

    Task<CompanyVideoResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(CompanyVideoRequest request);

    Task UpdateAsync(int id, CompanyVideoRequest request);

    Task DeleteAsync(int id);
}