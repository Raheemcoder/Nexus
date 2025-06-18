using Dapper;
using System.Data.SqlClient;
using System.Data;
using Ideation.Models;
using Ideation.Core;
using Ideation;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Ideation.Data
{
    public class UserRepository:IUserRepository
    {
        IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString);
        public const int CommandTimeOut = 1200;
        /// <summary>
        /// Method to Insert User
        /// </summary>
        /// <param name="user"></param>
        /// <param name="LoggedUserId"></param>
        /// <returns></returns>
        public int AddUser(User user, string LoggedUserId)
        { 
            try
            {              
                    DynamicParameters p = new DynamicParameters();
                    p.Add("@UserId", user.UserId);
                    p.Add("@Role", user.Role);
                    p.Add("@UserType", user.UserType);
                    p.Add("@Name", user.Name);
                    p.Add("@EmailId", user.EmailId);
                    p.Add("@LoginId", user.LoginId);
                    p.Add("@Division", string.Join(",", user.Division));
                    p.Add("@Category", string.Join(",", user.Category));
                    p.Add("@Hub", string.Join(",", user.Hub));
                if (user.Manager != null)
                {
                    p.Add("@Manager", string.Join(",", user.Manager));
                }
                else 
                {
                    p.Add("@Manager",user.Manager);
                }
                    p.Add("@status", user.Active);
                    p.Add("@LoggedinUserId", LoggedUserId);
                    p.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    const string storedProcedure = "AddUsers";
                    con.Query<int>(storedProcedure, p, commandType: CommandType.StoredProcedure, commandTimeout: CommandTimeOut);
                    return p.Get<int>("Result");
                
            }
            catch (Exception ex)
            {
                throw (ex);
            }


        }
        /// <summary>
        /// Method to get All the users details
        /// </summary>
        /// <returns></returns>
        public IEnumerable<User> GetUserlist()
         {
            try { 

                DynamicParameters p = new DynamicParameters();
                const string storedProcedure = "UserGetList";
                var result = con.Query<User>(storedProcedure, p, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return result;
                }
            catch (Exception e)
            {
                throw (e);
            }
          }
        /// <summary>
        /// Method to get the user details based on the LoginID
        /// </summary>
        /// <param name="LoginId"></param>
        /// <returns></returns>
        public IEnumerable<User> Userlist(string LoginId)
        {
            try { 

                DynamicParameters p = new DynamicParameters();
                p.Add("@LoginId", LoginId);
                const string storedProcedure = "UserEditList";
                var result = con.Query<User>(storedProcedure, p, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return result;
                }
            catch (Exception e)             
            {
                throw (e);
            }
        }
        /// <summary>
        ///Method to get Category based on the division selected
        /// </summary>
        /// <param name="divisionId"></param>
        /// <returns></returns>
        public IEnumerable<CategoryMasters> GetCategory(int divisionId)
        {    
            try 
            { 
                var p = new DynamicParameters();
                p.Add("@DivID", divisionId);
                const string storedProcedure = "GetCategoryBy_Id";
                var result = con.Query<CategoryMasters>(storedProcedure, p, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return result;
             }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<Userinfo> GetUserNames()
        {
            try
            {
             
                var result = con.Query<Userinfo>("GetUsersDataForUserMaster",commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        


             public IEnumerable<CategoryMasters> GetCategoriesBasedOnDivision(string divisionIDs)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@DivisionID", divisionIDs);
                const string storedProcedure = "GetCategoryByDivisionId";
                var result = con.Query<CategoryMasters>(storedProcedure, p, commandTimeout: CommandTimeOut, commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

    }
}
