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
using System.Globalization;
using System.Web.WebPages;
using ClosedXML.Excel;
using Grpc.Core.Logging;
using Microsoft.AspNetCore.Http.HttpResults;
using DocumentFormat.OpenXml.Wordprocessing;
using NonFactors.Mvc.Grid;
using DocumentFormat.OpenXml.Vml.Spreadsheet;
using Ideation.Common;

namespace Ideation.Controllers
{
    public class NewProjectInitiationController : BaseController
    {
        private readonly IProjectMasterRepository projectMasterRepository;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;

        #region Constructor
        public NewProjectInitiationController(IWebHostEnvironment webHostEnvironment, IProjectMasterRepository projectMasterRepository, IConfiguration Configuration)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.projectMasterRepository = projectMasterRepository;
            this.Configuration = Configuration;

        }
        #endregion

        #region project initiation list
        [HttpGet]
        public IActionResult ProjectInitiationList()
        {

            ProjectMasters projectMasters = projectMasterRepository.GetProjectInitiationData(LoginId);

            projectMasters.Role = Role;

            projectMasters.ItemList = projectMasters.ItemMaster.Select(m => new SelectListItem
            {
                Text = m.ItemName,
                Value = Convert.ToString(m.ItemId)
            });

            projectMasters.TemplateList = projectMasters.TemplateMaster.Select(m => new SelectListItem
            {
                Text = m.TemplateDescription,
                Value = Convert.ToString(m.TemplateId)
            });

            projectMasters.PortfolioList = projectMasters.PortfolioMaster.Select(m => new SelectListItem
            {
                Text = m.PortfolioName,
                Value = Convert.ToString(m.PortfolioId)
            });

            projectMasters.HubDataList = projectMasters.HubMaster.Select(m => new SelectListItem
            {
                Text = m.HubName,
                Value = Convert.ToString(m.HubId)
            });

            projectMasters.CurrencyDataList = projectMasters.CurrencyList.Select(m => new SelectListItem
            {
                Text = m.CurrencyName,
                Value = Convert.ToString(m.CurrencyName)
            });

            projectMasters.DivisionList = projectMasters.DivisionValue.Select(m => new SelectListItem
            {
                Text = m.DivisionName,
                Value = Convert.ToString(m.DivisionId)
            });

            projectMasters.IsProjectPlanningList = projectMasters.ProjectPlanning.Select(m => new SelectListItem
            {
                Text = m.Name,
                Value = m.Id
            });

            projectMasters.IsHGHList = projectMasters.HGHData.Select(m => new SelectListItem
            {
                Text = m.Name,
                Value = m.Id
            });

            var ProjectMasterHeaderDataList = projectMasters.ProjectMasterHeaderDataList;
            projectMasters.ProjectMasterHeaderData = JsonConvert.SerializeObject(ProjectMasterHeaderDataList);

            var PortfolioList = projectMasters.PortfolioMaster;
            projectMasters.PortfolioData = JsonConvert.SerializeObject(PortfolioList);

            var BucketList = projectMasters.BucketMaster;
            projectMasters.BucketData = JsonConvert.SerializeObject(BucketList);

            var ItemTypeList = projectMasters.ItemTypeMaster;
            projectMasters.ItemTypeData = JsonConvert.SerializeObject(ItemTypeList);

            var TemplateList = projectMasters.TemplateMaster;
            projectMasters.TemplateData = JsonConvert.SerializeObject(TemplateList);

            var UserGroup = projectMasters.UserGroup;
            projectMasters.UserGrpData = JsonConvert.SerializeObject(UserGroup);

            var D3UserGroup = projectMasters.D3UserGroup;
            projectMasters.D3GrpData = JsonConvert.SerializeObject(D3UserGroup);

            if (TempData["SAPresponse"] != null)
            {
                ViewBag.ResponseFromSP = TempData["SAPresponse"].ToString();
            }

            return View(projectMasters);

        }

        [HttpGet]
        public IActionResult GetProjectInitiationExcelData(string ProjectBriefId, string ItemName, string projectId, string startDate, string endDate, string template)
        {

            var result = projectMasterRepository.GetProjectMasterHeaderData(ProjectBriefId, ItemName, LoginId, projectId, startDate, endDate, template);

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Project Initiation");
                var currentRow = 1;

                worksheet.Cell(currentRow, 1).Value = "Project Brief Id";
                worksheet.Cell(currentRow, 2).Value = "Product Name";
                worksheet.Cell(currentRow, 3).Value = "Item Type";
                worksheet.Cell(currentRow, 4).Value = "Project Id";
                worksheet.Cell(currentRow, 5).Value = "Start Date";
                worksheet.Cell(currentRow, 6).Value = "End Date";
                worksheet.Cell(currentRow, 7).Value = "Template";
                worksheet.Cell(currentRow, 8).Value = "Created Date";
                worksheet.Cell(currentRow, 9).Value = "Legacy";
                //worksheet.Cell(currentRow, 10).Value = "Division";
                worksheet.Cell(currentRow, 10).Value = "Is Project Planning Required";
                worksheet.Cell(currentRow, 11).Value = "Is HGH Required";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 11);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.ProjectBriefId;
                    worksheet.Cell(currentRow, 2).Value = item.Product;
                    worksheet.Cell(currentRow, 3).Value = item.ItemType;
                    if ((item.ProjectId == null || item.ProjectId == "") && item.ProjectStatus != "")
                    {
                        worksheet.Cell(currentRow, 4).Value = item.ProjectStatus;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 4).Value = item.ProjectId;
                    }

                    string startdateString = item.StartDate;
                    DateTime parsedDate;
                    if (DateTime.TryParse(startdateString, out parsedDate))
                    {
                        worksheet.Cell(currentRow, 5).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 5).Value = startdateString; // or set some default/fallback value
                    }

                    string enddateString = item.EndDate;
                    DateTime parsedEndDate;
                    if (DateTime.TryParse(enddateString, out parsedEndDate))
                    {
                        worksheet.Cell(currentRow, 6).SetValue(parsedEndDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Value = enddateString; // or set some default/fallback value
                    }
                    worksheet.Cell(currentRow, 7).Value = item.Template;

                    string createdDateString = item.CreatedDate;
                    DateTime parsedcreatedDate;
                    if (DateTime.TryParse(createdDateString, out parsedcreatedDate))
                    {
                        worksheet.Cell(currentRow, 8).SetValue(parsedcreatedDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 8).Value = createdDateString; // or set some default/fallback value
                    }
                    worksheet.Cell(currentRow, 9).Value = item.Legacy;
                    //worksheet.Cell(currentRow, 10).Value = item.Division;
                    worksheet.Cell(currentRow, 10).Value = item.IsProjectPlanning;
                    worksheet.Cell(currentRow, 11).Value = item.IsHGHRequired;

                }

                worksheet.Column("1").Width = 10;
                worksheet.Column("2").Width = 40;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 12;
                worksheet.Column("6").Width = 12;
                worksheet.Column("7").Width = 12;
                worksheet.Column("8").Width = 12;
                worksheet.Column("9").Width = 8;
                //worksheet.Column("10").Width = 15;
                worksheet.Column("10").Width = 15;
                worksheet.Column("11").Width = 15;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "ProjectInitiationList.xlsx");
                }
            }

        }

        [HttpGet]
        public string GetProjectMasterHeaderData(string ProjectBriefId, string ItemName, string projectId, string startDate, string endDate, string template)
        {
            var result = projectMasterRepository.GetProjectMasterHeaderData(ProjectBriefId, ItemName, LoginId, projectId, startDate, endDate, template);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }

        [HttpGet]
        public JsonResult GetProjectBIList(string searchvalue)
        {
            var projectBIList = projectMasterRepository.GetProjectBIList(searchvalue);
            var values = projectBIList.ToArray();
            return Json(values);
        }

        [HttpPost]
        public IActionResult SaveAddProjectData(ProjectMasters projectMasters)
        {
            projectMasters.CreatedBy = HttpContext.Session.GetString("UserName");
            string result = projectMasterRepository.AddProjectData(projectMasters);

            if (result.ToLower().Contains("waiting"))
            {
                TempData["MessageClass"] = "alert-success";
                TempData["Message"] = result;
            }

            return Ok(result);
        }

        [HttpGet]
        public IActionResult CheckIsDuplicateProductExists(string ProjectCode, string Product)
        {
            var result = projectMasterRepository.CheckIsDuplicateProductExists(ProjectCode, Product);
            return Ok(result);
        }

        [HttpGet]
        public JsonResult GetProjectMasterViewData(string ProductCode)
        {
            var result = projectMasterRepository.GetViewProjectData(ProductCode);
            return Json(result);
        }

        [HttpPost]
        public IActionResult MapBriefToAdhocProject(string Product, string ProjectBriefId, string ProjectCode)
        {
            var result = projectMasterRepository.MapBriefToAdhocProject(Product, ProjectBriefId, ProjectCode, LoginId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult SaveBusinessProjectData(ProjectMasters projectMasters)
        {
            var result = projectMasterRepository.InsertUpdateProjectBusinessInfo(projectMasters.ProjectId, projectMasters.Product, projectMasters.BusinessJsonData, LoginId);
            return Ok(result);
        }

        public IActionResult SaveDivisionInfo()
        {
            try
            {
                var ProjectId = Convert.ToString(Request.Form["ProjectId"]);
                var DivisionId = Convert.ToInt32(Request.Form["DivisionId"]);
                var IsProjectPlanning = Convert.ToInt32(Request.Form["IsProjectPlanning"]);
                var IsHGHRequired = Convert.ToInt32(Request.Form["IsHGHRequired"]);
                var DocumentJson = Convert.ToString(Request.Form["DocumentJson"]);

                var files = Request.Form.Files;
                if (files.Count() > 0)
                {
                    DocumentJson = SaveHGHFile(files, DocumentJson);
                }

                var result = projectMasterRepository.SaveDivisionInfo(ProjectId, DivisionId, IsProjectPlanning, IsHGHRequired, DocumentJson, LoginId);
                var msg = result.Item1;
                var isMailAlreadySent = result.Item3;
                var isMailTriggered = "";

                if (msg != null && msg != "" && msg.ToLower().Contains("success") && IsHGHRequired == 1 && isMailAlreadySent == 0)
                {
                    isMailTriggered = SendHGHMailWithAttachement(ProjectId);
                    if (isMailTriggered == "success")
                    {
                        var data = projectMasterRepository.SaveIsHGHMailTriggered(1, ProjectId, LoginId);
                        return Ok(new { Item1 = "Data Updated And HGH Mail triggered Successfully", Item2 = "alert-success" });
                    }
                    else
                    {
                        var data = projectMasterRepository.SaveIsHGHMailTriggered(0, ProjectId, LoginId);
                        return Ok(new { Item1 = "Data Updated, But HGH Mail trigger failed. Please contact admin", Item2 = "alert-danger" });
                    }
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        public string SaveHGHFile(IFormFileCollection files, string DocumentJson)
        {
            try
            {
                var folder = Path.Combine(this.webHostEnvironment.WebRootPath,
                Configuration["HGHFileUpload:HGHFileUploadLocal"]);

                var documentCollection = JsonConvert.DeserializeObject<List<HGHDocumentCollection>>(DocumentJson);

                if (files != null)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        string UniqueFileName = RemoveSpecialChars(files[i].FileName);

                        var FileInfo = new FileInfo(files[i].FileName.ToString());
                        var name = FileInfo.Name;
                        var fileName = Path.GetFileNameWithoutExtension(name);
                        var fileExtension = FileInfo.Extension;

                        var newFileName = string.Concat(RemoveSpecialChars(fileName), fileExtension);

                        var filePath = Path.Combine(folder, newFileName);

                        bool existsFolder = Directory.Exists(filePath);

                        int indexToUpdate = documentCollection.FindIndex(item => item.DocId.ToString() == files[i].Name);
                        if (indexToUpdate != -1)
                        {
                            documentCollection[indexToUpdate].DocumentName = newFileName;
                        }
                        if (!existsFolder)
                        {
                            System.IO.Directory.CreateDirectory(folder);
                        }
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            files[i].CopyTo(fileStream);
                        }
                    }
                }

                var modifiedDocumentJson = JsonConvert.SerializeObject(documentCollection);
                return modifiedDocumentJson;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string SendHGHMailWithAttachement(string ProjectId)
        {
            try
            {
                var result = projectMasterRepository.GetHGHMailData(ProjectId, LoginId);
                var files = result.Item6;
                var fileStreams = new List<(string, MemoryStream)>();

                foreach (var fileName in files)
                {
                    var filePath = Path.Combine(this.webHostEnvironment.WebRootPath,
                        Configuration["HGHFileUpload:HGHFileUploadLocal"], fileName.DocName);
                    var bytes = System.IO.File.ReadAllBytes(filePath);
                    var stream = new MemoryStream(bytes);

                    fileStreams.Add((fileName.DocName, stream));
                }

                var isMailTriggered = SendMailWithMultipleAttachment.SendMailWithMultipleAttachmentMethod
                    (result.Item1, result.Item2, result.Item3, result.Item4, result.Item5, fileStreams);

                return isMailTriggered;
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }
        public IActionResult GetHGHSupportingDocument(string projectId)
        {
            var data = projectMasterRepository.GetHGHSupportingDocument(projectId, LoginId);
            return Ok(data);
        }
        public IActionResult DownloadHGHFile(string DocumentName)
        {
            try
            {
                var filePath = Path.Combine(this.webHostEnvironment.WebRootPath,
                    Configuration["HGHFileUpload:HGHFileUploadLocal"], DocumentName.Trim());
                byte[] bytes = System.IO.File.ReadAllBytes(filePath);
                return File(bytes, "application/octet-stream", DocumentName);
            }
            catch (Exception ex)
            {
                new Logger().LogError("NewProjectInitiationController", "DownloadHGHFile", ex.Message);
                return NotFound();
            }
        }

        public string NavigateProjectResource(string ProjectId)
        {
            HttpContext.Session.SetString("SearchedProjectId", ProjectId);
            return "1";
        }
        [HttpPost]
        public void SendProjectCode(string ProjectCode, string PageType)
        {
            var result = projectMasterRepository.PostProjectCode(ProjectCode, PageType).FirstOrDefault()?.Response;
            TempData["Message"] = result;
            TempData["MessageClass"] = "alert-success";
        }
        #endregion

        #region Template resource masters
        [HttpGet]
        public IActionResult TemplateResourceMaster()
        {
            TemplateData templateData = projectMasterRepository.GetTemplateData(LoginId);
            templateData.TemplateList = templateData.TemplateMaster.Select(m => new SelectListItem { Text = m.Description, Value = Convert.ToString(m.Key) });
            return View(templateData);
        }

        [HttpGet]
        public IActionResult GetTemplateMasterHeaderData(string TemplateId, string Role)
        {
            if (TemplateId != null)
            {
                HttpContext.Session.SetString("TemplateId", Convert.ToString(TemplateId));

            }
            TemplateData template = projectMasterRepository.GetTemplateMasterHeaderData(TemplateId, Role, LoginId);

            var responseData = new
            {
                TemplateData = template.TemplateMasterList,
                AddedResource = template.AddedResourceName

            };
            string jsonResponse = JsonConvert.SerializeObject(responseData);

            return Json(jsonResponse);

        }
        [HttpGet]
        public IActionResult GetResourceNames()
        {
            var resourceNames = projectMasterRepository.GetResourcesList();
            return Ok(resourceNames);
        }

        [HttpPost]
        public ActionResult UpdateTemplateMasterResource(string resourcesToSave)
        {
            try
            {
                var LoginId = HttpContext.Session.GetString("UserName")?.ToString();
                var result = projectMasterRepository.UpdateTemplateMasterResource(resourcesToSave, LoginId);
                return Json(new { success = result.Item2, message = result.Item1 });
            }
            catch (Exception ex)
            {
                return Json(new { success = "alert-danger", message = ex.Message });
            }

        }
        [HttpPost]
        public string TemplateResourceNameDelete(string TemplateId, string Role, string ResourceName)
        {
            var LoginId = HttpContext.Session.GetString("UserName")?.ToString();
            var result = projectMasterRepository.TemplateResourceNameDelete(TemplateId, Role, ResourceName, LoginId);
            return result.Item1;
        }
        [HttpGet]
        public ActionResult GetExcelTemplateMasterData(string templateId, string templateName)
        {

            var data = projectMasterRepository.GetExcelTemplateMasterData(templateId, LoginId);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Template Resource Master");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Role";
                worksheet.Cell(currentRow, 2).Value = "HOD";
                worksheet.Cell(currentRow, 3).Value = "Duration";
                worksheet.Cell(currentRow, 4).Value = "Unit";
                worksheet.Cell(currentRow, 5).Value = "Resources";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 5);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupedData = data.GroupBy(m => m.RoleId);
                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = firstItem.Role;
                    worksheet.Cell(currentRow, 2).Value = firstItem.HODName != " " && firstItem.HODName.Length > 0 ? firstItem.HODName.Remove(firstItem.HODName.Length - 1) : firstItem.HODName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.Duration;
                    worksheet.Cell(currentRow, 4).Value = firstItem.Unit;
                    worksheet.Cell(currentRow, 5).Value = firstItem.Resources;
                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 4; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }

                    }
                    worksheet.Column(2).Style.Alignment.WrapText = true;
                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.Role;
                        worksheet.Cell(currentRow, 2).Value = item.HODName;
                        worksheet.Cell(currentRow, 3).Value = item.Duration;
                        worksheet.Cell(currentRow, 4).Value = item.Unit;
                        worksheet.Cell(currentRow, 5).Value = item.Resources;

                    }
                    worksheet.Column(4).Style.Alignment.WrapText = true;
                    worksheet.Column("1").Width = 30;
                    worksheet.Column("2").Width = 50;
                    worksheet.Column("3").Width = 10;
                    worksheet.Column("4").Width = 20;
                    worksheet.Column("5").Width = 40;

                }
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Template Resource Master_" + templateName + ".xlsx");
                }
            }

        }
        #endregion

        #region project resource masters

        [HttpGet]
        public IActionResult ProjectResourceMaster()
        {
            ProjectResourceData prd = new ProjectResourceData();
            prd.ProjectsList = projectMasterRepository.GetProjectList(LoginId, Role);
            prd.ResourcesList = projectMasterRepository.GetResourcesList();
            prd.SearchedProjectId = HttpContext.Session.GetString("SearchedProjectId");
            return View(prd);
        }

        [HttpGet]
        public IActionResult GetProjectResoucesDetails(string ProjectId)
        {
            if (ProjectId == null)
            {
                ProjectId = "";
            }
            HttpContext.Session.SetString("SearchedProjectId", ProjectId);
            var result = projectMasterRepository.GetProjectResoruceData(ProjectId, Role, LoginId);
            ProjectResourceData prd = new ProjectResourceData();
            prd.ProjectHeaderData = result.ProjectHeaderData;
            prd.ProjectRoleDataList = result.ProjectRoleDataList;
            prd.ProjectRoleResourceDataList = result.ProjectRoleResourceDataList;
            return Ok(prd);
        }

        [HttpPost]
        public IActionResult DeleteProjectResourcesRoleResource(string ProjectId, string Resource, int RoleId)
        {
            var result = projectMasterRepository.DeleteProjectResourcesRoleResource(ProjectId, Resource, RoleId);
            var response = new
            {
                Message = result.Message,
                MessageClass = result.MessageClass
            };
            return Ok(response);
        }

        public IActionResult GetProjectResourcesMasterExcelData(string ProjectId)
        {
            var result = projectMasterRepository.GetResourceMasterExcelData(ProjectId, LoginId, Role);
            var fileName = ProjectId + "-" + "ProjectResourceMaster.xlsx";

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("ProjectResourceMaster");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Template Name";
                worksheet.Cell(currentRow, 2).Value = "Total Planned Budget (INR)";
                worksheet.Cell(currentRow, 3).Value = "Total Duration in Days";

                worksheet.Cell(currentRow, 4).Value = "Role Name";
                worksheet.Cell(currentRow, 5).Value = "HOD Name";
                worksheet.Cell(currentRow, 6).Value = "Unit";
                worksheet.Cell(currentRow, 7).Value = "Planned Budget (INR)";
                worksheet.Cell(currentRow, 8).Value = "Duration in Days";
                worksheet.Cell(currentRow, 9).Value = "Allocated Days";

                worksheet.Cell(currentRow, 10).Value = "Duration";
                worksheet.Cell(currentRow, 11).Value = "Resource Name";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 11);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                worksheet.Column("1").Width = 20;
                worksheet.Column("2").Width = 25;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 40;
                worksheet.Column("5").Width = 40;
                worksheet.Column("6").Width = 20;
                worksheet.Column("7").Width = 20;
                worksheet.Column("8").Width = 15;
                worksheet.Column("9").Width = 15;
                worksheet.Column("10").Width = 15;
                worksheet.Column("11").Width = 50;

                worksheet.Column(4).Style.Alignment.WrapText = true;
                worksheet.Column(5).Style.Alignment.WrapText = true;
                worksheet.Column(11).Style.Alignment.WrapText = true;

                worksheet.Column(2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Column(3).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Column(6).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Column(7).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Column(8).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Column(9).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Column(10).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                var groupedData = result.GroupBy(m => m.TemplateName);
                var currentRole = "";
                var roleSpan = 0;

                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();
                    currentRole = firstItem.RoleId;
                    roleSpan = group.Where(m => m.RoleId == currentRole).Count();

                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = firstItem.TemplateName;
                    worksheet.Cell(currentRow, 2).Value = firstItem.TotalPlannedBudget;
                    worksheet.Cell(currentRow, 3).Value = firstItem.TotalAssignedDuration;
                    worksheet.Cell(currentRow, 4).Value = firstItem.RoleName;
                    worksheet.Cell(currentRow, 5).Value = firstItem.HOD;
                    worksheet.Cell(currentRow, 6).Value = firstItem.Unit;
                    worksheet.Cell(currentRow, 7).Value = firstItem.PlannedBudget;
                    worksheet.Cell(currentRow, 8).Value = firstItem.AssignedDuration;
                    worksheet.Cell(currentRow, 9).Value = firstItem.RoleAllocatedDuration;
                    worksheet.Cell(currentRow, 10).Value = firstItem.Duration;
                    worksheet.Cell(currentRow, 11).Value = firstItem.ResourceName;

                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 3; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                        }
                    }

                    if (roleSpan > 1)
                    {
                        for (int i = 4; i <= 9; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + roleSpan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                        }
                    }

                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;

                        if (item.RoleId != currentRole)
                        {
                            currentRole = item.RoleId;
                            roleSpan = group.Where(m => m.RoleId == currentRole).Count();
                            if (roleSpan > 1)
                            {
                                for (int i = 4; i <= 9; i++)
                                {
                                    worksheet.Range(currentRow, i, currentRow + roleSpan - 1, i).Merge();
                                    worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                                }
                            }
                        }

                        worksheet.Cell(currentRow, 1).Value = item.TemplateName;
                        worksheet.Cell(currentRow, 2).Value = item.TotalPlannedBudget;
                        worksheet.Cell(currentRow, 3).Value = item.TotalAssignedDuration;
                        worksheet.Cell(currentRow, 4).Value = item.RoleName;
                        worksheet.Cell(currentRow, 5).Value = item.HOD;
                        worksheet.Cell(currentRow, 6).Value = item.Unit;
                        worksheet.Cell(currentRow, 7).Value = item.PlannedBudget;
                        worksheet.Cell(currentRow, 8).Value = item.AssignedDuration;
                        worksheet.Cell(currentRow, 9).Value = item.RoleAllocatedDuration;
                        worksheet.Cell(currentRow, 10).Value = item.Duration;
                        worksheet.Cell(currentRow, 11).Value = item.ResourceName;
                    }
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        fileName);
                }
            }
        }

        public string InsertUpdateProjectResourceMasterDetails(string RoleJsonData, string RoleResoruceJsonData, string ProjectId, string TemplateId)
        {
            var result = projectMasterRepository.InsertUpdateProjectResourceMasterDetails(RoleJsonData, RoleResoruceJsonData, ProjectId, TemplateId, LoginId);
            if (result.Message.ToLower().Contains("success"))
            {
                TempData["Message"] = result.Message;
                TempData["Messageclass"] = result.MessageClass;
            }
            return result.Message;
        }

        #endregion

        #region Master Pages

        [HttpGet]
        public IActionResult RoleHODMaster()
        {

            TemplateData templateData = projectMasterRepository.GetTemplateData(LoginId);
            templateData.TemplateList = templateData.TemplateMaster.Select(m => new SelectListItem { Text = m.Description, Value = Convert.ToString(m.Key) });
            return View(templateData);
        }

        [HttpGet]
        public IActionResult GetHODNames()
        {
            var hodNames = projectMasterRepository.GetHODNames();
            return Ok(hodNames);
        }

        [HttpGet]
        public string GetRoleHODMasterHeaderData(string TemplateName)
        {
            if (TemplateName != null)
            {
                HttpContext.Session.SetString("TemplateId", Convert.ToString(TemplateName));

            }
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

        [HttpGet]
        public IActionResult RoleCostCenterMaster()
        {

            RoleCostCenterMaster roleCostCenterMaster = projectMasterRepository.GetRoleCostCenterMasterData();
            return View(roleCostCenterMaster);

        }

        [HttpGet]
        public IActionResult GetRoleCostCenterMasterData()
        {

            RoleCostCenterMaster roleCostCenterMaster = projectMasterRepository.GetRoleCostCenterMasterData();
            var responseCostCenterData = new
            {

                RoleCostCenterMaster = roleCostCenterMaster.RoleCostCenterList,
                AddedCostCenter = roleCostCenterMaster.AddedCostCenterName
            };
            string jsonResponse = JsonConvert.SerializeObject(responseCostCenterData);
            return Json(jsonResponse);
        }

        [HttpPost]
        public string RoleCostCenterNameDelete(string Role, string CostCenterName)
        {
            var LoginId = HttpContext.Session.GetString("UserName")?.ToString();
            var result = projectMasterRepository.RoleCostCenterNameDelete(Role, CostCenterName, LoginId);
            return result.Message;
        }

        [HttpPost]
        public ActionResult UpdateRoleCostCenterName(string dataToSave)
        {
            var LoginId = HttpContext.Session.GetString("UserName")?.ToString();
            try
            {
                var result = projectMasterRepository.UpdateRoleCostCenterName(dataToSave, LoginId);

                return Json(new { success = result.Item2, message = result.Item1 });
            }
            catch (Exception ex)
            {
                return Json(new { success = "alert-danger", message = ex.Message });
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
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Role Cost Center");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Role";
                worksheet.Cell(currentRow, 2).Value = "Cost Center Name";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 2);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in data)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = item.Role;
                    worksheet.Cell(currentRow, 2).Value = item.CostCenterName.Replace(';', ',');


                }
                worksheet.Column(2).Style.Alignment.WrapText = true;
                worksheet.Column("1").Width = 50;
                worksheet.Column("2").Width = 100;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Cost Center Master.xlsx");
                }
            }
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

        #endregion

        #region Budget Pages

        #region DBU Mappings
        [EncryptedActionParameter]
        public IActionResult DepartmentBudgetUserMappings(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetActiveDepartments(ProjectId, "");

            projectMasters.ActiveDepartments = result.ActiveDepartments;
            projectMasters.Product = result.Product;
            projectMasters.ProjectId = ProjectId;
            projectMasters.NoOfDepartmentResources = result.Count;

            return View(projectMasters);
        }

        public IActionResult GetDepartmentUsers(string ProjectId, string Departments)
        {
            var data = projectMasterRepository.GetDepartmentUsers(ProjectId, Departments);
            var response = new
            {
                DefaultResources = data.DefaultResources,
                DepartmentResources = data.DepartmentResources
            };

            return Ok(response);
        }

        public IActionResult GetActiveDepartments(string ProjectId, string Departments)
        {
            var data = projectMasterRepository.GetActiveDepartments(ProjectId, Departments);
            var response = new
            {
                DepartmentDetails = data.ActiveDepartments,
                ActiveResourcePreview = data.ActiveResourcePreview
            };
            return Ok(response);
        }

        public string InsertUpdateDBUMappingDetails(string JsonData, string ProjectId, int Type)
        {
            var result = projectMasterRepository.InsertUpdateDBUMappingDetails(JsonData, ProjectId, LoginId, Type);
            if (result.Message.ToLower().Contains("success"))
            {
                TempData["Message"] = result.Message;
                TempData["Messageclass"] = result.MessageClass;
            }
            return result.Message;
        }

        public IActionResult DeleteProjectDepartmentResource(string ProjectId, string Resource, int RoleId)
        {
            var result = projectMasterRepository.DeleteProjectDepartmentResource(ProjectId, Resource, RoleId);
            var response = new
            {
                Message = result.Message,
                MessageClass = result.MessageClass
            };
            return Ok(response);
        }

        public IActionResult GetDBUMappingsExcelData(string ProjectId, string DepartmentId)
        {
            var data = projectMasterRepository.GetDBUMappingsExcelData(ProjectId, DepartmentId);
            var fileName = ProjectId + "-" + "DBUMappings.xlsx";

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("DBUMappings");
                var currentRow = 1;

                worksheet.Cell(currentRow, 1).Value = "Department Name";
                worksheet.Cell(currentRow, 2).Value = "HOD Name";
                worksheet.Cell(currentRow, 3).Value = "Resource Name";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 3);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                worksheet.Column("1").Width = 40;
                worksheet.Column("2").Width = 50;
                worksheet.Column("3").Width = 50;

                worksheet.Column(1).Style.Alignment.WrapText = true;
                worksheet.Column(2).Style.Alignment.WrapText = true;
                worksheet.Column(3).Style.Alignment.WrapText = true;

                var groupedData = data.GroupBy(m => m.RoleId);

                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = firstItem.Role;
                    worksheet.Cell(currentRow, 2).Value = firstItem.HOD;
                    worksheet.Cell(currentRow, 3).Value = firstItem.Resource;

                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 2; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                        }
                    }

                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;

                        worksheet.Cell(currentRow, 1).Value = item.Role;
                        worksheet.Cell(currentRow, 2).Value = item.HOD;
                        worksheet.Cell(currentRow, 3).Value = item.Resource;

                    }
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        fileName);
                }
            }
        }
        #endregion

        #region Budget Planning
        [HttpGet]
        public IActionResult BudgetPlanning()
        {
            TemplateData templateData = projectMasterRepository.GetTemplateData(LoginId);
            templateData.TemplateList = templateData.TemplateMaster.Select(m => new SelectListItem { Text = m.Description, Value = Convert.ToString(m.Key) });
            return View(templateData);
        }

        public JsonResult GetUsers()
        {
            var hodNames = projectMasterRepository.GetUsers();
            return Json(hodNames);
        }

        public JsonResult GetDepartmentResources()
        {
            var hodNames = projectMasterRepository.GetDepartmentResources();
            return Json(hodNames);
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
            var loginId = HttpContext.Session.GetString("UserName")?.ToString();
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters = projectMasterRepository.InsertRolePlaaningMasterData(budgetplaning, Templete, loginId);
            return Json(projectMasters);
        }
        #endregion

        public IActionResult BudgetRequestList()
        {
            return View();
        }

        public JsonResult GetBudgetPlanningList(string Status)
        {
            var data = projectMasterRepository.GetBudgetPlanningList(LoginId, Status);
            return Json(data);
        }

        //[EncryptedActionParameter]
        //public IActionResult ProjectBaselineBudget(string ProjectId)
        //{
        //    ProjectMasters projectMasters = new ProjectMasters();
        //    projectMasters.ProjectId = ProjectId;
        //    projectMasters.Role = Role;
        //    return View(projectMasters);
        //}
        [EncryptedActionParameter]
        public IActionResult ProjectBaselineBudget(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.ProjectId = ProjectId;
            projectMasters.Role = Role;
            projectMasters.DepartmentListMaster = projectMasterRepository.GetProjectBudgetDepartmentData(ProjectId, LoginId);
            projectMasters.DepartmentList = projectMasters.DepartmentListMaster.Select(m => new SelectListItem
            {
                Text = m.DepartmentName,
                Value = m.DepartmentId
            });
            return View(projectMasters);

        }

        [EncryptedActionParameter]
        public JsonResult GetProjectBaselineBudget(string ProjectId, string FromDate, string ToDate)
        {
            var data = projectMasterRepository.GetProjectBudgetPlanningData(ProjectId, LoginId);
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
        public IActionResult BaseLineBudgetApprovalPhase1(string ProjectId, string BudgetType, string PendingDeptFlag)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters.ProjectId = ProjectId;
            projectMasters.BudgetType = BudgetType;
            projectMasters.Role = Role;
            projectMasters.PendingDeptFlag = PendingDeptFlag;
            projectMasters.DepartmentListMaster = projectMasterRepository.GetProjectBudgetDepartmentData(ProjectId, LoginId);
            projectMasters.DepartmentList = projectMasters.DepartmentListMaster.Select(m => new SelectListItem
            {
                Text = m.DepartmentName,
                Value = m.DepartmentId
            });
            return View(projectMasters);
        }
        public JsonResult GetBudgetPendingDataForProject(string ProjectId, string BudgetType, string Department, string Category)
        {
            var data = projectMasterRepository.GetBudgetPendingDataForProject(ProjectId, BudgetType, Department, Category, LoginId);
            return Json(data);
        }
        public JsonResult SaveBaselineApprovalData(string selecteddata, string Remarks, string FromStage, string Action, string BudgetType, string ProjectId)
        {
            var data = projectMasterRepository.SaveBaselineApprovalData(selecteddata, Remarks, LoginId, FromStage, Action, BudgetType, ProjectId);
            return Json(data);
        }

        public IActionResult BaselineBudgetApproval()
        {
            return View();
        }
        public JsonResult SaveBudgetData(string ProjectId, string RequestedData, string FromStage, string Action, string Remarks, string BudgetType, string isSave = "No")
        {
            var data = projectMasterRepository.InsertBaselineBudgetData(ProjectId, RequestedData, LoginId, Remarks, isSave, FromStage, Action, BudgetType);
            return Json(data);
        }
        public JsonResult GetBudgetHistory(string ProjectId)
        {
            var data = projectMasterRepository.GetBudgetHistory(ProjectId, LoginId);
            return Json(data);
        }
        public IActionResult GetApprovalHistoryInfo(string projectId, string budgetReqNo, string DepartmentId, string Year, string Type, string Status)
        {
            var data = projectMasterRepository.GetApprovalHistoryInfo(projectId, budgetReqNo, LoginId, DepartmentId, Year, Type, Status);
            return Ok(data);
        }

        [HttpPost]
        public IActionResult AlterBudgetRequest(string ProjectId, int LatestYear, int PreviousYear, string EditedAmt, int type, int From, string BudgetReqNo, string Action, int FromStage, string RequestedAmount, string Remarks)
        {
            var result = projectMasterRepository.AlterBudgetRequest(ProjectId, LatestYear, PreviousYear, EditedAmt, type, From, LoginId, BudgetReqNo, Action, FromStage, RequestedAmount, Remarks);
            var response = new
            {
                Message = result.Message,
                MessageClass = result.MessageClass
            };
            return Ok(response);
        }

        public IActionResult BudgetApprovalPhase1()
        {
            return View();
        }
        public JsonResult GetBudgetPendingList(string Status)
        {
            var data = projectMasterRepository.GetBudgetPendingList(LoginId, Status);
            return Json(data);
        }
        public JsonResult GetApprovedDataForAdditionalPage(string ProjectId)
        {
            var data = projectMasterRepository.GetApprovedDataForAdditionalPage(ProjectId, LoginId);
            return Json(data);
        }
        public ActionResult GetExcelData_TeamRoleMaster()
        {
            var data = projectMasterRepository.GetExcelData_TeamRoleMaster();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("RoleTeamMasterData");

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

        public JsonResult SaveAdditionalRequestData(string ProjectId, String RequestedData, string FromStage, string Action)
        {
            var data = projectMasterRepository.SaveAdditionalRequestData(ProjectId, RequestedData, LoginId, FromStage, Action);
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
            return RedirectToAction("BaseLineBudgetApprovalPhase2", "NewProjectInitiation");
        }

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
        public JsonResult GetBudgetTransferList(string Department, string Year, string Status, string Type)
        {
            var data = projectMasterRepository.GetBudgetTransferList(Department, Year, Status, Type, LoginId);
            return Json(data);
        }

        [HttpPost]
        public IActionResult GetProjectTransferHistory(string ProjectId, string DepartmentId, string Year, string Type, string Status)
        {
            var data = projectMasterRepository.GetProjectTransferHistory(ProjectId, LoginId, DepartmentId, Year, Type, Status);
            return Ok(data);
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
            var result = projectMasterRepository.GetProjectDataToTransfer(ProjectId, LoginId);
            return Json(result);
        }
        public JsonResult GetProjectDataBasedOnYear(string ProjectId, string FromYear, string ToYear, string Department)
        {
            var result = projectMasterRepository.GetProjectDataBasedOnYear(ProjectId, FromYear, ToYear, Department, LoginId);
            return Json(result);
        }

        [HttpPost]
        //public IActionResult BudgetTransferSave(ProjectMasters projectmaster)
        //{
        //    var result = projectMasterRepository.SaveBudgetTrasferInformation(LoginId, projectmaster);
        //    TempData["Message"] = result.Item1;
        //    TempData["Messageclass"] = result.Item2;
        //    if (!string.IsNullOrEmpty(result.Item1))
        //    {
        //        HttpContext.Session.SetString("OutMessage", result.Item1);
        //    }
        //    return RedirectToAction("ProjectBudgetTransfer", "NewProjectInitiation");
        //}

        public IActionResult BudgetTransferSave(ProjectMasters projectmaster)
        {
            if (projectmaster.IsSave == "No")
            {
                var result = projectMasterRepository.Get_TransferDataForAPI(projectmaster.ProjectDataToSave, projectmaster.ProjectId).ToList();
                var url = result[0].URL;
                var username = result[0].UserName;
                var password = result[0].Password;
                var FromYearJson = result[0].FromYearJson;
                var ToYearJson = result[0].ToYearJson;
                var NegativeFromYearJson = result[0].NegativeFromYearJson;
                var msg = result[0].Status;
                var Response = result[0].Response;
                var resultMsg = "";
                if (msg.ToLower().Contains("success"))
                {
                    var response = MethodForTransfer(url, username, password, FromYearJson, projectmaster.ProjectId);

                    if (response is JsonResult jsonResponse)
                    {
                        var responseObject = jsonResponse.Value as dynamic;
                        var statusCode = responseObject?.StatusCode;
                        var remarks = responseObject?.Remarks;

                        if (statusCode == "OK" && remarks == "Budget was updated")
                        {
                            var Toresponse = MethodForTransfer(url, username, password, ToYearJson, projectmaster.ProjectId);

                            if (Toresponse is JsonResult ToJsonResponse)
                            {
                                var ToresponseObject = ToJsonResponse.Value as dynamic;
                                var TostatusCode = ToresponseObject?.StatusCode;
                                var Toremarks = ToresponseObject?.Remarks;

                                if (TostatusCode == "OK" && Toremarks == "Budget was updated")
                                {
                                    var data = projectMasterRepository.SaveBudgetTrasferInformation(LoginId, projectmaster);
                                    TempData["Message"] = data.Item1;
                                    TempData["MessageClass"] = data.Item2;
                                    if (!string.IsNullOrEmpty(data.Item1))
                                    {
                                        HttpContext.Session.SetString("OutMessage", TempData["Message"].ToString());
                                    }
                                }
                                else
                                {
                                    MethodForTransfer(url, username, password, NegativeFromYearJson, projectmaster.ProjectId);
                                    TempData["Message"] = Toremarks;
                                    TempData["MessageClass"] = "alert-danger";
                                    if (!string.IsNullOrEmpty(Toremarks))
                                    {
                                        HttpContext.Session.SetString("OutMessage", TempData["Message"].ToString());
                                    }
                                }
                            }
                        }
                        else
                        {
                            TempData["Message"] = remarks;
                            TempData["MessageClass"] = "alert-danger";
                            if (!string.IsNullOrEmpty(remarks))
                            {
                                HttpContext.Session.SetString("OutMessage", TempData["Message"].ToString());
                            }
                        }
                    }
                }
                else
                {
                    TempData["Message"] = "API data is not proper";
                    TempData["MessageClass"] = "alert-danger";
                    HttpContext.Session.SetString("OutMessage", "API data is not proper");
                }
            }
            else
            {
                var data = projectMasterRepository.SaveBudgetTrasferInformation(LoginId, projectmaster);
                TempData["Message"] = data.Item1;
                TempData["MessageClass"] = data.Item2;
                if (!string.IsNullOrEmpty(data.Item1))
                {
                    HttpContext.Session.SetString("OutMessage", data.Item1);
                }
            }
            return RedirectToAction("ProjectBudgetTransfer", "NewProjectInitiation");
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
                    var data = projectMasterRepository.SaveTrasferAPIResponse(JsonPayLoad, ResponseContent, ProjectId, LoginId);
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

        public JsonResult GetTransferToYearAndDepartment(string ProjectId, string FromYear)
        {
            var result = projectMasterRepository.GetTransferToYearAndDepartment(ProjectId, FromYear);
            return Json(result);
        }

        public IActionResult ProjectBudgetDetailsList()
        {
            ProjectMasters projectMasters = new ProjectMasters();
            var result = projectMasterRepository.GetProjectBudgetDetailsHeaderLists(LoginId);
            projectMasters.DepartmentValue = result.Item1;
            projectMasters.FromYearValue = result.Item2;
            projectMasters.ProjectTypeMaster = result.Item3;
            projectMasters.StatusList = result.Item4;
            projectMasters.ProjectMaster = JsonConvert.SerializeObject(result.Item5);
            projectMasters.Role = Role;
            return View(projectMasters);
        }

        public JsonResult GetProjectBudgetDetailsList(string ProjectId, string DepartmentId, string Year, string Type, string Status)
        {
            var result = projectMasterRepository.GetProjectBudgetDetailsList(LoginId, ProjectId, DepartmentId, Year, Type, Status);
            return Json(result);
        }

        public JsonResult GetYearWiseBudgetAndExpense(string ProjectId, string DepartmentId, string Year, string Type, string Status)
        {
            var result = projectMasterRepository.GetYearWiseBudgetAndExpense(ProjectId, DepartmentId, Year, Type, Status, LoginId);
            return Json(result);
        }

        public IActionResult GetBudgetAndExpenseBasedOnYear(string Project, string DepartmentId, string Year, string Type, string Status)
        {
            var result = projectMasterRepository.GetProjectDepartmentBudget(Project, DepartmentId, Year, Status, Type, LoginId);
            return Ok(result);
        }

        public IActionResult GetProjectDepartmentBudget(string ProjectId, string Department, string Year, string Status, string Type)
        {
            var result = projectMasterRepository.GetProjectDepartmentBudget(ProjectId, Department, Year, Status, Type, LoginId);
            return Ok(result);
        }

        public JsonResult GetSAPdifferenceProjectDetails()
        {
            var result = projectMasterRepository.GetSAPdifferenceProjectDetails();
            return Json(result);
        }

        public JsonResult GetSAPFailedInfo(string ReqNo, string Page)
        {
            var result = projectMasterRepository.GetSAPFailedInfo(ReqNo, Page);
            return Json(result);

        }
        [EncryptedActionParameter]
        public IActionResult ProjectBusinessValueList(string ProjectId)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            if (!string.IsNullOrEmpty(ProjectId))
            {
                projectMasters.ProjectsList = projectMasterRepository.PBV_HeadersList(LoginId, Role);
                projectMasters.ProjectDataList = projectMasterRepository.PBV_ProjectsDataList(ProjectId, LoginId, Role);
                HttpContext.Session.SetString("ProjectIdForBusiness", ProjectId);
            }
            else
            {
                projectMasters.ProjectsList = projectMasterRepository.PBV_HeadersList(LoginId, Role);
                HttpContext.Session.SetString("ProjectIdForBusiness", "All");

            }
            return View(projectMasters);
        }

        public IActionResult PBV_ProjectsDataList(string ProjectId)
        {
            var result = projectMasterRepository.PBV_ProjectsDataList(ProjectId, LoginId, Role);
            return Ok(result);
        }
        public IActionResult UploadBudgetFile([FromForm] ProjectMasters pm)
        {
            var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);
            var filePath = Path.Combine(uploadsFolder, pm.ProjectId.ToString(), pm.DepartmentId.ToString());
            var result = "";

            if (pm.PostedFile != null && pm.PostedFile.Count > 0)
            {
                result = projectMasterRepository.FileDetailsInsert(pm, LoginId).Item1;

                foreach (var postedFile in pm.PostedFile)
                {
                    var attachment = pm;

                    if (attachment != null)
                    {
                        var _newPath = filePath;

                        if (!Directory.Exists(_newPath))
                        {
                            Directory.CreateDirectory(_newPath);
                        }

                        var fileName = attachment.EnclosureName;

                        if (postedFile.Length > 0 && !string.IsNullOrEmpty(postedFile.FileName))
                        {
                            var path = Path.Combine(_newPath, fileName);

                            using (var stream = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.None))
                            {
                                postedFile.CopyTo(stream);
                            }
                        }
                    }
                }
            }

            return Json(result, new System.Text.Json.JsonSerializerOptions());
        }
        [HttpGet]
        public FileResult FileDownload(string docName, string projectId, int departmentId)
        {
            try
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);
                var filePath = uploadsFolder + "\\" + projectId.ToString() + "\\" + departmentId.ToString();
                var FileUploadPath = filePath + "\\" + docName;
                byte[] bytes = System.IO.File.ReadAllBytes(FileUploadPath);
                return File(bytes, "application/octet-stream", docName);
            }
            catch (Exception)
            {
                return File("", "application/octet-stream", "Try Again");
            }
        }
        [HttpGet]
        public IActionResult FileView(string docName, string projectId, int departmentId)
        {
            var uploadsFolder = Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"];
            var filePath = uploadsFolder + "\\" + projectId.ToString() + "\\" + departmentId.ToString();
            var FileUploadPath = filePath + "\\" + docName;
            return Ok(FileUploadPath);
        }
        public IActionResult GetFileDetails(string projectId)
        {
            var result = projectMasterRepository.GetFileList(projectId, LoginId);
            return Ok(result);
        }
        public IActionResult DeleteDocument(int EnclosureId)
        {
            var result = projectMasterRepository.DeleteDocumentData(EnclosureId);
            return Ok(result.Item1);
        }


        #endregion

        #region Material Master
        [HttpGet]
        public IActionResult MaterialMaster()
        {
            ProjectMasters pm = projectMasterRepository.GetMaterialDropDownData(LoginId);
            pm.DivisionList = pm.DivisionValue.Select(m => new SelectListItem
            {
                Text = m.DivisionName,
                Value = Convert.ToString(m.DivisionId)
            });
            pm.MaterialTypeList = pm.MaterialTypeValue.Select(m => new SelectListItem
            {
                Text = m.MaterialTypeName,
                Value = Convert.ToString(m.MaterialTypeId)
            });
            pm.PurchaseGroupList = pm.PurchaseGroupValue.Select(m => new SelectListItem
            {
                Text = m.PurchaseGroupName,
                Value = Convert.ToString(m.PurchaseGroupId)
            });
            return View(pm);
        }


        [HttpGet]
        public IActionResult GetMaterialDropDownList()
        {
            var result = projectMasterRepository.GetMaterialIdListdata();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetMaterialMasterList(string MaterialId, string Division, string MaterialType, int PurchaseGroup)
        {
            var result = projectMasterRepository.GetMaterialListdata(MaterialId, Division, MaterialType, PurchaseGroup, LoginId);
            return Ok(result);
        }
        [HttpGet]
        public IActionResult SyncMaterialList()
        {
            var result = projectMasterRepository.SyncMaterialListdata();
            return Ok(result);
        }
        #endregion

        #region PR Creation
        public IActionResult PRList()
        {
            PRCreation prCreation = new PRCreation();
            prCreation.Role = Role;
            prCreation.LoginId = LoginId;
            var result = projectMasterRepository.PR_GetListHeaderData(LoginId, Role);
            prCreation.PRNoList = JsonConvert.SerializeObject(result.PRNos);
            prCreation.FromDate = result.FromDate;
            return View(prCreation);
        }
        public IActionResult GetPRGridListData(string PRNo, string FromDate, string ToDate)
        {
            var result = projectMasterRepository.PR_GetListGridData(LoginId, Role, PRNo, FromDate, ToDate);
            return Ok(result);
        }
        public IActionResult GetPRDetailsData(long PRHeaderId)
        {
            var result = projectMasterRepository.PR_GetListDetailsData(PRHeaderId);
            return Ok(result);
        }
        public IActionResult GetPRModificationHistory(long PRDetailId)
        {
            var result = projectMasterRepository.GetPRModificationHistory(PRDetailId);
            return Ok(result);
        }
        public IActionResult CheckIsPRCanBeApproved(long PRHeaderId, string Action)
        {
            var result = projectMasterRepository.CheckIsPRCanBeApproved(PRHeaderId, Action);
            return Ok(result);
        }
        public IActionResult GetPRVendorData(long PRHeaderId)
        {
            var result = projectMasterRepository.PR_GetListVendorData(PRHeaderId);
            return Ok(result);
        }
        public IActionResult GetPRHistoryData(long PRHeaderId)
        {
            var result = projectMasterRepository.PR_GetListHistoryData(PRHeaderId);
            var response = new
            {
                Header = result.Header,
                Details = result.Details,
                LastValue = result.LastValue,
            };
            return Ok(response);
        }
        public IActionResult DeletePRData(long Id, string Remarks)
        {
            var result = projectMasterRepository.PR_ListCreationDelete(LoginId, Id, "PR", Remarks);
            return Ok(result);
        }
        public IActionResult PRListAction(string Type, long PRHeaderId, string RemarksJson)
        {
            var result = projectMasterRepository.PR_ListAction(LoginId, Role, Type, PRHeaderId, RemarksJson);
            return Ok(result);
        }

        [EncryptedActionParameter]
        public IActionResult PRCreation(string PRHeaderId, string IsInitiatorPR)
        {
            long id = PRHeaderId == null ? 0 : Convert.ToInt64(PRHeaderId);
            PRCreation prCreation = new PRCreation();
            prCreation.PRHeaderId = id;
            prCreation.Role = Role;
            prCreation.LoginId = LoginId;
            prCreation.IsInitiatorPR = Convert.ToInt32(IsInitiatorPR);
            var result = projectMasterRepository.PR_DropdownList(LoginId, Role, "CSHTML", id);
            prCreation.PRDropdownList = result.DropDownList;
            prCreation.StatusId = result.StatusId;

            return View(prCreation);
        }
        public IActionResult GetPRCreationData(long PRHeaderId)
        {
            PRCreation prCreation = new PRCreation();

            prCreation.PRHeaderId = PRHeaderId;
            var result = projectMasterRepository.PR_DropdownList(LoginId, Role, "", PRHeaderId);
            prCreation.PRDropdownList = result.DropDownList;
            prCreation.StatusId = result.StatusId;

            if (PRHeaderId > 0)
            {
                var data = projectMasterRepository.PR_DataList(LoginId, Role, PRHeaderId);

                prCreation.PRHeaderList = data.HeaderList;
                prCreation.PRDetailsList = data.DetailsList;
                prCreation.PRDocumentList = data.DocumentList;
            }

            return Ok(prCreation);
        }
        public IActionResult GetPRCreationDepedentData(string Department, string Category, string Value, string Type)
        {
            var data = projectMasterRepository.PR_DepedentDataList(LoginId, Role, Value, Type, Department, Category);
            return Ok(data);
        }
        public IActionResult GetPRCreationMaterialData(string Value, string MatType)
        {
            var data = projectMasterRepository.PR_MaterialDataList(LoginId, Role, Value, MatType);
            return Ok(data);
        }

        public IActionResult SaveOrApprovePRDetails()
        {
            var HeaderJson = Convert.ToString(Request.Form["HeaderJson"]);
            var DetailsJson = Convert.ToString(Request.Form["DetailsJson"]);
            var DocumentJson = Convert.ToString(Request.Form["DocumentJson"]);
            var RemarksJson = Convert.ToString(Request.Form["RemarksJson"]);
            var PRHeaderId = Convert.ToInt64(Request.Form["PRHeaderId"]);

            var files = Request.Form.Files;
            if (files.Count() > 0)
            {
                DocumentJson = SavePRVendorFile(files, DocumentJson);
            }

            var result = projectMasterRepository.PR_SaveOrApprovePRDetails(PRHeaderId, HeaderJson, DetailsJson, DocumentJson, RemarksJson, LoginId, Role);
            if (result != null && result.Item1.ToLower().Contains("success"))
            {
                TempData["Message"] = result.Item1;
                TempData["MessageClass"] = result.Item2;
            }

            return Ok(result.Item1);
        }
        public IActionResult DeletePRMaterialDetail(long Id)
        {
            var result = projectMasterRepository.PR_ListCreationDelete(LoginId, Id, "Material");
            return Ok(result);
        }
        public string SavePRVendorFile(IFormFileCollection files, string DocumentJson)
        {
            var folder = Path.Combine(this.webHostEnvironment.WebRootPath,
                Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);

            var documentCollection = JsonConvert.DeserializeObject<List<PRDocumentCollection>>(DocumentJson);

            if (files != null)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    string UniqueFileName = RemoveSpecialChars(files[i].FileName);

                    var FileInfo = new FileInfo(files[i].FileName.ToString());
                    var name = FileInfo.Name;
                    var fileName = Path.GetFileNameWithoutExtension(name);
                    var fileExtension = FileInfo.Extension;

                    var newFileName = string.Concat(RemoveSpecialChars(fileName), fileExtension);

                    var filePath = Path.Combine(folder, newFileName);

                    bool existsFolder = Directory.Exists(filePath);

                    int indexToUpdate = documentCollection.FindIndex(item => item.IsSaved == 0 && item.VendorDetailId.ToString() == files[i].Name);
                    if (indexToUpdate != -1)
                    {
                        documentCollection[indexToUpdate].DocumentName = newFileName;
                    }
                    if (!existsFolder)
                    {
                        System.IO.Directory.CreateDirectory(folder);
                    }
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        files[i].CopyTo(fileStream);
                    }
                }
            }

            var modifiedDocumentJson = JsonConvert.SerializeObject(documentCollection);
            return modifiedDocumentJson;
        }
        public IActionResult DeletePRVendorDetail(string FileName, long Id)
        {
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath,
            Configuration[$"BudgetRequestFileUpload:BudgetRequestFileUploadLocal"], FileName);
            try
            {
                var result = projectMasterRepository.PR_ListCreationDelete(LoginId, Id, "Vendor");
                if (result.Item1.ToLower().Contains("successfully"))
                {
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return Ok(new Tuple<string, string>(e.Message, "alert-danger"));
            }
        }
        public IActionResult DownloadPRVendorFile(string DocumentName)
        {
            try
            {
                var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration[$"BudgetRequestFileUpload:BudgetRequestFileUploadLocal"], DocumentName.Trim());
                byte[] bytes = System.IO.File.ReadAllBytes(filePath);
                return File(bytes, "application/octet-stream", DocumentName);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        public IActionResult PRTeamMaster()
        {
            return View();
        }
        public IActionResult GetPRRequestors()
        {
            var hodNames = projectMasterRepository.GetPRRequestors();
            return Ok(hodNames);
        }
        public IActionResult GetPRApprovers()
        {
            var hodNames = projectMasterRepository.GetPRApprovers();
            return Ok(hodNames);
        }
        public IActionResult PRTeamMasterList()
        {
            var resources = projectMasterRepository.GetPRTeamList();
            return Ok(resources);
        }
        [HttpPost]
        public JsonResult InsertPRTeamData(string UsersData)
        {
            ProjectMasters projectMasters = new ProjectMasters();
            projectMasters = projectMasterRepository.InsertPRTeamMasterData(UsersData, LoginId);
            return Json(projectMasters);
        }
        [HttpGet]
        public IActionResult GetPRTeamMasterExcelData()
        {
            var result = projectMasterRepository.GetPRTeamMasterExcelData();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("PR & Expenses Team Master");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Department";
                worksheet.Cell(currentRow, 2).Value = "HOD";
                worksheet.Cell(currentRow, 3).Value = "PR & Expenses Requestor";
                var headerRange = worksheet.Range(currentRow, 1, currentRow, 3);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.DepartmentName;
                    worksheet.Cell(currentRow, 3).Value = item.PRApprover;
                    worksheet.Cell(currentRow, 2).Value = item.PRRequestor;
                }
                worksheet.Column("1").Width = 40;
                worksheet.Column("2").Width = 60;
                worksheet.Column("3").Width = 60;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "PR & Expenses Team Master.xlsx");
                }
            }

        }
        #endregion

        #region Expenses Creation
        [HttpGet]
        public IActionResult ExpensesRequestList()
        {
            ExpensesRequest expesnes = projectMasterRepository.GetExpensesDropDownData(LoginId);
            expesnes.ProjectList = expesnes.ProjectValue.Select(m => new SelectListItem
            {
                Text = m.ProjectName,
                Value = Convert.ToString(m.ProjectId)
            });
            expesnes.DepartmentList = expesnes.DepartmentValue.Select(m => new SelectListItem
            {
                Text = m.DepartmentName,
                Value = Convert.ToString(m.DepartmentId)
            });
            expesnes.CategoryList = expesnes.CategoryValue.Select(m => new SelectListItem
            {
                Text = m.CategoryName,
                Value = Convert.ToString(m.value)
            });
            expesnes.Role = Role;
            expesnes.LoginId = LoginId;
            return View(expesnes);
        }
        [HttpGet]
        public IActionResult GetExpenseRequestList(string startDate, string endDate, string ProjectId, string DepartmentId, string CategoryId)
        {
            var result = projectMasterRepository.GetExpenseRequestList(startDate, endDate, ProjectId, DepartmentId, CategoryId, LoginId);
            return Ok(result);
        }
        [HttpGet]
        public IActionResult GetExpenseRequestDataById(string ExpenseRefId)
        {
            var result = projectMasterRepository.GetExpenseRequestDataById(ExpenseRefId);

            var response = new
            {
                Header = result.Item1,
                Details = result.Item2
            };

            return Ok(response);
        }
        [HttpGet]
        public IActionResult GetExpenseFiles(string ExpenseRefId)
        {
            var result = projectMasterRepository.GetExpenseFiles(ExpenseRefId);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult DeleteExpenses(string ExpenseRefId)
        {
            var result = projectMasterRepository.DeleteExpenseById(ExpenseRefId);
            TempData["Message"] = result.Item1;
            TempData["MessageClass"] = result.Item2;
            return Ok(result);
        }
        [HttpGet]
        public FileResult DownloadExpensesFile(string docName)
        {
            try
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);
                var filePath = uploadsFolder + "\\" + docName;
                byte[] bytes = System.IO.File.ReadAllBytes(filePath);
                return File(bytes, "application/octet-stream", docName);
            }
            catch (Exception)
            {
                return File("", "application/octet-stream", "Try Again");
            }
        }
        [HttpGet]
        public IActionResult ViewExpensesFile(string docName)
        {
            var uploadsFolder = Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"];
            var FileUploadPath = uploadsFolder + "\\" + docName;
            return Ok(FileUploadPath);
        }
        [HttpGet]
        public IActionResult GetExpenseHistory(string ExpenseRefId)
        {
            ExpensesRequest exp = projectMasterRepository.GetExpenseRequestHistory(ExpenseRefId);
            return Ok(exp);
        }
        [HttpPost]
        public IActionResult UpdateExpenseRequestStatus(string ExpenseRefId, string Action, string FromStage, string Remarks)
        {
            var result = projectMasterRepository.UpdateExpenseRequestStatus(ExpenseRefId, Action, FromStage, Remarks);
            TempData["Message"] = result.Item1;
            TempData["MessageClass"] = result.Item2;
            return Ok(result);
        }
        public IActionResult AddExpensesRequest()
        {
            ExpensesRequest expesnes = projectMasterRepository.GetExpensesDropDownData(LoginId);
            expesnes.ProjectList = expesnes.ProjectValue.Select(m => new SelectListItem
            {
                Text = m.ProjectName,
                Value = Convert.ToString(m.ProjectId)
            });
            expesnes.DepartmentList = expesnes.DepartmentValue.Select(m => new SelectListItem
            {
                Text = m.DepartmentName,
                Value = Convert.ToString(m.DepartmentId)
            });
            expesnes.CategoryList = expesnes.CategoryValue.Select(m => new SelectListItem
            {
                Text = m.CategoryName,
                Value = Convert.ToString(m.value)
            });

            expesnes.ModeOfTransportList = expesnes.ModeOfTransportValue.Select(m => new SelectListItem
            {
                Text = m.Name,
                Value = Convert.ToString(m.Id)
            });
            expesnes.Role = Role;
            expesnes.EmployeeName = userName;
            expesnes.LoginId = LoginId;

            return View(expesnes);
        }
        [EncryptedActionParameter]
        public IActionResult EditExpensesRequest(string ExpensesRefId, string StatusId, string ProjectId, string Department, string CategoryId)
        {
            ExpensesRequest expesnes = projectMasterRepository.GetExpensesDropDownData(LoginId);

            expesnes.ProjectList = expesnes.ProjectValue.Select(m => new SelectListItem
            {
                Text = m.ProjectName,
                Value = Convert.ToString(m.ProjectId)
            });
            expesnes.DepartmentList = expesnes.DepartmentValue.Select(m => new SelectListItem
            {
                Text = m.DepartmentName,
                Value = Convert.ToString(m.DepartmentId)
            });
            expesnes.CategoryList = expesnes.CategoryValue.Select(m => new SelectListItem
            {
                Text = m.CategoryName,
                Value = Convert.ToString(m.value)
            });
            expesnes.ModeOfTransportList = expesnes.ModeOfTransportValue.Select(m => new SelectListItem
            {
                Text = m.Name,
                Value = Convert.ToString(m.Id)
            });
            if (ExpensesRefId != null)
            {
                expesnes.ExpensesRefId = ExpensesRefId;
            }
            expesnes.Role = Role;
            expesnes.StatusId = StatusId;
            expesnes.EmployeeName = userName;
            expesnes.LoginId = LoginId;

            var result = projectMasterRepository.GetExpensesRequestDataToEdit(ExpensesRefId, LoginId);

            var number = projectMasterRepository.GetExpesnesMasterData(ExpensesRefId, LoginId, ProjectId, Department, CategoryId);
            expesnes.ExpensesRequestData = JsonConvert.SerializeObject(result);

            return View(expesnes);
        }
        public IActionResult GetExpesnesMasterData(string ExpensesRefId, string ProjectId, string Department, string CategoryId)
        {
            var result = projectMasterRepository.GetExpesnesMasterData(ExpensesRefId, LoginId, ProjectId, Department, CategoryId);
            return Json(new { BillrefNo = result.BillrefNo, ExpensesRefId = result.ExpensesRef, TotalBalance = result.TotalBalance, TotalBudget = result.TotalBudget, NatureOfExp = JsonConvert.SerializeObject(result.NatureOfExp) });
        }
        [HttpPost]
        public IActionResult InsertExpensesRequestData()
        {
            ExpensesRequest expenses = new ExpensesRequest();
            var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);

            var RequestedData = Convert.ToString(Request.Form["RequestedData"]);
            var ApprovalFlow = Convert.ToString(Request.Form["ApprovalFlow"]);
            var Remarks = Convert.ToString(Request.Form["Remarks"]);
            var DocumentJson = Convert.ToString(Request.Form["DocData"]);
            var ExpRefNo = Convert.ToString(Request.Form["ExpRefNo"]);
            var DepartmentId = Convert.ToString(Request.Form["DepartmentId"]);
            var EmployeeCode = Convert.ToString(Request.Form["EmployeeCode"]);
            var UTRDocumentJson = Convert.ToString(Request.Form["UTRDocData"]);

            var files = Request.Form.Files;

            if (files.Count() > 0)
            {
                DocumentJson = SaveExpensesFile(files, DocumentJson);
                RequestedData = SaveExpensesFileWithUTRUpdate(files, UTRDocumentJson, RequestedData);
            }
            var result = projectMasterRepository.InsertExpensesRequestData(
                ExpRefNo,DepartmentId,EmployeeCode,RequestedData, DocumentJson, Remarks, ApprovalFlow, LoginId
            );

            TempData["Message"] = result.Item1;
            TempData["MessageClass"] = result.Item2;

            return Ok(result.Item1);
        }
        public IActionResult DeleteSupportingDoc(string ExpensesRefId, string docName, string docId)
        {
            try
            {
                var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"], docName);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                var result = projectMasterRepository.DeleteExpensesSupportingDoc(ExpensesRefId, docId);
                return Ok(result);
            }

            catch (IOException ioExp)
            {
                return Ok(ioExp.Message);
            }
        }
        public IActionResult ApproveOrRejectTheExpenses(string Remarks, string ApprovalFlow, string ExpensesRefId)
        {
            var result = projectMasterRepository.ApproveOrRejectTheExpenses(Remarks, ApprovalFlow, ExpensesRefId, LoginId);

            if (result.Item1.ToLower().Contains("success"))
            {
                TempData["Message"] = result.Item1;
                TempData["MessageClass"] = result.Item2;
            }

            return Ok(result.Item1);
        }
        public IActionResult GetEmployeeData(string DepartmentId)
        {
            var result = projectMasterRepository.GetEmployeeData(DepartmentId, LoginId);
            return Json(result);
        }

        #endregion

        #region API
        public JsonResult APISync()
        {
            var ProjResult = MethodForAPI("ProjectView");
            var BudgetResult = MethodForAPI("BudgetView");
            var ExpensesResult = MethodForAPI("ExpenseView");
            var result = ProjResult + "," + BudgetResult + "," + ExpensesResult;
            return Json(result);
        }
        public string MethodForAPI(string type)
        {
            var result = projectMasterRepository.APICredentials_Get(type).ToList();
            var syncdata = type;
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
            return msg;
        }
        #endregion

        #region Budget Details Report
        public IActionResult BudgetDetailsReport()
        {
            ProjectMasters proj = new ProjectMasters();
            var result = projectMasterRepository.GetProjectIdforReport(LoginId, Role);
            proj.Projects = JsonConvert.SerializeObject(result.ProjectValue);
            proj.StatusValue = JsonConvert.SerializeObject(result.StatusValue);
            proj.Departments = JsonConvert.SerializeObject(result.DepartmentValue);
            return View(proj);
        }
        public IActionResult GetBudgetReport(string ProjectId, string fromDate, string toDate, string Status, string Department)
        {
            var result = projectMasterRepository.GetProjectIdReportDetails(ProjectId, fromDate, toDate, Status, Department, LoginId, Role);
            return Json(result);
        }

        public string SaveExpensesFile(IFormFileCollection files, string DocumentJson)
        {
            var folder = Path.Combine(this.webHostEnvironment.WebRootPath,
                Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);

            var documentCollection = JsonConvert.DeserializeObject<List<ExpensesDocument>>(DocumentJson);

            if (files != null)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files[i].Name.Contains("_S"))
                    {
                        string UniqueFileName = RemoveSpecialChars(files[i].FileName);

                        var FileInfo = new FileInfo(files[i].FileName.ToString());
                        var name = FileInfo.Name;
                        var fileName = Path.GetFileNameWithoutExtension(name);
                        var fileExtension = FileInfo.Extension;

                        var newFileName = string.Concat(RemoveSpecialChars(fileName), fileExtension);

                        var filePath = Path.Combine(folder, newFileName);

                        bool existsFolder = Directory.Exists(filePath);

                        int indexToUpdate = documentCollection.FindIndex(item => item.DocId.ToString() == files[i].Name);
                        if (indexToUpdate != -1)
                        {
                            documentCollection[indexToUpdate].DocumentName = newFileName;
                        }
                        if (!existsFolder)
                        {
                            System.IO.Directory.CreateDirectory(folder);
                        }
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            files[i].CopyTo(fileStream);
                        }
                    }
                }
            }
           var modifiedDocumentJson = JsonConvert.SerializeObject(documentCollection);
            return modifiedDocumentJson;
        }

        public string SaveExpensesFileWithUTRUpdate(IFormFileCollection files, string DocumentJson , string RequestedData)
        {
            var folder = Path.Combine(this.webHostEnvironment.WebRootPath,
                Configuration["BudgetRequestFileUpload:BudgetRequestFileUploadLocal"]);

            var documentCollection = JsonConvert.DeserializeObject<List<ExpensesDocument>>(DocumentJson);
            var requestedDataCollection = JsonConvert.DeserializeObject<List<ExpensesRequestDetails>>(RequestedData);

            if (files != null)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files[i].Name.Contains("_U"))
                    {
                        string UniqueFileName = RemoveSpecialChars(files[i].FileName);
                        var docId = files[i].Name.Split('_')[0];
                        var FileInfo = new FileInfo(files[i].FileName.ToString());
                        var name = FileInfo.Name;
                        var fileName = Path.GetFileNameWithoutExtension(name);
                        var fileExtension = FileInfo.Extension;

                        var newFileName = string.Concat(RemoveSpecialChars(fileName), fileExtension);

                        var filePath = Path.Combine(folder, newFileName);

                        bool existsFolder = Directory.Exists(filePath);

                        int indexToUpdate = documentCollection.FindIndex(item => item.DocId.ToString() == files[i].Name);
                        if (indexToUpdate != -1)
                        {
                            documentCollection[indexToUpdate].DocumentName = newFileName;
                        }
                        var reqIndex = requestedDataCollection.FindIndex(r => r.DetailsId.ToString() == docId);
                        if (reqIndex != -1 && indexToUpdate != -1)
                        {
                            requestedDataCollection[reqIndex].UTRDocument = newFileName;
                        }
                        if (!existsFolder)
                        {
                            System.IO.Directory.CreateDirectory(folder);
                        }
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            files[i].CopyTo(fileStream);
                        }
                    }
                }
            }

            var modifiedDocumentJson = JsonConvert.SerializeObject(requestedDataCollection);
            return modifiedDocumentJson;
        }
        #endregion

    }
}