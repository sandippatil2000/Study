using ShopAPI.Models;

namespace ShopAPI.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task<User> AddAsync(User user);
    Task<User?> UpdateAsync(int id, User user);
    Task<bool> DeleteAsync(int id);
    Task<User?> AuthenticateAsync(string email, string password);
    Task<bool> UpdateStatusAsync(int id, string status);
}
