using MalihaPolytex.Application.Features.HeroSlides.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IHeroSlideService
{
    Task<IEnumerable<HeroSlideResponse>> GetAllAsync();

    Task<HeroSlideResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(HeroSlideRequest request);

    Task UpdateAsync(int id, HeroSlideRequest request);

    Task DeleteAsync(int id);
}