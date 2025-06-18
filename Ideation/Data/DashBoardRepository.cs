using Ideation.Core;
using Ideation.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace Ideation.Data
{
    public class DashBoardRepository : IDashBoardRepository
    {
        public IEnumerable<DashBoard> GetDashBoardData(string LoginId,string role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@LoginId", LoginId);
                p.Add("@Role", role);
                const string storedProcedure = "DashBoard_Status";
                var result = con.Query<DashBoard>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<IdeationList> GetDashBoardStatus(string platform, string bussinessdivision, string statusname,string LoginId,string role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@PlatformTypeName", platform);
                p.Add("@BusinessDivisionName", bussinessdivision);
                p.Add("@StatusName", statusname);
                p.Add("@LoginId", LoginId);
                p.Add("@Role", role);
                const string storedProcedure = "GetDashboardStatus";
                var result = con.Query<IdeationList>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
