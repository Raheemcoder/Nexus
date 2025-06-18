using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class User
    {
        public long UserId { get; set; }

        [Required(ErrorMessage = "Select Role")]
        public string Role { get; set; }
        public string? RoleName { get; set; }
        [Required(ErrorMessage = "Select User Type")]

        public string UserType { get; set; }
        [Required(ErrorMessage = "Enter Name")]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter Email")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Please Provide Valid Email")]

        public string EmailId { get; set; }
        [Required(ErrorMessage = "Enter Login ID")]
        public string LoginId { get; set; }
        [Required(ErrorMessage = "Select Division")]
        public string[] Division { get; set; }
        [Required(ErrorMessage = "Select Category")]
        public string?[] Category { get; set; }
        public string? CategoryNames { get; set; }
        [Required(ErrorMessage = "Select HUB")]
        public string Hub { get; set; }
        //[Required(ErrorMessage = "Select Manager")]
        //public string? Manager { get; set; }
        
        public string[]? Manager { get; set; }
        public string? ADUser { get; set; }
        public string? HubNames { get; set; }
        public string? ManagerNames { get; set; }
        public string? Active { get; set; }
        public string? Status { get; set; }
        public string? DivisionNames { get; set; }
        public string? History { get; set; }
        public string? RoleId { get; set; }
        public bool IsEdit { get; set; }
        public bool? IsRead { get; set; }
        public IEnumerable<SelectListItem>? RoleList { get; set; }
        public IEnumerable<SelectListItem>? HubList { get; set; }
        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? CategoryList { get; set; }
        public IEnumerable<SelectListItem>? UserTypeList { get; set; }
        public IEnumerable<SelectListItem>? UserList { get; set; }
        public string? UserName { get; set; }
        public bool IsActive { get; set; }
        public string? LoggedUserName { get; set; }
    }
    public class Userinfo
    {
        public string IsADUser { get; set; }
        public string EmailID { get; set; }
        public string UserId { get; set; }
    }
    public class HubStatusinfo
    {
        public string HubName { get; set; }
        public string IsHubApproved { get; set; }
        public string HubUser { get; set; }
        public string ProjectID { get; set; }
        //public string IsADUser { get; set; }

    }

}




    
    

