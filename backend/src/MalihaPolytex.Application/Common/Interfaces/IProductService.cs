using MalihaPolytex.Application.Features.Products.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductResponse>> GetAllAsync();

    Task<IEnumerable<ProductResponse>> GetByCategoryAsync(string category);

    Task<ProductResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(ProductCreateRequest request,string createdBy);

    Task UpdateAsync(int id, ProductCreateRequest request,string updatedBy);

    Task DeleteAsync(int id);
}