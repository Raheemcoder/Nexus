using Dapper;
using Ideation.Core;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Ideation.Filters;
using log4net;
using Newtonsoft.Json;
using System.Runtime.Intrinsics.Arm;
using Microsoft.AspNetCore.Mvc.Rendering;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.CodeAnalysis;

namespace Ideation.Controllers
{
    public class RDMSController : BaseController
    {
        private readonly IRDMSRepository rdmsRepository;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;

        public RDMSController(IRDMSRepository rdmsRepository, IWebHostEnvironment webHostEnvironment, IConfiguration Configuration)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.rdmsRepository = rdmsRepository;
            this.Configuration = Configuration;
        }


        public IActionResult LicenseManagementList()
        {
            RDMS rDMS = new RDMS();
            try
            {
                rDMS.DropDownMastersDataList = rdmsRepository.GetLicenseManagementMasterData(LoginId, Role);
                rDMS.AutosuggestDropdown = JsonConvert.SerializeObject(rDMS.DropDownMastersDataList);
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "LicenseManagementList", ex.Message);
            }
            return View(rDMS);
        }
        public IActionResult GetLicenseManagementListData(string Plant, string Status, string FromDate, string ToDate, string LicType, string LicenceType, string DocCategory)
        {
            (IEnumerable<LicenseHeaderCollection>? LicenseHeader, IEnumerable<dynamic>? LicenseTypeCount) result = (null, null);
            var response = new
            {
                Headerdata = (IEnumerable<LicenseHeaderCollection>?)null,
                CountData = (IEnumerable<dynamic>?)null
            };

            try
            {
                result = rdmsRepository.GetLicenseManagementListData(LoginId, Role, Plant, Status, FromDate, ToDate, LicType, LicenceType, DocCategory);
                response = new
                {
                    Headerdata = result.LicenseHeader,
                    CountData = result.LicenseTypeCount
                };
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "GetLicenseManagementListData", ex.Message);
            }

            return Ok(response);
        }
        public IActionResult GetLicensePopupData(int Type, string LicenseHeaderId, string Version, string CreatedOn, string DocId)
        {
            IEnumerable<dynamic>? result = null;
            try
            {
                result = rdmsRepository.GetLicensePopupData(LoginId, Role, Type, LicenseHeaderId, Version, CreatedOn, DocId).ToList();
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "GetLicensePopupData", ex.Message);
            }
            return Ok(result);
        }
        public IActionResult DownloadLicensesExcel(string Plant, string Status, string FromDate, string ToDate, string LicType, string LicenceType, string DocCategory)
        {
            var fileName = "Licenses.xlsx";
            byte[] bytes = [];
            try
            {
                (IEnumerable<LicenseHeaderCollection>? LicenseHeader, IEnumerable<dynamic>? LicenseTypeCount) result = (null, null);
                result = rdmsRepository.GetLicenseManagementListData(LoginId, Role, Plant, Status, FromDate, ToDate, LicType, LicenceType, DocCategory);
                var data = result.LicenseHeader;

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Licenses");
                    var currentRow = 1;

                    worksheet.Cell(currentRow, 1).Value = "Reference No.";
                    worksheet.Cell(currentRow, 2).Value = "Plant";
                    worksheet.Cell(currentRow, 3).Value = "Document Category";
                    worksheet.Cell(currentRow, 4).Value = "Document Type";
                    worksheet.Cell(currentRow, 5).Value = "Document No.";
                    worksheet.Cell(currentRow, 6).Value = "Valid From";
                    worksheet.Cell(currentRow, 7).Value = "Valid To";
                    worksheet.Cell(currentRow, 8).Value = "Remarks";
                    worksheet.Cell(currentRow, 9).Value = "Status (days)";
                    worksheet.Cell(currentRow, 10).Value = "Document";

                    var headerRange = worksheet.Range(currentRow, 1, currentRow, 10);
                    headerRange.Style.Font.Bold = true;
                    headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                    headerRange.Style.Font.FontColor = XLColor.White;
                    headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    worksheet.Column("1").Width = 15;
                    worksheet.Column("2").Width = 50;
                    worksheet.Column("3").Width = 15;
                    worksheet.Column("4").Width = 40;
                    worksheet.Column("5").Width = 40;
                    worksheet.Column("6").Width = 12;
                    worksheet.Column("7").Width = 12;
                    worksheet.Column("8").Width = 50;
                    worksheet.Column("9").Width = 30;
                    worksheet.Column("10").Width = 50;

                    worksheet.Column(1).Style.Alignment.WrapText = true;
                    worksheet.Column(2).Style.Alignment.WrapText = true;
                    worksheet.Column(3).Style.Alignment.WrapText = true;
                    worksheet.Column(4).Style.Alignment.WrapText = true;
                    worksheet.Column(5).Style.Alignment.WrapText = true;
                    worksheet.Column(6).Style.Alignment.WrapText = true;
                    worksheet.Column(7).Style.Alignment.WrapText = true;
                    worksheet.Column(8).Style.Alignment.WrapText = true;
                    worksheet.Column(9).Style.Alignment.WrapText = true;
                    worksheet.Column(10).Style.Alignment.WrapText = true;

                    foreach (var item in data)
                    {
                        currentRow++;

                        var plantName = (item.ManufacturingPlantCode != "" && item.ManufacturingPlantName != "") ?
                           item.ManufacturingPlantCode + " - " + item.ManufacturingPlantName : item.ManufacturingPlantName;

                        worksheet.Cell(currentRow, 1).Value = item.LicenseHeaderId + " - " + item.Version;
                        worksheet.Cell(currentRow, 2).Value = plantName;
                        worksheet.Cell(currentRow, 3).Value = item.DocumentCategoryName;
                        worksheet.Cell(currentRow, 4).Value = item.LicenseTypeName;
                        worksheet.Cell(currentRow, 5).Value = item.DocNumber;
                        worksheet.Cell(currentRow, 6).Value = item.ValidFrom;
                        worksheet.Cell(currentRow, 7).Value = item.ValidTo;
                        worksheet.Cell(currentRow, 8).Value = item.Remarks;
                        worksheet.Cell(currentRow, 9).Value = item.Status + " " + item.DueDate;
                        if (item.Status != null)
                        {
                            if (item.Status.ToLower() == "active")
                            {
                                worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.Green;
                            }
                            else if (item.Status.ToLower() == "overdue")
                            {
                                worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.Red;
                            }
                            else if (item.Status.ToLower() == "pending for renewal")
                            {
                                worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.GoldenYellow;
                            }
                            else if (item.Status.ToLower() == "draft")
                            {
                                worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.SkyBlue;
                            }
                        }
                        worksheet.Cell(currentRow, 10).Value = item.HeaderDocumentName;
                    }

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        bytes = stream.ToArray();
                    }
                }
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "DownloadLicensesExcel", ex.Message);
            }

            return File(bytes,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileName);
        }

        public IActionResult AddLicenseManagement()
        {
            RDMS rDMS = new RDMS();
            try
            {
                rDMS.DropDownMastersDataList = rdmsRepository.GetLicenseManagementMasterData(LoginId, Role);
                rDMS.AutosuggestDropdown = JsonConvert.SerializeObject(rDMS.DropDownMastersDataList);
                rDMS.LoginId = LoginId;
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "AddLicenseManagement", ex.Message);
            }

            return View(rDMS);
        }
        public IActionResult PlantMaster()
        {
            PlantMaster pb = rdmsRepository.GetRDMSDropDownData();
            pb.PlantList = pb.PlantCodeData.Select(m => new SelectListItem
            {
                Text = m.Name,
                Value = Convert.ToString(m.Id)
            });
            pb.StatusList = pb.StatusData.Select(m => new SelectListItem
            {
                Text = m.Name,
                Value = Convert.ToString(m.Id)
            });
            return View(pb);
        }

        public IActionResult GetPlantList(string plantCode, int Status)
        {
            var result = rdmsRepository.GetPlantList(plantCode, Status);
            return Ok(result);
        }

        public IActionResult GetPlantListById(int plantId)
        {
            var result = rdmsRepository.GetPlantListById(plantId);
            return Ok(result);
        }

        public IActionResult UpdatePlantMaster(int PlantId, int Status)
        {
            var result = rdmsRepository.UpdatePlantStatus(PlantId, Status, HttpContext.Session.GetString("UserName").ToString());
            TempData["Message"] = result.OutMessage;
            TempData["MessageClass"] = result.StyleClass;
            return RedirectToAction("PlantMaster", "RDMS");
        }

        public IActionResult GetProductGroupMaterialData(string Plant, string ProductGroup, string FromDate, string ToDate, string LicenceType, string Material)
        {
            var result = rdmsRepository.GetProductGroupMaterialData(Plant,ProductGroup,FromDate,ToDate,LicenceType,Material);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult InsertRDMSData()
        {
            var RequestedData = Convert.ToString(Request.Form["RequestData"]);
            var Productgroup = Convert.ToString(Request.Form["Productgroup"]);
            var Action = Convert.ToString(Request.Form["Action"]);
            var Remarks = Convert.ToString(Request.Form["Remarks"]);
            var DeclarationData = Convert.ToString(Request.Form["DeclarationData"]);

            var result = rdmsRepository.InsertRDMSData(RequestedData, Productgroup, DeclarationData, Remarks, LoginId, Action);
            TempData["Message"] = result.Item1;
            TempData["MessageClass"] = result.Item2;
            return Json(result.Item1);
        }

        [HttpPost]
        public IActionResult UploadFileInChunks(IFormFile file, string UpdatedFileName, int chunkIndex, int totalChunks)
        {
            var folder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RDMSFileUpload:RDMSFileUploadLocal"]);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var pathname = !string.IsNullOrEmpty(UpdatedFileName)
            ? Path.Combine(Convert.ToString(folder), UpdatedFileName)
            : "";

            if (chunkIndex == 0 && !System.IO.File.Exists(pathname) && pathname != "")
            {
                var FileInfo = new FileInfo(file.FileName.ToString());
                var name = FileInfo.Name;
                var fileName = Path.GetFileNameWithoutExtension(name);
                var fileExtension = FileInfo.Extension;
                var newFileName = string.Concat(RemoveSpecialChars(fileName), fileExtension);
                if (!System.IO.File.Exists(newFileName))
                {
                    var filepath = Path.Combine(Convert.ToString(folder), newFileName);
                    using (var fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                    return Ok(newFileName);
                }
            }
            else if (chunkIndex == 0 && System.IO.File.Exists(pathname))
            {
                System.IO.File.Delete(pathname);
            }
            if (pathname != "")
            {
                // Append the chunk to the file
                using (var stream = new FileStream(pathname, FileMode.Append))
                {
                    file.CopyTo(stream);
                }
            }

            // If it's the last chunk, process the file as needed
            if (chunkIndex == totalChunks - 1)
            {
                return Ok(UpdatedFileName);
            }
            return Ok(UpdatedFileName);
        }
        [EncryptedActionParameter]
        public IActionResult EditLicenseManagement(string LicenceHeaderId, string Type)
        {
            RDMS rDMS = new RDMS();
            try
            {
                rDMS.DropDownMastersDataList = rdmsRepository.GetLicenseManagementMasterData(LoginId, Role);
                rDMS.AutosuggestDropdown = JsonConvert.SerializeObject(rDMS.DropDownMastersDataList);
                var result = rdmsRepository.GetRDMSData(LoginId, LicenceHeaderId);
                rDMS.StatusId = result.LicenseHeaderData.ElementAt(0).StatusId;
                rDMS.LicenseHeaderData = JsonConvert.SerializeObject(result.LicenseHeaderData);
                rDMS.ProductGroup = JsonConvert.SerializeObject(result.ProductGroup);
                rDMS.DeclarationData = JsonConvert.SerializeObject(result.DeclarationData);
                rDMS.ActionType = Type;
                rDMS.LoginId = LoginId;
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "EditLicenseManagement", ex.Message);
            }
            return View(rDMS);
        }
        public IActionResult DeleteProductGroup(string LicenceHeaderId, string Version, string DocumentId)
        {
            Tuple<string, string>? result = null;
            try
            {
                result = rdmsRepository.DeleteProductGroup(LicenceHeaderId, Version, DocumentId, LoginId);
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "DeleteProductGroup", ex.Message);
            }
            return Json(result);
        }
        public IActionResult DeleteLicense(string LicenseHeaderId)
        {
            Tuple<string, string>? result = null;
            try
            {
                result = rdmsRepository.DeleteLicense(LoginId, LicenseHeaderId);
            }
            catch (Exception ex)
            {
                new Logger().LogError("RDMSController", "DeleteLicense", ex.Message);
            }
            return Ok(result);
        }
        [HttpGet]
        public IActionResult DownloadRDMSHistoryExcel(string licenseHeaderId, string plantName, string type, string version = "")
        {

            var result = rdmsRepository.GetExcelData(licenseHeaderId, version, type);
            var createdBy = type.Trim().ToLower() == "history" ? "Updated By" : "Action By";
            var createdOn = type.Trim().ToLower() == "history" ? "Updated On" : "Action On";
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("History_Excel");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Plant";
                worksheet.Cell(currentRow, 2).Value = "Document Category";
                worksheet.Cell(currentRow, 3).Value = "Document Type";
                worksheet.Cell(currentRow, 4).Value = "Document No.";
                worksheet.Cell(currentRow, 5).Value = "Valid From";
                worksheet.Cell(currentRow, 6).Value = "Valid To";
                worksheet.Cell(currentRow, 7).Value = "Version";
                worksheet.Cell(currentRow, 8).Value = "Document Name";
                worksheet.Cell(currentRow, 9).Value = "Status";
                worksheet.Cell(currentRow, 10).Value = createdBy;
                worksheet.Cell(currentRow, 11).Value = createdOn;
                worksheet.Cell(currentRow, 12).Value = "Remarks";


                var headerRange = worksheet.Range(currentRow, 1, currentRow, 12);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupedData = result.GroupBy(m => m.ManufacturingPlantName);
                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = firstItem.ManufacturingPlantName;
                    worksheet.Cell(currentRow, 2).Value = firstItem.DocumentCategoryName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.LicenseTypeName;
                    worksheet.Cell(currentRow, 4).Value = firstItem.DocNumber;
                    worksheet.Cell(currentRow, 5).Value = firstItem.ValidFrom;
                    worksheet.Cell(currentRow, 6).Value = firstItem.ValidTo;
                    worksheet.Cell(currentRow, 7).Value = firstItem.Version;
                    worksheet.Cell(currentRow, 8).Value = firstItem.DocumentName;
                    worksheet.Cell(currentRow, 9).Value = firstItem.Status;
                    worksheet.Cell(currentRow, 10).Value = firstItem.ActionBy;
                    worksheet.Cell(currentRow, 11).Value = firstItem.ActionOn;
                    worksheet.Cell(currentRow, 12).Value = firstItem.Remarks;
                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 4; i++) // Columns 1 to 6 (Issue No to Impacted Task)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }
                    }

                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.ManufacturingPlantName;
                        worksheet.Cell(currentRow, 2).Value = item.LicenseTypeName;
                        worksheet.Cell(currentRow, 3).Value = item.DocumentCategoryName;
                        worksheet.Cell(currentRow, 4).Value = item.DocNumber;
                        worksheet.Cell(currentRow, 5).Value = item.ValidFrom;
                        worksheet.Cell(currentRow, 6).Value = item.ValidTo;
                        worksheet.Cell(currentRow, 7).Value = item.Version;
                        worksheet.Cell(currentRow, 8).Value = item.DocumentName;
                        worksheet.Cell(currentRow, 9).Value = item.Status;
                        worksheet.Cell(currentRow, 10).Value = item.ActionBy;
                        worksheet.Cell(currentRow, 11).Value = item.ActionOn;
                        worksheet.Cell(currentRow, 12).Value = item.Remarks;


                    }
                }

                worksheet.Column("1").Width = 30;
                worksheet.Column("2").Width = 15;
                worksheet.Column("3").Width = 15;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 15;
                worksheet.Column("7").Width = 5;
                worksheet.Column("8").Width = 40;
                worksheet.Column("9").Width = 20;
                worksheet.Column("10").Width = 20;
                worksheet.Column("11").Width = 15;
                worksheet.Column("12").Width = 40;
                if (type.Trim().ToLower() == "remarks")
                {
                    worksheet.Column(5).Hide();
                    worksheet.Column(6).Hide();
                }

                var fileName = plantName + "_History" + ".xlsx";
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName
                   );
                }
            }
        }
        [HttpGet]
        public IActionResult DownloadRDMSRemarksExcel(string licenseHeaderId, string plantName, string type, string version = "")
        {

            var result = rdmsRepository.GetExcelData(licenseHeaderId, version, type);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Remarks_Excel");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Plant";
                worksheet.Cell(currentRow, 2).Value = "Document Category";
                worksheet.Cell(currentRow, 3).Value = "Document Type";
                worksheet.Cell(currentRow, 4).Value = "Document Number";
                worksheet.Cell(currentRow, 5).Value = "ValidFrom";
                worksheet.Cell(currentRow, 6).Value = "ValidTo";
                worksheet.Cell(currentRow, 7).Value = "Version";
                worksheet.Cell(currentRow, 8).Value = "Document Name";
                worksheet.Cell(currentRow, 9).Value = "Remarks";
                worksheet.Cell(currentRow, 10).Value = "Action";
                worksheet.Cell(currentRow, 11).Value = "Action On";
                worksheet.Cell(currentRow, 12).Value = "Action By";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 12);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupedData = result.GroupBy(m => m.ManufacturingPlantName);
                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = firstItem.ManufacturingPlantName;
                    worksheet.Cell(currentRow, 2).Value = firstItem.DocumentCategoryName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.LicenseTypeName;
                    worksheet.Cell(currentRow, 4).Value = firstItem.DocNumber;
                    worksheet.Cell(currentRow, 5).Value = firstItem.ValidFrom;
                    worksheet.Cell(currentRow, 6).Value = firstItem.ValidTo;
                    worksheet.Cell(currentRow, 7).Value = firstItem.Version;
                    worksheet.Cell(currentRow, 8).Value = firstItem.DocumentName;
                    worksheet.Cell(currentRow, 9).Value = firstItem.Remarks;
                    worksheet.Cell(currentRow, 10).Value = firstItem.Status;
                    worksheet.Cell(currentRow, 11).Value = firstItem.ActionOn;
                    worksheet.Cell(currentRow, 12).Value = firstItem.ActionBy;
                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 4; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }
                    }

                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.ManufacturingPlantName;
                        worksheet.Cell(currentRow, 2).Value = item.LicenseTypeName;
                        worksheet.Cell(currentRow, 3).Value = item.DocumentCategoryName;
                        worksheet.Cell(currentRow, 4).Value = item.DocNumber;
                        worksheet.Cell(currentRow, 5).Value = item.ValidFrom;
                        worksheet.Cell(currentRow, 6).Value = item.ValidTo;
                        worksheet.Cell(currentRow, 7).Value = item.Version;
                        worksheet.Cell(currentRow, 8).Value = item.DocumentName;
                        worksheet.Cell(currentRow, 9).Value = item.Remarks;
                        worksheet.Cell(currentRow, 10).Value = item.Status;
                        worksheet.Cell(currentRow, 11).Value = item.ActionOn;
                        worksheet.Cell(currentRow, 12).Value = item.ActionBy;


                    }
                }

                worksheet.Column("1").Width = 30;
                worksheet.Column("2").Width = 15;
                worksheet.Column("3").Width = 15;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 15;
                worksheet.Column("7").Width = 5;
                worksheet.Column("8").Width = 40;
                worksheet.Column("9").Width = 20;
                worksheet.Column("10").Width = 20;
                worksheet.Column("11").Width = 20;
                worksheet.Column("12").Width = 20;
                var fileName = plantName + "_Remarks" + ".xlsx";
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName
                   );
                }
            }
        }
        [HttpGet]
        public IActionResult DownloadRDMSProductsExcel(string licenseHeaderId, string plantName, string type, string version)
        {

            var result = rdmsRepository.GetExcelData(licenseHeaderId, version, type);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Products_Excel");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Plant";
                worksheet.Cell(currentRow, 2).Value = "Document Category";
                worksheet.Cell(currentRow, 3).Value = "Document Type";
                worksheet.Cell(currentRow, 4).Value = "Document Number";
                worksheet.Cell(currentRow, 5).Value = "Valid From";
                worksheet.Cell(currentRow, 6).Value = "Valid To";
                worksheet.Cell(currentRow, 7).Value = "License Info Document";
                worksheet.Cell(currentRow, 8).Value = "Version";
                worksheet.Cell(currentRow, 9).Value = "Product Name";
                worksheet.Cell(currentRow, 10).Value = "Effective From";
                worksheet.Cell(currentRow, 11).Value = "Document Name";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 11);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupedData = result.GroupBy(m => m.ManufacturingPlantName);
                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = firstItem.ManufacturingPlantName;
                    worksheet.Cell(currentRow, 2).Value = firstItem.DocumentCategoryName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.LicenseTypeName;
                    worksheet.Cell(currentRow, 4).Value = firstItem.DocNumber;
                    worksheet.Cell(currentRow, 5).Value = firstItem.ValidFrom;
                    worksheet.Cell(currentRow, 6).Value = firstItem.ValidTo;
                    worksheet.Cell(currentRow, 7).Value = firstItem.LicenseInfoDocName;
                    worksheet.Cell(currentRow, 8).Value = firstItem.Version;
                    worksheet.Cell(currentRow, 9).Value = firstItem.ProductGroup;
                    worksheet.Cell(currentRow, 10).Value = firstItem.EffectiveFrom;
                    worksheet.Cell(currentRow, 11).Value = firstItem.DocumentName;
                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 4; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }
                    }

                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.ManufacturingPlantName;
                        worksheet.Cell(currentRow, 2).Value = item.LicenseTypeName;
                        worksheet.Cell(currentRow, 3).Value = item.DocumentCategoryName;
                        worksheet.Cell(currentRow, 4).Value = item.DocNumber;
                        worksheet.Cell(currentRow, 5).Value = item.ValidFrom;
                        worksheet.Cell(currentRow, 6).Value = item.ValidTo;
                        worksheet.Cell(currentRow, 7).Value = item.LicenseInfoDocName;
                        worksheet.Cell(currentRow, 8).Value = item.Version;
                        worksheet.Cell(currentRow, 9).Value = item.ProductGroup;
                        worksheet.Cell(currentRow, 10).Value = item.EffectiveFrom;
                        worksheet.Cell(currentRow, 11).Value = item.DocumentName;


                    }
                }

                worksheet.Column("1").Width = 30;
                worksheet.Column("2").Width = 15;
                worksheet.Column("3").Width = 15;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 15;
                worksheet.Column("7").Width = 30;
                worksheet.Column("8").Width = 5;
                worksheet.Column("9").Width = 30;
                worksheet.Column("10").Width = 20;
                worksheet.Column("11").Width = 30;

                var fileName = plantName + "_Products" + ".xlsx";
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName
                   );
                }
            }
        }
        public JsonResult GetDocumentType(string DocCategoryId)
        {
            var result = rdmsRepository.GetDocumentType(DocCategoryId);
            var jsonResult = Json(result);
            return jsonResult;
        }
    }
}