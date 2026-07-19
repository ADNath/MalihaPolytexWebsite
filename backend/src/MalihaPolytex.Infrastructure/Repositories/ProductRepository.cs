using Dapper;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ProductRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        const string sql = @"
SELECT
    ProductId,
    Category,
    Name,
    Description,
    Image,
    Denier,
    CuttingLength,
    Color,
    DisplayOrder,
    IsActive,
    CreatedDate,
    CreatedBy,
    ModifiedDate,
    ModifiedBy
FROM Products
ORDER BY DisplayOrder, ProductId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<Product>(sql);
    }

    public async Task<IEnumerable<Product>> GetByCategoryAsync(string category)
    {
        const string sql = @"
SELECT
    ProductId,
    Category,
    Name,
    Description,
    Image,
    Denier,
    CuttingLength,
    Color,
    DisplayOrder,
    IsActive,
    CreatedDate,
    CreatedBy,
    ModifiedDate,
    ModifiedBy
FROM Products
WHERE Category = @Category
  AND IsActive = 1
ORDER BY DisplayOrder, ProductId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<Product>(
            sql,
            new { Category = category });
    }

    public async Task<Product?> GetByIdAsync(int productId)
    {
        const string sql = @"
SELECT
    ProductId,
    Category,
    Name,
    Description,
    Image,
    Denier,
    CuttingLength,
    Color,
    DisplayOrder,
    IsActive,
    CreatedDate,
    CreatedBy,
    ModifiedDate,
    ModifiedBy
FROM Products
WHERE ProductId = @ProductId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<Product>(
            sql,
            new { ProductId = productId });
    }

    public async Task<int> CreateAsync(Product product)
    {
        const string sql = @"
INSERT INTO Products
(
    Category,
    Name,
    Description,
    Image,
    Denier,
    CuttingLength,
    Color,
    DisplayOrder,
    IsActive,
    CreatedDate,
    CreatedBy
)
VALUES
(
    @Category,
    @Name,
    @Description,
    @Image,
    @Denier,
    @CuttingLength,
    @Color,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME(),
    @CreatedBy
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(sql, product);
    }

    public async Task UpdateAsync(Product product)
    {
        const string sql = @"
UPDATE Products
SET
    Category = @Category,
    Name = @Name,
    Description = @Description,
    Image = @Image,
    Denier = @Denier,
    CuttingLength = @CuttingLength,
    Color = @Color,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME(),
    ModifiedBy = @ModifiedBy
WHERE ProductId = @ProductId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, product);
    }

    public async Task DeleteAsync(int productId)
    {
        const string sql = @"
DELETE FROM Products
WHERE ProductId = @ProductId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            sql,
            new { ProductId = productId });
    }
}