namespace Ideation.Models
{
    public static class AppSettings
    {
        public static WebApi APIDetails { get; set; } = new WebApi();
    }
    public class WebApi
    {
        public string APIEndPoint { get; set; }
        public string BasicUserName { get; set; }
        public string BasicPassword { get; set; }
    }
}
