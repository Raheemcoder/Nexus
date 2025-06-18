using Ideation.Resources;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class MMUser
    {
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_LoginId")]
        public string? LoginId { get; set; }
        [Required(ErrorMessageResourceType =typeof(Resource),ErrorMessageResourceName ="Err_Msg_UserName")]
        public string UserName { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_EmailId")]
        //[EmailAddress(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_Invalid_EmailId")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_Invalid_EmailId")]
        public string EmailId { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_HUBId")]
        public int HUB { get; set; }
        public IEnumerable<SelectListItem>? HUBList { get; set; }
        //[Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ManagerId")]
        public string[]? ManagerId { get; set; }
        public IEnumerable<SelectListItem>? ManagerList { get; set; }
        public string? Division { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_DivisionId")]
        public string[] DivisionId { get; set; }
        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? CategoryList { get; set; }
        public IEnumerable<SelectListItem>? ProfileNameList { get; set; }
        public IEnumerable<SelectListItem>? UserTypeList { get; set; }

        public IEnumerable<SelectListItem>? DepartmentList { get; set; }
        public string? Department { get; set; }
        public string Category { get; set; }
        public string[]? ProfileId { get; set; }
        public string? Profile{ get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_UserType")]
        public string UserTypeId { get; set; }

        public string[] CategoryId { get; set; }
        public string? Manager { get; set; }
        public bool IsActive { get; set; } = true;
        
        public string? CreatedBy { get; set; }
        public IEnumerable<ApplicationList>? ApplicationLists { get; set; }
        public string? ApplicationListData { get; set; }
        public IEnumerable<RoleList>? RoleLists { get; set; }
    }
    public class MMDropdown
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
    public class ApplicationList
    {
        public int AppId { get; set; }
        public string AppName { get; set; }
        public string AppShortName { get; set; }
        public int AppOrder { get; set; }
        public int GroupId { get; set; }
        public int RoleId { get; set; }
        public bool IsMapped { get; set; }
        public string Category { get; set; }
        public string[] CategoryId { get; set; }
        public IEnumerable<SelectListItem>? RolesList { get; set; }
    }
    public class RoleList
    {
        public int AppId { get; set; }
        public string AppShortName { get; set; }
        public string AppName { get; set; }
        public int GroupId { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
