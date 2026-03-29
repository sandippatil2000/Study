using ShopAPI.Models;

namespace ShopAPI.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserByIdAsync(int id);
    Task<User> CreateUserAsync(User user);
    Task<User?> UpdateUserAsync(int id, User user);
    Task<bool> DeleteUserAsync(int id);
    Task<User?> AuthenticateAsync(string email, string password);
    Task<bool> UpdateStatusAsync(int id, string status);
}
