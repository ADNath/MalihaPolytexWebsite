using MalihaPolytex.Application.Common.Models;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.DTOs.GeneralCertificates;

namespace MalihaPolytex.Application.Interfaces;

public interface IGeneralCertificateService
{
    Task<ApiResponse<IEnumerable<GeneralCertificateResponse>>> GetAllAsync();

    Task<ApiResponse<GeneralCertificateResponse?>> GetByIdAsync(int generalCertificateId);

    Task<ApiResponse<int>> CreateAsync(CreateGeneralCertificateRequest request);

    Task<ApiResponse<bool>> UpdateAsync(
        int generalCertificateId,
        UpdateGeneralCertificateRequest request);

    Task<ApiResponse<bool>> DeleteAsync(int generalCertificateId);
}