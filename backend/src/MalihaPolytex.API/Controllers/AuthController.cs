using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.Features.Auth.DTOs;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponse>>> Login(
        [FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);

        return Ok(ApiResponse<LoginResponse>.SuccessResponse(
            response,
            "Login successful."));
    }
}