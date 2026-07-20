using Backend.Entities;
using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface ICareerDepartmentRepository
{
    Task<IEnumerable<CareerDepartment>> GetAllAsync();

    Task<CareerDepartment?> GetByIdAsync(int departmentId);

    Task<int> CreateAsync(CareerDepartment careerDepartment);

    Task UpdateAsync(CareerDepartment careerDepartment);

    Task DeleteAsync(int departmentId);
}