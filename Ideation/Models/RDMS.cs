using Microsoft.AspNetCore.Mvc.Rendering;
namespace Ideation.Models
{
    public class RDMS
    {
        public string LicenseName { get; set; }
        public string Category { get; set; }
        public string Role { get; set; }
        public string LoginId { get; set; }
        public string AutosuggestDropdown { get; set; }
        public string RequestedData { get; set; }
        public string Remarks { get; set; }
        public string FilesUpload { get; set; }
        public string Action { get; set; }
        public string StatusId { get; set; }

        public IEnumerable<DropdownData> DropDownMastersDataList { get; set; }
        public IEnumerable<LicenseHeaderCollection> LicenseHeaderDataList { get; set; }
        public IEnumerable<LicenseProductsCollection> LicenseProductsDataList { get; set; }
        public IEnumerable<LicenseHistoryCollection> LicenseHistoryDataList { get; set; }
        public string LicenseHeaderData { get; set; }
        public string? ProductGroup { get; set; } = string.Empty;
        public string ActionType { get; set; }
        public string? DeclarationData { get; set; } = string.Empty;
        public IEnumerable<LicenseRemarksCollection> LicenseRemarksDataList { get; set; }

    }
    
    public class LicenseHeaderCollection
    {
        public string  LicenseHeaderId{ get; set; }
        public string ManufacturingPlantCode { get; set; }
        public string ManufacturingPlantName { get; set; }
        public int LicenseTypeId { get; set; }
        public string LicenseTypeName { get; set; }
        public int DocumentCategoryId { get; set; }
        public string DocumentCategoryName { get; set; }
        public string DocNumber { get; set; }
        public string ValidFrom { get; set; }
        public string ValidTo { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        public string Version { get; set; }
        public string DueDate { get; set; }
        public string DueClass { get; set; }
        public string HeaderDocumentName { get; set; }
        public string ExsistingHeaderDoc { get; set; }
        public int IsRenewable { get; set; }
        public int IsEditable { get; set; }
        public int IsFilePresent { get; set; }
        public int IsActivePlant { get; set; }
        public int IsDeclarationPresent { get; set; }
    }
    public class LicenseProductsCollection
    {
        public long LicenseProdId { get; set; }
        public string ProductGroup { get; set; }
        public string ProductDocumentName { get; set; }
        public int IsSaved { get; set; }
    }
    public class LicenseHistoryCollection
    {
        public string LicenseHeaderId { get; set; }
        public string HeaderDocumentName { get; set; }
        public string ValidFrom { get; set; }
        public string ValidTo { get; set; }
        public string Version { get; set; }
        public string Status { get; set; }
        public string UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string Remarks { get; set; }
    }
    public class LicenseRemarksCollection
    {
        public string Action { get; set; }
        public string Remarks { get; set; }
        public string ActionBy { get; set; }
        public string ActionOn { get; set; }
    }

    public class PlantMaster
    {
        public string PlantCode { get; set; }
        public string DisplayName { get; set; }
        public int PlantId { get; set; }
        public string PlantName { get; set; }
        public string EmailId { get; set; }
        public string PlantType { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Status { get; set; }
        public string StatusName { get; set; }
        public string StatusClass { get; set; }
        public string OutMessage { get; set; }
        public string StyleClass { get; set; }
        public IEnumerable<SelectListItem> PlantList { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }
        public IEnumerable<DropdownData> PlantCodeData { get; set; }
        public IEnumerable<DropdownData> StatusData { get; set; }


    }
    public class LicenseHeaderData 
    {
         public string LicenceHeaderId { get; set; }
         public string ManufacturingPlant { get; set; }
         public string ManufacturingPlantId { get; set; }
         public string LicenceType { get; set; }
         public string DocCategory { get; set; }
         public string DocumentNumber { get; set; }
         public string ValidFrom { get; set; }
         public string ValidTo { get; set; }
         public string HeaderDocumentName { get; set; }
         public string ExsistingHeaderDoc { get; set; }
         public string Version { get; set; }
         public string StatusId { get; set; }
         public string DeclarationDate { get; set; }
         public string DocId { get; set; }
    }
    public class ProductGroupData 
    {
        public string ProductGroup { get; set; }
        public string NewDocument { get; set; }
        public string DocumentName { get; set; }
        public string DocId { get; set; }
        public string Version { get; set; }
        public string CreatedBy { get; set; }
        public string IsProductActive { get; set; }
        public int RowNo { get; set; }
        public string EffectiveFrom { get; set; }
    }
    public class DeclarationData
    {
        public string DocumentId { get; set; }
        public string DocumentName { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedOn { get; set; }
        public string DeclarationDate { get; set; }
        public int IsActive { get; set; }
        public int IsNew { get; set; }

    }
    public class RDMSExcelData
    {
        public string LicenseHeaderId { get; set; }
        public string ManufacturingPlantCode { get; set; }
        public string ManufacturingPlantName { get; set; }
        public int LicenseTypeId { get; set; }
        public string LicenseTypeName { get; set; }
        public int DocumentCategoryId { get; set; }
        public string DocumentCategoryName { get; set; }
        public string DocNumber { get; set; }
        public string ValidFrom { get; set; }
        public string ValidTo { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        public string Version { get; set; }
        public string ActionBy { get; set; }
        public string ActionOn { get; set; }
        public string ProductGroup { get; set; }
        public string DocumentName { get; set; }
        public string LicenseInfoDocName { get; set; }
        public string EffectiveFrom { get; set; }
    }

}