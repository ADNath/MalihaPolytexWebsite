using MalihaPolytex.Application.Common.Responses;
using MalihaPolyTex.Api.Models;
using MalihaPolyTex.Api.Models.ContactInquiry;

namespace MalihaPolyTex.Api.Services.Interfaces;

public interface IContactInquiryService
{
    Task<int> CreateAsync(ContactInquiryRequest request, string? ipAddress);

    Task<IEnumerable<ContactInquiryResponse>> GetAllAsync();

    Task<ContactInquiryResponse?> GetByIdAsync(int id);

    Task UpdateStatusAsync(int id, UpdateContactInquiryStatusRequest request);

    Task DeleteAsync(int id);
}