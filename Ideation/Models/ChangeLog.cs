using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Ideation.Models
{
    public class ChangeLog
    {
        public IssueTracker IssueTracker { get; set; }
        public int ChangeNo { get; set; }
        public string ChangeId { get; set; }
        public int ProjectId { get; set; }
        public int HubId { get; set; }
        public string ProposedBy { get; set; }
        public string ProposedDate { get; set; }
        public string ChangeDetails { get; set; }
        public string HubName { get; set; }
        public string ImpactArea { get; set; }
        public string ImpactDescription { get; set; }
        public string ChangeRequestStatus { get; set; }
        public string AgreedRejectedBy { get; set; }
        public string AgreedRejectedDate { get; set; }
        public string ActionPlan { get; set; }
        public string Resources { get; set; }
        public string DueDate { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string OwnerUpdate { get; set; }
        public string LatestOwnerUpdate { get; set; }
        public string ClosedDetails { get; set; }
        public string Remarks { get; set; }
        public string LatestRemarks { get; set; }

    }
    public class ChangeLogHeader
    {
        public string ChangeId { get; set; }
        public int ChangeNo { get; set; }
        public int ProjectId { get; set; }
        public string Hub { get; set; }
        public string ChangeDesc { get; set; }
        public string ProposedDate { get; set; }
        public string ProposedBy { get; set; }
        public string ImpactArea { get; set; }
        public string ImpactedDesc { get; set; }
        public string CRStatus { get; set; }
        public string AgreedRejectedDate { get; set; }
        public string AgreedRejectedBy { get; set; }
    }

}