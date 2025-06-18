using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using NonFactors.Mvc.Grid;

namespace Ideation.Controllers
{
    public class NewIdeationController : BaseController
    {
        IIdeationRepository ideationRepository;
        IMasterRepository master;
        public NewIdeationController(IMasterRepository master, IIdeationRepository ideationRepository)
        {
            this.ideationRepository = ideationRepository;
            this.master = master;
        }
        public IActionResult Ideation(NewIdeationData ideation)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            if (ideation != null && String.IsNullOrWhiteSpace(ideation.StartDate))
            {
                ideation.StartDate = DateTime.Now.AddDays(-30).ToString("dd-MM-yyyy");
                ideation.StatusId = "2";
            }
            if (ideation != null && String.IsNullOrWhiteSpace(ideation.EndDate))
            {
                ideation.EndDate = DateTime.Now.ToString("dd-MM-yyyy");
            }

            Masters masters = master.GetMasters();
            ideation.PlatformTypeList = masters.PlatformTypes.Select(m => new SelectListItem { Text = m.PlatformTypeName, Value = m.PlatformTypeId.ToString() });
            ideation.BusinessDivisionList = masters.BusinessDivisions.Select(m => new SelectListItem { Text = m.BusinessDivisionName, Value = m.BusinessDivisionId.ToString() });
            ideation.GeographicList = masters.GeographicScopes.Select(m => new SelectListItem { Text = m.GeographicName, Value = m.GeographicId.ToString() });
            ideation.StatusList = masters.Statuses.Select(m => new SelectListItem { Text = m.StatusName, Value = m.StatusId.ToString(), Selected = m.StatusId.ToString() == "2" ? true : false });
            ideation.RemarksList = masters.Remarks.Select(m => new SelectListItem { Text = m.RemarkName, Value = m.RemarkId.ToString() });
            ideation.RemarkDiscriptionList = masters.Remarks.Select(m => new SelectListItem { Text = m.RemarkDiscription, Value = m.RemarkId.ToString() });
            var result = ideationRepository.GetIdeation(ideation.StartDate, ideation.EndDate, ideation.BusinessDivisionId, ideation.PlatformTypeId, ideation.GeographicId, ideation.StatusId, loginId,role);
            ideation.IdeationListData = JsonConvert.SerializeObject(result);
            return View(ideation);
        }
        public IActionResult GetIdeationSearchedResult(string startdate,string enddate,string platformdomainid,string platformtypeid,string geographicid,string statusid)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");

            var result = ideationRepository.GetIdeation(startdate, enddate, platformdomainid, platformtypeid,geographicid,statusid, loginId,role);
            return Ok(result);
        }
        [HttpPost]
        public JsonResult GetIdeationById(int InnovationId)
        {
            IdeationData ideation = new IdeationData();
            Masters masters = master.GetMasters();

            //ViewBag.RemarkList = remarkList.Select(m => new SelectListItem { Text = m.RemarkName, Value = m.RemarkId.ToString() });
            var res = Json(ideationRepository.GetIdeationById(InnovationId));
            return res;
        }

        [HttpPost]
        public JsonResult UpdateIdeationStatus(IdeationStatus idstats)
        {
            idstats.ActionBy = HttpContext.Session.GetString("UserName");
            var res = Json(ideationRepository.IdeationStatusUpdate(idstats));
            return res;
        }

        [HttpPost]
        public JsonResult GetIdeationRemarks(int InnovationId)
        {
            var result = Json(ideationRepository.GetIdeationByRemarks(InnovationId));
            return result;
        }

        [HttpPost]
        public JsonResult GetRemarkDiscription(int RemarkId)
        {
            var result = Json(ideationRepository.GetRemarkDes(RemarkId));
            return result;
        }
        [HttpGet]
        public IActionResult GetIdeationExceldata(string startdate, string enddate, string platformdomainid, string platformtypeid, string geographicid, string statusid)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            var result = ideationRepository.GetIdeation(startdate, enddate, platformdomainid, platformtypeid, geographicid, statusid, loginId,role);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("IdeationList");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Innovation Id";
                worksheet.Cell(currentRow, 2).Value = "Innovation Title";
                worksheet.Cell(currentRow, 3).Value = "Platform Domain";
                worksheet.Cell(currentRow, 4).Value = "Platform Type";
                worksheet.Cell(currentRow, 5).Value = "Geographic Scope";
                worksheet.Cell(currentRow, 6).Value = "Status";
                worksheet.Cell(currentRow, 7).Value = "Submitted By";
                worksheet.Cell(currentRow, 8).Value = "Submitted Date";

                var headerRange = worksheet.Range(currentRow, 1, currentRow,8);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                foreach (var item in result)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.InnovationId;
                    worksheet.Cell(currentRow, 2).Value = item.BusinessDivisionName;
                    worksheet.Cell(currentRow, 3).Value = item.InnovationTitle;
                    worksheet.Cell(currentRow, 4).Value = item.PlatformTypeName;
                    worksheet.Cell(currentRow, 5).Value = item.GeographicName;
                    worksheet.Cell(currentRow, 6).Value = item.StatusName;
                    if(item.StatusName.ToLower() == "pending")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.FromHtml("#ffc107");

                    }
                    else if(item.StatusName.ToLower() == "existing")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.FromHtml("#007bff");

                    }
                    else if (item.StatusName.ToLower() == "approved")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.FromHtml("#28a745");

                    }
                    else if (item.StatusName.ToLower() == "declined")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.FromHtml("#f00");

                    }
                    else if (item.StatusName.ToLower() == "sendback")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.FromHtml("#17a2b8");

                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.FromHtml("#000000");

                    }
                    string dateString = item.CreatedDate;

                    DateTime parsedDate;
                    if (DateTime.TryParse(dateString, out parsedDate))
                    {
                        worksheet.Cell(currentRow, 8).SetValue(parsedDate.ToString("d MMM yyyy"));
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 8).Value = dateString; // or set some default/fallback value
                    }


                }
                worksheet.Column("1").Width = 15;
                worksheet.Column("2").Width = 40;
                worksheet.Column("3").Width = 30;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 10;
                worksheet.Column("7").Width = 15;
                worksheet.Column("8").Width = 15;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Ideation.xlsx");
                }
            }
        }





    }
}
