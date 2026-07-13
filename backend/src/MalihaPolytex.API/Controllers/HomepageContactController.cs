using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.HomepageContacts.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomepageContactController : ControllerBase
{
    private readonly IHomepageContactService _homepageContactService;

    public HomepageContactController(
        IHomepageContactService homepageContactService)
    {
        _homepageContactService = homepageContactService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _homepageContactService.GetAllAsync();

        return Ok(
            ApiResponse<IEnumerable<HomepageContactResponse>>
                .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _homepageContactService.GetByIdAsync(id);

        if (result is null)
            return NotFound();

        return Ok(
            ApiResponse<HomepageContactResponse>
                .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        HomepageContactRequest request)
    {
        var id = await _homepageContactService.CreateAsync(request);

        return Ok(
            ApiResponse<int>
                .SuccessResponse(
                    id,
                    "Homepage contact created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        HomepageContactRequest request)
    {
        await _homepageContactService.UpdateAsync(id, request);

        return Ok(
            ApiResponse<string>.SuccessResponse(
                "Success",
                "Homepage contact updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _homepageContactService.DeleteAsync(id);

        return Ok(
            ApiResponse<string>.SuccessResponse(
                "Success",
                "Homepage contact deleted successfully."));
    }
}