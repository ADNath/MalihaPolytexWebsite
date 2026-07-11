using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.HeroSlides.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.HeroSlides;

public class HeroSlideService : IHeroSlideService
{
    private readonly IHeroSlideRepository _heroSlideRepository;

    public HeroSlideService(IHeroSlideRepository heroSlideRepository)
    {
        _heroSlideRepository = heroSlideRepository;
    }

    public async Task<IEnumerable<HeroSlideResponse>> GetAllAsync()
    {
        var heroSlides = await _heroSlideRepository.GetAllAsync();

        return heroSlides.Select(x => new HeroSlideResponse
        {
            HeroSlideId = x.HeroSlideId,
            Title = x.Title,
            Subtitle = x.Subtitle,
            Description = x.Description,
            ButtonText = x.ButtonText,
            ButtonUrl = x.ButtonUrl,
            DesktopImage = x.DesktopImage,
            MobileImage = x.MobileImage,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<HeroSlideResponse?> GetByIdAsync(int id)
    {
        var heroSlide = await _heroSlideRepository.GetByIdAsync(id);

        if (heroSlide is null)
            return null;

        return new HeroSlideResponse
        {
            HeroSlideId = heroSlide.HeroSlideId,
            Title = heroSlide.Title,
            Subtitle = heroSlide.Subtitle,
            Description = heroSlide.Description,
            ButtonText = heroSlide.ButtonText,
            ButtonUrl = heroSlide.ButtonUrl,
            DesktopImage = heroSlide.DesktopImage,
            MobileImage = heroSlide.MobileImage,
            DisplayOrder = heroSlide.DisplayOrder,
            IsActive = heroSlide.IsActive
        };
    }

    public async Task<int> CreateAsync(HeroSlideRequest request)
    {
        var heroSlide = new HeroSlide
        {
            Title = request.Title,
            Subtitle = request.Subtitle,
            Description = request.Description,
            ButtonText = request.ButtonText,
            ButtonUrl = request.ButtonUrl,
            DesktopImage = request.DesktopImage,
            MobileImage = request.MobileImage,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _heroSlideRepository.CreateAsync(heroSlide);
    }

    public async Task UpdateAsync(int id, HeroSlideRequest request)
    {
        var heroSlide = new HeroSlide
        {
            HeroSlideId = id,
            Title = request.Title,
            Subtitle = request.Subtitle,
            Description = request.Description,
            ButtonText = request.ButtonText,
            ButtonUrl = request.ButtonUrl,
            DesktopImage = request.DesktopImage,
            MobileImage = request.MobileImage,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _heroSlideRepository.UpdateAsync(heroSlide);
    }

    public async Task DeleteAsync(int id)
    {
        await _heroSlideRepository.DeleteAsync(id);
    }
}