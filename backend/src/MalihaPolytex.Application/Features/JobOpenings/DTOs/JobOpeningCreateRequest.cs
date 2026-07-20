using System.ComponentModel.DataAnnotations;

namespace MalihaPolytex.Application.Features.JobOpenings.DTOs;

public class JobOpeningCreateRequest
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public int DepartmentId { get; set; }

    [MaxLength(200)]
    public string? JobLocation { get; set; }

    [MaxLength(100)]
    public string? EmploymentType { get; set; }

    public int? Vacancy { get; set; }

    [MaxLength(200)]
    public string? Experience { get; set; }

    [MaxLength(300)]
    public string? Education { get; set; }

    [MaxLength(200)]
    public string? Salary { get; set; }

    public DateTime? ApplicationDeadline { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;

    public string? Responsibilities { get; set; }

    public string? Requirements { get; set; }

    public string? Benefits { get; set; }

    [Range(1, int.MaxValue)]
    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;
}