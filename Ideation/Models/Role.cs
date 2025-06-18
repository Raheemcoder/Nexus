using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class Role
    {

        [Required(ErrorMessage = "Enter RoleName")]
        public string RoleName { get; set; }

        public int RoleId { get; set; }

        public string? Status { get; set; }
        public int IsActive { get; set; }
        public bool IsEdit { get; set; }
        public bool? IsRead { get; set; }

    }
    public class Menu : BaseModel
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string DisplayOrder { get; set; }
        public string MenuURL { get; set; }
        public int ParentMenuId { get; set; }
        public string DisplayName { get; set; }
        public string Icon { get; set; }
        public string IconClassName { get; set; }
        public int MenuLevel { get; set; }
        public string Relation { get; set; }
    }
}
