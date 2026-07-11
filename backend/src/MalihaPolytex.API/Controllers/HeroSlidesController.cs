using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.HeroSlides.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HeroSlidesController : ControllerBase
{
    private readonly IHeroSlideService _heroSlideService;

    public HeroSlidesController(IHeroSlideService heroSlideService)
    {
        _heroSlideService = heroSlideService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _heroSlideService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<HeroSlideResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _heroSlideService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<HeroSlideResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(HeroSlideRequest request)
    {
        var id = await _heroSlideService.CreateAsync(request);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Hero slide created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, HeroSlideRequest request)
    {
        await _heroSlideService.UpdateAsync(id, request);

        return Ok(ApiResponse<string>.SuccessResponse(
     "Success",
     "Hero slide updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _heroSlideService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
    "Success",
    "Hero slide deleted successfully."));
    }
}