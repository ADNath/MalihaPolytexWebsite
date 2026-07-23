using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

using MalihaPolytex.Application.Common.Interfaces;

namespace MalihaPolytex.Infrastructure.FileStorage;

public class FileStorageService : IFileStorageService
{
    private readonly string _rootPath;

    public FileStorageService(IConfiguration configuration)
    {
        _rootPath = configuration["FileStorage:RootPath"]
            ?? throw new Exception("FileStorage RootPath not configured.");
    }

    public async Task<string> SaveFileAsync(
        IFormFile file,
        string folderName)
    {
        if (file == null || file.Length == 0)
            throw new Exception("File is required.");

        var extension = Path.GetExtension(file.FileName).ToLower();

        var allowedExtensions = new[]
        {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
            ".pdf"
        };

        if (!allowedExtensions.Contains(extension))
            throw new Exception("Invalid file type.");

        var uploadFolder = Path.Combine(_rootPath, folderName);

        Directory.CreateDirectory(uploadFolder);

        var fileName = $"{Guid.NewGuid():N}{extension}";

        var filePath = Path.Combine(uploadFolder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);

        await file.CopyToAsync(stream);

        return $"/Uploads/{folderName}/{fileName}";
    }

    public Task DeleteFileAsync(string relativePath)
    {
        relativePath = relativePath.TrimStart('/');

        var filePath = Path.Combine(
            _rootPath,
            relativePath.Replace("uploads\\", "")
                        .Replace("uploads/", ""));

        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }

        return Task.CompletedTask;
    }
}