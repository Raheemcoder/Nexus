using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Ideation.Models
{
    public class Account
    {
        [Required(ErrorMessage ="Enter Username")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Enter Password")]
        //[RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+)$", ErrorMessage = "Enter proper Password")]
        public string? Password { get; set; }
        public string? LoginId { get; set; }
        public string? RoleId { get; set; }
        public string? PageName { get; set; }
    }
    public class Accountinfo
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public string LoginId { get; set; }
        public string EmailId { get; set; }
        public int UserStatus { get; set; }
        public int UserTypeId { get; set; }
        public string Role { get; set; }
        public int RoleId { get; set; }
        public String Hub { get; set; }
        public string UserName { get; set; }
        public string LoggedUserName { get; set; }
        public string ManagerId { get; set; }
        public string RoleName { get; set; }
        public bool IsActive { get; set; }
        public string JsonData { get; set; }
        public IEnumerable<SelectListItem> RoleList { get; set; }
        public bool IsAuthenticated { get; set; }
        public string DepartmentName { get; set; }
        public string MenuActive { get; set; }

    }
    public class AppMappingDetails
    {
        public string AppName { get; set; }
        public string AppShortName { get; set; }
    }
}
