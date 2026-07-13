using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.WhatWeDoItems.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.WhatWeDoItems;

public class WhatWeDoItemService : IWhatWeDoItemService
{
    private readonly IWhatWeDoItemRepository _whatWeDoItemRepository;

    public WhatWeDoItemService(IWhatWeDoItemRepository whatWeDoItemRepository)
    {
        _whatWeDoItemRepository = whatWeDoItemRepository;
    }

    public async Task<IEnumerable<WhatWeDoItemResponse>> GetAllAsync()
    {
        var items = await _whatWeDoItemRepository.GetAllAsync();

        return items.Select(x => new WhatWeDoItemResponse
        {
            WhatWeDoItemId = x.WhatWeDoItemId,
            Title = x.Title,
            Description = x.Description,
            Icon = x.Icon,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<WhatWeDoItemResponse?> GetByIdAsync(int id)
    {
        var item = await _whatWeDoItemRepository.GetByIdAsync(id);

        if (item is null)
            return null;

        return new WhatWeDoItemResponse
        {
            WhatWeDoItemId = item.WhatWeDoItemId,
            Title = item.Title,
            Description = item.Description,
            Icon = item.Icon,
            DisplayOrder = item.DisplayOrder,
            IsActive = item.IsActive
        };
    }

    public async Task<int> CreateAsync(WhatWeDoItemRequest request)
    {
        var item = new WhatWeDoItem
        {
            Title = request.Title,
            Description = request.Description,
            Icon = request.Icon,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _whatWeDoItemRepository.CreateAsync(item);
    }

    public async Task UpdateAsync(int id, WhatWeDoItemRequest request)
    {
        var item = new WhatWeDoItem
        {
            WhatWeDoItemId = id,
            Title = request.Title,
            Description = request.Description,
            Icon = request.Icon,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _whatWeDoItemRepository.UpdateAsync(item);
    }

    public async Task DeleteAsync(int id)
    {
        await _whatWeDoItemRepository.DeleteAsync(id);
    }
}