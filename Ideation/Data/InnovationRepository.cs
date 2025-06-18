using Ideation.Core;
using Ideation.Models;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Http;

namespace Ideation.Data
{
    public class InnovationRepository : IInnovationRepository
    {
        public int AddInnovation(Innovation innovation,string empId, string fileName)
        {
            
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var filePath = "";
                var statusId = 2;
                var p = new DynamicParameters();
                p.Add("@EmployeeId", empId);
                p.Add("@InnovationTitle",innovation.InnovationTitle);
                p.Add("@Keyword",innovation.Keyword);
                p.Add("@PlatformTypeId",innovation.PlatformTypeId);
                p.Add("@Other",innovation.Other);
                p.Add("@BusinessDevisionId",innovation.BusinessDivisionId);
                p.Add("@GeographicId",innovation.GeographicId);
                p.Add("@StratergicFitId",innovation.StrategicFitNames);
                p.Add("@Description",innovation.Description);
                p.Add("@StatusId",statusId);
                if (innovation.PostedFile == null)
                {
                    p.Add("@FilePath", filePath);
                }
                else
                {
                    p.Add("@FilePath", fileName);
                }

                //p.Add("@FilePath", innovation.PostedFile.FileName);
                p.Add("@CreatedBy", empId);
                //p.Add("@CreatedDate",);

                const string storedProcedure = "InnovationDataMaster_Insert";
                var result = con.Execute(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public Innovation GetIdeationById(int InnovationId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var p = new DynamicParameters();
                p.Add("@InnovationId", InnovationId);
                const string storedProcedure = "InnovationDataMaster_GetById";
                return con.Query<Innovation>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

        public IEnumerable<Innovation> GetInnovation(string empId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                //var empId = "1230";
                var p = new DynamicParameters();
                p.Add("@EmployeeId", empId);
                const string storedProcedure = "Innovation_List";//need to change the stored procedure Innovation_List
                var result = con.Query<Innovation>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public IEnumerable<Innovation> GetInnovationDetails(int innovationId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {

                var p = new DynamicParameters();
                p.Add("@InnovationId", innovationId);
                const string storedProcedure = "Get_InnovationData";//need to change the stored procedure
                var result = con.Query<Innovation>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<Innovation> GetPendingInnovation(string empid)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {

                var p = new DynamicParameters();
                p.Add("@EmployeeId", empid);
                const string storedProcedure = "GetPendingInnovationData";//need to change the stored procedure
                var result = con.Query<Innovation>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public int UpdateInnovationDetails(InnovationStats innovation,string fileName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                var filePath = innovation.FileNames;
                var p = new DynamicParameters();
                p.Add("@InnovationId",innovation.InnovationId);
                p.Add("@Keyword",innovation.Keyword);
                p.Add("@PlatformTypeId",innovation.PlatformTypeId);
                p.Add("@Other",innovation.Other);
                p.Add("@BusinessDivisionId", innovation.BusinessDivisionId);
                p.Add("@GeographicId", innovation.GeographicId);
                p.Add("@StrategicFitId",innovation.StrategicFitNames);
                p.Add("@Description",innovation.Description);
                if (innovation.PostedFile == null)
                {
                    p.Add("@FilePath", filePath);
                }
                else
                {
                    p.Add("@FilePath", fileName);
                }
                const string storedProcedure = "Update_Innovation";
                var result = con.Execute(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

		public IEnumerable<Innovation> GetUniqueNo()
        {
			using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
			{
				const string storedProcedure = "GetUniqueNo";
				var result = con.Query<Innovation>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
				return result;
			}
		}
        public IEnumerable<Innovation> IdeationGetList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                const string storedProcedure = "Ideation_GetList";
                var result = con.Query<Innovation>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<Innovation> GetSearchedData(string startdate, string enddate, int platformdomainid, int platformtype, int geographicscope, int status)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                const string storedProcedure = "IdeationGetList_BasedOnFilter";
                var result = con.Query<Innovation>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

    }
}
