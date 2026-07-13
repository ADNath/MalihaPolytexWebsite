using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.CompanyVideos.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.CompanyVideos;

public class CompanyVideoService : ICompanyVideoService
{
    private readonly ICompanyVideoRepository _companyVideoRepository;

    public CompanyVideoService(ICompanyVideoRepository companyVideoRepository)
    {
        _companyVideoRepository = companyVideoRepository;
    }

    public async Task<IEnumerable<CompanyVideoResponse>> GetAllAsync()
    {
        var companyVideos = await _companyVideoRepository.GetAllAsync();

        return companyVideos.Select(x => new CompanyVideoResponse
        {
            CompanyVideoId = x.CompanyVideoId,
            Title = x.Title,
            Description = x.Description,
            VideoUrl = x.VideoUrl,
            VideoThumbnail = x.VideoThumbnail,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<CompanyVideoResponse?> GetByIdAsync(int id)
    {
        var companyVideo = await _companyVideoRepository.GetByIdAsync(id);

        if (companyVideo is null)
            return null;

        return new CompanyVideoResponse
        {
            CompanyVideoId = companyVideo.CompanyVideoId,
            Title = companyVideo.Title,
            Description = companyVideo.Description,
            VideoUrl = companyVideo.VideoUrl,
            VideoThumbnail = companyVideo.VideoThumbnail,
            DisplayOrder = companyVideo.DisplayOrder,
            IsActive = companyVideo.IsActive
        };
    }

    public async Task<int> CreateAsync(CompanyVideoRequest request)
    {
        var companyVideo = new CompanyVideo
        {
            Title = request.Title,
            Description = request.Description,
            VideoUrl = request.VideoUrl,
            VideoThumbnail = request.VideoThumbnail,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _companyVideoRepository.CreateAsync(companyVideo);
    }

    public async Task UpdateAsync(int id, CompanyVideoRequest request)
    {
        var companyVideo = new CompanyVideo
        {
            CompanyVideoId = id,
            Title = request.Title,
            Description = request.Description,
            VideoUrl = request.VideoUrl,
            VideoThumbnail = request.VideoThumbnail,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _companyVideoRepository.UpdateAsync(companyVideo);
    }

    public async Task DeleteAsync(int id)
    {
        await _companyVideoRepository.DeleteAsync(id);
    }
}