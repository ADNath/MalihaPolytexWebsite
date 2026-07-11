using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IHeroSlideRepository
{
    Task<IEnumerable<HeroSlide>> GetAllAsync();

    Task<HeroSlide?> GetByIdAsync(int heroSlideId);

    Task<int> CreateAsync(HeroSlide heroSlide);

    Task UpdateAsync(HeroSlide heroSlide);

    Task DeleteAsync(int heroSlideId);
}