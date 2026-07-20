using Backend.DTOs.CareerDepartment;
using MalihaPolytex.Application.Features.CareerDepartments.DTOs;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface ICareerDepartmentService
{
    Task<IEnumerable<CareerDepartmentResponse>> GetAllAsync();

    Task<CareerDepartmentResponse?> GetByIdAsync(int id);

    Task<int> CreateAsync(CareerDepartmentCreateRequest request);

    Task UpdateAsync(int id, CareerDepartmentCreateRequest request);

    Task DeleteAsync(int id);
}