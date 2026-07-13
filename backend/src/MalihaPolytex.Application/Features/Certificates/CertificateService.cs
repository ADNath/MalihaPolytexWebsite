using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.Certificates.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.Certificates;

public class CertificateService : ICertificateService
{
    private readonly ICertificateRepository _certificateRepository;

    public CertificateService(ICertificateRepository certificateRepository)
    {
        _certificateRepository = certificateRepository;
    }

    public async Task<IEnumerable<CertificateResponse>> GetAllAsync()
    {
        var certificates = await _certificateRepository.GetAllAsync();

        return certificates.Select(x => new CertificateResponse
        {
            CertificateId = x.CertificateId,
            Title = x.Title,
            Description = x.Description,
            Image = x.Image,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<CertificateResponse?> GetByIdAsync(int id)
    {
        var certificate = await _certificateRepository.GetByIdAsync(id);

        if (certificate is null)
            return null;

        return new CertificateResponse
        {
            CertificateId = certificate.CertificateId,
            Title = certificate.Title,
            Description = certificate.Description,
            Image = certificate.Image,
            DisplayOrder = certificate.DisplayOrder,
            IsActive = certificate.IsActive
        };
    }

    public async Task<int> CreateAsync(CertificateCreateRequest request)
    {
        var certificate = new Certificate
        {
            Title = request.Title,
            Description = request.Description,
            Image = request.Image,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _certificateRepository.CreateAsync(certificate);
    }

    public async Task UpdateAsync(int id, CertificateCreateRequest request)
    {
        var certificate = new Certificate
        {
            CertificateId = id,
            Title = request.Title,
            Description = request.Description,
            Image = request.Image,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _certificateRepository.UpdateAsync(certificate);
    }

    public async Task DeleteAsync(int id)
    {
        await _certificateRepository.DeleteAsync(id);
    }
}