namespace Ideation.Models
{
    public class InnovationStats
    {
        public int InnovationId { get; set; }
        public string? InnovationTitle { get; set; }
        
        public string? Keyword { get; set; }
        public string? PlatformTypeId { get; set; }
        public string? Other { get; set; }
        public string? BusinessDivisionId { get; set; }
        public string? GeographicId { get; set; }

        public string[] StrategicFitId { get; set; }
        public string? StrategicFitNames { get; set; }
        public string? FilePath { get; set; }
        public string? FileNames { get; set; }
        public IFormFile? PostedFile { get; set; }
        public string? Description { get; set; }



        public string? PlatformTypeName { get; set; }
        public string? StrategicFitName { get; set; }
        public string? StatusName { get; set; }
        public string? CreatedDate { get; set; }



    }
}
