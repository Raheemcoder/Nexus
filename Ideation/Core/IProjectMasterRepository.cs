using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Math;
using Ideation.Models;
using NonFactors.Mvc.Grid;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace Ideation.Core
{
    public interface IProjectMasterRepository
    {
        public ProjectMasters GetProjectInitiationData(string LoginId);
        public IEnumerable<ProjectMasterHeaderData> GetProjectMasterHeaderData(string ProjectBreifId, string ItemName, string LoginId, string projectId, string startDate, string endDate, string template);
        public ViewProjectData GetViewProjectData(string ProjectCode);
        public string AddProjectData(ProjectMasters projectMasters);
        public IEnumerable<SAPresponse> PostProjectCode(string ProjectCode, string PageType);
        public IEnumerable<GetTemplateDataList_NUI> GetRoleHODMasterHeaderData(string TemplateName);
        public IEnumerable<HODName> GetHODNames();
        public string UpdateRoleHODName(string hodValue, string role, string templateName);
        public RoleCostCenterMaster GetRoleCostCenterMasterData();
        public (string Message, string MessageClass) RoleCostCenterNameDelete(string Role, string CostCenterName, string LoginId);
        public Tuple<string, string> UpdateRoleCostCenterName(string JsonCostCenterData, string LoginId);
        public TemplateData GetTemplateData(string LoginId);
        public List<ProjectMasterHeaderData> GetProjectBIList(string searchvalue);
        public TemplateData GetTemplateMasterHeaderData(string TemplateId, string Role, string LoginId);
        public Tuple<string, string> UpdateTemplateMasterResource(string resourceDetails, string loginId);
        public string UpdateTemplateDuration(int DurationValue, string KeyValue);
        public Tuple<string, string> TemplateResourceNameDelete(string TemplateId, string Role, string ResourceName, string LoginId);
        public List<ExcelTemplateMasterData> GetExcelTemplateMasterData(string templateName, string LoginId);
        public IEnumerable<ProjectsCollection> GetProjectList(string LoginId, string Role);
        public IEnumerable<ResourcesCollection> GetResourcesList();
        public ProjectResourceData GetProjectResoruceData(string ProjectId, string Role, string LoginId);
        public (string Message, string MessageClass) DeleteProjectResourcesRoleResource(string ProjectId, string Resource, int RoleId);
        public IEnumerable<ExcelResourceMasterData_NUI> GetResourceMasterExcelData(string ProjectId, string LoginId, string Role);
        public (string Message, string MessageClass) InsertUpdateProjectResourceMasterDetails
            (string RoleJsonData, string RoleResoruceJsonData, string ProjectId, string TemplateId, string UserId);
        public List<CostCenterName> GetCostCenterNames(string term);
        public List<ExcelRoleCostCenterMasterData> GetExcelRoleCostCenterMasterData();
        public List<CostCenterName> GetCostCenterValues();
        public IEnumerable<GetTemplateDataList_NUI> GetDepartmentsList();
        public IEnumerable<GetResources> GetUsers();
        public IEnumerable<GetResources> GetDepartmentResources();
        public ProjectMasters InsertDepartmentTeamMasterData(string UserData, string UserId);
        public ProjectMasters InsertRolePlaaningMasterData(string budgetplaning, string Templete, string loginId);
        public (IEnumerable<DepartmentBudgetResource> ActiveDepartments, string Product, int Count, IEnumerable<DepartmentBudgetResource>
            ActiveResourcePreview) GetActiveDepartments(string ProjectId, string Departments);
        public (IEnumerable<DepartmentBudgetResource> DefaultResources,
            IEnumerable<DepartmentBudgetResource> DepartmentResources) GetDepartmentUsers(string ProjectId, string Departments);
        public (string Message, string MessageClass) InsertUpdateDBUMappingDetails(string JsonData, string ProjectId, string UserId, int Type);
        public (string Message, string MessageClass) DeleteProjectDepartmentResource(string ProjectId, string Resource, int RoleId);
        public IEnumerable<DepartmentBudgetResource> GetDBUMappingsExcelData(string ProjectId, string DepartmentId);
        public IEnumerable<BudgetPlan> GetBudgetPlanningList(string UserId, string Status);
        public ProjectMasters GetProjectBudgetPlanningData(string ProjectId, string UserId);
        public ProjectMasters InsertBaselineBudgetData(string ProjectId, string RequestedData, string UserId, string Remarks, string isSave, string FromStage, string Action, string BudgetType);
        public ProjectMasters GetBudgetHistory(string ProjectId, string UserId);
        public IEnumerable<BudgetPlan> GetBudgetPendingList(string UserId, string Status);
        public ProjectMasters GetBudgetPendingDataForProject(string ProjectId, string BudgetType, string Department, string Category, string LoginId);
        public ProjectMasters SaveBaselineApprovalData(string selecteddata, string Remarks, string UserId, string FromStage, string Action, string BudgetType, string ProjectId);
        public List<GetExcelData_TeamRoleMaster> GetExcelData_TeamRoleMaster();
        public List<GetExcelData_BudgetPlanning> GetExcelData_BudgetPlanning(string Template);
        public ProjectMasters GetApprovedDataForAdditionalPage(string ProjectId, String LoginId);
        public ProjectMasters SaveAdditionalRequestData(string ProjectId, string RequestedData, string UserId, string FromStage, string Action);
        public IEnumerable<BudgetPlan> GetL2ApprovalList(string UserId, string Status);
        public ProjectMasters GetL2ApprovalPendingDataForProject(string ProjectId, string Department, string Category, string year);
        public Tuple<string, string> SaveL2ApprovalData(string selecteddata, string Remarks, string LoginId);
        public ProjectMasters GetL2ApprovalProjectInfo(string ProjectId);
        public Tuple<string, string, string, string, string> Budget_SAP_Update(string ProjectId, string Amount, string year);
        public Tuple<string, string> BudgetSAPResponse(string jsonPayload, string responseData, string UserId);
        public ProjectMasters GetCategoryforAdditionalRequest(string ProjectId, string Department, string UserId);
        public IEnumerable<ProjectMasters> GetBudgetTransferList(string Department, string Year, string Status, string Type, string UserId);
        public IEnumerable<ProjectMasters> GetProjectDataToTransfer(string ProjectId, string LoginId);
        public IEnumerable<Models.Year> GetTrasferFromYear(string ProjectId);
        public ProjectMasters GetProjectDataBasedOnYear(string ProjectId, string FromYear, string ToYear, string Department, string LoginId);
        Tuple<string, string> SaveBudgetTrasferInformation(string LoginId, ProjectMasters projectmaster);
        public IEnumerable<BudgetHistory> GetProjectTransferHistory(string ProjectId, string LoginId, string DepartmentId, string Year, string Type, string Status);
        public ProjectMasters GetTransferToYearAndDepartment(string ProjectId, string FromYear);
        public IEnumerable<ProjectMasters> GetYearWiseBudgetAndExpense(string ProjectId, string DepartmentId, string Year, string Type, string Status, string LoginId);
        public IEnumerable<APIConfig> APICredentials_Get(string APIName);
        public Tuple<string, string> SaveSyncedData(string jsonPayload, string responseContent, string type, string LoginId);
        public IEnumerable<GetBudgetExpenseForYear> GetBudgetAndExpenseForYear(string Project, string year, string type);
        public IEnumerable<ProjectSAPDifference> GetSAPdifferenceProjectDetails();
        public (IEnumerable<DepartmentMaster>, IEnumerable<Models.Year>, IEnumerable<PMProjectTypeMaster>, IEnumerable<StatusList>, IEnumerable<PIResourceMaster>)
            GetProjectBudgetDetailsHeaderLists(string LoginId);
        public IEnumerable<dynamic> GetProjectDepartmentBudget(string ProjectId, string Department, string Year, string Status, string Type, string LoginId);
        public IEnumerable<APIConfig> Get_BudgetDataForAPI(string DataToSave);
        public IEnumerable<APIConfig> Get_TransferDataForAPI(string DataToSave, string ProjectId);
        public string SaveTrasferAPIResponse(string JsonData, string Response, string ProjectId, string LoginId);
        public IEnumerable<ProjectMasters> GetProjectBudgetDetailsList(string LoginId, string ProjectId, string DepartmentId, string Year, string Type, string Status);
        public (string Message, string MessageClass) AlterBudgetRequest(string ProjectId, int LatestYear, int PreviousYear, string EditedAmt, int type, int From, string LoginId, string BudgetReqNo, string Action, int FromStage, string RequestedAmount, string Remarks);
        public IEnumerable<SAPresponse> GetSAPFailedInfo(string ReqNo, string Page);
        public IEnumerable<BudgetHistory> GetApprovalHistoryInfo(string projectId, string budgetReqNo, string UserId, string DepartmentId, string Year, string Type, string Status);
        public IEnumerable<ProjectsCollection> PBV_HeadersList(string LoginId, string Role);
        public IEnumerable<ProjectBusinessValueCollection> PBV_ProjectsDataList(string ProjectId, string LoginId, string Role);
        public Tuple<string, string> InsertUpdateProjectBusinessInfo(string ProjectId, string Product, string BusinessInfoJsonData, string loginId);
        public IEnumerable<DepartmentListMaster> GetProjectBudgetDepartmentData(string ProjectId, string UserId);
        public Tuple<string, string> FileDetailsInsert(ProjectMasters pm, string LoginId);
        public IEnumerable<ProjectMasters> GetFileList(string ProjectId, string LoginId);
        public Tuple<string, string> DeleteDocumentData(int DocumentId);
        public (string BillrefNo, String ExpensesRef, string TotalBudget, string TotalBalance, IEnumerable<dynamic> NatureOfExp) GetExpesnesMasterData(string ExpensesRefId, string LoginId, string ProjectId, string Department, string CategoryId);
        public string DeleteExpensesSupportingDoc(string ExpensesRefId, string DocId);
        public IEnumerable<ExpensesRequest> GetExpensesRequestDataToEdit(string ExpensesRefId, string LoginId);
        public Tuple<string, string> ApproveOrRejectTheExpenses(string Remarks, string ApprovalFlow, string ExpensesRefId, string LoginId);
        public Tuple<string,string, int> SaveDivisionInfo(string ProjectId, int DivisionId, int IsProjectPlanning, int IsHGHRequired,string DocumentJson, string LoginId);
        public IEnumerable<dynamic> CheckIsDuplicateProductExists(string ProjectCode, string Product);
        public Tuple<string, string> MapBriefToAdhocProject(string Product, string ProjectBriefId, string ProjectCode,string LoginId);
        public Tuple<string, string, string, string, string, IEnumerable<dynamic>> GetHGHMailData(string ProjectId, string LoginId);
        public string SaveIsHGHMailTriggered(int IsHGHMailTriggered,string ProjectId, string LoginId);
        public IEnumerable<dynamic> GetHGHSupportingDocument(string projectId, string LoginId);

        #region Material Master
        public IEnumerable<ProjectMasters> GetMaterialListdata(string MaterialId, string DivisionId, string MaterialTypeId, int PurchaseGroupId, string LoginId);
        public ProjectMasters GetMaterialDropDownData(string LoginId);
        public IEnumerable<MaterialList> GetMaterialIdListdata();
        public string SyncMaterialListdata();
        #endregion

        #region PRCreation

        public (int StatusId, IEnumerable<PRDropdownCollection> DropDownList) PR_DropdownList(string LoginId, string Role, string Type, long Id);
        public IEnumerable<PRDropdownCollection> PR_DepedentDataList(string LoginId, string Role, string Value, string Type, string Department, string Category);
        public IEnumerable<PRIdValueCollection> PR_MaterialDataList(string LoginId, string Role, string Value, string MatType);
        public (IEnumerable<PRHeaderCollection> HeaderList, IEnumerable<PRDetailsCollection> DetailsList, IEnumerable<PRDocumentCollection> DocumentList)
            PR_DataList(string LoginId, string Role, long PRHeaderId);
        public Tuple<string, string> PR_SaveOrApprovePRDetails(long PRHeaderId, string HeaderJson, string DetailsJson, string DocumentJson,
            string RemarksJson, string LoginId, string Role);
        public Tuple<string, string> PR_ListCreationDelete(string LoginId, long Id, string Type, string Remarks = "");


        public (IEnumerable<dynamic> PRNos, string FromDate) PR_GetListHeaderData(string LoginId, string Role);
        public IEnumerable<PRHeaderCollection>
            PR_GetListGridData(string LoginId, string Role, string PRNo, string FromDate, string Todate);
        public IEnumerable<PRDetailsCollection> PR_GetListDetailsData(long PRHeaderId);
        public IEnumerable<PRDocumentCollection> PR_GetListVendorData(long PRHeaderId);
        public (IEnumerable<PRIdValueCollection> Header, IEnumerable<PRHistoryCollection> Details, IEnumerable<PRIdValueCollection> LastValue) PR_GetListHistoryData(long PRHeaderId);
        public Tuple<string, string> PR_ListAction(string LoginId, string Role, string Type, long PRHeaderId, string RemarksJson);
        public Tuple<string, string> CheckIsPRCanBeApproved(long PRHeaderId, string Action);
        public IEnumerable<dynamic> GetPRModificationHistory(long PRDetailId);

        public IEnumerable<GetResources> GetPRRequestors();
        public IEnumerable<GetResources> GetPRApprovers();
        public IEnumerable<PRTeamMaster> GetPRTeamList();
        public ProjectMasters InsertPRTeamMasterData(string UsersData, string UserId);
        
        #endregion

        #region Expenses Creation

        public List<GetPRTeamMasterExcelData> GetPRTeamMasterExcelData();
        public ExpensesRequest GetExpenseRequestHistory(string ExpenseRefId);
        public ExpensesRequest GetExpensesDropDownData(string LoginId);
        public IEnumerable<ExpensesRequest> GetExpenseRequestList(string startDate, string endDate, string ProjectId, string DepartmentId, string CategoryId, string LoginId);
        public (IEnumerable<ExpensesRequestHeader>, IEnumerable<ExpensesRequestDetails>) GetExpenseRequestDataById(string ExpenseRefId);
        public Tuple<string, string> InsertExpensesRequestData(
                    string ExpRefNo, string DepartmentId, string EmployeeCode, string RequestedData, string files,
                    string Remarks, string ApprovalFlow, string LoginId
                );
        public Tuple<string, string> DeleteExpenseById(string ExpensesRefId);
        public IEnumerable<ExpensesRequest> GetExpenseFiles(string ExpenseRefId);
        public Tuple<string, string> UpdateExpenseRequestStatus(string ExpensesRefId, string Action, string FromStage, string Remarks);
        public IEnumerable<dynamic> GetEmployeeData(string DepartmentId, string LoginId);
        #endregion

        #region BudgetDetailsReport
        public (IEnumerable<dynamic> ProjectValue, IEnumerable<dynamic> StatusValue, IEnumerable<dynamic> DepartmentValue) GetProjectIdforReport(string LoginId, string Role);
        public IEnumerable<dynamic> GetProjectIdReportDetails(string ProjectId,string FromDate, string ToDate, string Status, string Department, string LoginId, string Role);

        #endregion
      
    }
}