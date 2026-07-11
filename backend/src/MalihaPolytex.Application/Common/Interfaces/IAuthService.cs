using MalihaPolytex.Application.Features.Auth.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);
}