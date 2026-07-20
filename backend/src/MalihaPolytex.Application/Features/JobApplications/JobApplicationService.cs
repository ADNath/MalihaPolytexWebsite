using MalihaPolytex.Application.Features.JobApplications.DTOs;
using MalihaPolytex.Application.Features.JobApplications.Interfaces;

using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.JobApplications.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly IJobApplicationRepository _jobApplicationRepository;
    private readonly IJobOpeningRepository _jobOpeningRepository;

    public JobApplicationService(
        IJobApplicationRepository jobApplicationRepository,
        IJobOpeningRepository jobOpeningRepository)
    {
        _jobApplicationRepository = jobApplicationRepository;
        _jobOpeningRepository = jobOpeningRepository;
    }

    public async Task<IEnumerable<JobApplicationResponse>> GetAllAsync()
    {
        var applications = await _jobApplicationRepository.GetAllAsync();

        return applications.Select(x => new JobApplicationResponse
        {
            JobApplicationId = x.JobApplicationId,
            JobId = x.JobId,
            JobTitle = x.JobTitle,
            FullName = x.FullName,
            Email = x.Email,
            Phone = x.Phone,
            Address = x.Address,
            HighestEducation = x.HighestEducation,
            YearsOfExperience = x.YearsOfExperience,
            CurrentCompany = x.CurrentCompany,
            CurrentDesignation = x.CurrentDesignation,
            ExpectedSalary = x.ExpectedSalary,
            CoverLetter = x.CoverLetter,
            ResumeFile = x.ResumeFile,
            StatusId = x.StatusId,
            StatusName = x.StatusName,
            Remarks = x.Remarks,
            AppliedDate = x.AppliedDate,
            CreatedDate = x.CreatedDate,
            CreatedBy = x.CreatedBy,
            ModifiedDate = x.ModifiedDate,
            ModifiedBy = x.ModifiedBy
        });
    }

    public async Task<JobApplicationResponse?> GetByIdAsync(int id)
    {
        var application = await _jobApplicationRepository.GetByIdAsync(id);

        if (application is null)
            return null;

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

    public async Task<int> CreateAsync(JobApplicationCreateRequest request)
    {
        var job = await _jobOpeningRepository.GetByIdAsync(request.JobId);

        if (job is null)
            throw new Exception("Job opening not found.");

        var entity = new JobApplication
        {
            JobId = request.JobId,
            JobTitle = job.Title,
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

        return await _jobApplicationRepository.CreateAsync(entity);
    }

    public async Task UpdateStatusAsync(
        int jobApplicationId,
        JobApplicationStatusUpdateRequest request)
    {
        await _jobApplicationRepository.UpdateStatusAsync(
            jobApplicationId,
            request.StatusId,
            request.Remarks,
            "Admin");
    }

    public async Task DeleteAsync(int id)
    {
        await _jobApplicationRepository.DeleteAsync(id);
    }
}