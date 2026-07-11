using Microsoft.AspNetCore.Http;

namespace MalihaPolytex.Application.Common.Interfaces;

public interface IFileStorageService
{
    Task<string> SaveFileAsync(
        IFormFile file,
        string folderName);

    Task DeleteFileAsync(string relativePath);
}