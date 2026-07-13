using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class CompanyVideoRepository : ICompanyVideoRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CompanyVideoRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<CompanyVideo>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM CompanyVideos
ORDER BY DisplayOrder;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<CompanyVideo>(sql);
    }

    public async Task<CompanyVideo?> GetByIdAsync(int companyVideoId)
    {
        const string sql = @"
SELECT *
FROM CompanyVideos
WHERE CompanyVideoId = @CompanyVideoId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<CompanyVideo>(
            sql,
            new { CompanyVideoId = companyVideoId });
    }

    public async Task<int> CreateAsync(CompanyVideo companyVideo)
    {
        const string sql = @"
INSERT INTO CompanyVideos
(
    Title,
    Description,
    VideoUrl,
    DisplayOrder,
    IsActive,
    CreatedDate,VideoThumbnail
)
VALUES
(
    @Title,
    @Description,
    @VideoUrl,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME(),@VideoThumbnail
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(sql, companyVideo);
    }

    public async Task UpdateAsync(CompanyVideo companyVideo)
    {
        const string sql = @"
UPDATE CompanyVideos
SET
    Title = @Title,
    Description = @Description,
    VideoUrl = @VideoUrl,
    VideoThumbnail = @VideoThumbnail,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME()
WHERE CompanyVideoId = @CompanyVideoId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, companyVideo);
    }

    public async Task DeleteAsync(int companyVideoId)
    {
        const string sql = @"
DELETE FROM CompanyVideos
WHERE CompanyVideoId = @CompanyVideoId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new { CompanyVideoId = companyVideoId });
    }
}