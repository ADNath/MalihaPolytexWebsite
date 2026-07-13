using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.Certificates.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CertificatesController : ControllerBase
{
    private readonly ICertificateService _certificateService;

    public CertificatesController(ICertificateService certificateService)
    {
        _certificateService = certificateService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _certificateService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<CertificateResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _certificateService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<CertificateResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CertificateCreateRequest request)
    {
        var id = await _certificateService.CreateAsync(request);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Certificate created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        CertificateCreateRequest request)
    {
        await _certificateService.UpdateAsync(id, request);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Certificate updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _certificateService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Certificate deleted successfully."));
    }
}