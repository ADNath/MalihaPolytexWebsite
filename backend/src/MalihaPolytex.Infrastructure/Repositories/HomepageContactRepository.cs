using Dapper;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class HomepageContactRepository : IHomepageContactRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public HomepageContactRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<HomepageContact>> GetAllAsync()
    {
        const string sql = """
            SELECT
                HomepageContactId,
                Title,
                Phones,
                Emails,
                DisplayOrder,
                IsActive,
                CreatedAt,
                CreatedBy,
                UpdatedAt,
                UpdatedBy
            FROM HomepageContacts
            ORDER BY DisplayOrder, HomepageContactId;
            """;

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<HomepageContact>(sql);
    }

    public async Task<HomepageContact?> GetByIdAsync(int homepageContactId)
    {
        const string sql = """
            SELECT
                HomepageContactId,
                Title,
                Phones,
                Emails,
                DisplayOrder,
                IsActive,
                CreatedAt,
                CreatedBy,
                UpdatedAt,
                UpdatedBy
            FROM HomepageContacts
            WHERE HomepageContactId = @HomepageContactId;
            """;

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<HomepageContact>(
            sql,
            new
            {
                HomepageContactId = homepageContactId
            });
    }

    public async Task<int> CreateAsync(HomepageContact homepageContact)
    {
        const string sql = """
            INSERT INTO HomepageContacts
            (
                Title,
                Phones,
                Emails,
                DisplayOrder,
                IsActive,
                CreatedAt,
                CreatedBy
            )
            VALUES
            (
                @Title,
                @Phones,
                @Emails,
                @DisplayOrder,
                @IsActive,
                GETDATE(),
                @CreatedBy
            );

            SELECT CAST(SCOPE_IDENTITY() AS INT);
            """;

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            sql,
            homepageContact);
    }

    public async Task UpdateAsync(HomepageContact homepageContact)
    {
        const string sql = """
            UPDATE HomepageContacts
            SET
                Title = @Title,
                Phones = @Phones,
                Emails = @Emails,
                DisplayOrder = @DisplayOrder,
                IsActive = @IsActive,
                UpdatedAt = GETDATE(),
                UpdatedBy = @UpdatedBy
            WHERE HomepageContactId = @HomepageContactId;
            """;

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            homepageContact);
    }

    public async Task DeleteAsync(int homepageContactId)
    {
        const string sql = """
            DELETE FROM HomepageContacts
            WHERE HomepageContactId = @HomepageContactId;
            """;

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new
            {
                HomepageContactId = homepageContactId
            });
    }
}