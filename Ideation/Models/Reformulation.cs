using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace Ideation.Models
{
    public class Reformulation
    {
        public string SavedPackagingRemarks { get; set; }
        public string DeletedPackagingRemarks { get; set; }
        public string? ReceivedDate { get; set; }
        public string? ProjectId { get; set; }
        public string? UserName { get; set; }
        public string? HubApprove { get; set; }
        public string? HUBName { get; set; }
        public string? SendToHgml { get; set; }
        public string? SendToHgmlRemarks { get; set; }
        public string? TargetCost { get; set; }
        public string? TargetCostGridData { get; set; }

        public string? HubUsers { get; set; }
        public string? Hubs { get; set; }
        public string? Hub { get; set; }
        public int? SaveOrSubmit { get; set; }
        public string? ViewStatus { get; set; }
        public string? Role { get; set; }
        public string? ManagerId { get; set; }

        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? CategoryList { get; set; }
        public string StatusList { get; set; }
        public string Division { get; set; }
        public string Category { get; set; }
        public string? DivisionName { get; set; }
        public string? CategoryName { get; set; }
        public string? createdby { get; set; }
        public string? InitiatedBy { get; set; }
        public int StatusValue { get; set; }
        //public string Hub { get; set; }
        // JQ grid values
        public string ProjectHeaders { get; set; }
        [Required(ErrorMessage = "Enter Product Description")]
        public string reformulationProductDescription { get; set; }

        public IEnumerable<ReformulationHgmlReview>? HgmlDataList { get; set; }
        public IEnumerable<ReformulationHgmlGridData>? HgmlDataGridList { get; set; }

        [Required(ErrorMessage = "Enter Project Details")]
        public string? reformulationProjectDetails { get; set; }
        public string? reformulationAdditionalFormulationRequirements { get; set; }
        [Required(ErrorMessage = "Enter Business Information")]
        public string reformulationBusinessInformation { get; set; }
        public string? reformulationPackagingProfile { get; set; }
        public string? InitiatorRemarks { get; set; }
        public string ProjectName { get; set; }
        public string? statusName { get; set; }
        public string? PmdProductName { get; set; }
        public string? PmdProjectCategorization { get; set; }
        public string? PmdComplexity { get; set; }
        public string? PmdRD { get; set; }
        public string? PmdDataRemarks { get; set; }
        public string? PmdProjectLead { get; set; }
        public string? PrototypeSubmissionDate { get; set; }
        public string? TTDCompletionDate { get; set; }
        public string? ProductionDate { get; set; }
        public string? MajorRisk { get; set; }
        public string? PmdData { get; set; }
        public string? Remarks { get; set; }
        public string? HgmlDataHUBParticipatingMarkets { get; set; }
        public IEnumerable<ReformulationHubReview> HgmlDataHUBParticipatingMarketsList { get; set; }


        public IEnumerable<ReformulationHgmlReview>? ProjectDetailsHGMLRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? ProjectDetailsHUBRemarksList { get; set; }
        public IEnumerable<ReformulationPmdReview>? ProjectDetailsPmdRemarksList { get; set; }
        public string? ProductDetailsHGMLRemarks { get; set; }
        public IEnumerable<ReformulationHgmlReview>? ProductDetailsHGMLRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? ProductDetailsHUBRemarksList { get; set; }
        public IEnumerable<ReformulationPmdReview>? ProductDetailsPmdRemarksList { get; set; }
        public string? FormulationProfileHGMLRemarks { get; set; }
        public IEnumerable<ReformulationHgmlReview>? FormulationProfileHGMLRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? FormulationProfileHUBRemarksList { get; set; }
        public IEnumerable<ReformulationPmdReview>? FormulationProfilePmdRemarksList { get; set; }
        public string? PackagingProfileHGMLRemarks { get; set; }
        public IEnumerable<ReformulationHgmlReview>? PackagingProfileHGMLRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? PackagingProfileHUBRemarksList { get; set; }
        public IEnumerable<ReformulationPmdReview>? PackagingProfilePmdRemarksList { get; set; }
        public string? BusinessInformationHGMLRemarks { get; set; }
        public IEnumerable<ReformulationHgmlReview>? BusinessInformationHGMLRemarksList { get; set; }
        public IEnumerable<ReformulationPmdReview>? BusinessInformationPmdRemarksList { get; set; }
        public IEnumerable<SpecificHubRemark>? HGMLtoHubRemarksList { get; set; }
        public IEnumerable<SpecificHubRemark>? HUBHgmlDataRemarksList { get; set; }
        public IEnumerable<ReformulationPmdData>? PmdDataList { get; set; }
        public IEnumerable<reformHgmlApprove>? HubApproveConfirmationList { get; set; }
        public string? ApproveRemarks { get; set; }
        public string? PmdReviewSelectedUsersToSendMailList { get; set; }
        public string? Currency { get; set; }
        public IEnumerable<SelectListItem>? CurrencyList { get; set; }

        public IEnumerable<ReformulationHubStatus>? HubStatus { get; set; }

        public class ReformulationHubStatus
        {
            public string? HUBName { get; set; }
            public int? Status { get; set; }
        }

        public IEnumerable<ReformulationHubReview>? ProjectDetailsHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? ProductDetailsHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? FormulationProfileHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? PackagingProfileHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? BusinessInformationHubRemarksList { get; set; }
        public IEnumerable<SpecificHubRemark>? HGMLorHubRemarksList { get; set; }
        public IEnumerable<TargetCostData>? TargetCostDataList { get; set; }


        //Product Description
        public string? ExistingBrandName { get; set; }
        public string? NewBrandName { get; set; }
        public string? SkuProjectDetails { get; set; }
        //project details
        public string? BusinessRational { get; set; }
        public string? BenchMarkSampleFormulation { get; set; }
        public string? BenchMarkSampleImage { get; set; }
        public string? DesiredIndication { get; set; }
        public string? DesiredDosageForm { get; set; }
        // Additional Formulation Requirments
        public string? AdditionalRequirments { get; set; }
        public string? ShelfLife { get; set; }
        public string? FreeFrom { get; set; }
        public string? OthersAdditional { get; set; }
        // Business informaion
        public string? ProductBusinessInfo { get; set; }
        public string? SkuBusinessInfo { get; set; }
        public string? BusinessInformationProposedNamesOfProduct { get; set; }
        public string? ProposedLaunchDate { get; set; }
        public string? ProposedSellingPrice { get; set; }
        public string? ProposedTP { get; set; }
        public string? ProposedMRP { get; set; }
        public string? ProposedName { get; set; }
        public string? ExpectedGP { get; set; }
        public int? BusinessValue { get; set; }
        public string? m1 { get; set; }
        public string? m2 { get; set; }
        public string? m3 { get; set; }
        public string? m4 { get; set; }
        public string? m5 { get; set; }
        public string? m6 { get; set; }
        public string? y1 { get; set; }
        public string? y2 { get; set; }
        public string? y3 { get; set; }
        public string? RevisionInPackaging { get; set; }
        public string? Uom { get; set; }
        public string? ProductPackaging { get; set; }
        public string? SkuPackaging { get; set; }
        //Packaging Profile
        public string? PrimaryPackaging { get; set; }
        public string? SecondaryPackaging { get; set; }
        public string? TertiaryPackaging { get; set; }
        public string? BenchMarkProducts { get; set; }
        public string? DesiredPackagingCharacters { get; set; }
        public string? Others { get; set; }
        public string? Mould { get; set; }
        public string? PackagingImage { get; set; }
        public string? ApprovalStatus { get; set; }



        public IEnumerable<ReformulationTableData>? ReformulationTableData { get; set; }
        public IEnumerable<ReformulationProductDetails>? ReformulationProductDetails { get; set; }
        public IEnumerable<ReformulationProjectDetails>? ReformulationProjectDetails { get; set; }
        public IEnumerable<ReformulationAdditionalFormulation>? ReformulationAdditionalFormulation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationBusinessInformation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? reformulationBusinessInformationHUB { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationHubBusinessInformation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationIndiaBusinessInformation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationHusaBusinessInformation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationEuBusinessInformation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationApacBusinessInformation { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? ReformulationRumeaBusinessInformation { get; set; }
        public IEnumerable<ReformulationInitiatorRemarks>? ReformulationInitiatorRemarks { get; set; }

        public string HUBRemarks { get; set; }

        public IEnumerable<SpecificHubRemark>? HUBProjectDetailsRemarksList { get; set; }
        public string? ProductPositioningHubRemarks { get; set; }
        public IEnumerable<SpecificHubRemark>? HUBProductDetailsRemarksList { get; set; }
        public string? FormulationProfileHubRemarks { get; set; }
        public IEnumerable<SpecificHubRemark>? HUBAdditionalFormulationProfileRemarksList { get; set; }
        public string? PackagingProfileHubRemarks { get; set; }
        public IEnumerable<SpecificHubRemark>? HUBPackagingProfileRemarksList { get; set; }
        public string? BusinessInformationHubRemarks { get; set; }
        public IEnumerable<SpecificHubRemark>? HUBBusinessInformationRemarksList { get; set; }
        public string? HgmlOrHubDataHubRemarks { get; set; }
        public IEnumerable<SpecificHubRemark>? HgmlOrHubDataHubRemarksList { get; set; }

        public IEnumerable<SpecificHubRemark>? SpecificHubRemarks { get; set; }
        public IEnumerable<HubApprovalStatus>? HubApprovalStatusList { get; set; }

        public IEnumerable<HubApprovalStatus>? HubApprovalIndiaUserList { get; set; }
        public IEnumerable<HubApprovalStatus>? HubApprovalRumeaUserList { get; set; }
        public IEnumerable<HubApprovalStatus>? HubApprovalApacUserList { get; set; }
        public IEnumerable<HubApprovalStatus>? HubApprovalEuUserList { get; set; }
        public IEnumerable<HubApprovalStatus>? HubApprovalHusaUserList { get; set; }
        public IEnumerable<HubApprovalStatus>? ApprovalData { get; set; }
        public string? ConfirmationRemarks { get; set; }

        public class HubList
        {
            public string? HubName;
        }
        public IEnumerable<HubList>? HubBIList { get; set; }

        public IEnumerable<ReformulationPackagingProfile>? ReformulationPackagingProfile { get; set; }
        public IEnumerable<ReformulationSKU>? ReformulationSKU { get; set; }
        public string? ReformulationSKUString { get; set; }
        public IEnumerable<ReformulationHgmlReview>? ReformulationHgmlReview { get; set; }

        public IEnumerable<ApprovalStages>? ApprovalStages { get; set; }

        public string? JsonFormReformulationHgmlReviewData { get; set; }
        public string? JsonFormReformulationHgmlToHubData { get; set; }
        public string? JsonFormReformulationHubReviewData { get; set; }
        public string? JsonFormReformulationPmdReviewData { get; set; }
        public string? JsonFormReformulationHubBusinessData { get; set; }
        public string? JsonFormReformulationApprovalStagesData { get; set; }
        public string? JsonFormReformulationSpecificHubRemarks { get; set; }


        public string ReformulationJSON { get; set; }
        public IEnumerable<string>? InitiatorRemarksDb { get; set; }
        public string? HgmlData { get; set; }
        public string HubData { get; set; }
        public string? Status { get; set; }
        public string StatusId { get; set; }

        public string? HgmlProductDetailsRemarks { get; set; }
        public string? HgmlProjectDetailsRemarks { get; set; }
        public string? HgmlAdditionalFormulationRemarks { get; set; }
        public string? HgmlBusinessInformationRemarks { get; set; }
        public string? HgmlPackagingProfileRemarks { get; set; }
        public IEnumerable<SelectListItem>? HgmlDataHubList { get; set; }
        public string? HgmlDataHub { get; set; }
        public string? HgmlDataHubUsers { get; set; }
        public string? HgmlDataHubUsersList { get; set; }
        public string? HgmlDataHgmlToHubRemarks { get; set; }
        public string? HgmlDataProductName { get; set; }
        public string? HgmlDataParticipatingMarkets { get; set; }
        public string? HgmlDataProjectPriority { get; set; }
        public string? HgmlDataRemarks { get; set; }
        public string? HgmlDataSendToHubConfirmation { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? SendBackToInitiatorRemarks { get; set; }
        public string? SendToHubRemarks { get; set; }
        public string? SendToPmdRemarks { get; set; }
        public string? RejectRemarks { get; set; }
        public string? HUBProductDetailsRemarks { get; set; }
        public string? HUBProjectDetailsRemarks { get; set; }
        public string? HUBAdditionalFormulationRemarks { get; set; }
        public string? HUBBusinessInformationRemarks { get; set; }
        public string? HUBPackagingProfileRemarks { get; set; }
        public string? PMDProductDetailsRemarks { get; set; }
        public string? PMDProjectDetailsRemarks { get; set; }
        public string? PMDAdditionalFormulationRemarks { get; set; }
        public string? PMDBusinessInformationRemarks { get; set; }
        public string? PMDPackagingProfileRemarks { get; set; }
        public string? PreviousStage { get; set; }
        public bool IsEdit { get; set; }
        public bool? IsRead { get; set; }

        public string? TotalBusinessValue { get; set; }



        //Added by Sachin 
        public string? SustainabilityProduct { get; set; }
        public string? SustainabilitySku { get; set; }
        public string? TargetedGoals { get; set; }
        public string? Reusable { get; set; }
        public string? Recycle { get; set; }
        public string? Reducing { get; set; }
        public string? Recovering { get; set; }
        public string? SustainabilityData { get; set; }
        public IEnumerable<ReformulationSustainability>? Sustainability { get; set; }
        public string? SustainabilityPmdRemarks { get; set; }
        public string? SustainabilityHubRemarks { get; set; }
        public string? SustainabilityHGMLRemarks { get; set; }
        // public IEnumerable<NpdHgmlReview>? SustainabilityHGMLRemarksList { get; set; }


        public IEnumerable<ReformulationHgmlReview>? SustainabilityHGMLRemarksList { get; set; }
        public IEnumerable<SpecificHubRemark>? SustainabilityHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? HgmlApproveSustainabilityHubRemarks { get; set; }
        public IEnumerable<ReformulationPmdReview>? SustainabilityPmdRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? AllHUBParticipatingMarketsList { get; set; }
        public string? DivisionForPMD { get; set; }

        public string? SupportingDocumentData { get; set; }
        public string? DeletedSupportingdocument { get; set; }
        public string? BenchMarkImagesData { get; set; }
        public string? DeletedBenchMarkImages { get; set; }
        public string? PMdDueDate { get; set; }
        public IEnumerable<SupportingDocument>? SupportingDocData { get; set; }
        public IEnumerable<ReformulaitonBenchmarkImages>? ReformulationBenchMarkImages { get; set; }

        public IEnumerable<SelectListItem>? MoldList { get; set; }
        public IEnumerable<SelectListItem>? ProjectCategorizationList { get; set; }
        public IEnumerable<SelectListItem>? ComplexityToBeAssignedList { get; set; }
        public IEnumerable<SelectListItem>? RAndDNameList { get; set; }
        public IEnumerable<SelectListItem>? ProjectPriorityList { get; set; }

        public IEnumerable<PMDDateandRemarks>? PMDDateRemarks { get; set; }
        public int IsPackagingProfileSelected { get; set; }
        public string Page { get; set; }

    }

    public class TargetCostData
    {
        public string Product { get; set; }
        public string SKU { get; set; }
        public string TargetCost { get; set; }
        public string Currency { get; set; }
        public string TargetCostRemarks { get; set; }

    }
    public class ReformulationTableData
    {
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Hub { get; set; }
        public string Division { get; set; }
        public string Category { get; set; }
        public string InitiatedBy { get; set; }
        public string InitiatedDate { get; set; }
        public string Status { get; set; }
        public string ReceivedDate { get; set; }
    }
    public class ReformulationProductDetails
    {
        public string? ExistingName { get; set; }
        public string? NewBrandName { get; set; }
        public string? SKU { get; set; }
    }
    public class ReformulationProjectDetails
    {
        public string? BusinessRational { get; set; }
        public string? BenchmarkSample { get; set; }
        public string? BenchmarkImage { get; set; }
        public string? DesiredIndication { get; set; }
        public string? DesiredDosageForm { get; set; }
    }
    public class ReformulationAdditionalFormulation
    {
        public string? AdditionalFormulation { get; set; }
        public string? ShelfLife { get; set; }
        public string? FreeFrom { get; set; }
        public string? Others { get; set; }
    }
    public class ReformulationBusinessInformation
    {
        public string? Product { get; set; }
        public string? ProposedName { get; set; }
        public string? SKU { get; set; }
        public string? ProposeLaunchDate { get; set; }
        public string? ProposedSellingPrice { get; set; }
        public string? ProposedTP { get; set; }
        public string? ProposedMRP { get; set; }
        public string? Currency { get; set; }
        public string? ExpectedGP { get; set; }
        public string? M1Quantity { get; set; }
        public string? M2Quantity { get; set; }
        public string? M3Quantity { get; set; }
        public string? M4Quantity { get; set; }
        public string? M5Quantity { get; set; }
        public string? M6Quantity { get; set; }
        public string? Y1Quantity { get; set; }
        public string? Y2Quantity { get; set; }
        public string? Y3Quantity { get; set; }
        public string? BusinessValue { get; set; }
        public string? RevisionInPackagingFormat { get; set; }
        public string? UOM { get; set; }
        public string? FromHubId { get; set; }
        public string? TotalBusinessValue_Y1 { get; set; }
        public string? TotalBusinessValue_Y2 { get; set; }
        public string? TotalBusinessValue_Y3 { get; set; }
    }
    public class ReformulationSKU
    {
        public string? SKU { get; set; }
    }

    public class ReformulationPackagingProfile
    {
        public string? Product { get; set; }
        public string? SKU { get; set; }
        public string? PrimaryPackaging { get; set; }
        public string? SecondaryPackaging { get; set; }
        public string? TertiaryPackaging { get; set; }

        public string? BenchmarkProducts { get; set; }
        public string? DesiredPackagingCharacters { get; set; }
        public string? Others { get; set; }
        public string? Mould { get; set; }
        public string? PackagingProfileImage { get; set; }
    }

    //New Added
    public class ReformulationHgmlReview
    {
        public string? ProjectDetailsHgmlRemark { get; set; }
        public string? ProductDetailsHgmlRemark { get; set; }
        public string? FormulationProfileHgmlRemark { get; set; }
        public string? PackagingProfileHgmlRemark { get; set; }
        public string? BusinessInformationHgmlRemark { get; set; }
        public string? SustainabilityHgmlRemark { get; set; }


        public string? DoYouWantSentToHub { get; set; }
        public string? Hub { get; set; }
        public string? HubUsers { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? ProductName { get; set; }
        public string? ParticipatingMarkets { get; set; }
        public string? ProjectPriority { get; set; }
        public string? Remarks { get; set; }
    }

    public class ReformulationHgmlGridData
    {
        public string? ProductName { get; set; }
        public string? ParticipatingMarkets { get; set; }
        public string? ProjectPriority { get; set; }
        public string? Remarks { get; set; }
        public string? ProjectCategorization { get; set; }
       
    }

    public class ReformulationInitiatorRemarks
    {
        public string initiatorRemarks { get; set; }
    }
    public class ReformulationHubReview
    {
        public string? ProjectDetailsHubRemark { get; set; }
        public string? ProductDetailsHubRemark { get; set; }
        public string? FormulationProfileHubRemark { get; set; }
        public string? PackagingProfileHubRemark { get; set; }
        public string? BusinessInformationHubRemark { get; set; }
        public string? HgmlOrHubDataRemarks { get; set; }

        public string? DoYouWantSentToHub { get; set; }
        public string? HubName { get; set; }
        public string? HubUsers { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? ProductName { get; set; }
        public string? HgmlDataHUBParticipatingMarkets { get; set; }
        public string? ProjectPriority { get; set; }
        public string? Remarks { get; set; }
    }

    public class SpecificHubRemark
    {
        public string? ProjectDetailsHubRemark { get; set; }
        public string? ProductDetailsHubRemark { get; set; }
        public string? FormulationProfileHubRemark { get; set; }
        public string? PackagingProfileHubRemark { get; set; }
        public string? BusinessInformationHubRemark { get; set; }
        public string? HgmlOrHubDataHubRemarks { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? Currency { get; set; }
        public string? IsHubApproved { get; set; }

        public string? SustainabilityHubRemark { get; set; }


    }
    public class ReformulationPmdReview
    {
        public string? ProjectDetailsPmdRemark { get; set; }
        public string? ProductDetailsPmdRemark { get; set; }
        public string? FormulationProfilePmdRemark { get; set; }
        public string? PackagingProfilePmdRemark { get; set; }
        public string? BusinessInformationPmdRemark { get; set; }
        public string? HgmlToHubRemarks { get; set; }

        public string? SustainabilityPmdRemark { get; set; }
    }
    public class ReformulationPmdData
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
        public string? TargetCost { get; set; }

    }

    public class HubApprovalStatus
    {
        public string? HubName { get; set; }
        public string? IsHubApproved { get; set; }
        public string? HubUser { get; set; }
        public string? Remarks { get; set; }
        public string? HubId { get; set; }
    }

    public class reformHgmlApprove
    {
        public string? HubName { get; set; }
        public string? IsHubApproved { get; set; }
        public string? HubUser { get; set; }


    }

    public class ReformulationSustainability
    {
        public string? ProjectId { get; set; }
        public string? Product { get; set; }
        public string? TargetedGoals { get; set; }
        public string? Reusable { get; set; }
        public string? Recycle { get; set; }
        public string? Reducing { get; set; }
        public string? Recovering { get; set; }
    }
    public class TotalBusinessvalue
    {
        public string?  Product { get; set; }
        public string?  SKU { get; set; }
        public string? HUSA { get; set; }
        public string? EUROPE { get; set; }
        public string? APAC { get; set; }
        public string? INDIA { get; set; }
        public string? METAP { get; set; }
        public string? HGML { get; set; }
        public string? TotalBusinessValue { get; set; }

    }
    public class ReformulaitonBenchmarkImages
    {
        public string? Image { get; set; }
        public string? CreatedBy { get; set; }
        public string? UploadedBy { get; set; }
        public string? UploadedOn { get; set; }
    }
}