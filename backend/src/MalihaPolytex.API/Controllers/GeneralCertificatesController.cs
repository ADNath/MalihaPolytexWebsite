using MalihaPolytex.Application.DTOs.GeneralCertificates;
using MalihaPolytex.Application.Features.Certificates.DTOs;
using MalihaPolytex.Application.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GeneralCertificatesController : ControllerBase
{
    private readonly IGeneralCertificateService _generalCertificateService;

    public GeneralCertificatesController(
        IGeneralCertificateService generalCertificateService)
    {
        _generalCertificateService = generalCertificateService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var result = await _generalCertificateService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _generalCertificateService.GetByIdAsync(id);

        if (!result.Success)
            return NotFound(result);

        return Ok(result);
    }

    [HttpPost]
        public async Task<IActionResult> Create(CreateGeneralCertificateRequest request)
    {
        var result = await _generalCertificateService.CreateAsync(request);

        if (!result.Success)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpPut("{id:int}")]
    [Authorize]
        public async Task<IActionResult> Update(
        int id,
        UpdateGeneralCertificateRequest request)
    {
        if (id != request.GeneralCertificateId)
        {
            return BadRequest("Route id and request id do not match.");
        }

        var result = await _generalCertificateService.UpdateAsync(id, request);

        if (!result.Success)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _generalCertificateService.DeleteAsync(id);

        if (!result.Success)
            return BadRequest(result);

        return Ok(result);
    }
}