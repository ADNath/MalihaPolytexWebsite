using MalihaPolytex.Application.Features.JobApplications.DTOs;
using MalihaPolytex.Application.Features.JobApplications.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Entities.Common;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.JobApplications.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly IJobApplicationRepository _jobApplicationRepository;

    public JobApplicationService(
        IJobApplicationRepository jobApplicationRepository)
    {
        _jobApplicationRepository = jobApplicationRepository;
    }

    public async Task<IEnumerable<JobApplicationResponse>> GetAllAsync()
    {
        var applications =
            await _jobApplicationRepository.GetAllAsync();

        return applications.Select(MapToResponse);
    }

    public async Task<JobApplicationResponse?> GetByIdAsync(int id)
    {
        var application =
            await _jobApplicationRepository.GetByIdAsync(id);

        return application is null
            ? null
            : MapToResponse(application);
    }

    public async Task<int> CreateAsync(
        JobApplicationCreateRequest request)
    {
        var entity = new JobApplication
        {
            JobId = request.JobId,
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

            // Pending
            StatusId = 1,

            AppliedDate = DateTime.UtcNow,
            CreatedDate = DateTime.UtcNow
        };

        return await _jobApplicationRepository.CreateAsync(entity);
    }

    public async Task UpdateStatusAsync(
        int jobApplicationId,
        JobApplicationStatusUpdateRequest request,
        string? modifiedBy)
    {
        await _jobApplicationRepository.UpdateStatusAsync(
            jobApplicationId,
            request.StatusId,
            request.Remarks,
            modifiedBy);
    }

    public async Task DeleteAsync(int id)
    {
        await _jobApplicationRepository.DeleteAsync(id);
    }

    async Task<Common.Pagination.PagedResult<JobApplicationResponse>>
    IJobApplicationService.SearchAsync(JobApplicationSearchRequestDto request)
    {
        var result = await _jobApplicationRepository.SearchAsync(
            new JobApplicationSearchRequest
            {
                Search = request.Search,
                JobId = request.JobId,
                StatusId = request.StatusId,
                Page = request.Page,
                PageSize = request.PageSize
            });

        return new Common.Pagination.PagedResult<JobApplicationResponse>
        {
            Items = result.Items
                .Select(MapToResponse)
                .ToList(),

            Page = result.Page,
            PageSize = result.PageSize,
            TotalCount = result.TotalCount
        };
    }

    public async Task<IEnumerable<string>> GetJobTitlesAsync()
    {
        return await _jobApplicationRepository.GetJobTitlesAsync();
    }

    public async Task<MemoryStream> DownloadResumesAsync(
        IEnumerable<int> jobApplicationIds)
    {
        return await _jobApplicationRepository.DownloadResumesAsync(
            jobApplicationIds);
    }

    private static JobApplicationResponse MapToResponse(
        JobApplication application)
    {
        return new JobApplicationResponse
        {
            JobApplicationId = application.JobApplicationId,
            JobId = application.JobId,
            JobTitle = application.JobTitle,

            FullName = application.FullName,
            Email = application.Email,
            Phone = application.Phone,
            Address = application.Address,

            HighestEducation = application.HighestEducation,
            YearsOfExperience = application.YearsOfExperience,

            CurrentCompany = application.CurrentCompany,
            CurrentDesignation = application.CurrentDesignation,

            ExpectedSalary = application.ExpectedSalary,

            CoverLetter = application.CoverLetter,

            ResumeFile = application.ResumeFile,

            StatusId = application.StatusId,
            StatusName = application.StatusName,

            Remarks = application.Remarks,

            AppliedDate = application.AppliedDate,

            CreatedDate = application.CreatedDate,
            CreatedBy = application.CreatedBy,

            ModifiedDate = application.ModifiedDate,
            ModifiedBy = application.ModifiedBy
        };
    }

}