using MalihaPolytex.Application.Common.Models;
using MalihaPolytex.Application.Common.Responses;
using MalihaPolytex.Application.DTOs.GeneralCertificates;
using MalihaPolytex.Application.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Services;

public class GeneralCertificateService : IGeneralCertificateService
{
    private readonly IGeneralCertificateRepository _repository;

    public GeneralCertificateService(
        IGeneralCertificateRepository repository)
    {
        _repository = repository;
    }

    public async Task<ApiResponse<IEnumerable<GeneralCertificateResponse>>> GetAllAsync()
    {
        var certificates = await _repository.GetAllAsync();

        var result = certificates
            .OrderBy(x => x.DisplayOrder)
            .Select(x => new GeneralCertificateResponse
            {
                GeneralCertificateId = x.GeneralCertificateId,
                Title = x.Title,
                Description = x.Description,
                Image = x.Image,
                DisplayOrder = x.DisplayOrder,
                IsActive = x.IsActive,
                CreatedAt = x.CreatedAt,
                CreatedBy = x.CreatedBy,
                UpdatedAt = x.UpdatedAt,
                UpdatedBy = x.UpdatedBy
            });

        return ApiResponse<IEnumerable<GeneralCertificateResponse>>
            .SuccessResponse(result);
    }

    public async Task<ApiResponse<GeneralCertificateResponse?>> GetByIdAsync(
        int generalCertificateId)
    {
        var certificate = await _repository.GetByIdAsync(generalCertificateId);

        if (certificate is null)
        {
            return ApiResponse<GeneralCertificateResponse?>
                .FailureResponse("General certificate not found.");
        }

        var response = new GeneralCertificateResponse
        {
            GeneralCertificateId = certificate.GeneralCertificateId,
            Title = certificate.Title,
            Description = certificate.Description,
            Image = certificate.Image,
            DisplayOrder = certificate.DisplayOrder,
            IsActive = certificate.IsActive,
            CreatedAt = certificate.CreatedAt,
            CreatedBy = certificate.CreatedBy,
            UpdatedAt = certificate.UpdatedAt,
            UpdatedBy = certificate.UpdatedBy
        };

        return ApiResponse<GeneralCertificateResponse?>
            .SuccessResponse(response);
    }

    public async Task<ApiResponse<int>> CreateAsync(
    CreateGeneralCertificateRequest request)
    {

        var certificate = new GeneralCertificate
        {
            Title = request.Title,
            Description = request.Description,
            Image = request.Image,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = request.CreatedBy
        };

        var id = await _repository.CreateAsync(certificate);

        return ApiResponse<int>.SuccessResponse(
            id,
            "General certificate created successfully.");
    }

    public async Task<ApiResponse<bool>> UpdateAsync(
        int generalCertificateId,
        UpdateGeneralCertificateRequest request)
    {
        var certificate = await _repository.GetByIdAsync(generalCertificateId);

        if (certificate is null)
        {
            return ApiResponse<bool>.FailureResponse(
                "General certificate not found.");
        }

        

        certificate.Title = request.Title;
        certificate.Description = request.Description;
        certificate.Image = request.Image;
        certificate.DisplayOrder = request.DisplayOrder;
        certificate.IsActive = request.IsActive;
        certificate.UpdatedAt = DateTime.UtcNow;
        certificate.UpdatedBy = request.UpdatedBy;

        await _repository.UpdateAsync(certificate);

        return ApiResponse<bool>.SuccessResponse(
            true,
            "General certificate updated successfully.");
    }

    public async Task<ApiResponse<bool>> DeleteAsync(
        int generalCertificateId)
    {
        var certificate = await _repository.GetByIdAsync(generalCertificateId);

        if (certificate is null)
        {
            return ApiResponse<bool>.FailureResponse(
                "General certificate not found.");
        }

        await _repository.DeleteAsync(generalCertificateId);

        return ApiResponse<bool>.SuccessResponse(
            true,
            "General certificate deleted successfully.");
    }
}