using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.JobApplications.DTOs;
using MalihaPolytex.Application.Features.JobApplications.Interfaces;

namespace MalihaPolytex.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobApplicationsController : ControllerBase
{
    private readonly IJobApplicationService _jobApplicationService;

    public JobApplicationsController(
        IJobApplicationService jobApplicationService)
    {
        _jobApplicationService = jobApplicationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _jobApplicationService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<JobApplicationResponse>>
            .SuccessResponse(applications));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var application = await _jobApplicationService.GetByIdAsync(id);

        if (application is null)
        {
            return NotFound(ApiResponse<JobApplicationResponse>
                .FailureResponse("Job application not found."));
        }

        return Ok(ApiResponse<JobApplicationResponse>
            .SuccessResponse(application));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        JobApplicationCreateRequest request)
    {
        var id = await _jobApplicationService.CreateAsync(request);

        return Ok(ApiResponse<int>.SuccessResponse(
            id,
            "Job application submitted successfully."));
    }

    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        JobApplicationStatusUpdateRequest request)
    {
        await _jobApplicationService.UpdateStatusAsync(
            id,
            request);

        return Ok(ApiResponse<bool>.SuccessResponse(
            true,
            "Application status updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _jobApplicationService.DeleteAsync(id);

        return Ok(ApiResponse<bool>.SuccessResponse(
            true,
            "Job application deleted successfully."));
    }
}