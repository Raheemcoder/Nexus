namespace Ideation.Models
{
    public class AuthenticatUser
    {
        public string LoginType { get; set; }
        public bool IsAuthenticated { get; set; }
        public DateTime LoginTime { get; set; }
        public string Message { get; set; }
    }
}
