namespace Ideation.Models
{
    public class AppSettingsPath
    {
        public static AppPath AppPathDetails { get; set; } = new AppPath();
    }
    public class AppPath
    {
        public string? IsLocal { get; set; }
        public string? IsQA { get; set; }
        public bool IsWeekendsExclude { get; set; }
    }
}
