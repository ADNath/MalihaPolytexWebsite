using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.CareerDepartments.DTOs;
using Backend.DTOs.CareerDepartment;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CareerDepartmentsController : ControllerBase
{
    private readonly ICareerDepartmentService _careerDepartmentService;

    public CareerDepartmentsController(
        ICareerDepartmentService careerDepartmentService)
    {
        _careerDepartmentService = careerDepartmentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _careerDepartmentService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<CareerDepartmentResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _careerDepartmentService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<CareerDepartmentResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CareerDepartmentCreateRequest request)
    {
        var id = await _careerDepartmentService.CreateAsync(request);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Career department created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        CareerDepartmentCreateRequest request)
    {
        await _careerDepartmentService.UpdateAsync(id, request);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Career department updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _careerDepartmentService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Career department deleted successfully."));
    }
}