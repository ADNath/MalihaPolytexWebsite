using System.Data;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using MalihaPolytex.Application.Common.Interfaces;

namespace MalihaPolytex.Infrastructure.Database;

public class SqlConnectionFactory : IDbConnectionFactory
{
    private readonly IConfiguration _configuration;

    public SqlConnectionFactory(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IDbConnection CreateConnection()
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Database connection string not found.");

        return new SqlConnection(connectionString);
    }
}