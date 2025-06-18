
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace BOM_MaterialSync.Repository
{
    public class BOM_MaterialSyncRepository
    {
        private readonly string piConnectionString;
        public BOM_MaterialSyncRepository(IConfiguration configuration)
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
        public dynamic GETProjectIdJson(string ProjectId, string APIName)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@APIName", APIName);
                return connection.Query("GETProjectIdJson", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
        public string SaveProjectIdDescriptionResponse(string jsonPayload, string responseContent, string ProjectId, string url, string APIName)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@ProjectCode", ProjectId);
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
        public IEnumerable<dynamic> GetAllProjectIds()
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                return connection.Query("GetAllProjectIds", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
