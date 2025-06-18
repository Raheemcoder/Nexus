using Dapper;
using DocumentFormat.OpenXml.Wordprocessing;
using Ideation.Core;
using Ideation.Models;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Web.WebPages;

namespace Ideation.Data
{
    public class EffortRepository : IEffortRepository
    {
        public List<object> GetMonthlyEfforts(string UserId, DateTime StartDate)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@StartDate", StartDate);
                const string storedProcedure = "EffortBooking_GetMonthData";
                return con.Query(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public Tuple<List<object>, List<object>, List<object>, IEnumerable<ManagerRemarks>> GetWeekData(string UserId, DateTime StartDate, DateTime EndDate)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@StartDate", StartDate);
                p.Add("@EndDate", EndDate);
                const string storedProcedure = "EffortBooking_GetWeekData";
                var reader = con.QueryMultiple(storedProcedure, new { UserId = UserId, StartDate = StartDate, EndDate = EndDate }, commandType: CommandType.StoredProcedure);
                var weekData = reader.Read<object>().ToList();
                var weekApportionData = reader.Read<object>().ToList();
                var totalEfforts = reader.Read<object>().ToList();
                var remarks = reader.Read<ManagerRemarks>();


                return Tuple.Create(weekData, weekApportionData, totalEfforts, remarks);
            }
        }
        public List<ProjectList> GetProjectList(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                const string storedProcedure = "UserProjectMapping_GetByUserId";
                return con.Query<ProjectList>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public List<ProjectList> GetMyProjects(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                const string storedProcedure = "EffortBooking_GetMyProjectsList";
                var result = con.Query<ProjectList>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public List<ProjectList> Get_ProjectMasterResourceData(string Projects, string Resources, string IsFiltered)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@Projects", Projects);
                p.Add("@Resources", Resources);
                p.Add("@IsFiltered", IsFiltered);
                const string storedProcedure = "EffortBooking_GetProjectMasterResourceData";
                var result = con.Query<ProjectList>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public string EffortBookingSave(string UserId, string jsonString, string DeletedDetails,string RemarksAddedProjectIds,string DeletedRemarksDetails)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@JsonString", jsonString);
                p.Add("@DeletedDetails", DeletedDetails);
                p.Add("@RemarksAddedProjectIds", RemarksAddedProjectIds);
                p.Add("@DeletedRemarksDetails", DeletedRemarksDetails);
                p.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                const string storedProcedure = "EffortBooking_Save";
                con.Query<string>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return p.Get<string>("Output");

            }
        }

        public Tuple<List<Leaves>, List<Leaves>> GetLeaves_HolidaysList(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                const string storedProcedure = "EffortBooking_GetLeaves_HolidaysList";
                var reader = con.QueryMultiple(storedProcedure, new { UserId = UserId }, commandType: CommandType.StoredProcedure);
                var Holidays = reader.Read<Leaves>().ToList();
                var Leaves = reader.Read<Leaves>().ToList();
                return Tuple.Create(Holidays, Leaves);

            }
        }
        public IEnumerable<EffortTracker> GetProjectReport_Details(string Projectid,string UserId,string fromdate, string todate)
        {
            EffortTracker effort = new EffortTracker();
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@ProjectId", Projectid);
                p.Add("@FromDate", fromdate);
                p.Add("@Todate", todate);
                p.Add("@UserName", UserId);
                //var result = reader.Read<PrototypeDetailsHeader>().ToList();
                var result = con.Query<EffortTracker>("GetEffortTrackerRemarksData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<EffortTracker> GetProjectReport_DetailsBasedOnSearch(string Projectid, string FromDate, string Todate, string User_Id)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@ProjectId", Projectid);
                p.Add("@FromDate", FromDate);
                p.Add("@Todate", Todate);
                p.Add("@UserName", User_Id);
                var result = con.Query<EffortTracker>("GetEffortTrackerRemarksData_Search", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<EffortTracker> GetTask_details(string date, int task, string CreatedBy)
        {
            EffortTracker effort = new EffortTracker();
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@Date", date);
                p.Add("@Task", task);
                p.Add("@CreatedBy", CreatedBy);
                var result = con.Query<EffortTracker>("GetEffortBooking_ProjectsBasedOnTask", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;



            }
        }

        public List<ProjectRemarks> GetProjectRemarks(string ProjectId, string userId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@ProjectId", ProjectId);
                p.Add("@UserId", userId);
                const string storedProcedure = "GetEffortBookingProjectRemarks";
                var result = con.Query<ProjectRemarks>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public List<UserNames> GetAllUsernames(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@Loginid", UserId);
                const string storedProcedure = "Get_UserList";
                return con.Query<UserNames>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public void SaveRemarksBasedOnProject(string ProjectId, string userId, string Remarks, string RemarksDate)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();

                p.Add("@ProjectId", ProjectId);
                p.Add("@UserId", userId);
                p.Add("@Remarks", Remarks);
                p.Add("@RemarksDate", RemarksDate);

                const string storedProcedure = "SaveEffortBookingRemarksBasedOnProject";
                con.Query(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}

