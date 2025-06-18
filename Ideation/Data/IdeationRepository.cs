using Ideation.Core;
using Ideation.Models;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;

namespace Ideation.Data
{
    public class IdeationRepository : IIdeationRepository
    {
        public IQueryable<IdeationList> GetIdeation(string StartDate, string EndDate, string BusinessDivisionId, string PlatformTypeId, string GeographicId, string StatusId,string LoginId,string role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
               
                p.Add("@BusinessDivisionId", BusinessDivisionId);
                p.Add("@PlatformTypeId", PlatformTypeId);
                p.Add("@GeographicId", GeographicId);
                p.Add("@StatusId", StatusId);

                if (!string.IsNullOrEmpty(StartDate))
                    p.Add("@StartDate", DateTime.ParseExact(StartDate, "dd-MM-yyyy", CultureInfo.InvariantCulture));
                else
                    p.Add("@StartDate", StartDate);

                if (!string.IsNullOrEmpty(EndDate))
                    p.Add("@EndDate", DateTime.ParseExact(EndDate, "dd-MM-yyyy", CultureInfo.InvariantCulture));
                else
                    p.Add("@EndDate", EndDate);

                p.Add("@LoginId", LoginId);
                p.Add("@Role", role);
                const string storedProcedure = "InnovationDataMaster_Search";
                return con.Query<IdeationList>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).AsQueryable();
            }
        }

        public IdeationModalData GetIdeationById(int InnovationId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@InnovationId", InnovationId);
                const string storedProcedure = "InnovationDataMaster_GetById";
                return con.Query<IdeationModalData>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

        public int IdeationStatusUpdate(IdeationStatus idstat)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                if (idstat.Remarks == null)
                {
                    idstat.Remarks = "";
                }
                var p = new DynamicParameters();
                p.Add("@InnovationId", idstat.InnvoationId);
                p.Add("@ActionBy", idstat.ActionBy);
                p.Add("@Action", idstat.Action);
                p.Add("@Remarks", idstat.Remarks);
                p.Add("@RemarkId", idstat.RemarkId);
                p.Add("@InnovationTitle", idstat.InnovationTitle);
                p.Add("@CreatedBy", idstat.CreatedBy);
                p.Add("@StatusId", idstat.StatusId);
                const string storedProcedure = "InnovationStatus_Insert";
                var result = con.Execute(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public IEnumerable<IdeationModalData> GetIdeationByRemarks(int InnovationId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@InnovationId", InnovationId);
                const string storedProcedure = "Get_Remark_Status";
                return con.Query<IdeationModalData>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<IdeationModalData> GetRemarkDes(int RemarkId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@RemarkId", RemarkId);
                const string storedProcedure = "GetRemarkDiscription";
                return con.Query<IdeationModalData>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
            }
        }

        
    }
}
