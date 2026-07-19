using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.CompanyProfiles.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyProfilesController : ControllerBase
{
    private readonly ICompanyProfileService _companyProfileService;

    public CompanyProfilesController(
        ICompanyProfileService companyProfileService)
    {
        _companyProfileService = companyProfileService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var profile = (await _companyProfileService.GetAllAsync()).FirstOrDefault();


        return Ok(ApiResponse<CompanyProfileResponse>
        .SuccessResponse(profile));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _companyProfileService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<CompanyProfileResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CompanyProfileRequest request)
    {
        var id = await _companyProfileService.CreateAsync(request);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Company profile created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        CompanyProfileRequest request)
    {
        await _companyProfileService.UpdateAsync(id, request);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Company profile updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _companyProfileService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Company profile deleted successfully."));
    }
}