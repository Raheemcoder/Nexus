
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class EffortTracker
    {
        public List<object>? MonthlyEfforts { get; set; }
        public string HolidaysList { get; set; }
        public string LeavesList { get; set; }
        public List<object>? WeeklyEfforts { get; set; }
        public List<object>? WeeklyApportionEfforts { get; set; }
        public IEnumerable<ProjectList>? ProjectList{ get; set; }
        public IEnumerable<ManagerRemarks>? RemarksList{ get; set; }
        public IEnumerable<SelectListItem>? ResourceList{ get; set; }
        public IEnumerable<SelectListItem>? ProjectDataList{ get; set; }
        public string? ProjectId { get; set; }
        public string? weekpicker { get; set; }
        public string WeekPickerHidden { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        public string Resource { get; set; }
        public string JsonFormProjectsDetails { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string UserName { get; set; }
        public IEnumerable<ProjectNumberList>? projectnumberlist { get; set; }
        public IEnumerable<SelectListItem>? ProjectNoList { get; set; }
        public string? ProjectNo { get; set; }
        public string? ProjectRemarksData { get; set; }
        public string? Date { get; set; }
        public string? CreatedBy { get; set; }
        public int? Task { get; set; }
        public string? SlNO { get; set; }
        public string? ProjectName { get; set; }
        public IEnumerable<UserNames>? UserNamesList { get; set; }
        public string UserId { get; set; }
    }

    public class Leaves
    {
        public string DATE { get; set; }
    }
    public class ManagerRemarks {
        public string Remarks { get; set; }
        public string Status { get; set; }
    }
    public class ResourceNamesList
    {
        public string ResourceName { get; set; }
    }
    public class ProjectsDataList
    {
        public string ProjectCode { get; set; }
    }
    public class ProjectList
    {
        public string ?ProjectCode { get; set; }
        public string ?ProjectName { get; set; }
        public string ?DivisionName { get; set; }
        public string ?ProjectDescription { get; set; }
        public string ?RnDTeam { get; set; }
        public string ?ResourceName { get; set; }
        public string ?Manager { get; set; }
    }
    public class UserNames
    {
        public string? UserId { get; set; }
        public string? UserName { get; set; }

    }

    public class ProjectRemarks
    {
        public string? ProjectId { get; set; }
        public string? RemarksDate { get; set; }
        public string? Remarks { get; set; }
        public string? RemarksId { get; set; }
    }
}
