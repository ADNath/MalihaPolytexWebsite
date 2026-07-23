using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Entities.Common;

public interface IWalkInApplicationRepository
{
    Task<IEnumerable<WalkInApplication>> GetAllAsync();

    Task<WalkInApplication?> GetByIdAsync(int id);

    Task<int> CreateAsync(WalkInApplication walkInApplication);

    Task UpdateStatusAsync(
        int walkInApplicationId,
        byte statusId,
        string? remarks,
        string? modifiedBy);

    Task DeleteAsync(int id);

    Task<PagedResult<WalkInApplication>> SearchAsync(
        WalkInApplicationSearchRequest request);

    Task<IEnumerable<string>> GetDesignationsAsync();

    Task<MemoryStream> DownloadResumesAsync(
        IEnumerable<int> walkInApplicationIds);
}