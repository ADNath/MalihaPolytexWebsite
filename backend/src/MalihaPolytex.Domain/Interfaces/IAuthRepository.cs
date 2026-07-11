using MalihaPolytex.Domain.Entities;

namespace MalihaPolytex.Domain.Interfaces;

public interface IAuthRepository
{
    Task<User?> GetByUsernameAsync(string username);
}