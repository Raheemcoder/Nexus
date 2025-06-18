namespace Ideation.Models
{
    public class ClaimsPdf
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string VersionNo { get; set; }
        public string CreatedDate { get; set; }
        public string ProjectNumber { get; set; }
        public string MustHaveClaims { get; set; }
        public string NiceToHaveClaims { get; set; }
        public string RephraseClaims { get; set; }
        public string HGLApprovalNumber { get; set; }
        public string ProductPositionStatement { get; set; }
        public string DivisionName { get; set; }
        public string GridId { get; set; }
        public string LabelName { get; set; }
        public string Description { get; set; }
        public string TargetCustomer { get; set; }
        public IEnumerable<SupportDocument> SupportingDocument { get; set; }
        public IEnumerable<ClaimsProductDescrtion> ProductDescrtionDetails { get; set; }
        public IEnumerable<OnPackLabelClaims> OnPackLabelClaimsDetails { get; set; }
        public IEnumerable<OnPackLabelClaims> ClaimsForCommunication { get; set; }

        public IEnumerable<DSGTeamData>? DSGTeamApprovalData { get; set; }
        public IEnumerable<CFTTeamData>? CFTTeamApprovalData { get; set; }
        public IEnumerable<DSGReviewTeamData>? DSGReviewTeamApprovalData { get; set; }
        public IEnumerable<DSGManagerData>? DSGManagerApprovalData { get; set; }
        public IEnumerable<DSGSignoffData>? DSGSignOffApprovalData { get; set; }
        public IEnumerable<AddedndumData>? AddendumApprovalData { get; set; }
        public IEnumerable<AddendumRemarks>? AddendumRemarks { get; set; }
    }
    public class SupportDocument
    {
        public string SupportingDocument { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedOn { get; set; }
    }
    public class ClaimsProductDescrtion
    {
        public string LabelName { get; set; }
        public string Description { get; set; }
    }
    public class OnPackLabelClaims
    {
        public string Claims { get; set; }
        public string Feasibility { get; set; }
        public string SupportingStmt { get; set; }
        public string MeasuredBy { get; set; }
        public string OnPackRemarks { get; set; }
        public string ResponsibleDepartment { get; set; }
        public string SubClaims { get; set; }
        public IEnumerable<SubOnPackClaims> SubClaimsDetails { get; set; }
    }

    public class DSGTeamData
    {
        public string DSGTeamCreatedBy { get; set; }
        public string DSGTeamCreatedOn { get; set; }
    }

    public class CFTTeamData
    {
        public string CFTTeamCreatedBy { get; set; }
        public string CFTDepartments { get; set; }
        public string CFTTeamCreatedOn { get; set; }
    }
    public class DSGReviewTeamData
    {
        public string DSGReviewBy { get; set; }
        public string DSGReviewOn { get; set; }
    }
    public class DSGManagerData
    {
        public string DSGManager { get; set; }
        public string DSGManagerApprovedOn { get; set; }
    }
    public class DSGSignoffData
    {
        public string DSGSignOffBy { get; set; }
        public string DSGSingOffOn { get; set; }
    }
    public class AddedndumData
    {
        public string ApprovedBy { get; set; }
        public string ApprovedOn { get; set; }
    }

    public class AddendumRemarks
    {
        public string AddendumNo { get; set; }
        public string Reason { get; set; }
        public string Date { get; set; }
    }
}