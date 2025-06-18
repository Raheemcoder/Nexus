using Dapper;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Ideation.Core;

namespace Ideation.Data
{
    public class ApproveRepository : IApproveRepository
    {

        public IEnumerable<UserMaster> GetUserList(string UserId)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@userId", UserId);
                var result = con.Query<UserMaster>("GetUsers", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public List<ProjectList> GetProjectList(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                const string storedProcedure = "UserProjectMapping_GetByUserId_ForApprove";
                return con.Query<ProjectList>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public List<object> GetWeekDataBasedOnUser(string UserId, DateTime StartDate, DateTime EndDate)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@StartDate", StartDate);
                p.Add("@EndDate", EndDate);
                const string storedProcedure = "EffortBooking_GetWeekDataBasedOnUser";
                return con.Query(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }


        public List<object> GetWeekDataBasedOnManager(string UserId, DateTime StartDate, DateTime EndDate)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@StartDate", StartDate);
                p.Add("@EndDate", EndDate);
                const string storedProcedure = "EffortBooking_GetWeekDataBasedONManager";
                return con.Query(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public List<object> GetProjectsBasedOnUserEffort(string UserId, DateTime Effortdate, DateTime firstDay, DateTime lastDay)
        {
            Approve approve = new Approve();
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var e = Effortdate.ToString("yyyy-MM-dd");
                var f = firstDay.ToString("yyyy-MM-dd");
                var l = lastDay.ToString("yyyy-MM-dd");
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@Effortdate", e);
                p.Add("@FirstDay", f);
                p.Add("@LastDay", l);
                const string storedProcedure = "GetProjectsBasedOnUserEfforts";
                var result = con.Query(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                return result;

            }
        }

        public string GetManagerRole(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 5215585);

                const string storedProcedure = "GetManagerRoleBasedOnLogin";
                con.Query<string>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return p.Get<string>("@Result");
            }


        }

        public Tuple<List<object>, List<object>> GetWeekData_approval(string UserId, DateTime StartDate, DateTime EndDate)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@StartDate", StartDate);
                p.Add("@EndDate", EndDate);
                const string storedProcedure = "EffortBooking_GetWeekData_forApprove";
                var reader = con.QueryMultiple(storedProcedure, new { UserId = UserId, StartDate = StartDate, EndDate = EndDate }, commandType: CommandType.StoredProcedure);
                var weekData = reader.Read<object>().ToList();
                var weekApportionData = reader.Read<object>().ToList();

                return Tuple.Create(weekData, weekApportionData); ;
            }
        }

        public Tuple<List<object>, List<object>> GetWeekData_basedOnEfforts(string UserId, DateTime StartDate, DateTime EndDate)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@StartDate", StartDate);
                p.Add("@EndDate", EndDate);
                const string storedProcedure = "EffortBooking_GetWeekData_BasedOnEffort";
                var reader = con.QueryMultiple(storedProcedure, new { UserId = UserId, StartDate = StartDate, EndDate = EndDate }, commandType: CommandType.StoredProcedure);
                var weekData = reader.Read<object>().ToList();
                var weekApportionData = reader.Read<object>().ToList();

                return Tuple.Create(weekData, weekApportionData);
            }
        }

        public string ApproveSave(string jsonString,string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@ApproveData", jsonString);
                p.Add("@UserId", UserId);
                p.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                const string storedProcedure = "UpdateApproveData";
                con.Query<string>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return p.Get<string>("@Output");

            }
        }
        public string SaveSendBack(string jsonString, string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@SendBackData", jsonString);
                p.Add("@UserId", UserId);
                p.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                const string storedProcedure = "UpdateSendBackData";
                con.Query<string>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return p.Get<string>("@Output");

            }
        }
        //public List<object> GetTaskAndEfforts(string UserId, DateTime Effortdate,string ProjectId)
        //{
        //    using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
        //    {

        //        var e = Effortdate.ToString("yyyy-MM-dd");
        //        var p = new DynamicParameters();
        //        p.Add("@UserId", UserId);
        //        p.Add("@EffortDate", e);
        //        p.Add("@ProjectId", ProjectId);

        //        const string storedProcedure = "GetTaskAndEfforts";
        //        return con.Query(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();

        //    }
        //}
    }
}
