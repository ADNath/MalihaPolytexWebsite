using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.Text;

using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Application.Common.Models;
using MalihaPolytex.Infrastructure.Authentication;
using MalihaPolytex.Infrastructure.Database;
using MalihaPolytex.Infrastructure.FileStorage;
using MalihaPolytex.Domain.Interfaces;
using MalihaPolytex.Infrastructure.Repositories.Auth;
using MalihaPolytex.Application.Features.Auth.Services;
using MalihaPolytex.Infrastructure.Repositories;
using MalihaPolytex.Application.Features.HeroSlides;

namespace MalihaPolytex.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<JwtSettings>(
            configuration.GetSection("Jwt"));

        services.AddScoped<IDbConnectionFactory, SqlConnectionFactory>();

        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();

        services.AddScoped<IJwtTokenService, JwtTokenService>();

        services.AddScoped<IFileStorageService, FileStorageService>();

        services.AddScoped<IAuthRepository, AuthRepository>();

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IHeroSlideService, HeroSlideService>();
        services.AddScoped<IHeroSlideRepository, HeroSlideRepository>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                var jwtSettings = configuration
                    .GetSection("Jwt")
                    .Get<JwtSettings>()!;

                options.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,

                        ValidIssuer = jwtSettings.Issuer,

                        ValidAudience = jwtSettings.Audience,

                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(jwtSettings.Key))
                    };
            });

        services.AddAuthorization();

        return services;
    }
}