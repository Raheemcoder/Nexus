using DocumentFormat.OpenXml.Office.CoverPageProps;
using System.Web.Mvc;

namespace Ideation.Models
{
    public class RID
    {
        public int IngredientReqId { get; set; }
        public string DivisionBasedIngredientListJson { get; set; }
        public IEnumerable<DivisionData> DivisionList { get; set; }
        public IEnumerable<IngredientListData> DivisionBasedIngredientList { get; set; }
        public IEnumerable<ParticularIngredientData> ParticularIngredientDetailsList { get; set; }
        public string DivisionName { get; set; }
        public int DivisionId { get; set; }
        public string Category { get; set; }
        public string Region { get; set; }
        public string RegulatoryStatus { get; set; }
        public string? IngredientListJson { get; set; }
        public IEnumerable<SelectListItem> RegulatoryStatusDetails { get; set; }
        public string CRemarks { get; set; }
        public string ImpactDates { get; set; }
        public string References { get; set; }
        public string ReferenceDoc { get; set; }
        public string INCI { get; set; }
        public int RowNo { get; set; }
        public int IngredientId { get; set; }
        public string IngredientName { get; set; }
        public string Synonyms { get; set; }
        public string CASNumber { get; set; }
        public string FunctionId { get; set; }
        public string[]? FunctionId_arr { get; set; }
        public string FunctionsId_selected { get; set; }
        public string FunctionName { get; set; }
        public IEnumerable<SelectListItem> FunctionDetails { get; set; }
        public string? StatusId { get; set; }
        public string? StatusName { get; set; }
        public IEnumerable<SelectListItem> StatusDetails { get; set; }
        public string AdultLeaveOn { get; set; }
        public string AdultRinseOff { get; set; }
        public string BabyLeaveOn { get; set; }
        public string BabyRinseOff { get; set; }
        public List<IFormFile>? PostedFile { get; set; }
        public string? IngredientDetailsJson { get; set; }
        public string? JsonFileNames { get; set; }
        public string? DocumentData { get; set; }
        public string GridData { get; set; }
        public string LoginId { get; set; }
        public string RegionId { get; set; }
        public string CategoryId { get; set; }
        public string CountryId { get; set; }
        public int Division_Id { get; set; }
        public string EnclosureName { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? GetListJson { get; set; }
        public string? Source { get; set; }
        public string? Status { get; set; }
        public string? PageName { get; set; }
        public string Approve_DivisionBasedIngredientListJson { get; set; }
        public IEnumerable<RegStatusData> RegStatusList { get; set; }
        public IEnumerable<CategoryData> CategoryList { get; set; }
        public IEnumerable<Approve_IngredientListData> Approve_DivisionBasedIngredientList { get; set; }
        public IEnumerable<Approve_ParticularIngredientData> Approve_IngredientDetails { get; set; }
        public IEnumerable<SelectListItem> FunctionList { get; set; }
        public IEnumerable<SelectListItem> RegionList { get; set; }
        public IEnumerable<SelectListItem> IRAStatusList { get; set; }
        public string SelectedRegion { get; set; }
        public string SelectedFunction { get; set; }
        public string SelectedIRAStatus { get; set; }
        public string ComplianceRequestListJson { get; set; }
        public string UserApprovalLevel { get; set; }
        public string JQgridJsonData { get; set; }
        public IEnumerable<dynamic> IngredientsList { get; set; }
        public IEnumerable<dynamic> IngredientFileList { get; set; }
        public string IngredientListData { get; set; }
        public string IngredientFileData { get; set; }
        public string MostRecentRemark { get; set; }
        public IEnumerable<MostRecentRemark> MostRecentRemarkData { get; set; }
        public bool IsEditable { get; set; }
        public string IsActive { get; set; }
        public bool IsFileExists { get; set; }
        public string IngredientNameList { get; set; }
        public string CASNumberList { get; set; }
        public int IngredientTypeId { get; set; }
        public IEnumerable<IngredientTypeData> IngredientTypeList { get; set; }
        public string RemarksData { get; set; }
        public string? Action { get; set; }
        public string? Remarks { get; set; }
        public int IsFrom { get; set; }
        public int IngredientORRequestId { get; set; }
        public int ComplianceHeaderId { get; set; }
        public string ComplianceHeaderName { get; set; }
        public string BotanicalName { get; set; }
        public IEnumerable<RID> ComplianceRemarksData { get; set; }
        public int IsConfirmed { get; set; }
    }

    public class ComplianceHeaderMaster
    {
        public int DivisionId { get; set; }
        public string Division { get; set; }
        public int RegionId { get; set; }
        public string Region { get; set; }
        public int IngredientTypeId { get; set; }
        public string IngredientType { get; set; }
        public int ComplianceHeaderId { get; set; }
        public string ComplianceHeaderName { get; set; }
        public IEnumerable<SelectListItem> RegionList { get; set; }
        public IEnumerable<IngredientTypeData> IngredientTypeList { get; set; }
        public bool IsUtilized { get; set; }
        public int IsActive { get; set; }
        public List<ComplianceHeaderMaster> HeaderListData { get; set; }
        public string JsonHeaderData { get; set; }

    }

    public class DivisionData
    {
        public int DivisionId { get; set; }
        public string DivisionName { get; set; }
    }

    public class IngredientListData
    {
        public int IngredientId { get; set; }
        public int IngredientType { get; set; }
        public string IngredientName { get; set; }
        public string BotanicalName { get; set; }
        public string Synonyms { get; set; }
        public string CASNumber { get; set; }
        public string FunctionName { get; set; }
        public string AdultLeaveOn { get; set; }
        public string AdultRinseOff { get; set; }
        public string BabyLeaveOn { get; set; }
        public string BabyRinseOff { get; set; }
        public string ENumber { get; set; }
        public string PartUsed { get; set; }
        public string SolventsUsed { get; set; }
        public string Markers { get; set; }
        public string InMedicine { get; set; }
        public string InFoodSupplement { get; set; }
        public string LastUpdatedDate { get; set; }
        public int IsRollback { get; set; }
        public int IsEdited { get; set; }
        public int IsConfirmed { get; set; }
        public int IsApproved { get; set; }
        public string CreatedBy { get; set; }

    }

    public class ParticularIngredientData
    {
        public int RowNo { get; set; }
        public int CategoryId { get; set; }
        public int RegionId { get; set; }
        public string? Category { get; set; }
        public string? Region { get; set; }
        public int RegulatoryStatus { get; set; }
        public string RegulatoryStatuscolor { get; set; }
        public string? CRemarks {  get; set; }
        public string ComplianceRemarks { get; set; }
        public string InActivesCRemarks { get; set; }
        public string? CInfo { get; set; }
        public string? ImpactDates { get; set; }
        public bool IsEditable { get; set; }
        public int ComplianceExists { get; set; }
    }

    public class ComplainceRemarksData
    {
        public int IngredientId { get; set; }
        public int IngredientCRId { get; set; }
        public int RegionId { get; set; }
        public string? Region { get; set; }
        public string? AdditionalInfo { get; set; }
        public string? FoodSupplementRecommendation { get; set; }
        public string? MedicineRecommendation { get; set; }
        public bool IsEditable { get; set; }
    }

    public class CRRegionGroupData
    {
        public int IngredientCRId { get; set; }
        public int RegionId { get; set; }
        public string? Region { get; set; }
        public int RegionGroupId { get; set; }
        public string? RegionGroupLabel { get; set; }
        public string? RegionGroupData { get; set; }
        public bool IsEditable { get; set; }
    }

    public class Approve_IngredientListData
    {
        public int IsRollback { get; set; }
        public int IsEdited { get; set; }
        public int IngredientId { get; set; }
        public string IngredientName { get; set; }
        public string Synonyms { get; set; }
        public string CASNumber { get; set; }
        public string FunctionName { get; set; }
        public string ComplianceRemarks { get; set; }
        public string AdultLeaveOn { get; set; }
        public string AdultRinseOff { get; set; }
        public string BabyLeaveOn { get; set; }
        public string BabyRinseOff { get; set; }
        public bool IsChecked { get; set; }
        public string CreatedBy { get; set; }
        public string InMedicine { get; set; }
        public string InFoodSupplement { get; set; }
        public string BotanicalName { get; set; }
        public string ENumber { get; set; }

    }

    public class Approve_ParticularIngredientData
    {
        public string Region { get; set; }
        public string Category { get; set; }
        public string RegulatoryStatus { get; set; }
        public string CRemarks { get; set; }
        public string ImpactDates { get; set; }
        public string References { get; set; }
        public string INCI { get; set; }
    }

    public class GetDeserializedApprovalIngredient
    {
        public List<JsonStringItem> JsonString { get; set; }
    }

    public class JsonStringItem
    {
        public int IngredientId { get; set; }
        public int CategoryId { get; set; }
        public int RegStatusId { get; set; }
        public string ComplianceRemarks { get; set; }
    }

    public class RegStatusData
    {
        public int RegulatoryStatusId { get; set; }
        public string RegulatoryStatusName { get; set; }
    }

    public class CategoryData
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }

    public class FunctionData
    {
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public bool Status { get; set; }
        public string StatusName { get; set; }
    }

    public class RegionData
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
    }

    public class ComplianceRequestData
    {
        public int IngredientReqId { get; set; }
        public string IngredientName { get; set; }
        public string BotanicalName { get; set; }
        public string IngredientType { get; set; }
        public string CASNumber { get; set; }
        public string FunctionName { get; set; }
        public string Region { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }

    }

    public class IngredientHeader
    {
        public string? IngredientName { get; set; }
        public string? Synonyms { get; set; }
        public string? CASNumber { get; set; }
        public string? FunctionId { get; set; }
    }

    public class IngredientFiles
    {
        public string? RegionId { get; set; }
        public string? FunctionId { get; set; }
        public string? EnclosureName { get; set; }

    }

    public class IngredientDetails
    {
        public int RowNo { get; set; }
        public string? FunctionId { get; set; }
        public string? DivisonId { get; set; }
        public string? CategoryId { get; set; }
        public string? Category { get; set; }
        public string? RegionId { get; set; }
        public string? Region { get; set; }
        public string? RegulatoryStatus { get; set; }
        public string? CRemarks { get; set; }
        public string? ImpactDates { get; set; }
        public string? References { get; set; }
        public string? INCI { get; set; }

    }

    public class MostRecentRemark
    {
        public string IngredientName { get; set; }
        public string ActionBy { get; set; }
        public string ActionDate { get; set; }
        public string Remarks { get; set; }

    }

    public class IngredientTypeData
    {
        public int IngredientTypeId { get; set; }
        public string IngredientTypeName { get; set; }
        public string KDSDescription { get; set; }

    }
    public class FSPdfData
    {
        public string Region { get; set; }
        public string IngredientName { get; set; }
        public string RegionRecommendation { get; set; }
        public string AdditionalInformation { get; set; }
        public string InMedicine { get; set; }
        public string InFoodSupplement { get; set; }
        public IEnumerable<CRRegionGroupData> RegionGroupData { get; set; }
    }

    public class InsertUpdateFSIngredient
    {
        public int IngredientORRequestId { get; set; }
        public int IngredientType { get; set; }
        public int From { get; set; }
        public int DivisionId { get; set; }
        public string SaveType { get; set; }
        public string LoginId { get; set; }
        public string Remarks { get; set; }
        public string Action { get; set; }
        public string HeaderJson { get; set; }
        public string DetailsJson { get; set; }
        public string ComplainceRemarksJson { get; set; }
        public string RegionGroupJson { get; set; }
        
    }

}