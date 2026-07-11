using Microsoft.AspNetCore.Mvc;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Responses;

namespace MalihaPolytex.API.Controllers;

[ApiController]
[Route("api/files")]
public class FilesController : ControllerBase
{
    private readonly IFileStorageService _fileStorageService;

    public FilesController(IFileStorageService fileStorageService)
    {
        _fileStorageService = fileStorageService;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(
        IFormFile file,
        [FromQuery] string folderName)
    {
        var path = await _fileStorageService.SaveFileAsync(
            file,
            folderName);

        return Ok(
            ApiResponse<string>.SuccessResponse(
                path,
                "File uploaded successfully."));
    }
}