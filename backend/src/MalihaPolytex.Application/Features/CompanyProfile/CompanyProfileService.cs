
using MalihaPolytex.Application.Common.Exceptions;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.CompanyProfiles.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace Application.Services;

public class CompanyProfileService : ICompanyProfileService
{
    private readonly ICompanyProfileRepository _companyProfileRepository;

    public CompanyProfileService(
        ICompanyProfileRepository companyProfileRepository)
    {
        _companyProfileRepository = companyProfileRepository;
    }

    public async Task<IEnumerable<CompanyProfileResponse>> GetAllAsync()
    {
        var companyProfiles = await _companyProfileRepository.GetAllAsync();

        return companyProfiles.Select(x => new CompanyProfileResponse
        {
            CompanyProfileId = x.CompanyProfileId,
            Title = x.Title,
            Description = x.Description,
            PdfUrl = x.PdfUrl,
            UpdatedAt = x.ModifiedDate ?? x.CreatedDate,
            IsActive = x.IsActive
        });
    }

    public async Task<CompanyProfileResponse?> GetByIdAsync(int companyProfileId)
    {
        var companyProfile = await _companyProfileRepository.GetByIdAsync(companyProfileId);

        if (companyProfile is null)
            throw new NotFoundException("Company profile not found.");

        return new CompanyProfileResponse
        {
            CompanyProfileId = companyProfile.CompanyProfileId,
            Title = companyProfile.Title,
            Description = companyProfile.Description,
            PdfUrl = companyProfile.PdfUrl,
            UpdatedAt = companyProfile.ModifiedDate ?? companyProfile.CreatedDate,
            IsActive = companyProfile.IsActive
        };
    }

    public async Task<int> CreateAsync(CompanyProfileRequest request)
    {
        var companyProfile = new CompanyProfile
        {
            Title = request.Title,
            Description = request.Description,
            PdfUrl = request.PdfUrl,
            IsActive = request.IsActive
        };

        return await _companyProfileRepository.CreateAsync(companyProfile);
    }

    public async Task UpdateAsync(
        int companyProfileId,
        CompanyProfileRequest request)
    {
        var companyProfile = await _companyProfileRepository.GetByIdAsync(companyProfileId);

        if (companyProfile is null)
            throw new NotFoundException("Company profile not found.");

        companyProfile.Title = request.Title;
        companyProfile.Description = request.Description;
        companyProfile.PdfUrl = request.PdfUrl;
        companyProfile.IsActive = request.IsActive;

        await _companyProfileRepository.UpdateAsync(companyProfile);
    }

    public async Task DeleteAsync(int companyProfileId)
    {
        var companyProfile = await _companyProfileRepository.GetByIdAsync(companyProfileId);

        if (companyProfile is null)
            throw new NotFoundException("Company profile not found.");

        await _companyProfileRepository.DeleteAsync(companyProfileId);
    }
}