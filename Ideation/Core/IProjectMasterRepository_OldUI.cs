using Ideation.Models;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace Ideation.Core
{
    public interface IProjectMasterRepository_OldUI
    {
        public ProjectMasters GetProjectInitiationData(string LoginId);
        public IEnumerable<ProjectMasterHeaderData> GetProjectMasterHeaderData(string ProjectBreifId, string ItemName, string LoginId);
        public IEnumerable<ViewProjectData> GetViewProjectData(string ProjectCode);
        public string AddProjectData(ProjectMasters projectMasters);
        public IEnumerable<SAPresponse> PostProjectCode(string ProjectCode);


        public IEnumerable<GetTemplateDataList> GetRoleHODMasterHeaderData(string TemplateName);
        public List<HODName> GetHODNames(string term);
        public string UpdateRoleHODName(string hodValue, string role, string templateName);

        public RoleCostCenterMaster GetRoleCostCenterMasterData(string Rolename);
        public string RoleCostCenterNameDelete(string Role, string CostCenterName);

        public string UpdateRoleCostCenterName(string Role, string CostCenterName);


        public TemplateData GetTemplateData(string LoginId);
        public List<ProjectMasterHeaderData> GetProjectBIList(string searchvalue);
        public TemplateData GetTemplateMasterHeaderData(string TemplateId, string Rolename, string LoginId);
        public string UpdateTemplateMasterResource(string resourcesValue, string keyValue);
        public string UpdateTemplateDuration(int DurationValue, string KeyValue);
        public string TemplateResourceNameDelete(string TemplateId, string keyValue, string ResourceName);
        public List<ExcelTemplateMasterData> GetExcelTemplateMasterData(string templateName, string LoginId);


        public ResourceData GetResourceData(string LoginId);
        public ResourceData GetResourceMasterHeaderData(string ProjectId, string Role, string LoginId);
        //public List<ResourceName> GetResourceNames(string term);
        //public List<ResourceName> GetResourceNames();
        public List<ResourceName> GetResourceNames(string term);
        public List<CostCenterName> GetCostCenterNames(string term);

        public string SaveResourceDays(string keyValue, string resourceName, int days, string projectId);
        public IEnumerable<ResourceDays> GetAllocatedData(string KeyValue, string ProjectId);
        public string ResourceMasterResourceNameDelete(string ProjectId, int Days, string keyValue, string ResourceName);
        public string AllocatePlannedBudget(float plannedBudget, string keyValuePB, int duration, string projectid);
        public List<ExcelResourceMasterData> GetExcelResourceMasterData(string projectId, string LoginId);
        public string UpdateProjectResourceName(string resourcesValue, string keyValue, string projectId, int duration);

        public List<ExcelRoleCostCenterMasterData> GetExcelRoleCostCenterMasterData();

        public List<ResourceName> GetResources();
        public List<CostCenterName> GetCostCenterValues();
        public IEnumerable<GetTemplateDataList> GetDepartmentsList();
        public List<HODName> GetUsers();
        public List<HODName> GetDepartmentResources();

        public ProjectMasters InsertDepartmentTeamMasterData(string UserData, string UserId);
        public ProjectMasters InsertRolePlaaningMasterData(string budgetplaning, string Templete);

        public TemplateData GetActiveDepartments(string ProjectId);
        public Tuple<IEnumerable<GetTemplateDataList>, int> GetDepartmentUsers(string Role, string ProjectId);
        public ProjectMasters InsertProjectResourcesDetails(string ProjectUserData, string ProjectId, string UserId, int Type);
        public IEnumerable<BudgetPlan> GetBudgetPlanningList(string UserId, string Status);
        public ProjectMasters GetProjectBudgetPlanningData(string ProjectId, string UserId, string FromDate, string ToDate);
        public ProjectMasters InsertBaselineBudgetData(string ProjectId, string RequestedData, string UserId, string Remarks, string isSave);
        public IEnumerable<BudgetHistory> GetBudgetHistory(string ProjectId, string UserId);
        public IEnumerable<BudgetPlan> GetBudgetPendingList(string UserId, string Status);
        public ProjectMasters GetBudgetPendingDataForProject(string ProjectId, string BudgetType, string Department, string Category);
        public ProjectMasters SaveBaselingApprovalData(string selecteddata, string Remarks, string UserId);
        public List<GetExcelData_TeamRoleMaster> GetExcelData_TeamRoleMaster();
        public List<GetExcelData_BudgetPlanning> GetExcelData_BudgetPlanning(string Template);
        public List<GetExcelData_TeamRoleMaster> GetExcelData_DepartmentBudgetUsers(string ProjectId);
        public ProjectMasters GetApprovedDataForAdditionalPage(string ProjectId, String LoginId);
        public ProjectMasters SaveAdditinalRequestData(string ProjectId, string RequestedData, string UserId);
        public IEnumerable<BudgetPlan> GetL2ApprovalList(string UserId, string Status);
        public ProjectMasters GetL2ApprovalPendingDataForProject(string ProjectId, string Department, string Category, string year);
       // public Tuple<string, string> SaveL2ApprovalData(string jsonPayload, string response,string selecteddata, string Remarks, string LoginId);
        public Tuple<string, string> SaveL2ApprovalData(string selecteddata, string Remarks, string LoginId);
        public ProjectMasters GetL2ApprovalProjectInfo(string ProjectId);
        public Tuple<string, string, string, string, string> Budget_SAP_Update(string ProjectId, string Amount, string year);
        public Tuple<string, string> BudgetSAPResponse(string jsonPayload, string responseData, string UserId);
        public ProjectMasters GetCategoryforAdditionalRequest(string ProjectId, string Department, string UserId);

        public IEnumerable<ProjectMasters> GetBudgetTransferList(string UserId);
        public IEnumerable<ProjectMasters> GetProjectDataToTransfer(string ProjectId, string LoginId);

        public IEnumerable<Year> GetTrasferFromYear(string ProjectId);

        public ProjectMasters GetProjectDataBasedOnYear(string ProjectId, string FromYear, string ToYear, string Department, string LoginId);
        Tuple<string, string> SaveBudgetTrasferInformation(string LoginId, ProjectMasters projectmaster);

        public IEnumerable<ProjectMasters> GetProjectTransferHistory(string ProjectId);
        public ProjectMasters GetTransferToYearAndDepartment(string ProjectId, string FromYear);

        public IEnumerable<ProjectMasters> GetYearWiseBudgetAndExpense(string ProjectId);

        public IEnumerable<APIConfig> APICredentials_Get(string APIName);

        public Tuple<string, string> SaveSyncedData(string jsonPayload, string responseContent, string type, string LoginId);

        public IEnumerable<GetBudgetExpenseForYear> GetBudgetAndExpenseForYear(string Project, string year, string type);

        public IEnumerable<ProjectSAPDifference> GetSAPdifferenceProjectDetails();
        public IEnumerable<APIConfig> Get_BudgetDataForAPI(string DataToSave);
        public IEnumerable<APIConfig> Get_TransferDataForAPI(string DataToSave,string ProjectId);
        public string SaveTrasferAPIResponse(string JsonData,string Response, string ProjectId, String LoginId);
    }
}