using Ideation.Models;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using System.Web.Mvc;

namespace Ideation.Core
{
    public interface IRIDRepository
    {
        public IEnumerable<DivisionData> GetDivisionList(string KDSType);
        public IEnumerable<IngredientListData> GetIngredientList(int DivisionId, string Source, string LoginId, string StartDate = "", string EndDate = "", string SearchText = "", int IngredientTypeId = 0);
        public (IEnumerable<IngredientListData>, IEnumerable<ParticularIngredientData>) GetParticularIngredientDetails(int IngredientId, int DivisionId);
        IEnumerable<RID> IngredientListById(long IngredientId);
        IEnumerable<RID> GetAddDetails(int Division, string role);
        IEnumerable<RID> IngredientRequestListById(long IngredientId, string role);
        IEnumerable<SelectListItem> GetAddDropdown();
        public IEnumerable<SelectListItem> GetFunctionDropdown(int ingredientId, string type);
        Tuple<string, string> IngredientsDetailsInsert(RID ingredient);
        Tuple<string, string> IngredientsDetailsUpdate(RID ingredient);
        IEnumerable<RID> GetIngredientRequest(int DivisionId, string LoginId = " ", string StartDate = "", string EndDate = "", int Status = 0);
        Tuple<string, string> DeleteIngredientById(int IngredientId, string LoginId, int DivisionId);
        IEnumerable<SelectListItem> GetStatusList(string KDSType);
        public IEnumerable<Approve_IngredientListData> Approve_GetIngredientList(int DivisionId, string LoginId, string PageAppLevel);
        public IEnumerable<RID> GetRemarksById(int IngredientId, string type);
        public IEnumerable<Approve_ParticularIngredientData> Approve_GetParticularIngredientDetails(int IngredientId);
        public (IEnumerable<RegStatusData>, IEnumerable<CategoryData>) RegulatoryStatusDropDownData(string KDSType);
        public Tuple<string, string> ApproveRevertIngredient(string UserId, string JsonString, string ApprovalLevel, string Action, string Remarks, bool IsSubmitted);
        public IEnumerable<SelectListItem> GetFunctionList();
        public IEnumerable<SelectListItem> GetRegionList();
        public Tuple<string, string> ComplianceRequest_Save(string botanicalName, string IngredientName, string Region, string FunctionId, string LoginId, int DivisionId, string CASNumber, int IngredientTypeId);
        public IEnumerable<SelectListItem> GetIRAStatusList();
        public IEnumerable<ComplianceRequestData> GetComplianceRequestList(int DivisionId, string LoginId, int ingredientTypeId, int Status);
        public string GetUserApprovalLevel(string LoginId, int DivisionId);
        public RID IngredientListByIngredientId(long IngredientId, string role);
        public IEnumerable<MostRecentRemark> GetMostRecentRemark();
        public IEnumerable<dynamic> GetFunction();
        public Tuple<string, string> SaveFunctionDetails(int functionId, string functionName, bool status, string LoginId);
        public Tuple<string, string> DeleteFunctionDetails(int functionId, string LoginId);
        public IEnumerable<dynamic> GetUploadedFiles(int IngredientId, int RegionId, int CategoryId);
        public IEnumerable<IngredientTypeData> GetIngredientTypeData();
        public IEnumerable<RegStatusData> GetRegStatusData(int DivisionId);
        public (IEnumerable<IngredientListData> HeaderCollection, IEnumerable<ParticularIngredientData> DetailsCollection,
            IEnumerable<ComplainceRemarksData> ComplianceRemarksCollection, IEnumerable<CRRegionGroupData> RegionGroupCollection)
        GetAddEdit_FSDetails(int DivisionId, int IngredientORRequestId, int IngredientType, int From, string Role);
        public IEnumerable<dynamic> GetIngredientNameList(int DivisionId, string type = "all");
        public IEnumerable<RID> GetFoodSupplementComplianceRequestList(int DivisionId, int IngredientTypeId, string LoginId = "", string StartDate = "", string EndDate = "", int Status = 0);
        public IEnumerable<IngredientTypeData> GetIngredientTypeList(string KDSType);
        public IEnumerable<Approve_IngredientListData> FoodSupplementApprove_GetIngredientList
            (int DivisionId, string LoginId, int IngredientTypeId, string pageAppLevel);
        public (IEnumerable<RegStatusData>, IEnumerable<CategoryData>) FoodSupplementsRegulatoryStatusDropDownData(int divisionId, string KDSType);
        public Tuple<string, string, int> InsertUpdateFSIngredient(InsertUpdateFSIngredient insertUpdateFSIngredient);
        public IEnumerable<dynamic> GetCASNumberList(int DivisionId);
        public IEnumerable<ComplianceHeaderMaster> GetComplianceHeaderData();
        public Tuple<string, string> SaveComplianceHeaderDetails(string headerData, string LoginId);
        public Tuple<string, string> DeleteComplianceHeaderDetails(int regionId, int ingredientTypeId, int headerId, string LoginId);
        public Tuple<string, string, int> SaveComplianceRemarksData(int ingredientId, string ingredientName, string botanicalName, int ingredientTypeId, int division, int region, string headerData, string additionalInformation, string inMedicine, string inFoodSupplement, string source, string LoginId);
        public Tuple<string, string, int> SaveClaimsInfoData(int ingredientId, string ingredientName, string botanicalName, int ingredientTypeId, int division, int regionId, int categoryId, string claimsInfo, string Source, string LoginId);
        public (IEnumerable<dynamic> CRemarksData, IEnumerable<dynamic> HeaderData) GetFoodSupplementComplianceRemarks(int ingredientTypeId, int ingredientId, int regionId);
        public IEnumerable<dynamic> GetFoodSupplementClaimsInfo(int ingredientId, int regionId, int categoryId);
        public string GetFoodSupplementComplianceRemarksInactives(int ingredientId, int regionId, int categoryId);
        public IEnumerable<MostRecentRemark> FSGetMostRecentRemark(int DivisionId, int IngredientTypeId);
        public IEnumerable<ComplianceRequestData> GetFoodSupplementComplianceRequestList(int DivisionId, string LoginId, int IngredientTypeId, int Status);
        public (IEnumerable<IngredientListData>, IEnumerable<ParticularIngredientData>) GetParticularIngredientDetailsForFSGlobalCompliance(int IngredientId, int DivisionId);
        public (IEnumerable<dynamic> Header, IEnumerable<dynamic> Details) GetIngHistoryData(int ingredientId);
    }
}