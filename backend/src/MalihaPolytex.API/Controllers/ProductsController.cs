using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.Products.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _productService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<ProductResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var result = await _productService.GetByCategoryAsync(category);

        return Ok(ApiResponse<IEnumerable<ProductResponse>>
            .SuccessResponse(result));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _productService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(ApiResponse<ProductResponse>
            .SuccessResponse(result));
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProductCreateRequest request)
    {

        var createdBy = User.Identity?.Name;

        var id = await _productService.CreateAsync(request, createdBy);

        return Ok(ApiResponse<int>
            .SuccessResponse(id, "Product created successfully."));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        ProductCreateRequest request)
    {

        var updatedBy = User.Identity?.Name;
        await _productService.UpdateAsync(id, request, updatedBy);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Product updated successfully."));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _productService.DeleteAsync(id);

        return Ok(ApiResponse<string>.SuccessResponse(
            "Success",
            "Product deleted successfully."));
    }
}