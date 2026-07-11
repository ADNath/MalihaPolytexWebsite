namespace MalihaPolytex.Application.Common.Interfaces;

public interface IJwtTokenService
{
    string GenerateToken(
        int userId,
        string username);
}