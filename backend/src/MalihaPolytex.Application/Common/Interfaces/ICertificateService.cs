using MalihaPolytex.Application.Features.Certificates.DTOs;
using System.Security.Cryptography.X509Certificates;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface ICertificateService
{
    Task<IEnumerable<CertificateResponse>> GetAllAsync();

    Task<CertificateResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(CertificateCreateRequest request);

    Task UpdateAsync(int id, CertificateCreateRequest request);

    Task DeleteAsync(int id);
}