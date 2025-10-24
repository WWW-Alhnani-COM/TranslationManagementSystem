using Microsoft.AspNetCore.Identity;

namespace TranslationManagementSystem.Core.Entities;

public class AppUser : IdentityUser<string>
{
    public string FullName { get; set; } = string.Empty;
    public string Role { get; set; } = "DataEntry";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
}