using Ideation.Models;
using System;
namespace Ideation.Core;

public interface IRDMSRepository
{

    public PlantMaster GetRDMSDropDownData();
    public IEnumerable<PlantMaster> GetPlantList(string plantCode, int Status);
    public IEnumerable<PlantMaster> GetPlantListById(int plantId);
    public PlantMaster UpdatePlantStatus(int plantId, int Status, string userName);
    public IEnumerable<dynamic> GetLicensePopupData(string LoginId, string Role,int Type, string LicenseHeaderId, string Version,string CreatedOn,string DocId);
    public IEnumerable<DropdownData> GetLicenseManagementMasterData(string LoginId, string Role);
    public (IEnumerable<LicenseHeaderCollection> LicenseHeader, IEnumerable<dynamic> LicenseTypeCount) GetLicenseManagementListData
           (string LoginId, string Role, string Plant, string Status, string FromDate, string ToDate, string LicType,string LicenceType,string DocCategory);
    public Tuple<string, string> InsertRDMSData(string RequestedData, string Productgroup,string DeclarationData, string Remarks, string LoginId, string Action);
    public (IEnumerable<LicenseHeaderData> LicenseHeaderData, IEnumerable<ProductGroupData> ProductGroup, IEnumerable<DeclarationData> DeclarationData)
          GetRDMSData(string LoginId, string LicenceHeaderId);
    public Tuple<string, string> DeleteProductGroup(string LicenceHeaderId, string Version, string DocumentId, string LoginId);
    public Tuple<string, string> DeleteLicense(string LoginId, string LicenseHeaderId);
    public IEnumerable<RDMSExcelData> GetExcelData(string LicenseHeaderId, string Version, string Type);
    public IEnumerable<DropdownData> GetDocumentType(string DocCategoryId);
    public IEnumerable<dynamic> GetProductGroupMaterialData(string Plant, string ProductGroup, string FromDate, string ToDate, string LicenceType, string Material);
}