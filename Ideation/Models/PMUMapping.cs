using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Ideation.Models
{
    public class PMUMapping
    {
        public bool IsFromTemplate { get; set; }
        public string MappedUsers { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string FormattedStartDate { get; set; }
        public string FormattedEndDate { get; set; }
        public string UpdatedStartDate { get; set; }
        public string UpdatedEndDate { get; set; }
        public string baselineStartDate { get; set; }
        public string baselineEndDate { get; set; }
        public string ApprovedLatestVersion { get; set; }
        public string ApprovedLatestVersionGroup { get; set; }
        public string UserId { get; set; }
        public string? ProjectCode { get; set; }
        public string MilestoneName { get; set; }
        public int SequenceNo { get; set; }
        public int rowidNo { get; set; }
        public string MilestoneStatus { get; set; }
        public int ProjectId { get; set; }
        public int VersionId { get; set; }
        public string Version { get; set; }
        public string NewVersion { get; set; }
        public string OldVersion { get; set; }
        public int MilestoneLength { get; set; }
        public string SubMilestoneComplete { get; set; }
        public string ProjectName { get; set; }
        public string UserName { get; set; }
        public IEnumerable<SelectListItem> ProjectVersionList { get; set; }
        public IEnumerable<SelectListItem> ProjectList { get; set; }
        public IEnumerable<SelectListItem> MilestoneList { get; set; }
        public IEnumerable<SelectListItem> TemplateList { get; set; }
        public string FileName { get; set; }
        public int MilestoneId { get; set; }
        public string JsonData { get; set; }
        public int TotalProjects { get; set; }
        public int TotalMilestone { get; set; }
        public int TotalProjectsOnTrack { get; set; }
        public int TotalMilestoneOnTrack { get; set; }
        public int TotalMilestoneOverdue { get; set; }
        public int TotalProjectOverdue { get; set; }
        public int TotalSubMilestone { get; set; }
        public string Remarks { get; set; }
        public string Extention { get; set; }
        public string Completion { get; set; }
        public string Status { get; set; }
        public int Flag { get; set; }
        public string TemplateId { get; set; }
        public int Template_Id { get; set; }
        public string TemplateName { get; set; }
        public string IsApproved { get; set; }
        public string Action { get; set; }
        public IEnumerable<PMUMapping> PMUMappingList { get; set; }
        public IEnumerable<PMUMapping> ProjectsunmappedList { get; set; }
        public IEnumerable<PMUMapping> ProjectsmappedList { get; set; }
        public string Duration { get; set; }
        public string RelationType { get; set; }
        public string SetRelation { get; set; }
        public string SetRelation1 { get; set; }
        public string RemarksType { get; set; }
        public string Class { get; set; }
        public int StartWeek { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public int EndYearmonth { get; set; }
        public int Monthesdifference { get; set; }
        public bool AccepptVersionCreation { get; set; }
        public int currentmonthdiff { get; set; }
        public int StartMonth { get; set; }
        public int EndMonth { get; set; }
        public string[] months { get; set; } = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
        public int EndWeek { get; set; }
        public string projectFlag { get; set; }
        public string IsActive { get; set; }
        public string CompletedDate { get; set; }
        public string SelectedProjectName { get; set; }
        public string SelectedProjectId { get; set; }
        public string ActualCompletedDate { get; set; }
        public string PMUMappingStatus { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedDate { get; set; }
        public string CreatedBy { get; set; }
        public int rowNo { get; set; }
        public string SubMilestoneId { get; set; }
        public string SubMilestoneName { get; set; }
        public string SubmilestoneExit { get; set; }
        public string ExtraDays { get; set; }
        public string CreatedDate { get; set; }
        public string WBSHeaderDesc { get; set; }
        public string TaskDesc { get; set; }
        public string WBSHeaderId { get; set; }
        public string TaskId { get; set; }
        public IEnumerable<Notes> NotesList { get; set; }
        public string CurrentSelectedVersion { get; set; }
        public string SelectedHub { get; set; }
        public bool IsWeekendExclude { get; set; }
        public IEnumerable<HubListData>? HUBList { get; set; }
        public int HubId { get; set; }
        public string HubName { get; set; }
        public IEnumerable<dynamic> SummaryExcelData { get; set; }
        public int MappedProjectId { get; set; }
        public int MappedHubId { get; set; }
        public IEnumerable<SelectListItem> MappedprojectList { get; set; }
        public IEnumerable<SelectListItem> MappedhubList { get; set; }
        public string RevisedRequestData { get; set; }
        public string ApprovalStartDate { get; set; }
        public string ApprovalEndDate { get; set; }
        public string ApprovalSlNo { get; set; }
        public string ApprovalVersion { get; set; }
        public string FilterStatus { get; set; }
        public bool YesNoProperty { get; set; }
        public bool IsKPI { get; set; }
        public bool YesOrNoKPI { get; set; }
        public bool IsKPIIncluded { get; set; }
        public string IsCriticalPath { get; set; }
        public int IsCloneAccepted { get; set; }
        public int IsScopeChanged { get; set; }

    }

    public class History
    {
        public int Id { get; set; }
        public string ModifiedStartDate { get; set; }
        public string ModifiedEndDate { get; set; }
        public string Reason { get; set; }
        public string ModifiedBy { get; set; }
        public string MilestoneName { get; set; }
        public string Extention { get; set; }
        public string Completion { get; set; }
        public string CompltedDate { get; set; }
        public string ActualCompletedDate { get; set; }

    }

    public class HubListData
    {
        public int HubId { get; set; }
        public string HubName { get; set; }
        public string HubApproved { get; set; }
        public string HubSaved { get; set; }
        public string RefNo { get; set; } // used in change log
        public int IsHubUnCheckable { get; set; } // used in change log
    }

    public class StatusListData
    {
        public string StatusId { get; set; }
        public string StatusName { get; set; }
    }

    public class Notes
    {
        public int HubId { get; set; }
        public string HubName { get; set; }
        public int ProjectId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }

    public class ExcelData
    {
        public int SequenceNo { get; set; }
        public string WBSHeaderDesc { get; set; }
        public string TaskDesc { get; set; }
        public string SetRelation { get; set; }
        public string Status { get; set; }
        public string baselineStartDate { get; set; }
        public string baselineEndDate { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string CompletedDate { get; set; }
        public string ActualCompletedDate { get; set; }
        public string UserName { get; set; }
        public string Extention { get; set; }
        public string Completion { get; set; }
        public string Remarks { get; set; }
        public int FileName { get; set; }
        public int ProjectId { get; set; }
        public bool IsKPI { get; set; }
        public bool IsKPIIncluded { get; set; }
        public int Slack { get; set; }
        public string IsCritical { get; set; }

    }
}