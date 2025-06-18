using Ideation.Core;
using Ideation.Models;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Data.Common;

namespace Ideation.Data
{
    public class AccountRepository : IAccountRepository
    {
        public string GetAccounts(Account account)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", account.Username);
                p.Add("@PageName", account.PageName);
                p.Add("@result", dbType: DbType.String, direction: ParameterDirection.Output, size: 5215585);
                const string storedProcedure = "Get_Role";
                con.Query<string>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return p.Get<string>("@result");
            }
        }

        public int GetUserAccount(Account account)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@LoginId", account.Username);
                p.Add("@Password", account.Password);
                const string storedProcedure = "GetLogins";
                var result = con.ExecuteScalar(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return (int)result;
            }
        }
        public Accountinfo GetPBAuthenticationDetails(string UserName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                try
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("username", UserName);
                    const string storedProcedure = "GetAuthenticationDetails";
                    var result = con.Query<Accountinfo>(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).SingleOrDefault();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }    
        }

        public Accountinfo GetPrototypeAuthenticationDetails(string UserName, string PageName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                try
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("username", UserName);
                    parameters.Add("PageName", PageName);
                    const string storedProcedure = "GetPrototypeAuthenticationDetails";
                    var result = con.Query<Accountinfo>(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).SingleOrDefault();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public Accountinfo GetEPPMAuthenticationDetails(string UserName,string PageName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserName", UserName);
                parameters.Add("PageName", PageName);
                Accountinfo u = con.Query<Accountinfo>("Authenticate_UserDetails", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut).FirstOrDefault();
                return u;
            }
                
        }
        public IEnumerable<AppMappingDetails> GetAppMappingDetails(string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoginId", LoginId);
                const string storedProcedure = "UserApplicationMapping_GetList";
                return con.Query<AppMappingDetails>(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

            }
        }

        public string GetUserBasedApplicationDetails(string UserName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var parameters = new { UserName = UserName };
                var result = con.Query<string>("GetUserBasedApplicationDetails", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).SingleOrDefault();
                return result;
            }
        }
        public void InsertLogOffInfo(string UserName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var parameters = new { UserName = UserName };
                var result = con.Query<string>("InsertLogOffInfo", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).SingleOrDefault();
            }
        }

        public int GetPageAccess(string PageName, string Role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@Role", Role);
                p.Add("@PageName", PageName);
                return con.Query<int>("GetApplicationRoleMappingStatus", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).SingleOrDefault();
            }
        }
    }
}
