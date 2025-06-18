using System.Web.Mvc;

namespace Ideation.Models
{
    public class NewPMUMappings
    {
        public List<PMUMappings> PMUMappingDetails { get; set; } = new List<PMUMappings>();
        public List<Documents> DocumentDetails { get; set; } = new List<Documents>();
        public List<Remarks> RemarkDetails { get; set; } = new List<Remarks>();
        public List<ExcelDownload> ExcelDetails { get; set; } = new List<ExcelDownload>();
        public IEnumerable<PMUVersions> PMUVersionList { get; set; }

        public bool IsWeekendExculded { get; set; }
        public bool IsKPIIncluded { get; set; }

        public string ApprovedLatestVersion { get; set; }
        public string ApprovedLatestVersionGroup { get; set; }
        public string CurrentWorkingVersion { get; set; }

        public string RevisedRequestData { get; set; }

    }
    public class PMUMappings
    {
        public int RowNum { get; set; }
        public int SlNo { get; set; }
        public int ProjectId { get; set; }
        public string PMUVersion { get; set; }
        public int Relation { get; set; }
        public int WBSHeaderId { get; set; }
        public string WBSHeader { get; set; }
        public int TaskId { get; set; }
        public string Task { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Resources { get; set; }
        public string Dependency { get; set; }
        public int Duration { get; set; }
        public double TaskPercentage { get; set; }
        public string MilestoneStatus { get; set; }
        public bool IsLatest { get; set; }
        public bool IsAutoSave { get; set; }
        public bool IsKPI { get; set; }
        public bool IsKPIIncluded { get; set; }
        public int Slack { get; set; }
        public string IsCritical { get; set; }
    }
    public class Documents
    {
        public int RowNum { get; set; }

        public int SlNo { get; set; }
        public int WBSHeader { get; set; }
        public int Task { get; set; }
        public int ProjectId { get; set; }
        public string DocumentName { get; set; }
        public string SubmittedBy { get; set; }
        public string SubmittedOn { get; set; }
    }
    public class Remarks
    {
        public int RowNum { get; set; }
        public int SlNo { get; set; }
        public int WBSHeader { get; set; }
        public int Task { get; set; }
        public int ProjectId { get; set; }
        public string RemarkDesc { get; set; }
        public string SubmittedBy { get; set; }
        public string SubmittedOn { get; set; }
    }
    public class Resources
    {
        public int EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string UserName { get; set; }
    }
    public class WBSHeader
    {
        public int WBSHeaderId { get; set; }
        public string WBSHeaderDesc { get; set; }
        public int IsApproved { get; set; }
    }
    public class Task
    {
        public int TaskId { get; set; }
        public string TaskDesc { get; set; }
        public int IsApproved { get; set; }
        public bool IsKPI { get; set; }

    }
    public class PMUVersions
    {
        public string PMUVersion { get; set; }
        public string VersionGroup { get; set; }
        public string NextPMUVersion { get; set; }
        public string NextVersionGroup { get; set; }
        public bool IsLatest { get; set; }
    }
    public class HubsList
    {
        public int HubId { get; set; }
        public string HubName { get; set; }
    }
    public class Template
    {
        public int TemplateId { get; set; }
        public string TemplateName { get; set; }
    }
    public class ExcelDownload
    {
        public string WBSHeader { get; set; }
        public string Task { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Resources { get; set; }
        public string Durration { get; set; }
        public string TaskPercentage { get; set; }
        public string Relation { get; set; }
        public string Dependency { get; set; }
    }

}