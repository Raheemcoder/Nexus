using Microsoft.CodeAnalysis;
using System.Globalization;
using System.Web.Mvc;
using Microsoft.Build.Evaluation;
using Newtonsoft.Json;
using Org.BouncyCastle.Bcpg.OpenPgp;
using iText.StyledXmlParser.Jsoup.Helper;
using Ideation.Models;
using System.Data;
using Dapper;
using Ideation.Core;
using System.Data.SqlClient;

namespace Ideation.Data
{
    public class ProjectMasterRepository_OldUI : IProjectMasterRepository_OldUI
    {
        public ProjectMasters GetProjectInitiationData(string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    const string storedProcedure = "ProjectInitiation_GetData";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    ProjectMasters projectMasters = new ProjectMasters();
                    projectMasters.ItemMaster = result.Read<PMItemMaster>().ToList();
                    //projectMasters.ProjectTypeMaster = result.Read<PMProjectTypeMaster>().ToList();
                    projectMasters.PortfolioMaster = result.Read<PMPortfolioMaster>().ToList();
                    projectMasters.BucketMaster = result.Read<PMBucketMaster>().ToList();
                    projectMasters.ItemTypeMaster = result.Read<PMItemTypeMaster>().ToList();
                    projectMasters.TemplateMaster = result.Read<PMTemplateMaster>().ToList();
                    projectMasters.HubMaster = result.Read<PMHubMaster>().ToList();
                    projectMasters.ProjectMasterHeaderDataList = result.Read<ProjectMasterHeaderData>().ToList();
                    projectMasters.UserGroup = result.Read<LoginUserGroup>().ToList();

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<ProjectMasterHeaderData> GetProjectMasterHeaderData(string ProjectBreifId, string ItemName, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectBreifId", ProjectBreifId);
                    param.Add("@ItemName", ItemName);
                    param.Add("@LoginId", LoginId);
                    var result = con.Query<ProjectMasterHeaderData>("ProjectInitiation_SearchData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public List<ProjectMasterHeaderData> GetProjectBIList(string searchvalue)
        {
            try
            {
                var projectBIList = new List<ProjectMasterHeaderData>();

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@SearchValue", searchvalue);
                    var result = con.Query<string>("ProjectInitiation_GetProjectBIData", param, commandType: CommandType.StoredProcedure);
                    foreach (var name in result)
                    {
                        projectBIList.Add(new ProjectMasterHeaderData { ProjectBriefId = name });
                    }
                }
                return projectBIList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string AddProjectData(ProjectMasters projectMasters)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectCode", projectMasters.ProjectCode);
                    param.Add("@ProjectBriefId", projectMasters.ProjectBriefId);
                    param.Add("@Product", projectMasters.Product);
                    param.Add("@ProjectDescription", projectMasters.ProjectDescription);
                    param.Add("@Template", projectMasters.Template);
                    param.Add("@ItemType", projectMasters.ItemTypeName);
                    param.Add("@Bucket", projectMasters.BucketName);
                    param.Add("@Hub", projectMasters.HubList);
                    param.Add("@StartDate", dbType: DbType.Date, value: projectMasters.StartDate);
                    param.Add("@EndDate", dbType: DbType.Date, value: projectMasters.EndDate);
                    param.Add("@CreatedBy", projectMasters.CreatedBy);
                    param.Add("@Portfolio", projectMasters.Portfolio);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ProjectInitiation_Insert", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<ViewProjectData> GetViewProjectData(string ProjectCode)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectCode", ProjectCode);
                    return con.Query<ViewProjectData>("ProjectInitiation_GetByProjectCode", param: para, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        //public void PostProjectCode(string ProjectCode)
        //{
        //    try
        //    {
        //        using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
        //        {
        //            var param = new DynamicParameters();
        //            param.Add("@ProjectCode", ProjectCode);
        //            con.Query("ProjectInitiation_PostToSAP", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
        //        }

        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public IEnumerable<SAPresponse> PostProjectCode(string ProjectCode)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectCode", ProjectCode);
                    return con.Query<SAPresponse>("ProjectInitiation_PostToSAP", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<GetTemplateDataList> GetRoleHODMasterHeaderData(string TemplateName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@TemplateId", TemplateName);
                    var result = con.Query<GetTemplateDataList>("RoleHODMaster_SearchByTemplateName", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public string UpdateRoleHODName(string hodValue, string role, string templateName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@HodName", hodValue);
                    param.Add("@Role", role);
                    param.Add("@TemplateId", templateName);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("RoleHODMaster_UpdateHODName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public List<HODName> GetHODNames(string term)
        {
            try
            {
                var hodNames = new List<HODName>();



                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@term", term);
                    var result = con.Query<string>("HODName_GetData", param, commandType: CommandType.StoredProcedure);
                    foreach (var name in result)
                    {
                        hodNames.Add(new HODName { Name = name });
                    }
                }
                return hodNames;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public TemplateData GetTemplateData(string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    const string storedProcedure = "TemplateMaster_GetData";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    TemplateData templateData = new TemplateData();
                    templateData.TemplateMaster = result.Read<PITemplateMaster>();
                    //templateData.TemplateMasterList = result.Read<GetTemplateDataList>();
                    return templateData;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public TemplateData GetTemplateMasterHeaderData(string TemplateId, string Rolename, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@TemplateId", TemplateId);
                    param.Add("@RoleName", Rolename);
                    param.Add("@LoginId", LoginId);
                    var result = con.QueryMultiple("TemplateMaster_SearchByTemplateName", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    TemplateData templateData = new TemplateData();
                    if (Rolename == null)
                    {
                        templateData.TemplateMasterListOld = result.Read<GetTemplateDataList>();
                    }
                    else
                    {
                        templateData.TemplateMasterListOld = result.Read<GetTemplateDataList>();
                        templateData.AddedResourceNameOld = result.Read<GetAddedTemplateResourceName>();
                    }
                    return templateData;

                }

            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        //public string UpdateTemplateMasterResource(string resourcesValue, string keyValue)
        //{
        //    try
        //    {
        //        using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
        //        {
        //            DynamicParameters param = new DynamicParameters();
        //            param.Add("@ResourceName", resourcesValue);
        //            param.Add("@KeyValue", keyValue);
        //            param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
        //            con.Execute("TemplateMaster_UpdateResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
        //            return param.Get<string>("Result");
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }
        //}

        public string UpdateTemplateDuration(int DurationValue, string keyValue)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Duration", DurationValue);
                    param.Add("@KeyValue", keyValue);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("TemplateMaster_UpdateDuration", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public string UpdateTemplateMasterResource(string resourcesValue, string keyValue)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ResourceName", resourcesValue);
                    param.Add("@KeyValue", keyValue);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("TemplateMaster_UpdateResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }


        public string TemplateResourceNameDelete(string TemplateId, string keyValue, string ResourceName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@TemplateId", TemplateId);
                    param.Add("@KeyValue", keyValue);
                    param.Add("@ResourceName", ResourceName);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("TemplateMaster_DeleteResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public ResourceData GetResourceData(string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    const string storedProcedure = "ResourceMaster_GetData";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    ResourceData resourceData = new ResourceData();
                    resourceData.ResourceMaster = result.Read<PIResourceMaster>();
                    resourceData.ResourceMasterList = result.Read<GetResourceDataList>();

                    return resourceData;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        //public IEnumerable<GetResourceDataList> GetResourceMasterHeaderData(string ProjectId)
        //{
        //    try
        //    {
        //        using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
        //        {
        //            var param = new DynamicParameters();
        //            param.Add("@ProjectId", ProjectId);
        //            var result = con.Query<GetResourceDataList>("TemplateMaster_SearchByProjectId", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
        //            return result;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }
        //}
        public ResourceData GetResourceMasterHeaderData(string ProjectId, string Role, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Role", Role);
                    param.Add("@LoginId", LoginId);
                    const string storedProcedure = "TemplateMaster_SearchByProjectId";
                    var result = con.QueryMultiple(storedProcedure, param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    ResourceData resourceData = new ResourceData();
                    //var result = con.Query<GetResourceDataList>("TemplateMaster_SearchByProjectId", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    if (Role == null)
                    {
                        resourceData.TemplateNameData = result.Read<ResourceTemplateName>();
                        resourceData.ResourceMasterList = result.Read<GetResourceDataList>();
                    }
                    else
                    {
                        resourceData.ResourceMasterList = result.Read<GetResourceDataList>();
                        resourceData.AddedResourceName = result.Read<GetAddedProjectResourceName>();
                    }
                    return resourceData;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public string AllocatePlannedBudget(float plannedBudget, string keyValuePB, int duration, string projectid)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@PlannedBudget", plannedBudget);
                param.Add("@KeyValue", keyValuePB);
                param.Add("@AssignedDuration", duration);
                param.Add("@ProjectId", projectid);
                param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Execute("ResourceMaster_ResourcePlannedBudgetAllocation", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return param.Get<string>("Result");

            }
        }
        public List<ResourceName> GetResourceNames(string term)
        {
            try
            {
                var resourceNames = new List<ResourceName>();

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@term", term);
                    var result = con.Query<string>("Resources_GetData", param, commandType: CommandType.StoredProcedure);
                    foreach (var name in result)
                    {
                        resourceNames.Add(new ResourceName { Name = name });
                    }
                }
                return resourceNames;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string SaveResourceDays(string keyValue, string resourceName, int days, string projectId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@KeyValue", keyValue);
                param.Add("@ResourceName", resourceName);
                param.Add("@Days", days);
                param.Add("@ProjectId", projectId);

                param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Execute("ResourceMaster_ResourceDaysAllocation", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return param.Get<string>("Result");

            }

        }
        public IEnumerable<ResourceDays> GetAllocatedData(string KeyValue, string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@KeyValue", KeyValue);
                    param.Add("@ProjectId", ProjectId);
                    var result = con.Query<ResourceDays>("ResourceMaster_GetAllocatedData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        //public List<ResourceName> GetResourceNames()
        //{
        //    try
        //    {
        //        var resourceNames = new List<ResourceName>();

        //        using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
        //        {
        //            var result = con.Query<string>("Resources_GetNames", commandType: CommandType.StoredProcedure);
        //            foreach (var name in result)
        //            {
        //                resourceNames.Add(new ResourceName { Name = name });
        //            }
        //        }
        //        return resourceNames;
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        public string UpdateProjectResourceName(string resourcesValue, string keyValue, string projectId, int duration)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ResourceName", resourcesValue);
                    param.Add("@KeyValue", keyValue);
                    param.Add("@ProjectId", projectId);
                    param.Add("@Duration", duration);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ProjectResourceMaster_UpdateResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public string ResourceMasterResourceNameDelete(string ProjectId, int Days, string keyValue, string ResourceName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Days", Days);
                    param.Add("@KeyValue", keyValue);
                    param.Add("@ResourceName", ResourceName);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ResourceMaster_DeleteResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public List<ExcelResourceMasterData> GetExcelResourceMasterData(string projectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", projectId);
                    param.Add("@LoginId", LoginId);
                    // Use Query method to fetch data and map it to ExcelResourceMasterData
                    List<ExcelResourceMasterData> result = con.Query<ExcelResourceMasterData>("ProjectResourceMaster_GetExcelData", param, commandType: CommandType.StoredProcedure).ToList();

                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<ExcelTemplateMasterData> GetExcelTemplateMasterData(string templateName, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@TemplateId", templateName);
                    param.Add("@LoginId", LoginId);

                    // Use Query method to fetch data and map it to ExcelResourceMasterData
                    List<ExcelTemplateMasterData> result = con.Query<ExcelTemplateMasterData>("TemplateMaster_GetExcelData", param, commandType: CommandType.StoredProcedure).ToList();

                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public RoleCostCenterMaster GetRoleCostCenterMasterData(string Rolename)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@Role", Rolename);
                    var result = con.QueryMultiple("RoleCostCenterMaster_GetData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    RoleCostCenterMaster roleCostCenterMaster = new RoleCostCenterMaster();
                    if (Rolename == null)
                    {
                        roleCostCenterMaster.RoleCostCenterList = result.Read<GetRoleCostCenterList>();
                    }
                    else
                    {
                        roleCostCenterMaster.RoleCostCenterList = result.Read<GetRoleCostCenterList>();
                        roleCostCenterMaster.AddedCostCenterName = result.Read<GetAddedCostCenterName>();
                    }
                    return roleCostCenterMaster;

                }

            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public string RoleCostCenterNameDelete(string Role, string CostCenterName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Role", Role);
                    param.Add("@CostCenterName", CostCenterName);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("RoleCostCenterMaster_DeleteCostCenterName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public string UpdateRoleCostCenterName(string Role, string CostCenterName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Role", Role);
                    param.Add("@CostCenterName", CostCenterName);
                    param.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("RoleCostCenterMaster_UpdateCostCenterName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return param.Get<string>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public List<CostCenterName> GetCostCenterNames(string term)
        {

            try
            {
                var costCenterName = new List<CostCenterName>();



                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@term", term);
                    var result = con.Query<string>("RoleCostCenterName_GetData", param, commandType: CommandType.StoredProcedure);
                    foreach (var name in result)
                    {
                        costCenterName.Add(new CostCenterName { Name = name });
                    }
                }
                return costCenterName;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ExcelRoleCostCenterMasterData> GetExcelRoleCostCenterMasterData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();

                    // Use Query method to fetch data and map it to ExcelResourceMasterData
                    List<ExcelRoleCostCenterMasterData> result = con.Query<ExcelRoleCostCenterMasterData>("RoleCostCenterMaster_GetExcelData", param, commandType: CommandType.StoredProcedure).ToList();

                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ResourceName> GetResources()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    var result = con.Query<ResourceName>("Resources_GetNames", param, commandType: CommandType.StoredProcedure).ToList();

                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<CostCenterName> GetCostCenterValues()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    var result = con.Query<CostCenterName>("RoleCostCenter_GetCostCenterNames", param, commandType: CommandType.StoredProcedure).ToList();

                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<GetTemplateDataList> GetDepartmentsList()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    var result = con.Query<GetTemplateDataList>("GetDepartmentNames", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<HODName> GetUsers()
        {
            try
            {
                var hodNames = new List<HODName>();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<string>("GetResourcesAndHOD", commandType: CommandType.StoredProcedure);
                    foreach (var name in result)
                    {
                        hodNames.Add(new HODName { Name = name });
                    }
                }
                return hodNames;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<HODName> GetDepartmentResources()
        {
            try
            {
                var hodNames = new List<HODName>();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<string>("GetDepartmentResources", commandType: CommandType.StoredProcedure);
                    foreach (var name in result)
                    {
                        hodNames.Add(new HODName { Name = name });
                    }
                }
                return hodNames;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters InsertDepartmentTeamMasterData(string UsersData, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UsersData", UsersData);
                    param.Add("@UserId", UserId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertDepartmentTeamData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    projectMasters.OutMessage = param.Get<string>("@OutMessage");
                    projectMasters.StyleClass = param.Get<string>("@StyleClass");

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public ProjectMasters InsertRolePlaaningMasterData(string budgetplaning, string Templete)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@budgetplaning", budgetplaning);
                    param.Add("@Templete", Templete);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertBudgetPlanningData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    projectMasters.OutMessage = param.Get<string>("@OutMessage");
                    projectMasters.StyleClass = param.Get<string>("@StyleClass");

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public TemplateData GetActiveDepartments(string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    TemplateData temp = new TemplateData();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);

                    using (var reader = con.QueryMultiple("GetActiveDepartments", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure))
                    {
                        temp.TemplateMasterListOld = reader.Read<GetTemplateDataList>().ToList();
                        temp.GetDepartmentUsersList = reader.Read<GetDepartmentUsersList>().ToList();
                    }
                    return temp;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<IEnumerable<GetTemplateDataList>, int> GetDepartmentUsers(string Role, string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Role", Role);
                    param.Add("@ProjectId", ProjectId);
                    var result = con.QueryMultiple("GetDepartmentUsers", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    TemplateData pm = new TemplateData();
                    pm.TemplateMasterListOld = result.Read<GetTemplateDataList>();
                    int count = result.Read<int>().FirstOrDefault();
                    return new Tuple<IEnumerable<GetTemplateDataList>, int>(pm.TemplateMasterListOld, count);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ProjectMasters InsertProjectResourcesDetails(string ProjectUserData, string ProjectId, string UserId, int Type)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectUserData", ProjectUserData);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    param.Add("@Type", Type);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertProjectResourcesDetails", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    projectMasters.OutMessage = param.Get<string>("@OutMessage");
                    projectMasters.StyleClass = param.Get<string>("@StyleClass");

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<BudgetPlan> GetBudgetPlanningList(string UserId, string Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", UserId);
                    param.Add("@Status", Status);
                    var result = con.Query<BudgetPlan>("GetBudgetPlanningList", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters GetProjectBudgetPlanningData(string ProjectId, string UserId, string FromDate, string ToDate)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    param.Add("@FromDate", FromDate);
                    param.Add("@ToDate", ToDate);
                    var reader = con.QueryMultiple("GetProjectBudgetPlanningData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.BudgetProjectData = reader.Read<BudgetProjectData>().ToList();
                    projectMasters.BudgetPlan = reader.Read<BudgetPlan>().ToList();
                    projectMasters.ProjectDates = reader.Read<GetProjectDates>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters InsertBaselineBudgetData(string ProjectId, string RequestedData, string UserId, string Remarks, string isSave)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectUserData", RequestedData);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    param.Add("@Remarks", Remarks);
                    param.Add("@isSave", isSave);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertBaselineBudgetData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    projectMasters.OutMessage = param.Get<string>("@OutMessage");
                    projectMasters.StyleClass = param.Get<string>("@StyleClass");

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<BudgetHistory> GetBudgetHistory(string ProjectId, string UserId)
        {
            try
            {
                BudgetHistory budget = new BudgetHistory();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    var result = con.Query<BudgetHistory>("GetBudgetHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<BudgetPlan> GetBudgetPendingList(string UserId, string Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", UserId);
                    param.Add("@Status", Status);
                    var result = con.Query<BudgetPlan>("GetBudgetPendingList", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters GetBudgetPendingDataForProject(string ProjectId, string BudgetType, string Department, string Category)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@BudgetType", BudgetType);
                    param.Add("@Department", Department);
                    param.Add("@Category", Category);
                    var reader = con.QueryMultiple("GetBudgetPendingDataForProject", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.BudgetProjectData = reader.Read<BudgetProjectData>().ToList();
                    projectMasters.BudgetPlan = reader.Read<BudgetPlan>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters SaveBaselingApprovalData(string selecteddata, string Remarks, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@selecteddata", selecteddata);
                    param.Add("@Remarks", Remarks);
                    param.Add("@UserId", UserId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("SaveBaselingApprovalData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    projectMasters.OutMessage = param.Get<string>("@OutMessage");
                    projectMasters.StyleClass = param.Get<string>("@StyleClass");

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public List<GetExcelData_TeamRoleMaster> GetExcelData_TeamRoleMaster()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    List<GetExcelData_TeamRoleMaster> result = con.Query<GetExcelData_TeamRoleMaster>("GetExcelData_TeamRoleMaster", param, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<GetExcelData_BudgetPlanning> GetExcelData_BudgetPlanning(string Template)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@template", Template);
                    List<GetExcelData_BudgetPlanning> result = con.Query<GetExcelData_BudgetPlanning>("GetExcelData_BudgetPlanning", param, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<GetExcelData_TeamRoleMaster> GetExcelData_DepartmentBudgetUsers(string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    List<GetExcelData_TeamRoleMaster> result = con.Query<GetExcelData_TeamRoleMaster>("GetExcelData_DepartmentBudgetUsers", param, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters GetApprovedDataForAdditionalPage(string ProjectId, String LoginId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", LoginId);
                    var reader = con.QueryMultiple("GetApprovedDataForAdditionalPage", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.CategoryMaster = reader.Read<CategoryMaster>().ToList();
                    projectMasters.BudgetPlan = reader.Read<BudgetPlan>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters SaveAdditinalRequestData(string ProjectId, string RequestedData, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@RequestedData", RequestedData);
                    param.Add("@UserId", UserId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("SaveAdditionalRequestData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    projectMasters.OutMessage = param.Get<string>("@OutMessage");
                    projectMasters.StyleClass = param.Get<string>("@StyleClass");

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<BudgetPlan> GetL2ApprovalList(string UserId, string Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", UserId);
                    param.Add("@Status", Status);
                    var result = con.Query<BudgetPlan>("GetL2ApprovalList", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ProjectMasters GetL2ApprovalPendingDataForProject(string ProjectId, string Department, string Category, string year)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Department", Department);
                    param.Add("@Category", Category);
                    param.Add("@year", year);
                    var reader = con.QueryMultiple("GetL2ApprovalPendingDataForProject", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.BudgetProjectData = reader.Read<BudgetProjectData>().ToList();
                    projectMasters.BudgetPlan = reader.Read<BudgetPlan>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> SaveL2ApprovalData(string selecteddata, string Remarks, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@selecteddata", selecteddata);
                    param.Add("@UserId", UserId);
                    param.Add("@Remarks", Remarks);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("SaveL2Approvaldata", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return System.Tuple.Create(param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ProjectMasters GetL2ApprovalProjectInfo(string ProjectId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    var reader = con.QueryMultiple("GetL2ApprovalProjectInfo", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.BudgetProjectData = reader.Read<BudgetProjectData>().ToList();
                    projectMasters.CategoryValue = reader.Read<CategoryValue>().ToList();
                    projectMasters.BudgetPlan = reader.Read<BudgetPlan>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string, string, string, string> Budget_SAP_Update(string ProjectId, string Amount, string year)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Amount", Amount);
                    param.Add("@year", year);
                    param.Add("@jsonPayload", dbType: DbType.String, direction: ParameterDirection.Output, size: 2000);
                    param.Add("@Url", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                    param.Add("@Username", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                    param.Add("@Password", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                    param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                    con.Execute("Budget_SAP_Update", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return System.Tuple.Create(param.Get<string>("@jsonPayload"), param.Get<string>("@Url"), param.Get<string>("@Username"), param.Get<string>("@Password"), param.Get<string>("@Msg"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Tuple<string, string> BudgetSAPResponse(string jsonPayload, string responseData, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@jsonPayload", jsonPayload);
                    param.Add("@UserId", UserId);
                    param.Add("@responseData", responseData);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("BudgetSAPResponse", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return System.Tuple.Create(param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters GetCategoryforAdditionalRequest(string ProjectId, string Department, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Department", Department);
                    param.Add("@UserId", UserId);
                    var reader = con.QueryMultiple("GetCategoryforAdditionalRequest", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.CategoryMaster = reader.Read<CategoryMaster>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<ProjectMasters> GetBudgetTransferList(string UserId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", UserId);
                    var result = con.Query<ProjectMasters>("GetBudgetTransferList", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<ProjectMasters> GetProjectDataToTransfer(string ProjectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    var result = con.Query<ProjectMasters>("GetProjectDataToTransfer", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<Year> GetTrasferFromYear(string ProjectId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    var result = con.Query<Year>("GetTrasferFromYear", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ProjectMasters GetProjectDataBasedOnYear(string ProjectId, string FromYear, string ToYear, string Department, string LoginId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@FromYear", FromYear);
                    param.Add("@ToYear", ToYear);
                    param.Add("@DepartmentName", Department);
                    param.Add("@LoginId", LoginId);
                    var reader = con.QueryMultiple("GetProjectDataBasedOnYear", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.FromTransferData = reader.Read<BudgetTransfer>().ToList();
                    projectMasters.ToTransferData = reader.Read<BudgetTransfer>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> SaveBudgetTrasferInformation(string LoginId, ProjectMasters projectmaster)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@LoginId", LoginId);
                param.Add("@DatatoSave", projectmaster.ProjectDataToSave);
                param.Add("@ProjectId", projectmaster.ProjectId);
                param.Add("@Remarks", projectmaster.Remarks);
                param.Add("@IsSave", projectmaster.IsSave);
                param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                connection.Query("SaveBudgetTrasferData", param, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
            }
        }

        public IEnumerable<ProjectMasters> GetProjectTransferHistory(string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    var result = con.Query<ProjectMasters>("GetProjectTransferHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ProjectMasters GetTransferToYearAndDepartment(string ProjectId, string FromYear)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@FromYear", FromYear);
                    var reader = con.QueryMultiple("GetTransferToYearAndDepartment", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.ToYearValue = reader.Read<Year>().ToList();
                    projectMasters.DepartmentValue = reader.Read<DepartmentMaster>().ToList();

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<ProjectMasters> GetYearWiseBudgetAndExpense(string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    var result = con.Query<ProjectMasters>("GetYearWiseBudgetAndExpense", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<APIConfig> APICredentials_Get(string APIName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@APIName", APIName);
                    var result = con.Query<APIConfig>("APICredentials_Get", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> SaveSyncedData(string jsonPayload, string responseContent, string type, string LoginId)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@LoginId", LoginId);
                param.Add("@jsonPayload", jsonPayload);
                param.Add("@responseContent", responseContent);
                param.Add("@type", type);
                param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                connection.Query("SaveSyncedData", param, commandType: CommandType.StoredProcedure, commandTimeout: 1200);
                return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
            }
        }

        public IEnumerable<GetBudgetExpenseForYear> GetBudgetAndExpenseForYear(string Project, string year, string type)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", Project);
                    param.Add("@year", year);
                    param.Add("@Type", type);
                    var result = con.Query<GetBudgetExpenseForYear>("GetBudgetExpenseForYear", param, commandTimeout: 600, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<ProjectSAPDifference> GetSAPdifferenceProjectDetails()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    var result = con.Query<ProjectSAPDifference>("GetSAPdifferenceProjectDetails", param, commandTimeout: 600, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<APIConfig> Get_BudgetDataForAPI(string DataToSave)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@selecteddata", DataToSave);
                    var result = con.Query<APIConfig>("Get_BudgetDataForAPI", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<APIConfig> Get_TransferDataForAPI(string DataToSave,string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@DatatoSave", DataToSave);
                    param.Add("@ProjectId", ProjectId);
                    var result = con.Query<APIConfig>("Get_TransferDataForAPI", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string SaveTrasferAPIResponse(string JsonData, string Response, string ProjectId, String LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@JsonData", JsonData);
                    param.Add("@Response", Response);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    var result = con.Query("SaveTrasferAPIResponse", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToString();
                    return param.Get<string>("@Msg");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}