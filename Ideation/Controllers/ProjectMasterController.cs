using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Models;
using iText.StyledXmlParser.Jsoup.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Web.Helpers;
using OfficeOpenXml;
using Microsoft.Extensions.Hosting;
using Org.BouncyCastle.Bcpg;
using Ideation.Filters;
using System.Net.Http.Headers;
using System.Text;
using Ideation.Data;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.DotNet.MSIdentity.Shared;
using DocumentFormat.OpenXml.Office2016.Excel;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Mvc.RazorPages;
namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class ProjectMasterController : BaseController
    {
        private readonly IProjectMasterRepository_OldUI projectMasterRepository;
        public ProjectMasterController(IProjectMasterRepository_OldUI projectMasterRepository)
        {
            this.projectMasterRepository = projectMasterRepository;
        }

        /// <summary>
        /// This Method take and binds the Jqgrid value and Drop down values and returns the view
        /// </summary>
        /// <returns>The project Master view</returns>
        [HttpGet]
        public IActionResult ProjectMaster()
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            ProjectMasters projectMasters = projectMasterRepository.GetProjectInitiationData(LoginId);
            //projectMasters.ProjectTypeList = projectMasters.ProjectTypeMaster.Select(m => new SelectListItem { Text = m.ProjectTypeName, Value = Convert.ToString(m.ProjectTypeId) });
            projectMasters.ItemList = projectMasters.ItemMaster.Select(m => new SelectListItem { Text = m.ItemName, Value = Convert.ToString(m.ItemId) });
            var ProjectMasterHeaderDataList = projectMasters.ProjectMasterHeaderDataList;
            projectMasters.SetProjectMasterHeaderDataList = JsonConvert.SerializeObject(ProjectMasterHeaderDataList);

            projectMasters.Role = Role;
            if (TempData["SAPresponse"] != null)
            {
                ViewBag.ResponseFromSP = TempData["SAPresponse"].ToString();
            }
            return View(projectMasters);
        }

        /// <summary>
        /// This Method is to get the Search result
        /// </summary>
        /// <param name="ProjectBriefId"></param>
        /// <param name="ProjectType"></param>
        /// <returns>Search result as string</returns>
        [HttpGet]
        public String GetProjectMasterHeaderData(string ProjectBriefId, string ItemName)
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            var result = projectMasterRepository.GetProjectMasterHeaderData(ProjectBriefId, ItemName, LoginId);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }
        public JsonResult GetProjectBIList(string searchvalue)
        {
            var projectBIList = projectMasterRepository.GetProjectBIList(searchvalue);
            var values = projectBIList.ToArray();
            return Json(values);
        }
        /// <summary>
        /// This method binds the Drop down values and returns the view
        /// </summary>
        /// <returns>AddProject View</returns>
        [HttpGet]
        public IActionResult AddProject()
        {
            ProjectMasters projectMasters = projectMasterRepository.GetProjectInitiationData(LoginId);
            projectMasters.PortfolioList = projectMasters.PortfolioMaster.Select(m => new SelectListItem { Text = m.PortfolioName, Value = Convert.ToString(m.PortfolioId) });
            var BucketList = projectMasters.BucketMaster;
            projectMasters.SetBucket = JsonConvert.SerializeObject(BucketList);
            var ItemTypeList = projectMasters.ItemTypeMaster;
            projectMasters.SetItemType = JsonConvert.SerializeObject(ItemTypeList);
            var TemplateList = projectMasters.TemplateMaster;
            projectMasters.SetTemplate = JsonConvert.SerializeObject(TemplateList);
            projectMasters.HubDataList = projectMasters.HubMaster.Select(m => new SelectListItem { Text = m.HubName, Value = Convert.ToString(m.HubId) });
            var UserGroup = projectMasters.UserGroup;
            projectMasters.Usergrp = JsonConvert.SerializeObject(UserGroup);
            if (TempData["ProjectBriefId"] != null && TempData["Product"] != null && TempData["ProjectCode"] != null && TempData["ProjectDescription"] != null)
            {
                projectMasters.ProjectBriefId = TempData["ProjectBriefId"] as string;
                projectMasters.Product = TempData["Product"] as string;
                projectMasters.ProjectCode = TempData["ProjectCode"] as string;
                projectMasters.ProjectDescription = TempData["ProjectDescription"] as string;

            }

            return View(projectMasters);
        }

        /// <summary>
        /// This method add the AddProject View data to DB
        /// </summary>
        /// <param name="projectMasters"></param>
        /// <returns>ProjectMaster or AddProject View based on the result</returns>
        [HttpPost]
        public IActionResult SaveAddProjectData(ProjectMasters projectMasters)
        {
            projectMasters.CreatedBy = HttpContext.Session.GetString("UserName");

            string result = projectMasterRepository.AddProjectData(projectMasters);

            if (result.ToLower().Contains("successfully"))
            {
                TempData["MessageClass"] = "alert-success";
                TempData["Message"] = result;
                return RedirectToAction("ProjectMaster", "ProjectMaster");
            }
            else
            {
                TempData["MessageClass"] = "alert-danger";
                TempData["Message"] = result;
                return RedirectToAction("ProjectMaster", "ProjectMaster");
            }
        }

        /// <summary>
        /// This method get value for the View Project Data modal
        /// </summary>
        /// <param name="ProductCode"></param>
        /// <returns>A jsondata for the modal</returns>
        [HttpGet]
        public JsonResult GetProjectMasterViewData(string ProductCode)
        {
            var result = projectMasterRepository.GetViewProjectData(ProductCode);
            var jsondata = JsonConvert.SerializeObject(result);
            return Json(jsondata);
        }

        /// <summary>
        /// This method is to set below 3 paramaters to temp data
        /// </summary>
        /// <param name="ProjectBriefId"></param>
        /// <param name="Product"></param>
        /// <param name="ProjectType"></param>
        /// <returns> 1 for indicating success</returns>
        public string SetHiddenDataAddProject(string ProjectBriefId, string Product, string ProjectCode, string ProjectDescription)
        {
            TempData["ProjectBriefId"] = ProjectBriefId;
            TempData["Product"] = Product;
            TempData["ProjectCode"] = ProjectCode;
            TempData["ProjectDescription"] = ProjectDescription;

            return "1";
        }

        /// <summary>
        /// This method is used to set ProjectId in Tempdata
        /// </summary>
        /// <param name="ProjectId"></param>
        /// <returns> 1 for indicating success</returns>
        public string SetProjectId(string ProjectId, string ProductName)
        {
            TempData["ProjectId"] = ProjectId;
            TempData["ProductName"] = ProductName;
            return "1";
        }

        /// <summary>
        /// This method is used to send the ProjectCode to the SAP
        /// </summary>
        /// <param name="ProjectCode"></param>
        //[HttpPost]
        //public void SendProjectCode(string ProjectCode)
        //{
        //    projectMasterRepository.PostProjectCode(ProjectCode);
        //}
        //[HttpPost]
        //public string SendProjectCode(string ProjectCode)
        //{
        //    ViewBag.ResponseFrom = "Select A Bucket";

        //    var result = projectMasterRepository.PostProjectCode(ProjectCode);


        //    foreach (var data in result)
        //    {

        //        if (data.Key == "message")
        //        {
        //            TempData["SAPresponse"] = data.Value;

        //        }

        //    }

        //    return "1";

        //}

        [HttpGet]
        public IActionResult RoleHODMaster()
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            TemplateData templateData = projectMasterRepository.GetTemplateData(LoginId);
            templateData.TemplateList = templateData.TemplateMaster.Select(m => new SelectListItem { Text = m.Description, Value = Convert.ToString(m.Key) });
            return View(templateData);
        }
        [HttpGet]
        public JsonResult GetHODNames(string term)
        {
            var hodNames = projectMasterRepository.GetHODNames(term);
            var values = hodNames.Select(resource => resource.Name).ToList();
            return Json(values);
        }
        [HttpGet]
        public string GetRoleHODMasterHeaderData(string TemplateName)
        {
            var result = projectMasterRepository.GetRoleHODMasterHeaderData(TemplateName);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }
        [HttpPost]
        public ActionResult UpdateRoleHODName(string modifiedData)
        {
            try
            {
                string result = "";
                var modifiedRows = JsonConvert.DeserializeObject<List<TemplateData>>(modifiedData);
                foreach (var modifiedRow in modifiedRows)
                {
                    string hodValue = modifiedRow.HODName;
                    string role = modifiedRow.Role;
                    string templateName = modifiedRow.TemplateName;
                    if (hodValue != null)
                    {
                        result = projectMasterRepository.UpdateRoleHODName(hodValue, role, templateName);
                        if (result.ToLower().Contains("success"))
                        {
                            continue;
                        }
                    }
                }

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }
        /// <summary>
        /// This Method take and binds the Jqgrid value and Drop down values and returns the view
        /// </summary>
        /// <returns>TemplateMasters View</returns>
        [HttpGet]
        public IActionResult TemplateMasters()
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            TemplateData templateData = projectMasterRepository.GetTemplateData(LoginId);
            templateData.TemplateList = templateData.TemplateMaster.Select(m => new SelectListItem { Text = m.Description, Value = Convert.ToString(m.Key) });
            return View(templateData);
        }

        /// <summary>
        /// This Method is to get the Search result
        /// </summary>
        /// <param name="TemplateName"></param>
        /// <returns>Search result as string</returns>
        [HttpGet]
        public IActionResult GetTemplateMasterHeaderData(string TemplateId, string Rolename)
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            TemplateData template = projectMasterRepository.GetTemplateMasterHeaderData(TemplateId, Rolename, LoginId);


            if (Rolename == null)
            {
                var responseData = new
                {
                    TemplateData = template.TemplateMasterListOld
                };
                string jsonResponse = JsonConvert.SerializeObject(responseData);
                return Json(jsonResponse);
            }
            else
            {
                var responseProjectElementData = new
                {
                    TemplateData = template.TemplateMasterListOld,
                    AddedResource = template.AddedResourceNameOld
                };


                string jsonResponse = JsonConvert.SerializeObject(responseProjectElementData);
                return Json(jsonResponse);
            }

        }


        /// <summary>
        /// This method is to save the modified data to DB
        /// </summary>
        /// <returns>success message to the js</returns>
        [HttpPost]
        public ActionResult UpdateTemplateMasterResource(string resourcesToSave, string durationToSave)
        {
            try
            {
                var resources = JsonConvert.DeserializeObject<List<GetUpdatetempaltedata>>(resourcesToSave);
                foreach (var resource in resources)
                {
                    string resourceValue = resource.ResourceName;
                    string keyValue = resource.KeyValue;
                    var result = projectMasterRepository.UpdateTemplateMasterResource(resourceValue, keyValue);
                }

                var durations = JsonConvert.DeserializeObject<List<GetUpdatetempaltedata>>(durationToSave);
                foreach (var duration in durations)
                {
                    int DurationValue = duration.Duration;
                    string keyValue = duration.KeyValue;
                    var result = projectMasterRepository.UpdateTemplateDuration(DurationValue, keyValue);
                }


                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }

        }

        /// <summary>
        /// This method is used to get the autocomplete values
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetResourceNames(string term)
        {
            var resourceNames = projectMasterRepository.GetResourceNames(term);
            var values = resourceNames.Select(resource => resource.Name).ToList();

            return Json(values);
        }
        //[HttpGet]
        //public IActionResult GetResourceNames()
        //{
        //    var resourceNames = projectMasterRepository.GetResourceNames();
        //    return Ok(resourceNames);
        //}



        /// <summary>
        /// This Method take and binds the Jqgrid value and Drop down values and returns the view
        /// </summary>
        /// <returns>ProjectResources View</returns>
        [HttpGet]
        public IActionResult ProjectResources()
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            if (TempData["ProjectId"] != null)
            {
                ResourceData resourceData = projectMasterRepository.GetResourceData(LoginId);
                resourceData.ResourceList = resourceData.ResourceMaster.Select(m => new SelectListItem { Text = m.ProjectIdList, Value = Convert.ToString(m.ProjectIdList) });
                var result = projectMasterRepository.GetResourceMasterHeaderData(TempData["ProjectId"].ToString(), "", LoginId);
                //resourceData.SetResourceDataList = JsonConvert.SerializeObject(result);
                //resourceData.SearchedProjectId = TempData["ProjectId"].ToString();
                if (TempData["ProductName"] == null)
                {
                    //ViewBag.SearchedProjectId = TempData["ProjectId"].ToString();
                    resourceData.SearchedProjectId = TempData["ProjectId"].ToString();
                }
                else
                {
                    //ViewBag.SearchedProjectId = TempData["ProjectId"].ToString() + " " + TempData["ProductName"].ToString();
                    resourceData.SearchedProjectId = TempData["ProjectId"].ToString() + " " + TempData["ProductName"].ToString();
                }
                return View(resourceData);
            }
            else
            {
                ResourceData resourceData = projectMasterRepository.GetResourceData(LoginId);
                resourceData.ResourceList = resourceData.ResourceMaster.Select(m => new SelectListItem { Text = m.ProjectIdList, Value = Convert.ToString(m.ProjectIdList) });
                resourceData.SetResourceDataList = "";
                resourceData.SearchedProjectId = "Select ProjectId";
                //ViewBag.SearchedProjectId = "Select ProjectId";
                return View(resourceData);
            }
        }

        /// <summary>
        /// This Method is to get the Search result
        /// </summary>
        /// <param name="ProjectId"></param>
        /// <returns>Search result as string</returns>
        [HttpPost]
        public IActionResult GetResourceMasterHeaderData(string ProjectId, string Role)
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            ResourceData resourceData = projectMasterRepository.GetResourceMasterHeaderData(ProjectId, Role, LoginId);

            if (Role == null)
            {
                var responseData = new
                {
                    TemplateData = resourceData.TemplateNameData,
                    ResourceData = resourceData.ResourceMasterList
                };
                string jsonResponse = JsonConvert.SerializeObject(responseData);
                return Json(jsonResponse);
            }
            else
            {
                var responseProjectElementData = new
                {
                    ResourceData = resourceData.ResourceMasterList,
                    AddedResource = resourceData.AddedResourceName
                };
                string jsonResponse = JsonConvert.SerializeObject(responseProjectElementData);
                return Json(jsonResponse);
            }
        }

        public ActionResult UpdateProjectResourceName(string modifiedData)
        {
            try
            {
                string result = "";
                var modifiedRows = JsonConvert.DeserializeObject<List<ResourceData>>(modifiedData);
                foreach (var modifiedRow in modifiedRows)
                {
                    string resourcesValue = modifiedRow.Resources;
                    string keyValue = modifiedRow.KeyValue;

                    string projectId = modifiedRow.ProjectId;
                    int duration = modifiedRow.Duration;
                    if (/*(resourcesValue != null && resourcesValue != "") &&*/ (keyValue != null && keyValue != ""))
                    {
                        result = projectMasterRepository.UpdateProjectResourceName(resourcesValue, keyValue, projectId, duration);
                        if (result.ToLower().Contains("success"))
                        {
                            continue;
                        }
                    }
                }
                if (result.ToLower().Contains("success"))
                {
                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { failure = false });

                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
        }


        /// <summary>
        /// This method is for storing the allocated days for resources in db
        /// </summary>
        /// <param name="DataToSend"></param>
        /// <returns>success message to js</returns>
        [HttpPost]
        public string SaveResourcesDaysAllocation(string DataToSend)
        {
            try
            {

                // Deserialize the JSON data to the List of ResourceDays
                List<ResourceDays> dataToSends = JsonConvert.DeserializeObject<List<ResourceDays>>(DataToSend);
                foreach (ResourceDays resourceDay in dataToSends)
                {
                    string keyValue = resourceDay.KeyValue;
                    string resourceName = resourceDay.ResourceName;
                    int days = resourceDay.Days;
                    string projectId = resourceDay.ProjectId;
                    string result = projectMasterRepository.SaveResourceDays(keyValue, resourceName, days, projectId);

                }
                string response = "success";

                return response;
            }
            catch (Exception ex)
            {
                string response = "falilure";
                return response;
            }
        }

        /// <summary>
        /// This method is used for getting the allocation days data from database
        /// </summary>
        /// <param name="KeyValue"></param>
        /// <returns>It returns the keyvalue, resourcename and days</returns>
        [HttpGet]
        public ActionResult GetAllocatedData(string KeyValue, string ProjectId)
        {
            var allocatedData = projectMasterRepository.GetAllocatedData(KeyValue, ProjectId);
            var jsonResult = Json(new { success = true, data = allocatedData });
            return jsonResult;
        }

        [HttpPost]
        public ActionResult SaveResourcesNameAndDays(string dataToSave, float plannedBudget, string keyValuePB, int duration, string projectid)
        {
            try
            {
                var resourceData = JsonConvert.DeserializeObject<List<ResourceDays>>(dataToSave);

                foreach (var resourcesData in resourceData)
                {
                    string keyValue = resourcesData.KeyValue;
                    string resourceName = resourcesData.ResourceName;
                    int days = resourcesData.Days;
                    string projectId = resourcesData.ProjectId;
                    string result = projectMasterRepository.SaveResourceDays(keyValue, resourceName, days, projectId);
                }
                var plannedbudget = projectMasterRepository.AllocatePlannedBudget(plannedBudget, keyValuePB, duration, projectid);
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }
        [HttpPost]
        public string TemplateResourceNameDelete(string TemplateId, string keyValue, string ResourceName)
        {
            var result = projectMasterRepository.TemplateResourceNameDelete(TemplateId, keyValue, ResourceName);
            return result;
        }

        [HttpPost]
        public string ResourceMasterResourceNameDelete(string ProjectId, int Days, string keyValue, string ResourceName)
        {
            var result = projectMasterRepository.ResourceMasterResourceNameDelete(ProjectId, Days, keyValue, ResourceName);
            return result;
        }

        public ActionResult GetExcelResourceMasterData(string projectId)
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            var data = projectMasterRepository.GetExcelResourceMasterData(projectId, LoginId);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("ProjectResourceMaster");

                // Add the header row without bold formatting
                var headerRow = worksheet.Cells[1, 1, 1, data.Count].LoadFromCollection(data, true);

                // Set the width of columns as needed
                worksheet.Cells.AutoFitColumns();

                // Apply bold formatting to the header row
                for (int col = headerRow.Start.Column; col <= headerRow.End.Column; col++)
                {
                    worksheet.Cells[headerRow.Start.Row, col].Style.Font.Bold = true;
                }

                byte[] excelData = package.GetAsByteArray();
                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ProjectResourceMaster.xlsx");
            }
        }
        public ActionResult GetExcelTemplateMasterData(string templateName)
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            var data = projectMasterRepository.GetExcelTemplateMasterData(templateName, LoginId);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("TemplateMasterData");

                // Add the header row without bold formatting
                var headerRow = worksheet.Cells[1, 1, 1, data.Count].LoadFromCollection(data, true);

                // Set the width of columns as needed
                worksheet.Cells.AutoFitColumns();

                // Apply bold formatting to the header row
                for (int col = headerRow.Start.Column; col <= headerRow.End.Column; col++)
                {
                    worksheet.Cells[headerRow.Start.Row, col].Style.Font.Bold = true;
                }

                byte[] excelData = package.GetAsByteArray();

                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "TemplateMasterData.xlsx");
            }
        }
        [HttpGet]
        public IActionResult RoleCostCenterMaster()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetRoleCostCenterMasterData(string Rolename)
        {
            RoleCostCenterMaster roleCostCenterMaster = projectMasterRepository.GetRoleCostCenterMasterData(Rolename);

            if (Rolename == null)
            {
                var responseData = new
                {
                    RoleCostCenterMaster = roleCostCenterMaster.RoleCostCenterList
                };
                string jsonResponse = JsonConvert.SerializeObject(responseData);
                return Json(jsonResponse);
            }
            else
            {
                var responseCostCenterData = new
                {
                    RoleCostCenterMaster = roleCostCenterMaster.RoleCostCenterList,
                    AddedCostCenter = roleCostCenterMaster.AddedCostCenterName
                };

                string jsonResponse = JsonConvert.SerializeObject(responseCostCenterData);

                return Json(jsonResponse);
            }
        }

        [HttpPost]
        public string RoleCostCenterNameDelete(string Role, string CostCenterName)
        {
            var result = projectMasterRepository.RoleCostCenterNameDelete(Role, CostCenterName);
            return result;
        }

        [HttpPost]
        public ActionResult UpdateRoleCostCenterName(string dataToSave)
        {
            try
            {
                var modifiedRows = JsonConvert.DeserializeObject<List<RoleCostCenterMaster>>(dataToSave);
                foreach (var modifiedRow in modifiedRows)
                {
                    string CostCenterName = modifiedRow.CostCenter;
                    var Role = modifiedRow.CapturedRole;
                    var result = projectMasterRepository.UpdateRoleCostCenterName(Role, CostCenterName);
                }



                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }

        public JsonResult GetCostCenterNames(string term)
        {
            var costCenterNames = projectMasterRepository.GetCostCenterNames(term);
            var values = costCenterNames.ToArray();
            return Json(values);
        }

        public ActionResult GetExcelRoleCostCenterMasterData()
        {
            var data = projectMasterRepository.GetExcelRoleCostCenterMasterData();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("TemplateMasterData");

                // Add the header row without bold formatting
                var headerRow = worksheet.Cells[1, 1, 1, data.Count].LoadFromCollection(data, true);

                // Set the width of columns as needed
                worksheet.Cells.AutoFitColumns();

                // Apply bold formatting to the header row
                for (int col = headerRow.Start.Column; col <= headerRow.End.Column; col++)
                {
                    worksheet.Cells[headerRow.Start.Row, col].Style.Font.Bold = true;
                }

                byte[] excelData = package.GetAsByteArray();
                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RoleCostCenter.xlsx");
            }
        }

        [HttpGet]
        public JsonResult GetResources()
        {
            var resources = projectMasterRepository.GetResources();
            var values = resources.Select(resource => resource.Name).ToList();

            return Json(values);
        }

        public JsonResult GetCostCenterValues()
        {
            var resources = projectMasterRepository.GetCostCenterValues();
            var values = resources.Select(resource => resource.Name).ToList();

            return Json(values);
        }

        public IActionResult DepartmentBudgetUsers()
        {
            return View();
        }
        public IActionResult RoleTeamMaster()
        {
            return View();
        }
        public JsonResult RoleTeamMasterList()
        {
            var resources = projectMasterRepository.GetDepartmentsList();
            return Json(resources);
        }
        [HttpGet]
        public IActionResult BudgetPlanning()
        {
            string LoginId = HttpContext.Session.GetString("UserName");
            TemplateData templateData = projectMasterRepository.GetTemplateData(LoginId);
            templateData.TemplateList = templateData.TemplateMaster.Select(m => new SelectListItem { Text = m.Description, Value = Convert.ToString(m.Key) });
            return View(templateData);
        }

        [EncryptedActionParameter]
        public IActionResult ProjectBudgetPlanners(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.ProjectId = ProjectId;
            return View(projectMasters);
        }
        public JsonResult GetActiveDepartments(string ProjectId)
        {
            var resources = projectMasterRepository.GetActiveDepartments(ProjectId);
            return Json(resources);
        }

        public IActionResult GetDepartmentUsers(string Role, string ProjectId)
        {
            var data = projectMasterRepository.GetDepartmentUsers(Role, ProjectId);
            return Ok(new Tuple<IEnumerable<GetTemplateDataList>, int>(data.Item1, data.Item2));
        }
        public JsonResult GetUsers()
        {
            var hodNames = projectMasterRepository.GetUsers();
            var values = hodNames.Select(resource => resource.Name).ToList();
            return Json(values);
        }

        public JsonResult GetDepartmentResources()
        {
            var hodNames = projectMasterRepository.GetDepartmentResources();
            var values = hodNames.Select(resource => resource.Name).ToList();
            return Json(values);
        }

        [HttpPost]
        public JsonResult InsertResourcesName(string UsersData)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters = projectMasterRepository.InsertDepartmentTeamMasterData(UsersData, LoginId);
            return Json(projectMasters);
        }
        public JsonResult InsertBudgetPlanning(string budgetplaning, string Templete)
        {
            ProjectMasters projectMasters = new ProjectMasters();

            projectMasters = projectMasterRepository.InsertRolePlaaningMasterData(budgetplaning, Templete);
            return Json(projectMasters);
        }

        public JsonResult InsertProjectResourcesDetails(string ProjectUserData, string ProjectId, int Type)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters = projectMasterRepository.InsertProjectResourcesDetails(ProjectUserData, ProjectId, LoginId, Type);
            return Json(projectMasters);
        }

        public IActionResult BudgetRequestList()
        {
            return View();
        }

        public JsonResult GetBudgetPlanningList(string Status)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.GetBudgetPlanningList(LoginId, Status);
            return Json(data);
        }
        [EncryptedActionParameter]
        public IActionResult ProjectBaselineBudget(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.ProjectId = ProjectId;
            projectMasters.Role = Role;
            return View(projectMasters);
        }
        [EncryptedActionParameter]
        public JsonResult GetProjectBaselineBudget(string ProjectId, string FromDate, string ToDate)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.GetProjectBudgetPlanningData(ProjectId, LoginId, FromDate, ToDate);
            return Json(data);
        }
        public IActionResult N2BaselineBudgetNew()
        {
            return View();
        }
        public IActionResult BaselineBudgetNew()
        {
            return View();
        }
        public IActionResult BaseLineBudgetTab()
        {

            return View();
        }
        [EncryptedActionParameter]
        [HttpGet]
        public IActionResult BaseLineBudgetApprovalPhase1(string ProjectId, string BudgetType)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.ProjectId = ProjectId;
            projectMasters.BudgetType = BudgetType;
            projectMasters.Role = Role;
            return View(projectMasters);
        }
        public JsonResult SaveBaselingApprovalData(string selecteddata, String Remarks)
        {
            var data = projectMasterRepository.SaveBaselingApprovalData(selecteddata, Remarks, LoginId);
            return Json(data);
        }
        public JsonResult GetBudgetPendingDataForProject(string ProjectId, string BudgetType, string Department, string Category)
        {
            var data = projectMasterRepository.GetBudgetPendingDataForProject(ProjectId, BudgetType, Department, Category);
            return Json(data);
        }
        public IActionResult ProjectBudgetNew()
        {
            return View();
        }
        public IActionResult NewBaselineBudget()
        {
            return View();
        }
        public IActionResult NewBaselineBudget2()
        {
            return View();
        }

        public IActionResult NBaselineBudgetNew()
        {
            return View();
        }
        public IActionResult N2BaselineBudgetNew1()
        {
            return View();
        }
        public IActionResult NBaseLineBudgetTab()
        {
            return View();
        }
        public IActionResult NewBaseLineBudgetTab2()
        {
            return View();
        }
        public IActionResult NewBaseLineBudgetTab2Info()
        {
            return View();
        }

        public IActionResult BaselineBudget()
        {
            return View();
        }

        public IActionResult AdditionalBudgetApproval()
        {
            return View();
        }

        public IActionResult ProjectBudget()
        {
            return View();
        }
        public IActionResult BaselineBudgetApproval()
        {
            return View();
        }
        public JsonResult SaveBudgetData(string ProjectId, string RequestedData, string Remarks, string isSave = "No")
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.InsertBaselineBudgetData(ProjectId, RequestedData, LoginId, Remarks, isSave);
            return Json(data);
        }
        public JsonResult GetBudgetHistory(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.GetBudgetHistory(ProjectId, LoginId);
            return Json(data);
        }

        public IActionResult BudgetApprovalPhase1()
        {
            return View();
        }
        public JsonResult GetBudgetPendingList(string Status)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.GetBudgetPendingList(LoginId, Status);
            return Json(data);
        }

        public JsonResult GetApprovedDataForAdditionalPage(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.GetApprovedDataForAdditionalPage(ProjectId, LoginId);
            return Json(data);
        }
        public ActionResult GetExcelData_TeamRoleMaster()
        {
            var data = projectMasterRepository.GetExcelData_TeamRoleMaster();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("TemplateMasterData");

                // Add the header row without bold formatting
                var headerRow = worksheet.Cells[1, 1, 1, data.Count].LoadFromCollection(data, true);

                // Set the width of columns as needed
                worksheet.Cells.AutoFitColumns();

                // Apply bold formatting to the header row
                for (int col = headerRow.Start.Column; col <= headerRow.End.Column; col++)
                {
                    worksheet.Cells[headerRow.Start.Row, col].Style.Font.Bold = true;
                }

                byte[] excelData = package.GetAsByteArray();
                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "TeamRoleMaster.xlsx");
            }
        }
        public ActionResult GetExcelData_BudgetPlanning(string Template)
        {
            var data = projectMasterRepository.GetExcelData_BudgetPlanning(Template);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("TemplateMasterData");

                // Add the header row without bold formatting
                var headerRow = worksheet.Cells[1, 1, 1, data.Count].LoadFromCollection(data, true);

                // Set the width of columns as needed
                worksheet.Cells.AutoFitColumns();

                // Apply bold formatting to the header row
                for (int col = headerRow.Start.Column; col <= headerRow.End.Column; col++)
                {
                    worksheet.Cells[headerRow.Start.Row, col].Style.Font.Bold = true;
                }

                byte[] excelData = package.GetAsByteArray();
                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "BudgetPlanning.xlsx");
            }
        }
        public ActionResult GetExcelData_DepartmentBudgetUsers(string ProjectId)
        {
            var data = projectMasterRepository.GetExcelData_DepartmentBudgetUsers(ProjectId);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("TemplateMasterData");

                // Add the header row without bold formatting
                var headerRow = worksheet.Cells[1, 1, 1, data.Count].LoadFromCollection(data, true);

                // Set the width of columns as needed
                worksheet.Cells.AutoFitColumns();

                // Apply bold formatting to the header row
                for (int col = headerRow.Start.Column; col <= headerRow.End.Column; col++)
                {
                    worksheet.Cells[headerRow.Start.Row, col].Style.Font.Bold = true;
                }

                byte[] excelData = package.GetAsByteArray();
                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DepartmentBudgetUsers.xlsx");
            }
        }
        public JsonResult SaveAdditinalRequestData(string ProjectId, String RequestedData)
        {
            var data = projectMasterRepository.SaveAdditinalRequestData(ProjectId, RequestedData, LoginId);
            return Json(data);
        }

        public IActionResult BudgetApprovalPhase2()
        {
            return View();
        }

        public JsonResult GetL2ApprovalList(string Status)
        {
            var data = projectMasterRepository.GetL2ApprovalList(LoginId, Status);
            return Json(data);
        }
        [EncryptedActionParameter]
        [HttpGet]
        public IActionResult BaseLineBudgetApprovalPhase2(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            if (ProjectId != null && ProjectId != "")
            {
                HttpContext.Session.SetString("ProjectId", ProjectId);
                projectMasters.ProjectId = ProjectId;
            }
            else
            {
                projectMasters.ProjectId = HttpContext.Session.GetString("ProjectId");
                projectMasters.OutMessage = HttpContext.Session.GetString("OutMessage") ?? string.Empty;
            }
            projectMasters.Role = Role;
            return View(projectMasters);
        }

        public JsonResult GetL2ApprovalPendingDataForProject(string ProjectId, string Department, string Category, string year)
        {
            var data = projectMasterRepository.GetL2ApprovalPendingDataForProject(ProjectId, Department, Category, year);
            return Json(data);
        }
        public IActionResult SaveL2ApprovalData(string ProjectDataToSave, String Remarks)
        {
            var data = projectMasterRepository.SaveL2ApprovalData(ProjectDataToSave, Remarks, LoginId);
            TempData["Message"] = data.Item1;
            TempData["Messageclass"] = data.Item2;

            if (!string.IsNullOrEmpty(data.Item1))
            {
                HttpContext.Session.SetString("OutMessage", data.Item1);
            }
            return RedirectToAction("BaseLineBudgetApprovalPhase2", "ProjectMaster");
        }

        //public IActionResult SaveL2ApprovalData(string ProjectDataToSave, String Remarks)
        //{
        //    var result = projectMasterRepository.Get_BudgetDataForAPI(ProjectDataToSave).ToList();
        //    var url = result[0].URL;
        //    var username = result[0].UserName;
        //    var password = result[0].Password;
        //    var jsonPayload = result[0].JsonPayload;
        //    var msg = result[0].Status;
        //    var resultMsg = "";
        //    if (msg.ToLower().Contains("success"))
        //    {
        //        using (var client = new HttpClient())
        //        {
        //            client.DefaultRequestHeaders.Clear();
        //            client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
        //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //            var authenticationString = $"{username}:{password}";
        //            var base64String = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(authenticationString));
        //            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64String);

        //            var responseData = "";

        //            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        //            var request = new HttpRequestMessage
        //            {
        //                Method = HttpMethod.Get,
        //                RequestUri = new Uri(url),
        //                Content = content
        //            };
        //            try
        //            {
        //                var response = client.SendAsync(request).Result;

        //                var responseContent = response.Content.ReadAsStringAsync().Result;

        //                if (response.IsSuccessStatusCode)
        //                {
        //                    var saveresult = projectMasterRepository.SaveL2ApprovalData(jsonPayload, responseContent, ProjectDataToSave, Remarks, LoginId);
        //                    resultMsg = saveresult.Item1;
        //                    TempData["Message"] = saveresult.Item1;
        //                    TempData["Messageclass"] = saveresult.Item2;
        //                    if (!string.IsNullOrEmpty(saveresult.Item1))
        //                    {
        //                        HttpContext.Session.SetString("OutMessage", saveresult.Item1);
        //                    }
        //                }
        //                else
        //                {

        //                    resultMsg = $"Error Occurred during API call: {response.StatusCode}";
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                resultMsg = $"Exception occurred: {ex.Message}";
        //            }

        //        }
        //    }
        //    return RedirectToAction("BaseLineBudgetApprovalPhase2", "ProjectMaster");
        //}

        [EncryptedActionParameter]
        [HttpGet]
        public IActionResult L2ApprovedProjectInfo(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.ProjectId = ProjectId;
            return View(projectMasters);
        }
        public JsonResult GetL2ApprovalProjectInfo(string ProjectId)
        {
            var data = projectMasterRepository.GetL2ApprovalProjectInfo(ProjectId);
            return Json(data);
        }
        public JsonResult GetCategoryforAdditionalRequest(string ProjectId, string Department)
        {
            var data = projectMasterRepository.GetCategoryforAdditionalRequest(ProjectId, Department, LoginId);
            return Json(data);
        }

        public IActionResult BudgetTransferList()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetBudgetTransferList()
        {
            var data = projectMasterRepository.GetBudgetTransferList(LoginId);
            return Json(data);
        }

        [HttpPost]
        public JsonResult GetProjectTransferHistory(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var data = projectMasterRepository.GetProjectTransferHistory(ProjectId);
            return Json(data);
        }

        [EncryptedActionParameter]
        public IActionResult ProjectBudgetTransfer(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            if (ProjectId != null && ProjectId != "")
            {
                HttpContext.Session.SetString("ProjectId", ProjectId);
                projectMasters.ProjectId = ProjectId;
            }
            else
            {
                projectMasters.ProjectId = HttpContext.Session.GetString("ProjectId");
                ProjectId = HttpContext.Session.GetString("ProjectId");
                projectMasters.OutMessage = HttpContext.Session.GetString("OutMessage") ?? string.Empty;
            }
            var result = projectMasterRepository.GetTrasferFromYear(ProjectId);
            projectMasters.FromYearList = result.Select(m => new SelectListItem { Text = m.YearVal, Value = Convert.ToString(m.YearVal) });
            //projectMasters.ToYearList = result.ToYearValue.Select(m => new SelectListItem { Text = m.YearVal, Value = Convert.ToString(m.YearVal) });
            //projectMasters.DepartmentList = result.DepartmentValue.Select(m => new SelectListItem { Text = m.DepartmentName, Value = Convert.ToString(m.DepartmentName) });
            return View(projectMasters);
        }

        public JsonResult GetProjectDataToTransfer(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetProjectDataToTransfer(ProjectId, LoginId);
            return Json(result);
        }
        public JsonResult GetProjectDataBasedOnYear(string ProjectId, string FromYear, string ToYear, string Department)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetProjectDataBasedOnYear(ProjectId, FromYear, ToYear, Department, LoginId);
            return Json(result);
        }

        public IActionResult MethodForTransfer(string url, string username, string password, string JsonPayLoad, string ProjectId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Clear();
                client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var authenticationString = $"{username}:{password}";
                var base64String = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(authenticationString));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64String);

                var responseData = "";

                var content = new StringContent(JsonPayLoad, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri(url),
                    Content = content
                };
                try
                {
                    var response = client.SendAsync(request).Result;
                    var ResponseContent = response.Content.ReadAsStringAsync().Result;
                    var data = projectMasterRepository.SaveTrasferAPIResponse(JsonPayLoad, ResponseContent, LoginId, ProjectId);
                    var result = new
                    {
                        StatusCode = response.StatusCode.ToString(),
                        Remarks = data
                    };

                    // Return result as a JSON response
                    return Json(result);
                }
                catch (Exception ex)
                {
                    var errorResult = new
                    {
                        StatusCode = "Error",
                        Remarks = ex.Message
                    };
                    return new JsonResult(errorResult);
                }
            }
        }

        [HttpPost]
        public IActionResult BudgetTransferSave(ProjectMasters projectmaster)
        {
            var result = projectMasterRepository.SaveBudgetTrasferInformation(LoginId, projectmaster);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;
            if (!string.IsNullOrEmpty(result.Item1))
            {
                HttpContext.Session.SetString("OutMessage", result.Item1);
            }
            return RedirectToAction("ProjectBudgetTransfer", "ProjectMaster");
        }
        //public IActionResult BudgetTransferSave(ProjectMasters projectmaster)
        //{
        //    if (projectmaster.IsSave == "No")
        //    {
        //        var result = projectMasterRepository.Get_TransferDataForAPI(projectmaster.ProjectDataToSave, projectmaster.ProjectId).ToList();
        //        var url = result[0].URL;
        //        var username = result[0].UserName;
        //        var password = result[0].Password;
        //        var FromYearJson = result[0].FromYearJson;
        //        var ToYearJson = result[0].ToYearJson;
        //        var NegativeFromYearJson = result[0].NegativeFromYearJson;
        //        var msg = result[0].Status;
        //        var resultMsg = "";
        //        if (msg.ToLower().Contains("success"))
        //        {
        //            var response = MethodForTransfer(url, username, password, FromYearJson, projectmaster.ProjectId);

        //            if (response is JsonResult jsonResponse)
        //            {
        //                var responseObject = jsonResponse.Value as dynamic;
        //                var statusCode = responseObject?.StatusCode;
        //                var remarks = responseObject?.Remarks;

        //                if (statusCode == "OK" && remarks == "Budget was updated")
        //                {
        //                    var Toresponse = MethodForTransfer(url, username, password, ToYearJson, projectmaster.ProjectId);

        //                    if (Toresponse is JsonResult ToJsonResponse)
        //                    {
        //                        var ToresponseObject = ToJsonResponse.Value as dynamic;
        //                        var TostatusCode = ToresponseObject?.StatusCode;
        //                        var Toremarks = ToresponseObject?.Remarks;

        //                        if (TostatusCode == "OK" && Toremarks == "Budget was updated")
        //                        {
        //                            var data = projectMasterRepository.SaveBudgetTrasferInformation(LoginId, projectmaster);
        //                            TempData["Message"] = data.Item1;
        //                            TempData["MessageClass"] = data.Item2;
        //                            if (!string.IsNullOrEmpty(data.Item1))
        //                            {
        //                                HttpContext.Session.SetString("OutMessage", data.Item1);
        //                            }
        //                        }
        //                        else
        //                        {
        //                            MethodForTransfer(url, username, password, NegativeFromYearJson, projectmaster.ProjectId);
        //                            TempData["Message"] = Toremarks;
        //                            TempData["MessageClass"] = "alert-danger";

        //                        }
        //                    }
        //                }
        //                else
        //                {
        //                    TempData["Message"] = remarks;
        //                    TempData["MessageClass"] = "alert-danger";

        //                }
        //            }
        //        }
        //        else
        //        {
        //            TempData["Message"] = "API data is not proper";
        //            TempData["MessageClass"] = "alert-danger";
        //        }
        //    }
        //    else
        //    {
        //        var data = projectMasterRepository.SaveBudgetTrasferInformation(LoginId, projectmaster);
        //        TempData["Message"] = data.Item1;
        //        TempData["MessageClass"] = data.Item2;
        //        if (!string.IsNullOrEmpty(data.Item1))
        //        {
        //            HttpContext.Session.SetString("OutMessage", data.Item1);
        //        }
        //    }
        //    return RedirectToAction("ProjectBudgetTransfer", "ProjectMaster");
        //}

        public JsonResult GetTransferToYearAndDepartment(string ProjectId, string FromYear)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetTransferToYearAndDepartment(ProjectId, FromYear);
            return Json(result);
        }

        public IActionResult ProjectBudgetDetailsList()
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.Role = Role;
            return View(projectMasters);
        }


        public JsonResult GetYearWiseBudgetAndExpense(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetYearWiseBudgetAndExpense(ProjectId);
            return Json(result);
        }
        public IActionResult GetBudgetAndExpenseBasedOnYear(string Project, string year, string type)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetBudgetAndExpenseForYear(Project, year, type);
            return Ok(result);
        }

        #region API

        public JsonResult MethodForAPI(string type)
        {
            var result = projectMasterRepository.APICredentials_Get(type).ToList();
            var url = result[0].URL;
            var username = result[0].UserName;
            var password = result[0].Password;
            var jsonPayload = result[0].JsonPayload;
            var msg = result[0].Status;
            var resultMsg = "";
            if (msg.ToLower().Contains("success"))
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Clear();
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var authenticationString = $"{username}:{password}";
                    var base64String = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(authenticationString));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64String);

                    var responseData = "";

                    var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                    var request = new HttpRequestMessage
                    {
                        Method = HttpMethod.Get,
                        RequestUri = new Uri(url),
                        Content = content
                    };
                    try
                    {
                        var response = client.SendAsync(request).Result;

                        var responseContent = response.Content.ReadAsStringAsync().Result;

                        if (response.IsSuccessStatusCode)
                        {
                            var saveresult = projectMasterRepository.SaveSyncedData(jsonPayload, responseContent, type, LoginId);
                            resultMsg = saveresult.Item1;
                        }
                        else
                        {
                            resultMsg = $"Error Occurred during API call: {response.StatusCode}";
                        }
                    }
                    catch (Exception ex)
                    {
                        resultMsg = $"Exception occurred: {ex.Message}";
                    }

                }
                if (resultMsg.ToLower().Contains("success"))
                {
                    msg = resultMsg;
                }
                else
                {
                    msg = resultMsg;
                }
            }
            else
            {
                msg = "";
            }
            return Json(msg);
        }
        #endregion

        public JsonResult GetSAPdifferenceProjectDetails()
        {
            var result = projectMasterRepository.GetSAPdifferenceProjectDetails();
            return Json(result);
        }
    }
}