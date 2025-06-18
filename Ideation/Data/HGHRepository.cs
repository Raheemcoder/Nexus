using Dapper;
using Ideation.Core;
using System.Data.SqlClient;
using System.Data;
using Ideation.Models;

namespace Ideation.Data
{
    public class HGHRepository :IHGHRepository
    {
        #region HGHCode
        public (IEnumerable<dynamic> ProjectValue, string FromDate, string ToDate) GetHGHCodeMasterData(string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    var result = con.QueryMultiple("GetHGHCodeMasterData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    var ProjectValues = result.Read<dynamic>().ToList();
                    var fromDate = result.ReadFirstOrDefault<string>();
                    var ToDate = result.ReadFirstOrDefault<string>();
                    return (ProjectValues, fromDate, ToDate);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<dynamic> GetHGHCodeList(string LoginId, string Role, string ProjectId, string FromDate, string ToDate)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@FromDate", FromDate);
                    param.Add("@ToDate", ToDate);
                    return con.Query("GetHGHCodeList", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public (IEnumerable<dynamic> ProjectDetails, IEnumerable<dynamic> BusinesInfo, string HGHCode, string IsPresent, IEnumerable<dynamic> ExsistingHGHCode) HGH_GetProjectInfo(string ProjectId, string LoginId, string Role, string ProjectName, string HGHId = "")
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@HGHId", HGHId);
                    param.Add("@ProjectName", ProjectName);
                    var result = con.QueryMultiple("HGH_GetProjectInfo", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    var ProjectDetails = result.Read<dynamic>().ToList();
                    var BusinesInfo = result.Read<dynamic>().ToList();
                    var HGHCode = result.ReadFirstOrDefault<string>();
                    var IsPresent = result.ReadFirstOrDefault<string>();
                    var ExsistingHGHCode = result.Read<dynamic>().ToList();
                    return (ProjectDetails, BusinesInfo, HGHCode, IsPresent, ExsistingHGHCode);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> InsertHGHdata(string HGHCode, string ProjectId, string Remarks, string Action, string LoginId, string HGHId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@HGHCode", HGHCode);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Remarks", Remarks);
                    param.Add("@Action", Action);
                    param.Add("@LoginId", LoginId);
                    param.Add("@HGHId", HGHId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertHGHdata", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public IEnumerable<dynamic> GetHGHCodeHistory(string ProjectId, string HGHId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@HGHId", HGHId);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    return con.Query("GetHGHCodeHistory", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> DeleteHGHdata(string HGHId, string ProjectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@HGHId", HGHId);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Query("DeleteHGHdata", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> HGHSapRetry(string ProjectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Query("HGHSapRetry", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<SAPresponse> GetSAPFailedInfo(string ReqNo, string Page)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ReqNo", ReqNo);
                    param.Add("@Page", Page);
                    return con.Query<SAPresponse>("GetSAPFailedInfo", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
    }
}
