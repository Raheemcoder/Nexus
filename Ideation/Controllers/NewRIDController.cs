using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Math;
using Ideation.Controllers;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.PowerBI.Api.Models;
using Newtonsoft.Json;
using System.IO;
using System;
using System.IO.Compression;
using System.Web.WebPages;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Drawing;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ideation.Controllers
{
    public class NewRIDController : BaseController
    {
        private readonly IRIDRepository RIDRepository;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;

        #region Constructor
        public NewRIDController(IWebHostEnvironment webHostEnvironment, IRIDRepository RIDRepository, IConfiguration Configuration)
        {
            this.RIDRepository = RIDRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = Configuration;
        }
        #endregion

        #region RID Index
        [HttpGet]
        public IActionResult RIDIndex()
        {
            RID rid = new RID();
            rid.DivisionList = RIDRepository.GetDivisionList("Division");
            return View("RIDIndex", rid);
        }
        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult RIDList(string DivisionId, string DivisionName)
        {
            if (Convert.ToInt32(DivisionId) != 0 && DivisionName != "" && DivisionName != null)
            {
                HttpContext.Session.SetInt32("DivisionId", Convert.ToInt32(DivisionId));
                HttpContext.Session.SetString("DivisionName", DivisionName);

                var UserApprovalLevel = RIDRepository.GetUserApprovalLevel(LoginId, Convert.ToInt32(DivisionId));
                HttpContext.Session.SetString("UserApprovalLevel", UserApprovalLevel);

                if (DivisionName.ToLower().Contains("cosmetics"))
                {
                    if (HttpContext.Session.GetString("Role")?.Replace(" ", "").ToUpper() == "IRAGLOBAL" || HttpContext.Session.GetString("Role")?.Replace(" ", "").ToUpper() == "IRAINDIA" || HttpContext.Session.GetString("Role")?.Replace(" ", "").ToUpper() == "IRAINDIA-CS" || HttpContext.Session.GetString("Role")?.Replace(" ", "").ToUpper() == "IRAGLOBAL-CS")
                    {
                        return RedirectToAction("IngredientsRegulation", "NewRID");
                    }
                    else
                    {
                        return RedirectToAction("CosmeticsRIDList", "NewRID");
                    }
                }
                else if (DivisionName.ToLower().Contains("food"))
                {
                    if (HttpContext.Session.GetString("Role")?.ToUpper() == "IRA GLOBAL" || HttpContext.Session.GetString("Role")?.ToUpper() == "IRA INDIA" || HttpContext.Session.GetString("Role")?.Replace(" ", "").ToUpper() == "IRAINDIA-FS" || HttpContext.Session.GetString("Role")?.Replace(" ", "").ToUpper() == "IRAGLOBAL-FS")
                    {
                        return RedirectToAction("FoodSupplementRWCList", "NewRID");
                    }
                    else
                    {
                        return RedirectToAction("FoodSupplementRIDList", "NewRID");
                    }
                }
                else
                {
                    return RedirectToAction("ErrorPage", "Landing");
                }
            }
            else
            {
                return RedirectToAction("ErrorPage", "Landing");
            }
        }
        #endregion

        #region Cosmetics

        public IActionResult CosmeticsRIDList()
        {
            var Source = "RnD";
            var Status = 111;
            var LoginId = HttpContext.Session.GetString("UserName")?.ToString();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var DivisionName = HttpContext.Session.GetString("DivisionName");

            RID rid = new RID();

            var result = RIDRepository.GetIngredientList(DivisionId, Source, LoginId);
            rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);

            //var result1 = RIDRepository.GetComplianceRequestList(DivisionId, LoginId, Status);
            //rid.ComplianceRequestListJson = JsonConvert.SerializeObject(result1);

            rid.IngredientNameList = JsonConvert.SerializeObject(RIDRepository.GetIngredientNameList(DivisionId));
            rid.CASNumberList = JsonConvert.SerializeObject(RIDRepository.GetCASNumberList(DivisionId));
            rid.FunctionList = RIDRepository.GetFunctionList();
            rid.RegionList = RIDRepository.GetRegionList();
            rid.IRAStatusList = RIDRepository.GetIRAStatusList();
            rid.DivisionName = DivisionName;
            rid.DivisionId = DivisionId;

            return View(rid);
        }

        public IActionResult GetIngredientBasedOnSearch(string Source, int IngredientTypeId, string StartDate = "", string EndDate = "", string SearchText = "")
        {
            var LoginId = HttpContext.Session.GetString("UserName").ToString();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.GetIngredientList(DivisionId, Source, LoginId, StartDate, EndDate, SearchText, IngredientTypeId);

            return Ok(result);
        }

        [HttpGet]
        public JsonResult GetParticularIngredientDetails(int IngredientId)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var result = RIDRepository.GetParticularIngredientDetailsForFSGlobalCompliance(IngredientId, DivisionId);
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        public JsonResult GetComplianceRequestBasedOnSearch(int ingredientTypeId, int Status)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var LoginId = HttpContext.Session.GetString("UserName").ToString();
            var result = RIDRepository.GetComplianceRequestList(DivisionId, LoginId, ingredientTypeId, Status);
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        [HttpGet]
        public IActionResult IngredientsRegulation()
        {

            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            rid.DivisionName = HttpContext.Session.GetString("DivisionName");
            rid.LoginId = HttpContext.Session.GetString("UserName").ToString();
            rid.Source = "IRA";
            var result = RIDRepository.GetIngredientList(rid.Division_Id, rid.Source, " ");
            rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
            return View("IngredientsRegulation", rid);
        }

        [HttpGet]
        public IActionResult GetIngredientsRegulationById(long IngredientId)
        {
            var list = RIDRepository.IngredientListById(IngredientId);
            string jsonResponse = JsonConvert.SerializeObject(list);
            return Json(jsonResponse);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult AddIngredient(string ingredientId)
        {
            var role = HttpContext.Session.GetString("Role");
            RID rid = new RID();
            rid.IngredientReqId = Convert.ToInt32(ingredientId);
            rid.IngredientId = Convert.ToInt32(ingredientId);
            if (rid.IngredientId > 0)
            {
                rid = RIDRepository.IngredientListByIngredientId(rid.IngredientId, role);

                rid.IngredientListData = JsonConvert.SerializeObject(rid.IngredientsList);
                rid.IngredientFileData = JsonConvert.SerializeObject(rid.IngredientFileList);
                if (!String.IsNullOrEmpty(rid.FunctionId))
                {
                    rid.FunctionId_arr = rid.FunctionId.Split(',');
                }
                rid.DivisionName = HttpContext.Session.GetString("DivisionName");

            }
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            rid.DivisionName = HttpContext.Session.GetString("DivisionName");
            rid.IngredientId = Convert.ToInt32(ingredientId);
            rid.IngredientNameList = JsonConvert.SerializeObject(RIDRepository.GetIngredientNameList(rid.Division_Id));
            rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(RIDRepository.GetAddDetails(rid.Division_Id, role));
            rid.FunctionDetails = RIDRepository.GetFunctionDropdown(rid.IngredientId, "AddIngredient");

            return View(rid);
        }

        [HttpPost]
        public IActionResult DeleteIngredient(int ingredientId)
        {
            var LoginId = HttpContext.Session.GetString("UserName").ToString();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var result = RIDRepository.DeleteIngredientById(ingredientId, LoginId, DivisionId);
            TempData["Message"] = result.Item1;
            TempData["MessageClass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }

        [HttpGet]
        public JsonResult GetRegulatoryStatus()
        {
            var result = RIDRepository.GetAddDropdown();
            var SLTypeList = result.GroupBy(test => test.Value)
                   .Select(grp => grp.First())
                   .ToList().Distinct();
            return Json(SLTypeList, new System.Text.Json.JsonSerializerOptions());
        }

        [HttpPost]
        public JsonResult SaveDetails([FromForm] RID rID)
        {
            rID.LoginId = HttpContext.Session.GetString("UserName").ToString();
            var result = RIDRepository.IngredientsDetailsInsert(rID);
            TempData["Message"] = result.Item1.Split("_")[0];
            TempData["Messageclass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }

        [HttpPost]
        public JsonResult UpdateDetails([FromForm] RID rID)
        {
            rID.LoginId = HttpContext.Session.GetString("UserName").ToString();
            var result = RIDRepository.IngredientsDetailsUpdate(rID);
            TempData["Message"] = result.Item1.Split("_")[0];
            TempData["Messageclass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }

        [HttpPost]
        public IActionResult UploadFile([FromForm] RID rID)
        {
            var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
            List<RID> attachmentnames = JsonConvert.DeserializeObject<List<RID>>(rID.DocumentData);
            var count = rID.PostedFile != null ? rID.PostedFile.Count : 0;

            var filePath = uploadsFolder + "\\" + rID.IngredientId;

            if (rID.PostedFile != null && rID.PostedFile.Count >= 0)
            {
                var file = rID.PostedFile;

                for (var i = 0; i < count; i++)
                {
                    var postedFile = rID.PostedFile[i];
                    var _newPath = filePath + "\\" + attachmentnames[i].RegionId + "\\" + attachmentnames[i].CategoryId + "\\";
                    if (!Directory.Exists(_newPath))
                    {
                        Directory.CreateDirectory(_newPath);
                    }
                    var fileName = attachmentnames[i].EnclosureName;
                    if (postedFile.Length > 0 && postedFile.FileName != null && postedFile.FileName != "")
                    {

                        var path = _newPath + fileName;

                        using (var stream = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.None))
                        {
                            postedFile.CopyTo(stream);
                            stream.Dispose();
                        }
                    }
                }
            }
            return Json("Uploaded Successfully", new System.Text.Json.JsonSerializerOptions());
        }

        [HttpGet]
        public IActionResult ComplianceRequest()
        {
            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            rid.DivisionName = HttpContext.Session.GetString("DivisionName");
            rid.StatusDetails = RIDRepository.GetStatusList("IRStatus");
            var result = RIDRepository.GetIngredientRequest(rid.Division_Id, " ", "", "", 0);
            rid.IngredientListJson = JsonConvert.SerializeObject(result);
            return View("ComplianceRequest", rid);
        }

        public JsonResult GetIngredientBasedOnSearchRegulation(string StartDate, string EndDate, int Status)
        {
            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.GetIngredientRequest(rid.Division_Id, "", StartDate, EndDate, Status);
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult CosmeticsRIDApproval(string pageCode)
        {
            //pageCode 1 -- level 1
            //pageCode 2 -- level 2
            //pageCode 3 -- no access

            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var DivisionName = HttpContext.Session.GetString("DivisionName");

            RID rid = new RID();
            rid.DivisionName = DivisionName;

            if (pageCode == "2")
            {
                var result = RIDRepository.Approve_GetIngredientList(DivisionId, LoginId, "Level2");
                rid.Approve_DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
                rid.PageName = "Level 2";
                rid.UserApprovalLevel = "Level2";
            }
            else if (pageCode == "1")
            {
                var result = RIDRepository.Approve_GetIngredientList(DivisionId, LoginId, "Level1");
                rid.Approve_DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
                var result2 = RIDRepository.GetMostRecentRemark();
                rid.MostRecentRemark = JsonConvert.SerializeObject(result2);
                rid.PageName = "Level 1";
                rid.UserApprovalLevel = "Level1";
            }
            else
            {
                rid.PageName = "";
                rid.UserApprovalLevel = "";
            }

            return View("CosmeticsRIDApproval", rid);

        }

        [HttpGet]
        public IActionResult DisplayRemarksById(int IngredientId, string IngredientName)
        {
            HttpContext.Session.SetString("IngredientId", Convert.ToString(IngredientId));
            HttpContext.Session.SetString("IngredientName", Convert.ToString(IngredientName));
            var result = RIDRepository.GetRemarksById(IngredientId, "List");
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetApprovalRemarksExcelData()
        {
            var ingredientId = HttpContext.Session.GetString("IngredientId");
            var ingredientName = HttpContext.Session.GetString("IngredientName");
            var result = RIDRepository.GetRemarksById(Convert.ToInt32(ingredientId), "Excel");
            var fileName = "RID Approval " + ingredientName + ".xlsx";
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("RIDApproval");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Remarks";
                worksheet.Cell(currentRow, 2).Value = "Action";
                worksheet.Cell(currentRow, 3).Value = "Action By";
                worksheet.Cell(currentRow, 4).Value = "Action Date";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 4);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.Remarks;
                    worksheet.Cell(currentRow, 2).Value = item.Action;
                    worksheet.Cell(currentRow, 3).Value = item.CreatedBy;
                    worksheet.Cell(currentRow, 4).Value = item.CreatedDate;

                }
                worksheet.Column("1").Width = 20;
                worksheet.Column("2").Width = 20;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 20;

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

        [HttpGet]
        public JsonResult Approve_GetParticularIngredientDetails(int IngredientId)
        {
            var result = RIDRepository.Approve_GetParticularIngredientDetails(IngredientId);
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        [HttpGet]
        public JsonResult RegulatoryStatusDropDownData()
        {
            var result = RIDRepository.RegulatoryStatusDropDownData("RegStatusAndCategory");
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        [HttpPost]
        public string ApproveRevertIngredient(string IngredientToApprove, string Action, string Remarks, string ApprovalLevel, bool IsSubmitted = true)
        {
            try
            {
                var result = RIDRepository.ApproveRevertIngredient(LoginId, IngredientToApprove, ApprovalLevel, Action, Remarks, IsSubmitted);

                if (result.Item1.ToLower().Contains("successfully") == true)
                {
                    TempData["Message"] = result.Item1;
                    TempData["MessageClass"] = result.Item2;

                    if (IsSubmitted == true)
                    {
                        return "1";
                    }
                    else
                    {
                        return "2";
                    }
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return "0";
            }
        }

        public Tuple<string, string> ComplianceRequest_Save(string botanicalName, string IngredientName, string Region, string FunctionId, string CASNumber, int IngredientTypeId = 0)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var LoginId = HttpContext.Session.GetString("UserName").ToString();

            var result = RIDRepository.ComplianceRequest_Save(botanicalName, IngredientName, Region, FunctionId, LoginId, DivisionId, CASNumber, IngredientTypeId);
            TempData["ComplianceRequest_SaveMessage"] = result.Item1;
            TempData["ComplianceRequest_SaveMessageClass"] = result.Item2;

            string jsonResponse = JsonConvert.SerializeObject(result);
            string IngredientNameList = JsonConvert.SerializeObject(RIDRepository.GetIngredientNameList(DivisionId));

            return new Tuple<string, string>(jsonResponse, IngredientNameList);
        }

        [HttpGet]
        public IActionResult DownloadRIDCosmeticsExcel(string StartDate = "", string EndDate = "", string searchText = "")
        {
            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.GetIngredientList(rid.Division_Id, "RnD", LoginId, StartDate, EndDate, searchText);

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Regulatory Ingredient Database");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Ingredient Name";
                worksheet.Cell(currentRow, 2).Value = "Synonyms";
                worksheet.Cell(currentRow, 3).Value = "CAS Number";
                worksheet.Cell(currentRow, 4).Value = "Functions";
                worksheet.Cell(currentRow, 5).Value = "Adult - Leave On";
                worksheet.Cell(currentRow, 6).Value = "Adult - Rinse Off";
                worksheet.Cell(currentRow, 7).Value = "Baby - Leave On";
                worksheet.Cell(currentRow, 8).Value = "Baby - Rinse Off";
                worksheet.Cell(currentRow, 9).Value = "Last Updated Date";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 9);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.IngredientName;

                    worksheet.Cell(currentRow, 2).Value = item.Synonyms;

                    worksheet.Cell(currentRow, 3).Value = item.CASNumber;

                    worksheet.Cell(currentRow, 4).Value = item.FunctionName;

                    worksheet.Cell(currentRow, 5).Value = item.AdultLeaveOn;
                    if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 5).Value = "HGML Approval Required";
                    }
                    else if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 5).Value = "Allowed";
                    }
                    else if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 5).Value = "Prohibited";
                    }
                    else if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 5).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 5).Value = "";
                    }

                    worksheet.Cell(currentRow, 6).Value = item.AdultRinseOff;
                    if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 6).Value = "HGML Approval Required";
                    }
                    else if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Allowed";
                    }
                    else if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Prohibited";
                    }
                    else if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Value = "";
                    }

                    worksheet.Cell(currentRow, 7).Value = item.BabyLeaveOn;
                    if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 7).Value = "HGML Approval Required";
                    }
                    else if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Allowed";
                    }
                    else if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Prohibited";
                    }
                    else if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 7).Value = "";
                    }

                    worksheet.Cell(currentRow, 8).Value = item.BabyRinseOff;
                    if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 8).Value = "HGML Approval Required";
                    }
                    else if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 8).Value = "Allowed";
                    }
                    else if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 8).Value = "Prohibited";
                    }
                    else if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 8).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 8).Value = "";
                    }
                    string dateString = item.LastUpdatedDate;

                    DateTime parsedDate;
                    if ((DateTime.TryParse(dateString, new CultureInfo("en-GB"), DateTimeStyles.None, out parsedDate)))
                    {
                        worksheet.Cell(currentRow, 9).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 9).Value = dateString;
                    }
                    //worksheet.Cell(currentRow, 9).Value = item.LastUpdatedDate;
                }
                worksheet.Column("1").Width = 20;
                worksheet.Column("2").Width = 20;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 15;
                worksheet.Column("7").Width = 15;
                worksheet.Column("8").Width = 15;
                worksheet.Column("9").Width = 10;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "RegulatoryIngredientDatabase.xlsx");
                }
            }
        }

        public IActionResult ZipFileDownload(string[] docNames, int ingredientId, int regionId, int categoryId)
        {
            var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
            var filePath = uploadsFolder + "\\" + ingredientId + "\\" + regionId + "\\" + categoryId + "\\";
            var zipfilename = "DownloadZip.zip";
            string[] fileNames = docNames[0].Contains(",") ? docNames[0].Split(",") : docNames;
            List<string> filePaths = new List<string>();
            foreach (var path in fileNames)
            {
                filePaths.Add(Path.Combine(filePath, path));
            }
            var tempFile = Path.GetTempFileName();
            using (var zipFile = System.IO.File.Create(tempFile))
            using (var zipArchive = new ZipArchive(zipFile, ZipArchiveMode.Create))
            {
                foreach (var file in filePaths)
                {
                    zipArchive.CreateEntryFromFile(file, Path.GetFileName(file));
                }
            }
            var stream = new FileStream(tempFile, FileMode.Open);
            StreamWriter sw = new StreamWriter(stream);
            sw.AutoFlush = true;
            stream.Flush();
            stream.Position = 0;
            return File(stream, "application/octet-stream", zipfilename);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult AddIngredientRequest(string ingredientId)
        {
            var role = HttpContext.Session.GetString("Role");
            RID rid = new RID();
            rid.IngredientId = Convert.ToInt32(ingredientId);
            rid.DivisionName = HttpContext.Session.GetString("DivisionName");
            if (rid.IngredientId > 0)
            {
                rid = RIDRepository.IngredientRequestListById(rid.IngredientId, role).FirstOrDefault();
                rid.Source = "IngredientRequest";
                if (!String.IsNullOrEmpty(rid.FunctionId))
                {
                    rid.FunctionId_arr = rid.FunctionId.Split(',');
                }
                rid.FunctionDetails = RIDRepository.GetFunctionDropdown(Convert.ToInt32(ingredientId), "Compliance");
                rid.DivisionName = HttpContext.Session.GetString("DivisionName");

            }
            rid.IngredientId = Convert.ToInt32(ingredientId);
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(RIDRepository.GetAddDetails(Convert.ToInt32(rid.Division_Id), role));

            rid.IngredientNameList = JsonConvert.SerializeObject(RIDRepository.GetIngredientNameList(rid.Division_Id, "compliance"));
            rid.FunctionDetails = RIDRepository.GetFunctionDropdown(rid.IngredientId, "Compliance");
            return View(rid);
        }

        [HttpGet]
        public IActionResult FileDownload(string docName, int ingredientId, int regionId, int categoryId)
        {
            try
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
                var filePath = uploadsFolder + "\\" + ingredientId + "\\" + regionId + "\\" + categoryId + "\\";
                var FileUploadPath = filePath + docName;
                byte[] bytes = System.IO.File.ReadAllBytes(FileUploadPath);
                return File(bytes, "application/octet-stream", docName);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        public IActionResult FunctionMaster()
        {
            RID rid = new RID();
            rid.DivisionName = HttpContext.Session.GetString("DivisionName");
            return View(rid);
        }

        public IActionResult GetFunctionList()
        {
            var result = RIDRepository.GetFunction();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult SaveFunction(int functionId, string functionName, bool status)
        {
            var LoginId = HttpContext.Session.GetString("UserName");
            var result = RIDRepository.SaveFunctionDetails(functionId, functionName, status, LoginId);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }

        [HttpPost]
        public IActionResult DeleteFunction(int functionId)
        {
            var LoginId = HttpContext.Session.GetString("UserName");
            var result = RIDRepository.DeleteFunctionDetails(functionId, LoginId);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }

        public JsonResult DisplayUploadedFiles(int IngredientId, int RegionId, int CategoryId)
        {
            var result = RIDRepository.GetUploadedFiles(IngredientId, RegionId, CategoryId);
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        [HttpGet]
        public IActionResult GetFunctionMasterExcelData()
        {
            var result = RIDRepository.GetFunction();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("FunctionMaster");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Function Name";
                worksheet.Cell(currentRow, 2).Value = "Status";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 2);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.FunctionName;
                    worksheet.Cell(currentRow, 2).Value = item.StatusName;
                    if (item.StatusName.ToLower() == "active")
                    {
                        worksheet.Cell(currentRow, 2).Style.Font.FontColor = XLColor.Green;
                    }
                    else if (item.StatusName.ToLower() == "inactive")
                    {
                        worksheet.Cell(currentRow, 2).Style.Font.FontColor = XLColor.Red;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 2).Style.Font.FontColor = XLColor.Black;
                    }
                }
                worksheet.Column("1").Width = 20;
                worksheet.Column("2").Width = 20;


                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "FunctionMaster.xlsx");
                }
            }

        }

        #endregion

        #region FoodSupplement

        [HttpGet]
        public IActionResult FoodSupplementRIDList()
        {
            var Status = 111;
            var LoginId = HttpContext.Session.GetString("UserName")?.ToString();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var DivisionName = HttpContext.Session.GetString("DivisionName");

            RID rid = new RID();

            //var result1 = RIDRepository.GetComplianceRequestList(DivisionId, LoginId, Status);
            //rid.ComplianceRequestListJson = JsonConvert.SerializeObject(result1);

            rid.RegionList = RIDRepository.GetRegionList();
            rid.IRAStatusList = RIDRepository.GetIRAStatusList();
            rid.IngredientTypeList = RIDRepository.GetIngredientTypeData();
            rid.DivisionName = DivisionName;
            rid.DivisionId = DivisionId;
            rid.IngredientNameList = JsonConvert.SerializeObject(RIDRepository.GetIngredientNameList(DivisionId));
            rid.CASNumberList = JsonConvert.SerializeObject(RIDRepository.GetCASNumberList(DivisionId));
            return View(rid);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult FoodSupplementRWCList(string IngredientType = "0")
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var DivisionName = HttpContext.Session.GetString("DivisionName");

            RID rid = new RID();

            rid.IngredientTypeList = RIDRepository.GetIngredientTypeData();
            rid.DivisionName = DivisionName;
            rid.DivisionId = DivisionId;
            rid.IngredientTypeId = Convert.ToInt32(IngredientType);
            rid.LoginId = LoginId;
            return View(rid);
        }

        [HttpGet]
        public IActionResult DownloadFoodSupplementRIDExcel(int ingredientTypeId, string ingredientTypeName, string StartDate = "", string EndDate = "", string searchText = "")
        {
            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.GetIngredientList(rid.Division_Id, "RnD", LoginId, StartDate, EndDate, searchText, ingredientTypeId);
            var labelName = ingredientTypeName.Trim().ToLower() == "active herbs" ? "Ingredient Name (Sanskrit/English)" : "Ingredient Name";
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Regulatory Ingredient Database");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Botanical Name";
                worksheet.Cell(currentRow, 2).Value = labelName;
                worksheet.Cell(currentRow, 3).Value = "Synonyms";
                worksheet.Cell(currentRow, 4).Value = "CAS Number";
                worksheet.Cell(currentRow, 5).Value = "E Number";
                worksheet.Cell(currentRow, 6).Value = "In Medicine";
                worksheet.Cell(currentRow, 7).Value = "In Food Supplement";
                worksheet.Cell(currentRow, 8).Value = "Last Updated Date";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 8);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = item.BotanicalName;
                    worksheet.Cell(currentRow, 2).Value = item.IngredientName;
                    worksheet.Cell(currentRow, 3).Value = item.Synonyms;
                    worksheet.Cell(currentRow, 4).Value = item.CASNumber;
                    worksheet.Cell(currentRow, 5).Value = item.ENumber;
                    worksheet.Cell(currentRow, 6).Value = item.InMedicine;

                    if (item.InMedicine != null && item.InMedicine.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Higher Management/HUB Decision Required";
                    }
                    else if (item.InMedicine != null && item.InMedicine.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Allowed";
                    }
                    else if (item.InMedicine != null && item.InMedicine.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Prohibited";
                    }
                    else if (item.InMedicine != null && item.InMedicine.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Allowed With Restrictions";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Value = "";
                    }

                    worksheet.Cell(currentRow, 7).Value = item.InFoodSupplement;

                    if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Higher Management/HUB Decision Required";
                    }
                    else if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Allowed";
                    }
                    else if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Prohibited";
                    }
                    else if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Allowed With Restrictions";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 7).Value = "";
                    }
                    string dateString = item.LastUpdatedDate;

                    DateTime parsedDate;
                    if ((DateTime.TryParse(dateString, new CultureInfo("en-GB"), DateTimeStyles.None, out parsedDate)))
                    {
                        worksheet.Cell(currentRow, 8).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 8).Value = dateString;
                    }
                }

                worksheet.Column("1").Width = 30;
                worksheet.Column("2").Width = 40;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 30;
                worksheet.Column("7").Width = 30;
                worksheet.Column("8").Width = 20;

                // Hide columns based on ingredient type
                if (ingredientTypeName.Trim().ToLower() == "active herbs")
                {
                    worksheet.Column(4).Hide(); // Hide CAS Number
                    worksheet.Column(5).Hide(); // Hide E Number
                }
                else if (ingredientTypeName.Trim().ToLower() == "active others")
                {
                    worksheet.Column(1).Hide();// Hide Botanical Name
                    worksheet.Column(5).Hide();// Hide E Number
                }
                else if (ingredientTypeName.Trim().ToLower() == "inactives")
                {
                    worksheet.Column(1).Hide(); // Hide Botanical Name

                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "FoodSupplement_RegulatoryIngredientDatabase.xlsx");
                }
            }
        }

        [HttpGet]
        public IActionResult DownloadFoodSupplementRWCExcel(int ingredienttype, string ingredientTypeName, string StartDate = "", string EndDate = "", string searchText = "")
        {
            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var labelName = ingredientTypeName.Trim().ToLower() == "active herbs" ? "Ingredient Name (Sanskrit/English)" : "Ingredient Name";
            var result = RIDRepository.GetIngredientList(rid.Division_Id, "IRA", LoginId, StartDate, EndDate, searchText, ingredienttype);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Regulatory Ingredient Database");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Botanical Name";
                worksheet.Cell(currentRow, 2).Value = labelName;
                worksheet.Cell(currentRow, 3).Value = "Synonyms";
                worksheet.Cell(currentRow, 4).Value = "CAS Number";
                worksheet.Cell(currentRow, 5).Value = "E Number";
                worksheet.Cell(currentRow, 6).Value = "In Medicine";
                worksheet.Cell(currentRow, 7).Value = "In Food Supplement";
                worksheet.Cell(currentRow, 8).Value = "Last Updated Date";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 8);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = item.BotanicalName;
                    worksheet.Cell(currentRow, 2).Value = item.IngredientName;
                    worksheet.Cell(currentRow, 3).Value = item.Synonyms;
                    worksheet.Cell(currentRow, 4).Value = item.CASNumber;
                    worksheet.Cell(currentRow, 5).Value = item.ENumber;
                    worksheet.Cell(currentRow, 6).Value = item.InMedicine;

                    if (item.InMedicine != null && item.InMedicine.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Higher Management/HUB Decision Required";
                    }
                    else if (item.InMedicine != null && item.InMedicine.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Allowed";
                    }
                    else if (item.InMedicine != null && item.InMedicine.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Prohibited";
                    }
                    else if (item.InMedicine != null && item.InMedicine.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Allowed With Restrictions";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Value = "";
                    }

                    worksheet.Cell(currentRow, 7).Value = item.InFoodSupplement;

                    if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Higher Management/HUB Decision Required";
                    }
                    else if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Allowed";
                    }
                    else if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Prohibited";
                    }
                    else if (item.InFoodSupplement != null && item.InFoodSupplement.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Allowed With Restrictions";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 7).Value = "";
                    }

                    string dateString = item.LastUpdatedDate;

                    DateTime parsedDate;
                    if ((DateTime.TryParse(dateString, new CultureInfo("en-GB"), DateTimeStyles.None, out parsedDate)))
                    {
                        worksheet.Cell(currentRow, 8).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 8).Value = dateString;
                    }
                }
                worksheet.Column("1").Width = 30;
                worksheet.Column("2").Width = 40;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 25;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 35;
                worksheet.Column("7").Width = 35;
                worksheet.Column("8").Width = 20;

                // Hide columns based on ingredient type
                if (ingredientTypeName.Trim().ToLower() == "active herbs")
                {
                    worksheet.Column(4).Hide(); // Hide CAS Number
                    worksheet.Column(5).Hide(); // Hide E Number
                }
                else if (ingredientTypeName.Trim().ToLower() == "active others")
                {
                    worksheet.Column(1).Hide(); // Hide Botanical Name
                    worksheet.Column(5).Hide(); // Hide E Number

                }
                else if (ingredientTypeName.Trim().ToLower() == "inactives")
                {
                    worksheet.Column(1).Hide(); // Hide Botanical Name

                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "FoodSupplement_RegionWiseCompliance.xlsx");
                }
            }

        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult FoodSupplementAddEdit(string IngredientORRequestId, string IngredientType, string From)
        {
            RID rid = new RID();

            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var DivisionName = HttpContext.Session.GetString("DivisionName");

            rid.IngredientTypeList = RIDRepository.GetIngredientTypeData();
            rid.RegulatoryStatus = JsonConvert.SerializeObject(RIDRepository.GetRegStatusData(DivisionId));
            rid.IngredientNameList = JsonConvert.SerializeObject(RIDRepository.GetIngredientNameList(DivisionId));

            rid.DivisionName = DivisionName;
            rid.DivisionId = DivisionId;
            rid.IngredientTypeId = Convert.ToInt32(IngredientType);
            rid.IsFrom = Convert.ToInt32(From);
            rid.IngredientORRequestId = Convert.ToInt32(IngredientORRequestId);

            return View(rid);
        }

        [HttpGet]
        public IActionResult GetFoodSupplementAddEditData(string IngredientORRequestId, string IngredientType, string From)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var data = RIDRepository.GetAddEdit_FSDetails(DivisionId, Convert.ToInt32(IngredientORRequestId),
                Convert.ToInt32(IngredientType), Convert.ToInt32(From), Role);

            var response = new
            {
                HeaderArray = data.HeaderCollection,
                DetailsArray = data.DetailsCollection,
                ComplainceRemarksArray = data.ComplianceRemarksCollection,
                RegionGroupArray = data.RegionGroupCollection
            };

            return Ok(response);
        }

        [HttpPost]
        public IActionResult SaveFoodSupplementAddEdit(InsertUpdateFSIngredient insertUpdateFSIngredient)
        {

            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");

            insertUpdateFSIngredient.DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            insertUpdateFSIngredient.LoginId = userName;

            var result = RIDRepository.InsertUpdateFSIngredient(insertUpdateFSIngredient);

            if (result.Item1.ToLower().Contains("successfully"))
            {
                TempData["FS_SaveMessage"] = result.Item1;
                TempData["FS_SaveMessageClass"] = result.Item2;
            }
            var response = new
            {
                Message = result.Item1,
                Id = result.Item3
            };
            return Ok(response);
        }

        public PartialViewResult FoodSupplementPdf([FromBody] List<FSPdfData> generatePdfData)
        {
            FoodSupplementPDF fsPDF = new FoodSupplementPDF();
            fsPDF.FoodSupplementPDFList = generatePdfData;
            return PartialView(fsPDF);
        }

        public JsonResult GeneratePdfHtml(PdfData data)
        {
            var html = data.JsonString;

            html = html.Replace("strtTag", "<").Replace("EndTag", ">");

            HttpContext.Session.SetString("HtmlData", html);

            return Json("", new System.Text.Json.JsonSerializerOptions());
        }

        public FileResult GeneratePdfForAddIngredient(string Region, string IngredientName, string Type, [FromServices] IWebHostEnvironment env)
        {
            try
            {
                var html = HttpContext.Session.GetString("HtmlData");
                long ticks = DateTime.Now.Ticks;

                if (!Directory.Exists(Path.Combine(env.WebRootPath, "PDFDownload")))
                {
                    Directory.CreateDirectory(Path.Combine(env.WebRootPath, "PDFDownload"));
                }
                var filePath = Path.Combine(env.WebRootPath, "PDFDownload", "RIDFS_" + ticks + ".pdf");

                new PdfHeader().ManipulatePdf(html, filePath);

                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                string fileName;
                string sanitizedProjectName;

                if (Region != "")
                {
                    sanitizedProjectName = Regex.Replace("RID_Food Supplements_" + IngredientName + "_" + Region, @"[^\w\d\s]", string.Empty);
                }
                else
                {
                    sanitizedProjectName = Regex.Replace("RID_Food Supplements_" + IngredientName, @"[^\w\d\s]", string.Empty);
                }

                if (sanitizedProjectName.Length > 200)
                {
                    fileName = sanitizedProjectName.Substring(0, 185) + ".pdf";
                }
                else
                {
                    fileName = sanitizedProjectName + ".pdf";
                }

                return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [HttpPost]
        public IActionResult SaveComplianceRemarksData(int ingredientId, string ingredientName, string botanicalName, int ingredientTypeId, int regionId, string headerData, string additionalInformation, string inMedicine, string inFoodSupplement, string source)
        {
            var divisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int divisionId = divisionIdValue.HasValue ? divisionIdValue.Value : 0;

            var result = RIDRepository.SaveComplianceRemarksData(ingredientId, ingredientName, botanicalName, ingredientTypeId, divisionId, regionId, headerData, additionalInformation, inMedicine, inFoodSupplement, source, LoginId);
            if (result.Item1.ToLower().Contains("successfully"))
            {
                TempData["FS_SaveMessage"] = result.Item1;
                TempData["FS_SaveMessageClass"] = result.Item2;
            }
            var response = new
            {
                Message = result.Item1,
                Id = result.Item3
            };
            return Ok(response);
        }

        [HttpPost]
        public IActionResult SaveClaimsInfoData(int ingredientId, string ingredientName, string botanicalName, int ingredientTypeId, int regionId, int categoryId, string claimsInfo, string Source)
        {
            var divisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int divisionId = divisionIdValue.HasValue ? divisionIdValue.Value : 0;

            var result = RIDRepository.SaveClaimsInfoData(ingredientId, ingredientName, botanicalName, ingredientTypeId, divisionId, regionId, categoryId, claimsInfo, Source, LoginId);
            if (result.Item1.ToLower().Contains("successfully"))
            {
                TempData["FS_SaveMessage"] = result.Item1;
                TempData["FS_SaveMessageClass"] = result.Item2;
            }
            var response = new
            {
                Message = result.Item1,
                Id = result.Item3
            };
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetRegionWiseComplianceData(string StartDate = "", string EndDate = "", string searchText = "")
        {
            RID rid = new RID();
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            rid.Division_Id = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.GetIngredientList(rid.Division_Id, "IRA", LoginId, StartDate, EndDate, searchText);

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Regulatory Ingredient Database");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Ingredient Name";
                worksheet.Cell(currentRow, 2).Value = "Synonyms";
                worksheet.Cell(currentRow, 3).Value = "CAS Number";
                worksheet.Cell(currentRow, 4).Value = "Functions";
                worksheet.Cell(currentRow, 5).Value = "Adult - Leave On";
                worksheet.Cell(currentRow, 6).Value = "Adult - Rinse Off";
                worksheet.Cell(currentRow, 7).Value = "Baby - Leave On";
                worksheet.Cell(currentRow, 8).Value = "Baby - Rinse Off";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 9);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.IngredientName;
                    worksheet.Cell(currentRow, 2).Value = item.Synonyms;
                    worksheet.Cell(currentRow, 3).Value = item.CASNumber;
                    worksheet.Cell(currentRow, 4).Value = item.FunctionName;
                    worksheet.Cell(currentRow, 5).Value = item.AdultLeaveOn;

                    if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 5).Value = "HGML Approval Required";
                    }
                    else if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 5).Value = "Allowed";
                    }
                    else if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 5).Value = "Prohibited";
                    }
                    else if (item.AdultLeaveOn != null && item.AdultLeaveOn.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 5).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 5).Value = "";
                    }

                    worksheet.Cell(currentRow, 6).Value = item.AdultRinseOff;
                    if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 6).Value = "HGML Approval Required";
                    }
                    else if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Allowed";
                    }
                    else if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Prohibited";
                    }
                    else if (item.AdultRinseOff != null && item.AdultRinseOff.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 6).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Value = "";
                    }

                    worksheet.Cell(currentRow, 7).Value = item.BabyLeaveOn;
                    if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 7).Value = "HGML Approval Required";
                    }
                    else if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Allowed";
                    }
                    else if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Prohibited";
                    }
                    else if (item.BabyLeaveOn != null && item.BabyLeaveOn.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 7).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 7).Value = "";
                    }

                    worksheet.Cell(currentRow, 8).Value = item.BabyRinseOff;
                    if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "blue")
                    {
                        worksheet.Cell(currentRow, 8).Value = "HGML Approval Required";
                    }
                    else if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "green")
                    {
                        worksheet.Cell(currentRow, 8).Value = "Allowed";
                    }
                    else if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "red")
                    {
                        worksheet.Cell(currentRow, 8).Value = "Prohibited";
                    }
                    else if (item.BabyRinseOff != null && item.BabyRinseOff.ToLower() == "yellow")
                    {
                        worksheet.Cell(currentRow, 8).Value = "Restricted";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 8).Value = "";
                    }
                }
                worksheet.Column("1").Width = 20;
                worksheet.Column("2").Width = 20;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 15;
                worksheet.Column("7").Width = 15;
                worksheet.Column("8").Width = 15;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "RegionWiseCompliance.xlsx");
                }
            }
        }

        [HttpGet]
        public IActionResult GetFoodSupplementComplianceRequestExcelData(int IngredientTypeId, string ingredientTypeName, string startDate, string endDate, int status)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var loginId = HttpContext.Session.GetString("UserName");

            var result = RIDRepository.GetFoodSupplementComplianceRequestList(DivisionId, IngredientTypeId, loginId, startDate, endDate, status);
            var labelName = ingredientTypeName.Trim().ToLower() == "active herbs" ? "Ingredient Name (Sanskrit/English)" : "Ingredient Name";


            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("FSComplianceRequest");
                var currentRow = 1;
                if (ingredientTypeName.Trim().ToLower() == "active herbs")
                {
                    worksheet.Cell(currentRow, 1).Value = "Botanical Name";
                    worksheet.Cell(currentRow, 2).Value = labelName;
                    worksheet.Cell(currentRow, 3).Value = "Region";
                    worksheet.Cell(currentRow, 4).Value = "Status";
                    worksheet.Cell(currentRow, 5).Value = "Requested By";
                    worksheet.Cell(currentRow, 6).Value = "Requested Date";

                    var headerRange = worksheet.Range(currentRow, 1, currentRow, 7);
                    headerRange.Style.Font.Bold = true;
                    headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                    headerRange.Style.Font.FontColor = XLColor.White;
                    headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    foreach (var item in result)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.BotanicalName;
                        worksheet.Cell(currentRow, 2).Value = item.IngredientName;
                        worksheet.Cell(currentRow, 3).Value = item.Region;
                        worksheet.Cell(currentRow, 4).Value = item.Status;
                        worksheet.Cell(currentRow, 5).Value = item.CreatedBy;
                        string dateString = item.CreatedDate;
                        DateTime parsedDate;
                        if ((DateTime.TryParse(dateString, new CultureInfo("en-GB"), DateTimeStyles.None, out parsedDate)))
                        {
                            worksheet.Cell(currentRow, 6).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                        }
                        else
                        {
                            worksheet.Cell(currentRow, 6).Value = dateString;
                        }
                    }
                    worksheet.Column("1").Width = 20;
                    worksheet.Column("2").Width = 30;
                    worksheet.Column("3").Width = 30;
                    worksheet.Column("4").Width = 15;
                    worksheet.Column("5").Width = 15;
                    worksheet.Column("6").Width = 15;
                }
                else
                {
                    worksheet.Cell(currentRow, 1).Value = "Botanical Name";
                    worksheet.Cell(currentRow, 2).Value = labelName;
                    worksheet.Cell(currentRow, 3).Value = "CAS Number";
                    worksheet.Cell(currentRow, 4).Value = "Region";
                    worksheet.Cell(currentRow, 5).Value = "Status";
                    worksheet.Cell(currentRow, 6).Value = "Requested By";
                    worksheet.Cell(currentRow, 7).Value = "Requested Date";

                    var headerRange = worksheet.Range(currentRow, 1, currentRow, 7);
                    headerRange.Style.Font.Bold = true;
                    headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                    headerRange.Style.Font.FontColor = XLColor.White;
                    headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    foreach (var item in result)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.BotanicalName;
                        worksheet.Cell(currentRow, 2).Value = item.IngredientName;
                        worksheet.Cell(currentRow, 3).Value = item.CASNumber;
                        worksheet.Cell(currentRow, 4).Value = item.Region;
                        worksheet.Cell(currentRow, 5).Value = item.Status;
                        worksheet.Cell(currentRow, 6).Value = item.CreatedBy;
                        string dateString = item.CreatedDate;
                        DateTime parsedDate;
                        if ((DateTime.TryParse(dateString, new CultureInfo("en-GB"), DateTimeStyles.None, out parsedDate)))
                        {
                            worksheet.Cell(currentRow, 7).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                        }
                        else
                        {
                            worksheet.Cell(currentRow, 7).Value = dateString;
                        }
                    }
                    worksheet.Column("1").Width = 20;
                    worksheet.Column("2").Width = 30;
                    worksheet.Column("3").Width = 20;
                    worksheet.Column("4").Width = 30;
                    worksheet.Column("5").Width = 15;
                    worksheet.Column("6").Width = 15;
                    worksheet.Column("7").Width = 15;
                }

                if (ingredientTypeName.Trim().ToLower() != "active herbs")
                {
                    worksheet.Column(1).Hide();
                }
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "FoodSupplementComplianceRequest.xlsx");
                }
            }

        }

        [HttpGet]
        public IActionResult GetComplianceRequestExcelData(int IngredientTypeId, string IngredientTypeName, string startDate, string endDate, int status)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.GetIngredientRequest(DivisionId, "", startDate, endDate, status);


            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("ComplianceRequest");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Ingredient Name";
                worksheet.Cell(currentRow, 2).Value = "CAS Number";
                worksheet.Cell(currentRow, 3).Value = "Functions";
                worksheet.Cell(currentRow, 4).Value = "Region";
                worksheet.Cell(currentRow, 5).Value = "Status";
                worksheet.Cell(currentRow, 6).Value = "Requested By";
                worksheet.Cell(currentRow, 7).Value = "Requested Date";


                var headerRange = worksheet.Range(currentRow, 1, currentRow, 7);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.IngredientName;
                    worksheet.Cell(currentRow, 2).Value = item.CASNumber;
                    worksheet.Cell(currentRow, 3).Value = item.FunctionName;
                    worksheet.Cell(currentRow, 4).Value = item.Region;
                    worksheet.Cell(currentRow, 5).Value = item.Status;
                    worksheet.Cell(currentRow, 6).Value = item.CreatedBy;
                    //worksheet.Cell(currentRow, 7).Value = item.CreatedDate;
                    string dateString = item.CreatedDate;
                    DateTime parsedDate;
                    if ((DateTime.TryParse(dateString, new CultureInfo("en-GB"), DateTimeStyles.None, out parsedDate)))
                    {
                        worksheet.Cell(currentRow, 7).SetValue(parsedDate.ToString("dd/MM/yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 7).Value = dateString; // or set some default/fallback value
                    }
                }
                worksheet.Column("1").Width = 40;
                worksheet.Column("2").Width = 30;
                worksheet.Column("3").Width = 40;
                worksheet.Column("4").Width = 30;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 20;
                worksheet.Column("7").Width = 15;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "ComplianceRequest.xlsx");
                }
            }

        }

        public IActionResult FoodSupplementComplianceRequest()
        {
            var DivisionName = HttpContext.Session.GetString("DivisionName");

            RID rid = new RID();
            rid.DivisionName = DivisionName;
            rid.IngredientTypeList = RIDRepository.GetIngredientTypeList("IngredientType");
            rid.StatusDetails = RIDRepository.GetStatusList("IRStatus");
            return View(rid);
        }

        [HttpGet]
        public IActionResult FoodSupplementComplianceRequestGetListBasedOnSearch(int IngredientTypeId, string startDate, string endDate, int status)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var loginId = HttpContext.Session.GetString("UserName");
            var result = RIDRepository.GetFoodSupplementComplianceRequestList(DivisionId, IngredientTypeId, loginId, startDate, endDate, status);
            return Ok(result);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult FoodSupplementRIDApproval(string pageCode)
        {
            RID rid = new RID();

            rid.DivisionName = HttpContext.Session.GetString("DivisionName");
            rid.IngredientTypeList = RIDRepository.GetIngredientTypeList("IngredientType");

            if (pageCode == "2")
            {
                rid.PageName = "Level 2";
                rid.UserApprovalLevel = "Level2";
            }
            else if (pageCode == "1")
            {
                rid.PageName = "Level 1";
                rid.UserApprovalLevel = "Level1";
            }
            else
            {
                rid.PageName = "";
                rid.UserApprovalLevel = "";
            }

            return View(rid);
        }

        [HttpGet]
        public IActionResult FoodSupplementGetMostRecentRemark(int ingredientTypeId)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            var divisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var result = RIDRepository.FSGetMostRecentRemark(divisionId, ingredientTypeId);
            return Ok(result);
        }

        [HttpGet]
        public IActionResult FoodSupplementGetApprovalData(int ingredientTypeId, string pageAppLevel)
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;

            var result = RIDRepository.FoodSupplementApprove_GetIngredientList(DivisionId, LoginId, ingredientTypeId, pageAppLevel);
            return Ok(result);
        }

        [HttpGet]
        public JsonResult FoodSupplementRegulatoryStatusDropDownData()
        {
            var DivisionIdValue = HttpContext.Session.GetInt32("DivisionId");
            int DivisionId = DivisionIdValue.HasValue ? DivisionIdValue.Value : 0;
            var result = RIDRepository.FoodSupplementsRegulatoryStatusDropDownData(DivisionId, "RegStatusAndCategory");
            string jsonResponse = JsonConvert.SerializeObject(result);
            return Json(jsonResponse);
        }

        [HttpGet]
        public IActionResult GetFoodSupplementComplianceRemarks(int ingredientTypeId, int ingredientId, int regionId)
        {
            var result = RIDRepository.GetFoodSupplementComplianceRemarks(ingredientTypeId, ingredientId, regionId);
            var headerData = result.HeaderData;
            var cRemarksData = result.CRemarksData;
            var response = new
            {
                HeaderData = headerData,
                CRemarksData = cRemarksData
            };
            return Ok(response);
        }
        [HttpGet]
        public IActionResult GetFoodSupplementClaimsInfo(int ingredientId, int regionId, int categoryId)
        {
            var result = RIDRepository.GetFoodSupplementClaimsInfo(ingredientId, regionId, categoryId);
            return Ok(result);
        }
        [HttpGet]
        public string GetFoodSupplementComplianceRemarksInactives(int ingredientId, int regionId, int categoryId)
        {
            var result = RIDRepository.GetFoodSupplementComplianceRemarksInactives(ingredientId, regionId, categoryId);
            return result;
        }
        #endregion

        #region RegionComplianceHeader

        public IActionResult ComplianceHeaderMaster()
        {
            ComplianceHeaderMaster chm = new ComplianceHeaderMaster();
            chm.Division = HttpContext.Session.GetString("DivisionName");
            chm.RegionList = RIDRepository.GetRegionList();
            chm.IngredientTypeList = RIDRepository.GetIngredientTypeData().Where(m => m.IngredientTypeName.ToLower() != "inactives").ToList();
            return View(chm);
        }

        public IActionResult GetComplianceHeaderMasterData()
        {
            var result = RIDRepository.GetComplianceHeaderData();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult SaveRegionComplianceHeader(ComplianceHeaderMaster headerData)
        {
            var LoginId = HttpContext.Session.GetString("UserName");
            var result = RIDRepository.SaveComplianceHeaderDetails(headerData.JsonHeaderData, LoginId);
            //TempData["Message"] = result.Item1;
            //TempData["Messageclass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }
        [HttpPost]
        public IActionResult DeleteRegionComplianceHeader(ComplianceHeaderMaster headerData)
        {
            var LoginId = HttpContext.Session.GetString("UserName");
            var result = RIDRepository.DeleteComplianceHeaderDetails(headerData.RegionId, headerData.IngredientTypeId, headerData.ComplianceHeaderId, LoginId);
            //TempData["Message"] = result.Item1;
            //TempData["Messageclass"] = result.Item2;
            return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        }
        #endregion

        #region Common

        [HttpGet]
        public IActionResult GetIngHistoryData(int ingredientId)
        {
            var result = RIDRepository.GetIngHistoryData(ingredientId);
            var response = new
            {
                Header = result.Header,
                Details = result.Details,
            };
            return Ok(response);
        }

        #endregion
    }
}