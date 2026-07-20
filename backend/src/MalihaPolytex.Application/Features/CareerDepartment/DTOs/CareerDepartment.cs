using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.CareerDepartment;

public class UpdateCareerDepartmentRequest
{
    [Required]
    public int DepartmentId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}