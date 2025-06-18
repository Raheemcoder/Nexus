using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class Approve
    {
        public IEnumerable<UserMaster> UserList { get; set; }
        public IEnumerable<SelectListItem> UserListselect { get; set; }

        public IEnumerable<EffortsProjectList> effortsProjectLists { get; set; }
        public List<object>? WeeklyApportionEffortsforUser { get; set; }

        public string? weekpicker { get; set; }
        public string WeekPickerHidden { get; set; }
        public string? UserNames { get; set; }
        public string? Remarks { get; set; }
        public List<object>? WeeklyEfforts { get; set; }
        public List<object>? WeeklyEffortsuser { get; set; }
        public IEnumerable<ProjectList>? ProjectList { get; set; }
        public string JsonApproveData { get; set; }
        public string ProjectId { get; set; }
        public string Effortdate { get; set; }
        public string checkManager { get; set; }
        public string selectedUsers { get; set; }

       // public string searched { get; set; }
        public string UserName { get; set; }
       
    }
    public class UserMaster
    {
        public string? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public string? EmpCode { get; set; } 

    }
    public class EffortsProjectList
    {
        public string? ProjectName { get; set; }
        public string? ProjectId { get;set;}
        public string? EffortInHrs { get;set;}
        public string? TaskName { get; set; }

    }
   

}
