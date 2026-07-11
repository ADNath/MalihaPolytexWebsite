using MalihaPolytex.Application.Common.Exceptions;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.Auth.DTOs;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.Auth.Services;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(
        IAuthRepository authRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenService jwtTokenService)
    {
        _authRepository = authRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _authRepository.GetByUsernameAsync(request.Username);

        if (user is null)
            throw new UnauthorizedException("Invalid username or password.");

        if (!user.IsActive)
            throw new UnauthorizedException("Your account has been deactivated.");

        var isValidPassword = _passwordHasher.VerifyPassword(
            request.Password,
            user.PasswordHash);

        if (!isValidPassword)
            throw new UnauthorizedException("Invalid username or password.");

        var token = _jwtTokenService.GenerateToken(
            user.UserId,
            user.Username);

        return new LoginResponse
        {
            Token = token,
            UserId = user.UserId,
            Username = user.Username,
            FullName = user.FullName
        };
    }
}