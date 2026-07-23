using MalihaPolytex.Application.Common.Pagination;
using MalihaPolytex.Application.Features.WalkInApplications.DTOs;
using MalihaPolytex.Application.Features.WalkInApplications.Interfaces;
using MalihaPolytex.Application.WalkInApplications.Models;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.WalkInApplications.Services;

public class WalkInApplicationService : IWalkInApplicationService
{
    private readonly IWalkInApplicationRepository _walkInApplicationRepository;

    public WalkInApplicationService(
        IWalkInApplicationRepository walkInApplicationRepository)
    {
        _walkInApplicationRepository = walkInApplicationRepository;
    }

    public async Task<IEnumerable<WalkInApplicationResponse>> GetAllAsync()
    {
        var applications =
            await _walkInApplicationRepository.GetAllAsync();

        return applications.Select(MapToResponse);
    }

    public async Task<WalkInApplicationResponse?> GetByIdAsync(int id)
    {
        var application =
            await _walkInApplicationRepository.GetByIdAsync(id);

        return application is null
            ? null
            : MapToResponse(application);
    }

    public async Task<int> CreateAsync(
        WalkInApplicationCreateRequest request)
    {
        var entity = new Domain.Entities.WalkInApplication
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            Address = request.Address,
            HighestEducation = request.HighestEducation,
            YearsOfExperience = request.YearsOfExperience,
            CurrentCompany = request.CurrentCompany,
            CurrentDesignation = request.CurrentDesignation,
            ExpectedSalary = request.ExpectedSalary,
            CoverLetter = request.CoverLetter,
            ResumeFile = request.ResumeFile,
            StatusId = 1,
            CreatedBy = "Website"
        };

        return await _walkInApplicationRepository.CreateAsync(entity);
    }

    public async Task UpdateStatusAsync(
        int walkInApplicationId,
        WalkInApplicationStatusUpdateRequest request)
    {
        await _walkInApplicationRepository.UpdateStatusAsync(
            walkInApplicationId,
            request.StatusId,
            request.Remarks,
            "Admin");
    }

    public async Task DeleteAsync(int id)
    {
        await _walkInApplicationRepository.DeleteAsync(id);
    }

    public async Task<PagedResult<WalkInApplicationResponse>> SearchAsync(
        WalkInApplicationSearchRequest request)
    {
        var searchRequest = new Domain.Entities.WalkInApplicationSearchRequest
        {
            Page = request.Page,
            PageSize = request.PageSize,
            Search = request.Search,
            SortBy = request.SortBy,
            SortDirection = request.SortDirection,
            Designation = request.Designation,
            MinExperience = request.MinExperience,
            MaxExperience = request.MaxExperience,
            StatusId = request.StatusId
        };

        var result =
            await _walkInApplicationRepository.SearchAsync(searchRequest);

        return new PagedResult<WalkInApplicationResponse>
        {
            Items = result.Items
                .Select(MapToResponse)
                .ToList(),

            Page = result.Page,

            PageSize = result.PageSize,

            TotalCount = result.TotalCount
        };
    }

    public async Task<IEnumerable<string>> GetDesignationsAsync()
    {
        return await _walkInApplicationRepository
            .GetDesignationsAsync();
    }

    public async Task<Stream> DownloadResumesAsync(
        IEnumerable<int> walkInApplicationIds)
    {
        return await _walkInApplicationRepository
            .DownloadResumesAsync(walkInApplicationIds);
    }
    private static WalkInApplicationResponse MapToResponse(
    Domain.Entities.WalkInApplication entity)
    {
        return new WalkInApplicationResponse
        {
            WalkInApplicationId = entity.WalkInApplicationId,
            FullName = entity.FullName,
            Email = entity.Email,
            Phone = entity.Phone,
            Address = entity.Address,
            HighestEducation = entity.HighestEducation,
            YearsOfExperience = entity.YearsOfExperience,
            CurrentCompany = entity.CurrentCompany,
            CurrentDesignation = entity.CurrentDesignation,
            ExpectedSalary = entity.ExpectedSalary,
            CoverLetter = entity.CoverLetter,
            ResumeFile = entity.ResumeFile,
            StatusId = entity.StatusId,
            StatusName = entity.StatusName,
            Remarks = entity.Remarks,
            AppliedDate = entity.AppliedDate,
            CreatedDate = entity.CreatedDate,
            CreatedBy = entity.CreatedBy,
            ModifiedDate = entity.ModifiedDate,
            ModifiedBy = entity.ModifiedBy
        };
    }
}