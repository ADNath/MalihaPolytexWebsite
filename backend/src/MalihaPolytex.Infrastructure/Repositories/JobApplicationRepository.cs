using System.Data;
using System.IO.Compression;
using System.Text;
using Dapper;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Entities.Common;
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

    public async Task<PagedResult<JobApplication>> SearchAsync(
    JobApplicationSearchRequest request)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        var where = new StringBuilder("WHERE 1 = 1");

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            where.Append("""
            AND
            (
                ja.FullName LIKE @Search
                OR ja.Email LIKE @Search
                OR ja.Phone LIKE @Search
            )
            """);

            parameters.Add(
                "Search",
                $"%{request.Search}%");
        }

        if (request.JobId.HasValue)
        {
            where.Append("""
            AND ja.JobId = @JobId
            """);

            parameters.Add(
                "JobId",
                request.JobId.Value);
        }

        if (request.StatusId.HasValue)
        {
            where.Append("""
            AND ja.StatusId = @StatusId
            """);

            parameters.Add(
                "StatusId",
                request.StatusId.Value);
        }

        const string countSql = """
        SELECT COUNT(*)
        FROM JobApplications ja
        """;

        var totalCount =
            await connection.ExecuteScalarAsync<int>(
                countSql + Environment.NewLine + where,
                parameters);

        parameters.Add(
            "Offset",
            (request.Page - 1) * request.PageSize);

        parameters.Add(
            "PageSize",
            request.PageSize);

        const string sql = """
        SELECT
            ja.JobApplicationId,
            ja.JobId,
            jo.Title AS JobTitle,
            ja.FullName,
            ja.Email,
            ja.Phone,
            ja.Address,
            ja.HighestEducation,
            ja.YearsOfExperience,
            ja.CurrentCompany,
            ja.CurrentDesignation,
            ja.ExpectedSalary,
            ja.CoverLetter,
            ja.ResumeFile,
            ja.StatusId,
            s.Name AS StatusName,
            ja.Remarks,
            ja.AppliedDate,
            ja.CreatedDate,
            ja.CreatedBy,
            ja.ModifiedDate,
            ja.ModifiedBy
        FROM JobApplications ja
        INNER JOIN JobOpenings jo
            ON ja.JobId = jo.JobId
        INNER JOIN CareerApplicationStatuses s
            ON ja.StatusId = s.StatusId
        """;


        var items = (await connection.QueryAsync<JobApplication>(
    sql +
    Environment.NewLine +
    where +
    Environment.NewLine +
    """
    ORDER BY ja.AppliedDate DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    """,
    parameters))
    .ToList();

        return new PagedResult<JobApplication>
        {
            Items = items,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }

    public async Task<IEnumerable<string>> GetJobTitlesAsync()
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
        SELECT DISTINCT
            Title
        FROM JobOpenings
        ORDER BY Title;
        """;

        return await connection.QueryAsync<string>(sql);
    }

    public async Task<MemoryStream> DownloadResumesAsync(
        IEnumerable<int> jobApplicationIds)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
        SELECT
            JobApplicationId,
            FullName,
            ResumeFile
        FROM JobApplications
        WHERE JobApplicationId IN @Ids
        AND ResumeFile IS NOT NULL
        AND ResumeFile <> '';
        """;

        var resumes = await connection.QueryAsync(
            sql,
            new
            {
                Ids = jobApplicationIds.ToArray()
            });

        var memoryStream = new MemoryStream();

        using (var archive = new ZipArchive(
            memoryStream,
            ZipArchiveMode.Create,
            true))
        {
            foreach (var resume in resumes)
            {
                var resumePath = (string?)resume.ResumeFile;

                if (string.IsNullOrWhiteSpace(resumePath))
                {
                    continue;
                }

                if (!File.Exists(resumePath))
                {
                    continue;
                }

                var extension = Path.GetExtension(resumePath);

                var safeName =
                    string.Join(
                        "_",
                        ((string)resume.FullName)
                            .Split(Path.GetInvalidFileNameChars(),
                                StringSplitOptions.RemoveEmptyEntries));

                var entry =
                    archive.CreateEntry(
                        $"{safeName}_{resume.JobApplicationId}{extension}",
                        CompressionLevel.Fastest);

                await using var entryStream =
                    entry.Open();

                await using var fileStream =
                    File.OpenRead(resumePath);

                await fileStream.CopyToAsync(entryStream);
            }
        }

        memoryStream.Position = 0;

        return memoryStream;
    }
}