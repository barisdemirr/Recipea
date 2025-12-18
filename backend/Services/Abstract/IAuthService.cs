using backend.DTOs.Auth;

namespace backend.Services.Abstract
{
    public interface IAuthService
    {
        Task<string> AuthHandler(LoginDto dto);
    }
}
