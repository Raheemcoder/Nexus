namespace Ideation.Models
{
    public class RiskRegister
    {
        public IssueTracker IssueTracker { get; set; }
        public int RiskId { get; set; }
        public int RiskCode { get; set; }
        public int ActionId { get; set; }
        public string RiskDescription { get; set; }
        public string RiskIdentificationDate { get; set; }
        public string ImpactDescription { get; set; }
        public string ImpactArea { get; set; }
        public int ImpactLevel { get; set; }
        public int ProbabilityLevel { get; set; }
        public int PriorityLevel { get; set; }
        public string ActionPlan { get; set; }
        public string Resources { get; set; }
        public string DueDate { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string OwnerUpdate { get; set; }
        public string LatestOwnerUpdate { get; set; }
        public string ClosedDetails { get; set; }
    }

    public class RiskRegisterHeader
    {
        public int RiskId { get; set; }
        public string RiskNo { get; set; }
        public int ProjectId { get; set; }
        public string RiskDesc { get; set; }
        public string RiskIdentificationDate { get; set; }
        public string ImpactArea { get; set; }
        public string ImpactedDesc { get; set; }
        public string ImpactLevel { get; set; }
        public string ProbabilityLevel { get; set; }
        public string PriorityLevel { get; set; }
    }

}