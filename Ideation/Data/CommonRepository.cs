using Ideation.Core;
using Ideation.Models;
using System.Data;
using Dapper;
using System.Data.SqlClient;


namespace Ideation.Data
{
    public class CommonRepository : ICommonRepository
    {


        public string SavePowerBILogsInformation(string reportId, string reportName, string loginId, string appName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ReportId", reportId);
                    param.Add("@ReportName", reportName);
                    param.Add("@AppName", appName);
                    param.Add("@LoginId", loginId);
                    param.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("PowerBILogs_Insert", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
