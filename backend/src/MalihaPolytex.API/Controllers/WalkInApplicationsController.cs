using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.WalkInApplications.DTOs;
using MalihaPolytex.Application.Features.WalkInApplications.Interfaces;
using MalihaPolytex.Application.Features.WalkInApplication.DTOs;
using MalihaPolytex.Application.Common.Pagination;
using MalihaPolytex.Application.WalkInApplications.Models;

namespace MalihaPolytex.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WalkInApplicationsController : ControllerBase
{
    private readonly IWalkInApplicationService _walkInApplicationService;

    public WalkInApplicationsController(
        IWalkInApplicationService walkInApplicationService)
    {
        _walkInApplicationService = walkInApplicationService;
    }

    [HttpGet]
    public async Task<IActionResult> Search(
        [FromQuery] WalkInApplicationSearchRequest request)
    {
        var result = await _walkInApplicationService.SearchAsync(request);

        return Ok(
            ApiResponse<PagedResult<WalkInApplicationResponse>>
                .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var application =
            await _walkInApplicationService.GetByIdAsync(id);

        if (application is null)
        {
            return NotFound(
                ApiResponse<WalkInApplicationResponse>
                    .FailureResponse(
                        "Walk-in application not found."));
        }

        return Ok(
            ApiResponse<WalkInApplicationResponse>
                .SuccessResponse(application));
    }

    [HttpGet("designations")]
    public async Task<IActionResult> GetDesignations()
    {
        var designations =
            await _walkInApplicationService.GetDesignationsAsync();

        return Ok(
            ApiResponse<IEnumerable<string>>
                .SuccessResponse(designations));
    }
    [HttpPost]
    public async Task<IActionResult> Create(
    [FromBody] WalkInApplicationCreateRequest request)
    {
        var id = await _walkInApplicationService.CreateAsync(request);

        return Ok(
            ApiResponse<int>.SuccessResponse(
                id,
                "Walk-in application submitted successfully."));
    }

    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        [FromBody] WalkInApplicationStatusUpdateRequest request)
    {
        await _walkInApplicationService.UpdateStatusAsync(
            id,
            request);

        return Ok(
            ApiResponse<bool>.SuccessResponse(
                true,
                "Application status updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _walkInApplicationService.DeleteAsync(id);

        return Ok(
            ApiResponse<bool>.SuccessResponse(
                true,
                "Walk-in application deleted successfully."));
    }

    [HttpPost("download-resumes")]
    public async Task<IActionResult> DownloadResumes(
        [FromBody] DownloadResumesRequest request)
    {
        var stream = await _walkInApplicationService
            .DownloadResumesAsync(request.WalkInApplicationIds);

        stream.Position = 0;

        return File(
            stream,
            "application/zip",
            $"WalkInResumes_{DateTime.Now:yyyyMMddHHmmss}.zip");
    }
}
