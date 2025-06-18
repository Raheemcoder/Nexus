namespace Ideation.Models
{
    public class BusinessDivision
    {
        public int BusinessDivisionId { get; set; }
        public string BusinessDivisionName { get; set; }
    }

    public class Masters
    {
        public IEnumerable<BusinessDivision> BusinessDivisions { get; set; }
        public IEnumerable<GeographicScope> GeographicScopes { get; set; }
        public IEnumerable<PlatformType>  PlatformTypes { get; set; }
        public IEnumerable<StrategicFit> StrategicFits { get; set; }
        public IEnumerable<Status> Statuses { get; set; }
        public IEnumerable<RemarkType> Remarks { get; set; }

        
    }
}
