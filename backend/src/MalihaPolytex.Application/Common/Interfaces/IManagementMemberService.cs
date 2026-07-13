using MalihaPolytex.Application.Features.ManagementMembers.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IManagementMemberService
{
    Task<IEnumerable<ManagementMemberResponse>> GetAllAsync();

    Task<ManagementMemberResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(ManagementMemberRequest request);

    Task UpdateAsync(int id, ManagementMemberRequest request);

    Task DeleteAsync(int id);
}