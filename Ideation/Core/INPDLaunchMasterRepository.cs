using Ideation.Models;

namespace Ideation.Core
{
    public interface INPDLaunchMasterRepository
    {
        NPDLaunchMaster GetNpdLaunchMasterData();
        IEnumerable<NpdLaunchMasterHeaderData> GetNPDLaunchMasterHeaderData();
        IEnumerable<NpdLaunchMasterHeaderData> GetNPDLaunchMasterHeaderData(string division, string category, string productGroup, string formulation, string source);
        IEnumerable<NpdLaunchMasterHeaderData> GetNPDLMProductHierarchyData(string division, string category, string productGroup, string formulation);
        Tuple<string, string> InsertProductHierarchyData(NPDLaunchMaster HierarchyData, string UserName);
        IEnumerable<NPDLMProductLaunchInformation> GetProductLaunchInformationData(string division, string category, string type, string npdLaunchYearType, string npdLaunchYear, string status);
        IEnumerable<NPDLMMyApprovalPending> GetMyApprovalPendingData();
        IEnumerable<NPDLMMyApprovalPending> GetMyapprovalPendingHeaderData(string division, string category, string productGroup, string subCategory);
        Tuple<string, string> InsertMyApprovalPendingData(NPDLaunchMaster MyApprovalData);
        Tuple<string, string> UploadProductLaunchInformationData(NPDLaunchMaster npdLM);
        Tuple<string, string> UploadNpdListData(NPDLaunchMaster npdLM);
        NPDLaunchMaster GetOtherMasterInfoBySubCateg(string subCategory, string ProductGroup);
        IEnumerable<SubCategoryInfo> GetOtherMasterInfoByProductGroup(string ProductGroup);
        public IEnumerable<dynamic> Excel_GetHeaderNames(string Page);
        public (IEnumerable<dynamic> NPDDetails, string Message) Excel_NPDLMFileUpload(string LoginId, string JsonValue, string Country);
        public IEnumerable<NpdLaunchMasterHeaderData> GetIndiaNPDLaunchMasterHeaderData(string Division, string country, int IsFromExcel = 0);
        public IEnumerable<dynamic> GetMaterialModificationHistory(string MatCode);
    }
}