using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolyTex.Api.Models.ContactInquiry;
using MalihaPolyTex.Api.Services.Interfaces;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactInquiryController : ControllerBase
{
    private readonly IContactInquiryService _contactInquiryService;

    public ContactInquiryController(
        IContactInquiryService contactInquiryService)
    {
        _contactInquiryService = contactInquiryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _contactInquiryService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<ContactInquiryResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _contactInquiryService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<ContactInquiryResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(ContactInquiryRequest request)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

        var id = await _contactInquiryService.CreateAsync(request, ipAddress);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Inquiry submitted successfully."));
    }

    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        UpdateContactInquiryStatusRequest request)
    {
        await _contactInquiryService.UpdateStatusAsync(id, request);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Inquiry status updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _contactInquiryService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Inquiry deleted successfully."));
    }
}