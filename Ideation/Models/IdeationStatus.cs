namespace Ideation.Models
{
    public class IdeationStatus
    {
        public int InnvoationId { get; set; }
        public string ActionBy { get; set; }
        public string Action { get; set; }
        public string Remarks { get; set; }
        public int RemarkId { get; set; }

        public string InnovationTitle { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
    }
}
