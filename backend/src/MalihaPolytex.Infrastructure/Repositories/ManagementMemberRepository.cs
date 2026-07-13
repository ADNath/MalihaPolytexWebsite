using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class ManagementMemberRepository : IManagementMemberRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ManagementMemberRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<ManagementMember>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM ManagementMembers
ORDER BY DisplayOrder;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<ManagementMember>(sql);
    }

    public async Task<ManagementMember?> GetByIdAsync(int Id)
    {
        const string sql = @"
SELECT *
FROM ManagementMembers
WHERE Id = @Id;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<ManagementMember>(
            sql,
            new
            {
                Id = Id
            });
    }

    public async Task<int> CreateAsync(ManagementMember managementMember)
    {
        const string sql = @"
INSERT INTO ManagementMembers
(
    Name,
    Designation,
    ImageUrl,
    Message,
    DisplayOrder,
    IsActive,
    CreatedDate
)
VALUES
(
    @Name,
    @Designation,
    @ImageUrl,
    @Message,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME()
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            sql,
            managementMember);
    }

    public async Task UpdateAsync(ManagementMember managementMember)
    {
        const string sql = @"
UPDATE ManagementMembers
SET
    Name = @Name,
    Designation = @Designation,
    ImageUrl = @ImageUrl,
    Message = @Message,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    UpdatedAt = SYSUTCDATETIME()
WHERE Id = @Id;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, managementMember);
    }

    public async Task DeleteAsync(int Id)
    {
        const string sql = @"
DELETE FROM ManagementMembers
WHERE Id = @Id;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new
            {
                Id = Id
            });
    }
}