using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Org.BouncyCastle.Bcpg;
using NonFactors.Mvc.Grid;

namespace Ideation.Data
{
    public class ApportionRepository: IApportionRepository
    {
        public IEnumerable<Tasks> GetTasksList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "GetTaskList";
                    var result = con.Query<Tasks>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }


        public Tuple<IEnumerable<Division>, IEnumerable<Classification>, IEnumerable<ProjectType>,IEnumerable<RND>> GetAllList(string userId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                const string storedProcedure = "GetAllLists";
                var reader = con.QueryMultiple(storedProcedure,new { UserId = userId }, commandType: CommandType.StoredProcedure);
                var DivivsionList= reader.Read<Division>();
                var ClassificationList= reader.Read<Classification>();
                var ProjectTypeList= reader.Read<ProjectType>();
                var RNDList= reader.Read<RND>();

                return Tuple.Create(DivivsionList, ClassificationList, ProjectTypeList, RNDList);
            }
        }

        public IEnumerable<ProjectList> GetProjectList(string Division, string Classification, string ProjectType,string RnD, string IsFiltered,string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "GetProjectList";
                    var result = con.Query<ProjectList>(storedProcedure, new { DivisionList = Division, ClassificationList= Classification, ProjectTypeList=ProjectType, RnD=RnD, IsFiltered= IsFiltered,LoginId=LoginId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ApportionDataView> GetApportionDataViews(string UserId, string Year, string Month)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "ApportionData_Get";
                    var reader = con.QueryMultiple(storedProcedure, new { UserId = UserId,Year=Year,Month=Month }, commandType: CommandType.StoredProcedure);
                    var apportionData = reader.Read<ApportionDataView>();
                    return apportionData;
                   
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string ApportionSave(string UserId,string EffortDetails, int TaskId, string Remarks,string Division, string Classification, string ProjectType,string RnD)
            {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", UserId);
                p.Add("@ApportionData", EffortDetails);
                p.Add("@Division", Division);
                p.Add("@Classification", Classification);
                p.Add("@ProjectType", ProjectType);
                p.Add("@TaskId", TaskId);
                p.Add("@RnD", RnD);
                p.Add("@Remarks", Remarks);
                p.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                const string storedProcedure = "InsertApportionData";
                con.Query<string>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return p.Get<string>("@Output");

            }
        }

        public void DeleteApportionData(int ApportionId,string StartDate,string EndDate,string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try {
                    const string storedProcedure = "ApportionData_DELETE";
                    var result = con.Query(storedProcedure, new { ApportionId = ApportionId, StartDate=StartDate, EndDate= EndDate,UserId=UserId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();

                }

                catch (Exception e) {
                    throw(e);
                }

            }
        }

        public IEnumerable<object> ShowApportionData(int ApportionId,string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "ApportionData_GetWeekData";
                    var result = con.Query<object>(storedProcedure, new { ApportionId = ApportionId,UserId=UserId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }

                catch (Exception e)
                {
                    throw (e);
                }

            }
        }

    }
}
