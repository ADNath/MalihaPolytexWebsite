using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();

    Task<IEnumerable<Product>> GetByCategoryAsync(string category);

    Task<Product?> GetByIdAsync(int productId);

    Task<int> CreateAsync(Product product);

    Task UpdateAsync(Product product);

    Task DeleteAsync(int productId);
}