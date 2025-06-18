namespace Ideation.Models
{
    public class PdfData
    {
        public string ProjectName { get; set; }
        public string Hub { get; set; }
        public string Division { get; set; }
        public string Category { get; set; }
        public string InitiatedBy { get; set; }
        public string InitiatedDate { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }
        public string BusinessObjective { get; set; }
        public string Product { get; set; }
        public string TargetConsumer { get; set; }
        public string CompetitiveOfferings { get; set; }
        public string UnmetNeed { get; set; }
        public string ExpectedFeatures { get; set; }
        public string ExpectedBenefits { get; set; }
        public string? DesiredIngredients { get; set; }
        public string? IndicationOrConditions { get; set; }
        public string? MustHaveClaims { get; set; }
        public string? RephraseClaims { get; set; }
        public string? DosageForm { get; set; }
        public string? NiceToHaveClaims { get; set; }
        public string? BenchmarkProducts { get; set; }
        public string? DesiredProductCharacteristics { get; set; }
        public string? BenchmarkProductsImage { get; set; }
        public string? PrimaryPackaging { get; set; }
        public string? SecondaryPackaging { get; set; }
        public string? TertiaryPackaging { get; set; }
        public string? DesiredPackagingCharacteristics { get; set; }
        public string? Others { get; set; }
        public string? ImagesUpload { get; set; }
        public string? Mould { get; set; }
        public string? SKU { get; set; }
        public string? ProposedNamesOfProduct { get; set; }
        public string? ProposedLaunchDate { get; set; }
        public string? ProposedSellingPrice { get; set; }
        public string? ProposedTP { get; set; }
        public string? ProposedMRP { get; set; }
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
        public string? Currency { get; set; }
        public string? TotalBusinessValue_Y1 { get; set; }
        public string? TotalBusinessValue_Y2 { get; set; }
        public string? TotalBusinessValue_Y3 { get; set; }
        public string? RevisionInPackagingFormat { get; set; }
        public string? InitiatorRemarks { get; set; }
        public string? IssenttoHUB { get; set; }
        public string? Filepath { get; set; }
        public string Imagecontent { get; set; }
        public string ProductName { get; set; }
        public string NewBrandName { get; set; }
        public string? AdditionalFormulation { get; set; }
        public string ShelfLife { get; set; }
        public string FreeFrom { get; set; }
        public string BusinessRational { get; set; }
        public string BenchmarkSample { get; set; }
        public string BenchmarkImage { get; set; }
        public string ReformularionBenchmarkImage { get; set; }
        public string DesiredIndication { get; set; }
        public string? JsonString { get; set; }
        public string? JsonHeaderString { get; set; }
        public string? BusinessInformationHgmlRemark { get; set; }
        public string? PackagingProfileHgmlRemark { get; set; }
        public string? ProjectDetailsHgmlRemark { get; set; }
        public string? ProductPositioningHgmlRemark { get; set; }
        public string? FormulationProfileHgmlRemark { get; set; }
        public string? HGMLtoHubRemarks { get; set; }
        public string? HGMLSusatinabilityRemark { get; set; }
        public string? BusinessInformation { get; set; }
        public string? HUBName { get; set; }
        public string? PackagingProfile { get; set; }
        public string? ProductDescription { get; set; }
        public string? PackProjectDetails { get; set; }
        public string? Remarks { get; set; }
        public string? PackSustainability { get; set; }
        public string? FromHubName { get; set; }


        public string? ProjectDetailsPmdRemarks { get; set; }
        public string? ProductPositioningPmdRemarks { get; set; }
        public string? FormulationProfilePmdRemarks { get; set; }
        public string? PackagingProfilePmdRemarks { get; set; }
        public string? BusinessInformationPmdRemarks { get; set; }
        public string? SustainabilityPmdRemarks { get; set; }
        //  public string? ProductName { get; set; }
        public string? ProjectCategorization { get; set; }
        public string? ComplexityToBeAssigned { get; set; }
        public string? RandDName { get; set; }
        //  public string? Remarks { get; set; }
        public string? ProjectLead { get; set; }
        public string? TargetFirstPrototypeSubmissionDate { get; set; }
        public string? TargetTTDCompletionDate { get; set; }
        public string? TargetProductionDate { get; set; }
        public string? MajorRiskIfAny { get; set; }
        public string? TargetedGoals { get; set; }
        public string? Reusable { get; set; }
        public string? Recycle { get; set; }
        public string? Reducing { get; set; }
        public string? Recovering { get; set; }
        public IEnumerable<SpecificHubRemark>? HGMLtoHubRemarksList { get; set; }


        //HGML DATA
        public string? ParticipatingMarkets { get; set; }
        public string? ProjectPriority { get; set; }
        // package PMD Remarks
        public string? PackProjectDetailsPMDRemarks { get; set; }
        public string? PackageProductDescriptionPMDRemarks { get; set; }
        public string? PackageBusinessPMDPMDRemarks { get; set; }
        public string? PackExpectedPMDPMDRemarks { get; set; }


        public IEnumerable<PdfData>? ProductPositioning { get; set; }
        public IEnumerable<PdfData>? ProductProfile { get; set; }
        public IEnumerable<PdfData>? PackagingProfiledata { get; set; }
        public IEnumerable<PdfData>? BusinessInformationdata { get; set; }
        public IEnumerable<PdfData>? Sustainabilitydata { get; set; }
        public IEnumerable<PdfData>? ProducDescription { get; set; }
        public IEnumerable<PackageBusinessHUB>? HubBusinessInformationRemarks { get; set; }
        public IEnumerable<PackageProjectDetailsHUB>? HubProjectDetailsRemarks { get; set; }
        public IEnumerable<PackageProductDescriptionHUB>? HubProdctDescriptionRemarks { get; set; }
        public IEnumerable<PackExpectedHUB>? HubPackagingProfileRemarks { get; set; }
        public IEnumerable<HGMLRemarks>? HGMLRemarks { get; set; }
        public IEnumerable<NpdHgmlReview>? BusinessInformationHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlDataList { get; set; }
        public IEnumerable<ReformulationHgmlReview>? RHgmlDataList { get; set; }
        public IEnumerable<ReformulationHgmlGridData>? RhgmlGridDataList { get; set; }

        public IEnumerable<NpdHgmlReview>? ProjectDetailsHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? ProductPositioningHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? PackagingProfileHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? SustainabilityHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? FormulationProfileHubRemarksList { get; set; }
        public IEnumerable<NpdHgmlReview>? HgmlOrHubDataHubRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? ProjectDetailsPmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? ProductPositioningPmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? FormulationProfilePmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? PackagingProfilePmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? BusinessInformationPmdRemarksList { get; set; }
        public IEnumerable<NpdPmdReview>? PmdDataList { get; set; }
        public IEnumerable<ReformulationPmdData>? ReformulationPmdDataList { get; set; }
        public IEnumerable<PmdData>? PackagePmdData { get; set; }
        public IEnumerable<PackageInitiativeHGMLReviewHGMLData>? PackageHGMLData { get; set; }

        //Reformulation HUB Remarks
        public IEnumerable<ReformulationHubReview>? RHubBusinessInformationRemarks { get; set; }
        public IEnumerable<ReformulationHubReview>? RProjectDetailsHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? RProductDetailsHubRemarksList { get; set; }
        public IEnumerable<ReformulationHubReview>? RHubPackagingProfileRemarks { get; set; }
        public IEnumerable<ReformulationHubReview>? RproductDetailsHubRemark { get; set; }
        public IEnumerable<ReformulationHubReview>? RSustainabilityHubRemark { get; set; }
        public IEnumerable<ReformulationHubReview>? RFormulationProfileHubRemarksList { get; set; }
        public IEnumerable<ReformulationBusinessInformation>? RHgmlApproveBusinessInformationData { get; set; }
        public IEnumerable<ReformulationPmdReview>? RSustainabilityPmdRemarks { get; set; }

        public IEnumerable<PackageInitiativesBusinessInformation>? PackageInitiativesBusinessInformation { get; set; }
        public IEnumerable<PackageSustainabilityHUB>? PSustainabilityHUBRemarks { get; set; }

        public IEnumerable<NpdBusinessInformation>? HgmlApproveBusinessInformationData { get; set; }

        public IEnumerable<HgmlDataHUBParticipatingMarket>? HubStatus { get; set; }
        public IEnumerable<ReformulationHubReview>? RHubStatus { get; set; }
        public IEnumerable<NpdHubReview>? NPDHubStatus { get; set; }

        public IEnumerable<PackagingMaster>? packagingMasterList { get; set; }
        public IEnumerable<FieldRemarks>? PackagingProfileFieldRemarks { get; set; }
        public IEnumerable<BenchMarkImages>? ReformulationBenchMarkImages { get; set; }

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
        public string? TargetCost { get; set; }
        public string? TargetCostRemarks { get; set; }
        public string? Sku { get; set; }

        public IEnumerable<TargetCostData>? TargetCostDataList { get; set; }
        public IEnumerable<PackTargetCostData>? TargetCostData { get; set; }
        public IEnumerable<NpdTargetCost>? NPDTargetCostDataList { get; set; }

        public IEnumerable<MarketingTeamData>? MarketingTeamApprovalData { get; set; }
        public IEnumerable<HGMLReviewTeamData>? HGMLReviewTeamApprovalData { get; set; }
        public IEnumerable<HUBReviewTeamData>? HUBReviewTeamApprovalData { get; set; }
        public IEnumerable<HGMLApproveTeamData>? HGMLApproveTeamApprovalData { get; set; }
        public IEnumerable<FineScreeningTeamData>? FinescreeningTeamApprovalData { get; set; }
        public IEnumerable<AcceptedTeamData>? AcceptedTeamApprovalData { get; set; }
        public IEnumerable<UpdatedTeamData>? UpdatedTeamApprovalData { get; set; }

        public string? DownloadedBy { get; set; }

    }
    public class HGMLRemarks
    {
        public string? projectDetailsHgmlRemark { get; set; }
        public string? productPositioningHgmlRemark { get; set; }
        public string? formulationProfileHgmlRemark { get; set; }
        public string? packagingProfileHgmlRemark { get; set; }
        public string? businessInformationHgmlRemark { get; set; }

    }
    //public class TargetCostData
    //{
    //    public string? Product { get; set; }
    //    public string? SKU { get; set; }
    //    public string? TargetCost { get; set; }
    //}
    public class MarketingTeamData
    {
        public string MareketingTeamCreatedBy { get; set; }
        public string FromStageName { get; set; }
        public string MareketingTeamCreatedOn { get; set; }
    }
    public class HGMLReviewTeamData
    {
        public string HGMLReviewTeamCreatedBy { get; set; }
        public string FromStageName { get; set; }
        public string HGMLReviewTeamCreatedOn { get; set; }
    }
    public class HUBReviewTeamData
    {
        public string hubcreatedby { get; set; }
        public string hubnames { get; set; }
        public string hubApprovedDate { get; set; }
    }
    public class HGMLApproveTeamData
    {
        public string HGMLApproveTeamCreatedBy { get; set; }
        public string FromStageName { get; set; }
        public string HGMLApproveTeamCreatedOn { get; set; }
    }
    public class FineScreeningTeamData
    {
        public string FineScreeningTeamCreatedBy { get; set; }
        public string FromStageName { get; set; }
        public string FineScreeningTeamCreatedOn { get; set; }
    }
    public class AcceptedTeamData
    {
        public string AcceptedTeamCreatedBy { get; set; }
        public string FromStageName { get; set; }
        public string AcceptedTeamCreatedOn { get; set; }
    }
    public class UpdatedTeamData
    {
        public string UpdatedTeamCreatedBy { get; set; }
        public string FromStageName { get; set; }
        public string UpdatedTeamCreatedOn { get; set; }
    }
    public class FoodSupplementPDF
    {
        public List<FSPdfData> FoodSupplementPDFList { get; set; }
    }
}