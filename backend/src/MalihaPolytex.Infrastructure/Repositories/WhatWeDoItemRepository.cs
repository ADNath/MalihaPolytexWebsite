using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class WhatWeDoItemRepository : IWhatWeDoItemRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public WhatWeDoItemRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<WhatWeDoItem>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM WhatWeDoItems
ORDER BY DisplayOrder;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<WhatWeDoItem>(sql);
    }

    public async Task<WhatWeDoItem?> GetByIdAsync(int whatWeDoItemId)
    {
        const string sql = @"
SELECT *
FROM WhatWeDoItems
WHERE WhatWeDoItemId = @WhatWeDoItemId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<WhatWeDoItem>(
            sql,
            new
            {
                WhatWeDoItemId = whatWeDoItemId
            });
    }

    public async Task<int> CreateAsync(WhatWeDoItem whatWeDoItem)
    {
        const string sql = @"
INSERT INTO WhatWeDoItems
(
    Title,
    Description,
    Icon,
    DisplayOrder,
    IsActive,
    CreatedDate
)
VALUES
(
    @Title,
    @Description,
    @Icon,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME()
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(sql, whatWeDoItem);
    }

    public async Task UpdateAsync(WhatWeDoItem whatWeDoItem)
    {
        const string sql = @"
UPDATE WhatWeDoItems
SET
    Title = @Title,
    Description = @Description,
    Icon = @Icon,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME()
WHERE WhatWeDoItemId = @WhatWeDoItemId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, whatWeDoItem);
    }

    public async Task DeleteAsync(int whatWeDoItemId)
    {
        const string sql = @"
DELETE FROM WhatWeDoItems
WHERE WhatWeDoItemId = @WhatWeDoItemId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new
            {
                WhatWeDoItemId = whatWeDoItemId
            });
    }
}