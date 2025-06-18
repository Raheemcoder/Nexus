using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ProjectBudgetExpensesSync.Repository
{
    public class ProjectBudgetExpensesSyncRepository
    {
        private readonly string piConnectionString;
        public ProjectBudgetExpensesSyncRepository(IConfiguration configuration)
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
        public string SaveAPIResponse(string jsonPayload, string responseContent, string type)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@JsonPayload", jsonPayload);
                    parameters.Add("@responseContent", responseContent);
                    parameters.Add("@Type", type);
                    parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    connection.Query("[SaveAPIResponse]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
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
