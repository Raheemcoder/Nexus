using ClosedXML.Excel;
using Ideation.Core;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using Newtonsoft.Json;

namespace Ideation.Controllers
{
    public class TTDDashboardController : BaseController
    {
        private readonly IEPPMMasterRepository _masterRepository;

        public TTDDashboardController(IEPPMMasterRepository masterRepository)
        {
           
            this._masterRepository = masterRepository;
        }
        #region
        public IActionResult TTDDashboard()
        {
            
            return View();
        }
        public IActionResult GetTTDDropdownData()
        {
            TTDDashboard ttd = new TTDDashboard();
            try
            {
                ttd.TTDDropDownDataList = _masterRepository.GetTTDDropDownData();
            }
            catch (Exception ex)
            {
                new Logger().LogError("TTDDashboardController", "GetTTDDropdownData", ex.Message);
            }
            return Ok(ttd);
        }
        [HttpGet]
        public IActionResult GetProductNamesData()
        {
            var result = _masterRepository.GetTTDProductNames();
            return Ok(result);
        }
        [HttpPost]
        public IActionResult SaveTTDData(TTDDashboard ttdDashboard)
        {

            var result = _masterRepository.SaveTTDDetails(JsonConvert.SerializeObject(ttdDashboard.TTDData), HttpContext.Session.GetString("UserName").ToString());
            return Ok(result.Item1);
        }
        [HttpPost]
        public IActionResult UpdateSavedRemarks(int DateAndRemarksId,string Type,string Remarks)
        {

            var result = _masterRepository.UpdateSavedRemarks(DateAndRemarksId, Type,Remarks,HttpContext.Session.GetString("UserName").ToString());
            return Ok(result.Item1);
        }
        [HttpPost]
        public IActionResult DeleteTTDData(string ttdHeaderId)
        {

            var result = _masterRepository.DeleteTTDDetails(ttdHeaderId, HttpContext.Session.GetString("UserName").ToString());
            return Ok(result.Item1);
        }
        [HttpGet]
        public IActionResult GetTTDData(int prodyear, string product)
        {
            IEnumerable<TTDDashboard> result = null;
            try
            {
                var loginId = HttpContext.Session.GetString("UserName").ToString();
                result = _masterRepository.GetTTDGridData(prodyear,product, loginId);
            }
            catch (Exception ex)
            {
                new Logger().LogError("TTDDashboardController", "GetTTDData", ex.Message);

            }
            return Ok(result);
        }
        [HttpGet]
        public IActionResult GetHistoryData(int prodyear, string ttdheaderid, string historytype)
        {
            var result = _masterRepository.GetTTDHistory(prodyear, ttdheaderid, historytype);
            return Ok(result);
        }
        [HttpGet]
        public IActionResult GetDateRemarksData(int prodyear)
        {
            var result = _masterRepository.GetTTDDatesAndRemarks(prodyear);
            return Ok(result);
        }
        [HttpGet]
        public IActionResult GetTTDExcelData(int prodyear, string product)
        {
            IEnumerable<TTDDashboard> result = null;
            try
            {
                result = _masterRepository.GetTTDExcelData(prodyear, product);
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("TTD Dashboard");
                    var currentRow = 1;
                    worksheet.Cell(currentRow, 1).Value = "Production Target Year";
                    worksheet.Cell(currentRow, 2).Value = "Project Brief Id";
                    worksheet.Cell(currentRow, 3).Value = "Product";
                    worksheet.Cell(currentRow, 4).Value = "R&D";
                    worksheet.Cell(currentRow, 5).Value = "Pack Sizes";
                    worksheet.Cell(currentRow, 6).Value = "Classification";
                    worksheet.Cell(currentRow, 7).Value = "Priority";
                    worksheet.Cell(currentRow, 8).Value = "Market";
                    worksheet.Cell(currentRow, 9).Value = "Category";
                    worksheet.Cell(currentRow, 10).Value = "Sub Category";
                    worksheet.Cell(currentRow, 11).Value = "Brief Accepted Date";
                    //worksheet.Cell(currentRow, 12).Value = "HGML";
                    //worksheet.Cell(currentRow, 13).Value = "APAC";
                    //worksheet.Cell(currentRow, 14).Value = "Europe";
                    //worksheet.Cell(currentRow, 15).Value = "HUSA";
                    //worksheet.Cell(currentRow, 16).Value = "India";
                    //worksheet.Cell(currentRow, 17).Value = "METAP";
                    worksheet.Cell(currentRow, 12).Value = "Business Value in M$ (Year 1)";
                    worksheet.Cell(currentRow, 13).Value = "Business Value in M$ (Year 2)";
                    worksheet.Cell(currentRow, 14).Value = "Baseline TTD Date";
                    worksheet.Cell(currentRow, 15).Value = "Baseline TTD Remarks";
                    worksheet.Cell(currentRow, 16).Value = "Baseline Production Date";
                    worksheet.Cell(currentRow, 17).Value = "Baseline Production Remarks";
                    worksheet.Cell(currentRow, 18).Value = "TTD Target Date";
                    worksheet.Cell(currentRow, 19).Value = "TTD Target Remarks";
                    worksheet.Cell(currentRow, 20).Value = "Production Target Date";
                    worksheet.Cell(currentRow, 21).Value = "Production Target Remarks";
                    worksheet.Cell(currentRow, 22).Value = "TTD Target Comments";
                    worksheet.Cell(currentRow, 23).Value = "Production Target Comments";
                    worksheet.Cell(currentRow, 24).Value = "Remarks";
                    worksheet.Cell(currentRow, 25).Value = "Last Updated By";

                    worksheet.Column(1).Hide();

                    var headerRange = worksheet.Range(currentRow, 1, currentRow,25);
                    headerRange.Style.Font.Bold = true;
                    headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                    headerRange.Style.Font.FontColor = XLColor.White;
                    headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    foreach (var item in result)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.ProductionTargetYear;
                        worksheet.Cell(currentRow, 2).Value = item.ProjectBriefId;
                        worksheet.Cell(currentRow, 3).Value = item.ProductName;
                        worksheet.Cell(currentRow, 4).Value = item.RDName;
                        worksheet.Cell(currentRow, 5).Value = item.PackSizes;
                        worksheet.Cell(currentRow, 6).Value = item.ClassificationTypeName;
                        worksheet.Cell(currentRow, 7).Value = item.PriorityTypeName;
                        worksheet.Cell(currentRow, 8).Value = item.MarketTypeName;
                        worksheet.Cell(currentRow, 9).Value = item.CategoryName;
                        worksheet.Cell(currentRow, 10).Value = item.SubCategoryName;
                        worksheet.Cell(currentRow, 11).Value = item.BriefAcceptedDate;
                        //worksheet.Cell(currentRow, 12).Value = item.HGMLValue;
                        //worksheet.Cell(currentRow, 13).Value = item.APACValue;
                        //worksheet.Cell(currentRow, 13).Value = item.EuropeValue;
                        //worksheet.Cell(currentRow, 14).Value = item.HUSAValue;
                        //worksheet.Cell(currentRow, 15).Value = item.IndiaValue;
                        //worksheet.Cell(currentRow, 16).Value = item.METAPValue;
                        worksheet.Cell(currentRow, 12).Value = item.BusinessValueYear1;
                        worksheet.Cell(currentRow, 13).Value = item.BusinessValueYear2;
                        worksheet.Cell(currentRow, 14).Value = item.BaselineTTDDate;
                        worksheet.Cell(currentRow, 15).Value = item.BaselineTTDRemarks;
                        worksheet.Cell(currentRow, 16).Value = item.BaselineProductionDate;
                        worksheet.Cell(currentRow, 17).Value = item.BaselineProductionRemarks;
                        worksheet.Cell(currentRow, 18).Value = item.TTDTargetDate;
                        worksheet.Cell(currentRow, 19).Value = item.TTDTargetRemarks;
                        worksheet.Cell(currentRow, 20).Value = item.ProductionTargetDate;
                        worksheet.Cell(currentRow, 21).Value = item.ProductionTargetRemarks;
                        worksheet.Cell(currentRow, 22).Value = item.TTDTargetCommentName;
                        worksheet.Cell(currentRow, 23).Value = item.ProductionTargetCommentName;
                        worksheet.Cell(currentRow, 24).Value = item.Remarks;
                        worksheet.Cell(currentRow, 25).Value = item.ActionBy;

                    }

                    worksheet.Column("1").Width =5;
                    worksheet.Column("2").Width =10;
                    worksheet.Column("3").Width = 20;
                    worksheet.Column("4").Width = 10;
                    worksheet.Column("5").Width = 10;
                    worksheet.Column("6").Width = 10;
                    worksheet.Column("7").Width = 10;
                    worksheet.Column("8").Width = 10;
                    worksheet.Column("9").Width = 10;
                    worksheet.Column("10").Width = 10;
                    worksheet.Column("12").Width = 10;
                    worksheet.Column("13").Width = 10;
                    worksheet.Column("14").Width = 10;
                    worksheet.Column("15").Width = 10;
                    worksheet.Column("16").Width = 10;
                    worksheet.Column("17").Width = 10;
                    worksheet.Column("18").Width = 10;
                    worksheet.Column("19").Width = 10;
                    worksheet.Column("20").Width = 10;
                    worksheet.Column("21").Width = 10;
                    worksheet.Column("22").Width = 10;
                    worksheet.Column("23").Width = 10;
                    worksheet.Column("24").Width = 10;
                    worksheet.Column("25").Width = 10;
                    //worksheet.Column("26").Width = 10;
                    //worksheet.Column("27").Width = 10;
                    //worksheet.Column("28").Width = 10;
                    //worksheet.Column("29").Width = 10;

                    var fileName = "TTDDashboard_ " + prodyear + ".xlsx";
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
            catch (Exception ex)
            {
                new Logger().LogError("TTDDashboardController", "GetTTDExcelData", ex.Message);

            }
            return Ok(result);

        }


        #endregion
    }
}
