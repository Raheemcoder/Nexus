using Dapper;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Spreadsheet;
using Ideation.Core;
using Ideation.Models;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;

namespace Ideation.Data
{
    public class KDSMasterRepository : IKDSMasterRepository
    {
        public int Get_Sequence(string Type)
        {
            try
            {

                //   SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=yourDbName;Integrated Security=True;Pooling=False");

                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    var p = new DynamicParameters();
                    KDSMaster kds = new KDSMaster();

                    kds.Type = Type;

                    const string storedProcedure = "KDS_GetData";
                    p.Add("KDStype", kds.Type);
                    p.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    // kds.order = result.Read<order>();

                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    //   kds.Order =result;
                    return p.Get<int>("Result");
                }
            }
            catch { return 0; }
        }

        public long InsertUpdate(KDSMaster kds, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                //KDSMaster kds = new KDSMaster();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Type", kds.Type);
                parameters.Add("Value", kds.Value);
                //  parameters.Add("Remarks", kds.Remarks);
                parameters.Add("Order", kds.Order);
                parameters.Add("Status", kds.Status);
                parameters.Add("CreatedBy", LoginId);
                const string storedProcedure = "KDS_InsertData";
                var result = con.QueryMultiple(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return 1;
            }
        }
        public KDSMaster GetList(int Id)
        {
            //                    using (var reader = con.QueryMultiple("GetReformulationData", new { ProjectId = projectId,HubName=Hubname }, commandType: CommandType.StoredProcedure))

            try
            {
                KDSMaster kds = new KDSMaster();

                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    using (var reader = con.QueryMultiple("GetList",new { Id = Id }, commandType: CommandType.StoredProcedure))
                    {
                        DynamicParameters parameters = new DynamicParameters();
                    //    parameters.Add("Id",Id);
                        var JQGrid = reader.Read<JQGrid>().ToList();
                        kds.JQGridgrid=JQGrid;
                    }
                }
                return kds;
            }
            catch (Exception ex)
            {
                return null;

            }
        }
    }
}
   
