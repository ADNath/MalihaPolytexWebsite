using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class CertificateRepository : ICertificateRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CertificateRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Certificate>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM Certificates
ORDER BY DisplayOrder;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<Certificate>(sql);
    }

    public async Task<Certificate?> GetByIdAsync(int certificateId)
    {
        const string sql = @"
SELECT *
FROM Certificates
WHERE CertificateId = @CertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<Certificate>(
            sql,
            new { CertificateId = certificateId });
    }

    public async Task<int> CreateAsync(Certificate certificate)
    {
        const string sql = @"
INSERT INTO Certificates
(
    Title,
    Description,
    Image,
    DisplayOrder,
    IsActive,
    CreatedDate
)
VALUES
(
    @Title,
    @Description,
    @Image,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME()
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            sql,
            certificate);
    }

    public async Task UpdateAsync(Certificate certificate)
    {
        const string sql = @"
UPDATE Certificates
SET
    Title = @Title,
    Description = @Description,
    Image = @Image,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME()
WHERE CertificateId = @CertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, certificate);
    }

    public async Task DeleteAsync(int certificateId)
    {
        const string sql = @"
DELETE FROM Certificates
WHERE CertificateId = @CertificateId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new { CertificateId = certificateId });
    }
}