using DocumentFormat.OpenXml.Presentation;
//using Irony.Parsing;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class PackageInitiatives
    {
        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? CategoryList { get; set; }
        public IEnumerable<SelectListItem>? HubList { get; set; }
        public IEnumerable<SelectListItem>? CurrencyList { get; set; }
        public IEnumerable<PackageHeaderTableData> PackageHeader { get; set; }
        public IEnumerable<PackageInitiativesProjectDetails> ProjectDetails { get; set; }
        public IEnumerable<PackageInitiativesProductDescription> PackageProductDesc { get; set; }
        public IEnumerable<PackageInitiativesBusinessInformation> PackageBusinessInfo { get; set; }
        public IEnumerable<PackageInitiativesExpectedPackagingProfile> PackageExpectedData { get; set; }
        public IEnumerable<PackageInitiativeHGMLReviewHGMLData> PackageHGMLData { get; set; }

        public IEnumerable<PackageProjectDetailsHGML> PackageProjectDetailsHGML { get; set; }
        public IEnumerable<PackageProductDescriptionHGML> PackageProductDescriptionHGML { get; set; }
        public IEnumerable<PackageBusinessHGML> PackageBusinessHGML { get; set; }
        public IEnumerable<PackExpectedHGML> PackExpectedHGML { get; set; }
        public IEnumerable<PackageSustainabilityHGML> PackSustainabilityHGML { get; set; }


        public IEnumerable<PackageProjectDetailsHUB> PackageProjectDetailsHUB { get; set; }
        public IEnumerable<PackageSustainabilityHUB> PackageSustainabilityHUB { get; set; }
        public IEnumerable<PackageProductDescriptionHUB> PackageProductDescriptionHUB { get; set; }
        public IEnumerable<PackageBusinessHUB> PackageBusinessHUB { get; set; }
        public IEnumerable<PackExpectedHUB> PackExpectedHUB { get; set; }
        public IEnumerable<PackageHGMLDataORHUBRemarks> PackageHGMLDataORHUBRemarks { get; set; }
        public IEnumerable<IsHubApprove> PackIsHubApproved { get; set; }
        public IEnumerable<HgmlDataHUBParticipatingMarket> HgmlDataHUBParticipatingMarket { get; set; }

        public IEnumerable<PackTargetCostData>? TargetCostDataList { get; set; }

        public IEnumerable<ApprovalStages>? ApprovalStatusData { get; set; }
        public IEnumerable<PmdData> PackagePmdData { get; set; }

        public IEnumerable<PackageInitiativesSustainabilityData> PackageSustainabilityData { get; set; }

        public IEnumerable<PackageProjectDetailsPMD> PackageProjectDetailsPMD { get; set; }
        public IEnumerable<PackageProductDescriptionPMD> PackageProductDescriptionPMD { get; set; }
        public IEnumerable<PackageBusinessPMD> PackageBusinessPMD { get; set; }
        public IEnumerable<PackExpectedPMD> PackExpectedPMD { get; set; }
        public IEnumerable<PackSustainabilityPMD> PackSustainabilityPMD { get; set; }

        public IEnumerable<packHgmlApprove>? HubApproveConfirmationList { get; set; }
        public IEnumerable<FieldRemarks>? PackagingProfileFieldRemarks { get; set; }

        public string? TargetCost { get; set; }
        public string? HgmlDataHUBParticipatingMarkets { get; set; }
        public string? Currency { get; set; }
        public string? HubListJson { get; set; }
        public string? HubUsers { get; set; }
        public string SectionType { get; set; }

        public string JsonData { get; set; }
        public string JsonPackHgmlToHubData { get; set; }
        public string JsonPackHgmlToOtherHubData { get; set; }
        public string JsonPMDReview { get; set; }
        public string? PackageHeaderTableData { get; set; }
        public string? PackageProjectDetails { get; set; }
        public string? PackageProductDescription { get; set; }
        public string? PackageBusinessInformation { get; set; }
        public string? PackageExpextedPackagingProfile { get; set; }
        public string? PackageSustainability { get; set; }
        public String? PackageHGMLReviewHGMLData { get; set; }
        public string? ApprovalStatus { get; set; }
        public string? ViewStatus { get; set; }
        public string Status { get; set; }
        public int? StatusId { get; set; }
        public string? Role { get; set; }
        public string ProjectId { get; set; }
        //    [Required(ErrorMessage = "Please select Division")]
        public string? Division { get; set; }
        // [Required(ErrorMessage = "Please select Category")]
        public string? Category { get; set; }
        [Required(ErrorMessage = "Please enter Project Name")]
        public string? ProjectName { get; set; }
        [Required(ErrorMessage = "Please enter BusinessRational")]
        public string? BusinessRational { get; set; }

        public string? PackageProjectDetailsHGMLRemarks { get; set; }
        public string? PackageProductDescriptionHGMLReamrks { get; set; }
        public string? PackageBusinessInformationHGMLRemarks { get; set; }
        public string? ExpectedPackagingHGMLRemarks { get; set; }
        public string? SustainabilityHGMLRemarks { get; set; }
        public string? PackageInitiatorRemarks { get; set; }
        public string? HGMLtoHubRemarks { get; set; }
        public String? HGMLYesOrNo { get; set; }
        public string? PackSendToPmdRemarks { get; set; }

        public string? ID { get; set; }
        public string? PackageProjectDetailsHUBRemarks { get; set; }
        public string? PackageProductDescriptionHUBReamrks { get; set; }
        public string? PackageBusinessInformationHUBRemarks { get; set; }
        public string? ExpectedPackagingHUBRemarks { get; set; }
        public string? SustainabilityHUBRemarks { get; set; }
        public string? PackageHGMLDataHUBRemarks { get; set; }


        public string UserName { get; set; }
        public string HubApprove { get; set; }

        public string[] HubDate { get; set; }
        public string IsHubApproved { get; set; }
        public bool IsEdit { get; set; }
        public bool? IsRead { get; set; }

        public string? ProductName { get; set; }
        public string? NewBrandName { get; set; }
        public string? SKU { get; set; }

        public string? BusinessInfoProduct { get; set; }
        public string? BusinessinfoSKU { get; set; }
        public string? ProposeLaunchDate { get; set; }
        public string? ProposedSellingPrice { get; set; }
        public string? ProposedTP { get; set; }
        public string? ProposedMRP { get; set; }
        public string? ExpectedGP { get; set; }
        public string? UOM { get; set; }
        public string? Businessvalue { get; set; }
        public string? M1Quantity { get; set; }
        public string? M2Quantity { get; set; }
        public string? M3Quantity { get; set; }
        public string? M4Quantity { get; set; }
        public string? M5Quantity { get; set; }
        public string? M6Quantity { get; set; }
        public string? Y1Quantity { get; set; }
        public string? Y2Quantity { get; set; }
        public string? Y3Quantity { get; set; }

        public string? ExpectedProduct { get; set; }
        public string? ExpectedSKU { get; set; }
        public string? PrimaryPackaging { get; set; }
        public string? SecondaryPackaging { get; set; }
        public string? TertiaryPackaging { get; set; }
        public string? BenchmarkProducts { get; set; }
        public string? DesiredProductCharacteristics { get; set; }
        public string? Others { get; set; }
        public string? Moulds { get; set; }
        public string? ImageUpload { get; set; }
        public string[] HubForDropDown { get; set; }
        public string? Hubs { get; set; }
        public string[] hubuser { get; set; }
        public string? Hub { get; set; }

        public string? TargetCostGridData { get; set; }
        public string? DivisionName { get; set; }
        public string? CategoryName { get; set; }
        public string? StatusName { get; set; }
        public string? HgmlData { get; set; }
        public string? packageSendBackToInitiatorRemarks { get; set; }
        public string? HGMLToHUBRemrks { get; set; }
        //  public string? ProductName { get; set; }
        public string? PackHGMLParticipatingMarkets { get; set; }
        public string? PackHGMLProjectPriority { get; set; }
        public string? PackHGMLRemarks { get; set; }
        public string? PackHGMLProductName { get; set; }
        public string? PackRejectRemarks { get; set; }
        public string? PackSendToHubRemarks { get; set; }

        public string? JsonFormPackHUbBusinessData { get; set; }
        public string? JsonPackHUBRemarksData { get; set; }

        public string? SendToHGMLApproveRemarks { get; set; }

        public int? CurrentStatus { get; set; }
        public string? PreviousStatus { get; set; }
        public string? PackProjectDetails { get; set; }
        public string? ProductDescription { get; set; }
        public string? BusinessInformation { get; set; }
        public string? PackagingProfile { get; set; }

        public string ProjectCategorization { get; set; }
        public string ComplexityToBeAssigned { get; set; }
        public string RandDName { get; set; }
        public string Remarks { get; set; }
        public string ProjectLead { get; set; }
        public string TargetFirstPrototypeSubmissionDate { get; set; }
        public string TargetTTDCompletionDate { get; set; }
        public string TargetProductionDate { get; set; }
        public string MajorRiskIfAny { get; set; }
        public string PMDData { get; set; }

        public string PackageProductDescriptionPMDReamrks { get; set; }
        public string? PackageProjectDetailsPMDRemarks { get; set; }
        public string? PackageBusinessInformationPMDRemarks { get; set; }
        public string? ExpectedPackagingPMDRemarks { get; set; }
        public string? SustainabilityPMDRemarks { get; set; }
        public string? PackPMDDataApproveRemarks { get; set; }

        public string? SendToHgmlRemarks { get; set; }

        public string? ConfirmationRemarks { get; set; }
        public string? PmdReviewSelectedUsersToSendMailList { get; set; }

        public string? TotalBusinessValue { get; set; }
        public string? ReceivedDate { get; set; }
        public string? TargetedSustainGoals { get; set; }
        public string? Reusable { get; set; }
        public string? Recycle { get; set; }
        public string? Reducing { get; set; }
        public string? Recovering { get; set; }
        public string? SavedRemarks { get; set; }
        public string? DeletedRemarks { get; set; }
        public string? PMdDueDate { get; set; }

        public string? DivisionForPMD { get; set; }
        public IEnumerable<ProjectBriefHistoryDetails> ProjectBriefHistoryDetails { get; set; }
        public IEnumerable<ProjectBriefStatusNameList>? statusNamesList { get; set; }
        public IEnumerable<PackagingMaster>? packagingMasterList { get; set; }
        public IEnumerable<BenchMarkImages>? ReformulationBenchMarkImages { get; set; }

        public string? SupportingDocumentData { get; set; }
        public string? DeletedSupportingdocument { get; set; }
        public IEnumerable<SupportingDocument>? SupportingDocData { get; set; }

        public IEnumerable<SelectListItem>? MoldList { get; set; }
        public IEnumerable<SelectListItem>? ProjectCategorizationList { get; set; }
        public IEnumerable<SelectListItem>? ComplexityToBeAssignedList { get; set; }
        public IEnumerable<SelectListItem>? RAndDNameList { get; set; }
        public IEnumerable<SelectListItem>? ProjectPriorityList { get; set; }
        public string Icon { get; set; }
        public string Page { get; set; }
    }

    public class PackageInitiativesProjectDetails
    {
        public string ProjectId { get; set; }
        [Required(ErrorMessage = "Enter ProjectName")]
        public string? ProjectName { get; set; }
        [Required(ErrorMessage = "Enter business rational")]
        public string? BusinessRational { get; set; }
        public string? PackageInitiatorRemarks { get; set; }
        public string? IsUpdated { get; set; }


    }
    public class PackageInitiativesProductDescription
    {

        public string? ProjectId { get; set; }
        public string? ProductName { get; set; }
        public string? NewBrandName { get; set; }
        public string? SKU { get; set; }
        public string? IsUpdated { get; set; }

    }

    public class PackageInitiativesBusinessInformation
    {
        public string? ProjectId { get; set; }
        public string? Product { get; set; }
        public string? SKU { get; set; }
        public string? ProposeLaunchDate { get; set; }
        public string? ProposedSellingPrice { get; set; }
        public string? ProposedTP { get; set; }
        public string? ProposedMRP { get; set; }
        public string? Currency { get; set; }
        public string? ExpectedGP { get; set; }
        public string? BusinessValue { get; set; }
        public string? M1Quantity { get; set; }
        public string? M2Quantity { get; set; }
        public string? M3Quantity { get; set; }
        public string? M4Quantity { get; set; }
        public string? M5Quantity { get; set; }
        public string? M6Quantity { get; set; }
        public string? Y1Quantity { get; set; }
        public string? Y2Quantity { get; set; }
        public string? Y3Quantity { get; set; }
        public string? UOM { get; set; }
        public string? HubName { get; set; }
        public string? TotalBusinessValue_Y1 { get; set; }
        public string? TotalBusinessValue_Y2 { get; set; }
        public string? TotalBusinessValue_Y3 { get; set; }
        public string? IsUpdated { get; set; }

    }
    public class PackageInitiativesExpectedPackagingProfile
    {
        public string ProjectId { get; set; }
        public string Product { get; set; }
        public string SKU { get; set; }
        public string? PrimaryPackaging { get; set; }
        public string? SecondaryPackaging { get; set; }
        public string? TertiaryPackaging { get; set; }
        public string? BenchmarkProducts { get; set; }
        public string? DesiredProductCharacteristics { get; set; }
        public string? Others { get; set; }
        public string? Moulds { get; set; }
        public string? ImageUploadedName { get; set; }
        public string? ImageUpload { get; set; }
        public string? IsUpdated { get; set; }

    }

    public class PackageHeaderTableData
    {
        public string? ProjectId { get; set; }
        public string? Hub { get; set; }
        public string? Division { get; set; }
        public string? Category { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? StatusName { get; set; }
        public string? SID { get; set; }
        public string? ReceivedDate { get; set; }

    }

    public class PackageInitiativeHGMLReviewHGMLData
    {

        public string? ProjectId { get; set; }
        public string? Hub { get; set; }
        public string Hubs { get; set; }
        public string? HubUsers { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? ProductName { get; set; }
        public string? ParticipatingMarkets { get; set; }
        public string? ProjectPriority { get; set; }
        public string? Remarks { get; set; }
        public string? HGMLYesOrNo { get; set; }
        public string? ProjectCategorization { get; set; }

    }



    public class PackageProjectDetailsHGML
    {
        public string? PackProjectDetails { get; set; }
    }
    public class PackageProductDescriptionHGML
    {
        public string? ProductDescription { get; set; }
    }
    public class PackageBusinessHGML
    {
        public string? BusinessInformation { get; set; }
    }
    public class PackExpectedHGML
    {
        public string? PackagingProfile { get; set; }
    }


    public class PackageProjectDetailsHUB
    {
        public string? PackProjectDetails { get; set; }
        public string? HUBName { get; set; }
    }

    public class PackageProductDescriptionHUB
    {
        public string? ProductDescription { get; set; }
        public string? HUBName { get; set; }
    }
    public class PackageBusinessHUB
    {
        public string? BusinessInformation { get; set; }
        public string? HUBName { get; set; }
    }
    public class PackExpectedHUB
    {
        public string? PackagingProfile { get; set; }
        public string? HUBName { get; set; }
    }
    public class PackageHGMLDataORHUBRemarks
    {
        public string? PackageHGMLDataHUBRemarks { get; set; }
    }
    public class IsHubApprove
    {
        public string? IsHubApproved { get; set; }
        public string? HubId { get; set; }
        public string? HubName { get; set; }
    }

    public class PmdData

    {
        public string? ProductName { get; set; }
        public string? ProjectCategorization { get; set; }
        public string? ComplexityToBeAssigned { get; set; }
        public string? RandDName { get; set; }
        public string? Remarks { get; set; }
        public string? ProjectLead { get; set; }
        public string? TargetFirstPrototypeSubmissionDate { get; set; }
        public string? TargetTTDCompletionDate { get; set; }
        public string? TargetProductionDate { get; set; }
        public string? MajorRiskIfAny { get; set; }
    }


    public class PackageProjectDetailsPMD
    {
        public string? PackProjectDetails { get; set; }
    }

    public class PackageProductDescriptionPMD
    {
        public string? ProductDescription { get; set; }
    }
    public class PackageBusinessPMD
    {
        public string? BusinessInformation { get; set; }
    }
    public class PackExpectedPMD
    {
        public string? PackagingProfile { get; set; }
    }

    public class packHgmlApprove
    {
        public string? HubName { get; set; }
        public string? IsHubApproved { get; set; }
        public string? HubUser { get; set; }


    }

    public class HgmlDataHUBParticipatingMarket
    {
        public string? HubName { get; set; }
        public string? HgmlDataHUBParticipatingMarkets { get; set; }
        public string? PackageHGMLDataORHUBRemarks { get; set; }
    }

    public class ProjectBriefHistoryDetails
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
    public class ProjectBriefStatusNameList
    {
        public String? StatusName { get; set; }
        public String? StatusId { get; set; }

    }
    public class PackTargetCostData
    {
        public string Product { get; set; }
        public string SKU { get; set; }
        public string TargetCost { get; set; }
        public string Currency { get; set; }
        public string TargetCostRemarks { get; set; }
    }

    public class PackageInitiativesSustainabilityData
    {
        public string Product { get; set; }
        public string TargetedSustainGoals { get; set; }
        public string Reusable { get; set; }
        public string Reducing { get; set; }
        public string Recycle { get; set; }
        public string Recovering { get; set; }
        public string IsUpdated { get; set; }

    }

    public class PackageSustainabilityHGML
    {
        public string? PackSustainability { get; set; }
    }

    public class PackageSustainabilityHUB
    {
        public string? PackSustainability { get; set; }
        public string? HUBName { get; set; }
    }
    public class PackSustainabilityPMD
    {
        public string? PackSustainability { get; set; }
    }

    public class FieldRemarks
    {
        public string Remarks { get; set; }
        public string UpdatedBy { get; set; }
        public string Product { get; set; }
        public string SKU { get; set; }
        public string FieldName { get; set; }
        public string RemarksId { get; set; }
        public string CreatedBy { get; set; }
        public string PackageId { get; set; }
    }

    public class BenchMarkImages
    {
        public string Image { get; set; }
        public string Imagecontent { get; set; }
    }

    public class PackagingMaster
    {
        public string PackageId { get; set; }
        public string PackageName { get; set; }
    }

}

