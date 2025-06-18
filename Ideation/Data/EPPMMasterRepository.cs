using Dapper;
using Ideation.Core;
using Ideation.Models;
using iText.Kernel.Pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Web.Mvc;
using System.Web.WebPages;
using static Ideation.Models.MMProject;

namespace Ideation.Data
{
    public class EPPMMasterRepository : IEPPMMasterRepository
    {
        public IEnumerable<HubListData> GetHubBasedOnProjectId(int projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", projectId);
                return con.Query<HubListData>("[N_GetHubBasedOnProjectId]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<PMUMapping> Get_ProjectListBasedOnAction(int roleId, string UserName, string Type)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@RoleId", roleId);
                param.Add("@UserName", UserName);
                param.Add("@Type", Type);
                return con.Query<PMUMapping>("[dbo].[Get_ProjectListBasedOnAction]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<PMUMapping> Get_ProjecVersiontList(string projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@projectId", projectId);

                return con.Query<PMUMapping>("[dbo].[ProjectVersionList]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        #region Summary
        public IEnumerable<PMUMapping> Get_ProjectList(int roleId, string UserName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@RoleId", roleId);
                param.Add("@UserName", UserName);
                return con.Query<PMUMapping>("[dbo].[Get_ProjectList]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<SelectListItem> GetVersionForSummary(int ProjectId, int HubId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@HubId", HubId);
                return con.Query<SelectListItem>("[dbo].[N_PMUMapping_Get_VersionByProject]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<PMUMapping> GetFile(string ProjectId, string SeqNo, int HubId, string Version, int WBSHeaderId, int TaskId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@SeqNo", SeqNo);
                parameters.Add("@HubId", HubId);
                parameters.Add("@Version", Version);
                parameters.Add("@WBSHeaderId", WBSHeaderId);
                parameters.Add("@TaskId", TaskId);
                return con.Query<PMUMapping>("[dbo].[N_DisplayUploadedFiles]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<dynamic> GetUpdates(int HubId, int ProjectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@HubId", HubId);
                parameter.Add("@ProjectId", ProjectId);
                return con.Query("[dbo].[N_PMUMappings_GetUpdatesData]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public string SaveUpdates(int HubId, int ProjectId, string Updates, string loginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@HubId", HubId);
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@Updates", Updates);
                parameter.Add("@CreatedBy", loginId);
                parameter.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_PMUMappings_SaveUpdates]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                string message = parameter.Get<string>("@Result");
                return message;
            }
        }

        #endregion

        #region Milestone

        public IEnumerable<StatusListData> GetStatusList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<StatusListData>("[dbo].[Get_EPPM_StatusList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<dynamic> GetMyMileStoneList(string Status, string UserName, string EmailId, int roleId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Status", Status);
                parameter.Add("@UserId", UserName);
                parameter.Add("@EmailId", EmailId);
                parameter.Add("@RoleId", roleId);
                return con.Query<dynamic>("[N_GetMyMileStoneList]", parameter, commandType: CommandType.StoredProcedure,
                    commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public (IEnumerable<ProjectHeader> Header, IEnumerable<ProjectMyMilestoneDetails> Details)
            GetMyMileStoneSearchedData(string HubId, string ProjectId, int RoleId, string UserName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Hub", HubId);
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@RoleId", RoleId);
                parameter.Add("@UserId", UserName);
                var result = con.QueryMultiple("GetMyMileStoneSearchedData", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return (result.Read<ProjectHeader>(), result.Read<ProjectMyMilestoneDetails>());
            }
        }


        public IEnumerable<dynamic> Checkingdependedmilestonestaus(int ProjectId, int SlNo, int Hub)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                MyMilestone milestone = new MyMilestone();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@SlNo", SlNo);
                parameter.Add("@Hub", Hub);
                return con.Query<dynamic>("[dbo].[N_PMUMapping_CheckDependetMilestoneStatus]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<dynamic> GetMilestoneRevisedDates(int ProjectId, int SlNo, string PMUVersion, string StartDate, string EndDate, int Hub, string SortedOrder)
        {
            NewPMUMappings newPMUMappings = new NewPMUMappings();
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                var sd = DateTime.ParseExact(StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var ed = DateTime.ParseExact(EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                parameters.Add("@SlNo", SlNo);
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@PMUVersion", PMUVersion);
                parameters.Add("@StartDate", DateTime.ParseExact(StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                parameters.Add("@EndDate", DateTime.ParseExact(EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                parameters.Add("@Hub", Hub);
                parameters.Add("@SortedOrder", SortedOrder);
                return con.Query<dynamic>("[dbo].[N_PMUMappings_GetRevisedDates]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public string UpdatePMUDetails(string JsonData, int RoleId, string UserName)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@JsonData", JsonData);
                parameter.Add("@RoleId", RoleId);
                parameter.Add("@UserName", UserName);

                parameter.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_UpdatePMUMappingData]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                string message = parameter.Get<string>("@Result");
                return message;
            }
        }

        public IEnumerable<dynamic> GetUserRequestedEndDateList(string Status, string UserName, string EmailId, int roleId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Status", Status);
                parameter.Add("@UserName", UserName);
                parameter.Add("@EmailId", EmailId);
                parameter.Add("@RoleId", roleId);
                return con.Query<dynamic>("[N_ApproveUserRequest_List]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<ApproveMilestone> MyMilestoneApprovalDetail(int PrjId, int Hub, string UserName, int RoleId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@HubId", Hub);
                parameter.Add("@ProjectId", PrjId);
                parameter.Add("@UserId", UserName);
                parameter.Add("@RoleId", RoleId);
                return con.Query<ApproveMilestone>("[N_MyMilestoneApproval_Details]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<dynamic> Get_DependentMyMilestone(int projectId, int slNo, string startDate, string pmuVersion, string endDate, int Hub, string SortedOrder)
        {
            var sd = DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var ed = DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("ProjectId", projectId);
                parameter.Add("SlNo", slNo);
                parameter.Add("PMUVersion", pmuVersion);
                parameter.Add("StartDate", sd);
                parameter.Add("EndDate", ed);
                parameter.Add("Hub", Hub);
                parameter.Add("SortedOrder", SortedOrder);
                return con.Query<dynamic>("[N_PMUMappings_GetRevisedDates]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public string ApproveOrRejectMilestone(int extendId, string userName, string ApprovalRemarks)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("ExtendId", extendId);
                parameter.Add("UserName", userName);
                parameter.Add("ApprovalRemarks", ApprovalRemarks);
                parameter.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                con.Query<string>("[N_PMUMappings_MileStone_Approval]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return parameter.Get<string>("Result");
            }
        }
        public IEnumerable<TaskRemarksHistory> GetParticularTaskRemarksHistory(int projectId, int slNo, int hub)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@slNo", slNo);
                parameter.Add("@ProjectId", projectId);
                parameter.Add("@HubId", hub);
                return con.Query<TaskRemarksHistory>("[N_MyMilestoneApproval_RemarksHistory]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        #endregion

        #region Master
        public Ideation.Models.Common Update_ProjectStatus(int projectId, string projectStatus, string userName, string IsActive)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                Ideation.Models.Common common = new Ideation.Models.Common();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", projectId);
                parameter.Add("@StatusName", projectStatus);
                parameter.Add("@IsActive", IsActive);
                parameter.Add("@UserName", userName);
                parameter.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameter.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                con.Query("[dbo].[ProjectMaster_Update]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                common.OutMessage = parameter.Get<string>("@OutMessage");
                common.StyleClass = parameter.Get<string>("@StyleClass");
                return common;
            }
        }

        public List<EPPMProjectMaster> Get_ProjectMasterList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<EPPMProjectMaster>("[dbo].[ProjectMaster_SelectList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();
            }
        }

        public List<string> Get_ProjectStatusMasterList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<string>("[dbo].[ProjectStatusMaster_GetList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();
            }
        }
        #endregion

        #region PMUmappings

        public Tuple<IEnumerable<dynamic>, IEnumerable<dynamic>> GetRevisedDates_AllRequestData(int ProjectId, int SlNo, string PMUVersion,
            string StartDate, string EndDate, int HubId, string SortedOrder)
        {
            var sd = DateTime.ParseExact(StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var ed = DateTime.ParseExact(EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@SlNo", SlNo);
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@Hub", HubId);
                parameters.Add("@PMUVersion", PMUVersion);
                parameters.Add("@StartDate", sd);
                parameters.Add("@EndDate", ed);
                parameters.Add("@SortedOrder", SortedOrder);
                var result = con.QueryMultiple("N_PMUMappings_GetRevisedDates_AllRequestData", parameters,
                    commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return new Tuple<IEnumerable<dynamic>, IEnumerable<dynamic>>(result.Read<dynamic>(), result.Read<dynamic>());
            }
        }

        public IEnumerable<dynamic> CheckForApproval(int projectId, int HubId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("ProjectId", projectId);
                parameter.Add("HubId", HubId);
                return con.Query<dynamic>("[N_PMUMappings_CheckForApproval]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<dynamic> CheckForScopeChange(int projectId, int HubId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("ProjectId", projectId);
                parameter.Add("HubId", HubId);
                return con.Query<dynamic>("[N_PMUMappings_GetIsScopeChangedData]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public Tuple<IEnumerable<WBSHeader>, IEnumerable<Models.Task>, IEnumerable<Models.Resources>, IEnumerable<Models.Template>>
            PMUMappings_DropdownList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                var result = con.QueryMultiple("N_PMUMappings_Dropdowns_GetList", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return new Tuple<IEnumerable<WBSHeader>, IEnumerable<Models.Task>, IEnumerable<Models.Resources>, IEnumerable<Models.Template>>
                    (result.Read<WBSHeader>(), result.Read<Models.Task>(), result.Read<Models.Resources>(), result.Read<Models.Template>());
            }
        }

        public string SavePMUMappings(string jsonObject, string Documents, string Remarks, string userName,
            string LatestVersion, string LatestVersionGroup, string PreviousVersion, string PreviousVersionGroup,
            bool isLatest, int projectId, bool IsWeekendExcluded, bool IsKPIIncluded,int hubId, int ExtendedId,
            string ApprovalRemarks, int IsCloneAcceptedForProject,string saveAppRemarks, int isSaveAppRemarks)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("JsonObject", jsonObject);
                parameters.Add("Documents", Documents);
                parameters.Add("Remarks", Remarks);

                parameters.Add("UserName", userName);

                parameters.Add("ProjectId", projectId);
                parameters.Add("Hub", hubId);
                parameters.Add("IsWeekendExcluded", IsWeekendExcluded);
                parameters.Add("IsKPIIncluded", IsKPIIncluded);
                parameters.Add("IsLatest", isLatest);

                parameters.Add("LatestVersion", LatestVersion);
                parameters.Add("LatestVersionGroup", LatestVersionGroup);
                parameters.Add("PreviousVersion", PreviousVersion);
                parameters.Add("PreviousVersionGroup", PreviousVersionGroup);

                parameters.Add("ExtendedId", ExtendedId);
                parameters.Add("ApprovalRemarks", ApprovalRemarks);

                parameters.Add("IsCloneAcceptedForProject", IsCloneAcceptedForProject);

                parameters.Add("SaveAppRemarks", saveAppRemarks);
                parameters.Add("IsSaveAppRemarks", isSaveAppRemarks);

                parameters.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                con.Query<string>("[dbo].[N_PMUMappings_InsertUpdate]", parameters, commandType: CommandType.StoredProcedure,
                    commandTimeout: CommonConstants.CommandTimeOut);
                return parameters.Get<string>("Result");
            }
        }
        public Tuple<string, string> AutoSavePMUMappings(string jsonObject, string Documents, string Remarks,
            string userName, int projectId, bool IsWeekendExcluded, bool IsKPIIncluded, int hubId,
            string LatestVersion, string LatestVersionGroup, int IsCloneAcceptedForProject)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("JsonObject", jsonObject);
                parameters.Add("Documents", Documents);
                parameters.Add("Remarks", Remarks);

                parameters.Add("UserName", userName);

                parameters.Add("ProjectId", projectId);
                parameters.Add("Hub", hubId);
                parameters.Add("IsWeekendExcluded", IsWeekendExcluded);
                parameters.Add("IsKPIIncluded", IsKPIIncluded);

                parameters.Add("LatestVersion", LatestVersion);
                parameters.Add("LatestVersionGroup", LatestVersionGroup);

                parameters.Add("IsCloneAcceptedForProject", IsCloneAcceptedForProject);

                parameters.Add("DocumentDetails", dbType: DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);
                parameters.Add("RemarksDetails", dbType: DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);

                con.Query<string>("[N_PMUMappings_AutoSave]", parameters, commandType: CommandType.StoredProcedure,
                    commandTimeout: CommonConstants.CommandTimeOut);

                return new Tuple<string, string>(parameters.Get<string>("@DocumentDetails"), parameters.Get<string>("@RemarksDetails"));
            }
        }
        public NewPMUMappings PMUMappings_GetList(
            int projectId, bool isFromTemplate, string CurrentSelectedVersion, int HubId, int TemplateId,
            int IsScopeChanged = 0, int IsCloneAccepted = 0
        )
        {
            NewPMUMappings newPMUMappings = new NewPMUMappings();
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", projectId);
                parameters.Add("IsFromTemplate", isFromTemplate);
                parameters.Add("Version", CurrentSelectedVersion);
                parameters.Add("Hub", HubId);
                parameters.Add("Template", TemplateId);
                parameters.Add("IsScopeChanged", IsScopeChanged);
                parameters.Add("IsCloneAccepted", IsCloneAccepted);
                var result = con.QueryMultiple("[dbo].[N_PMUMappings_GetList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                newPMUMappings.PMUVersionList = result.Read<PMUVersions>().ToList();
                newPMUMappings.PMUMappingDetails.AddRange(result.Read<PMUMappings>());
                newPMUMappings.DocumentDetails.AddRange(result.Read<Models.Documents>());
                newPMUMappings.RemarkDetails.AddRange(result.Read<Remarks>());
                newPMUMappings.IsWeekendExculded = result.Read<bool>().FirstOrDefault();
                newPMUMappings.IsKPIIncluded = result.Read<bool>().FirstOrDefault();

                return newPMUMappings;
            }
        }
        public string AddNotes(int HubId, int ProjectId, string Notes, string loginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@HubId", HubId);
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@Notes", Notes);
                parameter.Add("@CreatedBy", loginId);
                parameter.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_PMUMappings_SaveNotes]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                string message = parameter.Get<string>("@Result");
                return message;
            }
        }
        public Tuple<string, int> SaveNewWBSHeaderTask(string newData, string type, bool kpitask, string UserName)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@NewData", newData);
                parameter.Add("@Type", type);
                parameter.Add("@KPItask", kpitask);
                parameter.Add("@UserName", UserName);
                parameter.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameter.Add("@NewId", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_PMUMappings_InsertWBSHeaderTask]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                string message = parameter.Get<string>("@Result");
                return new Tuple<string, int>(parameter.Get<string>("@Result"), parameter.Get<int>("@NewId"));
            }
        }
        public string DeleteWBSHeaderTask(int deleteId, string type, string UserName)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@DeleteId", deleteId);
                parameter.Add("@Type", type);
                parameter.Add("@UserName", UserName);
                parameter.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_PMUMappings_DeleteWBSHeaderTask]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                string message = parameter.Get<string>("@Result");
                return message;
            }
        }
        public string SavePMUMappingsNewTemplate(string jsonObject, string TemplateName, string UserName)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@jsonObject", jsonObject);
                parameter.Add("@TemplateName", TemplateName);
                parameter.Add("@UserName", UserName);
                parameter.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_PMUMappings_InsertTemplate]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                string message = parameter.Get<string>("@Result");
                return message;
            }
        }
        public IEnumerable<dynamic> GetNotes(int HubId, int ProjectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@HubId", HubId);
                parameter.Add("@ProjectId", ProjectId);
                return con.Query("[dbo].[N_PMUMappings_GetNotesData]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<SelectListItem> GetMappedProjects()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<SelectListItem>("[dbo].[N_PMUMappings_MappedList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<SelectListItem> GetMappedHubs(int projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", projectId);
                return con.Query<SelectListItem>("[dbo].[N_PMUMapping_GetUnMappedHub]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public NewPMUMappings PMUMappingsClone_GetList(int CloneFromProjectId, int CloneFromHubId, int ProjectId, int HubId,string Version,
            int IsResourceRequired, int IsScopeChanged, int IsCloneAccepted)
        {
            NewPMUMappings newPMUMappings = new NewPMUMappings();
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("CloneFromProjectId", CloneFromProjectId);
                parameters.Add("CloneFromHubId", CloneFromHubId);
                parameters.Add("ProjectId", ProjectId);
                parameters.Add("Hub", HubId);
                parameters.Add("Version", Version);
                parameters.Add("IsResourceRequired", IsResourceRequired);
                parameters.Add("IsScopeChanged", IsScopeChanged);
                parameters.Add("IsCloneAccepted", IsCloneAccepted);
                var result = con.QueryMultiple("[dbo].[N_PMUMappingsClone_GetList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                newPMUMappings.PMUMappingDetails.AddRange(result.Read<PMUMappings>());
                newPMUMappings.PMUVersionList = result.Read<PMUVersions>().ToList();
                newPMUMappings.IsWeekendExculded = result.Read<bool>().FirstOrDefault();
                newPMUMappings.IsKPIIncluded = result.Read<bool>().FirstOrDefault();
                return newPMUMappings;
            }
        }

        public NewPMUMappings PMUMappingsData(int projectId, int HubId, string PMUVersion)
        {
            NewPMUMappings newPMUMappings = new NewPMUMappings();
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", projectId);
                parameters.Add("Version", PMUVersion);
                parameters.Add("Hub", HubId);
                var result = con.QueryMultiple("[dbo].[N_PMUMappings_GetList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                newPMUMappings.PMUVersionList = result.Read<PMUVersions>().ToList();
                newPMUMappings.PMUMappingDetails.AddRange(result.Read<PMUMappings>());
                return newPMUMappings;
            }
        }

        public string SavePreviousVersionPath(string jsonObject, string userName, string pMUVersion, int projectId, int hubId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("JsonObject", jsonObject);
                parameters.Add("UserName", userName);
                parameters.Add("Version", pMUVersion);
                parameters.Add("Hub", hubId);
                parameters.Add("ProjectId", projectId);
                parameters.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                con.Query<string>("[dbo].[N_PMUMapping_SavePreviousVersionPath]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return parameters.Get<string>("Result");
            }
        }

        public IEnumerable<PMUVersions> GetPMUMappingVersion(int projectId, int HubId, int IsScopeChanged = 0, int IsCloneAccepted = 0)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", projectId);
                parameters.Add("Hub", HubId);
                parameters.Add("IsScopeChanged", IsScopeChanged);
                parameters.Add("IsCloneAccepted", IsCloneAccepted);
                return con.Query<PMUVersions>("[dbo].[N_PMUMapping_PMUVersions]", parameters, commandType: CommandType.StoredProcedure,
                    commandTimeout: CommonConstants.CommandTimeOut);

            }
        }

        #endregion

        #region IssueTracker
        public Tuple<IEnumerable<dynamic>, IEnumerable<IssueTrackerHubList>, IEnumerable<dynamic>> GetIssueList(int projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("ProjectId", projectId);
                    var result = con.QueryMultiple("[dbo].[IssueTracker_GetList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<IEnumerable<dynamic>, IEnumerable<IssueTrackerHubList>, IEnumerable<dynamic>>
                        (result.Read<dynamic>(), result.Read<IssueTrackerHubList>(), result.Read<dynamic>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IssueTracker GetDropdownValues()
        {
            using IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString);
            DynamicParameters parameters = new DynamicParameters();
            IssueTracker it = new IssueTracker();
            try
            {
                using (var reader = con.QueryMultiple("IssueTracker_GetDropDownvalues", commandType: CommandType.StoredProcedure))
                {
                    it.HubList = reader.Read<IssueTrackerHubList>().ToList();
                    it.ImpactAssessementList = reader.Read<IssueTrackerImpactAssList>().ToList();
                    it.PriorityList = reader.Read<IssueTrackerPriorityList>().ToList();
                    it.StatusList = reader.Read<IssueTrackerStatusList>().ToList();
                    it.AllDropDownList = reader.Read<IssueTrackerAllList>().ToList();
                    it.AssignedtoList = reader.Read<IssueTrackerAssignedtoList>().ToList();
                    it.CRStatusList = reader.Read<ChangeLogCRStatusList>().ToList();
                    it.ImpactLevelList = reader.Read<RiskRegisterILList>().ToList();
                    it.ProbabilityLevelList = reader.Read<RiskRegisterPLList>().ToList();
                    return it;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public Tuple<string, string> DeleteIssue(int ProjectId, int IssueId, string LoginId)
        {
            using IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString);
            DynamicParameters parameters = new DynamicParameters();
            try
            {
                parameters.Add("ProjectId", ProjectId);
                parameters.Add("IssueId", IssueId);
                parameters.Add("LoginId", LoginId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("IssueTracker_Delete", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<dynamic> GetTaskList(int projectId, string hubId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("ProjectId", projectId);
                    parameters.Add("Hub", hubId);
                    return con.Query<dynamic>("[dbo].[IssueTracker_GetTasks]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public Tuple<IEnumerable<IssueHeader>, IEnumerable<IssueDetail>, IEnumerable<IssueImpactedTask>> GetParticularIssueData(int issueId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("IssueId", issueId);
                    var result = con.QueryMultiple("IssueTracker_GetParticularIssueData", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<IEnumerable<IssueHeader>, IEnumerable<IssueDetail>, IEnumerable<IssueImpactedTask>>
                    (result.Read<IssueHeader>(), result.Read<IssueDetail>(), result.Read<IssueImpactedTask>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<dynamic> GetTaskByIssue(int issueId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("IssueId", issueId);
                    return con.Query<dynamic>("[dbo].[IssueTracker_GetTaskByIssue]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        public string InsertUpdateIssue(string Headers, string Details, string ImpactedTasks, string UserName, int projectId, int IsInsert, int IssueId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IssueHeaderJson", Headers);
                parameters.Add("@IssueDetailJson", Details);
                parameters.Add("@IssueImpactedTaskJson", ImpactedTasks);
                parameters.Add("@IsInsert", IsInsert);
                parameters.Add("@ProjectId", projectId);
                parameters.Add("@LoginId", UserName);
                parameters.Add("@IssueId", IssueId);
                parameters.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query<string>("[dbo].[IssueTracker_InsertUpdate]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return parameters.Get<string>("Result");
            }
        }
        #endregion

        #region ChangeLog
        public Tuple<IEnumerable<dynamic>, IEnumerable<HubListData>, IEnumerable<dynamic>, IEnumerable<dynamic>>
            GetChangeList(int projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("ProjectId", projectId);
                    var result = con.QueryMultiple("[dbo].[ChangeLog_GetList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<IEnumerable<dynamic>, IEnumerable<HubListData>, IEnumerable<dynamic>, IEnumerable<dynamic>>
                        (result.Read<dynamic>(), result.Read<HubListData>(), result.Read<dynamic>(), result.Read<dynamic>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public Tuple<string, string> DeleteChange(int ProjectId, int ChangeId, string LoginId)
        {
            using IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString);
            DynamicParameters parameters = new DynamicParameters();
            try
            {
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@ChangeId", ChangeId);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("ChangeLog_Delete", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public Tuple<string, int, string, string> InsertUpdateChange(string Headers, string Details, string UserName, int projectId, int IsInsert, int ChangeId, string Remarks)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ChangeHeaderJson", Headers);
                parameters.Add("@ChangeDetailJson", Details);
                parameters.Add("@Remarks", Remarks);
                parameters.Add("@IsInsert", IsInsert);
                parameters.Add("@ProjectId", projectId);
                parameters.Add("@LoginId", UserName);
                parameters.Add("@ChangeId", ChangeId);
                parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameters.Add("@HubId", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameters.Add("@HubName", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameters.Add("@IsScopeChanged", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[ChangeLog_InsertUpdate]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return new Tuple<string, int, string, string>(
                    parameters.Get<string>("Result"), parameters.Get<int>("IsScopeChanged"),
                    parameters.Get<string>("HubId"), parameters.Get<string>("HubName")
                );
            }
        }
        public Tuple<IEnumerable<ChangeLogHeader>, IEnumerable<IssueDetail>, IEnumerable<HubListData>> GetParticularChangeData(int ChangeId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("ChangeId", ChangeId);
                    var result = con.QueryMultiple("ChangeLog_GetParticularChangeData", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<IEnumerable<ChangeLogHeader>, IEnumerable<IssueDetail>, IEnumerable<HubListData>>
                    (result.Read<ChangeLogHeader>(), result.Read<IssueDetail>(), result.Read<HubListData>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        #endregion

        #region Risk Register
        public Tuple<IEnumerable<dynamic>, IEnumerable<dynamic>> GetRiskList(int projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("ProjectId", projectId);
                    var result = con.QueryMultiple("[dbo].[RiskRegister_GetList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<IEnumerable<dynamic>, IEnumerable<dynamic>>(result.Read<dynamic>(), result.Read<dynamic>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public Tuple<string, string> DeleteRisk(int ProjectId, int RiskId, string LoginId)
        {
            using IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString);
            DynamicParameters parameters = new DynamicParameters();
            try
            {
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@RiskId", RiskId);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("RiskRegister_Delete", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public string InsertUpdateRisk(string Headers, string Details, string UserName, int projectId, int IsInsert, int RiskId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@RiskRegisterHeaderJson", Headers);
                parameters.Add("@RiskRegisterDetailJson", Details);
                parameters.Add("@IsInsert", IsInsert);
                parameters.Add("@ProjectId", projectId);
                parameters.Add("@LoginId", UserName);
                parameters.Add("@RiskId", RiskId);
                parameters.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query<string>("[dbo].[RiskRegister_InsertUpdate]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return parameters.Get<string>("Result");
            }
        }
        public Tuple<IEnumerable<RiskRegisterHeader>, IEnumerable<IssueDetail>> GetParticularRiskData(int RiskId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                try
                {
                    parameters.Add("RiskId", RiskId);
                    var result = con.QueryMultiple("RiskRegister_GetParticularRiskData", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<IEnumerable<RiskRegisterHeader>, IEnumerable<IssueDetail>>
                    (result.Read<RiskRegisterHeader>(), result.Read<IssueDetail>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        #endregion

        #region KPIDashboard
        public IEnumerable<KPIDashBoard> GetKPIDashboardData(string LoginId, string Month, string Year, string Division)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("LoginId", LoginId);
                parameters.Add("Month", Month);
                parameters.Add("Year", Year);
                parameters.Add("Division", Division);
                var result = connection.Query<KPIDashBoard>("GetKPIDashboardData", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public KPIDashBoard GetKPIDashBoardMasterData()
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                var p = new DynamicParameters();
                var result = connection.QueryMultiple("GetKPIDashBoardMasterData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                KPIDashBoard kpidash = new KPIDashBoard();
                kpidash.ReasonsForDelayList = result.Read<ReasonForDelayMaster>();
                kpidash.MonthMasterList = result.Read<MonthMaster>();
                kpidash.StatusMasterList = result.Read<StatusMaster>();
                kpidash.DivisionList = result.Read<DivisionList>();
                return kpidash;
            }
        }

        public Tuple<string, string> KPIDataSave(string LoginId, int RoleId, KPIDashBoard KpiData)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("LoginId", LoginId);
                param.Add("KPIDataSave", KpiData.ProjectDataToSave);
                param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                connection.Query("UploadKPIDashBoardData", param, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
            }
        }

        public IEnumerable<RemarksList> GetKPIDashboardRemarks(string ProjectId, string KPIId, string Hub, string LoginId)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", ProjectId);
                parameters.Add("KPIId", KPIId);
                parameters.Add("Hub", Hub);
                parameters.Add("LoginId", LoginId);
                var result = connection.Query<RemarksList>("GetKPIDashboardRemarks", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public string KPIReasonMaster(int ReasonId, string ReasonName, string Type, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ReasonId", ReasonId);
                parameter.Add("@Reason", ReasonName);
                parameter.Add("@Type", Type);
                parameter.Add("@UserName", LoginId);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[dbo].[N_InsertUpdateReason]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return parameter.Get<string>("@Message");
            }
        }

        #endregion

        #region TTDDashboard
        public IEnumerable<TTDDropdownData> GetTTDDropDownData()
        {
            IEnumerable<TTDDropdownData> result = new List<TTDDropdownData>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    const string storedProcedure = "TTD_GetDropdownValues";
                    result = con.Query<TTDDropdownData>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "GetTTDDropDownData", e.Message);
            }
            return result;
        }
        public IEnumerable<TTDDashboard> GetTTDGridData(int prodyear, string product, string loginId)
        {
            IEnumerable<TTDDashboard> result = new List<TTDDashboard>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProductionTargetYear", prodyear);
                    param.Add("@Product", product);
                    param.Add("@LoginId", loginId);
                    result = con.Query<TTDDashboard>("TTD_GetGridData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "GetTTDGridData", e.Message);
            }
            return result;
        }
        public IEnumerable<TTDDashboard> GetTTDExcelData(int prodyear, string product)
        {
            IEnumerable<TTDDashboard> result = new List<TTDDashboard>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProductionTargetYear", prodyear);
                    param.Add("@Product", product);
                    result = con.Query<TTDDashboard>("TTD_GetExcelData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "GetTTDGridData", e.Message);
            }
            return result;
        }
        public Tuple<string, string> SaveTTDDetails(string dataToSave, string LoginId)
        {
            Tuple<string, string>? result = null;
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@JsonData", dataToSave);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("TTD_InsertUpdateData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    result = new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "SaveTTDDetails", e.Message);
                result = new Tuple<string, string>(e.Message, "text-danger");
            }
            return result;
        }
        public Tuple<string, string> UpdateSavedRemarks(int DataAndRemarksId, string Type, string Remarks, string LoginId)
        {
            Tuple<string, string>? result = null;
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@DataAndRemarksId", DataAndRemarksId);
                    param.Add("@Type", Type);
                    param.Add("@Remarks", Remarks);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("[TTD_UpdateSavedRemarks]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    result = new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                result = new Tuple<string, string>(e.Message, "text-danger");
                new Logger().LogError("EPPMRepository", "UpdateSavedRemarks", e.Message);
            }
            return result;

        }
        public Tuple<string, string> DeleteTTDDetails(string ttdHeaderId, string LoginId)
        {
            Tuple<string, string>? result = null;
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@TTDHeaderId", ttdHeaderId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("[TTD_DeleteData]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    result = new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "DeleteTTDDetails", e.Message);
                result = new Tuple<string, string>(e.Message, "text-danger");
            }
            return result;
        }
        public IEnumerable<dynamic> GetTTDHistory(int prodyear, string ttdheaderid, string historytype)
        {
            IEnumerable<dynamic> result = new List<dynamic>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProductionTargetYear", prodyear);
                    param.Add("@TTDHeaderId", ttdheaderid);
                    param.Add("@HistoryType", historytype);
                    result = con.Query<dynamic>("TTD_GetCommentsAndRemarksHistoryData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "GetTTDHistory", e.Message);
            }
            return result;
        }
        public IEnumerable<dynamic> GetTTDDatesAndRemarks(int prodyear)
        {
            IEnumerable<dynamic> result = new List<dynamic>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProductionTargetYear", prodyear);
                    result = con.Query<dynamic>("TTD_GetDatesAndRemarksData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "GetTTDHistory", e.Message);
            }
            return result;
        }
        public IEnumerable<dynamic> GetTTDProductNames()
        {
            IEnumerable<dynamic> result = new List<dynamic>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {

                    result = con.Query<dynamic>("[TTD_GetProductNames]", commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("EPPMRepository", "GetTTDProductNames", e.Message);
            }
            return result;
        }

        #endregion
    }
}