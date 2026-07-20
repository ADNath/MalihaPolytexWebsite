using System.ComponentModel.DataAnnotations;

namespace MalihaPolytex.Application.Features.CareerDepartments.DTOs;

public class CareerDepartmentCreateRequest
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;
}