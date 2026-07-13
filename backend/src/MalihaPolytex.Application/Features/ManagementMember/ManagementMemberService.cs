using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.CompanyVideos.DTOs;
using MalihaPolytex.Application.Features.ManagementMembers.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.ManagementMembers;

public class ManagementMemberService : IManagementMemberService
{
    private readonly IManagementMemberRepository _managementMemberRepository;

    public ManagementMemberService(
        IManagementMemberRepository managementMemberRepository)
    {
        _managementMemberRepository = managementMemberRepository;
    }

    public async Task<IEnumerable<ManagementMemberResponse>> GetAllAsync()
    {
        var members = await _managementMemberRepository.GetAllAsync();

        return members.Select(x => new ManagementMemberResponse
        {
            Id = x.Id,
            Name = x.Name,
            Designation = x.Designation,
            ImageUrl = x.ImageUrl,
            Message = x.Message,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<ManagementMemberResponse?> GetByIdAsync(int id)
    {
        var member = await _managementMemberRepository.GetByIdAsync(id);

        if (member is null)
            return null;

        return new ManagementMemberResponse
        {
            Id = member.Id,
            Name = member.Name,
            Designation = member.Designation,
            ImageUrl = member.ImageUrl,
            Message = member.Message,
            DisplayOrder = member.DisplayOrder,
            IsActive = member.IsActive
        };
    }

    public async Task<int> CreateAsync(ManagementMemberRequest request)
    {
        var member = new ManagementMember
        {
            Name = request.Name,
            Designation = request.Designation,
            ImageUrl = request.ImageUrl,
            Message = request.Message,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _managementMemberRepository.CreateAsync(member);
    }

    public async Task UpdateAsync(int id, ManagementMemberRequest request)
    {
        var member = new ManagementMember
        {
            Id = id,
            Name = request.Name,
            Designation = request.Designation,
            ImageUrl = request.ImageUrl,
            Message = request.Message,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _managementMemberRepository.UpdateAsync(member);
    }

    public async Task DeleteAsync(int id)
    {
        await _managementMemberRepository.DeleteAsync(id);
    }
}