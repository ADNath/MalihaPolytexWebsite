using Dapper;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Infrastructure.Repositories;

public class HeroSlideRepository : IHeroSlideRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public HeroSlideRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<HeroSlide>> GetAllAsync()
    {
        const string sql = @"
SELECT *
FROM HeroSlides
ORDER BY DisplayOrder;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<HeroSlide>(sql);
    }

    public async Task<HeroSlide?> GetByIdAsync(int heroSlideId)
    {
        const string sql = @"
SELECT *
FROM HeroSlides
WHERE HeroSlideId = @HeroSlideId;";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<HeroSlide>(
            sql,
            new { HeroSlideId = heroSlideId });
    }

    public async Task<int> CreateAsync(HeroSlide heroSlide)
    {
        const string sql = @"
INSERT INTO HeroSlides
(
    Title,
    Subtitle,
    Description,
    ButtonText,
    ButtonUrl,
    DesktopImage,
    MobileImage,
    DisplayOrder,
    IsActive,
    CreatedDate
)
VALUES
(
    @Title,
    @Subtitle,
    @Description,
    @ButtonText,
    @ButtonUrl,
    @DesktopImage,
    @MobileImage,
    @DisplayOrder,
    @IsActive,
    SYSUTCDATETIME()
);

SELECT CAST(SCOPE_IDENTITY() AS INT);";

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(sql, heroSlide);
    }

    public async Task UpdateAsync(HeroSlide heroSlide)
    {
        const string sql = @"
UPDATE HeroSlides
SET
    Title = @Title,
    Subtitle = @Subtitle,
    Description = @Description,
    ButtonText = @ButtonText,
    ButtonUrl = @ButtonUrl,
    DesktopImage = @DesktopImage,
    MobileImage = @MobileImage,
    DisplayOrder = @DisplayOrder,
    IsActive = @IsActive,
    ModifiedDate = SYSUTCDATETIME()
WHERE HeroSlideId = @HeroSlideId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, heroSlide);
    }

    public async Task DeleteAsync(int heroSlideId)
    {
        const string sql = @"
DELETE FROM HeroSlides
WHERE HeroSlideId = @HeroSlideId;";

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(sql, new { HeroSlideId = heroSlideId });
    }
}