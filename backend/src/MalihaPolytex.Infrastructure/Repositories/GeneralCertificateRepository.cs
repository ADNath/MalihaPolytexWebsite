using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class GeneralCertificateRepository : IGeneralCertificateRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public GeneralCertificateRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<GeneralCertificate>> GetAllAsync()
    {
        const string sql = @"
SELECT
    GeneralCertificateId,
    Title,
    Description,
    Image,
    DisplayOrder,
    IsActive,
    CreatedAt,
    CreatedBy,
    UpdatedAt,
    UpdatedBy
FROM GeneralCertificates
ORDER BY DisplayOrder, GeneralCertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<GeneralCertificate>(sql);
    }

    public async Task<GeneralCertificate?> GetByIdAsync(
        int generalCertificateId)
    {
        const string sql = @"
SELECT
    GeneralCertificateId,
    Title,
    Description,
    Image,
    DisplayOrder,
    IsActive,
    CreatedAt,
    CreatedBy,
    UpdatedAt,
    UpdatedBy
FROM GeneralCertificates
WHERE GeneralCertificateId = @GeneralCertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<GeneralCertificate>(
            sql,
            new
            {
                GeneralCertificateId = generalCertificateId
            });
    }

    public async Task<int> CreateAsync(
        GeneralCertificate generalCertificate)
    {
        const string sql = @"
INSERT INTO GeneralCertificates
(
    Title,
    Description,
    Image,
    DisplayOrder,
    IsActive,
    CreatedAt,
    CreatedBy
)
VALUES
(
    @Title,
    @Description,
    @Image,
    @DisplayOrder,
    @IsActive,
    @CreatedAt,
    @CreatedBy
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            sql,
            generalCertificate);
    }

    public async Task UpdateAsync(
    GeneralCertificate generalCertificate)
    {
        const string sql = @"
UPDATE GeneralCertificates
SET
    Title = @Title,
    Description = @Description,
    Image = @Image,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    UpdatedAt = @UpdatedAt,
    UpdatedBy = @UpdatedBy
WHERE GeneralCertificateId = @GeneralCertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            generalCertificate);
    }

    public async Task DeleteAsync(
        int generalCertificateId)
    {
        const string sql = @"
DELETE FROM GeneralCertificates
WHERE GeneralCertificateId = @GeneralCertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new
            {
                GeneralCertificateId = generalCertificateId
            });
    }
}