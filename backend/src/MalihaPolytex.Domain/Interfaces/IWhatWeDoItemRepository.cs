using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IWhatWeDoItemRepository
{
    Task<IEnumerable<WhatWeDoItem>> GetAllAsync();

    Task<WhatWeDoItem?> GetByIdAsync(int whatWeDoItemId);

    Task<int> CreateAsync(WhatWeDoItem whatWeDoItem);

    Task UpdateAsync(WhatWeDoItem whatWeDoItem);

    Task DeleteAsync(int whatWeDoItemId);
}