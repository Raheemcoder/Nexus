//using DocumentFormat.OpenXml.Drawing;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Spreadsheet;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using iText.Commons.Actions.Data;
using iText.Html2pdf;
using iTextSharp.text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
//using System.Web.Mvc;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class PrototypeController : BaseController
    {

        private readonly IConfiguration? Configuration;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IPrototypeRepository prototypeRepository;
        private readonly IHttpContextAccessor httpContextAccessor;

        public PrototypeController(IWebHostEnvironment webHostEnvironment, IConfiguration Configuration, IPrototypeRepository prototypeRepository, IHttpContextAccessor httpContextAccessor)
        {
            this.Configuration = Configuration;
            this.webHostEnvironment = webHostEnvironment;
            this.prototypeRepository = prototypeRepository;
            this.httpContextAccessor = httpContextAccessor;

        }


        [HttpGet]
        public IActionResult Prototype()
        {
            Prototype prototype = new Prototype();
            var empId = HttpContext.Session.GetString("UserName");
            var Role = HttpContext.Session.GetString("Role");
            var RoleId = HttpContext.Session.GetString("RoleId");
            var AppShortName = HttpContext.Session.GetString("AppShortName");
            var result = prototypeRepository.GetPrototypeDetailsHeaderData(empId, AppShortName);
            prototype.PrototypeDetailsHeaderData = JsonConvert.SerializeObject(result);
            prototype.projectnumberlist = prototypeRepository.GetProjectNumber();
            prototype.ProjectNoList = prototype.projectnumberlist.Select(m => new SelectListItem { Text = m.ProjectNo + "-" + m.ProjectName, Value = m.ProjectNo });
            prototype.productnamelist = prototypeRepository.GetProjectNames();
            prototype.ProjectNames = prototype.productnamelist.Select(m => new SelectListItem { Text = m.ProductName, Value = m.ProductName });
            prototype.statuslist = prototypeRepository.GetStatusNames();
            prototype.statusNames = prototype.statuslist.Select(m => new SelectListItem { Text = m.StatusName, Value = m.StatusId });
            prototype.RoleId = RoleId;
            prototype.Role = Role;
            prototype.empId = empId;
            return View(prototype);
        }

        public string PrototypeHeaderData(string ProjectNo, string ProductName, int StatusId)
        {
            Prototype prototype = new Prototype();
            var empId = HttpContext.Session.GetString("UserName");
            var AppShortName = HttpContext.Session.GetString("AppShortName");
            var result = prototypeRepository.GetPrototypeDetailsHeaderData(ProjectNo, ProductName, StatusId, empId, AppShortName);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;

        }
        public IActionResult AddPrototype()
        {
            try
            {
                //PBMasters masters = master.GetPBMasters();

                ProtMaster protMaster = prototypeRepository.GetProtMaster();
                Prototype prototype = new Prototype();

                var userName = HttpContext.Session.GetString("UserName");

                prototype.ProjectNoList = protMaster.ProjectDetailList.Select(m => new SelectListItem { Text = m.ProjectNo + " - " + m.ProjectName, Value = Convert.ToString(m.ProjectNo) });
                prototype.ProjectDetails = JsonConvert.SerializeObject(protMaster.ProjectDetailList);

                return View(prototype);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult AddPrototype(Prototype prototype)
        {
            try
            {
                var userName = HttpContext.Session.GetString("UserName");

                prototypeRepository.UploadAddPrototypData(prototype, userName);

                return RedirectToAction("Prototype", "Prototype");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public JsonResult UploadPrototypeDetails(Prototype prototype, string prototypeId)
        {
            var userName = HttpContext.Session.GetString("UserName");
            var result = prototypeRepository.UploadPrototypeDetails(prototype, userName, prototypeId);
            return Json(result);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult EditAddPrototype(string prototypeId, string statusId, string iconName)
        {
            try
            {
                Prototype prototype = new Prototype();

                var userName = HttpContext.Session.GetString("UserName");
                var userRoleId = HttpContext.Session.GetString("RoleId");

                prototype.UserRoleId = userRoleId;
                prototype.UserName = userName;

                if (iconName == "View" && statusId != "4" && statusId != "5" && statusId != "6" && statusId != "9" && statusId != "8" && statusId != "7")
                {
                    var status = Convert.ToInt16(statusId) - 1;
                    prototype.StatusId = Convert.ToString(status);
                }
                //else if (iconName == "View" && statusId == "7")
                //{
                //    prototype.StatusId = "5";
                //}
                else
                {
                    prototype.StatusId = statusId;
                }
                prototype.Icon = iconName;

                ProtMaster protMaster = prototypeRepository.GetProtMaster();

                var prototypeData = prototypeRepository.GetPrototypeData(prototypeId, statusId);

                prototype.PrototypeDetailsList = prototypeData.PrototypeDetailsList;
                prototype.PrototypeSubmissionDetailsList = prototypeData.PrototypeSubmissionDetailsList;

                foreach (var data in prototypeData.PrototypeDetailsList)
                {
                    if (data.ReceivedDate != null)
                    {
                        prototype.ReceivedDate = data.ReceivedDate;

                    }
                }
                var jsonFormPrototypeData = JsonConvert.SerializeObject(prototypeData);
                prototype.JsonFormPrototypeData = jsonFormPrototypeData;


                var reworkData = prototypeRepository.GetPrototypeReworkData(prototypeId);

                var jsonFormPrototypeReworkData = JsonConvert.SerializeObject(reworkData);
                prototype.JsonFormPrototypeReworkData = jsonFormPrototypeReworkData;


                if (prototype.StatusId == "4")
                {
                    var hubReviewData = prototypeRepository.GetPrototypeHubReviewData(prototypeId, userName);

                    var jsonFormPrototypeHubReviewData = JsonConvert.SerializeObject(hubReviewData);
                    prototype.JsonFormPrototypeHubReviewData = jsonFormPrototypeHubReviewData;
                }

                if (prototype.StatusId == "5")
                {
                    var hgmlReviewData = prototypeRepository.GetPrototypeHgmlReviewData(prototypeId, userName);
                    var jsonFormPrototypeHgmlReviewData = JsonConvert.SerializeObject(hgmlReviewData);
                    prototype.JsonFormPrototypeHgmlReviewData = jsonFormPrototypeHgmlReviewData;

                    var hubdetails = prototypeRepository.GetPrototypeHubStatusDetails(prototypeId);
                    prototype.PrototypeHubDetais = JsonConvert.SerializeObject(hubdetails);
                }

                if (prototype.StatusId == "6" || prototype.StatusId == "8")
                {
                    var approvedData = prototypeRepository.GetPrototypeApprovedData(prototypeId);

                    var jsonFormPrototypeApprovedData = JsonConvert.SerializeObject(approvedData);
                    prototype.JsonFormPrototypeApprovedData = jsonFormPrototypeApprovedData;
                }

                if (prototype.StatusId == "7")
                {
                    reworkData = prototypeRepository.GetPrototypeReworkData(prototypeId);

                    jsonFormPrototypeReworkData = JsonConvert.SerializeObject(reworkData);
                    prototype.JsonFormPrototypeReworkData = jsonFormPrototypeReworkData;
                }

                prototype.ProjectNoList = protMaster.ProjectDetailList.Select(m => new SelectListItem { Text = m.ProjectNo + " - " + m.ProjectName, Value = Convert.ToString(m.ProjectNo) });
                prototype.ProjectDetails = JsonConvert.SerializeObject(protMaster.ProjectDetailList);

                return View(prototype);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult EditAddPrototype(Prototype prototype)
        {
            Prototype prototypeData = new Prototype();

            try
            {
                var userName = HttpContext.Session.GetString("UserName");

                var statusId = prototype.StatusId;
                var fromStageName = prototype.FromStageName;

                if ((statusId == "1" || statusId == "2" || statusId == "3") && fromStageName == "PrepareFandD")
                {
                    prototypeRepository.UploadAddPrototypData(prototype, userName);
                }
                if ((statusId == "3" || statusId == "4" || statusId == "9") && fromStageName == "PmdReview")
                {
                    prototypeData = prototypeRepository.UploadPrototypePmdReviewData(prototype, userName);
                }
                if ((statusId == "4" || statusId == "5") && fromStageName == "HubReview")
                {
                    prototypeData = prototypeRepository.UploadPrototypeHubReviewData(prototype, userName);
                }
                if ((statusId == "5" || statusId == "6") && fromStageName == "HgmlReview")
                {
                    prototypeData = prototypeRepository.UploadPrototypeHgmlReviewData(prototype, userName);
                }
                if ((statusId == "7" || statusId == "3") && fromStageName == "Rework")
                {
                    prototypeRepository.UploadAddPrototypData(prototype, userName);
                }
                if ((statusId == "9" || statusId == "3") && fromStageName == "SentBackToInitiator")
                {
                    prototypeRepository.UploadAddPrototypData(prototype, userName);
                }
                if ((statusId == "10" || statusId == "3"|| statusId == "9") && fromStageName == "PendingForApproval")
                {
                    prototypeRepository.UploadAddPrototypData(prototype, userName);
                }

                TempData["Message"] = prototypeData.OutMessage;
                TempData["Messageclass"] = prototypeData.StyleClass;

                return RedirectToAction("Prototype", "Prototype");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveImageFile(IFormFile file)
        {
            var Data = "";

            if (file != null)
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["PrototypeFileUpload:PrototypeFileUploadLocal"]);

                var FileInfo = new FileInfo(file.FileName.ToString());
                var name = FileInfo.Name;

                //var date = DateTime.Now.ToString("dd-MM-yy HH-mm-ss");
                //name = Regex.Replace(name, "[^0-9A-Za-z ,]", ",");
                //var fileName = Path.GetFileNameWithoutExtension(name) + "-" + date + FileInfo.Extension;

                var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(name);
                var fileName = RemoveSpecialChars(fileNameWithoutExtension);
                fileName = fileName + FileInfo.Extension;

                var filePath = Path.Combine(uploadsFolder, fileName);

                bool existsFolder = Directory.Exists(filePath);

                if (!existsFolder)
                {
                    System.IO.Directory.CreateDirectory(uploadsFolder);
                }

                Data = System.Text.Json.JsonSerializer.Serialize(fileName);

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

        public void DeleteImageFile(string fileName)
        {
            try
            {
                var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["PrototypeFileUpload:PrototypeFileUploadLocal"], fileName);

                // Check if file exists with its full path
                if (System.IO.File.Exists(filePath))
                {
                    // If file found, delete it    
                    System.IO.File.Delete(filePath);
                }
            }
            catch (IOException ioExp)
            {
                Console.WriteLine(ioExp.Message);
            }
        }

        public async Task<IActionResult> DownloadImageFile(string fileName)
        {
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["PrototypeFileUpload:PrototypeFileUploadLocal"], fileName);
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var FileName = System.IO.Path.GetFileName(filePath);
            new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(filePath), out var contentType);
            return File(fileBytes, contentType ?? "application/octet-stream", FileName);
        }
        public JsonResult GetPmdUser(string prototypeId)
        {
            var AppShortName = HttpContext.Session.GetString("AppShortName");
            var result = prototypeRepository.GetPmdUser(prototypeId, AppShortName);

            return Json(result);
        }

        public JsonResult GetSupportingDocumentDetail(string prototypeId)
        {

            var result = prototypeRepository.GetSupportingDocumentDetail(prototypeId);
            return Json(result);
        }
        public JsonResult GetPrototypeHistory(string prototypeId)
        {
            Prototype pro = new Prototype();
            var PrototypeId = prototypeId;
            HttpContext.Session.SetString("PrototypeId", PrototypeId);
            var result = prototypeRepository.GetPrototypeHistoryDetail(prototypeId, "");
            return Json(result);
        }


        public IActionResult GetPrototypeExcel()
        {

            var prototypeId = HttpContext.Session.GetString("PrototypeId");
            var documentdata = prototypeRepository.GetPrototypeHistoryDetail(prototypeId, "1");
            var document = documentdata.PrototypeApprovalHistory;
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("PrototypeApprovalHistory");
                //var row1RangeC1 = worksheet.Range("A1:H1");
                //row1RangeC1.Style.Fill.BackgroundColor = XLColor.Blue;
                var currentRow = 1;
                #region Header

                worksheet.Cell(currentRow, 1).Value = "S.No.";
                worksheet.Cell(currentRow, 1).Style.Font.SetBold();
                worksheet.Cell(currentRow, 1).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 1).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 2).Value = "From Stage";
                worksheet.Cell(currentRow, 2).Style.Font.SetBold();
                worksheet.Cell(currentRow, 2).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 2).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 2).Style.Fill.BackgroundColor = XLColor.BallBlue;
                worksheet.AutoFilter.Column(2);


                worksheet.Cell(currentRow, 3).Value = "To Stage";
                worksheet.Cell(currentRow, 3).Style.Font.SetBold();
                worksheet.Cell(currentRow, 3).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 3).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 3).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 4).Value = "Assigned To";
                worksheet.Cell(currentRow, 4).Style.Font.SetBold();
                worksheet.Cell(currentRow, 4).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 5).Value = "Submitted On";
                worksheet.Cell(currentRow, 5).Style.Font.SetBold();
                worksheet.Cell(currentRow, 5).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 6).Value = "Received On";
                worksheet.Cell(currentRow, 6).Style.Font.SetBold();
                worksheet.Cell(currentRow, 6).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 6).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 7).Value = "Submitted By";
                worksheet.Cell(currentRow, 7).Style.Font.SetBold();
                worksheet.Cell(currentRow, 7).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 7).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 7).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 8).Value = "No Of Days Taken";
                worksheet.Cell(currentRow, 8).Style.Font.SetBold();
                worksheet.Cell(currentRow, 8).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 8).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 9).Value = "Remarks";
                worksheet.Cell(currentRow, 9).Style.Font.SetBold();
                worksheet.Cell(currentRow, 9).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 9).Style.Fill.BackgroundColor = XLColor.BallBlue;
                #endregion
                #region Body

                var index = 1;
                foreach (var item in document)
                {
                    currentRow++;
                    if (index % 2 == 0)
                    {
                        worksheet.Cell(currentRow, 1).Value = index;
                        worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 1).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 2).Value = item.FromStageName;
                        worksheet.Cell(currentRow, 2).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 2).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 3).Value = item.ToStageName;
                        worksheet.Cell(currentRow, 3).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 3).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 4).Value = item.AssignedTo;
                        worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 4).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 5).Value = item.SubmittedOn;
                        worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 5).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;


                        worksheet.Cell(currentRow, 6).Value = item.ReceivedOn;
                        worksheet.Cell(currentRow, 6).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 6).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 7).Value = item.RemarksBy;
                        worksheet.Cell(currentRow, 7).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 7).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 8).Value = item.NoOfDaysTaken;
                        worksheet.Cell(currentRow, 8).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 8).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 9).Value = item.Remarks;
                        worksheet.Cell(currentRow, 9).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 9).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 1).Value = index;
                        worksheet.Cell(currentRow, 2).Value = item.FromStageName;
                        worksheet.Cell(currentRow, 3).Value = item.ToStageName;
                        worksheet.Cell(currentRow, 4).Value = item.AssignedTo;
                        worksheet.Cell(currentRow, 5).Value = item.SubmittedOn;
                        worksheet.Cell(currentRow, 6).Value = item.ReceivedOn;
                        worksheet.Cell(currentRow, 7).Value = item.RemarksBy;
                        worksheet.Cell(currentRow, 8).Value = item.NoOfDaysTaken;
                        worksheet.Cell(currentRow, 9).Value = item.Remarks;
                    }
                    index++;
                }
                worksheet.Column("1").Width = 10;
                worksheet.Column("2").Width = 25;
                worksheet.Column("3").Width = 25;
                worksheet.Column("4").Width = 40;
                worksheet.Column("5").Width = 25;
                worksheet.Column("6").Width = 25;
                worksheet.Column("7").Width = 30;
                worksheet.Column("8").Width = 20;
                worksheet.Column("9").Width = 70;

                #endregion

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "PrototypeApprovalHistory.xlsx");
                }
            }
        }

        public JsonResult GetHubDetails(string PrototypeId, string BatchNo)
        {
            var AppShortName = HttpContext.Session.GetString("AppShortName");
            var result = prototypeRepository.GetHubDetails(PrototypeId, BatchNo, AppShortName);

            return new Microsoft.AspNetCore.Mvc.JsonResult(new { hubUserDetail = result.hubUserDetail, hubDetailTableData = result.hubDetailTableData, batchNoDetail = result.batchNoDetail });

            //return Json(result);
        }

        public JsonResult UploadPrototypeHubDetailsInPmdReview(string hubDetailsData, string prototypeId)
        {

            var userName = HttpContext.Session.GetString("UserName");

            var result = prototypeRepository.UploadPrototypeHubDetailsInPmdReview<PrototypeSubmissionDetail>(hubDetailsData, prototypeId, userName);

            return Json(result);
        }

        public PartialViewResult Prototypepdf(string PrototypeId)
        {
            PrototypeReport data = new PrototypeReport();

            var ProjectHeader = prototypeRepository.GetPrototypeReportData(PrototypeId);

            return PartialView(ProjectHeader);
        }
        public JsonResult GeneratePrototypePDF(PrototypeReport data)
        {
            var html = data.JsonString;
            html = html.Replace("strtTag", "<").Replace("EndTag", ">");
            HttpContext.Session.SetString("HtmlData", html);
            return Json("", new System.Text.Json.JsonSerializerOptions());
        }

        public FileResult GenerateProtoPDF(string PrototypeId,string ProductName)
         {
            MemoryStream file = new MemoryStream();
            try
            {
                using (file)
                {
                    var html = HttpContext.Session.GetString("HtmlData");
                    ConverterProperties converterProperties = new ConverterProperties();
                    var request = httpContextAccessor.HttpContext.Request;
                    var domain = $"{request.Scheme}://{request.Host}{request.PathBase}";
                    iTextSharp.text.pdf.PdfWriter writer1 = iTextSharp.text.pdf.PdfWriter.GetInstance(new Document(), file);
                    converterProperties = new ConverterProperties().SetBaseUri(domain);
                    HtmlConverter.ConvertToPdf(html, file, converterProperties);
                    byte[] arr1 = file.ToArray();
                    var filename = PrototypeId + "_" + ProductName;
                    return File(arr1, "application/pdf", filename+".pdf");
                }
            }
            catch (Exception ex)
            {
            }
            finally
            {
                file.Dispose();
            }
            return File(file, "application/pdf", "PrtotypePdf.pdf");
        }

        public JsonResult GetHubStatusDetails(string prototypeId)
        {
            var result = prototypeRepository.GetPrototypeHubStatusDetails(prototypeId);

            return Json(result);
        }

        [HttpPost]
        public string HubStatusInfo(string PrototypeId)
        {
            var hubInfoDataData = prototypeRepository.GetHubStatusInfo(PrototypeId);
            var jsonResult = JsonConvert.SerializeObject(hubInfoDataData);
            return jsonResult;
        }

        public IActionResult DeletePrototypeData(string PrototypeId)
        {
            prototypeRepository.DeletePrototypeData(PrototypeId);
            return RedirectToAction("Prototype", "Prototype");
        }


        public string DeleteSupportingDocument(string fileName, string prototypeId, string statusId)
        {
            var result = prototypeRepository.DeleteSupportingDocument(fileName, prototypeId, statusId);
            return result;
        }

        public int DownloadedFileInfo(string data)
        {
            var result = prototypeRepository.InsertDownloadedFileInfo(data);
            return result;
        }

        public string GetCompositionHistory(string PrototypeId)
        {
            var result = prototypeRepository.GetCompositionHistory(PrototypeId);
            var jsonResult = JsonConvert.SerializeObject(result);
            return jsonResult;

        }
    }
}

