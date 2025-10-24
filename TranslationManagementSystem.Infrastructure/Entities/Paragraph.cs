namespace TranslationManagementSystem.Core.Entities;

public class Paragraph
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public int Order { get; set; }
    public string OriginalText { get; set; } = string.Empty;
    public string? TranslatedText { get; set; }
    public string? ReviewedText { get; set; }
    public string? ApprovedText { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}