using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.Numerics;

namespace Ideation.Models
{
    public class ClaimsGridDocument
    {
        public IEnumerable<SelectListItem> ProjectList { get; set; }
        public string ProjectNumber { get; set; }
        public string ProductName { get; set; }
        public string HGLApprovalNumber { get; set; }
        public string ProductPositioningStatement { get; set; }
        public string LicenseCategory { get; set; }
        public string OtherHUBSLicenseCategory { get; set; }
        public string Dosage { get; set; }
        public string Department { get; set; }
        public string Feasibility { get; set; }
        public string TargetOrgan { get; set; }
        public string FormulaFeatures { get; set; }
        public string AnchorHUB { get; set; }
        public string OtherMarkets { get; set; }
        public string ShelfLife { get; set; }
        public string DirectionForUse { get; set; }
        public string Caution { get; set; }
        public string TargetCustomer { get; set; }
        public string Claims { get; set; }
        public string SupportingStmt { get; set; }
        public string MeasuredBy { get; set; }
        public string? OnPackRemarks { get; set; }
        public string CommunicationClaims { get; set; }
        public string SupportingTechStmt { get; set; }
        public string CommunicationClaimsMeasuredBy { get; set; }
        public string? CommunicationRemarks { get; set; }
        public string InitiatedBy { get; set; }
        public string UploadedBy { get; set; }
        public string DocName { get; set; }
        public int Stage { get; set; }
        public IEnumerable<string> CFTDeptNameList { get; set; }
        public string CFTDeptName { get; set; }
        public string GridId { get; set; }
        public string IsEdit { get; set; }

        public string ClaimsHeaders { get; set; }
        public string ProductDescription { get; set; }
        public string ProjectDetails { get; set; }
        public string OnPackClaims { get; set; }
        public string CommunicationClaimsData { get; set; }
        public string? SupportingDoc { get; set; }
        public string? SupportingDocumentData { get; set; }
        public string? DeletedSupportingdocument { get; set; }
        public string? DeletedCFTUploadedDocument { get; set; }
        public string JsonClaimsData { get; set; }
        public string ApprovalStatus { get; set; }
        public string CFTApprovalStatus { get; set; }
        public string DepartmentList { get; set; }

        public IEnumerable<ClaimsHeaders>? ClaimsHeadersList { get; set; }
        public IEnumerable<SelectListItem>? HubList { get; set; }
        public IEnumerable<SelectListItem>? DeptList { get; set; }
        public IEnumerable<SelectListItem>? LicenseCategoryList { get; set; }
        public string Statuses { get; set; }
        public IEnumerable<ExistingClaimsProject>? ExistingClaimsProjectList { get; set; }
        public IEnumerable<DeptUsers>? DeptUsersList { get; set; }
        public IEnumerable<ClaimsProductDescription>? ClaimsProductDescription { get; set; }
        public IEnumerable<ClaimsProjectDetails>? ClaimsProjectDetails { get; set; }
        public IEnumerable<ClaimsOnPackDetails>? ClaimsOnPackDetails { get; set; }
        public IEnumerable<ClaimsCommunicationDetails>? ClaimsCommunicationDetails { get; set; }
        public IEnumerable<ClaimsSupportingDocument>? ClaimsSupportingDocument { get; set; }
        public IEnumerable<CftUploadedDocument>? CFTUploadedDocumentDetails { get; set; }
        public IEnumerable<ClaimsOnPackDetails>? ClaimsCFTOnPackReviewList { get; set; }
        public IEnumerable<ClaimsCommunicationDetails>? ClaimsCFTCommunicationReviewList { get; set; }
        public IEnumerable<ClaimsGridListView>? ClaimsGridList { get; set; }
        public IEnumerable<CFTApprovalStatus>? CFTApprovalList { get; set; }
        public List<RequiredClaims> RequiredClaimsDetials { get; set; }
        public IEnumerable<DepartmentBasedOnHub> DeptBasedOnHub { get; set; }
        public IEnumerable<DepartmentsForFileUpload> DeptForFileUpload { get; set; }
        public IEnumerable<DepartmentsForExcelUpload> DeptForExcelUpload { get; set; }
        public IEnumerable<ClaimsExcelModel> OnPackClaimsExcelData { get; set; }
        public IEnumerable<ClaimsExcelModel2> CommunicationClaimsExcelData { get; set; }
        //   public IEnumerable<IRAExcelUpload> IRADocumentName { get; set; }
        public string ResponsibleDept { get; set; }
        public string DeptDetails { get; set; }
        public string JsonCFTReviewData { get; set; }
        public string JSONClaimsGridData { get; set; }
        public string OnPackClaimsRemarks { get; set; }
        public string CommunicationClaimsRemarks { get; set; }
        public string IRAExcelDocument { get; set; }

        public string OnPackClaimsWithRemarks { get; set; }
        public string CommunicationClaimsWithRemarks { get; set; }

        public string ProjectBrief { get; set; }
        public string MustHaveClaims { get; set; }
        public string NiceToHaveClaims { get; set; }
        public string RephraseClaims { get; set; }
        public string ProjectBriefId { get; set; } = string.Empty;
        public string Role { get; set; }
        public string UserRole { get; set; }
        public string UserDepartment { get; set; }
        public string LoginId { get; set; }
        public string Division { get; set; }
        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? DeptListForSendMail { get; set; }
        public string PMDUsers { get; set; }
        public IEnumerable<SelectListItem>? PMDUsersList { get; set; }
    }

    public class RequiredClaims
    {
        public string ProjectBriefId { get; set; }
        public string ProjectId { get; set; }
        public string MustHaveClaims { get; set; }
        public string NiceToHaveClaims { get; set; }
    }


    public class DeptUsers
    {
        public string Dept { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }

    }
    public class CFTApprovalStatus
    {
        public string DeptName { get; set; }
        public string DeptUser { get; set; }
        public string Status { get; set; }
        public string CFTRemarks { get; set; }
        public string AnchorDept { get; set; }

    }
    public class CFTRemarksList
    {
        public string Claims { get; set; }

        public string CFTRemarks { get; set; }

    }



    public class ClaimsHub
    {
        public string HUBName { get; set; }
    }

    public class ClaimsLicenseCategory
    {
        public string LicenseId { get; set; }
        public string LicenseCategory { get; set; }

    }


    public class ClaimsDepartments
    {
        public string DeptId { get; set; }
        public string DeptName { get; set; }

    }

    public class ExistingClaimsProject
    {
        public string ProjectNumber { get; set; }
    }

    public class ClaimsGridProjectData
    {
        public string ProductName { get; set; }
        public string HGLApprovalNumber { get; set; }
    }


    public class ClaimsHeaders
    {
        public string ID { get; set; }
        public string ProjectNumber { get; set; }
        public string HGLApprovalNumber { get; set; }
        public string Date { get; set; }
        public string VersionNo { get; set; }
        public string StatusId { get; set; }

    }

    public class ClaimsProductDescription
    {
        public string ID { get; set; }
        public string LicenseCategory { get; set; }
        public string LicenseCategoryName { get; set; }
        public string Dosage { get; set; }
        public string TargetOrgan { get; set; }
        public string FormulaFeatures { get; set; }
        public string AnchorHUB { get; set; }
        public string OtherMarkets { get; set; }
        public string ShelfLife { get; set; }
        public string DirectionForUse { get; set; }
        public string Caution { get; set; }
        public string TargetCustomer { get; set; }
        public string OtherHUBSLicenseCategory { get; set; }
    }
    public class ClaimsProjectDetails
    {
        public string ID { get; set; }
        public string ProjectNumber { get; set; }
        public string ProductName { get; set; }
        public string HGLApprovalNumber { get; set; }
        public string ProductPositioningStatement { get; set; }
        public string Division { get; set; }
        public string DivisionName { get; set; }
    }
    public class ClaimsOnPackDetails
    {
        public string ClaimsID { get; set; }
        public string ProjectNumber { get; set; }
        public string Claims { get; set; }
        public string SupportingStmt { get; set; }
        public string MeasuredBy { get; set; }
        public string OnPackRemarks { get; set; }
        public string Feasibility { get; set; }
        public string CFTRemarksValue { get; set; }
        public string ResponsibleDepartment { get; set; }
        public string Comments { get; set; }
        public string DocumentName { get; set; }
        public string Department { get; set; }
        public int FromStageNo { get; set; }
        public int ToStageNo { get; set; }
        public string subOnpackClaims { get; set; }

    }
    public class SubOnPackClaims
    {
        public int SubClaimsGridOnPackId { get; set; }
        public int OnPackId { get; set; }
        public string GridId { get; set; }
        public string SupportingStatement { get; set; }
        public string MeasuredBy { get; set; }
    }
    public class SubCommunicationClaims
    {
        public int SubClaimsCommunicationId { get; set; }
        public int CommunicationId { get; set; }
        public string GridId { get; set; }
        public string SupportingStatement { get; set; }
        public string MeasuredBy { get; set; }
    }

    public class ClaimsCommunicationDetails
    {
        public string ClaimsID { get; set; }
        public string ProjectNumber { get; set; }
        public string CommunicationClaims { get; set; }
        public string SupportingTechStmt { get; set; }
        public string CommunicationClaimsMeasuredBy { get; set; }
        public string CommunicationRemarks { get; set; }
        public string Feasibility { get; set; }
        public string CFTRemarksValue { get; set; }
        public string ResponsibleDepartment { get; set; }
        public string Comments { get; set; }
        public string DocumentName { get; set; }
        public string Department { get; set; }
        public int FromStageNo { get; set; }
        public int ToStageNo { get; set; }
        public string subCommunicationClaims { get; set; }
    }

    public class ClaimsSupportingDocument
    {
        public string SupportingDocument { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedOn { get; set; }
    }

    public class CftUploadedDocument
    {
        public string CFTUploadedDocument { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedOn { get; set; }
        public string UpdatedBy { get; set; }
    }


    public class ClaimsUserDetails
    {
        public string Department { get; set; }
        public string Role { get; set; }
        public IEnumerable<ClaimsGridListView> ClaimsGridList { get; set; }
    }

    public class ClaimsGridListView
    {
        public string GridId { get; set; }
        public string ProjectNumber { get; set; }
        public string StatusName { get; set; }
        public string ProjectDescription { get; set; }
        public string HGLApprovalNumber { get; set; }
        public string ProductName { get; set; }
        public string LicenseCategory { get; set; }
        public string Dosage { get; set; }
        public string AnchorHUB { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string ApprovedBy { get; set; }
        public string Remarks { get; set; }
        public string IsEdit { get; set; }
        public string SupportingDocument { get; set; }
        public string Status { get; set; }
        public string ApprovedOn { get; set; }
        public string ApprovedOnForExcel { get; set; }
        public string Division { get; set; }


    }
    public class ClaimsExcelModel
    {
        [Description("Project Number")]
        public string ProjectNumber { get; set; }
        public string Claims { get; set; }
        [Description("Supporting technical statements from R&D")]
        public string SupportingStmt { get; set; }
        [Description("Measured By")]
        public string MeasuredBy { get; set; }
        public string Remarks { get; set; }
        [Description("Feasibility of Achieving claims")]
        public string Feasibility { get; set; }
        [Description("Responsible Department")]
        public string ResponsibleDepartment { get; set; }
    }

    public class ClaimsExcelModel2
    {
        [Description("Project Number")]
        public string ProjectNumber { get; set; }
        public string Claims { get; set; }
        [Description("Supporting technical statements from R&D")]
        public string SupportingStmt { get; set; }
        [Description("Measured By")]
        public string MeasuredBy { get; set; }
        public string Remarks { get; set; }
        [Description("Feasibility of Achieving claims")]
        public string Feasibility { get; set; }
        [Description("Responsible Department")]
        public string ResponsibleDepartment { get; set; }
    }
    public class ClaimsHistoryRemarks
    {
        public string FromStage { get; set; }
        public string ToStage { get; set; }
        public string ToStageName { get; set; }
        public string AssignedTo { get; set; }
        public string ReceivedOn { get; set; }
        public string SubmittedOn { get; set; }
        public string SubmittedBy { get; set; }
        public string NoOfDaysTaken { get; set; }
        public string Remarks { get; set; }
        public string GridId { get; set; }
    }

    public class ClaimsSendMailData
    {
        public string ID { get; set; }
        public string ProjectNumber { get; set; }
        public string ProductName { get; set; }
        public string LicenseCategory { get; set; }
        public string Dosage { get; set; }
        public string AnchorHUB { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string ApprovedBy { get; set; }
        public string CurrentDate { get; set; }
        public string Division { get; set; }
        public string HGHCode { get; set; }
        public string CFTSignOffOn { get; set; }
        public string NonCFTSignOffOn { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public string DSGSignedOffDate { get; set; }
        public string AddendumDate { get; set; }

    }

    public class DepartmentBasedOnHub
    {
        public string DeptName { get; set; }
    }

    public class DepartmentsForFileUpload
    {
        public string DeptName { get; set; }
    }
    public class DepartmentsForExcelUpload
    {
        public string DeptName { get; set; }
    }

    //public class IRAExcelUpload
    //{
    //    public string DocumentName { get; set; }

    //}

    public class DocumentDetails
    {
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public string DocumentName { get; set; }
        public string DeptName { get; set; }
    }

    public class PMDUsersMaster
    {
        public string UserName { get; set; }
        public string UserId { get; set; }

    }
}
