using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data;
using System.Data.SqlClient;

namespace Ideation.Data
{
    public class MasterRepository : IMasterRepository
    {
        public Masters GetMasters()
        {
            using (IDbConnection con = new SqlConnection( new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
            
                const string storedProcedure = "Master_GetList";
                var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                Masters masters = new Masters();
                masters.BusinessDivisions = result.Read<BusinessDivision>();
                masters.GeographicScopes = result.Read<GeographicScope>();
                masters.PlatformTypes = result.Read<PlatformType>();
                masters.StrategicFits = result.Read<StrategicFit>();
                masters.Statuses = result.Read<Status>();
                masters.Remarks = result.Read<RemarkType>();
                return masters;
            }
        }
        public PBMasters GetPBMasters()
        {
            try
            {

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    const string storedProcedure = "MasterGetList";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    PBMasters masters = new PBMasters();                
                    masters.Year = result.Read<string>().FirstOrDefault();
                    masters.CategoryList = result.Read<CategoryMaster>();
                    masters.HubList = result.Read<HubMaster>();
                    masters.DivisionList = result.Read<DivisionMaster>();
                    masters.RoleList = result.Read<RoleMaster>();
                    masters.StatusList = result.Read<StatusMaster>();
                    masters.ProjectList = result.Read<ProjectMaster>();
                    masters.UserTypeList = result.Read<UserTypeMaster>();
                    masters.CurrencyList = result.Read<CurrencyMaster>();
                   return masters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public PBMasters GetKDSMasterData()
        {
            try
            {

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    const string storedProcedure = "Get_ProjectBrief_KdsMaster";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    PBMasters masters = new PBMasters();
                    masters.MoldList = result.Read<PBKDSMaster>();
                    masters.ProjectCategorizationList = result.Read<PBKDSMaster>();
                    masters.ComplexityToBeAssignedList = result.Read<PBKDSMaster>();
                    masters.RAndDNameList = result.Read<PBKDSMaster>();
                    masters.ProjectPriorityList = result.Read<PBKDSMaster>();
                    return masters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }


    }
}
