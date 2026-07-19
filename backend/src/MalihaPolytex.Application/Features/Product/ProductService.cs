using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.Products.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.Products;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductResponse>> GetAllAsync()
    {
        var products = await _productRepository.GetAllAsync();

        return products.Select(x => new ProductResponse
        {
            ProductId = x.ProductId,
            Category = x.Category,
            Name = x.Name,
            Description = x.Description,
            Image = x.Image,
            Denier = x.Denier,
            CuttingLength = x.CuttingLength,
            Color = x.Color,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<IEnumerable<ProductResponse>> GetByCategoryAsync(string category)
    {
        var products = await _productRepository.GetByCategoryAsync(category);

        return products.Select(x => new ProductResponse
        {
            ProductId = x.ProductId,
            Category = x.Category,
            Name = x.Name,
            Description = x.Description,
            Image = x.Image,
            Denier = x.Denier,
            CuttingLength = x.CuttingLength,
            Color = x.Color,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive
        });
    }

    public async Task<ProductResponse?> GetByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);

        if (product is null)
            return null;

        return new ProductResponse
        {
            ProductId = product.ProductId,
            Category = product.Category,
            Name = product.Name,
            Description = product.Description,
            Image = product.Image,
            Denier = product.Denier,
            CuttingLength = product.CuttingLength,
            Color = product.Color,
            DisplayOrder = product.DisplayOrder,
            IsActive = product.IsActive
        };
    }

    public async Task<int> CreateAsync(ProductCreateRequest request,string createdBy)
    {
        var product = new Product
        {
            Category = request.Category,
            Name = request.Name,
            Description = request.Description,
            Image = request.Image,
            Denier = request.Denier,
            CuttingLength = request.CuttingLength,
            Color = request.Color,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedBy = createdBy
        };

        return await _productRepository.CreateAsync(product);
    }

    public async Task UpdateAsync(int id, ProductCreateRequest request,string updatedBy)
    {
        var product = new Product
        {
            ProductId = id,
            Category = request.Category,
            Name = request.Name,
            Description = request.Description,
            Image = request.Image,
            Denier = request.Denier,
            CuttingLength = request.CuttingLength,
            Color = request.Color,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            ModifiedBy = updatedBy
        };

        await _productRepository.UpdateAsync(product);
    }

    public async Task DeleteAsync(int id)
    {
        await _productRepository.DeleteAsync(id);
    }
}