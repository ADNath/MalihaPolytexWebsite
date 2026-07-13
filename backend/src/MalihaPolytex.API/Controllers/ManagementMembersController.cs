using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.HomepageContacts;
using MalihaPolytex.Application.Features.HomepageContacts.DTOs;
using MalihaPolytex.Application.Features.ManagementMembers.DTOs;

using Microsoft.AspNetCore.Mvc;

namespace MalihaPolytex.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ManagementMembersController : ControllerBase
{
    private readonly IManagementMemberService _managementMemberService;

    public ManagementMembersController(
        IManagementMemberService managementMemberService)
    {
        _managementMemberService = managementMemberService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {

        var result = await _managementMemberService.GetAllAsync();

        return Ok(
             ApiResponse<IEnumerable<ManagementMemberResponse>>
                 .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _managementMemberService.GetByIdAsync(id);


        return Ok(
           ApiResponse<ManagementMemberResponse>
               .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        ManagementMemberRequest request)
    {
        var id = await _managementMemberService.CreateAsync(request);

        return Ok(
             ApiResponse<string>.SuccessResponse(
                 "Success",
                 "Homepage contact updated successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        ManagementMemberRequest request)
    {
        await _managementMemberService.UpdateAsync(id, request);

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _managementMemberService.DeleteAsync(id);

        return NoContent();
    }
}