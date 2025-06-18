namespace Ideation.Models
{
    public class PowerBISettings
    {
        public Guid ApplicationId { get; set; }
        public string ApplicationSecret { get; set; }
        public Guid ReportId { get; set; }
        public Guid WorkspaceId { get; set; }
        public string AuthorityUrl { get; set; }
        public string ResourceUrl { get; set; }
        public string ApiUrl { get; set; }
        public string EmbedUrlBase { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid EBUserReportId { get; set; }
        public Guid EBUserWorkspaceId { get; set; }
        public Guid EBMgrReportId { get; set; }
        public Guid EBMgrWorkspaceId { get; set; }
        public Guid ReportId_UAT { get; set; }
        public Guid WorkSpace_UAT { get; set; }
        public string Environment { get; set; }
    }
}
