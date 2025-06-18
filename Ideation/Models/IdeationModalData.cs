using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class IdeationModalData
    {
        public int InnovationId { get; set; }
        public string BusinessDivisionName { get; set; }
        public string InnovationTitle { get; set; }
        public string PlatformTypeName { get; set; }
        public string Keyword { get; set; }
        public string Other { get; set; }
        public string GeographicName { get; set; }
        public string Description { get; set; }
        public string StrategicFitName { get; set; }
        public string FilePath { get; set; }
        public string StatusName { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string Remarks { get; set; }
        public int RemarkId { get; set; }
        public string RemarkName { get; set; }
        public string RemarkDiscription { get; set; }
        public IEnumerable<SelectListItem> RemarksList { get; set; }
        public string ActionBy { get; set; }
    }
}
