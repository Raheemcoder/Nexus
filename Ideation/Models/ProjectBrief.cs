namespace Ideation.Models
{
    public class ProjectBrief
    {
        public string ID { get; set; }
        public string ProjectType { get; set; }
        public string Hub { get; set; }
        public string Division { get; set; }
        public string Category { get; set; }
        public string ProjectCategorization { get; set; }
        public string SubmittedBy { get; set; }
        public string SubmittedDate { get; set; }
        public string ProjectName { get; set; }
        public string Status { get; set; }
        public string StatusID { get; set; }
        public string? RandDName { get; set; }
        public string PMDUser { get; set; }
        public string HGMLUser { get; set; }
        public string? ApprovedDate { get; set; }
        public string? IsHubApprove { get; set; }
        public string? ProductName { get; set; }
        public string? Products { get; set; }
        public string? HGMLApprovedate { get; set; }
        public string? CurrentDate { get; set; }
        public string? InitiatedBy { get; set; }

        public string? IsEditableByManager { get; set; }
        public string? Legacy { get; set; }
        public string? SupportingDocument { get; set; }

        public string? Date { get; set; }
        public string? HGMLApprovedDate { get; set; }
        public string? BriefDemotedtoHGML { get; set; }
        public string? BriefDemotedtoInitiator { get; set; }
        public string? UnderExplorationDate { get; set; }
        public string? UnderExplorationDueDate { get; set; }
        public string? RemarksForUnderExp { get; set; }



    }
}