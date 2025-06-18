using Dapper;
using System.Data.SqlClient;
using System.Data;
using Ideation.Models;
using Ideation.Core;
using static Ideation.Models.MMProject;
using DocumentFormat.OpenXml.Drawing.Spreadsheet;

namespace Ideation.Data
{
    public class MasterManagementRepository : IMasterManagementRepository
    {
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

        public IEnumerable<PMUMapping> Get_ProjectList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<PMUMapping>("[dbo].[Get_ProjectList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

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

        public List<EPPMProjectMaster> Get_ProjectMasterList(string Divisions, string Status, string IsFiltered)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Divisions", Divisions);
                param.Add("@Status", Status);
                param.Add("@IsFiltered", IsFiltered);
                return con.Query<EPPMProjectMaster>("[dbo].[MM_ProjectMaster_SelectList]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();
            }

        }
        public IEnumerable<DivisionList> Get_MMDivisionForDrpdwn()
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<DivisionList>("[dbo].[MM_ProjectMaster_GetDivisionList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();
            }

        }

        public List<string> Get_ProjectStatusMasterList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<string>("[dbo].[ProjectStatusMaster_GetList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();
            }
        }
        public IEnumerable<ProjectStatus> Get_MMProjectStatusList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<ProjectStatus>("[dbo].[ProjectStatusMaster_GetList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();
            }
        }

        public IEnumerable<RoleList> Get_RolesList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                return con.Query<RoleList>("[dbo].[RoleMaster_GetRolesList]", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

            }
        }

        public string Insert_Update_User(MMUser mMUser)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("LoginId", mMUser.LoginId);
                param.Add("UserName", mMUser.UserName);
                param.Add("EmailId", mMUser.EmailId);
                param.Add("ManagerId", mMUser.Manager);
                param.Add("HUB", mMUser.HUB);
                param.Add("Division", mMUser.Division);
                param.Add("ApplicationList", mMUser.ApplicationListData);
                param.Add("IsActive", mMUser.IsActive);
                param.Add("CreatedBy", mMUser.CreatedBy);
                param.Add("Profile", mMUser.Profile);
                param.Add("UserType", mMUser.UserTypeId);
                param.Add("Department", mMUser.Department);
                param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                con.Execute("[dbo].[UserMaster_InsertUpdate]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return param.Get<string>("Result");
            }
        }

        public IEnumerable<MMUser> UserMaster_GetList(string userId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("LoginId", userId);
                parameters.Add("ExportExcel", "No");
                var res= con.Query<MMUser>("[dbo].[UserMaster_GetData]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return res;
            }
        }
        public IEnumerable<dynamic> ProjectMaster_DropDownValues()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                var list = con.Query<dynamic>("[dbo].[ProjectMaster_GetDropValues]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                //parameters.Add("@UserId", userId);
                return list;

            }
        }
        public IEnumerable<MMProject> ProjectMaster_EditList(string ProjectCode)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectCode", ProjectCode);

                return con.Query<MMProject>("[dbo].[ProjectMaster_GetByCode]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

            }
        }

        public IEnumerable<MMProjectExcelReport> ProjectMaster_ExportExcel(string ProjectCode)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<MMProjectExcelReport>("[dbo].[ProjectMaster_GetByCode]", new { ProjectCode = ProjectCode }, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

            }
        }
        public IEnumerable<MMUserExcelReport> UserMaster_ExportExcel(string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var res = con.Query<MMUserExcelReport>("[dbo].[UserMaster_GetData]", new { LoginId = "00", ExportExcel = "Yes" }, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return res;

            }
        }

        public IEnumerable<ManagerValue> ProjectMaster_ManagerValues()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                return con.Query<ManagerValue>("[dbo].[EPPM_EditProjectMaster_ManagerDropdown]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

            }
        }
        public string ProjectMaster_UpdateData(MMProject mMProject)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("ProjectCode", mMProject.ProjectCode);
                    parameters.Add("Division", mMProject.Division);
                    parameters.Add("UserId", Convert.ToInt32(mMProject.UserId));
                    parameters.Add("Hub", mMProject.Hub);
                    parameters.Add("HGHCode", mMProject.HGHCode);
                    parameters.Add("RNDTeam", mMProject.RnDTeam);
                    parameters.Add("Type", mMProject.Type);
                    parameters.Add("Classification", mMProject.Classification);
                    parameters.Add("ProductName", mMProject.ProductName);
                    parameters.Add("ProjStatusId", Convert.ToInt32(mMProject.ProjectStatusId));
                    parameters.Add("MappedUsers", mMProject.MappedUsers);
                    parameters.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);
                    con.Query("[dbo].[ProjectMaster_Update_Latest]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return parameters.Get<string>("@Output");

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public IEnumerable<SFUserList> GetUserList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                return con.Query<SFUserList>("EPPM_MasterManagement_UserList", commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<MMDropdown> GetHUBandDivisionList(string type)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Type", type);
                return con.Query<MMDropdown>("User_GetHubAndDivisionDetails", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<ApplicationList> GetApplicationList(string loginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("LoginId", loginId);
                return con.Query<ApplicationList>("ApplicationDetails_GetList", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<MMDropdown> GetCategoryList(string division)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Division", division);
                return con.Query<MMDropdown>("CategoryMaster_GetDetailsByDivision", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<Users> ProjectMaster_UserValues()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                return con.Query<Users>("[dbo].[EPPM_MasterManagement_UserList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

            }
        }



        public List<string> GetUserMappedList(string Projectcode)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {

                return con.Query<string>("[dbo].[GetProjectMapping_UsersList]", new { ProjectCode = Projectcode }, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();

            }
        }
    }
}