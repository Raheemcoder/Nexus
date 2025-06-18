using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office.CustomUI;
using Ideation.Core;
using Ideation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ideation.Controllers
{
    public class TrackerSupportController : BaseController
    {
        #region Constructor
        private readonly IEPPMMasterRepository _masterRepository;

        private readonly IConfiguration? Configuration;
        private readonly IWebHostEnvironment webHostEnvironment;
        public TrackerSupportController(IHomeRepository homeRepository, IWebHostEnvironment webHostEnvironment, IEPPMMasterRepository masterRepository, IGanttChartRepository ganttChartRepository, IConfiguration Configuration)
        {
            this._masterRepository = masterRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = Configuration;
        }
        #endregion

        #region IssueTracker

        [HttpGet]
        public IActionResult IssueTracker()
        {
            IssueTracker it = new IssueTracker();
            it = _masterRepository.GetDropdownValues();
            return View(it);
        }

        public IActionResult GetIssueList(int projectId)
        {
            HttpContext.Session.SetString("projectId", Convert.ToString(projectId));
            var result = _masterRepository.GetIssueList(projectId);
            return Ok(result);
        }

        public IActionResult GetTaskById(int IssueId)
        {
            var result = _masterRepository.GetTaskByIssue(IssueId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult DeleteIssue(int ProjectId, int IssueId)
        {
            var LoginId = HttpContext.Session.GetString("UserName").ToString();
            var result = _masterRepository.DeleteIssue(ProjectId, IssueId, LoginId);
            return Ok(new { Message = result.Item1, MessageClass = result.Item2 });
        }

        [HttpGet]
        public IActionResult GetIssueExcelData(int projectId, string projectName)
        {
            var result = _masterRepository.GetIssueList(projectId);
            var data = result.Item1;
            var fileName = projectName + " " + "IssueTracker.xlsx";

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("IssueTrackerExcel");
                var currentRow = 1;

                // headers
                worksheet.Cell(currentRow, 1).Value = "Issue No";
                worksheet.Cell(currentRow, 2).Value = "HUB";
                worksheet.Cell(currentRow, 3).Value = "Issue Description";
                worksheet.Cell(currentRow, 4).Value = "Issue Identification Date";
                worksheet.Cell(currentRow, 5).Value = "Impact Assesment";
                worksheet.Cell(currentRow, 6).Value = "Impacted Task";
                worksheet.Cell(currentRow, 7).Value = "Created By";
                worksheet.Cell(currentRow, 8).Value = "Created On";
                worksheet.Cell(currentRow, 9).Value = "Action Plan";
                worksheet.Cell(currentRow, 10).Value = "Action Assigned To";
                worksheet.Cell(currentRow, 11).Value = "Due Date";
                worksheet.Cell(currentRow, 12).Value = "Priority";
                worksheet.Cell(currentRow, 13).Value = "Status";
                worksheet.Cell(currentRow, 14).Value = "Updates from the Owner";
                worksheet.Cell(currentRow, 15).Value = "Closed On Date And Closed Remarks";

                // header styles
                var headerRange = worksheet.Range(currentRow, 1, currentRow, 15);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                // column width
                worksheet.Column("1").Width = 15;
                worksheet.Column("2").Width = 20;
                worksheet.Column("3").Width = 50;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 25;
                worksheet.Column("6").Width = 30;
                worksheet.Column("7").Width = 25;
                worksheet.Column("8").Width = 12;
                worksheet.Column("9").Width = 50;
                worksheet.Column("10").Width = 25;
                worksheet.Column("11").Width = 12;
                worksheet.Column("12").Width = 12;
                worksheet.Column("13").Width = 12;
                worksheet.Column("14").Width = 50;
                worksheet.Column("15").Width = 50;

                // Group data by IssueId
                var groupedData = data.GroupBy(m => m.IssueId);

                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    currentRow++;

                    // Set the values for the first item in the group
                    worksheet.Cell(currentRow, 1).Value = firstItem.IssueNo;
                    worksheet.Cell(currentRow, 2).Value = firstItem.HubName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.IssueDescription;
                    worksheet.Cell(currentRow, 4).Value = firstItem.IssueIdentificationDate;
                    worksheet.Cell(currentRow, 5).Value = firstItem.ImpactAssesment;
                    worksheet.Cell(currentRow, 6).Value = firstItem.ImpactedTask;
                    worksheet.Cell(currentRow, 7).Value = firstItem.CreatedBy;
                    worksheet.Cell(currentRow, 8).Value = firstItem.CreatedOn;
                    worksheet.Cell(currentRow, 9).Value = firstItem.ActionPlan ?? "";
                    worksheet.Cell(currentRow, 10).Value = firstItem.Resources ?? "";
                    worksheet.Cell(currentRow, 11).Value = firstItem.DueDate ?? "";
                    worksheet.Cell(currentRow, 12).Value = firstItem.Priority ?? "";
                    worksheet.Cell(currentRow, 13).Value = firstItem.Status ?? "";
                    worksheet.Cell(currentRow, 14).Value = firstItem.LatestOwnerUpdate ?? "";
                    worksheet.Cell(currentRow, 15).Value = firstItem.ClosedDetails ?? "";

                    // Merge cells for the columns from "Issue No" to "reate On" if there are multiple rows
                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 8; i++) // Columns 1 to 8 (Issue No to Create On)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }
                    }

                    // Write the remaining rows for this group
                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.IssueNo;
                        worksheet.Cell(currentRow, 2).Value = item.HubName;
                        worksheet.Cell(currentRow, 3).Value = item.IssueDescription;
                        worksheet.Cell(currentRow, 4).Value = item.IssueIdentificationDate;
                        worksheet.Cell(currentRow, 5).Value = item.ImpactAssesment;
                        worksheet.Cell(currentRow, 6).Value = item.ImpactedTask;
                        worksheet.Cell(currentRow, 7).Value = item.CreatedBy;
                        worksheet.Cell(currentRow, 8).Value = item.CreatedOn;
                        worksheet.Cell(currentRow, 9).Value = item.ActionPlan ?? "";
                        worksheet.Cell(currentRow, 10).Value = item.Resources ?? "";
                        worksheet.Cell(currentRow, 11).Value = item.DueDate ?? "";
                        worksheet.Cell(currentRow, 12).Value = item.Priority ?? "";
                        worksheet.Cell(currentRow, 13).Value = item.Status ?? "";
                        worksheet.Cell(currentRow, 14).Value = item.LatestOwnerUpdate ?? "";
                        worksheet.Cell(currentRow, 15).Value = item.ClosedDetails ?? "";
                    }
                }

                // column text wrap
                worksheet.Column(2).Style.Alignment.WrapText = true;
                worksheet.Column(3).Style.Alignment.WrapText = true;
                worksheet.Column(5).Style.Alignment.WrapText = true;
                worksheet.Column(6).Style.Alignment.WrapText = true;
                worksheet.Column(7).Style.Alignment.WrapText = true;
                worksheet.Column(9).Style.Alignment.WrapText = true;
                worksheet.Column(10).Style.Alignment.WrapText = true;
                worksheet.Column(14).Style.Alignment.WrapText = true;
                worksheet.Column(15).Style.Alignment.WrapText = true;

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

        public IActionResult GetTaskList(int projectId, string hubId)
        {
            var result = _masterRepository.GetTaskList(projectId, hubId);
            return Ok(result);
        }

        public IActionResult GetParticularIssueData(int issueId)
        {
            var result = _masterRepository.GetParticularIssueData(issueId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult InsertUpdateIssue()
        {
            var Headers = Convert.ToString(Request.Form["Headers"]);
            var Details = Convert.ToString(Request.Form["Details"]);
            var ImpactedTasks = Convert.ToString(Request.Form["ImpactedTasks"]);
            var IsInsert = Convert.ToInt32(Request.Form["IsInsert"]);
            var IssueId = Convert.ToInt32(Request.Form["IssueId"]);
            var ProjectId = Convert.ToInt32(Request.Form["ProjectId"]);

            var result = _masterRepository.InsertUpdateIssue(
                    Headers, Details, ImpactedTasks, HttpContext.Session.GetString("UserName"), ProjectId,
                    IsInsert, IssueId
            );

            return Ok(result);
        }
        #endregion

        #region Changelog
        public IActionResult ChangeLog()
        {
            ChangeLog cg = new ChangeLog();
            cg.IssueTracker = _masterRepository.GetDropdownValues();
            return View(cg);
        }
        public IActionResult GetChangeList(int projectId)
        {
            HttpContext.Session.SetString("projectId", Convert.ToString(projectId));
            var result = _masterRepository.GetChangeList(projectId);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult DeleteChange(int ProjectId, int ChangeId)
        {
            var LoginId = HttpContext.Session.GetString("UserName").ToString();
            var result = _masterRepository.DeleteChange(ProjectId, ChangeId, LoginId);
            return Ok(new { Message = result.Item1, MessageClass = result.Item2 });
        }
        [HttpGet]
        public IActionResult GetChangeExcelData(int projectId, string projectName)
        {
            var result = _masterRepository.GetChangeList(projectId);
            var data = result.Item1;
            var fileName = projectName + " " + "ChangeLog.xlsx";

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("ChangeLogExcel");
                var currentRow = 1;

                // Headers
                worksheet.Cell(currentRow, 1).Value = "Change No";
                worksheet.Cell(currentRow, 2).Value = "HUB";
                worksheet.Cell(currentRow, 3).Value = "Change Proposed By";
                worksheet.Cell(currentRow, 4).Value = "Change Proposed Date";
                worksheet.Cell(currentRow, 5).Value = "Change Details";
                worksheet.Cell(currentRow, 6).Value = "Impact Area";
                worksheet.Cell(currentRow, 7).Value = "Impact Description";
                worksheet.Cell(currentRow, 8).Value = "Change Request Status";
                worksheet.Cell(currentRow, 9).Value = "Agreed/Rejected By";
                worksheet.Cell(currentRow, 10).Value = "Agreed/Rejected Date";
                worksheet.Cell(currentRow, 11).Value = "Remarks";
                worksheet.Cell(currentRow, 12).Value = "Created By";
                worksheet.Cell(currentRow, 13).Value = "Created On";
                worksheet.Cell(currentRow, 14).Value = "Action Plan";
                worksheet.Cell(currentRow, 15).Value = "Action Assigned To";
                worksheet.Cell(currentRow, 16).Value = "Due Date";
                worksheet.Cell(currentRow, 17).Value = "Priority";
                worksheet.Cell(currentRow, 18).Value = "Status";
                worksheet.Cell(currentRow, 19).Value = "Updates from the Owner";
                worksheet.Cell(currentRow, 20).Value = "Closed On Date And Closed Remarks";

                // Header styling
                var headerRange = worksheet.Range(currentRow, 1, currentRow, 20);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                // Set column widths
                worksheet.Column("1").Width = 15;
                worksheet.Column("2").Width = 20;
                worksheet.Column("3").Width = 25;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 50;
                worksheet.Column("6").Width = 35;
                worksheet.Column("7").Width = 30;
                worksheet.Column("8").Width = 20;
                worksheet.Column("9").Width = 25;
                worksheet.Column("10").Width = 20;
                worksheet.Column("11").Width = 25;
                worksheet.Column("12").Width = 25;
                worksheet.Column("13").Width = 15;
                worksheet.Column("14").Width = 50;
                worksheet.Column("15").Width = 25;
                worksheet.Column("16").Width = 12;
                worksheet.Column("17").Width = 12;
                worksheet.Column("18").Width = 12;
                worksheet.Column("19").Width = 50;
                worksheet.Column("20").Width = 50;

                // Group data by Change No
                var groupedData = data.GroupBy(m => m.ChangeNo);

                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    currentRow++;

                    // Set the values for the first item in the group
                    worksheet.Cell(currentRow, 1).Value = firstItem.ChangeNo;
                    worksheet.Cell(currentRow, 2).Value = firstItem.HubName;
                    worksheet.Cell(currentRow, 3).Value = firstItem.ProposedBy;
                    worksheet.Cell(currentRow, 4).Value = firstItem.ProposedDate;
                    worksheet.Cell(currentRow, 5).Value = firstItem.ChangeDetails;
                    worksheet.Cell(currentRow, 6).Value = firstItem.ImpactArea;
                    worksheet.Cell(currentRow, 7).Value = firstItem.ImpactDescription;
                    worksheet.Cell(currentRow, 8).Value = firstItem.ChangeRequestStatus ?? "";
                    if (firstItem.ChangeRequestStatus != null)
                    {
                        if (firstItem.ChangeRequestStatus.ToLower() == "agreed")
                        {
                            worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.Green;
                        }
                        else if (firstItem.ChangeRequestStatus.ToLower() == "rejected")
                        {
                            worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.Red;
                        }
                        else if (firstItem.ChangeRequestStatus.ToLower() == "on hold")
                        {
                            worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.GoldenYellow;
                        }
                    }
                    worksheet.Cell(currentRow, 9).Value = firstItem.AgreedRejectedBy ?? "";
                    worksheet.Cell(currentRow, 10).Value = firstItem.AgreedRejectedDate ?? "";
                    worksheet.Cell(currentRow, 11).Value = firstItem.LatestRemarks ?? "";
                    worksheet.Cell(currentRow, 12).Value = firstItem.CreatedBy ?? "";
                    worksheet.Cell(currentRow, 13).Value = firstItem.CreatedOn ?? "";
                    worksheet.Cell(currentRow, 14).Value = firstItem.ActionPlan ?? "";
                    worksheet.Cell(currentRow, 15).Value = firstItem.Resources ?? "";
                    worksheet.Cell(currentRow, 16).Value = firstItem.DueDate ?? "";
                    worksheet.Cell(currentRow, 17).Value = firstItem.Priority ?? "";
                    worksheet.Cell(currentRow, 18).Value = firstItem.Status ?? "";
                    worksheet.Cell(currentRow, 19).Value = firstItem.LatestOwnerUpdate ?? "";
                    worksheet.Cell(currentRow, 20).Value = firstItem.ClosedDetails ?? "";

                    // Merge cells for the columns from "Change No" to "Created On" if there are multiple rows
                    if (rowspan > 1)
                    {
                        for (int i = 1; i <= 13; i++) // Columns 1 to 13 (Change No to Created On)
                        {
                            worksheet.Range(currentRow, i, currentRow + rowspan - 1, i).Merge();
                            worksheet.Cell(currentRow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Top;
                        }
                    }

                    // Write the remaining rows for this group
                    foreach (var item in group.Skip(1))
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 2).Value = item.HubName;
                        worksheet.Cell(currentRow, 3).Value = item.ProposedBy;
                        worksheet.Cell(currentRow, 4).Value = item.ProposedDate;
                        worksheet.Cell(currentRow, 5).Value = item.ChangeDetails;
                        worksheet.Cell(currentRow, 6).Value = item.ImpactArea;
                        worksheet.Cell(currentRow, 7).Value = item.ImpactDescription;
                        worksheet.Cell(currentRow, 8).Value = item.ChangeRequestStatus ?? "";
                        if (item.ChangeRequestStatus != null)
                        {
                            if (item.ChangeRequestStatus.ToLower() == "accepted")
                            {
                                worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.Green;
                            }
                            else if (item.ChangeRequestStatus.ToLower() == "rejected")
                            {
                                worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.Red;
                            }
                            else if (firstItem.ChangeRequestStatus.ToLower() == "on hold")
                            {
                                worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.GoldenYellow;
                            }
                        }
                        worksheet.Cell(currentRow, 9).Value = item.AgreedRejectedBy ?? "";
                        worksheet.Cell(currentRow, 10).Value = item.AgreedRejectedDate ?? "";
                        worksheet.Cell(currentRow, 11).Value = item.LatestRemarks ?? "";
                        worksheet.Cell(currentRow, 12).Value = item.CreatedBy ?? "";
                        worksheet.Cell(currentRow, 13).Value = item.CreatedOn ?? "";
                        worksheet.Cell(currentRow, 14).Value = item.ActionPlan ?? "";
                        worksheet.Cell(currentRow, 15).Value = item.Resources ?? "";
                        worksheet.Cell(currentRow, 16).Value = item.DueDate ?? "";
                        worksheet.Cell(currentRow, 17).Value = item.Priority ?? "";
                        worksheet.Cell(currentRow, 18).Value = item.Status ?? "";
                        worksheet.Cell(currentRow, 19).Value = item.LatestOwnerUpdate ?? "";
                        worksheet.Cell(currentRow, 20).Value = item.ClosedDetails ?? "";
                    }
                }

                // Apply text wrap
                worksheet.Column(2).Style.Alignment.WrapText = true;
                worksheet.Column(3).Style.Alignment.WrapText = true;
                worksheet.Column(5).Style.Alignment.WrapText = true;
                worksheet.Column(6).Style.Alignment.WrapText = true;
                worksheet.Column(7).Style.Alignment.WrapText = true;
                worksheet.Column(9).Style.Alignment.WrapText = true;
                worksheet.Column(11).Style.Alignment.WrapText = true;
                worksheet.Column(12).Style.Alignment.WrapText = true;
                worksheet.Column(14).Style.Alignment.WrapText = true;
                worksheet.Column(15).Style.Alignment.WrapText = true;
                worksheet.Column(19).Style.Alignment.WrapText = true;
                worksheet.Column(20).Style.Alignment.WrapText = true;

                // Save workbook to a MemoryStream
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

        public IActionResult GetParticularChangeData(int ChangeId)
        {
            var result = _masterRepository.GetParticularChangeData(ChangeId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult InsertUpdateChange()
        {
            var Headers = Convert.ToString(Request.Form["Headers"]);
            var Details = Convert.ToString(Request.Form["Details"]);
            var IsInsert = Convert.ToInt32(Request.Form["IsInsert"]);
            var ChangeId = Convert.ToInt32(Request.Form["ChangeId"]);
            var ProjectId = Convert.ToInt32(Request.Form["ProjectId"]);
            var Remarks = Convert.ToString(Request.Form["Remarks"]);

            var result = _masterRepository.InsertUpdateChange(
                    Headers, Details, HttpContext.Session.GetString("UserName"), ProjectId,
                    IsInsert, ChangeId, Remarks
            );

            return Ok(result);
        }

        public IActionResult RedirectToPMUMappingOnScopeChange(string hubId, string hubName)
        {
            HttpContext.Session.SetString("HubId", hubId);
            HttpContext.Session.SetString("HubName", hubName);
            return RedirectToAction("PmuMappings", "ProjectTracker");
        }
        #endregion

        #region Risk Register
        public IActionResult RiskRegister()
        {
            RiskRegister rg = new RiskRegister();
            rg.IssueTracker = _masterRepository.GetDropdownValues();
            return View(rg);
        }
        public IActionResult GetRiskList(int projectId)
        {
            HttpContext.Session.SetString("projectId", Convert.ToString(projectId));
            var result = _masterRepository.GetRiskList(projectId);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult DeleteRisk(int ProjectId, int RiskId)
        {
            var LoginId = HttpContext.Session.GetString("UserName").ToString();
            var result = _masterRepository.DeleteRisk(ProjectId, RiskId, LoginId);
            return Ok(new { Message = result.Item1, MessageClass = result.Item2 });
        }
        [HttpGet]
        public IActionResult GetRiskExcelData(int projectId, string projectName)
        {

            var result = _masterRepository.GetRiskList(projectId);
            var fileName = projectName + " " + "RiskRegister.xlsx";
            var data = result.Item1;

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("RiskRegisterExcel");
                var currentRow = 1;

                // Merge and set group headers
                worksheet.Range(currentRow, 1, currentRow, 7).Merge().Value = "Risk Identification & Classification";
                worksheet.Range(currentRow, 8, currentRow, 10).Merge().Value = "Risk Assessment";
                worksheet.Range(currentRow, 11, currentRow, 13).Merge().Value = "Risk Response Plan";
                worksheet.Range(currentRow, 14, currentRow, 17).Merge().Value = "Monitoring & Control";

                // Style the group headers
                var groupHeaderRange1 = worksheet.Range(currentRow, 1, currentRow, 7);
                groupHeaderRange1.Style.Font.Bold = true;
                groupHeaderRange1.Style.Fill.BackgroundColor = XLColor.FromHtml("#ffc000");
                groupHeaderRange1.Style.Font.FontColor = XLColor.White;
                groupHeaderRange1.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                groupHeaderRange1.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupHeaderRange2 = worksheet.Range(currentRow, 8, currentRow, 10);
                groupHeaderRange2.Style.Font.Bold = true;
                groupHeaderRange2.Style.Fill.BackgroundColor = XLColor.FromHtml("#c65911");
                groupHeaderRange2.Style.Font.FontColor = XLColor.White;
                groupHeaderRange2.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                groupHeaderRange2.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupHeaderRange3 = worksheet.Range(currentRow, 11, currentRow, 13);
                groupHeaderRange3.Style.Font.Bold = true;
                groupHeaderRange3.Style.Fill.BackgroundColor = XLColor.FromHtml("#f4b084");
                groupHeaderRange3.Style.Font.FontColor = XLColor.White;
                groupHeaderRange3.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                groupHeaderRange3.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                var groupHeaderRange4 = worksheet.Range(currentRow, 14, currentRow, 17);
                groupHeaderRange4.Style.Font.Bold = true;
                groupHeaderRange4.Style.Fill.BackgroundColor = XLColor.FromHtml("#9bc2e6");
                groupHeaderRange4.Style.Font.FontColor = XLColor.White;
                groupHeaderRange4.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                groupHeaderRange4.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                currentRow++;

                // Set the headers below the group headers
                worksheet.Cell(currentRow, 1).Value = "Risk No";
                worksheet.Cell(currentRow, 2).Value = "Risk Description";
                worksheet.Cell(currentRow, 3).Value = "Risk Identification Date";
                worksheet.Cell(currentRow, 4).Value = "Impact Area";
                worksheet.Cell(currentRow, 5).Value = "Impact Description";
                worksheet.Cell(currentRow, 6).Value = "Created By";
                worksheet.Cell(currentRow, 7).Value = "Created On";

                worksheet.Cell(currentRow, 8).Value = "Impact Level";
                worksheet.Cell(currentRow, 9).Value = "Probability Level";
                worksheet.Cell(currentRow, 10).Value = "Priority Level";

                worksheet.Cell(currentRow, 11).Value = "Action Plan";
                worksheet.Cell(currentRow, 12).Value = "Action Assigned To";
                worksheet.Cell(currentRow, 13).Value = "Due Date";

                worksheet.Cell(currentRow, 14).Value = "Priority";
                worksheet.Cell(currentRow, 15).Value = "Status";
                worksheet.Cell(currentRow, 16).Value = "Updates from the Owner";
                worksheet.Cell(currentRow, 17).Value = "Closed On Date And Closed Remarks";

                // Style the headers
                var headerRange = worksheet.Range(currentRow, 1, currentRow, 17);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#E26B0A");
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                // Columns width
                worksheet.Column("1").Width = 15;
                worksheet.Column("2").Width = 50;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 30;
                worksheet.Column("5").Width = 50;
                worksheet.Column("6").Width = 25;
                worksheet.Column("7").Width = 15;

                worksheet.Column("8").Width = 12;
                worksheet.Column("9").Width = 12;
                worksheet.Column("10").Width = 12;

                worksheet.Column("11").Width = 50;
                worksheet.Column("12").Width = 25;
                worksheet.Column("13").Width = 12;

                worksheet.Column("14").Width = 12;
                worksheet.Column("15").Width = 12;
                worksheet.Column("16").Width = 50;
                worksheet.Column("17").Width = 50;

                var groupedData = data.GroupBy(m => m.RiskNo);

                foreach (var group in groupedData)
                {
                    var firstItem = group.First();
                    int rowspan = group.Count();

                    worksheet.Cell(currentRow + 1, 1).Value = firstItem.RiskNo;
                    worksheet.Cell(currentRow + 1, 2).Value = firstItem.RiskDescription;
                    worksheet.Cell(currentRow + 1, 3).Value = firstItem.RiskIdentificationDate;
                    worksheet.Cell(currentRow + 1, 4).Value = firstItem.ImpactArea ?? "";
                    worksheet.Cell(currentRow + 1, 5).Value = firstItem.ImpactDescription ?? "";
                    worksheet.Cell(currentRow + 1, 6).Value = firstItem.CreatedBy;
                    worksheet.Cell(currentRow + 1, 7).Value = firstItem.CreatedOn;

                    worksheet.Cell(currentRow + 1, 8).Value = firstItem.ImpactLevel;
                    worksheet.Cell(currentRow + 1, 9).Value = firstItem.ProbabilityLevel;
                    worksheet.Cell(currentRow + 1, 10).Value = firstItem.PriorityLevel;
                   
                    for (int i = 1; i <= 10; i++)
                    {
                        worksheet.Cell(currentRow + 1, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                        if (rowspan > 1)
                        {
                            worksheet.Range(currentRow + 1, i, currentRow + rowspan, i).Merge();
                        }
                    }

                    foreach (var item in group)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 11).Value = item.ActionPlan ?? "";
                        worksheet.Cell(currentRow, 12).Value = item.Resources ?? "";
                        worksheet.Cell(currentRow, 13).Value = item.DueDate ?? "";
                        worksheet.Cell(currentRow, 14).Value = item.Priority ?? "";
                        worksheet.Cell(currentRow, 15).Value = item.Status ?? "";
                        worksheet.Cell(currentRow, 16).Value = item.LatestOwnerUpdate ?? "";
                        worksheet.Cell(currentRow, 17).Value = item.ClosedDetails ?? "";

                        if (!string.IsNullOrEmpty(item.PriorityLevel) && Convert.ToDouble(item.PriorityLevel) >= 15 && Convert.ToDouble(item.PriorityLevel) < 25)
                        {
                            worksheet.Cell(currentRow, 10).Style.Fill.BackgroundColor = XLColor.FromHtml("#FFA500");
                        }
                        else if (!string.IsNullOrEmpty(item.PriorityLevel) && Convert.ToDouble(item.PriorityLevel) >= 25)
                        {
                            worksheet.Cell(currentRow, 10).Style.Fill.BackgroundColor = XLColor.FromHtml("#FF0000");
                        }
                        else if (!string.IsNullOrEmpty(item.PriorityLevel) && Convert.ToDouble(item.PriorityLevel) >= 1 && Convert.ToDouble(item.PriorityLevel) <= 5)
                        {
                            worksheet.Cell(currentRow, 10).Style.Fill.BackgroundColor = XLColor.FromHtml("#00FF00");
                        }
                        else if (!string.IsNullOrEmpty(item.PriorityLevel) && Convert.ToDouble(item.PriorityLevel) > 5 && Convert.ToDouble(item.PriorityLevel) < 15)
                        {
                            worksheet.Cell(currentRow, 10).Style.Fill.BackgroundColor = XLColor.FromHtml("#ffff00");
                        }
                        else
                        {
                            worksheet.Cell(currentRow, 10).Style.Fill.BackgroundColor = XLColor.FromHtml("#ffffff");
                        }
                    }
                }

                // Apply text wrap to specific columns
                worksheet.Cell(currentRow, 2).Style.Alignment.WrapText = true;
                worksheet.Cell(currentRow, 4).Style.Alignment.WrapText = true;
                worksheet.Cell(currentRow, 5).Style.Alignment.WrapText = true;
                worksheet.Cell(currentRow, 6).Style.Alignment.WrapText = true;

                worksheet.Cell(currentRow, 11).Style.Alignment.WrapText = true;
                worksheet.Cell(currentRow, 12).Style.Alignment.WrapText = true;

                worksheet.Cell(currentRow, 16).Style.Alignment.WrapText = true;
                worksheet.Cell(currentRow, 17).Style.Alignment.WrapText = true;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                }
            }
        }

        public IActionResult GetParticularRiskData(int RiskId)
        {
            var result = _masterRepository.GetParticularRiskData(RiskId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult InsertUpdateRisk()
        {
            var Headers = Convert.ToString(Request.Form["Headers"]);
            var Details = Convert.ToString(Request.Form["Details"]);
            var IsInsert = Convert.ToInt32(Request.Form["IsInsert"]);
            var RiskId = Convert.ToInt32(Request.Form["RiskId"]);
            var ProjectId = Convert.ToInt32(Request.Form["ProjectId"]);

            var result = _masterRepository.InsertUpdateRisk(
                    Headers, Details, HttpContext.Session.GetString("UserName"), ProjectId,
                    IsInsert, RiskId
            );

            return Ok(result);
        }
        #endregion
    }
}