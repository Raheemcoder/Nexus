using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class NewInitiation
    {
        public string Hub { get; set; }
        public string Division { get; set; }
        public string[] Division_arr { get; set; }
        public string ProjectType { get; set; }
        public string Status { get; set; }
        public string[] Status_arr { get; set; }
        public string Year { get; set; }
        public string RoleId { get; set; }
        public string Role { get; set; }
        public string empId { get; set; }
        public bool IsEdit { get; set; }
        public bool? IsRead { get; set; }
        public IEnumerable<SelectListItem>? HubList { get; set; }
        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? StatusList { get; set; }
        public IEnumerable<SelectListItem>? ProjectList { get; set; }

        public string PmdDueDate { get; set; }  
        public string PMDRemarks { get; set; }
        public string SearchedYear { get; set; }
    }
}
