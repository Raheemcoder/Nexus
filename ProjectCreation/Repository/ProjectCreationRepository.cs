using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCreation.Repository
{
    public class ProjectCreationRepository
    {
        private readonly string piConnectionString;
        public ProjectCreationRepository(IConfiguration configuration)
        {
            piConnectionString = configuration.GetConnectionString("Connection");
        }
        //private readonly static string piConnectionString = configuration.GetConnectionString("Connection");
        public dynamic GetConfigDetails(string ConfigName)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ConfigName", ConfigName);
                return connection.Query("[ISpace_Config_List]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
        public dynamic GetJsonPayload(string type)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Type", type);
                return connection.Query("[ISpace_JsonPayload_Get]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
        public IEnumerable<dynamic> GetProjectCodetoCreate()
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                return connection.Query("[GetProjectCodetoCreate]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }
        public dynamic GetProjectCreationJson(string ProjectCode)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectCode", ProjectCode);
                return connection.Query("[GetProjectCreationJson]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
        public string SaveProjectCreationResponse(string jsonPayload, string responseContent, string ProjectCode)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@ProjectCode", ProjectCode);
                    parameters.Add("@JsonPayload", jsonPayload);
                    parameters.Add("@responseContent", responseContent);
                    parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    connection.Query("SaveProjectCreationResponse", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return parameters.Get<string>("Result");
                }
            }
            catch (Exception ex)
            {
                return ex.Message;  
            }
        }
        public dynamic GetProjectIdAndDescriptionJson(string ProjectCode,string APIName)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectCode", ProjectCode);
                parameters.Add("@APIName", APIName);
                return connection.Query("GetProjectIdAndDescriptionJson", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
        public string SaveProjectIdDescriptionResponse(string jsonPayload, string responseContent, string ProjectCode, string url, string APIName)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@ProjectCode", ProjectCode);
                    parameters.Add("@JsonPayload", jsonPayload);
                    parameters.Add("@responseContent", responseContent);
                    parameters.Add("@url", url);
                    parameters.Add("@APIName", APIName);
                    parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    connection.Query("SaveProjectIdDescriptionResponse", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return parameters.Get<string>("Result");
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
 