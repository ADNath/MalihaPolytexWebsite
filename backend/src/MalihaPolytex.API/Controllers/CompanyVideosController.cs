using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.CompanyVideos.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyVideosController : ControllerBase
{
    private readonly ICompanyVideoService _companyVideoService;

    public CompanyVideosController(ICompanyVideoService companyVideoService)
    {
        _companyVideoService = companyVideoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _companyVideoService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<CompanyVideoResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _companyVideoService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<CompanyVideoResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CompanyVideoRequest request)
    {
        var id = await _companyVideoService.CreateAsync(request);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Company video created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, CompanyVideoRequest request)
    {
        await _companyVideoService.UpdateAsync(id, request);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Company video updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _companyVideoService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Company video deleted successfully."));
    }
}