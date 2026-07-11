using BCrypt.Net;

using Dapper;

using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly IDbConnectionFactory _connectionFactory;

    public SeedController(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    [HttpPost("admin")]
    public async Task<IActionResult> CreateAdmin()
    {
        using var connection = _connectionFactory.CreateConnection();

        const string checkSql = @"
SELECT COUNT(*)
FROM Users
WHERE Username = 'admin';";

        var exists = await connection.ExecuteScalarAsync<int>(checkSql);

        if (exists > 0)
            return BadRequest("Admin user already exists.");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword("admin123");

        const string insertSql = @"
INSERT INTO Users
(
    Username,
    PasswordHash,
    FullName,
    IsActive,
    CreatedDate
)
VALUES
(
    @Username,
    @PasswordHash,
    @FullName,
    1,
    SYSUTCDATETIME()
);";

        await connection.ExecuteAsync(
            insertSql,
            new
            {
                Username = "admin",
                PasswordHash = passwordHash,
                FullName = "Administrator"
            });

        return Ok("Admin user created successfully.");
    }
}