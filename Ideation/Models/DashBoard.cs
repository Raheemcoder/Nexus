using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class DashBoard
    {
        public string? PlatformTypeName { get; set; }
        public string? BusinessDivisionName { get; set; }
        public string? StatusName { get; set; }
        public string? TicketCount { get; set; }

        public IEnumerable<PlatformType> PlatformTypeList { get; set; }
        public IEnumerable<BusinessDivision> BusinessDivisionList { get; set; }
        public IEnumerable<DashBoard> StatusList { get; set; }

    }
}
