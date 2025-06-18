using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis;
using System.Data.SqlClient;
using System.Web.Mvc;
using static Ideation.Models.Reformulation;

namespace Ideation.Core
{
    public interface IEPPMMasterRepository
    {
        public IEnumerable<PMUMapping> Get_ProjecVersiontList(string projectId);
        public IEnumerable<PMUMapping> Get_ProjectList(int roleId, string UserName);
        public List<EPPMProjectMaster> Get_ProjectMasterList();
        public Ideation.Models.Common Update_ProjectStatus(int projectId, string projectStatus, string userName, string IsActive);
        public List<string> Get_ProjectStatusMasterList();
        public IEnumerable<dynamic> Checkingdependedmilestonestaus(int ProjectId, int SlNo, int Hub);
        public IEnumerable<dynamic> GetUserRequestedEndDateList(string Status, string UserName, string EmailId, int roleId);
        public IEnumerable<dynamic> Get_DependentMyMilestone(int projectId, int slNo, string startDate, string pmuVersion, string endDate, int Hub, string SortedOrder);
        public string ApproveOrRejectMilestone(int extendId, string userName, string ApprovalRemarks);
        public IEnumerable<dynamic> CheckForApproval(int projectId, int HubId);
        public string UpdatePMUDetails(string JsonData, int RoleId, string UserName);
        public IEnumerable<dynamic> GetMilestoneRevisedDates(int ProjectId, int SlNo, string PMUVersion, string StartDate, string EndDate, int Hub, string SortedOrder);
        public Tuple<string, int> SaveNewWBSHeaderTask(string newData, string type, bool kpitask, string UserName);
        public string DeleteWBSHeaderTask(int deleteId, string type, string UserName);
        public string SavePMUMappingsNewTemplate(string jsonObject, string TemplateName, string UserName);
        public string AddNotes(int HubId, int ProjectId, string Notes, string loginId);
        public IEnumerable<dynamic> GetNotes(int HubId, int ProjectId);
        public string SavePMUMappings(string jsonObject, string Documents, string Remarks, string userName,
            string LatestVersion, string LatestVersionGroup, string PreviousVersion, string PreviousVersionGroup,
            bool isLatest, int projectId, bool IsWeekendExcluded, bool IsKPIIncluded,int hubId, int ExtendedId,
            string ApprovalRemarks, int IsCloneAcceptedForProject, string saveAppRemarks,int isSaveAppRemarks);
        public Tuple<IEnumerable<WBSHeader>, IEnumerable<Models.Task>, IEnumerable<Models.Resources>, IEnumerable<Models.Template>> PMUMappings_DropdownList();
        public NewPMUMappings PMUMappings_GetList(
            int projectId, bool isFromTemplate, string CurrentSelectedVersion, int HubId, int TemplateId,
            int IsScopeChanged = 0, int IsCloneAccepted = 0
        );
        public Tuple<string, string> AutoSavePMUMappings(string jsonObject, string Documents, string Remarks,
            string userName, int projectId, bool IsWeekendExcluded, bool IsKPIIncluded, int hubId,
            string LatestVersion, string LatestVersionGroup, int IsCloneAcceptedForProject);
        public IEnumerable<StatusListData> GetStatusList();
        public (IEnumerable<ProjectHeader> Header, IEnumerable<ProjectMyMilestoneDetails> Details)
            GetMyMileStoneSearchedData(string HubId, string ProjectId, int RoleId, string UserName);
        public IEnumerable<PMUMapping> GetFile(string ProjectId, string SeqNo, int HubId, string Version, int WBSHeaderId, int TaskId);
        public IEnumerable<SelectListItem> GetMappedProjects();
        public IEnumerable<SelectListItem> GetMappedHubs(int projectId);
        public IEnumerable<SelectListItem> GetVersionForSummary(int ProjectId, int HubId);
        public IEnumerable<ApproveMilestone> MyMilestoneApprovalDetail(int PrjId, int Hub, string UserName, int RoleId);
        public IEnumerable<TaskRemarksHistory> GetParticularTaskRemarksHistory(int projectId, int slNo, int hub);
        public NewPMUMappings PMUMappingsClone_GetList(int CloneFromProjectId, int CloneFromHubId, int ProjectId, int HubId, string Version,
            int IsResourceRequired, int IsScopeChanged, int IsCloneAccepted);
        public IEnumerable<dynamic> GetMyMileStoneList(string Status, string UserName, string EmailId, int roleId);
        public IEnumerable<HubListData> GetHubBasedOnProjectId(int projectId);
        public Tuple<IEnumerable<dynamic>, IEnumerable<dynamic>> GetRevisedDates_AllRequestData(int ProjectId, int SlNo, string PMUVersion, string StartDate, string EndDate, int HubId, string SortedOrder);
        public IEnumerable<PMUMapping> Get_ProjectListBasedOnAction(int roleId, string UserName, string Type);
        public NewPMUMappings PMUMappingsData(int projectId, int HubId, string PMUVersion);
        public string SavePreviousVersionPath(string jsonObject, string UserName, string pMUVersion, int projectId, int Hub);
        public IEnumerable<dynamic> GetUpdates(int HubId, int ProjectId);
        public string SaveUpdates(int HubId, int ProjectId, string Updates, string loginId);
        public IEnumerable<dynamic> CheckForScopeChange(int HubId, int ProjectId);
        public IEnumerable<PMUVersions> GetPMUMappingVersion(int projectId, int HubId, int IsScopeChanged = 0, int IsCloneAccepted = 0);


        public Tuple<IEnumerable<dynamic>, IEnumerable<IssueTrackerHubList>, IEnumerable<dynamic>> GetIssueList(int projectId);
        public IssueTracker GetDropdownValues();
        public Tuple<string, string> DeleteIssue(int ProjectId, int IssueId, string LoginId);
        public IEnumerable<dynamic> GetTaskList(int projectId, string hubId);
        public IEnumerable<dynamic> GetTaskByIssue(int issueId);
        public Tuple<IEnumerable<IssueHeader>, IEnumerable<IssueDetail>, IEnumerable<IssueImpactedTask>> GetParticularIssueData(int issueId);
        public string InsertUpdateIssue(string Headers, string Details, string ImpactedTasks, string UserName, int projectId, int IsInsert, int IssueId);


        public Tuple<IEnumerable<dynamic>, IEnumerable<HubListData>, IEnumerable<dynamic>, IEnumerable<dynamic>> 
            GetChangeList(int projectId);
        public Tuple<string, int, string, string> InsertUpdateChange(string Headers, string Details, string UserName, int projectId, int IsInsert, int ChangeId, string Remarks);
        public Tuple<IEnumerable<ChangeLogHeader>, IEnumerable<IssueDetail>, IEnumerable<HubListData>> GetParticularChangeData(int ChangeId);
        public Tuple<string, string> DeleteChange(int ProjectId, int changeId, string LoginId);


        public Tuple<IEnumerable<dynamic>, IEnumerable<dynamic>> GetRiskList(int projectId);
        public Tuple<string, string> DeleteRisk(int ProjectId, int RiskId, string LoginId);
        public string InsertUpdateRisk(string Headers, string Details, string UserName, int projectId, int IsInsert, int RiskId);
        public Tuple<IEnumerable<RiskRegisterHeader>, IEnumerable<IssueDetail>> GetParticularRiskData(int RiskId);
        

        public IEnumerable<KPIDashBoard> GetKPIDashboardData(string LoginId, string Month, string Year, string Division);
        public KPIDashBoard GetKPIDashBoardMasterData();
        Tuple<string, string> KPIDataSave(string LoginId, int RoleId, KPIDashBoard KpiData);
        public IEnumerable<RemarksList> GetKPIDashboardRemarks(string ProjectId, string KPIId, string Hub, string LoginId);
        public string KPIReasonMaster(int ReasonId, string ReasonName, string Type, string LoginId);


        public IEnumerable<TTDDropdownData> GetTTDDropDownData();
        public IEnumerable<dynamic> GetTTDProductNames();
        public IEnumerable<TTDDashboard> GetTTDGridData(int prodyear, string product, string loginId);
        public Tuple<string, string> SaveTTDDetails(string dataToSave, string LoginId);
        public Tuple<string, string> DeleteTTDDetails(string ttdHeaderId, string LoginId);
        public IEnumerable<TTDDashboard> GetTTDExcelData(int prodyear, string product);
        public IEnumerable<dynamic> GetTTDDatesAndRemarks(int prodyear);
        public IEnumerable<dynamic> GetTTDHistory(int prodyear, string ttdheaderid, string historytype);
        public Tuple<string, string> UpdateSavedRemarks(int DataAndRemarksId, string Type, string Remarks, string LoginId);
    }
}