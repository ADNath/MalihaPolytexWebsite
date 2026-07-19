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
using MalihaPolytex.Application.Features.WhatWeDoItems;
using MalihaPolytex.Application.Features.CompanyVideos;
using MalihaPolytex.Application.Features.Certificates;
using MalihaPolytex.Application.Features.HomepageContact;
using MalihaPolytex.Application.Features.HomepageContacts;
using MalihaPolytex.Application.Features.ManagementMembers;
using MalihaPolytex.Application.Features.CompanyProfiles;
using Application.Services;
using MalihaPolytex.Application.Features.Products;
using MalihaPolytex.Application.Interfaces;
using MalihaPolytex.Application.Services;
using MalihaPolyTex.Api.Repositories.Interfaces;
using MalihaPolyTex.Api.Services.Interfaces;
using MalihaPolyTex.Api.Repositories;
using MalihaPolytex.Application.Features.ContactInquiries;

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
        services.AddScoped<IWhatWeDoItemRepository, WhatWeDoItemRepository>();
        services.AddScoped<IWhatWeDoItemService, WhatWeDoItemService>();
        services.AddScoped<ICompanyVideoRepository, CompanyVideoRepository>();
        services.AddScoped<ICompanyVideoService, CompanyVideoService>();
        services.AddScoped<ICertificateRepository, CertificateRepository>();
        services.AddScoped<ICertificateService, CertificateService>();
        services.AddScoped<IHomepageContactRepository, HomepageContactRepository>();
        services.AddScoped<IHomepageContactService, HomepageContactService>();
        services.AddScoped<IManagementMemberRepository, ManagementMemberRepository>();
        services.AddScoped<IManagementMemberService, ManagementMemberService>();
        services.AddScoped<ICompanyProfileService, CompanyProfileService>();
        services.AddScoped<ICompanyProfileRepository, CompanyProfileRepository>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IGeneralCertificateRepository, GeneralCertificateRepository>();
        services.AddScoped<IGeneralCertificateService, GeneralCertificateService>();
        services.AddScoped<IContactInquiryRepository, ContactInquiryRepository>();
        services.AddScoped<IContactInquiryService, ContactInquiryService>();

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