//using Irony.Parsing;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class NPD
    {
        public string? OutMessage { get; set; }
        public string? StyleClass { get; set; }
        public string? ReceivedDate { get; set; }
        public string? TargetCostProductName { get; set; }
        public string? TargetCostSku { get; set; }
        public string? TargetCost { get; set; }
        public string? ProductPositioningSku { get; set; }

        public string? UserName { get; set; }
        public string? ProjectId { get; set; }
        public IEnumerable<SelectListItem>? DivisionList { get; set; }
        public IEnumerable<SelectListItem>? CategoryList { get; set; }
        public IEnumerable<SelectListItem>? CurrencyList { get; set; }
        public string? Currency { get; set; }
        public string? Icon { get; set; }

        public IEnumerable<NpdHeaderTableData>? NpdHeaderTable { get; set; }
        public IEnumerable<NpdProjectDetails>? ProjectDetails { get; set; }
        public IEnumerable<NpdProductPositioning>? ProductPositioning { get; set; }
        public IEnumerable<NpdFormulationProfile>? FormulationProfile { get; set; }
        public IEnumerable<NpdPackagingProfile>? PackagingProfile { get; set; }
        public IEnumerable<NpdBusinessInformation>? BusinessInformation { get; set; }
        public IEnumerable<string> InitiatorRemarksDb { get; set; }

        public int? Status { get; set; }
        public IEnumerable<NpdHeaderTableData>? StatusNameDb { get; set; }
        public string? CurrentStatusName { get; set; }
        public string? ConfirmationRemarks { get; set; }

        public string? JsonFormNpdData { get; set; }


        [Required(ErrorMessage = "Please select Division")]
        public string? Division { get; set; }
        [Required(ErrorMessage = "Please select Category")]
        public string? Category { get; set; }
        //[Required(ErrorMessage = "Please enter Project Name")]
         public string? ProjectName { get; set; }
     //   [Required(ErrorMessage = "Please enter Business Objective")]
        public string? BusinessObjective { get; set; }


        public string? NpdHeaderTableData { get; set; }
        public string? ProjectDetailsData { get; set; }
        public string? ProductPositionigData { get; set; }
        public string? FormulationProfileData { get; set; }
        public string? PackagingProfileData { get; set; }
        public string? BusinessInformationData { get; set; }
        public string? InitiatorRemarks { get; set; }


        public string? DivisionName { get; set; }
        public string? CategoryName { get; set; }


        public string? ProductPositioningProduct { get; set; }
        public string? ProductPositioningTargetConsumer { get; set; }
        public string? ProductPositioningCompetitiveOfferings { get; set; }
        public string? ProductPositioningUnmetNeed { get; set; }
        public string? ProductPositioningExpectedFeatures { get; set; }
        public string? ProductPositioningExpectedBenefits { get; set; }

        public string? FormulationProfileProduct { get; set; }
        public string? FormulationProfileDesiredIngredients { get; set; }
        public string? FormulationProfileIndicationOrConditions { get; set; }
        public string? FormulationProfileMustHaveClaims { get; set; }
        public string? FormulationProfileNiceToHaveClaims { get; set; }
        public string? FormulationProfileDosageForm { get; set; }
        public string? FormulationProfileBenchmarkProducts { get; set; }
        public string? FormulationProfileDesiredProductCharacteristics { get; set; }
        public string? FormulationProfileBenchmarkProductsImage { get; set; }

        public string? PackagingProfileProduct { get; set; }
        public string? PackagingProfileSku { get; set; }
        public string? PackagingProfilePrimaryPackaging { get; set; }
        public string? PackagingProfileSecondaryPackaging { get; set; }
        public string? PackagingProfileTertiaryPackaging { get; set; }
        public string? PackagingProfileBenchmarkProducts { get; set; }
        public string? PackagingProfileDesiredPackagingCharacteristics { get; set; }
        public string? PackagingProfileOthers { get; set; }
        public string? PackagingProfileMould { get; set; }
        public string? PackagingProfileImagesUpload { get; set; }

        public string? BusinessInformationProduct { get; set; }
        public string? BusinessInformationSku { get; set; }
        public string? BusinessInformationProposedNamesOfProduct { get; set; }
        public string? BusinessInformationProposedLaunchDate { get; set; }
        public string? BusinessInformationProposedSellingPrice { get; set; }
        public string? BusinessInformationProposedTP { get; set; }
        public string? BusinessInformationProposedMRP { get; set; }
        public string? BusinessInformationExpectedGP { get; set; }
        public string? BusinessInformationBusinessValue { get; set; }
        public string? BusinessInformationM1Quantity { get; set; }
        public string? BusinessInformationM2Quantity { get; set; }
        public string? BusinessInformationM3Quantity { get; set; }
        public string? BusinessInformationM4Quantity { get; set; }
        public string? BusinessInformationM5Quantity { get; set; }
        public string? BusinessInformationM6Quantity { get; set; }
        public string? BusinessInformationY1Quantity { get; set; }
        public string? BusinessInformationY2Quantity { get; set; }
        public string? BusinessInformationY3Quantity { get; set; }
        public string? BusinessInformationUom { get; set; }
        public string? JsonString { get; set; }

        public string? JsonFormNpdHgmlReviewData { get; set; }

        public string? ProjectDetailsHGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? ProjectDetailsHGMLRemarksList { get; set; }
        public string? ProductPositioningHGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? ProductPositioningHGMLRemarksList { get; set; }
        public string? FormulationProfileHGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? FormulationProfileHGMLRemarksList { get; set; }
        public string? PackagingProfileHGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? PackagingProfileHGMLRemarksList { get; set; }
        public string? BusinessInformationHGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? BusinessInformationHGMLRemarksList { get; set; }
        //public IEnumerable<NPDFieldRemarks>? PackagingProfileFieldRemarks { get; set; }
        public string? HgmlData { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlDataList { get; set; }
        public string? HgmlDataSendToHubConfirmation { get; set; }
        public string? HgmlDataHub { get; set; }
        public IEnumerable<SelectListItem>? HgmlDataHubList { get; set; }
        public string? HgmlDataHubUsers { get; set; }
        public string? HgmlDataHubUsersList { get; set; }
        public string? HgmlDataHgmlToHubRemarks { get; set; }
        public string? HgmlDataProductName { get; set; }
        public string? HgmlDataParticipatingMarkets { get; set; }
        public string? HgmlDataProjectPriority { get; set; }
        public string? HgmlDataRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlDataHubAndHubUserList { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? SendBackToInitiatorRemarks { get; set; }
        public string? SendToHubRemarks { get; set; }
        public string? SendToPmdRemarks { get; set; }
        public string? RejectRemarks { get; set; }


        public string? ApprovalStatus { get; set; }
        // public string? JsonFormNpdHgmlReviewData { get; set; }

        // Pending with HUB 
        public string? HubApproveConfirmation { get; set; }
        public IEnumerable<NpdHgmlApprove>? HubApproveConfirmationList { get; set; }



        public string? JsonFormNpdHubReviewData { get; set; }
        public string? ProjectDetailsHubRemarks { get; set; }
        public IEnumerable<NpdHubReview>? ProjectDetailsHubRemarksList { get; set; }
        public string? ProductPositioningHubRemarks { get; set; }
        public IEnumerable<NpdHubReview>? ProductPositioningHubRemarksList { get; set; }
        public string? FormulationProfileHubRemarks { get; set; }
        public IEnumerable<NpdHubReview>? FormulationProfileHubRemarksList { get; set; }
        public string? PackagingProfileHubRemarks { get; set; }
        public IEnumerable<NpdHubReview>? PackagingProfileHubRemarksList { get; set; }
        public string? BusinessInformationHubRemarks { get; set; }
        public IEnumerable<NpdHubReview>? BusinessInformationHubRemarksList { get; set; }
        public string? HgmlOrHubDataHubRemarks { get; set; }
        public IEnumerable<NpdHubReview>? HgmlOrHubDataHubRemarksList { get; set; }
        public string? SendToHgmlRemarks { get; set; }
        public string? HgmlDataHubParticipatingMarkets { get; set; }
        public IEnumerable<NpdHubReview>? HgmlDataHubParticipatingMarketsList { get; set; }


        public string? JsonFormNpdHgmlApproveData { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlApproveProjectDetailsHubRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlApproveProductPositioningHubRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlApproveFormulationProfileHubRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlApprovePackagingProfileHubRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlApproveBusinessInformationHubRemarks { get; set; }
        public IEnumerable<NpdBusinessInformation>? HgmlApproveBusinessInformationData { get; set; }
        public IEnumerable<NpdHgmlApprove>? HubApprovalData { get; set; }


        public IEnumerable<ApprovalStages>? ApprovalStatusData { get; set; }

        public string? PmdDataProductName { get; set; }
        public string? PmdDataProjectCategorization { get; set; }
        public string? PmdDataComplexityToBeAssigned { get; set; }
        public string? PmdDataRandDName { get; set; }
        public string? PmdDataRemarks { get; set; }
        public string? PmdDataProjectLead { get; set; }
        public string? PmdDataTargetFirstPrototypeSubmissionDate { get; set; }
        public string? PmdDataTargetTTDCompletionDate { get; set; }
        public string? PmdDataTargetProductionDate { get; set; }
        public string? PmdDataMajorRiskIfAny { get; set; }

        public string? ProjectDetailsPmdRemarks { get; set; }
        public string? ProductPositioningPmdRemarks { get; set; }
        public string? FormulationProfilePmdRemarks { get; set; }
        public string? PackagingProfilePmdRemarks { get; set; }
        public string? BusinessInformationPmdRemarks { get; set; }

        public string? PmdData { get; set; }
        public string? TargetCostData { get; set; }
        public string? SendBackToHgmlApproveRemarks { get; set; }
        public string? ApprovalRemarks { get; set; }

        public IEnumerable<NpdPmdReview>? ProjectDetailsPmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? ProductPositioningPmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? FormulationProfilePmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? PackagingProfilePmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? BusinessInformationPmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? PmdDataList { get; set; }
        public IEnumerable<NpdTargetCost>? TargetCostDataList { get; set; }
        public string? JsonFormNpdPmdReviewData { get; set; }

        public IEnumerable<NpdHgmlApprove>? HgmlApproveHubNameList { get; set; }
        public IEnumerable<NpdHgmlApprove>? HgmlApproveHubUserList { get; set; }
        public string? HgmlApproveSendBackHubRemarksData { get; set; }

        public IEnumerable<NpdHgmlApprove>? PmdReviewUserEmailAndHubListForMailSending { get; set; }

        public string? PmdReviewSelectedUsersToSendMailList { get; set; }
        public bool IsEdit { get; set; }
        public bool? IsRead { get; set; }
        public string? Role { get; set; }

        public string? CurrentStatusId { get; set; }
        public string? TotalBusinessValue { get; set; }


        public string? SustainabilityProduct { get; set; }
        public string? SustainabilitySku { get; set; }
        public string? TargetedGoals { get; set; }
        public string? Reusable { get; set; }
        public string? Recycle { get; set; }
        public string? Reducing { get; set; }
        public string? Recovering { get; set; }
        public string? SustainabilityData { get; set; }
        public IEnumerable<NpdSustainability>? Sustainability { get; set; }
        public string? SustainabilityPmdRemarks { get; set; }
        public string? SustainabilityHubRemarks { get; set; }
        public string? SustainabilityHGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? SustainabilityHGMLRemarksList { get; set; }
        public IEnumerable<NpdHubReview>? SustainabilityHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlApproveSustainabilityHubRemarks { get; set; }
        public IEnumerable<NpdPmdReview>? SustainabilityPmdRemarksList { get; set; }
        public string? FieldRemarks { get; set; }
        public string? SavedRemarks { get; set; }
        public string? DeletedRemarks { get; set; }
        public string? DivisionForPMD { get; set; }
        public string? SupportingDocumentData { get; set; }
        public string? DeletedSupportingdocument { get; set; }
        public string? PMdDueDate { get; set; }
        public string? Page { get; set; }

        public IEnumerable<SupportingDocument>? SupportingDocData { get; set; }

        public IEnumerable<SelectListItem>? MoldList { get; set; }
        public IEnumerable<SelectListItem>? ProjectCategorizationList { get; set; }
        public IEnumerable<SelectListItem>? ComplexityToBeAssignedList { get; set; }
        public IEnumerable<SelectListItem>? RAndDNameList { get; set; }
        public IEnumerable<SelectListItem>? ProjectPriorityList { get; set; }

    }

    public class NpdHeaderTableData
    {
        public string? Hub { get; set; }
        public string? Division { get; set; }
        public string? Category { get; set; }
        public string? InitiatedBy { get; set; }
        public string? InitiatedDate { get; set; }
        public string? StatusName { get; set; }
        public string? StatusId { get; set; }
        public int? Status { get; set; }
        public string? ReceivedDate { get; set; }

    }

    public class NpdProjectDetails
    {
        public string? ProjectName { get; set; }
        public string? BusinessObjective { get; set; }
        public string? TargetConsumer { get; set; }
        public string? CompetitiveOfferings { get; set; }
        public string? UnmetNeed { get; set; }
        public string? InitiatorRemarks { get; set; }

    }
    public class NpdProductPositioning
    {

        public string? Product { get; set; }
        public string? ExpectedFeatures { get; set; }
        public string? ExpectedBenefits { get; set; }
        public string? Sku { get; set; }

    }
    public class NpdFormulationProfile
    {
        public string? Product { get; set; }
        public string? DesiredIngredients { get; set; }
        public string? IndicationOrConditions { get; set; }
        public string? MustHaveClaims { get; set; }
        public string? DosageForm { get; set; }
        public string? NiceToHaveClaims { get; set; }
        public string? BenchmarkProducts { get; set; }
        public string? DesiredProductCharacteristics { get; set; }
        public string? BenchmarkProductsImage { get; set; }


    }
    public class NpdPackagingProfile
    {
        public string? Product { get; set; }
        public string? SKU { get; set; }
        public string? PrimaryPackaging { get; set; }
        public string? SecondaryPackaging { get; set; }
        public string? TertiaryPackaging { get; set; }
        public string? BenchmarkProducts { get; set; }
        public string? DesiredPackagingCharacteristics { get; set; }
        public string? Others { get; set; }
        public string? ImagesUpload { get; set; }
        public string? Mould { get; set; }

    }
    public class NpdBusinessInformation
    {
        public string? NpdBusinessInformationId { get; set; }
        public string? Product { get; set; }
        public string? SKU { get; set; }
        public string? ProposedNamesOfProduct { get; set; }
        public string? ProposedLaunchDate { get; set; }
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
        public string? FromHubId { get; set; }
        public string? FromHubName { get; set; }
        public string? TotalBusinessValue_Y1 { get; set; }
        public string? TotalBusinessValue_Y2 { get; set; }
        public string? TotalBusinessValue_Y3 { get; set; }
    }

    public class NpdHgmlReview
    {
        public string? ProjectDetailsHgmlRemark { get; set; }
        public string? ProductPositioningHgmlRemark { get; set; }
        public string? FormulationProfileHgmlRemark { get; set; }
        public string? PackagingProfileHgmlRemark { get; set; }
        public string? BusinessInformationHgmlRemark { get; set; }
        public string? SustainabilityHgmlRemark { get; set; }

        public string? DoYouWantSentToHub { get; set; }
        public string? Hub { get; set; }
        public string? HubUsers { get; set; }
        public string? HgmlDataHubUsersList { get; set; }
        public string? HgmlToHubRemarks { get; set; }
        public string? ProductName { get; set; }
        public string? ParticipatingMarkets { get; set; }
        public string? ProjectPriority { get; set; }
        public string? ProjectCategorization { get; set; }
        public string? Remarks { get; set; }

    }
    public class NpdHubReview
    {
        public string? ProjectDetailsHubRemarks { get; set; }
        public string? ProductPositioningHubRemarks { get; set; }
        public string? FormulationProfileHubRemarks { get; set; }
        public string? PackagingProfileHubRemarks { get; set; }
        public string? BusinessInformationHubRemarks { get; set; }
        public string? SustainabilityHubRemarks { get; set; }
        public string? HgmlOrHubDataHubRemarks { get; set; }
        public string? ParticipatingMarkets { get; set; }
        public string? HubName { get; set; }
    }
    public class NpdHgmlApprove
    {
        public string? HubName { get; set; }
        public string? IsHubApproved { get; set; }
        public string? HubUser { get; set; }


    }
    public class NpdPmdReview
    {
        public string? ProjectDetailsPmdRemarks { get; set; }
        public string? ProductPositioningPmdRemarks { get; set; }
        public string? FormulationProfilePmdRemarks { get; set; }
        public string? PackagingProfilePmdRemarks { get; set; }
        public string? BusinessInformationPmdRemarks { get; set; }
        public string? SustainabilityPmdRemarks { get; set; }

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
    public class NpdTargetCost
    {
        public string? ProductName { get; set; }
        public string? Sku { get; set; }
        public string? TargetCost { get; set; }
        public string? Currency { get; set; }
        public string? TargetCostRemarks { get; set; }
    }

    public class NpdSustainability
    {
        public string? ProjectId { get; set; }
        public string? Product { get; set; }
        public string? TargetedGoals { get; set; }
        public string? Reusable { get; set; }
        public string? Recycle { get; set; }
        public string? Reducing { get; set; }
        public string? Recovering { get; set; }
    }

    public class NPDFieldRemarks
    {
        public string? Remarks { get; set; }
        public string? UpdatedBy { get; set; }
        public string? SKU { get; set; }
        public string? RemarksId { get; set; }
        public string? Product { get; set; }
        public string? FieldId { get; set; }
        public string? CreatedBy { get; set; }


    }

}
