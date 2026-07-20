namespace MalihaPolytex.Domain.Entities;

public class JobOpening
{
    public int JobId { get; set; }

    public string Title { get; set; } = string.Empty;

    public int DepartmentId { get; set; }

    public string? DepartmentName { get; set; }

    public string? JobLocation { get; set; }

    public string? EmploymentType { get; set; }

    public int? Vacancy { get; set; }

    public string? Experience { get; set; }

    public string? Education { get; set; }

    public string? Salary { get; set; }

    public DateTime? ApplicationDeadline { get; set; }

    public string Description { get; set; } = string.Empty;

    public string? Responsibilities { get; set; }

    public string? Requirements { get; set; }

    public string? Benefits { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
}