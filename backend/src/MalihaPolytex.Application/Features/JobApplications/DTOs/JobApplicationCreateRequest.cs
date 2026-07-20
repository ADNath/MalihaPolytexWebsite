using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace MalihaPolytex.Application.Features.JobApplications.DTOs;

public class JobApplicationCreateRequest
{
    [Required]
    public int JobId { get; set; }

    [Required]
    [MaxLength(200)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Address { get; set; }

    [MaxLength(200)]
    public string? HighestEducation { get; set; }

    public decimal? YearsOfExperience { get; set; }

    [MaxLength(200)]
    public string? CurrentCompany { get; set; }

    [MaxLength(200)]
    public string? CurrentDesignation { get; set; }

    [MaxLength(100)]
    public string? ExpectedSalary { get; set; }

    public string? CoverLetter { get; set; }

    [Required]
    public string ResumeFile { get; set; } = default!;
}