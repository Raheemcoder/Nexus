using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRCreation.Repository
{
    public class PRCreationRepository
    {
        private readonly string piConnectionString;

        public PRCreationRepository(IConfiguration configuration)
        {
            piConnectionString = configuration.GetConnectionString("Connection");
        }

        public IEnumerable<dynamic> GetOpenPRCountAndAPICred()
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                return connection.Query("[PR_GetOpenPRCountAndAPICred]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<dynamic> GetPRJsonFormat(string Id)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PRHeaderId", Id);
                return connection.Query("[PR_GetOpenPRJsonFormat]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }

        public string UpdatePRResponse(string jsonPayload, string responseContent, string Id)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@PRHeaderId", Id);
                    parameters.Add("@JsonPayload", jsonPayload);
                    parameters.Add("@ResponseContent", responseContent);
                    parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    connection.Query("[PR_UpdatePRResponse]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
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