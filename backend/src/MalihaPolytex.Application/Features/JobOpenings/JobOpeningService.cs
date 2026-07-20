using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.JobOpenings.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.JobOpenings;

public class JobOpeningService : IJobOpeningService
{
    private readonly IJobOpeningRepository _jobOpeningRepository;

    public JobOpeningService(
        IJobOpeningRepository jobOpeningRepository)
    {
        _jobOpeningRepository = jobOpeningRepository;
    }

    public async Task<IEnumerable<JobOpeningResponse>> GetAllAsync()
    {
        var jobs = await _jobOpeningRepository.GetAllAsync();

        return jobs.Select(x => new JobOpeningResponse
        {
            JobId = x.JobId,
            Title = x.Title,
            DepartmentId = x.DepartmentId,
            DepartmentName = x.DepartmentName,
            JobLocation = x.JobLocation,
            EmploymentType = x.EmploymentType,
            Vacancy = x.Vacancy,
            Experience = x.Experience,
            Education = x.Education,
            Salary = x.Salary,
            ApplicationDeadline = x.ApplicationDeadline,
            Description = x.Description,
            Responsibilities = x.Responsibilities,
            Requirements = x.Requirements,
            Benefits = x.Benefits,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive,
            CreatedDate = x.CreatedDate,
            CreatedBy = x.CreatedBy,
            ModifiedDate = x.ModifiedDate,
            ModifiedBy = x.ModifiedBy
        });
    }

    public async Task<JobOpeningResponse?> GetByIdAsync(int id)
    {
        var job = await _jobOpeningRepository.GetByIdAsync(id);

        if (job is null)
            return null;

        return new JobOpeningResponse
        {
            JobId = job.JobId,
            Title = job.Title,
            DepartmentId = job.DepartmentId,
            DepartmentName = job.DepartmentName,
            JobLocation = job.JobLocation,
            EmploymentType = job.EmploymentType,
            Vacancy = job.Vacancy,
            Experience = job.Experience,
            Education = job.Education,
            Salary = job.Salary,
            ApplicationDeadline = job.ApplicationDeadline,
            Description = job.Description,
            Responsibilities = job.Responsibilities,
            Requirements = job.Requirements,
            Benefits = job.Benefits,
            DisplayOrder = job.DisplayOrder,
            IsActive = job.IsActive,
            CreatedDate = job.CreatedDate,
            CreatedBy = job.CreatedBy,
            ModifiedDate = job.ModifiedDate,
            ModifiedBy = job.ModifiedBy
        };
    }

    public async Task<int> CreateAsync(
        JobOpeningCreateRequest request)
    {
        var job = new JobOpening
        {
            Title = request.Title,
            DepartmentId = request.DepartmentId,
            JobLocation = request.JobLocation,
            EmploymentType = request.EmploymentType,
            Vacancy = request.Vacancy,
            Experience = request.Experience,
            Education = request.Education,
            Salary = request.Salary,
            ApplicationDeadline = request.ApplicationDeadline,
            Description = request.Description,
            Responsibilities = request.Responsibilities,
            Requirements = request.Requirements,
            Benefits = request.Benefits,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _jobOpeningRepository.CreateAsync(job);
    }

    public async Task UpdateAsync(
        int id,
        JobOpeningCreateRequest request)
    {
        var job = new JobOpening
        {
            JobId = id,
            Title = request.Title,
            DepartmentId = request.DepartmentId,
            JobLocation = request.JobLocation,
            EmploymentType = request.EmploymentType,
            Vacancy = request.Vacancy,
            Experience = request.Experience,
            Education = request.Education,
            Salary = request.Salary,
            ApplicationDeadline = request.ApplicationDeadline,
            Description = request.Description,
            Responsibilities = request.Responsibilities,
            Requirements = request.Requirements,
            Benefits = request.Benefits,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _jobOpeningRepository.UpdateAsync(job);
    }

    public async Task DeleteAsync(int id)
    {
        await _jobOpeningRepository.DeleteAsync(id);
    }
}