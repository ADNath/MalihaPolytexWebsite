using Backend.DTOs.CareerDepartment;
using Backend.Entities;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Features.CareerDepartments.DTOs;
using MalihaPolytex.Domain.Entities;
using MalihaPolytex.Domain.Interfaces;

namespace MalihaPolytex.Application.Features.CareerDepartments;

public class CareerDepartmentService : ICareerDepartmentService
{
    private readonly ICareerDepartmentRepository _careerDepartmentRepository;

    public CareerDepartmentService(
        ICareerDepartmentRepository careerDepartmentRepository)
    {
        _careerDepartmentRepository = careerDepartmentRepository;
    }

    public async Task<IEnumerable<CareerDepartmentResponse>> GetAllAsync()
    {
        var departments = await _careerDepartmentRepository.GetAllAsync();

        return departments.Select(x => new CareerDepartmentResponse
        {
            DepartmentId = x.DepartmentId,
            Name = x.Name,
            DisplayOrder = x.DisplayOrder,
            IsActive = x.IsActive,
            CreatedDate = x.CreatedDate,
            CreatedBy = x.CreatedBy,
            ModifiedDate = x.ModifiedDate,
            ModifiedBy = x.ModifiedBy
        });
    }

    public async Task<CareerDepartmentResponse?> GetByIdAsync(int id)
    {
        var department = await _careerDepartmentRepository.GetByIdAsync(id);

        if (department is null)
            return null;

        return new CareerDepartmentResponse
        {
            DepartmentId = department.DepartmentId,
            Name = department.Name,
            DisplayOrder = department.DisplayOrder,
            IsActive = department.IsActive,
            CreatedDate = department.CreatedDate,
            CreatedBy = department.CreatedBy,
            ModifiedDate = department.ModifiedDate,
            ModifiedBy = department.ModifiedBy
        };
    }

    public async Task<int> CreateAsync(CareerDepartmentCreateRequest request)
    {
        var department = new CareerDepartment
        {
            Name = request.Name,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        return await _careerDepartmentRepository.CreateAsync(department);
    }

    public async Task UpdateAsync(int id, CareerDepartmentCreateRequest request)
    {
        var department = new CareerDepartment
        {
            DepartmentId = id,
            Name = request.Name,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };

        await _careerDepartmentRepository.UpdateAsync(department);
    }

    public async Task DeleteAsync(int id)
    {
        await _careerDepartmentRepository.DeleteAsync(id);
    }
}