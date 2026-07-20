using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class JobOpeningRepository : IJobOpeningRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public JobOpeningRepository(
        IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<JobOpening>> GetAllAsync()
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                j.JobId,
                j.Title,
                j.DepartmentId,
                d.Name AS DepartmentName,
                j.JobLocation,
                j.EmploymentType,
                j.Vacancy,
                j.Experience,
                j.Education,
                j.Salary,
                j.ApplicationDeadline,
                j.Description,
                j.Responsibilities,
                j.Requirements,
                j.Benefits,
                j.DisplayOrder,
                j.IsActive,
                j.CreatedDate,
                j.CreatedBy,
                j.ModifiedDate,
                j.ModifiedBy
            FROM JobOpenings j
            INNER JOIN CareerDepartments d
                ON j.DepartmentId = d.DepartmentId
            ORDER BY
                j.DisplayOrder,
                j.Title;
            """;

        return await connection.QueryAsync<JobOpening>(sql);
    }

    public async Task<JobOpening?> GetByIdAsync(int id)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                j.JobId,
                j.Title,
                j.DepartmentId,
                d.Name AS DepartmentName,
                j.JobLocation,
                j.EmploymentType,
                j.Vacancy,
                j.Experience,
                j.Education,
                j.Salary,
                j.ApplicationDeadline,
                j.Description,
                j.Responsibilities,
                j.Requirements,
                j.Benefits,
                j.DisplayOrder,
                j.IsActive,
                j.CreatedDate,
                j.CreatedBy,
                j.ModifiedDate,
                j.ModifiedBy
            FROM JobOpenings j
            INNER JOIN CareerDepartments d
                ON j.DepartmentId = d.DepartmentId
            WHERE j.JobId = @JobId;
            """;

        return await connection.QuerySingleOrDefaultAsync<JobOpening>(
            sql,
            new { JobId = id });
    }

    public async Task<int> CreateAsync(JobOpening jobOpening)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            INSERT INTO JobOpenings
            (
                Title,
                DepartmentId,
                JobLocation,
                EmploymentType,
                Vacancy,
                Experience,
                Education,
                Salary,
                ApplicationDeadline,
                Description,
                Responsibilities,
                Requirements,
                Benefits,
                DisplayOrder,
                IsActive,
                CreatedDate,
                CreatedBy
            )
            VALUES
            (
                @Title,
                @DepartmentId,
                @JobLocation,
                @EmploymentType,
                @Vacancy,
                @Experience,
                @Education,
                @Salary,
                @ApplicationDeadline,
                @Description,
                @Responsibilities,
                @Requirements,
                @Benefits,
                @DisplayOrder,
                @IsActive,
                SYSUTCDATETIME(),
                @CreatedBy
            );

            SELECT CAST(SCOPE_IDENTITY() AS INT);
            """;

        return await connection.ExecuteScalarAsync<int>(
            sql,
            jobOpening);
    }

    public async Task UpdateAsync(JobOpening jobOpening)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            UPDATE JobOpenings
            SET
                Title = @Title,
                DepartmentId = @DepartmentId,
                JobLocation = @JobLocation,
                EmploymentType = @EmploymentType,
                Vacancy = @Vacancy,
                Experience = @Experience,
                Education = @Education,
                Salary = @Salary,
                ApplicationDeadline = @ApplicationDeadline,
                Description = @Description,
                Responsibilities = @Responsibilities,
                Requirements = @Requirements,
                Benefits = @Benefits,
                DisplayOrder = @DisplayOrder,
                IsActive = @IsActive,
                ModifiedDate = SYSUTCDATETIME(),
                ModifiedBy = @ModifiedBy
            WHERE JobId = @JobId;
            """;

        await connection.ExecuteAsync(sql, jobOpening);
    }

    public async Task DeleteAsync(int id)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            DELETE
            FROM JobOpenings
            WHERE JobId = @JobId;
            """;

        await connection.ExecuteAsync(
            sql,
            new { JobId = id });
    }
}