using DocumentFormat.OpenXml.Bibliography;
using Ideation.Core;
using Ideation.Data;
using Ideation.Filters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using NonFactors.Mvc.Grid;
using Org.BouncyCastle.Ocsp;
using Ideation.Models;
using ClosedXML.Excel;
using Org.BouncyCastle.Bcpg.OpenPgp;
using Newtonsoft.Json.Linq;
using DocumentFormat.OpenXml.Wordprocessing;
//using System.Web.Mvc;

namespace Ideation.Controllers
{
    public class NPDLaunchMasterController : BaseController
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;
        private readonly INPDLaunchMasterRepository nPDLaunchMasterRepository;

        public NPDLaunchMasterController(IWebHostEnvironment webHostEnvironment, IConfiguration configuration, INPDLaunchMasterRepository nPDLaunchMasterRepository)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = configuration;
            this.nPDLaunchMasterRepository = nPDLaunchMasterRepository;
        }

        [HttpGet]
        public IActionResult N_NPDList()
        {
            NPDLaunchMaster npdLM = nPDLaunchMasterRepository.GetNpdLaunchMasterData();
            npdLM.HGMLDivisionList = npdLM.NpdHGMLDivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName) });
            npdLM.HGMLCategoryList = npdLM.NpdHGMLCategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryName) });
            npdLM.HGMLProductGroupList = npdLM.NpdHGMLProductGroupList.Select(m => new SelectListItem { Text = m.ProductName, Value = Convert.ToString(m.ProductName) });
            npdLM.HGMLFormulationList = npdLM.NpdHGMLFormulationList.Select(m => new SelectListItem { Text = m.FormulationName, Value = Convert.ToString(m.FormulationName) });
            npdLM.HGMLSourceList = npdLM.NpdHGMLSourceList.Select(m => new SelectListItem { Text = m.SourceName, Value = Convert.ToString(m.SourceName) });

            var result = nPDLaunchMasterRepository.GetNPDLaunchMasterHeaderData();
            npdLM.Role = Role;
            npdLM.NPDLaunchMasterHeaderData = JsonConvert.SerializeObject(result);
            return View(npdLM);

        }
        [HttpPost]
        public IActionResult NPDList(NPDLaunchMaster npdLM)
        {
            var userName = HttpContext.Session.GetString("UserName");
            npdLM.UserName = userName;

            var result = nPDLaunchMasterRepository.UploadNpdListData(npdLM);

            return RedirectToAction("N_NPDList", "NPDLaunchMaster");
        }

        public string NPDLaunchMasterHeaderData(string division, string category, string productGroup, string formulation, string source)
        {
            var result = nPDLaunchMasterRepository.GetNPDLaunchMasterHeaderData(division, category, productGroup, formulation, source);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }
        public IActionResult N_ProductHierarchy()
        {
            NPDLaunchMaster npdLM = nPDLaunchMasterRepository.GetNpdLaunchMasterData();
            npdLM.HGMLDivisionList = npdLM.NpdHGMLDivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName) });
            npdLM.HGMLCategoryList = npdLM.NpdHGMLCategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryName) });
            npdLM.HGMLProductGroupList = npdLM.NpdHGMLProductGroupList.Select(m => new SelectListItem { Text = m.ProductName, Value = Convert.ToString(m.ProductName) });
            npdLM.HGMLFormulationList = npdLM.NpdHGMLFormulationList.Select(m => new SelectListItem { Text = m.FormulationName, Value = Convert.ToString(m.FormulationName) });
            npdLM.HGMLSourceList = npdLM.NpdHGMLSourceList.Select(m => new SelectListItem { Text = m.SourceName, Value = Convert.ToString(m.SourceName) });

            npdLM.UserName = HttpContext.Session.GetString("UserName");

            var result = nPDLaunchMasterRepository.GetNPDLMProductHierarchyData(npdLM.DivisionName, npdLM.CategoryName, npdLM.ProductName, npdLM.FormulationName);
            npdLM.NPDLaunchMasterProductHierarchyData = JsonConvert.SerializeObject(result);

            var Category = npdLM.NpdHGMLCategoryList.Select(m => new SelectListItem { Value = m.CategoryName }).ToList();
            npdLM.CategoryString = JsonConvert.SerializeObject(Category);

            var Division = npdLM.NpdHGMLDivisionList.Select(m => new SelectListItem { Value = m.DivisionName }).ToList();
            npdLM.DivisionString = JsonConvert.SerializeObject(Division);

            var ProductGroup = npdLM.NpdHGMLProductGroupList.Select(m => new SelectListItem { Value = m.ProductName }).ToList();
            npdLM.ProductString = JsonConvert.SerializeObject(ProductGroup);

            var FormulationCategory = npdLM.NpdHGMLFormulationList.Select(m => new SelectListItem { Value = m.FormulationName }).ToList();
            npdLM.FormulationString = JsonConvert.SerializeObject(FormulationCategory);

            var SubCategory = npdLM.NpdHGMLSubCategoryList.Select(m => new SelectListItem { Value = m.SubCategoryName }).ToList();
            npdLM.SubCategoryString = JsonConvert.SerializeObject(SubCategory);

            return View(npdLM);
        }

        public string ProductHierarchyData(string division, string category, string productGroup, string formulation, string source)
        {
            var result = nPDLaunchMasterRepository.GetNPDLMProductHierarchyData(division, category, productGroup, formulation);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }

        [HttpPost]
        public IActionResult SaveProductHierarchyData(NPDLaunchMaster HierarchyData)
        {
            var UserName = HttpContext.Session.GetString("UserName");

            var result = nPDLaunchMasterRepository.InsertProductHierarchyData(HierarchyData, UserName);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;
            return RedirectToAction("N_ProductHierarchy", "NPDLaunchMaster");
        }

        public IActionResult AddProductLaunchInformation()
        {
            return View();
        }
        public IActionResult N_MyApprovalPending()
        {
            NPDLaunchMaster npdLM = nPDLaunchMasterRepository.GetNpdLaunchMasterData();

            npdLM.HGMLDivisionList = npdLM.NpdHGMLDivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName) });
            npdLM.HGMLCategoryList = npdLM.NpdHGMLCategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryName) });
            npdLM.HGMLProductGroupList = npdLM.NpdHGMLProductGroupList.Select(m => new SelectListItem { Text = m.ProductName, Value = Convert.ToString(m.ProductName) });
            npdLM.HGMLSubCategoryList = npdLM.NpdHGMLSubCategoryList.Select(m => new SelectListItem { Text = m.SubCategoryName, Value = Convert.ToString(m.SubCategoryName) });

            var Category = npdLM.NpdHGMLCategoryList.Select(m => new SelectListItem { Value = m.CategoryName }).ToList();
            npdLM.CategoryString = JsonConvert.SerializeObject(Category);

            var ProductGroup = npdLM.NpdHGMLProductGroupList.Select(m => new SelectListItem { Value = m.ProductName }).ToList();
            npdLM.ProductString = JsonConvert.SerializeObject(ProductGroup);

            var SubCategory = npdLM.NpdHGMLSubCategoryList.Select(m => new SelectListItem { Value = m.SubCategoryName }).ToList();
            npdLM.SubCategoryString = JsonConvert.SerializeObject(SubCategory);

            npdLM.SourceString = JsonConvert.SerializeObject(npdLM.NpdHGMLSourceList);

            npdLM.UserName = HttpContext.Session.GetString("UserName");

            var result = nPDLaunchMasterRepository.GetMyApprovalPendingData();
            npdLM.MyApprovalPendingData = JsonConvert.SerializeObject(result);
            return View(npdLM);
        }

        public string MyapprovalPendingHeaderData(string division, string category, string productGroup, string subCategory)
        {
            var result = nPDLaunchMasterRepository.GetMyapprovalPendingHeaderData(division, category, productGroup, subCategory);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }

        public IActionResult SaveMyapprovalPendingData(NPDLaunchMaster MyApprovalData)
        {
            var result = nPDLaunchMasterRepository.InsertMyApprovalPendingData(MyApprovalData);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;
            return RedirectToAction("N_MyApprovalPending", "NPDLaunchMaster");

        }

        [HttpGet]
        public IActionResult N_ProductLaunchInformation()
        {
            NPDLaunchMaster npdLM = nPDLaunchMasterRepository.GetNpdLaunchMasterData();
            npdLM.HGMLDivisionList = npdLM.NpdHGMLDivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName) });
            npdLM.HGMLCategoryList = npdLM.NpdHGMLCategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryName) });
            npdLM.SourceString = JsonConvert.SerializeObject(npdLM.NpdHGMLSourceList);

            //var result = nPDLaunchMasterRepository.GetProductLaunchInformationData("Default", "", "").ToList();
            //npdLM.ProductLaunchInformationData = JsonConvert.SerializeObject(result);

            return View(npdLM);
        }


        [EncryptedActionParameter]
        public JsonResult OnSearchProductLaunchInformation(string division, string category, string npdLaunchYearType, string npdLaunchYear, string status)
        {
            try
            {
                var listData = nPDLaunchMasterRepository.GetProductLaunchInformationData(division, category, "Search", npdLaunchYearType, npdLaunchYear, status).ToList();
                return Json(listData);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.ToString() });
            }
        }

        [HttpPost]
        public IActionResult ProductLaunchInformation(NPDLaunchMaster npdLM)
        {
            var userName = HttpContext.Session.GetString("UserName");
            npdLM.UserName = userName;

            var result = nPDLaunchMasterRepository.UploadProductLaunchInformationData(npdLM);

            return RedirectToAction("N_ProductLaunchInformation", "NPDLaunchMaster");
        }


        public JsonResult GetOtherMasterInfoBySubCateg(string SubCategory, string ProductGroup)
        {
            try
            {
                var listData = nPDLaunchMasterRepository.GetOtherMasterInfoBySubCateg(SubCategory, ProductGroup);
                return Json(listData);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.ToString() });

            }

        }
        public JsonResult GetOtherMasterInfoByProductGroup(string ProductGroup)
        {
            try
            {
                var listData = nPDLaunchMasterRepository.GetOtherMasterInfoByProductGroup(ProductGroup);
                return Json(listData);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.ToString() });

            }
        }
        public IActionResult GetNPDLMListExcel(string division, string category, string productGroup, string formulation, string source)
        {
            var document = nPDLaunchMasterRepository.GetNPDLaunchMasterHeaderData(division, category, productGroup, formulation, source);
            var result = nPDLaunchMasterRepository.Excel_GetHeaderNames("HGML");

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("NPDLM Template");
                // worksheet.Protect();
                var currentRow = 1;
                #region Header
                foreach (var item in result)
                {
                    var range = worksheet.Range(currentRow, 1, currentRow, 4); // Define the range from column 1 to 3
                    range.Style.Fill.BackgroundColor = XLColor.LightGray;
                    int columnIndex = Convert.ToInt32(item.ColumnId);
                    double columnWidth = Convert.ToDouble(item.Width);
                    worksheet.Cell(currentRow, columnIndex).Value = item.HeaderName;
                    worksheet.Cell(currentRow, columnIndex).Style.Font.SetBold();
                    worksheet.Column(columnIndex).Width = columnWidth;
                    //if(item.Protected == "N"){
                    //    worksheet.Column(columnIndex).Style.Protection.SetLocked(false);
                    //}
                }
                #endregion
                #region Body
                foreach (var item in document)
                {
                    currentRow++;
                    var range = worksheet.Range(currentRow, 1, currentRow, 4); // Define the range from column 1 to 3
                    range.Style.Fill.BackgroundColor = XLColor.LightGray;

                    worksheet.Cell(currentRow, 1).Value = item.MaterialCode;
                    worksheet.Cell(currentRow, 2).Value = item.MaterialName;
                    worksheet.Cell(currentRow, 3).Value = item.CreatedDate;
                    worksheet.Cell(currentRow, 4).Value = item.Source;
                    worksheet.Cell(currentRow, 5).Value = item.ProductGroup;
                    worksheet.Cell(currentRow, 6).Value = item.HGMLSubCategory;
                    worksheet.Cell(currentRow, 7).Value = item.HGMLCategory;
                    worksheet.Cell(currentRow, 8).Value = item.HGMLDivision;
                    worksheet.Cell(currentRow, 9).Value = item.HGMLFormulation;
                }
                #endregion

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "NPDLM Template.xlsx");
                }
            }
        }

        public IActionResult NPDLMExcelUpload()
        {
            NPDLaunchMaster model = new NPDLaunchMaster();
            var message = string.Empty;
            try
            {
                var excelFile = Request.Form.Files;

                List<NpdLaunchMasterHeaderData> excelData = new List<NpdLaunchMasterHeaderData>();

                if (excelFile.Count > 0)
                {
                    using (var stream = excelFile[0].OpenReadStream())
                    using (var workbook = new XLWorkbook(stream))
                    {
                        var worksheet = workbook.Worksheets.First();
                        var headerRow = worksheet.Row(1);

                        var result = nPDLaunchMasterRepository.Excel_GetHeaderNames("HGML");
                        var expectedHeaders = new List<string>();
                        foreach (var item in result)
                        {
                            expectedHeaders.Add(item.HeaderName);
                        }
                        //var actualHeaders = headerRow.Cells().Select(c => c.GetString()).ToList();
                        var actualHeaders = headerRow.Cells().Select(c => c.GetString()).Where(header => header != "Remarks").ToList();
                        if (!expectedHeaders.SequenceEqual(actualHeaders))
                        {
                            message = "Invalid File";
                            return Json(message);
                        }
                        var rows = worksheet.RowsUsed().Skip(1); // Skip header row

                        foreach (var row in rows)
                        {
                            var rowdata = new NpdLaunchMasterHeaderData
                            {
                                MaterialCode = row.Cell(1).GetString(),
                                MaterialName = row.Cell(2).GetString(),
                                MaterialCreatedDate = row.Cell(3).GetString(),
                                Source = row.Cell(4).GetString(),
                                ProductGroup = row.Cell(5).GetString(),
                                HGMLSubCategory = row.Cell(6).GetString(),
                                HGMLCategory = row.Cell(7).GetString(),
                                HGMLDivision = row.Cell(8).GetString(),
                                HGMLFormulation = row.Cell(9).GetString(),
                                // IsNPD = row.Cell(10).GetString(),
                            };
                            excelData.Add(rowdata);
                        }
                    }

                    if (excelData.Any())
                    {
                        var JsonExcelData = JsonConvert.SerializeObject(excelData);

                        var jsonData = nPDLaunchMasterRepository.Excel_NPDLMFileUpload(LoginId, JsonExcelData, "HGML");
                        var NPDDetails = jsonData.NPDDetails.ToList();
                        var Message = jsonData.Message;
                        var result = new { NPDDetails, Message };
                        return Json(result);
                    }
                    else
                    {
                        message = "Please fill Mandatory data";
                    }
                }
            }
            catch (Exception ex)
            {
                message = $"Error: {ex.Message}";
                return Json(new { message = message });
            }
            return Json(new { message = message });
        }
        [HttpPost]
        public IActionResult GetErrorFileDownload(string ErrorData, string Country)
        {
            try
            {
                var errorDataJson = ErrorData;

                if (string.IsNullOrWhiteSpace(errorDataJson))
                {
                    return BadRequest("Error data is empty.");
                }

                var document = JsonConvert.DeserializeObject<List<NpdLaunchMasterHeaderData>>(errorDataJson);
                if (document == null || document.Count == 0)
                {
                    return BadRequest("Invalid or empty data.");
                }

                var result = nPDLaunchMasterRepository.Excel_GetHeaderNames(Country);

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("NPDLM");
                    //worksheet.Protect();
                    var currentRow = 1;
                    if (Country == "HGML")
                    {
                        // Header
                        foreach (var item in result)
                        {
                            var range = worksheet.Range(currentRow, 1, currentRow, 4); // Define the range from column 1 to 3
                            range.Style.Fill.BackgroundColor = XLColor.LightGray;

                            int columnIndex = Convert.ToInt32(item.ColumnId);
                            double columnWidth = Convert.ToDouble(item.Width);
                            worksheet.Cell(currentRow, columnIndex).Value = item.HeaderName;
                            worksheet.Cell(currentRow, columnIndex).Style.Font.SetBold();
                            worksheet.Column(columnIndex).Width = columnWidth;
                            //if (item.Protected == "N")
                            //{
                            //    worksheet.Column(columnIndex).Style.Protection.SetLocked(false);
                            //}
                        }
                        worksheet.Cell(currentRow, 10).Value = "Remarks";
                        worksheet.Cell(currentRow, 10).Style.Font.SetBold();
                        worksheet.Column("10").Width = 30;
                        worksheet.Column("10").Style.Protection.SetLocked(false);

                        // Body
                        foreach (var item in document)
                        {
                            currentRow++;
                            var range = worksheet.Range(currentRow, 1, currentRow, 4); // Define the range from column 1 to 3
                            range.Style.Fill.BackgroundColor = XLColor.LightGray;

                            worksheet.Cell(currentRow, 1).Value = item.MaterialCode;
                            worksheet.Cell(currentRow, 2).Value = item.MaterialName;
                            worksheet.Cell(currentRow, 3).Value = item.MaterialCreatedDate;
                            worksheet.Cell(currentRow, 4).Value = item.Source;
                            worksheet.Cell(currentRow, 5).Value = item.ProductGroup;
                            worksheet.Cell(currentRow, 6).Value = item.HGMLSubCategory;
                            worksheet.Cell(currentRow, 7).Value = item.HGMLCategory;
                            worksheet.Cell(currentRow, 8).Value = item.HGMLDivision;
                            worksheet.Cell(currentRow, 9).Value = item.HGMLFormulation;
                            worksheet.Cell(currentRow, 10).Value = item.Remarks;
                        }
                    }
                    if (Country == "India&Dubai")
                    {
                        // Header
                        foreach (var item in result)
                        {
                            var range = worksheet.Range(currentRow, 1, currentRow, 3); // Define the range from column 1 to 3
                            range.Style.Fill.BackgroundColor = XLColor.LightGray;

                            int columnIndex = Convert.ToInt32(item.ColumnId);
                            double columnWidth = Convert.ToDouble(item.Width);
                            worksheet.Cell(currentRow, columnIndex).Value = item.HeaderName;
                            worksheet.Cell(currentRow, columnIndex).Style.Font.SetBold();
                            worksheet.Column(columnIndex).Width = columnWidth;
                            //if (item.Protected == "N")
                            //{
                            //    worksheet.Column(columnIndex).Style.Protection.SetLocked(false);
                            //}
                        }
                        worksheet.Cell(currentRow, 8).Value = "Remarks";
                        worksheet.Cell(currentRow, 8).Style.Font.SetBold();
                        worksheet.Column("8").Width = 30;
                        worksheet.Column("8").Style.Protection.SetLocked(false);

                        // Body
                        foreach (var item in document)
                        {
                            currentRow++;
                            var range = worksheet.Range(currentRow, 1, currentRow, 3); // Define the range from column 1 to 3
                            range.Style.Fill.BackgroundColor = XLColor.LightGray;

                            worksheet.Cell(currentRow, 1).Value = item.MaterialCode;
                            worksheet.Cell(currentRow, 2).Value = item.MaterialName;
                            worksheet.Cell(currentRow, 3).Value = item.MaterialCreatedDate;
                            worksheet.Cell(currentRow, 4).Value = item.IndiaCategory;
                            worksheet.Cell(currentRow, 5).Value = item.IndiaDivision;
                            worksheet.Cell(currentRow, 6).Value = item.DubaiCategory;
                            worksheet.Cell(currentRow, 7).Value = item.DubaiDivision;
                            worksheet.Cell(currentRow, 8).Value = item.Remarks;
                        }

                    }

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();

                        return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Country + " NPDLM_ErrorFile.xlsx");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error generating file: {ex.Message}");
            }
        }

        public IActionResult N_IndiaMaterialList(string division)
        {
            NPDLaunchMaster npdLM = nPDLaunchMasterRepository.GetNpdLaunchMasterData();
            npdLM.HGMLDivisionList = npdLM.NpdHGMLDivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName) });

            var result = nPDLaunchMasterRepository.GetIndiaNPDLaunchMasterHeaderData(division, "");
            npdLM.Role = Role;
            npdLM.NPDLaunchMasterHeaderData = JsonConvert.SerializeObject(result);

            return View(npdLM);
        }
        public string N_IndiaMaterialListFilter(string division, string category, string productGroup, string formulation, string source)
        {
            var result = nPDLaunchMasterRepository.GetIndiaNPDLaunchMasterHeaderData(division, "");
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }
        public IActionResult GetIndiaNPDLMListExcel(string division)
        {
            var document = nPDLaunchMasterRepository.GetIndiaNPDLaunchMasterHeaderData(division, "",1);
            var result = nPDLaunchMasterRepository.Excel_GetHeaderNames("India&Dubai");

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("India & Dubai NPDLM Template");
                var currentRow = 1;
                #region Header
                foreach (var item in result)
                {
                    var range = worksheet.Range(currentRow, 1, currentRow, 3); // Define the range from column 1 to 3
                    range.Style.Fill.BackgroundColor = XLColor.LightGray;
                    int columnIndex = Convert.ToInt32(item.ColumnId);
                    double columnWidth = Convert.ToDouble(item.Width);
                    worksheet.Cell(currentRow, columnIndex).Value = item.HeaderName;
                    worksheet.Cell(currentRow, columnIndex).Style.Font.SetBold();
                    worksheet.Column(columnIndex).Width = columnWidth;
                }
                #endregion
                #region Body
                foreach (var item in document)
                {
                    currentRow++;
                    var range = worksheet.Range(currentRow, 1, currentRow, 3); // Define the range from column 1 to 3
                    range.Style.Fill.BackgroundColor = XLColor.LightGray;

                    worksheet.Cell(currentRow, 1).Value = item.MaterialCode;
                    worksheet.Cell(currentRow, 2).Value = item.MaterialName;
                    worksheet.Cell(currentRow, 3).Value = item.CreatedDate;
                    worksheet.Cell(currentRow, 4).Value = item.IndiaCategory;
                    worksheet.Cell(currentRow, 5).Value = item.IndiaDivision;
                    worksheet.Cell(currentRow, 6).Value = item.DubaiCategory;
                    worksheet.Cell(currentRow, 7).Value = item.DubaiDivision;
                }
                #endregion

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "India & Dubai NPDLM Template.xlsx");
                }
            }
        }
        public IActionResult IndiaNPDLMExcelUpload()
        {
            NPDLaunchMaster model = new NPDLaunchMaster();
            var message = string.Empty;
            try
            {
                var excelFile = Request.Form.Files;

                List<NpdLaunchMasterHeaderData> excelData = new List<NpdLaunchMasterHeaderData>();

                if (excelFile.Count > 0)
                {
                    using (var stream = excelFile[0].OpenReadStream())
                    using (var workbook = new XLWorkbook(stream))
                    {
                        var worksheet = workbook.Worksheets.First();
                        var headerRow = worksheet.Row(1);

                        var result = nPDLaunchMasterRepository.Excel_GetHeaderNames("India&Dubai");
                        var expectedHeaders = new List<string>();
                        foreach (var item in result)
                        {
                            expectedHeaders.Add(item.HeaderName);
                        }
                        //var actualHeaders = headerRow.Cells().Select(c => c.GetString()).ToList();
                        var actualHeaders = headerRow.Cells().Select(c => c.GetString()).Where(header => header != "Remarks").ToList();
                        if (!expectedHeaders.SequenceEqual(actualHeaders))
                        {
                            message = "Invalid File";
                            return Json(message);
                        }
                        var rows = worksheet.RowsUsed().Skip(1); // Skip header row

                        foreach (var row in rows)
                        {
                            var rowdata = new NpdLaunchMasterHeaderData
                            {
                                MaterialCode = row.Cell(1).GetString(),
                                MaterialName = row.Cell(2).GetString(),
                                MaterialCreatedDate = row.Cell(3).GetString(),
                                IndiaCategory = row.Cell(4).GetString(),
                                IndiaDivision = row.Cell(5).GetString(),
                                DubaiCategory = row.Cell(6).GetString(),
                                DubaiDivision = row.Cell(7).GetString(),
                            };
                            excelData.Add(rowdata);
                        }
                    }

                    if (excelData.Any())
                    {
                        var JsonExcelData = JsonConvert.SerializeObject(excelData);

                        var jsonData = nPDLaunchMasterRepository.Excel_NPDLMFileUpload(LoginId, JsonExcelData, "India & Dubai");
                        var NPDDetails = jsonData.NPDDetails.ToList();
                        var Message = jsonData.Message;
                        var result = new { NPDDetails, Message };
                        return Json(result);
                    }
                    else
                    {
                        message = "Please fill Mandatory data";
                    }
                }
            }
            catch (Exception ex)
            {
                message = $"Error: {ex.Message}";
                return Json(new { message = message });
            }
            return Json(new { message = message });
        }
        public IActionResult GetMaterialModificationHistory(string MatCode)
        {
            var result = nPDLaunchMasterRepository.GetMaterialModificationHistory(MatCode);
            return Ok(result);
        }
    }
}