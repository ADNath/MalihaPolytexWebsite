using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IManagementMemberRepository
{
    Task<IEnumerable<ManagementMember>> GetAllAsync();

    Task<ManagementMember?> GetByIdAsync(int managementMemberId);

    Task<int> CreateAsync(ManagementMember managementMember);

    Task UpdateAsync(ManagementMember managementMember);

    Task DeleteAsync(int managementMemberId);
}