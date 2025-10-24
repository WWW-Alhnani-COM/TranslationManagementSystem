using TranslationManagementSystem.Core.Entities;

namespace TranslationManagementSystem.Core.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}