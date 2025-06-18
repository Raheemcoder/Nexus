using System.Web.Mvc;

namespace Ideation.Models
{
    public class EPPMProjectMaster
    {
        public int ProjectId { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public string Division { get; set; }
        public string Type { get; set; }
        public string HubName { get; set; }
        public string HubStatus { get; set; }
        public string ProjectStartDate { get; set; }
        public string ProjectEndDate { get; set; }
        public string Manager { get; set; }
        public string PMUMappingStatus { get; set; }
        public string Status { get; set; }
        public int ProjectStatusId { get; set; }
        public string Hub { get; set; }
        public string JsonData { get; set; }
        public int StatusId { get; set; }
        public List<string> getProjectList { get; set; }
        public IEnumerable<SelectListItem> ProjectStatusList { get; set; }
        public string Class { get; set; }
        public List<string> StatusDropdown { get; set; }
        public string IsActive { get; set; }
        public List<string> IsActiveList { get; set; }
        public string IsActiveClass { get; set; }
        public string AllMilestonesCompleted { get; set; }
        public string IsProjectPlanning { get; set; }
    }
}