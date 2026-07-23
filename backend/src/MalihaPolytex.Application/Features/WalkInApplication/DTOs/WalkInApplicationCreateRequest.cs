namespace MalihaPolytex.Application.Features.WalkInApplications.DTOs;

public class WalkInApplicationCreateRequest
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string? Address { get; set; }

    public string? HighestEducation { get; set; }

    public int? YearsOfExperience { get; set; }

    public string? CurrentCompany { get; set; }

    public string? CurrentDesignation { get; set; }

    public string? ExpectedSalary { get; set; }

    public string? CoverLetter { get; set; }

    public string ResumeFile { get; set; } = string.Empty;
}