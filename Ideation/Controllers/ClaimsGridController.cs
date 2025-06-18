
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using OfficeOpenXml;
using HtmlAgilityPack;
using OfficeOpenXml.Style;
using Ideation.Common;
using ClosedXML.Excel;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class ClaimsGridController : BaseController
    {
        private readonly IConfiguration? Configuration;
        private readonly IWebHostEnvironment webHostEnvironment;
        IClaimsGridRepository claimsRepository;
        public ClaimsGridController(IClaimsGridRepository claimsRepository, IWebHostEnvironment webHostEnvironment, IConfiguration Configuration) : base()
        {
            this.claimsRepository = claimsRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = Configuration;
        }
        public IActionResult ClaimsGridDocument()
        {
            ClaimsGridDocument claims = new ClaimsGridDocument();
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var GridList = claimsRepository.GetClaimsGridProjectsBasedOnUser(UserId);
            claims.UserRole = GridList.Role;
            claims.UserDepartment = GridList.Department;
            var result = claimsRepository.GetStatusList();
            claims.Statuses = JsonConvert.SerializeObject(result);
            claims.JSONClaimsGridData = JsonConvert.SerializeObject(GridList);
            var role = HttpContext.Session.GetString("Role") ?? string.Empty;
            claims.Role = role;
            claims.LoginId = UserId;
            var DivisionList = claimsRepository.GetDivisionList();
            claims.DivisionList = DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            return View("ClaimsGridDocumentV2", claims);
        }

        public JsonResult GetUserEmailBasedOnDept(string deptIds)
        {
            var User = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = claimsRepository.GetUserEmailBasedOnDept(User, deptIds);
            var jsonResult = Json(result);
            return jsonResult;
        }

        [HttpGet]
        public IActionResult AddGridDocument()
        {
            ClaimsGridDocument claims = new ClaimsGridDocument();
            var User = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = claimsRepository.GetProjectList();
            var DeptList = claimsRepository.GetDeptList();
            var UserDept = claimsRepository.GetUserDeptName(User);
            //DeptList = DeptList.Where(m => m.DeptName != UserDept).ToList();
            var LicenseCategoryList = claimsRepository.GetLicenseCategoryList();
            claims.ProjectList = result.Select(m => new SelectListItem { Text = m.ProjectCode != "Others" ? m.ProjectCode + "-" + m.ProjectName : m.ProjectName, Value = m.ProjectCode.ToString() });
            claims.DeptList = DeptList.Select(m => new SelectListItem { Text = m.DeptName, Value = m.DeptName.ToString() });
            claims.LicenseCategoryList = LicenseCategoryList.Select(m => new SelectListItem { Text = m.LicenseCategory, Value = m.LicenseId.ToString() });
            var HubList = claimsRepository.GetHubList();
            claims.HubList = HubList.Select(m => new SelectListItem { Text = m.HUBName, Value = m.HUBName.ToString() });

            var DivisionList = claimsRepository.GetDivisionList();
            claims.DivisionList = DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });

            var PMDUsers = claimsRepository.GetPMDUsersList();
            claims.PMDUsersList = PMDUsers.Select(m => new SelectListItem { Text = m.UserName, Value = m.UserId.ToString() });

            return View("AddGridDocumentV2", claims);
        }

        [HttpPost]
        public IActionResult AddGridDocument(ClaimsGridDocument claimsObj)
        {
            claimsObj.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            if (claimsObj.GridId == "" || claimsObj.GridId == null)
            {
                var result = claimsRepository.AddClaimsData(claimsObj);
                if (result.Item1.Equals("Successfully Saved"))
                {
                    TempData["Message"] = result.Item1;
                    TempData["MessageClass"] = "alert-success";

                }
                else
                {
                    TempData["Message"] = result.Item1;
                    TempData["MessageClass"] = "alert-danger";
                }
            }
            else
            {
                var result = claimsRepository.UpdateClaimsData(claimsObj);
                if (result.Equals("Successfully Updated"))
                {
                    TempData["Message"] = result;
                    TempData["MessageClass"] = "alert-success";

                }
                else
                {
                    TempData["Message"] = result;
                    TempData["MessageClass"] = "alert-danger";
                }
            }
            return RedirectToAction("ClaimsGridDocument", "ClaimsGrid");
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult EditGridDocument(string ProjectNumber, string StatusId, string IsEdit, string GridId)
        {
            ClaimsGridDocument claims = new ClaimsGridDocument();
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            claims.ProjectNumber = ProjectNumber;
            var role = HttpContext.Session.GetString("Role") ?? string.Empty;
            claims.Role = role;
            ViewBag.isEdit = IsEdit;
            var data = claimsRepository.GetClaimsData(ProjectNumber, UserId, StatusId, GridId);
            claims.Stage = int.Parse(StatusId);
            claims.GridId = data.GridId;
            claims.CFTDeptName = data.CFTDeptName;
            claims.MustHaveClaims = data.MustHaveClaims;
            claims.NiceToHaveClaims = data.NiceToHaveClaims;
            claims.ProjectBriefId = data.ProjectBriefId;
            claims.RephraseClaims = data.RephraseClaims;
            claims.LoginId = UserId;
            var result = claimsRepository.GetProjectList();
            claims.ProjectList = result.Select(m => new SelectListItem { Text = m.ProjectCode + "-" + m.ProjectName, Value = m.ProjectCode.ToString() });

            claims.GridId = data.GridId;

            var UserDept = data.CFTDeptName;

            var DeptList = claimsRepository.GetDeptList();
            if (StatusId == "3")
            {
                var CFTReviewData = claimsRepository.GetCFTReviewData(ProjectNumber, UserId);
                claims.JsonCFTReviewData = JsonConvert.SerializeObject(CFTReviewData);
                claims.CFTUploadedDocumentDetails = data.CFTUploadedDocumentDetails;
            }
            if (claims.Stage > 3)
            {
                var result1 = claimsRepository.Fetch_CFT_ClaimsWithRemarks(ProjectNumber, "OnPack", "OnPack", claims.GridId);
                var result2 = claimsRepository.Fetch_CFT_ClaimsWithRemarks(ProjectNumber, "Communication", "Communication", claims.GridId);
                data.OnPackClaimsWithRemarks = JsonConvert.SerializeObject(result1);
                data.CommunicationClaimsWithRemarks = JsonConvert.SerializeObject(result2);
                data.DepartmentList = JsonConvert.SerializeObject(DeptList);
            }
            claims.JsonClaimsData = JsonConvert.SerializeObject(data);
            //DeptList = DeptList.Where(m => m.DeptName != UserDept).ToList();
            claims.DeptList = DeptList.Select(m => new SelectListItem { Text = m.DeptName, Value = m.DeptName.ToString() });

            var LicenseCategoryList = claimsRepository.GetLicenseCategoryList();
            claims.LicenseCategoryList = LicenseCategoryList.Select(m => new SelectListItem { Text = m.LicenseCategory, Value = m.LicenseId.ToString() });

            var HubList = claimsRepository.GetHubList();
            claims.HubList = HubList.Select(m => new SelectListItem { Text = m.HUBName, Value = m.HUBName.ToString() });

            var DivisionList = claimsRepository.GetDivisionList();
            claims.DivisionList = DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });

            var PMDUsers = claimsRepository.GetPMDUsersList();
            claims.PMDUsersList = PMDUsers.Select(m => new SelectListItem { Text = m.UserName, Value = m.UserId.ToString() });

            var DeptListForSendMail = claimsRepository.GetDeptListForSendMail();
            claims.DeptListForSendMail = DeptListForSendMail.Select(m => new SelectListItem { Text = m.DeptName, Value = m.DeptName.ToString() });

            return View("EditGridDocumentV2", claims);
        }

        [HttpPost]
        public IActionResult EditGridDocument(ClaimsGridDocument claimsObj)
        {
            claimsObj.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var Stage = claimsObj.Stage;
            var result = "";
            if (Stage == 2)
            {
                result = claimsRepository.UpdateClaimsData(claimsObj);
            }
            if (Stage == 3)
            {
                result = claimsRepository.AddUpdateCFTReview(claimsObj);
            }
            if (Stage >= 4)
            {
                result = claimsRepository.AddUpdateDSGReview(claimsObj);
            }


            if (result.Equals("Successfully Updated"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";

            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }
            return RedirectToAction("ClaimsGridDocument", "ClaimsGrid");
        }


        public JsonResult GetDataByProjectNo(string projNo)
        {
            var result = claimsRepository.GetDataByProjectNo(projNo);

            return Json(result);
        }
        public JsonResult GetRquiredClaimsDetails(string projNo)
        {
            var result = claimsRepository.GetRquiredClaimsDetails(projNo);

            return Json(result);
        }

        public IActionResult DeleteClaimsRecord(string GridId)
        {
            var result = claimsRepository.DeleteClaimsRecord(GridId);

            if (result.Equals("Successfully Deleted"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";

            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }
            return RedirectToAction("ClaimsGridDocument", "ClaimsGrid");
        }


        public JsonResult DeleteClaimsRemarksFiles(string FileName, string ProjectNumber, string ClaimsId, string Type, string GridId)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration[$"ISpaceFileUpload:ClaimsReviewFiles"], FileName.Trim());
            var isExists = System.IO.File.Exists(filePath);
            try
            {
                var result = claimsRepository.DeleteClaimsRemarksRecord(ProjectNumber, ClaimsId, UserId, Type, GridId);
                if (result == "File is removed successfully")
                {
                    if (System.IO.File.Exists(filePath))
                    {
                        // If file found, delete it    
                        System.IO.File.Delete(filePath);
                    }
                }
                return Json(result);
            }
            catch (IOException e)
            {
                return Json(e.Message);
            }
        }
        public JsonResult GetExistingClaimsProjectList()
        {
            var result = claimsRepository.GetExistingClaimsProjectList();

            return Json(result);
        }

        public JsonResult CFTStatusInfo(string ProjectNo, string GridId)
        {
            var result = claimsRepository.GetClaimsGridCFTApprovalStatus(ProjectNo, GridId);

            return Json(result);
        }
        public JsonResult GetCFTRemarksBasedOnDept(string ProjectNo, string DeptName, string GridId)
        {
            var result = claimsRepository.GetCFTRemarksBasedOnDept(ProjectNo, DeptName, GridId);

            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveSupportingDocument(IFormFile file)
        {
            var Data = "";

            if (file != null)
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:Pdfuploads"]);

                var FileInfo = new FileInfo(file.FileName.ToString());
                var name = FileInfo.Name;
                var fileName = Path.GetFileNameWithoutExtension(name);
                var FileExtension = FileInfo.Extension;

                var newFileName = string.Concat(RemoveSpecialChars(fileName), FileExtension);

                var filePath = Path.Combine(uploadsFolder, newFileName);

                bool existsFolder = Directory.Exists(filePath);

                if (!existsFolder)
                {
                    System.IO.Directory.CreateDirectory(uploadsFolder);
                }

                Data = System.Text.Json.JsonSerializer.Serialize(newFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                return Json(Data);
            }
            else
            {
                return Json(Data);
            }
        }
        [HttpPost]
        public JsonResult SaveClaimsDocument(IFormFile file)
        {
            var Data = "";

            if (file != null)
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:ClaimsReviewFiles"]);

                var FileInfo = new FileInfo(file.FileName.ToString());
                var name = FileInfo.Name;
                var fileName = Path.GetFileNameWithoutExtension(name);
                var FileExtension = FileInfo.Extension;

                var newFileName = string.Concat(RemoveSpecialChars(fileName), FileExtension);

                var filePath = Path.Combine(uploadsFolder, newFileName);

                bool existsFolder = Directory.Exists(filePath);

                if (!existsFolder)
                {
                    System.IO.Directory.CreateDirectory(uploadsFolder);
                }

                Data = System.Text.Json.JsonSerializer.Serialize(newFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                return Json(Data);
            }
            else
            {
                return Json(Data);
            }
        }

        public JsonResult AutoSave(ClaimsGridDocument information)
        {
            //var data = JsonObject.Parse(information);
            information.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = claimsRepository.AddClaimsData(information);
            return Json(result);
        }
        public JsonResult AutoUpdate(ClaimsGridDocument information)
        {
            information.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = claimsRepository.UpdateClaimsData(information);
            return Json(result);
        }
        public async Task<IActionResult> DownloadDocumentFile(string fileName, string location = "Pdfuploads")
        {
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration[$"ISpaceFileUpload:{location}"], fileName);
            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                var FileName = System.IO.Path.GetFileName(filePath);
                new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(filePath), out var contentType);
                return File(fileBytes, contentType ?? "application/octet-stream", FileName);
            }
            else
            {
                return NotFound();
            }
        }
        //public void DeleteDocumentFile(string fileName, string location = "Pdfuploads")
        //{
        //    var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration[$"ISpaceFileUpload:{location}"], fileName);

        //    if (System.IO.File.Exists(filePath))
        //    {
        //        // If file found, delete it    
        //        System.IO.File.Delete(filePath);
        //    }
        //}
        public PartialViewResult GenerateClaimsPdf(string ProjectNumber, string GridId)
        {
            //var ProjectDetails = JObject.Parse(ProjectId);
            var User = HttpContext.Session.GetString("UserName") ?? string.Empty;
            ClaimsPdf data = new ClaimsPdf();
            if (GridId != null)
            {
                //var projectNumber = (string)ProjectDetails.GetValue("ProjectNumber");
                //var gridId = (string)ProjectDetails.GetValue("GridId");
                //data.ProjectNumber = (string)ProjectDetails.GetValue("ProjectNumber");
                //data.GridId = (string)ProjectDetails.GetValue("GridId");
                //data.ProductName = (string)ProjectDetails.GetValue("ProductName");
                //data.HGLApprovalNumber = (string)ProjectDetails.GetValue("HGLApprovalNumber");
                //data.ProductDescription = (string)ProjectDetails.GetValue("ProjectDescription");
                //data.CreatedDate = (string)ProjectDetails.GetValue("CreatedDate");
                data = claimsRepository.getClaimsInformation(User, ProjectNumber, "1", GridId);
                data.ProductDescrtionDetails = claimsRepository.getClaimsProductionDescritpionDetials(User, data.ProjectNumber, "2", GridId);
                if (data.ProductDescrtionDetails != null && data.ProductDescrtionDetails.ToList().Count > 0)
                {
                    data.TargetCustomer = data.ProductDescrtionDetails.ToList().Find(item => item.LabelName == "TargetCustomer").Description;
                }
                data.OnPackLabelClaimsDetails = claimsRepository.getPackLabelOrCommunicationDetails(User, data.ProjectNumber, "3", GridId);
                data.ClaimsForCommunication = claimsRepository.getPackLabelOrCommunicationDetails(User, data.ProjectNumber, "4", GridId);

                var pdfdata = claimsRepository.GetClaimsApprovalData_PDF(GridId);
                data.DSGTeamApprovalData = pdfdata.DSGTeamApprovalData;
                data.CFTTeamApprovalData = pdfdata.CFTTeamApprovalData;
                // data.DSGReviewTeamApprovalData = pdfdata.DSGReviewTeamApprovalData;
                data.DSGManagerApprovalData = pdfdata.DSGManagerApprovalData;
                data.DSGSignOffApprovalData = pdfdata.DSGSignOffApprovalData;
                //data.AddendumApprovalData = pdfdata.AddendumApprovalData;
                data.AddendumRemarks = pdfdata.AddendumRemarks;
            }

            return PartialView(data);
        }
        public JsonResult GeneratePdfHtml(PdfData data)
        {
            var html = data.JsonString;
            //var htmlHeader = data.JsonHeaderString;
            html = html.Replace("strtTag", "<").Replace("EndTag", ">");
            //htmlHeader = htmlHeader.Replace("strtTag", "<").Replace("EndTag", ">");
            HttpContext.Session.SetString("HtmlData", html);

            // HttpContext.Session.SetString("HtmlHeaderData", htmlHeader);
            return Json("", new System.Text.Json.JsonSerializerOptions());
        }
        public FileResult GeneratePdf(string ProjectId, string Type, [FromServices] IWebHostEnvironment env)
        {
            try
            {
                var html = HttpContext.Session.GetString("HtmlData");
                long ticks = DateTime.Now.Ticks;
                if (!Directory.Exists(Path.Combine(env.WebRootPath, "PDFDownload")))
                {
                    Directory.CreateDirectory(Path.Combine(env.WebRootPath, "PDFDownload"));
                }
                var filePath = Path.Combine(env.WebRootPath, "PDFDownload", "Claimspdf_" + ticks + ".pdf");

                //var projectData = npdRepository.GetProjectDetailsForSendMail(ProjectId).SingleOrDefault();

                new PdfHeader().ManipulatePdf(html, filePath);

                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                //string fileName = ProjectId +"_"+ projectData.ProjectName + ".pdf";
                string fileName;
                string sanitizedProjectName = Regex.Replace("Claims", @"[^\w\d\s]", string.Empty);

                if (sanitizedProjectName.Length > 200)
                {
                    fileName = $"{ProjectId}_{sanitizedProjectName.Substring(0, 185)}.pdf";
                }
                else
                {
                    fileName = $"{ProjectId}_{sanitizedProjectName}.pdf";
                }

                return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);

            }

            catch (Exception ex)
            {
                //LogError("New Initiation", "GeneratePDF", ex);
                return null;
            }

        }
        public JsonResult ClaimsGridDisplayfilter(string ProjectNo, string Status, string Division)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = claimsRepository.getFilterClaimsGridList(UserId, ProjectNo, Status, Division);
            return Json(result);
        }
        public JsonResult FetchCFTRemarks(string ProjectNumber, string TypeOfClaimsRemarks, string TypeOfCFT, string GridId)
        {
            var result = claimsRepository.Fetch_CFT_ClaimsDetails(ProjectNumber, TypeOfClaimsRemarks, TypeOfCFT, GridId);
            return Json(result);
        }
        public JsonResult FetchFormHistoryDetails(string GridId, string ProjectNumber)
        {
            var result = claimsRepository.FetchFormHistoryDetails(GridId, ProjectNumber);
            return Json(result);
        }
        private string ConvertHtmlToPlainText(string htmlContent)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlContent);
            return doc.DocumentNode.InnerText;
        }

        private string AddBulletPoints(string text)
        {
            // Replace line breaks with bullet points
            text = text.Replace("\n", "\n\u2022 ");
            text = text.Replace("<p>", "");
            text = text.Replace("<\\p>", "");
            text = text.Replace("&nbsp;", " ");
            return text;
        }
        string ProcessHTMLListsForExcel(string html)
        {
            // Process ordered lists (<ol>)
            html = Regex.Replace(html, @"<ol>([\s\S]*?)<\/ol>", match =>
            {
                string p1 = match.Groups[1].Value;
                string[] listItems = p1.Split("<li>").Select(item => item.Trim()).Where(item => !string.IsNullOrWhiteSpace(item)).ToArray();
                string numberedItems = string.Join("\n", listItems.Select((item, index) => $"{index + 1}. {item}"));
                return numberedItems;
            });

            // Process unordered lists (<ul>)
            html = Regex.Replace(html, @"<ul>([\s\S]*?)<\/ul>", match =>
            {
                string p1 = match.Groups[1].Value;
                string[] listItems = p1.Split("<li>").Select(item => item.Trim()).Where(item => !string.IsNullOrWhiteSpace(item)).ToArray();
                string bulletedItems = string.Join("\n", listItems.Select(item => $"• {item}"));
                return bulletedItems;
            });

            // Remove <p> tags and convert to newline
            html = Regex.Replace(html, @"<p>(.*?)<\/p>", match =>
            {
                string p1 = match.Groups[1].Value;
                return p1 + "\n";
            });

            // Remove all HTML tags
            html = Regex.Replace(html, @"<\/?[^>]+(>|$)", "");

            html = html.Replace("&nbsp;", " "); // Replace non-breaking spaces with regular spaces
            html = html.Replace("&n", "");
            html = System.Web.HttpUtility.HtmlDecode(html);
            return html;
        }
        public ActionResult ExportToExcel(string projectNumber, string fileName, string GridId)
        {

            var result = claimsRepository.FetchClaimsDetails(projectNumber, GridId);

            IEnumerable<ClaimsExcelModel> ExcelData = result.OnPackClaimsExcelData;
            IEnumerable<ClaimsExcelModel2> ExcelData1 = result.CommunicationClaimsExcelData;

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;


            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("OnPack Claims");

                int currentRow = 1;
                worksheet.Cells[currentRow, 1].Value = "Project Number";
                worksheet.Cells[currentRow, 2].Value = "Claims";
                worksheet.Cells[currentRow, 3].Value = "Feasibility";
                worksheet.Cells[currentRow, 4].Value = "Supporting technical statements from R&D";
                worksheet.Cells[currentRow, 5].Value = "Measured By";
                worksheet.Cells[currentRow, 6].Value = "Remarks/Restriction";
                worksheet.Cells[currentRow, 7].Value = "Responsible Department";

                currentRow++; // Move to the next row for data


                foreach (var item in ExcelData)
                {
                    // Convert HTML to plain text for the SupportingStmt property
                    //string plainSupportingStmt = ConvertHtmlToPlainText(item.SupportingStmt);

                    worksheet.Cells[currentRow, 1].Value = item.ProjectNumber;
                    worksheet.Cells[currentRow, 2].Value = item.Claims;
                    worksheet.Cells[currentRow, 3].Value = item.Feasibility;
                    worksheet.Cells[currentRow, 4].Value = ProcessHTMLListsForExcel(item.SupportingStmt);
                    worksheet.Cells[currentRow, 5].Value = ProcessHTMLListsForExcel(item.MeasuredBy);
                    worksheet.Cells[currentRow, 6].Value = item.Remarks;
                    worksheet.Cells[currentRow, 7].Value = item.ResponsibleDepartment;
                    worksheet.Row(currentRow).Height = 70;
                    currentRow++;
                }
                var headerRow = worksheet.Row(1);
                headerRow.Style.Font.Bold = true;
                worksheet.Column(1).Width = 14;
                worksheet.Column(2).Width = 40;
                worksheet.Column(3).Width = 10;
                worksheet.Column(4).Width = 50;
                worksheet.Column(5).Width = 20;
                worksheet.Column(6).Width = 25;
                worksheet.Column(7).Width = 25;


                var worksheet2 = package.Workbook.Worksheets.Add("Communication Claims");

                int currentRow2 = 1;
                worksheet2.Cells[currentRow2, 1].Value = "Project Number";
                worksheet2.Cells[currentRow2, 2].Value = "Claims";
                worksheet2.Cells[currentRow2, 3].Value = "Feasibility";
                worksheet2.Cells[currentRow2, 4].Value = "Supporting technical statements from R&D";
                worksheet2.Cells[currentRow2, 5].Value = "Measured By";
                worksheet2.Cells[currentRow2, 6].Value = "Remarks/Restriction";
                worksheet2.Cells[currentRow2, 7].Value = "Responsible Department";

                currentRow2++; // Move to the next row for data


                foreach (var item in ExcelData1)
                {
                    // Convert HTML to plain text for the SupportingStmt property
                    //string plainSupportingStmt = ConvertHtmlToPlainText(item.SupportingStmt);

                    worksheet2.Cells[currentRow2, 1].Value = item.ProjectNumber;
                    worksheet2.Cells[currentRow2, 2].Value = item.Claims;
                    worksheet2.Cells[currentRow2, 3].Value = item.Feasibility;
                    worksheet2.Cells[currentRow2, 4].Value = ProcessHTMLListsForExcel(item.SupportingStmt);
                    worksheet2.Cells[currentRow2, 5].Value = ProcessHTMLListsForExcel(item.MeasuredBy);
                    worksheet2.Cells[currentRow2, 6].Value = item.Remarks;
                    worksheet2.Cells[currentRow2, 7].Value = item.ResponsibleDepartment;
                    worksheet2.Row(currentRow2).Height = 70;
                    currentRow2++;
                }
                var headerRow2 = worksheet2.Row(1);
                headerRow2.Style.Font.Bold = true;
                worksheet2.Column(1).Width = 14;
                worksheet2.Column(2).Width = 40;
                worksheet2.Column(3).Width = 10;
                worksheet2.Column(4).Width = 50;
                worksheet2.Column(5).Width = 20;
                worksheet2.Column(6).Width = 25;
                worksheet2.Column(7).Width = 25;


                var stream = new MemoryStream(package.GetAsByteArray());
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{fileName}.xlsx");
            }

        }
        public ActionResult ExportToExcelHistory(string projectNumber, string fileName, string GridId)
        {
            IEnumerable<ClaimsHistoryRemarks> ExcelData = claimsRepository.FetchFormHistoryDetails(GridId, projectNumber);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                int currentRow = 1;
                worksheet.Cells[currentRow, 1].Value = "From Stage";
                worksheet.Cells[currentRow, 2].Value = "To Stage";
                worksheet.Cells[currentRow, 3].Value = "Assigned To";
                worksheet.Cells[currentRow, 4].Value = "Received On";
                worksheet.Cells[currentRow, 5].Value = "Submitted On";
                worksheet.Cells[currentRow, 6].Value = "Submitted By";
                worksheet.Cells[currentRow, 7].Value = "No Of Days Taken";
                worksheet.Cells[currentRow, 8].Value = "Remarks";

                currentRow++; // Move to the next row for data


                foreach (var item in ExcelData)
                {
                    // Convert HTML to plain text for the SupportingStmt property

                    worksheet.Cells[currentRow, 1].Value = item.FromStage;
                    worksheet.Cells[currentRow, 2].Value = item.ToStageName;
                    worksheet.Cells[currentRow, 3].Value = item.AssignedTo;
                    worksheet.Cells[currentRow, 4].Value = item.ReceivedOn;
                    worksheet.Cells[currentRow, 5].Value = item.SubmittedOn;
                    worksheet.Cells[currentRow, 6].Value = item.SubmittedBy;
                    worksheet.Cells[currentRow, 7].Value = item.NoOfDaysTaken;
                    worksheet.Cells[currentRow, 8].Value = item.Remarks;
                    worksheet.Row(currentRow).Height = 70;
                    currentRow++;
                }
                var headerRow = worksheet.Row(1);
                headerRow.Style.Font.Bold = true;
                worksheet.Column(1).Width = 14;
                worksheet.Column(2).Width = 40;
                worksheet.Column(3).Width = 10;
                worksheet.Column(4).Width = 50;
                worksheet.Column(5).Width = 20;
                worksheet.Column(6).Width = 25;
                worksheet.Column(7).Width = 25;
                var stream = new MemoryStream(package.GetAsByteArray());
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{fileName}.xlsx");
            }
        }
        public JsonResult GetSupportingDocuments(string ProjectNumber, string GridId)
        {
            var result = claimsRepository.GetSupportingDocuments(ProjectNumber, GridId);
            return Json(result);
        }
        public ActionResult ClaimsGrid_PV(string ProjectNumber, string StatusId, string IsEdit, string GridId)
        {
            ClaimsGridDocument claims = new ClaimsGridDocument();
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            claims.ProjectNumber = ProjectNumber;

            ViewBag.isEdit = IsEdit;
            var data = claimsRepository.GetClaimsData(ProjectNumber, UserId, StatusId, GridId);
            claims.Stage = int.Parse(StatusId);
            claims.GridId = data.GridId;
            claims.CFTDeptName = data.CFTDeptName;
            claims.MustHaveClaims = data.MustHaveClaims;
            claims.NiceToHaveClaims = data.NiceToHaveClaims;
            claims.ProjectBriefId = data.ProjectBriefId;
            claims.RephraseClaims = data.RephraseClaims;
            claims.LoginId = UserId;
            var result = claimsRepository.GetProjectList();
            claims.ProjectList = result.Select(m => new SelectListItem { Text = m.ProjectCode + "-" + m.ProjectName, Value = m.ProjectCode.ToString() });

            claims.GridId = data.GridId;

            var UserDept = data.CFTDeptName;

            var DeptList = claimsRepository.GetDeptList();
            if (StatusId == "3")
            {
                var CFTReviewData = claimsRepository.GetCFTReviewData(ProjectNumber, UserId);
                claims.CFTUploadedDocumentDetails = data.CFTUploadedDocumentDetails;
                claims.JsonCFTReviewData = JsonConvert.SerializeObject(CFTReviewData);
            }
            if (claims.Stage > 3)
            {
                var result1 = claimsRepository.Fetch_CFT_ClaimsWithRemarks(ProjectNumber, "OnPack", "OnPack", claims.GridId);
                var result2 = claimsRepository.Fetch_CFT_ClaimsWithRemarks(ProjectNumber, "Communication", "Communication", claims.GridId);
                data.OnPackClaimsWithRemarks = JsonConvert.SerializeObject(result1);
                data.CommunicationClaimsWithRemarks = JsonConvert.SerializeObject(result2);
                data.DepartmentList = JsonConvert.SerializeObject(DeptList);
            }
            claims.JsonClaimsData = JsonConvert.SerializeObject(data);
            //DeptList = DeptList.Where(m => m.DeptName != UserDept).ToList();
            claims.DeptList = DeptList.Select(m => new SelectListItem { Text = m.DeptName, Value = m.DeptName.ToString() });

            //var LicenseCategoryList = claimsRepository.GetLicenseCategoryList();
            //claims.LicenseCategoryList = LicenseCategoryList.Select(m => new SelectListItem { Text = m.LicenseCategory, Value = m.LicenseId.ToString() });

            //var HubList = claimsRepository.GetHubList();
            //claims.HubList = HubList.Select(m => new SelectListItem { Text = m.HUBName, Value = m.HUBName.ToString() });

            // Return a partial view instead of a full view
            return PartialView("ClaimsGrid_PV", claims);
        }

        //send mail from PMD
        public JsonResult GeneratePdfforSendmail(string toMailids, string remarks, string GridId, [FromServices] IWebHostEnvironment env, string FromButton)
        {
            claimsRepository.savesendmailuserdata(toMailids, GridId);
            if (remarks == null)
            {
                remarks = "NA";
            }

            var ccMailIds = claimsRepository.GetCCMailIds(toMailids, GridId);

            var html = HttpContext.Session.GetString("HtmlData");
            long ticks = DateTime.Now.Ticks;
            if (!Directory.Exists(Path.Combine(env.WebRootPath, "PDFDownload")))
            {
                Directory.CreateDirectory(Path.Combine(env.WebRootPath, "PDFDownload"));
            }
            var filePath = Path.Combine(env.WebRootPath, "PDFDownload", "Claims_" + ticks + ".pdf");
            var projectData = claimsRepository.GetClaimsDetailsForSendMail(GridId).SingleOrDefault();
            new PdfHeader().ManipulatePdf(html, filePath);
            byte[] pdf = System.IO.File.ReadAllBytes(filePath);
            MemoryStream stream = new MemoryStream(pdf);
            var fullPath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:Pdfuploads"], filePath);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            using (var fileStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
            {
                fileStream.Write(pdf, 0, pdf.Length);
            }

            var subject = "";
            string tableHtml = "", tableHtmlbody = "", fileName = "";
            if (projectData.Status == "15" && FromButton != "sendmail")
            {
                subject = "Claims grid Version 1 signed off-project details.";

                tableHtml = "<p style=\" font: 10pt RotisSemiSans; \">Dear All,<br/><br/>Claims for the <b>" + projectData.ProductName + "</b> has been signed off for the <b>Participating HUBS</b>.</p>" +
                   "<table style=\"border-collapse:collapse;font: 10pt RotisSemiSans;width: 600;margin-left: 100px;\">" +
                   "<tr style=\"background-color: #B4C6E7; text-align: center; font-weight: bold;\">" +
                   "<td style=\"border: 1px solid black;\">Name</td>" +
                   "<td style=\"border: 1px solid black;\">Details</td>" +
                   "</tr>" +
                   "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Project No.</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.ProjectNumber + "</td>" +
                     "</tr>" +
                     "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Project Name</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.ProductName + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Division</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Division + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">HGH Code</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.HGHCode + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Dosage Form</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Dosage + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Claims grid initiated on</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.CreatedDate + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Claims grid signed off for participating HUBS</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.CFTSignOffOn + "</td>" +
                     "</tr></table>";
            }
            else if (projectData.Status == "15" && FromButton == "sendmail")
            {
                subject = "Claims grid Version 1 signed off-project details.";

                tableHtml = "<p style=\" font: 10pt RotisSemiSans; \">Dear All,<br/><br/>Claims grid for the <b>" + projectData.ProductName + "</b> has been signed off with regulatory review comments <b>from all HUBS.</b></p>" +
                   "<table style=\"border-collapse:collapse;font: 10pt RotisSemiSans;width: 600;margin-left: 100px;\">" +
                   "<tr style=\"background-color: #B4C6E7; text-align: center; font-weight: bold;\">" +
                   "<td style=\"border: 1px solid black;\">Name</td>" +
                   "<td style=\"border: 1px solid black;\">Details</td>" +
                   "</tr>" +
                   "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Project No.</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.ProjectNumber + "</td>" +
                     "</tr>" +
                     "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Project Name</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.ProductName + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Division</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Division + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">HGH Code</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.HGHCode + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Dosage Form</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Dosage + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Claims grid initiated on</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.CreatedDate + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Claims grid signed off with review comments from all HUBS on</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.CurrentDate + "</td>" +
                     "</tr></table>";
            }
            else
            {
                subject = "Claims grid Version 1 Addendum-project details.";

                tableHtml = "<p style=\" font: 10pt RotisSemiSans; \">Dear All,<br/><br/>Claims for the <b>" + projectData.ProductName + "</b> has been revised and <b>" + projectData.ID + "</b> has been signed off</p>" +
                   "<table style=\"border-collapse:collapse;font: 10pt RotisSemiSans;width: 600;margin-left: 100px;\">" +
                   "<tr style=\"background-color: #B4C6E7; text-align: center; font-weight: bold;\">" +
                   "<td style=\"border: 1px solid black;\">Name</td>" +
                   "<td style=\"border: 1px solid black;\">Details</td>" +
                   "</tr>" +
                   "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Project No.</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.ProjectNumber + "</td>" +
                     "</tr>" +
                     "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Project Name</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.ProductName + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Division</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Division + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">HGH Code</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.HGHCode + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Dosage Form</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Dosage + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Reason for revision</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.Remarks + "</td>" +
                     "</tr>" +
                      "<tr style=\"text-align:center;\">" +
                           "<td style=\"border: 1px solid black;\">Claims grid Addendum signed off on</td>" +
                            "<td style=\"border: 1px solid black;\">" + projectData.CurrentDate + "</td>" +
                      "</tr></table>";

            }

            string signatureHtml = "<p style=\" font: 10pt RotisSemiSans; \">Thanks and Regards<br/>Team - Claims<br/>  <b><i>This is an auto generated mail, Please do not reply </i><b> <br/></p>";

            tableHtmlbody = tableHtml + signatureHtml;
            string sanitizedProjectName = Regex.Replace(projectData.ProductName, @"[^\w\d\s]", string.Empty);
            if (sanitizedProjectName.Length > 200)
            {
                fileName = $"{GridId}_{sanitizedProjectName.Substring(0, 185)}.pdf";
            }
            else
            {
                fileName = $"{GridId}_{sanitizedProjectName}.pdf";
            }
            SendMail.SendEmailLocal(subject, toMailids, ccMailIds, tableHtmlbody, stream, fileName);
            var JsonResult = Json("1");
            return JsonResult;

        }
        public JsonResult GetDepartmentBasedOnHub(string HubName)
        {
            var result = claimsRepository.GetDepartmentBasedOnHubName(HubName);
            return Json(result);
        }

        public JsonResult GetMultipleDepartmentsUploadedDocs(string GridId, string ClaimsId, string Type)
        {
            var result = claimsRepository.GetMultipleDepartmentsUploadedDocuments(GridId, ClaimsId, Type);
            return Json(result);
        }
        public JsonResult FetchExcelDocuments(string GridId)
        {
            var result = claimsRepository.GetMultipleDepartmentsUploadedExcel(GridId);
            return Json(result);
        }
        public void LogError(string controller, string action, Exception ex)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });
        }
        public JsonResult ClaimsAutoSaveData(ClaimsGridDocument claimsObj)
        {
            string controllerName = "ClaimsGrid";
            string actionName = "AddGridDocument";
            LogError(controllerName, actionName, new Exception("Request to save claimsGrid form is initiated in ClaimsGrid Controller"));

            claimsObj.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = claimsRepository.AddClaimsData(claimsObj);

            return Json(new { success = true, message = "Data received successfully", result = result.Item2 });
        }
        public JsonResult ClaimsAutoSaveEditData(ClaimsGridDocument claimsObj)
        {
            string controllerName = "ClaimsGrid";
            string actionName = "AddGridDocument";
            LogError(controllerName, actionName, new Exception("Request to save claimsGrid form is initiated in ClaimsGrid Controller"));

            claimsObj.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var Stage = claimsObj.Stage;
            var result = "";
            if (Stage == 2)
            {
                result = claimsRepository.UpdateClaimsData(claimsObj);
            }
            if (Stage >= 4)
            {
                result = claimsRepository.AddUpdateDSGReview(claimsObj);
            }
            return Json(new { success = true, message = "Data received successfully", result = result });

        }

        public IActionResult SaveSignOffData()
        {
            ClaimsGridDocument claimsObj = new ClaimsGridDocument();
            claimsObj.ClaimsHeaders = Convert.ToString(Request.Form["ClaimsHeaders"]);
            claimsObj.ProductDescription = Convert.ToString(Request.Form["ProductDescription"]);
            claimsObj.ProjectDetails = Convert.ToString(Request.Form["ProjectDetails"]);
            claimsObj.ApprovalStatus = Convert.ToString(Request.Form["ApprovalStatus"]);
            claimsObj.OnPackClaims = Convert.ToString(Request.Form["OnPackClaims"]);
            claimsObj.CommunicationClaimsData = Convert.ToString(Request.Form["CommunicationClaimsData"]);
            claimsObj.SupportingDocumentData = Convert.ToString(Request.Form["SupportingDocumentData"]);
            claimsObj.DeletedSupportingdocument = Convert.ToString(Request.Form["DeletedSupportingdocument"]);
            claimsObj.Stage = Convert.ToInt16(Request.Form["Stage"]);
            claimsObj.GridId = Convert.ToString(Request.Form["GridId"]);
            claimsObj.InitiatedBy = HttpContext.Session.GetString("UserName") ?? string.Empty;
            claimsObj.ProjectBrief = Convert.ToString(Request.Form["ProjectBrief"]);

            var result = claimsRepository.AddUpdateDSGReview(claimsObj);

            if (result.Equals("Successfully Updated"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";

            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }
            return Ok(result);
        }

        public JsonResult GetClaimsAllDepartments(string GridId, string ProjectNumber)
        {
            string controllerName = "ClaimsGrid";
            string actionName = "AddGridDocument";
            LogError(controllerName, actionName, new Exception("Request to save claimsGrid form is initiated in ClaimsGrid Controller"));

            var result = claimsRepository.GetClaimsAllDepartments(GridId, ProjectNumber);

            return Json(new { success = true, message = "Data received successfully", result = result });

        }
    }
}

