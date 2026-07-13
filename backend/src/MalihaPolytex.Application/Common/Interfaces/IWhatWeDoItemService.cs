using MalihaPolytex.Application.Features.WhatWeDoItems.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IWhatWeDoItemService
{
    Task<IEnumerable<WhatWeDoItemResponse>> GetAllAsync();

    Task<WhatWeDoItemResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(WhatWeDoItemRequest request);

    Task UpdateAsync(int id, WhatWeDoItemRequest request);

    Task DeleteAsync(int id);
}