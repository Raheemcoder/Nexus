using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Ideation.Models
{
    public class MyMilestone
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectCode { get; set; }
        public string MilestoneName { get; set; }
        public string RelationType { get; set; }
        public int Countlist { get; set; }
        public string RoleId { get; set; }
        public IEnumerable<MilestoneMaster> MilestoneNameList { get; set; }
        public IEnumerable<SelectListItem> UserLsit { get; set; }
        public IEnumerable<SelectListItem> ProjectBasedMilestone { get; set; }
        public int? MilestoneId { get; set; }
        public int? SequenceNo { get; set; }
        public int? Duration { get; set; }
        public IEnumerable<SelectListItem> MilestoneIdList { get; set; }
        public string StartDate { get; set; }
        public string flag { get; set; }
        public string EndDate { get; set; }
        public string SetRelation { get; set; }
        public string Buttoneflag { get; set; }
        public string MilestoneStatus { get; set; }
        public bool ShowProjectDetails { get; set; }
        public string ModifiedDate { get; set; }
        public string UserName { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string UserId { get; set; }
        public string selectedendDate { get; set; }
        public string JsonData { get; set; }
        public string ProjectHeaders { get; set; }
        public string ProjectMyMilestoneDetails { get; set; }
        public string Remarks { get; set; }
        public bool AccepptMailtrigger { get; set; }
        public bool AccepptVersionCreation { get; set; }
        public string OutMessage { get; set; }
        public string StyleClass { get; set; }
        public string ActualCompletedDate { get; set; }
        public DateTime NewActualCompletedDate { get; set; }
        public string Status { get; set; }
        public string Version { get; set; }
        public string SubmilestoneExit { get; set; }
        public string DisplaySubMilestone { get; set; }
        public string SearchProjectId { get; set; }
        public int SlNo { get; set; }
        public string? PMUVersion { get; set; }
        public string? NewVersionName { get; set; }
        public DateTime? NewStartDate { get; set; }
        public DateTime? NewEndDate { get; set; }
        public string? CompletedStatus { get; set; }
        public string? PreviousEndDate { get; set; }
        public string? VersionRemarks { get; set; }
        public string? Hub { get; set; }
        public int HubId { get; set; }
        public string ExtendedDate { get; set; }
        public DateTime? NewExtendedDate { get; set; }
        public int IsAlreadyRequest { get; set; }
        public int IsWeekendExcluded { get; set; }
        public bool IsKPI { get; set; }
        public bool IsKPIIncluded { get; set; }
        public string ProjectStartDate { get;set; }
    }

    public class ApproveMilestone
    {
        public int ExtendedId { get; set; }
        public int RowId { get; set; }
        public int SlNo { get; set; }
        public int ProjectId { get; set; }
        public string Hub { get; set; }
        public string ProjectName { get; set; }
        public string ProjectCode { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string RequestedEndDate { get; set; }
        public string Status { get; set; }
        public string ModifiedDate { get; set; }
        public string UserName { get; set; }
        public string Remarks { get; set; }
        public string PMUVersion { get; set; }
        public string JsonData { get; set; }
        public bool IsKPI { get; set; }
        public bool IsKPIIncluded { get; set; }
    }
    public class TaskRemarksHistory
    {
        public string ActualStartDate { get; set; }
        public string ActualEndDate { get; set; }
        public string RequestedEndDate { get; set; }
        public string RevisedStartDate { get; set; }
        public string RevisedEndDate { get; set; }
        public string Remarks { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public string Status { get; set; }
    }
    public class ProjectHeader
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectCode { get; set; }
        public string PMUVersion { get; set; }
        public int HubId { get; set; }
        public string HubName { get; set; }
        public bool IsKPIIncluded { get; set; }
        public bool IsWeekendExcluded { get; set; }
        public string LastModifiedDate { get; set; }
        public string ProjectStartDate { get; set; }
    }
    public class ProjectMyMilestoneDetails
    {
        public int SlNo { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public bool IsKPI { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string TaskStatus { get; set; }
        public string UserName { get; set; }
        public int IsAlreadyRequest { get; set; }
    }

    public class ProjectDetailsToSave
    {
        public int ProjectId { get; set; }
        public int TaskId { get; set; }
        public int HubId { get; set; }
        public int SlNo { get; set; }
        public string Status { get; set; }
        public string PMUVersion { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string ActionDate { get; set; }
        public string Remarks { get; set; }
       
    }

}