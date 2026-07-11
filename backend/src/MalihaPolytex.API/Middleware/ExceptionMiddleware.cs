using System.Net;
using System.Text.Json;

using MalihaPolytex.Application.Common.Exceptions;
using MalihaPolytex.Application.Common.Responses;

namespace MalihaPolytex.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, exception.Message);

            await HandleExceptionAsync(context, exception);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new ApiResponse<object>();

        switch (exception)
        {
            case BadRequestException:

                context.Response.StatusCode = StatusCodes.Status400BadRequest;

                response = ApiResponse<object>.FailureResponse(exception.Message);

                break;

            case UnauthorizedException:

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;

                response = ApiResponse<object>.FailureResponse(exception.Message);

                break;

            case NotFoundException:

                context.Response.StatusCode = StatusCodes.Status404NotFound;

                response = ApiResponse<object>.FailureResponse(exception.Message);

                break;

            default:

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                response = ApiResponse<object>.FailureResponse(
                    "An unexpected error occurred.");

                break;
        }

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }
}