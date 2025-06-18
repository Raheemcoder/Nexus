using Microsoft.AspNetCore.Mvc.Rendering;
using static Ideation.Models.MMProject;
namespace Ideation.Models
{
    public class KPIDashBoard
    {
        public string ProjectCode { get; set; }
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Hub { get; set; }
        public string HUBName { get; set; }
        public string TaskDesc { get; set; }
        public string TaskDescription { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string CompletionDate { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public string Delay { get; set; }
        public IEnumerable<MonthMaster> MonthMasterList { get; set; }
        public IEnumerable<SelectListItem>? MonthList { get; set; }
        public string Month { get; set; }
        public IEnumerable<ReasonForDelayMaster> ReasonsForDelayList { get; set; }
        public IEnumerable<StatusMaster> StatusMasterList { get; set; }
        public IEnumerable<SelectListItem>? DelayList { get; set; }
        public IEnumerable<SelectListItem>? StatusList { get; set; }
        public IEnumerable<DivisionList>? DivisionList { get; set; }
        public string DelayReason { get; set; }
        public string StatusNames { get; set; }
        public string DelayRemarks { get; set; }
        public string ReasonForDelay { get; set; }
        public string? ProjectDataToSave { get; set; }
        public string? message { get;set; }
        public string? Division { get;set; }
        public string? Role { get;set; }
        public string? LatestRemarks { get;set; }
        public string? LatestReason { get;set; }
        public string LatestVersionStartDate { get; set; }
        public string LatestVersionEndDate { get; set; }
        public string Month_Selected { get; set; }
        public string Year_Selected { get; set; }

    }

    public class MonthMaster
    {
        public string Month { get; set; }
        public string MonthName { get; set; }
    }

    public class ReasonForDelayMaster
    {
        public string ResonValue { get; set; }
        public string ReasonName { get; set; }
        public bool IsUsed { get; set; }
    }

    public class RemarksList
    {
        public string Remarks { get; set; }
        public string DelayReason { get; set; }
        public string CreatedBy { get; set;}
        public string CreatedOn { get; set;}
    }
}