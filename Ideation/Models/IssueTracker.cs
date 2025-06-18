using System.Web.Mvc;
namespace Ideation.Models
{
    public class IssueTracker
    {
        public int ProjectId { get; set; }
        public int HubId { get; set; }
        public string HubName { get; set; }
        public string SelectedHub { get; set; }
        public string SelectedCR { get; set; }
        public int IssueId { get; set; }
        public int IssueNo { get; set; }
        public string IssueDescription { get; set; }
        public string IdentificationDate { get; set; }
        public string ImpactAssesment { get; set; }
        public string ImpactedTask { get; set; }
        public string ActionPlan { get; set; }
        public string Resouces { get; set; }
        public string Duedate { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string OwnerUpdate { get; set; }
        public string ClosedDetails { get; set; }
        public string SelectedImpactedTaskHub { get; set; }
        public string Message { get; set; }
        public string MessageClass { get; set; }
        public IEnumerable<IssueTrackerHubList>? HubList { get; set; }
        public IEnumerable<IssueTrackerImpactAssList>? ImpactAssessementList { get; set; }
        public IEnumerable<IssueTrackerPriorityList>? PriorityList { get; set; }
        public IEnumerable<IssueTrackerStatusList>? StatusList { get; set; }
        public IEnumerable<IssueTrackerAllList>? AllDropDownList { get; set; }
        public IEnumerable<IssueTrackerAssignedtoList>? AssignedtoList { get; set; }
        public IEnumerable<ChangeLogCRStatusList>? CRStatusList { get; set; }
        public IEnumerable<RiskRegisterILList>? ImpactLevelList { get; set; }
        public IEnumerable<RiskRegisterPLList>? ProbabilityLevelList { get; set; }
        
    }
}

public class IssueHeader
{
    public string IssueId { get; set; }
    public string Hub { get; set; }
    public string IssueDesc { get; set; }
    public string IssueIdenDate { get; set; }
    public string ImpactedAss { get; set; }
}
public class IssueDetail
{
    public string ActionId { get; set; }
    public string ActionPlan { get; set; }
    public string AssignedTo { get; set; }
    public string DueDate { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
    public string OwnerUpdate { get; set; }
    public string ClosedDate { get; set; }
    public string ClosedRemark { get; set; }
}
public class IssueImpactedTask
{                                                                               
    public string TaskId { get; set; }
    public string TaskDescription { get; set; }
    public string HUBId { get; set; }
    public string HUB { get; set; }
    public int IsActive { get;set; }
}
public class IssueTrackerHubList
{
    public string HubId { get; set; }
    public string HubName { get; set; }
}
public class IssueTrackerImpactAssList
{
    public string ImpactId { get; set; }
    public string ImpactName { get; set; }
}
public class IssueTrackerPriorityList
{
    public string PriorityId { get; set; }
    public string PriorityName { get; set; }
}
public class IssueTrackerStatusList
{
    public string StatusId { get; set; }
    public string StatusName { get; set; }
}
public class IssueTrackerAllList
{
    public string Text { get; set; }
    public string Value { get; set; }
    public string Type { get; set; }
}
public class IssueTrackerAssignedtoList
{
    public string EmployeeName { get; set; }
    public string UserName { get; set; }
    public string EmployeeCode { get; set; }
}
public class ChangeLogCRStatusList
{                                                                               
    public string CRStatusId { get; set; }
    public string CRStatusName { get; set; }
}
public class RiskRegisterILList
{                                                                               
    public string ImpactLevelId { get; set; }
    public string ImpactLevelName { get; set; }
}
public class RiskRegisterPLList
{                                                                               
    public string ProbabilityLevelId { get; set; }
    public string ProbabilityLevelName { get; set; }
}