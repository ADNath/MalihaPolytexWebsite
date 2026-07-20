namespace MalihaPolytex.Domain.Entities;

public class JobApplication
{
    public int JobApplicationId { get; set; }

    public int JobId { get; set; }

    public string JobTitle { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string? Address { get; set; }

    public string? HighestEducation { get; set; }

    public decimal? YearsOfExperience { get; set; }

    public string? CurrentCompany { get; set; }

    public string? CurrentDesignation { get; set; }

    public string? ExpectedSalary { get; set; }

    public string? CoverLetter { get; set; }

    public string ResumeFile { get; set; } = string.Empty;

    public byte StatusId { get; set; }

    public string? Remarks { get; set; }

    public DateTime AppliedDate { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }
    public string StatusName { get; set; } = string.Empty;
}