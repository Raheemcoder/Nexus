using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.CodeAnalysis;
using System.Globalization;
using System.Web.Mvc;
using Microsoft.Build.Evaluation;
using Newtonsoft.Json;
using Org.BouncyCastle.Bcpg.OpenPgp;
using iText.StyledXmlParser.Jsoup.Helper;
using System.Web.WebPages;
using DocumentFormat.OpenXml.EMMA;
using Humanizer.Localisation;
using Microsoft.AspNetCore.SignalR.Protocol;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace Ideation.Data
{
    public class ProjectMasterRepository : IProjectMasterRepository
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
                    projectMasters.PortfolioMaster = result.Read<PMPortfolioMaster>().ToList();
                    projectMasters.BucketMaster = result.Read<PMBucketMaster>().ToList();
                    projectMasters.ItemTypeMaster = result.Read<PMItemTypeMaster>().ToList();
                    projectMasters.TemplateMaster = result.Read<PMTemplateMaster>().ToList();
                    projectMasters.HubMaster = result.Read<PMHubMaster>().ToList();
                    projectMasters.ProjectMasterHeaderDataList = result.Read<ProjectMasterHeaderData>().ToList();
                    projectMasters.UserGroup = result.Read<LoginUserGroup>().ToList();
                    projectMasters.D3UserGroup = result.Read<D3UserGroup>().ToList();
                    projectMasters.TemplateMasterForList = result.Read<TemplateMaster>().ToList();
                    projectMasters.CurrencyList = result.Read<BICurrencyMaster>().ToList();
                    projectMasters.DivisionValue = result.Read<DivisionListForMaterial>().ToList();
                    projectMasters.ProjectPlanning = result.Read<DropdownData>().ToList();
                    projectMasters.HGHData = result.Read<DropdownData>().ToList();

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<ProjectMasterHeaderData> GetProjectMasterHeaderData(string ProjectBreifId, string ItemName, string LoginId, string projectId, string startDate, string endDate, string template)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectBreifId", ProjectBreifId);
                    param.Add("@ItemName", ItemName);
                    param.Add("@LoginId", LoginId);
                    param.Add("@ProjectId", projectId);
                    if (!string.IsNullOrEmpty(startDate))
                    {
                        param.Add("@StartDate", DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    }
                    else
                    {
                        param.Add("@StartDate", startDate);
                    }
                    if (!string.IsNullOrEmpty(endDate))
                    {
                        param.Add("@EndDate", DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    }
                    else
                    {
                        param.Add("@EndDate", endDate);
                    }
                    param.Add("@Template", template);
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
                    param.Add("@Template", projectMasters.Template);
                    param.Add("@ItemType", projectMasters.ItemTypeName);
                    param.Add("@Bucket", projectMasters.BucketName);
                    param.Add("@Hub", projectMasters.HubList);
                    param.Add("@StartDate", dbType: DbType.Date, value: projectMasters.StartDate);
                    param.Add("@EndDate", dbType: DbType.Date, value: projectMasters.EndDate);
                    param.Add("@Portfolio", projectMasters.Portfolio);
                    param.Add("@CreatedBy", projectMasters.CreatedBy);
                    param.Add("@DivisionId", projectMasters.DivisionId);
                    param.Add("@IsProjectPlanning", projectMasters.IsProjectPalanning);
                    //param.Add("@IsHGHRequired", projectMasters.IsHGHRequired);
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
        public IEnumerable<dynamic> CheckIsDuplicateProductExists(string ProjectCode, string Product)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectCode", ProjectCode);
                    para.Add("Product", Product);
                    return con.Query<dynamic>("ProjectInitiation_CheckIsDuplicateProductExists", param: para, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public ViewProjectData GetViewProjectData(string ProjectCode)
        {
            try
            {
                ViewProjectData viewProjectData = new ViewProjectData();

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectCode", ProjectCode);
                    var result = con.QueryMultiple("ProjectInitiation_GetByProjectCode", param: para, commandType: CommandType.StoredProcedure);
                    viewProjectData = result.Read<ViewProjectData>().FirstOrDefault();
                    viewProjectData.BusinessData = result.Read<ProjectBusinessValueCollection>().ToList();
                    return viewProjectData;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public Tuple<string, string> InsertUpdateProjectBusinessInfo(string ProjectId, string Product, string BusinessInfoJsonData, string loginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Product", Product);
                    param.Add("@BusinessInfoJsonData", BusinessInfoJsonData);
                    param.Add("@LoginId", loginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ProjectInitiation_InsertAdhocPrjBusInfo", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public Tuple<string, string> MapBriefToAdhocProject(string Product, string ProjectBriefId, string ProjectCode, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Product", Product);
                    param.Add("@ProjectBriefId", ProjectBriefId);
                    param.Add("@ProjectCode", ProjectCode);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@MessageClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                    con.Execute("[ProjectInitiation_MapBriefToAdhocProject]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("Message"), param.Get<string>("MessageClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<SAPresponse> PostProjectCode(string ProjectCode, string PageType)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectCode", ProjectCode);
                    param.Add("@PageType", PageType);
                    return con.Query<SAPresponse>("ProjectInitiation_PostToSAP", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<GetTemplateDataList_NUI> GetRoleHODMasterHeaderData(string TemplateName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@TemplateId", TemplateName);
                    var result = con.Query<GetTemplateDataList_NUI>("RoleHODMaster_SearchByTemplateName", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
        public IEnumerable<HODName> GetHODNames()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<HODName>("HODName_GetData", commandType: CommandType.StoredProcedure);
                    return result;
                }

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
                    //templateData.TemplateMasterList = result.Read<GetTemplateDataList_NUI>();
                    return templateData;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public TemplateData GetTemplateMasterHeaderData(string TemplateId, string Role, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@TemplateId", TemplateId);
                    param.Add("@Role", Role);
                    param.Add("@LoginId", LoginId);
                    var result = con.QueryMultiple("TemplateMaster_SearchByTemplateName", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    TemplateData templateData = new TemplateData();
                    if (Role == null)
                    {
                        templateData.TemplateMasterList = result.Read<GetTemplateDataList_NUI>();
                        templateData.AddedResourceName = result.Read<GetAddedTemplateResourceName_NUI>();

                    }
                    else
                    {
                        templateData.TemplateMasterList = result.Read<GetTemplateDataList_NUI>();
                        templateData.AddedResourceName = result.Read<GetAddedTemplateResourceName_NUI>();
                    }
                    return templateData;

                }

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
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
        public Tuple<string, string> UpdateTemplateMasterResource(string resourceDetails, string loginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ResourceDetails", resourceDetails);
                    param.Add("@LoginId", loginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("TemplateMaster_UpdateResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public Tuple<string, string> TemplateResourceNameDelete(string TemplateId, string Role, string ResourceName, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@TemplateId", TemplateId);
                    param.Add("@Role", Role);
                    param.Add("@ResourceName", ResourceName);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("TemplateMaster_DeleteResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        #region Project resource master
        public IEnumerable<ProjectsCollection> GetProjectList(string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    p.Add("@Role", Role);
                    return con.Query<ProjectsCollection>("ResourceMaster_GetData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<ResourcesCollection> GetResourcesList()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    return con.Query<ResourcesCollection>("Resources_GetData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public ProjectResourceData GetProjectResoruceData(string ProjectId, string Role, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Role", Role);
                    param.Add("@LoginId", LoginId);
                    var result = con.QueryMultiple("ResourceMaster_SearchByProjectId", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    ProjectResourceData prd = new ProjectResourceData();
                    prd.ProjectHeaderData = result.Read<ProjectHeaderDataCollection>();
                    prd.ProjectRoleDataList = result.Read<ProjectRoleDataListCollection>();
                    prd.ProjectRoleResourceDataList = result.Read<ProjectRoleResourceDataListCollection>();

                    return prd;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public (string Message, string MessageClass) DeleteProjectResourcesRoleResource(string ProjectId, string Resource, int RoleId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Resource", Resource);
                    param.Add("@RoleId", RoleId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("ResourceMaster_DeleteResourceName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    return (param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public IEnumerable<ExcelResourceMasterData_NUI> GetResourceMasterExcelData(string ProjectId, string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    return con.Query<ExcelResourceMasterData_NUI>("ResourceMaster_GetExcelData", param, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public (string Message, string MessageClass) InsertUpdateProjectResourceMasterDetails(string RoleJsonData, string RoleResoruceJsonData, string ProjectId, string TemplateId, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@RoleJsonData", RoleJsonData);
                    param.Add("@RoleResoruceJsonData", RoleResoruceJsonData);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@TemplateId", TemplateId);
                    param.Add("@UserId", UserId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("ResourceMaster_InsertUpdate", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    return (param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        #endregion
        public List<ExcelTemplateMasterData> GetExcelTemplateMasterData(string templateId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@TemplateId", templateId);
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

        public RoleCostCenterMaster GetRoleCostCenterMasterData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.QueryMultiple("RoleCostCenterMaster_GetData", commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    RoleCostCenterMaster roleCostCenterMaster = new RoleCostCenterMaster();
                    roleCostCenterMaster.CostCenterList = result.Read<GetCostCentre>();
                    roleCostCenterMaster.RoleCostCenterList = result.Read<GetRoleCostCenterList>();
                    roleCostCenterMaster.AddedCostCenterName = result.Read<GetAddedCostCenterName>();
                    return roleCostCenterMaster;

                }

            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public (string Message, string MessageClass) RoleCostCenterNameDelete(string Role, string CostCenterName, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Role", Role);
                    param.Add("@CostCenterName", CostCenterName);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("RoleCostCenterMaster_DeleteCostCenterName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return (param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));

                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public Tuple<string, string> UpdateRoleCostCenterName(string JsonCostCenterData, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@JsonCostCenterData", JsonCostCenterData);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("RoleCostCenterMaster_UpdateCostCenterName", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
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

        public IEnumerable<GetTemplateDataList_NUI> GetDepartmentsList()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    var result = con.Query<GetTemplateDataList_NUI>("GetDepartmentNames", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<GetResources> GetUsers()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<GetResources>("GetResourcesAndHOD", commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<GetResources> GetDepartmentResources()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<GetResources>("GetDepartmentResources", commandType: CommandType.StoredProcedure);
                    return result;
                }
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
        public ProjectMasters InsertRolePlaaningMasterData(string budgetplaning, string Templete, string loginId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@budgetplaning", budgetplaning);
                    param.Add("@Templete", Templete);
                    //param.Add("@LoginId", loginId);
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

        #region DBU Mapppings Page
        public (IEnumerable<DepartmentBudgetResource> ActiveDepartments, string Product, int Count, IEnumerable<DepartmentBudgetResource>
            ActiveResourcePreview) GetActiveDepartments(string ProjectId, string Departments)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@DepartmentId", Departments);
                    var result = con.QueryMultiple("[dbo].[DBUMapping_GetActiveDepartments]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    var activeDepartments = result.Read<DepartmentBudgetResource>().ToList();
                    var Product = result.Read<string>().FirstOrDefault();
                    int Count = result.Read<int>().FirstOrDefault();
                    var activeResourcePreview = result.Read<DepartmentBudgetResource>().ToList();

                    return (activeDepartments, Product, Count, activeResourcePreview);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public (IEnumerable<DepartmentBudgetResource> DefaultResources,
            IEnumerable<DepartmentBudgetResource> DepartmentResources) GetDepartmentUsers(string ProjectId, string Departments)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@DepartmentId", Departments);
                    var result = con.QueryMultiple("[dbo].[DBUMapping_GetDepartmentUsers]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    var defaultResources = result.Read<DepartmentBudgetResource>().ToList();
                    var departmentResources = result.Read<DepartmentBudgetResource>().ToList();

                    return (defaultResources, departmentResources);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public (string Message, string MessageClass) InsertUpdateDBUMappingDetails(string JsonData, string ProjectId, string UserId, int Type)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@JsonData", JsonData);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    param.Add("@Type", Type);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("[dbo].[DBUMapping_InsertUpdate]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    return (param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public (string Message, string MessageClass) DeleteProjectDepartmentResource(string ProjectId, string Resource, int RoleId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Resource", Resource);
                    param.Add("@RoleId", RoleId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("[dbo].[DBUMapping_DeleteResource]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    return (param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<DepartmentBudgetResource> GetDBUMappingsExcelData(string ProjectId, string DepartmentId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@DepartmentId", DepartmentId);
                    return con.Query<DepartmentBudgetResource>("[dbo].[DBUMapping_GetExcelData]", param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        public (IEnumerable<DepartmentMaster>, IEnumerable<Models.Year>, IEnumerable<PMProjectTypeMaster>, IEnumerable<StatusList>, IEnumerable<PIResourceMaster>)
            GetProjectBudgetDetailsHeaderLists(string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    var reader = con.QueryMultiple("GetProjectBudgetDetailsHeaderList", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return (reader.Read<DepartmentMaster>().ToList(), reader.Read<Models.Year>().ToList(),
                        reader.Read<PMProjectTypeMaster>().ToList(), reader.Read<StatusList>().ToList(), reader.Read<PIResourceMaster>().ToList());
                }
            }
            catch (Exception e)
            {
                throw e;
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
        public ProjectMasters GetProjectBudgetPlanningData(string ProjectId, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    var reader = con.QueryMultiple("GetProjectBudgetPlanningData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
        public ProjectMasters InsertBaselineBudgetData(string ProjectId, string RequestedData, string UserId, string Remarks, string isSave, string FromStage, string Action, string BudgetType)
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
                    param.Add("@FromStage", FromStage);
                    param.Add("@Action", Action);
                    param.Add("@BudgetType", BudgetType);
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

        public ProjectMasters GetBudgetHistory(string ProjectId, string UserId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    var reader = con.QueryMultiple("GetBudgetHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.BudgetProjectData = reader.Read<BudgetProjectData>().ToList();
                    projectMasters.CategoryValue = reader.Read<CategoryValue>().ToList();
                    projectMasters.BudgetHistory = reader.Read<BudgetHistory>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<BudgetHistory> GetApprovalHistoryInfo
            (string projectId, string budgetReqNo, string UserId, string DepartmentId, string Year, string Type, string Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", projectId);
                    param.Add("@UserId", UserId);
                    param.Add("@BudgetReqNo", budgetReqNo);
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@Year", Year);
                    param.Add("@Status", Status);
                    param.Add("@Type", Type);
                    return con.Query<BudgetHistory>("GetApprovalHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
        public ProjectMasters GetBudgetPendingDataForProject(string ProjectId, string BudgetType, string Department, string Category, string LoginId)
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
                    param.Add("@LoginId", LoginId);
                    var reader = con.QueryMultiple("GetBudgetPendingDataForProject", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    projectMasters.BudgetProjectData = reader.Read<BudgetProjectData>().ToList();
                    projectMasters.BudgetPlan = reader.Read<BudgetPlan>().ToList();
                    projectMasters.DepartmentBudgetMaster = reader.Read<DepartmentBudgetCollection>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters SaveBaselineApprovalData(string selecteddata, string Remarks, string UserId, string FromStage, string Action, string BudgetType, string ProjectId)
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
                    param.Add("@FromStage", FromStage);
                    param.Add("@Action", Action);
                    param.Add("@BudgetType", BudgetType);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("SaveBaselineApprovalData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
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

        public ProjectMasters GetApprovedDataForAdditionalPage(string ProjectId, string LoginId)
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
        public ProjectMasters SaveAdditionalRequestData(string ProjectId, string RequestedData, string UserId, string FromStage, string Action)
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
                    param.Add("@FromStage", FromStage);
                    param.Add("@Action", Action);
                    param.Add("@BudgetType", 21);
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
        public IEnumerable<ProjectMasters> GetBudgetTransferList(string Department, string Year, string Status, string Type, string UserId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", UserId);
                    var result = con.Query<ProjectMasters>("[GetBudgetTransferList]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
        public IEnumerable<Models.Year> GetTrasferFromYear(string ProjectId)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    var result = con.Query<Models.Year>("GetTrasferFromYear", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
                    param.Add("@DepartmentId", Department);
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

                connection.Query("SaveBudgetTrasferInformation", param, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
            }
        }

        public IEnumerable<BudgetHistory> GetProjectTransferHistory(string ProjectId, string LoginId, string DepartmentId, string Year, string Type, string Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@Year", Year);
                    param.Add("@Status", Status);
                    param.Add("@Type", Type);
                    return con.Query<BudgetHistory>("GetProjectTransferHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
                    projectMasters.ToYearValue = reader.Read<Models.Year>().ToList();
                    projectMasters.DepartmentValue = reader.Read<DepartmentMaster>().ToList();

                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<ProjectMasters> GetYearWiseBudgetAndExpense(string ProjectId, string DepartmentId, string Year, string Type, string Status, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", LoginId);
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@Year", Year);
                    param.Add("@Status", Status);
                    param.Add("@Type", Type);
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

                connection.Query("SaveSyncedData", param, commandType: CommandType.StoredProcedure);
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
                    var result = con.Query<GetBudgetExpenseForYear>("GetBudgetExpenseForYear", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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

        public IEnumerable<dynamic> GetProjectDepartmentBudget(string ProjectId, string Department, string Year, string Status, string Type, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", LoginId);
                    param.Add("@DepartmentId", Department);
                    param.Add("@Year", Year);
                    param.Add("@Status", Status);
                    param.Add("@Type", Type);
                    var result = con.Query<dynamic>("GetProjectDepartmentBudget", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
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
        public IEnumerable<APIConfig> Get_TransferDataForAPI(string DataToSave, string ProjectId)
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
        public IEnumerable<ProjectMasters> GetProjectBudgetDetailsList(string LoginId, string ProjectId, string DepartmentId, string Year, string Type, string Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", LoginId);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@Year", Year);
                    param.Add("@Type", Type);
                    param.Add("@Status", Status);
                    var result = con.Query<ProjectMasters>("[GetProjectBudgetDetailsList]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public (string Message, string MessageClass) AlterBudgetRequest(string ProjectId, int LatestYear, int PreviousYear, string EditedAmt, int type, int From, string LoginId, string BudgetReqNo, string Action, int FromStage, string RequestedAmount, string Remarks)
        {
            try
            {
                ProjectMasters projectMasters = new ProjectMasters();
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LatestYear", LatestYear);
                    param.Add("@PreviousYear", PreviousYear);
                    param.Add("@EditedAmt", EditedAmt);
                    param.Add("@type", type);
                    param.Add("@From", From);
                    param.Add("@LoginId", LoginId);
                    param.Add("@BudgetReqNo", BudgetReqNo);
                    param.Add("@FromStage", FromStage);
                    param.Add("@Action", Action);
                    param.Add("@RequestAmt", RequestedAmount);
                    param.Add("@Remarks", Remarks);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("[dbo].[AlterBudgetRequest]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    return (param.Get<string>("@OutMessage"), param.Get<string>("@StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<SAPresponse> GetSAPFailedInfo(string ReqNo, string Page)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ReqNo", ReqNo);
                    param.Add("@Page", Page);
                    return con.Query<SAPresponse>("GetSAPFailedInfo", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<ProjectsCollection> PBV_HeadersList(string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    return con.Query<ProjectsCollection>("PBV_HeadersList", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<ProjectBusinessValueCollection> PBV_ProjectsDataList(string ProjectId, string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    return con.Query<ProjectBusinessValueCollection>("PBV_ProjectsDataList", param: param, commandType: CommandType.StoredProcedure, commandTimeout: 1200);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> FileDetailsInsert(ProjectMasters pm, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", pm.ProjectId);
                parameters.Add("@DepartmentId", pm.DepartmentId);
                parameters.Add("@EnclosureName", pm.EnclosureName);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[BudgetReqSaveFileDetails]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }
        public IEnumerable<ProjectMasters> GetFileList(string ProjectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    return con.Query<ProjectMasters>("[BudgetReqGetFileDetails]", param: param, commandType: CommandType.StoredProcedure, commandTimeout: 1200);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> DeleteDocumentData(int DocumentId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@DocumentId", DocumentId);
                    param.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Query("[DeleteBudgetReqFile]", param, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                    return new Tuple<string, string>(param.Get<string>("@Message"), param.Get<string>("@Messageclass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<DepartmentListMaster> GetProjectBudgetDepartmentData(string ProjectId, string UserId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@UserId", UserId);
                    var result = con.Query<DepartmentListMaster>("GetDepartmentsForBudget", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        #region Material Master
        public IEnumerable<ProjectMasters> GetMaterialListdata(string MaterialId, string DivisionId, string MaterialTypeId, int PurchaseGroupId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Material", MaterialId);
                    param.Add("@Division", DivisionId);
                    param.Add("@MaterialType", MaterialTypeId);
                    param.Add("@PurchaseGroup", PurchaseGroupId);
                    param.Add("@LoginId", LoginId);
                    var result = con.Query<ProjectMasters>("GetMaterialListData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<MaterialList> GetMaterialIdListdata()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();


                    var result = con.Query<MaterialList>("GetMaterialIdDropDownData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters GetMaterialDropDownData(string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    var result = con.QueryMultiple("[GetMaterialDropDownData]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    ProjectMasters projectMasters = new ProjectMasters();
                    projectMasters.DivisionValue = result.Read<DivisionListForMaterial>().ToList();
                    projectMasters.MaterialTypeValue = result.Read<MaterialTypeList>().ToList();
                    projectMasters.PurchaseGroupValue = result.Read<PurchaseGroupList>().ToList();
                    return projectMasters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string SyncMaterialListdata()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Query<string>("PR_SyncMaterialMaster", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return param.Get<string>("@OutMessage");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region PR Creation
        public (int StatusId, IEnumerable<PRDropdownCollection> DropDownList) PR_DropdownList(string LoginId, string Role, string Type, long Id)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@Type", Type);
                    param.Add("@PRHeaderId", Id);
                    var result = con.QueryMultiple("[dbo].[PR_CreationDropdownMasters]", param: param, commandType: CommandType.StoredProcedure);

                    var StatusId = result.ReadFirstOrDefault<int>();
                    var DropDownList = result.Read<PRDropdownCollection>().ToList();

                    return (StatusId, DropDownList);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PRDropdownCollection> PR_DepedentDataList(string LoginId, string Role, string Value, string Type, string Department, string Category)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@Value", Value);
                    param.Add("@Type", Type);
                    param.Add("@Department", Department);
                    param.Add("@Category", Category);
                    return con.Query<PRDropdownCollection>("[dbo].[PR_CreationDependentData]", param: param, commandType: CommandType.StoredProcedure, commandTimeout: 1200);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PRIdValueCollection> PR_MaterialDataList(string LoginId, string Role, string Value, string MatType)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@Value", Value);
                    param.Add("@MatType", MatType);
                    return con.Query<PRIdValueCollection>("[dbo].[PR_CreationMaterialCodeDesc]", param: param, commandType: CommandType.StoredProcedure, commandTimeout: 1200);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public (IEnumerable<PRHeaderCollection> HeaderList, IEnumerable<PRDetailsCollection> DetailsList,
            IEnumerable<PRDocumentCollection> DocumentList)
            PR_DataList(string LoginId, string Role, long PRHeaderId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PRHeaderId", PRHeaderId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);

                    var result = con.QueryMultiple("[dbo].[PR_CreationGetData]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    var headerList = result.Read<PRHeaderCollection>().ToList();
                    var detailsList = result.Read<PRDetailsCollection>().ToList();
                    var documentList = result.Read<PRDocumentCollection>().ToList();

                    return (headerList, detailsList, documentList);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> PR_SaveOrApprovePRDetails(long PRHeaderId, string HeaderJson, string DetailsJson, string DocumentJson,
            string RemarksJson, string LoginId, string Role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Role", Role);
                parameters.Add("@PRHeaderId", PRHeaderId);
                parameters.Add("@HeaderJson", HeaderJson);
                parameters.Add("@DetailsJson", DetailsJson);
                parameters.Add("@DocumentJson", DocumentJson);
                parameters.Add("@RemarksJson", RemarksJson);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                con.Query("[dbo].[PR_CreationSaveApprove]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }
        public Tuple<string, string> PR_ListCreationDelete(string LoginId, long Id, string Type, string Remarks = "")
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Id", Id);
                    param.Add("@Type", Type);
                    param.Add("@Remarks", Remarks);
                    param.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                    con.Query("[dbo].[PR_ListCreationDelete]", param, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                    return new Tuple<string, string>(param.Get<string>("@Message"), param.Get<string>("@Messageclass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public (IEnumerable<dynamic> PRNos, string FromDate) PR_GetListHeaderData(string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);

                    var result = con.QueryMultiple("PR_ListHeaderData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    var prNo = result.Read<dynamic>().ToList();
                    var fromDate = result.ReadFirstOrDefault<string>();
                    return (prNo, fromDate);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PRHeaderCollection> PR_GetListGridData(string LoginId, string Role, string PRNo, string FromDate, string Todate)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@PRNo", PRNo);
                    if (!string.IsNullOrEmpty(FromDate))
                    {
                        param.Add("@FromDate", DateTime.ParseExact(FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    }
                    else
                    {
                        param.Add("@FromDate", FromDate);
                    }
                    if (!string.IsNullOrEmpty(Todate))
                    {
                        param.Add("@Todate", DateTime.ParseExact(Todate, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                    }
                    else
                    {
                        param.Add("@Todate", Todate);
                    }
                    return con.Query<PRHeaderCollection>("PR_ListGridData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PRDetailsCollection> PR_GetListDetailsData(long PRHeaderId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PRHeaderId", PRHeaderId);
                    var result = con.Query<PRDetailsCollection>("PR_ListDetailsData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<dynamic> GetPRModificationHistory(long PRDetailId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PRDetailId", PRDetailId);
                    var result = con.Query<dynamic>("PR_ListMaterialModificationData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> CheckIsPRCanBeApproved(long PRHeaderId, string Action)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@PRHeaderId", PRHeaderId);
                    parameters.Add("@Action", Action);
                    parameters.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@MsgFlag", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Query("[dbo].[PR_ListCheckIsPRApproval]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                    return new Tuple<string, string>(parameters.Get<string>("@Msg"), parameters.Get<string>("@MsgFlag"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PRDocumentCollection> PR_GetListVendorData(long PRHeaderId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PRHeaderId", PRHeaderId);
                    return con.Query<PRDocumentCollection>("PR_ListVendorData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public (IEnumerable<PRIdValueCollection> Header, IEnumerable<PRHistoryCollection> Details, IEnumerable<PRIdValueCollection> LastValue) PR_GetListHistoryData(long PRHeaderId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PRHeaderId", PRHeaderId);
                    var result = con.QueryMultiple("PR_ListHistoryData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    var header = result.Read<PRIdValueCollection>().ToList();
                    var details = result.Read<PRHistoryCollection>().ToList();
                    var LastValue = result.Read<PRIdValueCollection>().ToList();
                    return (header, details, LastValue);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> PR_ListAction(string LoginId, string Role, string Type, long PRHeaderId, string RemarksJson)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Role", Role);
                parameters.Add("@Type", Type);
                parameters.Add("@PRHeaderId", PRHeaderId);
                parameters.Add("@RemarksJson", RemarksJson);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                con.Query("[dbo].[PR_ListAction]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }

        public IEnumerable<GetResources> GetPRRequestors()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<GetResources>("GetPRRequestors", commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<GetResources> GetPRApprovers()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<GetResources>("GetPRApprovers", commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PRTeamMaster> GetPRTeamList()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    var result = con.Query<PRTeamMaster>("GetPRTeamList", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ProjectMasters InsertPRTeamMasterData(string UsersData, string UserId)
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
                    con.Execute("InsertPRTeamData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
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
        public List<GetPRTeamMasterExcelData> GetPRTeamMasterExcelData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    List<GetPRTeamMasterExcelData> result = con.Query<GetPRTeamMasterExcelData>("GetPRTeamMasterExcelData", param, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region Expenses Creation
        public ExpensesRequest GetExpensesDropDownData(string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    var result = con.QueryMultiple("GetExpensesDropDownData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    ExpensesRequest expesnes = new ExpensesRequest();
                    expesnes.ProjectValue = result.Read<ProjectListForExpenses>().ToList();
                    expesnes.DepartmentValue = result.Read<DepartmentMaster>().ToList();
                    expesnes.CategoryValue = result.Read<CategoryValue>().ToList();
                    expesnes.ModeOfTransportValue = result.Read<DropdownData>().ToList();
                    expesnes.BankDetails = result.ReadFirstOrDefault<string>();
                    return expesnes;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<ExpensesRequest> GetExpenseRequestList(string startDate, string endDate, string ProjectId, string DepartmentId, string CategoryId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    if (!string.IsNullOrEmpty(startDate))
                    {
                        param.Add("@StartDate", DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    }
                    else
                    {
                        param.Add("@StartDate", startDate);
                    }
                    if (!string.IsNullOrEmpty(endDate))
                    {
                        param.Add("@EndDate", DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                    }
                    else
                    {
                        param.Add("@EndDate", endDate);
                    }
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@CategoryId", CategoryId);
                    param.Add("@LoginId", LoginId);
                    var result = con.Query<ExpensesRequest>("GetExpensesListData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ExpensesRequest GetExpenseRequestHistory(string ExpenseRefId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    ExpensesRequest ex = new ExpensesRequest();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpensesRefId", ExpenseRefId);
                    var result = con.QueryMultiple("GetExpensesHistoryData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    ex.ExpenseHistoryList = result.Read<ExpenseRequestHistory>();
                    ex.StatusList = result.Read<StatusNameList>();
                    return ex;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public (string BillrefNo, String ExpensesRef, string TotalBudget, string TotalBalance, IEnumerable<dynamic> NatureOfExp) GetExpesnesMasterData(string ExpensesRefId, string LoginId, string ProjectId, string Department,string CategoryId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@ExpensesRefId", ExpensesRefId);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Department", Department);
                    param.Add("@CategoryId", CategoryId);
                    var result = con.QueryMultiple("GetAllBillRefNos", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    var BillrefNo = result.ReadFirstOrDefault<string>();
                    var ExpensesRef = result.ReadFirstOrDefault<string>();
                    var TotalBudget = result.ReadFirstOrDefault<string>();
                    var TotalBalance = result.ReadFirstOrDefault<string>();
                    var NatureOfExp = result.Read<dynamic>().ToList();
                    return (BillrefNo, ExpensesRef, TotalBudget, TotalBalance, NatureOfExp);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<ExpensesRequest> GetExpensesRequestDataToEdit(string ExpensesRefId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpensesRefId", ExpensesRefId);
                    param.Add("@LoginId", LoginId);
                    var result = con.Query<ExpensesRequest>("GetExpensesRequestDataToEdit", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> InsertExpensesRequestData(
            string ExpRefNo, string DepartmentId, string EmployeeCode, string RequestedData, string files, 
            string Remarks, string ApprovalFlow, string LoginId
        )
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpRefNo", ExpRefNo);
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@EmployeeCode", EmployeeCode);
                    param.Add("@RequestedData", RequestedData);
                    param.Add("@Files", files);
                    param.Add("@Remarks", Remarks);
                    param.Add("@ApprovalFlow", ApprovalFlow);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertExpensesRequestData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Tuple<string, string> DeleteExpenseById(string ExpensesRefId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpensesRefId", ExpensesRefId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("DeleteExpensesData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> UpdateExpenseRequestStatus(string ExpensesRefId, string Action, string FromStage, string Remarks)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpensesRefId", ExpensesRefId);
                    param.Add("@Action", Action);
                    param.Add("@FromStage", FromStage);
                    param.Add("@Remarks", Remarks);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("UpdateRequestStatus", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public (IEnumerable<ExpensesRequestHeader>, IEnumerable<ExpensesRequestDetails>) GetExpenseRequestDataById(string ExpenseRefId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpenseRefId", ExpenseRefId);
                    var result = con.QueryMultiple("[GetExpenseRequestDetailsById]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    var header = result.Read<ExpensesRequestHeader>().ToList();
                    var details = result.Read<ExpensesRequestDetails>().ToList();
                    return (header, details);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<ExpensesRequest> GetExpenseFiles(string ExpenseRefId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpenseRefId", ExpenseRefId);
                    var result = con.Query<ExpensesRequest>("GetExpenseFiles", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string DeleteExpensesSupportingDoc(string ExpenseRefId, string DocId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ExpenseRefId", ExpenseRefId);
                    param.Add("@DocId", DocId);
                    var result = con.Query<string>("DeleteExpensesSupportingDoc", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> ApproveOrRejectTheExpenses(string Remarks, string ApprovalFlow, string ExpensesRefId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@Remarks", Remarks);
                    param.Add("@ApprovalFlow", ApprovalFlow);
                    param.Add("@ExpensesRefId", ExpensesRefId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("ApproveOrRejectTheExpenses", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region Budget Details Report
        public (IEnumerable<dynamic> ProjectValue, IEnumerable<dynamic> StatusValue, IEnumerable<dynamic> DepartmentValue) GetProjectIdforReport(string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    var result = con.QueryMultiple("GetProjectIdforReport", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    var ProjectValues = result.Read<dynamic>().ToList();
                    var StatusValue = result.Read<dynamic>().ToList();
                    var DepartmentValue = result.Read<dynamic>().ToList();
                    return (ProjectValues, StatusValue, DepartmentValue);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<dynamic> GetProjectIdReportDetails(string ProjectId, string FromDate, string ToDate, string Status, string Department, string LoginId, string Role)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@Status", Status);
                    param.Add("@FromDate", FromDate);
                    param.Add("@ToDate", ToDate);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Role", Role);
                    param.Add("@Department", Department);
                    return con.Query("GetProjectIdReportDetails", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        public Tuple<string, string, int> SaveDivisionInfo(string ProjectId, int DivisionId, int IsProjectPlanning, int IsHGHRequired, string DocumentJson, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@DivisionId", DivisionId);
                    param.Add("@IsProjectPlanning", IsProjectPlanning);
                    param.Add("@IsHGHRequired", IsHGHRequired);
                    param.Add("@DocumentJson", DocumentJson);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    param.Add("@IsHGHMailSent", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 20);
                    con.Execute("ProjectInitiation_SaveDivisionInfo", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string, int>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"), param.Get<Int32>("IsHGHMailSent"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Tuple<string, string, string, string, string, IEnumerable<dynamic>> GetHGHMailData(string ProjectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);

                    param.Add("@ToEmail", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);
                    param.Add("@CCEmail", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                    param.Add("@BCCEmail", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);
                    param.Add("@Subject", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                    param.Add("@HtmlBodyWithSignature", dbType: DbType.String, direction: ParameterDirection.Output, size: 10000);

                    var result = con.Query<dynamic>("[ProjectInitiation_GetHGHMailData]", param, commandType: CommandType.StoredProcedure,
                        commandTimeout: CommonConstants.CommandTimeOut);

                    return new Tuple<string, string, string, string, string, IEnumerable<dynamic>>(
                            param.Get<string>("ToEmail"),
                            param.Get<string>("CCEmail"),
                            param.Get<string>("BCCEmail"),
                            param.Get<string>("Subject"),
                            param.Get<string>("HtmlBodyWithSignature"),
                            result.ToList()
                    );
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string SaveIsHGHMailTriggered(int IsHGHMailTriggered, string ProjectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@IsHGHMailTriggered", IsHGHMailTriggered);
                    param.Add("@ProjectId", ProjectId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ProjectInitiation_SaveIsHGHMailTriggered", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new string(param.Get<string>("OutMessage"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<dynamic> GetHGHSupportingDocument(string projectId, string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", projectId);
                    param.Add("@LoginId", LoginId);
                    return con.Query<dynamic>("[ProjectInitiation_GetHGHSuppDocList]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<dynamic> GetEmployeeData(string DepartmentId,string LoginId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@DepartmentId", DepartmentId);
                    param.Add("@LoginId", LoginId);
                    return con.Query<dynamic>("[GetEmployeeData]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}