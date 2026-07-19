using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;
using MalihaPolyTex.Api.Entities;
using MalihaPolyTex.Api.Models.ContactInquiry;
using MalihaPolyTex.Api.Repositories.Interfaces;
using MalihaPolyTex.Api.Services.Interfaces;

namespace MalihaPolytex.Application.Features.ContactInquiries;

public class ContactInquiryService : IContactInquiryService
{
    private readonly IContactInquiryRepository _contactInquiryRepository;

    public ContactInquiryService(IContactInquiryRepository contactInquiryRepository)
    {
        _contactInquiryRepository = contactInquiryRepository;
    }

    public async Task<IEnumerable<ContactInquiryResponse>> GetAllAsync()
    {
        var inquiries = await _contactInquiryRepository.GetAllAsync();

        return inquiries.Select(x => new ContactInquiryResponse
        {
            InquiryId = x.InquiryId,
            Name = x.Name,
            Company = x.Company,
            Email = x.Email,
            Phone = x.Phone,
            Subject = x.Subject,
            Message = x.Message,
            Status = x.Status,
            CreatedAt = x.CreatedAt,
            UpdatedAt = x.UpdatedAt
        });
    }

    public async Task<ContactInquiryResponse?> GetByIdAsync(int id)
    {
        var inquiry = await _contactInquiryRepository.GetByIdAsync(id);

        if (inquiry is null)
            return null;

        return new ContactInquiryResponse
        {
            InquiryId = inquiry.InquiryId,
            Name = inquiry.Name,
            Company = inquiry.Company,
            Email = inquiry.Email,
            Phone = inquiry.Phone,
            Subject = inquiry.Subject,
            Message = inquiry.Message,
            Status = inquiry.Status,
            CreatedAt = inquiry.CreatedAt,
            UpdatedAt = inquiry.UpdatedAt
        };
    }

    public async Task<int> CreateAsync(
        ContactInquiryRequest request,
        string? ipAddress)
    {
        var inquiry = new ContactInquiry
        {
            Name = request.Name,
            Company = request.Company,
            Email = request.Email,
            Phone = request.Phone,
            Subject = request.Subject,
            Message = request.Message,
            Status = "New",
            IpAddress = ipAddress
        };

        return await _contactInquiryRepository.CreateAsync(inquiry);
    }

    public async Task UpdateStatusAsync(
        int id,
        UpdateContactInquiryStatusRequest request)
    {

        await _contactInquiryRepository.UpdateStatusAsync(id, request.Status);
    }

    public async Task DeleteAsync(int id)
    {
        await _contactInquiryRepository.DeleteAsync(id);
    }
}