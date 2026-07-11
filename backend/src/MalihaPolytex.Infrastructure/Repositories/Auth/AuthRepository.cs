using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories.Auth;

public class AuthRepository : IAuthRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public AuthRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        const string sql = @"
SELECT
    UserId,
    Username,
    PasswordHash,
    FullName,
    IsActive,
    CreatedDate,
    CreatedBy,
    ModifiedDate,
    ModifiedBy
FROM Users
WHERE Username = @Username;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<User>(
            sql,
            new { Username = username });
    }
}