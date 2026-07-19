using System.Data;
using Dapper;
using MalihaPolytex.Application.Common.Interfaces;
using MalihaPolytex.Domain.Entities;
using MalihaPolyTex.Api.Entities;
using MalihaPolyTex.Api.Repositories.Interfaces;

namespace MalihaPolyTex.Api.Repositories;

public class ContactInquiryRepository : IContactInquiryRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ContactInquiryRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int> CreateAsync(ContactInquiry inquiry)
    {
        var parameters = new DynamicParameters();

        parameters.Add("@Name", inquiry.Name);
        parameters.Add("@Company", inquiry.Company);
        parameters.Add("@Email", inquiry.Email);
        parameters.Add("@Phone", inquiry.Phone);
        parameters.Add("@Subject", inquiry.Subject);
        parameters.Add("@Message", inquiry.Message);
        parameters.Add("@IpAddress", inquiry.IpAddress);

        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            "sp_ContactInquiry_Create",
            parameters,
            commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<ContactInquiry>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryAsync<ContactInquiry>(
            "sp_ContactInquiry_GetAll",
            commandType: CommandType.StoredProcedure);
    }

    public async Task<ContactInquiry?> GetByIdAsync(int inquiryId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<ContactInquiry>(
            "sp_ContactInquiry_GetById",
            new
            {
                InquiryId = inquiryId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<bool> UpdateStatusAsync(int inquiryId, string status)
    {
        using var connection = _connectionFactory.CreateConnection();

        var rows = await connection.ExecuteAsync(
            "sp_ContactInquiry_UpdateStatus",
            new
            {
                InquiryId = inquiryId,
                Status = status
            },
            commandType: CommandType.StoredProcedure);

        return rows > 0;
    }

    public async Task<bool> DeleteAsync(int inquiryId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var rows = await connection.ExecuteAsync(
            "sp_ContactInquiry_Delete",
            new
            {
                InquiryId = inquiryId
            },
            commandType: CommandType.StoredProcedure);

        return rows > 0;
    }
}