using Microsoft.AspNetCore.Identity;
using TranslationManagementSystem.Core.Entities;

namespace TranslationManagementSystem.Infrastructure.Services;

public class UserService
{
    private readonly UserManager<AppUser> _userManager;

    public UserService(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    // methods مساعدة لعمليات المستخدم
    public async Task<bool> UserExistsAsync(string username)
    {
        return await _userManager.FindByNameAsync(username) != null;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }
}