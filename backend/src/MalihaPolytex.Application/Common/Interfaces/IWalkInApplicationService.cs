using MalihaPolytex.Application.Common.Pagination;
using MalihaPolytex.Application.Features.WalkInApplications.DTOs;
using MalihaPolytex.Application.WalkInApplications.Models;

namespace MalihaPolytex.Application.Features.WalkInApplications.Interfaces;

public interface IWalkInApplicationService
{
    Task<IEnumerable<WalkInApplicationResponse>> GetAllAsync();

    Task<WalkInApplicationResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(
        WalkInApplicationCreateRequest request);

    Task UpdateStatusAsync(
        int walkInApplicationId,
        WalkInApplicationStatusUpdateRequest request);

    Task DeleteAsync(int id);

    Task<PagedResult<WalkInApplicationResponse>> SearchAsync(
        WalkInApplicationSearchRequest request);

    Task<IEnumerable<string>> GetDesignationsAsync();

    Task<Stream> DownloadResumesAsync(
        IEnumerable<int> walkInApplicationIds);
}