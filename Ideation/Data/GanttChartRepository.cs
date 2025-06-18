using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;

namespace Ideation.Data
{
    public class GanttChartRepository: IGanttChartRepository
    {
        public IEnumerable<PMUMapping> Get_GanttChart(int RoleId, int UserId, int ProjectId, int VersionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserId", UserId);
                parameter.Add("@RoleId", RoleId);
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@VersionId", VersionId);
                return con.Query<PMUMapping>("[dbo].[Gantt_GetList]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
        public IEnumerable<History> Get_HistoryList(int SlNo, int projectId,int HubId,string Version,int WBSHeaderId, int TaskId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SlNo", SlNo);
                parameter.Add("@ProjectId", projectId);
                parameter.Add("@HubId", HubId);
                parameter.Add("@Version", Version);
                parameter.Add("@WBSHeaderId", WBSHeaderId);
                parameter.Add("@TaskId", TaskId);
                return con.Query<History>("[dbo].[N_Get_HistoryList]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }

        public IEnumerable<History> Get_ProjectHistoryList(int projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", projectId);

                return con.Query<History>("[dbo].[Get_ProjectHistoryList]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
            }
        }
    }
}