using Microsoft.AspNetCore.Mvc.Rendering;
using Org.BouncyCastle.Asn1.Mozilla;
using System.Collections;
using System.Text;

namespace Ideation.Models
{
    public class ProtMaster
    {
        public IEnumerable<ProtProjectMaster> ProjectDetailList { get; set; }
    }
    public class ProtProjectMaster
    {
        public string? ProjectNo { get; set; }
        public string? ProjectName { get; set; }
        public string? ProductName { get; set; }
        public string? ProjectDescription { get; set; }
        public string? HghCode { get; set; }
        public string? DivisionName { get; set; }
    }

    public class Prototype
    {

        public string? OutMessage { get; set; }
        public string? StyleClass { get; set; }

        public string? StatusId { get; set; }
        public string? UserRoleId { get; set; }
        public string? FromStageName { get; set; }
        public string? PrototypeId { get; set; }
        public string? empId { get; set; }
        public String? Role { get; set; }
        public string? RoleId { get; set; }
        public string? ProjectNo { get; set; }
        public string? UserName { get; set; }
        public string? DownloadFileInfo { get; set; }
        public IEnumerable<ProjectNumberList>? projectnumberlist { get; set; }

        public IEnumerable<SelectListItem>? ProjectNoList { get; set; }
        public IEnumerable<ProductNameList>? productnamelist { get; set; }
        public IEnumerable<SelectListItem>? ProjectNames { get; set; }
        public IEnumerable<StatusList>? statuslist { get; set; }
        public IEnumerable<SelectListItem>? statusNames { get; set; }


        public string? ProjectDescription { get; set; }
        public string? HghCode { get; set; }
        public string? ProductName { get; set; }
        public string? DivisionName { get; set; }
        public string? DosageForm { get; set; }
        public string? ProvisionalClaim { get; set; }
        public string? Remarks { get; set; }
        public string? SupportingDocument { get; set; }

        public string? ProjectDetails { get; set; }
        public string? SubmissionNo { get; set; }

        public string? SubmissionDetailsData { get; set; }
        public string? PrototypeDetailsHeaderData { get; set; }

        public IEnumerable<PrototypeDetailsHeader>? PrototypeDetailsList { get; set; }
        public IEnumerable<PrototypeSubmissionDetail>? PrototypeSubmissionDetailsList { get; set; }

        public string? JsonFormPrototypeData { get; set; }

        public string? SelectedPmdUsersToSendPrototype { get; set; }
        public string? ConfirmationRemarks { get; set; }
        public IEnumerable<PrototypePmdUserList> PmdUserList { get; set; }
        public IEnumerable<PrototypeDetailsHeader> SupportingDocumentDetailList { get; set; }
        public IEnumerable<PrototypeHistoryDetails> PrototypeApprovalHistory { get; set; }
        public IEnumerable<StatusNameList>? statusNamesList { get; set; }

        public IEnumerable<HubStatusinform> HubStatusInfo { get; set; }
        public IEnumerable<CompositionHistory> CompositionInfo { get; set; }
        public string? HistoryProtoTypeId { get; set; }
        public string? ApprovalStatus { get; set; }

        public IEnumerable<HubDetail>? PrototypeHubReviewData { get; set; }
        public string? JsonFormPrototypeHubReviewData { get; set; }

        public IEnumerable<PrototypeSubmissionDetail>? PrototypeHgmlReviewData { get; set; }
        public string? JsonFormPrototypeHgmlReviewData { get; set; }
        public string? JsonFormPrototypeApprovedData { get; set; }
        public string? ReceivedDate { get; set; }
        public string? JsonFormPrototypeReworkData { get; set; }

        public string? Icon { get; set; }
        public string? PrototypeHubDetais { get; set; }

    }
    public class PrototypeHistoryDetails
    {
        public String? FromStage { get; set; }
        public String? ToStage { get; set; }
        public String? FromStageName { get; set; }
        public String? ToStageName { get; set; }
        public String? ReceivedOn { get; set; }
        public String? SubmittedOn { get; set; }
        public String? RemarksBy { get; set; }
        public String? NoOfDaysTaken { get; set; }
        public String? Remarks { get; set; }
        public string? AssignedTo { get; set; }
    }

    public class StatusNameList
    {
        public String? StatusName { get; set; }
        public String? StatusId { get; set; }
    }
    public class PrototypeDetailsHeader
    {
        public string? PrototypeId { get; set; }
        public string? SubmissionNo { get; set; }
        public string? ProjectNo { get; set; }
        public string? ProjectDescription { get; set; }
        public string? ProductName { get; set; }
        public string? DivisionName { get; set; }
        public string? HghCode { get; set; }
        public string? ProvisionalClaim { get; set; }
        public string? DosageForm { get; set; }
        public string? InitiatedBy { get; set; }
        public string? InitiatedOn { get; set; }
        public string? CompletedOn { get; set; }
        public string? StatusName { get; set; }
        public string? hubuser { get; set; }
        public string? StatusId { get; set; }
        public string? hubstatus { get; set; }
        public string? Remarks { get; set; }
        public string? NoOfSubmission { get; set; }
        public string? SupportingDocument { get; set; }
        public string? ReceivedDate { get; set; }
        public string? SendToHub { get; set; }
        public string? HGMLuser { get; set; }
        public string? HubApprovalFromStatus { get; set; }
        public string? IsHgmlApproved { get; set; }
        public string? UserName { get; set; }
        public string? PMDuser { get; set; }
        public string? Status { get; set; }
        public string? IsEditableByManager { get; set; }

    }

    public class PrototypeSubmissionDetail
    {
        public string? PrototypeId { get; set; }
        public string? SubmissionNo { get; set; }
        public string? Date { get; set; }
        public string? BatchNumber { get; set; }
        public string? SamplesByFd { get; set; }
        public string? FandDComments { get; set; }
        public string? Composition { get; set; }
        public string? SamplesSentTo { get; set; }
        public string? HgmlStatus { get; set; }
        public string? HgmlRemarks { get; set; }

        public string? NumberOfSamples { get; set; }
        public string? TrackingDetails { get; set; }
        public string? PmdRemarks { get; set; }
        public string? HubStatus { get; set; }
        public string? HubRemarks { get; set; }
        public string? RejectRemarks { get; set; }
        public string? ViewComposition { get; set; }

    }

    public class ProjectNumberList
    {
        public string? ProjectNo { get; set; }
        public string? ProjectName { get; set; }
    }

    public class ProductNameList
    {
        public string ProductName { get; set; }
    }
    public class StatusList
    {
        public string? StatusId { get; set; }
        public string? StatusName { get; set; }

    }

    public class PrototypePmdUserList
    {
        public string? LoginId { get; set; }
        public string? UserEmail { get; set; }

    }

    public class HubDetail
    {
        public string? SubmissionNo { get; set; }

        public string? HubId { get; set; }
        public string? HubName { get; set; }
        public string? HubUser { get; set; }
        public string? UserName { get; set; }


        public string? BatchNo { get; set; }
        public string? NumberOfSamples { get; set; }
        public string? ViewComposition { get; set; }
        public string? TrackingDetails { get; set; }
        public string? PmdRemarks { get; set; }
        public string? PrototypeId { get; set; }

        public string? Composition { get; set; }
        public string? FandDComments { get; set; }
        public string? SamplesSentTo { get; set; }
        public string? HubStatus { get; set; }
        public string? HubRemarks { get; set; }
        public string? Date { get; set; }
        public string? IsSelectedHubUser { get; set; }
        public string? SamplesByFd { get; set; }

    }

    public class HubStatusinform
    {
        public string? HubName { get; set; }
        public string? HubUser { get; set; }
        public string? BatchNo { get; set; }
        public string? NumberOfSamples { get; set; }
        public string? PmdRemarks { get; set; }
        public string? HubStatus { get; set; }
        public string? HubRemarks { get; set; }
        public string? RowNumber { get; set; }
        public string? TrackingDetails { get; set; }
        public string? ModifiedDate { get; set; }


    }

    public class CompositionHistory
    {
        public string PrototypeId { get; set; }
        public string SubmissionNo { get; set; }
        public string FileName { get; set; }
        public string Username { get; set; }
        public string CreatedDate { get; set; }
        public string? RowNumber { get; set; }
    }


}
