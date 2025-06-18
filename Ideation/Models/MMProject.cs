using Ideation.Resources;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using Org.BouncyCastle.Bcpg;

namespace Ideation.Models
{
    public class MMProject
    {
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectCode")]
        public string ProjectCode { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectName")]
        public string ProjectName { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectDivision")]
        public string Division { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectManager")]
        public int UserId { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectHUB")]
        public string[] HubList { get; set; }
        public string Hub { get; set; }
        public string? HGHCode { get; set; }

        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_RNDTeam")]
        public string RnDTeamList { get; set; }
        public string? RnDTeam { get; set; }

        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectType")]
        public string Type { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectClassification")]
        public string Classification { get; set; }
        public string? ProductName { get; set; }
        public string? MappedUsers { get; set; }
        public string? Status { get; set; }
        public string? Project { get; set; }
        public string? MilestonesCompleted { get; set; }
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Err_Msg_ProjectStatus")]
        public int ProjectStatusId { get; set; }
        public IEnumerable<dynamic> DropDownList { get; set; }
        public IEnumerable<SelectListItem> ManagerList { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }
        public IEnumerable<SelectListItem> ProjectList { get; set; }
        public IEnumerable<SelectListItem> DivisionsList { get; set; }
        public IEnumerable<SelectListItem> ProjectStatusList { get; set; }

        public class ManagerValue
        {
            public string ManagerId { get; set; }
            public string UserId { get; set; }
            public string ManagerName { get; set; }
            public string ManagerEmailId { get; set; }
        }

        public class ProjectStatus
        {
            public string Status { get; set; }
        }

        public class Users
        {
            public string UserId { get; set; }
            public string Name { get; set; }
            public string EmailId { get; set; }

        }

        public class DivisionList
        {
            public string DivisionName { get; set; }

        }
        public class MMProjectExcelReport
        {
            public string ProjectCode { get; set; }
            public string ProjectName { get; set; }
            public string Division { get; set; }
            public string ProjectManager { get; set; }
            public string ProjectType { get; set; }
            public string StatusName { get; set; }
            public string Classification { get; set; }
            public string HGHCode { get; set; }
            public string ProductName { get; set; }
            public string RnDTeam { get; set; }
            public string Hub { get; set; }

        }

        public class MMUserExcelReport
        {
            public string LoginId { get; set; }
            public string UserName { get; set; }
            public string EmailId { get; set; }
            public string Manager { get; set; }
            public string HUB { get; set; }
            public string Division { get; set; }
            //public string Status { get; set; }

        }
    }
}
