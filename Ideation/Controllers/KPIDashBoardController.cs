using ClosedXML.Excel;
using Ideation.Core;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System.Globalization;
using Ideation.Controllers;
using Ideation.CustomAttributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Build.ObjectModelRemoting;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Ideation.Data;
using Microsoft.Build.Framework;
using Microsoft.Build.Evaluation;
using Microsoft.AspNetCore.Http.HttpResults;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Mvc.Rendering;
using NuGet.Versioning;

namespace Ideation.Controllers
{
    public class KPIDashBoardController : BaseController
    {
        #region Constructor
        private readonly IHomeRepository _homeRepository;
        private readonly IEPPMMasterRepository _masterRepository;
        private readonly IGanttChartRepository _ganttChartRepository;

        private readonly IConfiguration? Configuration;
        private readonly IWebHostEnvironment webHostEnvironment;
        public KPIDashBoardController(IHomeRepository homeRepository, IWebHostEnvironment webHostEnvironment, IEPPMMasterRepository masterRepository, IGanttChartRepository ganttChartRepository, IConfiguration Configuration)
        {
            this._homeRepository = homeRepository;
            this._masterRepository = masterRepository;
            this._ganttChartRepository = ganttChartRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = Configuration;
        }
        #endregion
        #region KPIDashBoard

        public IActionResult KPIDashBoard()
        {
            KPIDashBoard kpidash = new KPIDashBoard();

            var data = _masterRepository.GetKPIDashBoardMasterData();

            var reson = data.ReasonsForDelayList.Select(m => new SelectListItem { Text = m.ReasonName, Value = Convert.ToString(m.ResonValue), Disabled = m.IsUsed }).ToList();
            kpidash.DelayReason = JsonConvert.SerializeObject(reson);

            var Status = data.StatusMasterList.Select(m => new SelectListItem { Text = m.StatusName, Value = Convert.ToString(m.StatusId) }).ToList();
            kpidash.StatusNames = JsonConvert.SerializeObject(Status);

            kpidash.MonthList = data.MonthMasterList.Select(m => new SelectListItem { Value = m.Month.ToString(), Text = m.MonthName });

            kpidash.DivisionList = data.DivisionList;

            kpidash.Role = Role;
            var month = HttpContext.Session.GetString("SelectedMonths");
            var year = HttpContext.Session.GetString("SelectedYear");
            kpidash.Month_Selected = month == "" || month == null ? "" : month;
            kpidash.Year_Selected = year == "" || year == null ? "" : year;
            return View(kpidash);
        }

        public JsonResult GetKPIDashboardData(string Month, string Year, string Division)
        {
            var result = _masterRepository.GetKPIDashboardData(LoginId, Month, Year, Division);
            return Json(result);
        }

        [HttpPost]
        public IActionResult KPIDataSave(KPIDashBoard KPIData)
        {
            HttpContext.Session.SetString("SelectedMonths", KPIData.Month_Selected);
            HttpContext.Session.SetString("SelectedYear", KPIData.Year_Selected);
            var result = _masterRepository.KPIDataSave(LoginId, Convert.ToInt32(RoleId), KPIData);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;

            return RedirectToAction("KPIDashBoard", "KPIDashBoard");
        }

        public JsonResult GetKPIDashboardRemarks(string ProjectId, string KPIId, string Hub)
        {
            var result = _masterRepository.GetKPIDashboardRemarks(ProjectId, KPIId, Hub, LoginId);
            return Json(result);
        }

        [HttpPost]
        public IActionResult InsertUpdateReason(int ReasonId, string ReasonName, string Type)
        {
            KPIDashBoard kpidash = new KPIDashBoard();
            kpidash.message = _masterRepository.KPIReasonMaster(ReasonId, ReasonName, Type, LoginId);
            var data = _masterRepository.GetKPIDashBoardMasterData();
            var reson = data.ReasonsForDelayList.Select(m => new SelectListItem { Text = m.ReasonName, Value = Convert.ToString(m.ResonValue), Disabled = m.IsUsed }).ToList();
            kpidash.DelayReason = JsonConvert.SerializeObject(reson);
            return Ok(kpidash);
        }

        [HttpGet]
        public IActionResult KPIDashBoardExcel(string Month, string Year, string Division)
        {
            var result = _masterRepository.GetKPIDashboardData(LoginId, Month, Year, Division);
            var data = result;
            var fileName = "KPIDashboard.xlsx";

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("KPIDashboard");
                var currentRow = 1;

                worksheet.Cell(currentRow, 1).Value = "Project Code";
                worksheet.Cell(currentRow, 2).Value = "Project Name";
                worksheet.Cell(currentRow, 3).Value = "Division";
                worksheet.Cell(currentRow, 4).Value = "HUB";
                worksheet.Cell(currentRow, 5).Value = "KPI";
                worksheet.Cell(currentRow, 6).Value = "Baseline Start Date";
                worksheet.Cell(currentRow, 7).Value = "Baseline End Date";
                worksheet.Cell(currentRow, 8).Value = "Latest Version Start Date";
                worksheet.Cell(currentRow, 9).Value = "Latest Version  End Date";
                worksheet.Cell(currentRow, 10).Value = "Completion Date";
                worksheet.Cell(currentRow, 11).Value = "Status";
                worksheet.Cell(currentRow, 12).Value = "Reason for Delay";
                worksheet.Cell(currentRow, 13).Value = "Remarks";

                var headerRange = worksheet.Range(currentRow, 1, currentRow, 13);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                worksheet.Column("1").Width = 20;
                worksheet.Column("2").Width = 30;
                worksheet.Column("3").Width = 15;
                worksheet.Column("4").Width = 15;
                worksheet.Column("5").Width = 30;
                worksheet.Column("6").Width = 20;
                worksheet.Column("7").Width = 20;
                worksheet.Column("8").Width = 20;
                worksheet.Column("9").Width = 20;
                worksheet.Column("10").Width = 20;
                worksheet.Column("11").Width = 25;
                worksheet.Column("12").Width = 30;
                worksheet.Column("13").Width = 40;

                worksheet.Column(2).Style.Alignment.WrapText = true;
                worksheet.Column(5).Style.Alignment.WrapText = true;
                worksheet.Column(10).Style.Alignment.WrapText = true;
                worksheet.Column(11).Style.Alignment.WrapText = true;

                var groupedData = data.GroupBy(m => m.ProjectCode);
                var currentHub = "";
                var hubspan = 0;

                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();
                    currentHub = firstItem.HUBName;
                    hubspan = group.Where(m => m.HUBName == currentHub).Count();

                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = firstItem.ProjectCode;
                    worksheet.Cell(currentRow, 2).Value = firstItem.ProjectName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.Division;
                    worksheet.Cell(currentRow, 4).Value = firstItem.HUBName;
                    worksheet.Cell(currentRow, 5).Value = firstItem.TaskDesc;
                    worksheet.Cell(currentRow, 6).Value = firstItem.StartDate;
                    worksheet.Cell(currentRow, 7).Value = firstItem.EndDate;
                    worksheet.Cell(currentRow, 8).Value = firstItem.LatestVersionStartDate;
                    worksheet.Cell(currentRow, 9).Value = firstItem.LatestVersionEndDate;
                    worksheet.Cell(currentRow, 10).Value = firstItem.CompletionDate;
                    var status = Convert.ToInt32(firstItem.Status);
                    var cell = worksheet.Cell(currentRow, 11);
                    cell.Value = firstItem.StatusNames;

                    if (status == 1)
                    {
                        cell.Style.Font.FontColor = XLColor.FromHtml("#28a745"); // Corresponds to 'text-success'
                    }
                    else if (status == 5)
                    {
                        cell.Style.Font.FontColor = XLColor.FromHtml("#ffc107"); // Corresponds to 'text-warning'
                    }
                    else if (status == 10)
                    {
                        cell.Style.Font.FontColor = XLColor.FromHtml("#dc3545"); // Corresponds to 'text-danger'
                    }
                    else if (status == 15)
                    {
                        cell.Style.Font.FontColor = XLColor.FromHtml("#17a2b8"); // Corresponds to 'text-info'
                    }
                    worksheet.Cell(currentRow, 12).Value = firstItem.LatestReason ?? "";
                    worksheet.Cell(currentRow, 13).Value = firstItem.LatestRemarks ?? "";

                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 3; i++)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }
                    }

                    if (hubspan > 1)
                    {
                        worksheet.Range(currentRow, 4, currentRow + hubspan-1, 4).Merge();
                        worksheet.Cell(currentRow, 4).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                    }

                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;

                        if(item.HUBName != currentHub)
                        {
                            currentHub = item.HUBName;
                            hubspan = group.Where(m => m.HUBName == currentHub).Count();
                            if (hubspan > 1)
                            {
                                worksheet.Range(currentRow, 4, currentRow + hubspan-1, 4).Merge();
                                worksheet.Cell(currentRow, 4).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                            }
                        }

                        worksheet.Cell(currentRow, 1).Value = item.ProjectCode;
                        worksheet.Cell(currentRow, 2).Value = item.ProjectName;
                        worksheet.Cell(currentRow, 3).Value = item.Division;
                        worksheet.Cell(currentRow, 4).Value = item.HUBName;
                        worksheet.Cell(currentRow, 5).Value = item.TaskDesc;
                        worksheet.Cell(currentRow, 6).Value = item.StartDate;
                        worksheet.Cell(currentRow, 7).Value = item.EndDate;
                        worksheet.Cell(currentRow, 8).Value = item.LatestVersionStartDate;
                        worksheet.Cell(currentRow, 9).Value = item.LatestVersionEndDate;
                        worksheet.Cell(currentRow, 10).Value = item.CompletionDate;
                        var status1 = Convert.ToInt32(item.Status);
                        var cell1 = worksheet.Cell(currentRow, 11);
                        cell1.Value = item.StatusNames;

                        if (status1 == 1)
                        {
                            cell1.Style.Font.FontColor = XLColor.FromHtml("#28a745"); // Corresponds to 'text-success'
                        }
                        else if (status1 == 5)
                        {
                            cell1.Style.Font.FontColor = XLColor.FromHtml("#ffc107"); // Corresponds to 'text-warning'
                        }
                        else if (status1 == 10)
                        {
                            cell1.Style.Font.FontColor = XLColor.FromHtml("#dc3545"); // Corresponds to 'text-danger'
                        }
                        else if (status1 == 15)
                        {
                            cell1.Style.Font.FontColor = XLColor.FromHtml("#17a2b8"); // Corresponds to 'text-info'
                        }
                        worksheet.Cell(currentRow, 12).Value = item.LatestReason ?? "";
                        worksheet.Cell(currentRow, 13).Value = item.LatestRemarks ?? "";
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
    }
}