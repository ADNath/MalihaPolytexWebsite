using System.Text.Json;

using MalihaPolytex.Application.Common.Exceptions;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.HomepageContacts.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.HomepageContacts;

public class HomepageContactService : IHomepageContactService
{
    private readonly IHomepageContactRepository _repository;

    public HomepageContactService(
        IHomepageContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<HomepageContactResponse>> GetAllAsync()
    {
        var contacts = await _repository.GetAllAsync();

        return contacts.Select(contact => new HomepageContactResponse
        {
            HomepageContactId = contact.HomepageContactId,
            Title = contact.Title,
            Address = contact.Address,
            MapUrl = contact.MapUrl,
            Phones = Deserialize(contact.Phones),
            Emails = Deserialize(contact.Emails),
            OfficeHours = contact.OfficeHours,
            DisplayOrder = contact.DisplayOrder,
            IsActive = contact.IsActive
        });
    }

    public async Task<HomepageContactResponse?> GetByIdAsync(int homepageContactId)
    {
        var contact = await _repository.GetByIdAsync(homepageContactId);

        if (contact is null)
            throw new NotFoundException("Homepage contact not found.");

        return new HomepageContactResponse
        {
            HomepageContactId = contact.HomepageContactId,
            Title = contact.Title,
            Address = contact.Address,
            MapUrl = contact.MapUrl,
            Phones = Deserialize(contact.Phones),
            Emails = Deserialize(contact.Emails),
            OfficeHours = contact.OfficeHours,
            DisplayOrder = contact.DisplayOrder,
            IsActive = contact.IsActive
        };
    }

    public async Task<int> CreateAsync(HomepageContactRequest request)
    {
        var entity = new Domain.Entities.HomepageContact
        {
            Title = request.Title,
            Address = request.Address,
            MapUrl = request.MapUrl,
            Phones = JsonSerializer.Serialize(request.Phones),
            Emails = JsonSerializer.Serialize(request.Emails),
            OfficeHours = request.OfficeHours,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _repository.CreateAsync(entity);
    }

    public async Task UpdateAsync(
        int homepageContactId,
        HomepageContactRequest request)
    {
        var entity = await _repository.GetByIdAsync(homepageContactId);

        if (entity is null)
            throw new NotFoundException("Homepage contact not found.");

        entity.Title = request.Title;
        entity.Address = request.Address;
        entity.MapUrl = request.MapUrl;
        entity.Phones = JsonSerializer.Serialize(request.Phones);
        entity.Emails = JsonSerializer.Serialize(request.Emails);
        entity.OfficeHours = request.OfficeHours;
        entity.DisplayOrder = request.DisplayOrder;
        entity.IsActive = request.IsActive;

        await _repository.UpdateAsync(entity);
    }

    public async Task DeleteAsync(int homepageContactId)
    {
        var entity = await _repository.GetByIdAsync(homepageContactId);

        if (entity is null)
            throw new NotFoundException("Homepage contact not found.");

        await _repository.DeleteAsync(homepageContactId);
    }

    private static List<string> Deserialize(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return [];
        }

        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? [];
        }
        catch
        {
            return [];
        }
    }
}