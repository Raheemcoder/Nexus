using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HGHCreation.Repository
{
    public class HGHRepository
    {
        private readonly string piConnectionString;
        public HGHRepository(IConfiguration configuration)
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
        public IEnumerable<dynamic> GetHGHCodeToUpdate()
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                return connection.Query("[GetHGHCodeToUpdate]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }
        public string SaveHGHCodeResponse(string jsonPayload, string responseContent, string ProjectId)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(piConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@ProjectId", ProjectId);
                    parameters.Add("@JsonPayload", jsonPayload);
                    parameters.Add("@responseContent", responseContent);
                    parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    connection.Query("[SaveHGHCodeResponse]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return parameters.Get<string>("Result");
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public dynamic GetHGHCodeJsonData(string ProjectId, string HGHCode)
        {
            using (IDbConnection connection = new SqlConnection(piConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", ProjectId);
                parameters.Add("@HGHCode", HGHCode);
                return connection.Query("[GetHGHCodeJsonData]", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

    }
}

