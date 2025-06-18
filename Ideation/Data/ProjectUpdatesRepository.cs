using Dapper;
using DocumentFormat.OpenXml.InkML;
using Ideation.Core;
using Ideation.Models;
using System.Collections.Immutable;
using System.Data;
using System.Data.SqlClient;

namespace Ideation.Data
{
    public class ProjectUpdatesRepository : IProjectUpdatesRepository
    {
        public static void LogError(string controller, string action, Exception ex)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });
        }

        public ProjectUpdates GetPUMastersData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    var p = new DynamicParameters();
                    const string storedProcedure = "GetPUMasterData";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    ProjectUpdates projectUpdates = new ProjectUpdates();
                    projectUpdates.Divisionmaster = result.Read<PUDivisionMaster>();
                    projectUpdates.Statusmaster = result.Read<PUStatusMaster>();
                    projectUpdates.RandDmaster = result.Read<RandDMaster>();
                    projectUpdates.ProjectTypemaster = result.Read<ProjectTypeMaster>();
                    projectUpdates.ProjectClassificationmaster = result.Read<ProjectClassificationMaster>();
                    projectUpdates.CurrencyList = result.Read<PUCurrencyMaster>();
                    projectUpdates.ProjectLeadmasterList = result.Read<ProjectLeadMaster>();

                    return projectUpdates;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<ProjectUpdatesDetailsHeader> GetProjectUpdatesDetailsHeaderData(string userName="")
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", "");
                    p.Add("@RandDName", "");
                    p.Add("@Status", "2");
                    p.Add("@ProjectType", "");
                    p.Add("@ProjectClassification", "");
                    p.Add("@Updates", "All");
                    p.Add("@ProjectLead", "");
                    p.Add("@UserId", userName);
                    
                    var result = con.Query<ProjectUpdatesDetailsHeader>("GetPUHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<ProjectUpdatesDetailsHeader> GetProjectUpdatesDetailsHeaderData(string PUDivision, string PURandD, string Status, string ProjectType, string ProjectClassification,string Updates,string ProjectLead, string UserName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", PUDivision);
                    p.Add("@RandDName", PURandD);
                    p.Add("@Status", Status);
                    p.Add("@ProjectType", ProjectType);
                    p.Add("@ProjectClassification", ProjectClassification);
                    p.Add("@Updates", Updates);
                    p.Add("@ProjectLead", ProjectLead);
                    p.Add("@UserId", UserName);

                    var result = con.Query<ProjectUpdatesDetailsHeader>("GetPUHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public ProjectUpdates GetPUData(string projectCode, string userName)
        {
            try
            {
                ProjectUpdates projectUpdates = new ProjectUpdates();

                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    using (var reader = con.QueryMultiple("GetPUData", new { ProjectCode = projectCode, UserName = userName }, commandType: CommandType.StoredProcedure))
                    {
                        projectUpdates.ProjectMasterDataList = reader.Read<ProjectUpdatesDetailsHeader>().ToList();
                        projectUpdates.ProjectDetailsHeaderDataList = reader.Read<ProjectUpdatesDetailsHeader>().ToList();
                    }

                    return projectUpdates;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public void UploadPUData(ProjectUpdates projectUpdates, string userName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectCode", projectUpdates.ProjectCode);
                    param.Add("@UserName", userName);
                    param.Add("@Comment", projectUpdates.Comments);
                    param.Add("@Sku", projectUpdates.Sku);
                    param.Add("@Volume", projectUpdates.Volume);
                    param.Add("@UploadDocument", projectUpdates.UploadDocument);
                    param.Add("@TargetTTD", projectUpdates.TargetTtd);
                    param.Add("@TargetProductionDate", projectUpdates.TargetProductionDate);
                    param.Add("@TargetCost", projectUpdates.TargetCost);
                    param.Add("@Currency", projectUpdates.Currency);
                    param.Add("@ProjectLead", projectUpdates.ProjectLeadID);
                    param.Add("@M1Quantity", projectUpdates.M1Quantity);
                    param.Add("@M2Quantity", projectUpdates.M2Quantity);
                    param.Add("@M3Quantity", projectUpdates.M3Quantity);
                    param.Add("@Y1Quantity", projectUpdates.Y1Quantity);
                    param.Add("@Y2Quantity", projectUpdates.Y2Quantity);
                    param.Add("@Y3Quantity", projectUpdates.Y3Quantity);
                    param.Add("@ProjectDocId", projectUpdates.ProjectDocId);
                    param.Add("@ProjectUpdatesHeaderId", projectUpdates.ProjectUpdatesHeaderId);

                    con.Execute("[dbo].[UploadPUData]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public IEnumerable<ProjectUpdates> GetUploadedDocumentDetail(string projectCode, string createdBy, string createdDate)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("ProjectCode", projectCode);
                    param.Add("CreatedBy", createdBy);
                    param.Add("CreatedDate", createdDate);

                    var result = con.Query<ProjectUpdates>("GetPUUploadedDocumentDetail", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public Tuple<string,IEnumerable<ProjectUpdatesDetailsHeader>,ProjectUpdates,ProjectUpdates> GetPU_CommentsHistory(string projectCode, string FromDate, string ToDate,string Filter)
        {
            ProjectUpdates projectUpdates = new ProjectUpdates();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("ProjectCode", projectCode);
                    param.Add("FromDate", FromDate);
                    param.Add("ToDate", ToDate);
                    param.Add("Filter", Filter);
                    param.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    
                    if (Filter == "History") {
                        using (var reader = con.QueryMultiple("PB_PU_GetPU_History", param, commandType: CommandType.StoredProcedure))
                        {
                            projectUpdates.ProjectMasterDataList = reader.Read<ProjectUpdatesDetailsHeader>().ToList();
                            projectUpdates.ProjectDetailsHeaderDataList = reader.Read<ProjectUpdatesDetailsHeader>().ToList();
                            projectUpdates.ViewInfoHistory = reader.Read<dynamic>().ToList();
                            projectUpdates.VolumeInfoHistory = reader.Read<dynamic>().ToList();
                        }

                        return Tuple.Create(param.Get<string>("@Message"), Enumerable.Empty<ProjectUpdatesDetailsHeader>(),projectUpdates,projectUpdates);
                    }
                    else{
                        using (var reader = con.QueryMultiple("PB_PU_GetPU_History", param, commandType: CommandType.StoredProcedure))
                        {
                            var result = reader.Read<ProjectUpdatesDetailsHeader>();
                            return Tuple.Create(param.Get<string>("@Message"), result, new ProjectUpdates(), new ProjectUpdates());
                        }
                    }
                }
            }
            catch (Exception e)
            {
                IEnumerable<ProjectUpdatesDetailsHeader> obj = Enumerable.Empty<ProjectUpdatesDetailsHeader>();
                LogError("ProjectUpdates", "ProjectUpdates_History", e);
                return Tuple.Create(e.ToString(), Enumerable.Empty<ProjectUpdatesDetailsHeader>(), new ProjectUpdates(), new ProjectUpdates());
            }
        }
        public IEnumerable<ProjectUpdates> GetCommentHistory(string projectCode, string createdBy,string projectUpdatesHeaderId, string createdDate)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().EPPMConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("ProjectCode", projectCode);
                    param.Add("CreatedBy", createdBy);
                    param.Add("CreatedDate", createdDate);
                    param.Add("projectUpdatesHeaderId", projectUpdatesHeaderId);

                    var result = con.Query<ProjectUpdates>("GetCommentHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
