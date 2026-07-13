using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.WhatWeDoItems.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WhatWeDoItemsController : ControllerBase
{
    private readonly IWhatWeDoItemService _whatWeDoItemService;

    public WhatWeDoItemsController(
        IWhatWeDoItemService whatWeDoItemService)
    {
        _whatWeDoItemService = whatWeDoItemService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<WhatWeDoItemResponse>>>> GetAll()
    {
        var items = await _whatWeDoItemService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<WhatWeDoItemResponse>>
            .SuccessResponse(items));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<WhatWeDoItemResponse>>> GetById(int id)
    {
        var item = await _whatWeDoItemService.GetByIdAsync(id);

        if (item is null)
        {
            return NotFound(
                ApiResponse<WhatWeDoItemResponse>.FailureResponse(
                    "What We Do item not found."));
        }

        return Ok(ApiResponse<WhatWeDoItemResponse>
            .SuccessResponse(item));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<int>>> Create(
        WhatWeDoItemRequest request)
    {
        var id = await _whatWeDoItemService.CreateAsync(request);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "What We Do item created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<object>>> Update(
        int id,
        WhatWeDoItemRequest request)
    {
        await _whatWeDoItemService.UpdateAsync(id, request);

        return Ok(ApiResponse<object>
            .SuccessResponse(null, "What We Do item updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        await _whatWeDoItemService.DeleteAsync(id);

        return Ok(ApiResponse<object>
            .SuccessResponse(null, "What We Do item deleted successfully."));
    }
}