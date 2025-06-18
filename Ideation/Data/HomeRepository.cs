using Dapper;
using Ideation.Models;
using System.Data.Common;
using System.Data;
using Ideation.Core;
using System.Data.SqlClient;

namespace Ideation.Data
{
    public class HomeRepository: IHomeRepository
    {
        public List<PMUMapping> Get_ProjectSummaryList(int projectId, string loggedUserName, int roleId,int HubId,string Version)
        {
           
            //var summaryList = _homeRepository.Get_ProjectSummaryList(projectId,);
            using (IDbConnection dbConnection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserName", loggedUserName);
                parameter.Add("@RoleId", roleId);
                parameter.Add("@ProjectId", projectId);
                parameter.Add("@HubId", HubId);
                parameter.Add("@Version", Version);
                //parameter.Add("@RoleId", roleId);
                //parameter.Add("@UserName", userName);
                return dbConnection.Query<PMUMapping>("[dbo].[N_ProjectSummary_FetchList]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();

            }
        }

        public PMUMapping Get_ProjectStatusList(string loggedUserName, int roleId)
        {
            using (IDbConnection dbConnection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserName", loggedUserName);
                parameter.Add("@RoleId", roleId);

                return dbConnection.Query<PMUMapping>("[dbo].[N_ProjectSummary_FetchStatusList]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).FirstOrDefault();

            }
        }
        public List<PMUMapping> Get_ProjectVersiondetails(int projectId,int HubId,string Version,int IsFrom)
        {
            using (IDbConnection dbConnection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@HubId", HubId);
                parameter.Add("@ProjectId", projectId);
                parameter.Add("@Version", Version);
                parameter.Add("@IsFrom", IsFrom);

                return dbConnection.Query<PMUMapping>("[dbo].[N_VersionRemarks_Get]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();

            }
        }
        public IEnumerable<ExcelData> Get_ProjectSummaryExcelList(int projectId, string loggedUserName, int roleId, int HubId,string Version)
        {

            //var summaryList = _homeRepository.Get_ProjectSummaryList(projectId,);
            using (IDbConnection dbConnection = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserName", loggedUserName);
                parameter.Add("@RoleId", roleId);
                parameter.Add("@ProjectId", projectId);
                parameter.Add("@HubId", HubId);
                parameter.Add("@Version", Version);
                //parameter.Add("@RoleId", roleId);
                //parameter.Add("@UserName", userName);
                return dbConnection.Query<ExcelData>("[dbo].[N_ProjectSummary_FetchList]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).ToList();

            }
        }
    }
}
