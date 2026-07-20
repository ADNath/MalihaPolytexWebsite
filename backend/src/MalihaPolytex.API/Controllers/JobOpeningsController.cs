using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.JobOpenings.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobOpeningsController : ControllerBase
{
    private readonly IJobOpeningService _jobOpeningService;

    public JobOpeningsController(
        IJobOpeningService jobOpeningService)
    {
        _jobOpeningService = jobOpeningService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _jobOpeningService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<JobOpeningResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _jobOpeningService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<JobOpeningResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        JobOpeningCreateRequest request)
    {
        var id = await _jobOpeningService.CreateAsync(request);

        return Ok(ApiResponse<int>.SuccessResponse(
            id,
            "Job opening created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        JobOpeningCreateRequest request)
    {
        await _jobOpeningService.UpdateAsync(
            id,
            request);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Job opening updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _jobOpeningService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Job opening deleted successfully."));
    }
}