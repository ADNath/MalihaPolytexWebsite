using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class CompanyProfileRepository : ICompanyProfileRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CompanyProfileRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<CompanyProfile>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM CompanyProfiles
ORDER BY CompanyProfileId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<CompanyProfile>(sql);
    }

    public async Task<CompanyProfile?> GetByIdAsync(int companyProfileId)
    {
        const string sql = @"
SELECT *
FROM CompanyProfiles
WHERE CompanyProfileId = @CompanyProfileId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<CompanyProfile>(
            sql,
            new { CompanyProfileId = companyProfileId });
    }

    public async Task<int> CreateAsync(CompanyProfile companyProfile)
    {
        const string sql = @"
INSERT INTO CompanyProfiles
(
    Title,
    Description,
    PdfUrl,
    IsActive,
    CreatedDate,
    CreatedBy
)
VALUES
(
    @Title,
    @Description,
    @PdfUrl,
    @IsActive,
    SYSUTCDATETIME(),
    @CreatedBy
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            sql,
            companyProfile);
    }

    public async Task UpdateAsync(CompanyProfile companyProfile)
    {
        const string sql = @"
UPDATE CompanyProfiles
SET
    Title = @Title,
    Description = @Description,
    PdfUrl = @PdfUrl,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME(),
    ModifiedBy = @ModifiedBy
WHERE CompanyProfileId = @CompanyProfileId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            companyProfile);
    }

    public async Task DeleteAsync(int companyProfileId)
    {
        const string sql = @"
DELETE FROM CompanyProfiles
WHERE CompanyProfileId = @CompanyProfileId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new { CompanyProfileId = companyProfileId });
    }
}