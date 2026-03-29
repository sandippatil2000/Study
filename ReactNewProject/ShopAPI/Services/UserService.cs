using ShopAPI.Models;
using ShopAPI.Repositories;

namespace ShopAPI.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<User> CreateUserAsync(User user)
    {
        // Business logic could be added here before calling repo
        return await _repository.AddAsync(user);
    }

    public async Task<User?> UpdateUserAsync(int id, User user)
    {
        return await _repository.UpdateAsync(id, user);
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<User?> AuthenticateAsync(string email, string password)
    {
        return await _repository.AuthenticateAsync(email, password);
    }

    public async Task<bool> UpdateStatusAsync(int id, string status)
    {
        return await _repository.UpdateStatusAsync(id, status);
    }
}
