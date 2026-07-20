using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public JobApplicationRepository(
        IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<JobApplication>> GetAllAsync()
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                ja.*,
                jo.Title AS JobTitle,
                s.Name StatusName
            FROM JobApplications ja
            INNER JOIN JobOpenings jo
                ON ja.JobId = jo.JobId
            INNER JOIN CareerApplicationStatuses s
                ON ja.StatusId = s.StatusId
            """;

        return await connection.QueryAsync<JobApplication>(sql);
    }

    public async Task<JobApplication?> GetByIdAsync(int id)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                ja.*,
                jo.Title AS JobTitle,
                s.Name StatusName
            FROM JobApplications ja
            INNER JOIN JobOpenings jo
                ON ja.JobId = jo.JobId
            INNER JOIN CareerApplicationStatuses s
                ON ja.StatusId = s.StatusId
            WHERE ja.JobApplicationId = @JobApplicationId;
            """;

        return await connection.QuerySingleOrDefaultAsync<JobApplication>(
            sql,
            new { JobApplicationId = id });
    }

    public async Task<int> CreateAsync(JobApplication jobApplication)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            INSERT INTO JobApplications
            (
                JobId,
                FullName,
                Email,
                Phone,
                Address,
                HighestEducation,
                YearsOfExperience,
                CurrentCompany,
                CurrentDesignation,
                ExpectedSalary,
                CoverLetter,
                ResumeFile,
                StatusId,
                Remarks,
                AppliedDate,
                CreatedDate,
                CreatedBy
            )
            VALUES
            (
                @JobId,
                @FullName,
                @Email,
                @Phone,
                @Address,
                @HighestEducation,
                @YearsOfExperience,
                @CurrentCompany,
                @CurrentDesignation,
                @ExpectedSalary,
                @CoverLetter,
                @ResumeFile,
                @StatusId,
                @Remarks,
                SYSUTCDATETIME(),
                SYSUTCDATETIME(),
                @CreatedBy
            );

            SELECT CAST(SCOPE_IDENTITY() AS INT);
            """;

        return await connection.ExecuteScalarAsync<int>(
            sql,
            jobApplication);
    }

    public async Task UpdateStatusAsync(
        int jobApplicationId,
        byte statusId,
        string? remarks,
        string? modifiedBy)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            UPDATE JobApplications
            SET
                StatusId = @StatusId,
                Remarks = @Remarks,
                ModifiedDate = SYSUTCDATETIME(),
                ModifiedBy = @ModifiedBy
            WHERE JobApplicationId = @JobApplicationId;
            """;

        await connection.ExecuteAsync(
            sql,
            new
            {
                JobApplicationId = jobApplicationId,
                StatusId = statusId,
                Remarks = remarks,
                ModifiedBy = modifiedBy
            });
    }

    public async Task DeleteAsync(int id)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            DELETE
            FROM JobApplications
            WHERE JobApplicationId = @JobApplicationId;
            """;

        await connection.ExecuteAsync(
            sql,
            new
            {
                JobApplicationId = id
            });
    }
}