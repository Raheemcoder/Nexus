using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Diagnostics.SymbolStore;

namespace BudgetAllocation.Service.Repository
{
    public class BudgetAllocationRepository
{
        private readonly string piConnectionString;
        public BudgetAllocationRepository(IConfiguration configuration)
        {
            piConnectionString = configuration.GetConnectionString("Connection");
        }
        public dynamic GetConfigDetails(string ConfigName)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ConfigName", ConfigName);
                return connection.Query("[ISpace_Config_List]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
        public IEnumerable<dynamic> GetBudgetDataToUpdate()
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                return connection.Query("[GETBudgetDataToUpdate]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }
        public string SaveBudgetResponse(string jsonPayload, string responseContent, string ProjectId, string Year, string Amount)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@ProjectId", ProjectId);
                    parameters.Add("@Amount", Amount);
                    parameters.Add("@Year", Year);
                    parameters.Add("@JsonPayload", jsonPayload);
                    parameters.Add("@responseContent", responseContent);
                    parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    connection.Query("[SaveBudgetResponse]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return parameters.Get<string>("Result");
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public dynamic GetBudgetJsonData(string ProjectId, string Amount, string Year)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@Amount", Amount);
                parameters.Add("@Year", Year);
                return connection.Query("[GetBudgetJsonData]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
    }
}
