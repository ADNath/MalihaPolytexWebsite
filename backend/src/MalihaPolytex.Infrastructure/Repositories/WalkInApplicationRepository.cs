using System.Data;
using System.IO.Compression;
using System.Text;
using Dapper;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Entities.Common;
using MalihaPolytex.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace MalihaPolytex.Infrastructure.Repositories;

public class WalkInApplicationRepository : IWalkInApplicationRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;
    private readonly string _fileStorageRoot;

    public WalkInApplicationRepository(
        IDbConnectionFactory dbConnectionFactory,
        IConfiguration configuration)
    {
        _dbConnectionFactory = dbConnectionFactory;
        _fileStorageRoot = configuration["FileStorage:RootPath"] ?? string.Empty;
    }

    public async Task<IEnumerable<WalkInApplication>> GetAllAsync()
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                wa.*,
                s.Name AS StatusName
            FROM WalkInApplications wa
            INNER JOIN CareerApplicationStatuses s
                ON wa.StatusId = s.StatusId
            ORDER BY wa.AppliedDate DESC;
            """;

        return await connection.QueryAsync<WalkInApplication>(sql);
    }

    public async Task<WalkInApplication?> GetByIdAsync(int id)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                wa.*,
                s.Name AS StatusName
            FROM WalkInApplications wa
            INNER JOIN CareerApplicationStatuses s
                ON wa.StatusId = s.StatusId
            WHERE wa.WalkInApplicationId = @WalkInApplicationId;
            """;

        return await connection.QuerySingleOrDefaultAsync<WalkInApplication>(
            sql,
            new
            {
                WalkInApplicationId = id
            });
    }

    public async Task<int> CreateAsync(
        WalkInApplication walkInApplication)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            INSERT INTO WalkInApplications
            (
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
            walkInApplication);
    }

    public async Task UpdateStatusAsync(
    int walkInApplicationId,
    byte statusId,
    string? remarks,
    string? modifiedBy)
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            UPDATE WalkInApplications
            SET
                StatusId = @StatusId,
                Remarks = @Remarks,
                ModifiedDate = SYSUTCDATETIME(),
                ModifiedBy = @ModifiedBy
            WHERE WalkInApplicationId = @WalkInApplicationId;
            """;

        await connection.ExecuteAsync(
            sql,
            new
            {
                WalkInApplicationId = walkInApplicationId,
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
            FROM WalkInApplications
            WHERE WalkInApplicationId = @WalkInApplicationId;
            """;

        await connection.ExecuteAsync(
            sql,
            new
            {
                WalkInApplicationId = id
            });
    }

    public async Task<PagedResult<WalkInApplication>> SearchAsync(
        WalkInApplicationSearchRequest request)
    {
        request.Normalize();

        using var connection =
            _dbConnectionFactory.CreateConnection();

        var sql = new StringBuilder(
            """
            FROM WalkInApplications wa
            INNER JOIN CareerApplicationStatuses s
                ON wa.StatusId = s.StatusId
            WHERE 1 = 1
            """);

        var parameters = new DynamicParameters();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            sql.AppendLine("""
                AND
                (
                    wa.FullName LIKE @Search
                    OR wa.Email LIKE @Search
                    OR wa.Phone LIKE @Search
                    OR wa.CurrentCompany LIKE @Search
                    OR wa.CurrentDesignation LIKE @Search
                )
                """);

            parameters.Add(
                "Search",
                $"%{request.Search.Trim()}%");
        }

        if (!string.IsNullOrWhiteSpace(request.Designation))
        {
            sql.AppendLine("""
                AND wa.CurrentDesignation = @Designation
                """);

            parameters.Add(
                "Designation",
                request.Designation);
        }

        if (request.MinExperience.HasValue)
        {
            sql.AppendLine("""
                AND wa.YearsOfExperience >= @MinExperience
                """);

            parameters.Add(
                "MinExperience",
                request.MinExperience);
        }

        if (request.MaxExperience.HasValue)
        {
            sql.AppendLine("""
                AND wa.YearsOfExperience <= @MaxExperience
                """);

            parameters.Add(
                "MaxExperience",
                request.MaxExperience);
        }

        if (request.StatusId.HasValue)
        {
            sql.AppendLine("""
                AND wa.StatusId = @StatusId
                """);

            parameters.Add(
                "StatusId",
                request.StatusId);
        }

        var countSql =
            "SELECT COUNT(*) " + sql;

        var totalCount =
            await connection.ExecuteScalarAsync<int>(
                countSql,
                parameters);

        var orderBy = GetSortColumn(request.SortBy);

        sql.AppendLine($"""
            ORDER BY {orderBy} {request.SortDirection}
            OFFSET @Offset ROWS
            FETCH NEXT @PageSize ROWS ONLY
            """);

        parameters.Add(
            "Offset",
            request.Offset);

        parameters.Add(
            "PageSize",
            request.PageSize);

        var dataSql =
            $"""
            SELECT
                wa.*,
                s.Name AS StatusName
            {sql}
            """;

        var items =
            (await connection.QueryAsync<WalkInApplication>(
                dataSql,
                parameters))
            .ToList();

        return new PagedResult<WalkInApplication>
        {
            Items = items,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }

    private static string GetSortColumn(
        string? sortBy)
    {
        return sortBy?.ToLowerInvariant() switch
        {
            "fullname" => "wa.FullName",
            "email" => "wa.Email",
            "phone" => "wa.Phone",
            "company" => "wa.CurrentCompany",
            "designation" => "wa.CurrentDesignation",
            "experience" => "wa.YearsOfExperience",
            "status" => "s.Name",
            "applieddate" => "wa.AppliedDate",
            _ => "wa.AppliedDate"
        };
    }
    public async Task<IEnumerable<string>> GetDesignationsAsync()
    {
        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT 
                Name CurrentDesignation
            FROM CareerDepartments
            WHERE
                IsActive=1
            ORDER BY DisplayOrder;
            """;

        return await connection.QueryAsync<string>(sql);
    }

    public async Task<MemoryStream> DownloadResumesAsync(
        IEnumerable<int> walkInApplicationIds)
    {
        var ids = walkInApplicationIds?
            .Distinct()
            .ToArray() ?? [];

        if (ids.Length == 0)
            throw new ArgumentException(
                "No applications selected.");

        using var connection =
            _dbConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                WalkInApplicationId,
                FullName,
                ResumeFile
            FROM WalkInApplications
            WHERE WalkInApplicationId IN @Ids;
            """;

        var applications =
            (await connection.QueryAsync<WalkInApplication>(
                sql,
                new { Ids = ids }))
            .ToList();

        var memoryStream = new MemoryStream();

        using (var archive = new ZipArchive(
            memoryStream,
            ZipArchiveMode.Create,
            true))
        {
            foreach (var application in applications)
            {
                if (string.IsNullOrWhiteSpace(application.ResumeFile))
                    continue;

                var relativePath = application.ResumeFile
                    .Replace("/Uploads/", "",
                        StringComparison.OrdinalIgnoreCase)
                    .Replace('/', Path.DirectorySeparatorChar);

                var physicalPath =
                    Path.Combine(_fileStorageRoot, relativePath);

                if (!File.Exists(physicalPath))
                    continue;

                var extension =
                    Path.GetExtension(physicalPath);

                var safeName =
                    SanitizeFileName(application.FullName);

                var zipEntryName =
                    $"{safeName}_{application.WalkInApplicationId}{extension}";

                var entry = archive.CreateEntry(
                    zipEntryName,
                    CompressionLevel.Fastest);

                await using var entryStream =
                    entry.Open();

                await using var fileStream =
                    File.OpenRead(physicalPath);

                await fileStream.CopyToAsync(entryStream);
            }
        }

        memoryStream.Position = 0;

        return memoryStream;
    }

    private static string SanitizeFileName(string? fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
            return "Resume";

        foreach (var invalidChar in Path.GetInvalidFileNameChars())
        {
            fileName = fileName.Replace(invalidChar, '_');
        }

        return fileName.Trim();
    }
}