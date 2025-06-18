using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class IdeationData
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string? PlatformTypeId { get; set; }
        public string? BusinessDivisionId { get; set; }
        public string? GeographicId { get; set; }
        public string? StatusId { get; set; }
        public int RemarkId { get; set; }
        public IQueryable<IdeationList> IdeationListData { get; set; }
        public IEnumerable<SelectListItem> PlatformTypeList { get; set; }
        public IEnumerable<SelectListItem> BusinessDivisionList { get; set; }
        public IEnumerable<SelectListItem> GeographicList { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }

        public IEnumerable<SelectListItem> RemarksList { get; set; }
        public IEnumerable<SelectListItem> RemarkDiscriptionList { get; set; }


        public string RemarkName { get; set; }
        public string? RemarkDiscription { get; set; }

    }

    public class IdeationList
    {
        public int InnovationId { get; set; }
        public string BusinessDivisionName { get; set; }
        public string InnovationTitle { get; set; }
        public string PlatformTypeName { get; set; }
        public string Other { get; set; }
        public string GeographicName { get; set; }
        public string StrategicFitName { get; set; }
        public string Description { get; set; }
        public string StatusName { get; set; }

        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }


    }
}
