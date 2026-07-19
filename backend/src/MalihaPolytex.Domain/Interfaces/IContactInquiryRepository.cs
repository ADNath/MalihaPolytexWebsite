using MalihaPolyTex.Api.Entities;

namespace MalihaPolyTex.Api.Repositories.Interfaces;

public interface IContactInquiryRepository
{
    Task<int> CreateAsync(ContactInquiry inquiry);

    Task<IEnumerable<ContactInquiry>> GetAllAsync();

    Task<ContactInquiry?> GetByIdAsync(int inquiryId);

    Task<bool> UpdateStatusAsync(int inquiryId, string status);

    Task<bool> DeleteAsync(int inquiryId);
}