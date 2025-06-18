using Microsoft.AspNetCore.Mvc.Rendering;
using Org.BouncyCastle.Math;

namespace Ideation.Models
{
    public class Apportion
    {
        public List<object>? MonthlyEfforts { get; set; }
        public List<object>? WeeklyEfforts { get; set; }
        public List<object>? TotalEfforts { get; set; }
        public IEnumerable<ProjectList>? ProjectList { get; set; }
        public string ApportionDataList { get; set; }
        public string HolidaysList { get; set; }
        public string LeavesList { get; set; }
        public string? ProjectId { get; set; }
        public string? weekpicker { get; set; }
        public string WeekPickerHidden { get; set; }
       
        public string Division { get; set; }
        public string Classification { get; set; }
        public string Hub { get; set; }
        public string ProjectType { get; set; }
        public IEnumerable<SelectListItem> TaskList { get; set;}

        public IEnumerable<SelectListItem> DivisionList { get; set; }
        public IEnumerable<SelectListItem> ClassificationList { get; set; }
        public IEnumerable<SelectListItem> ProjectTypeList { get; set; }
        public IEnumerable<SelectListItem> RnDList { get; set; }
        public string SerializedWeekEfforts { get; set; }

        public string Task { get; set; }
        public string RnDTeam { get; set; }
        public string Remarks { get; set; }
        
    }
    public class Tasks {
        public string TaskId { get; set; }
        public string TaskName { get; set; }
    }
    public class Division
    {
        public string DivisionId { get; set; }
        public string DivisionName { get; set; }
    }

    public class Classification
    {
       public string ClassificationName { get; set; }
    }
    public class RND
    {
       public string RnDTeam { get; set; }
    }

    public class Hub
    {
        public string HubName { get; set; }
    }

    public class ProjectType
    {
        public string ProjectTypeName { get; set; }
    }

    public class ApportionDataView
    {
        public int ApportionId  { get; set; }
        public DateTime EffortStartDate  { get; set; }
        public DateTime EffortEndDate  { get; set; }
        public string Division  { get; set; }
        public string Classification  { get; set; }
        public string ProjectType  { get; set; }
        public string TaskName  { get; set; }
        public string RnDTeam { get; set; }
    }

    public class ApportionPopupData {
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public DateTime EffortDate { get; set; }
        public DateTime EffortInHrs { get; set; }


    }

}
