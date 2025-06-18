using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Ideation.Data
{
    public class RoleRepository: IRoleRepository
    {
        IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString);
        public const int CommandTimeOut = 1200;
        public int InsertUpdate(Role role, string UserId)
        {
            try { 
          
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("RoleId", role.RoleId);
                parameters.Add("RoleName", role.RoleName);
                parameters.Add("IsActive", role.Status);
                parameters.Add("LoggedUserId", UserId);
                parameters.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = con.Query<int>("Role_InsertUpdate", parameters, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return parameters.Get<int>("Result");
               }
            catch (Exception e)
            {
                throw (e);
            }

}
        public IEnumerable<Role> GetRolelist()
        {
            try 
            { 

               DynamicParameters parameters = new DynamicParameters();
               const string storedProcedure = "[RoleGetList]";
               var result = con.Query<Role>(storedProcedure, parameters, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
               return result;
            
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public IEnumerable<Role> GetRoleListById(int RoleId)
        {
            try { 
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("RoleId",RoleId);
                const string storedProcedure = "[RoleGetListByID]";
                var result = con.Query<Role>(storedProcedure, parameters, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return result;

               }
            catch (Exception e)
            {
                throw (e);
            }

         }
        public IEnumerable<Menu> GetMenuListByRoleId(long RoleId)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("RoleId", RoleId);
                return con.Query<Menu>("Menu_GetList", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public IEnumerable<Menu> GetMenuListByRole(long RoleId,string AppName,string MenuType,string Role)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("RoleId", RoleId);
                    parameters.Add("AppName", AppName);
                    parameters.Add("MenuType", MenuType);
                    parameters.Add("Role", Role);
                    return connection.Query<Menu>("Menu_GetList", parameters, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        /// <summary>
        /// Insert,update menu details based on particular RoleId
        /// </summary>
        /// <param name="xmlString"></param>
        /// <param name="RoleId"></param>
        /// <param name="LoginId"></param>
        /// <returns></returns>
        public int UserMenu_InsertUpdateByRoleId(object xmlString, long RoleId, long LoginId)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("XmlString", xmlString);
                parameters.Add("RoleId", RoleId);
                parameters.Add("LoginId", LoginId);
                parameters.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                con.Query<Menu>("Menu_InsertUpdate", parameters, commandType: CommandType.StoredProcedure);
                return parameters.Get<int>("Result");
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

    }

    
}
