using MalihaPolytex.API.Extensions;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Default");   // <-- Move this BEFORE UseStaticFiles

var uploadPath = builder.Configuration["FileStorage:RootPath"];

if (!string.IsNullOrWhiteSpace(uploadPath) && Directory.Exists(uploadPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(uploadPath),
        RequestPath = "/Uploads",
        OnPrepareResponse = ctx =>
        {
            ctx.Context.Response.Headers.Append(
                "Access-Control-Allow-Origin",
                "*");
        }
    });
}

app.UseApplicationPipeline();

app.Run();