using Backend.Entities;
using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class CareerDepartmentRepository : ICareerDepartmentRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CareerDepartmentRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<CareerDepartment>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM CareerDepartments
ORDER BY DisplayOrder, Name;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<CareerDepartment>(sql);
    }

    public async Task<CareerDepartment?> GetByIdAsync(int departmentId)
    {
        const string sql = @"
SELECT *
FROM CareerDepartments
WHERE DepartmentId = @DepartmentId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<CareerDepartment>(
            sql,
            new { DepartmentId = departmentId });
    }

    public async Task<int> CreateAsync(CareerDepartment careerDepartment)
    {
        const string sql = @"
INSERT INTO CareerDepartments
(
    Name,
    DisplayOrder,
    IsActive,
    CreatedDate
)
VALUES
(
    @Name,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME()
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            sql,
            careerDepartment);
    }

    public async Task UpdateAsync(CareerDepartment careerDepartment)
    {
        const string sql = @"
UPDATE CareerDepartments
SET
    Name = @Name,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME()
WHERE DepartmentId = @DepartmentId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, careerDepartment);
    }

    public async Task DeleteAsync(int departmentId)
    {
        const string sql = @"
DELETE FROM CareerDepartments
WHERE DepartmentId = @DepartmentId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new { DepartmentId = departmentId });
    }
}