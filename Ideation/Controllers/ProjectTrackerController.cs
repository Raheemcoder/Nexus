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
using SelectListItem = System.Web.Mvc.SelectListItem;
using Ideation.Data;
using Microsoft.Build.Framework;


namespace EPPM_NM.Controllers
{
    public class ProjectTrackerController : BaseController
    {
        #region Constructor
        private readonly IHomeRepository _homeRepository;
        private readonly IEPPMMasterRepository _masterRepository;
        private readonly IGanttChartRepository _ganttChartRepository;

        private readonly IConfiguration? Configuration;
        private readonly IWebHostEnvironment webHostEnvironment;
        public ProjectTrackerController(IHomeRepository homeRepository, IWebHostEnvironment webHostEnvironment, IEPPMMasterRepository masterRepository, IGanttChartRepository ganttChartRepository, IConfiguration Configuration)
        {
            this._homeRepository = homeRepository;
            this._masterRepository = masterRepository;
            this._ganttChartRepository = ganttChartRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = Configuration;
        }
        #endregion

        [HttpGet]
        public IActionResult GetHubBasedOnProjectId(int projectId)
        {
            var HubList = _masterRepository.GetHubBasedOnProjectId(projectId);
            HttpContext.Session.Remove("HubList");
            HttpContext.Session.SetString("HubList", JsonConvert.SerializeObject(HubList));
            return Json(HubList);
        }

        #region Summary
        [HttpGet]
        public IActionResult Summary()
        {
            PMUMapping project = new PMUMapping();
            project = _homeRepository.Get_ProjectStatusList(HttpContext.Session.GetString("UserName"), Convert.ToInt32(HttpContext.Session.GetString("RoleId")));
            var getProjectList = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName"));
            project.ProjectList = getProjectList.Select(m => new SelectListItem { Value = m.ProjectId.ToString(), Text = m.ProjectName });
            project.ProjectVersionList = _masterRepository.GetVersionForSummary(0, 0);
            return View(project);
        }

        [HttpPost]
        public ActionResult GetSummaryMilestoneList(int projectId, string projectName, int HubId, string HubName, string Version)
        {
            // HttpContext.Session.SetString("projectName", Convert.ToString(projectName));
            HttpContext.Session.SetString("projectId", Convert.ToString(projectId));
            HttpContext.Session.SetString("HubId", Convert.ToString(HubId));
            //HttpContext.Session.SetString("HubName", Convert.ToString(HubName));
            HttpContext.Session.GetString(Convert.ToString(HubId));
            var summaryList = _homeRepository.Get_ProjectSummaryList(Convert.ToInt32(projectId), HttpContext.Session.GetString("UserName").ToString(), Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HubId, Version);
            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(summaryList);
            return Json(jsonData);
        }

        public ActionResult GetVersionRemarksDetails(string projectId, int HubId, string Version,int IsFrom)
        {
            var versionremarksdetails = _homeRepository.Get_ProjectVersiondetails(Convert.ToInt32(projectId), HubId, Version, IsFrom);
            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(versionremarksdetails);
            return Json(jsonData);
        }

        [HttpGet]
        public IActionResult GetExcelSummaryData(string projectId, string projectName, int HubId, string HubName, string Version)
        {
            PMUMapping pmumapping = new PMUMapping();
            HttpContext.Session.SetString("projectId", projectId);
            HttpContext.Session.SetString("HubId", Convert.ToString(HubId));
            string fileName = projectName + "_" + HubName + "_" + Version + ".xlsx";
            pmumapping.SummaryExcelData = _homeRepository.Get_ProjectSummaryExcelList(Convert.ToInt32(projectId), HttpContext.Session.GetString("UserName").ToString(), Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HubId, Version);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("SummaryExcel");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Sl.No";
                worksheet.Cell(currentRow, 2).Value = "WBS Header";
                worksheet.Cell(currentRow, 3).Value = "Task Name";
                worksheet.Cell(currentRow, 4).Value = "Task Status";
                worksheet.Cell(currentRow, 5).Value = "Baseline Start Date";
                worksheet.Cell(currentRow, 6).Value = "Baseline End Date";
                worksheet.Cell(currentRow, 7).Value = "Version Start Date";
                worksheet.Cell(currentRow, 8).Value = "Version End Date";
                worksheet.Cell(currentRow, 9).Value = "Actual Completed Date";
                worksheet.Cell(currentRow, 10).Value = "User Name";
                worksheet.Cell(currentRow, 11).Value = "Remarks";
                worksheet.Cell(currentRow, 12).Value = "Completion Remarks";
                worksheet.Cell(currentRow, 13).Value = "File";
                var index = 1;
                foreach (var item in pmumapping.SummaryExcelData)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = index;
                    if (item.IsCritical == "1")
                    {
                        worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    worksheet.Cell(currentRow, 2).Value = item.WBSHeaderDesc;
                    worksheet.Cell(currentRow, 2).Style.Font.FontColor = XLColor.FromHtml("#f37d1f");
                    worksheet.Cell(currentRow, 3).Value = item.TaskDesc;
                    if (item.IsKPI == true && item.IsKPIIncluded == true)
                    {
                        worksheet.Cell(currentRow, 3).Style.Font.FontColor = XLColor.Blue;
                    }
                    worksheet.Cell(currentRow, 4).Value = item.Status;
                    if (item.Status == "OverDue")
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.White;
                        worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    else if (item.Status == "Completed")
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.White;
                        worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.Green;
                    }
                    else if (item.Status == "Open")
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.White;
                        worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.Orange;
                    }
                    else if (item.Status == "In Progress")
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.White;
                        worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.DarkBlue;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 4).Value = " ";
                    }
                    worksheet.Cell(currentRow, 5).Value = item.baselineStartDate;
                    worksheet.Cell(currentRow, 6).Value = item.baselineEndDate;
                    worksheet.Cell(currentRow, 7).Value = item.StartDate;
                    worksheet.Cell(currentRow, 8).Value = item.EndDate;
                    worksheet.Cell(currentRow, 9).Value = item.ActualCompletedDate;
                    worksheet.Cell(currentRow, 10).Value = item.UserName;
                    worksheet.Cell(currentRow, 11).Value = item.Extention;
                    worksheet.Cell(currentRow, 12).Value = item.Completion;
                    worksheet.Cell(currentRow, 13).Value = item.FileName;
                    if (item.FileName == 1)
                    {
                        worksheet.Cell(currentRow, 13).Value = "Yes";
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 13).Value = " ";
                    }
                    index++;
                }
                worksheet.Column("1").Width = 10;
                worksheet.Column("2").Width = 35;
                worksheet.Column("3").Width = 35;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 20;
                worksheet.Column("6").Width = 20;
                worksheet.Column("7").Width = 20;
                worksheet.Column("8").Width = 20;
                worksheet.Column("9").Width = 20;
                worksheet.Column("10").Width = 35;
                worksheet.Column("11").Width = 34;
                worksheet.Column("12").Width = 35;
                worksheet.Column("13").Width = 10;

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

        public IActionResult GetSummaryVersion(int projectId, int HubId)
        {
            var result = _masterRepository.GetVersionForSummary(projectId, HubId);
            return Ok(result);
        }

        public ActionResult DisplayUploadedFiles(string ProjectId, string SeqNo, int HubId, string Version, int WBSHeaderId, int TaskId)
        {
            var result = _masterRepository.GetFile(ProjectId, SeqNo, HubId, Version, WBSHeaderId, TaskId);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetPMUMappingHistory(int projectId, int SlNo, int HubId, string Version, int WBSHeaderId, int TaskId)
        {
            var data = _ganttChartRepository.Get_HistoryList(SlNo, projectId, HubId, Version, WBSHeaderId, TaskId).ToList();
            return Json(data);
        }

        [HttpGet]
        public IActionResult GetUpdates(int HubId, int ProjectId)
        {
            var result = _masterRepository.GetUpdates(HubId, ProjectId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult SaveUpdates(int HubId, int ProjectId, string Updates)
        {
            var result = _masterRepository.SaveUpdates(HubId, ProjectId, Updates, HttpContext.Session.GetString("UserName"));
            return Ok(result);
        }

        #endregion


        #region Milestone

        public IActionResult MilestoneList()
        {
            return View();
        }

        public IActionResult GetMyMileStoneList(string status)
        {
            string UserName = HttpContext.Session.GetString("UserName");
            string EmailId = HttpContext.Session.GetString("EmailId");
            int roleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            if (status == null)
            {
                status = HttpContext.Session.GetString("SStatus");
            }
            else
            {
                HttpContext.Session.SetString("SStatus", status);
            }
            var myMilestoneCards = _masterRepository.GetMyMileStoneList(status, UserName, EmailId, roleId);
            return Ok(myMilestoneCards);
        }

        [EncryptedActionParameter]
        [HttpGet]
        public IActionResult MileStoneBoard(string ProjectId, string HubId)
        {
            MyMilestone myMilestone = new MyMilestone();

            string UserName = HttpContext.Session.GetString("UserName");
            int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));

            if (ProjectId != null && HubId != null)
            {
                HttpContext.Session.SetString("projectId", ProjectId);
                HttpContext.Session.SetString("HubId", HubId);
            }
            if (ProjectId == null && HubId == null)
            {
                HubId = HttpContext.Session.GetString("HubId");
                ProjectId = HttpContext.Session.GetString("projectId");
            }

            var result = _masterRepository.GetMyMileStoneSearchedData(HubId, ProjectId, RoleId, UserName);

            myMilestone.ProjectHeaders = JsonConvert.SerializeObject(result.Header);
            myMilestone.ProjectMyMilestoneDetails = JsonConvert.SerializeObject(result.Details);

            return View(myMilestone);
        }

        public IActionResult CheckMilestoneCanBeCompleted(int ProjectId, int SlNo, int Hub)
        {
            var result = _masterRepository.Checkingdependedmilestonestaus(ProjectId, SlNo, Hub).ToList();
            return Json(result);
        }

        public IActionResult GetMilestoneRevisedDates(int ProjectId, int SlNo, string PMUVersion, string StartDate, string EndDate, int Hub, string SortedOrder)
        {
            var revisedDates = _masterRepository.GetMilestoneRevisedDates(ProjectId, SlNo, PMUVersion, StartDate, EndDate, Hub, SortedOrder);
            return Ok(revisedDates);
        }

        [HttpPost]
        public ActionResult New_EditPMUMapping(ProjectDetailsToSave milestone)
        {
            string UserName = HttpContext.Session.GetString("UserName");
            int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));

            var result = _masterRepository.UpdatePMUDetails(JsonConvert.SerializeObject(milestone), RoleId, UserName);

            if (result.ToString() == "Updated")
            {
                TempData["Message"] = "Updated Successfully";
                TempData["MessageClass"] = "alert-success";
            }
            return Json(result);
        }

        [HttpGet]
        public IActionResult ApprovalMilestoneList()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetUserRequestedEndDateList(string status)
        {
            string UserName = HttpContext.Session.GetString("UserName");
            string EmailId = HttpContext.Session.GetString("EmailId");
            int roleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            HttpContext.Session.SetString("SelectedStatus", status);
            var myMilestoneCards = _masterRepository.GetUserRequestedEndDateList(status, UserName, EmailId, roleId);
            return Ok(myMilestoneCards);
        }

        [EncryptedActionParameter]
        [HttpGet]
        public IActionResult ApprovalMilestoneBoard(string ProjectId, string HubId)
        {
            string UserName = HttpContext.Session.GetString("UserName");
            int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));

            MyMilestone myMilestone = new MyMilestone();
            var PrjId = Convert.ToInt32(ProjectId);
            var Hub = Convert.ToInt32(HubId);

            var result = _masterRepository.MyMilestoneApprovalDetail(PrjId, Hub, UserName, RoleId);
            myMilestone.JsonData = JsonConvert.SerializeObject(result);
            return View(myMilestone);
        }

        [HttpPost]
        public IActionResult DependentMilestoneList(int projectId, int slNo, string startDate, string pmuVersion, string endDate, int Hub, string SortedOrder)
        {
            var myMilestoneCards = _masterRepository.Get_DependentMyMilestone(projectId, slNo, startDate, pmuVersion, endDate, Hub, SortedOrder);
            return Ok(myMilestoneCards);
        }

        [HttpPost]
        public string ApproveMilestone(string projectId, string approvalRemarks, string hub, string sortedOrder)
        {
            if (approvalRemarks == null)
            {
                approvalRemarks = "";
            }
            HttpContext.Session.SetString("projectId", projectId);
            HttpContext.Session.SetString("ApprovalRemarks", approvalRemarks);
            HttpContext.Session.SetString("HubId", hub);
            HttpContext.Session.SetString("SortedOrder", sortedOrder);

            return "1";
        }

        [HttpPost]
        public string RejectMilestone(int extendId, string ApprovalRemarks)
        {

            var result = _masterRepository.ApproveOrRejectMilestone(extendId, HttpContext.Session.GetString("UserName"), ApprovalRemarks);

            if (result.ToString().ToLower().Contains("successfully"))
            {
                TempData["ARMMessage"] = result;
                TempData["ARMMessageClass"] = "alert-success";
            }
            return result;

        }

        [HttpGet]
        public IActionResult GetParticularTaskRemarksHistory(int projectId, int slNo, int hubId)
        {
            var milestoneList = _masterRepository.GetParticularTaskRemarksHistory(projectId, slNo, hubId);
            return Json(milestoneList);
        }
        #endregion


        #region Master
        [HttpGet]
        public IActionResult ProjectMaster()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ProjectList()
        {
            EPPMProjectMaster projectmaster = new EPPMProjectMaster();
            List<EPPMProjectMaster> fetchData = _masterRepository.Get_ProjectMasterList();
            projectmaster.StatusDropdown = _masterRepository.Get_ProjectStatusMasterList();
            for (int index = 0; index < fetchData.Count; index++)
            {
                fetchData[index].StatusDropdown = projectmaster.StatusDropdown;
            }
            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(fetchData);
            return Json(jsonData);
        }

        [EncryptedActionParameter]
        public IActionResult UpdateProjectMaster(string ProjectId, string Status, string IsActive)
        {
            Common accept = _masterRepository.Update_ProjectStatus(Convert.ToInt32(ProjectId), Status, HttpContext.Session.GetString("UserName").ToString(), IsActive);
            TempData["Message"] = accept.OutMessage;
            TempData["MessageStyle"] = accept.StyleClass;
            return RedirectToAction("ProjectMaster", "ProjectTracker");
        }

        [HttpGet]
        public IActionResult GetProjectMasterExcelSummaryData()
        {
            EPPMProjectMaster projectmaster = new EPPMProjectMaster();
            List<EPPMProjectMaster> fetchData = _masterRepository.Get_ProjectMasterList();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("ProjectMasterExcel");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Project Code";
                worksheet.Cell(currentRow, 2).Value = "Project Name";
                worksheet.Cell(currentRow, 3).Value = "Project Division";
                worksheet.Cell(currentRow, 4).Value = "Project Type";
                worksheet.Cell(currentRow, 5).Value = "HUB Name";
                worksheet.Cell(currentRow, 6).Value = "Project Planning Status";
                worksheet.Cell(currentRow, 7).Value = "Project Start Date";
                worksheet.Cell(currentRow, 8).Value = "Project End Date";
                worksheet.Cell(currentRow, 9).Value = "Project Manager/Responsible";
                worksheet.Cell(currentRow, 10).Value = "Project Status";
                worksheet.Cell(currentRow, 11).Value = "IsActive";
                foreach (var item in fetchData)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.ProjectCode;
                    worksheet.Cell(currentRow, 2).Value = item.ProjectName;
                    worksheet.Cell(currentRow, 3).Value = item.Division;
                    worksheet.Cell(currentRow, 4).Value = item.Type;
                    worksheet.Cell(currentRow, 5).Value = item.HubName;
                    worksheet.Cell(currentRow, 6).Value = item.HubStatus;

                    if (item.HubStatus.ToLower() == "saved")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.DarkGoldenrod;
                    }
                    else if (item.HubStatus.ToLower() == "approved")
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.Green;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.Black;
                    }

                    worksheet.Cell(currentRow, 7).Value = item.ProjectStartDate;
                    worksheet.Cell(currentRow, 8).Value = item.ProjectEndDate;
                    worksheet.Cell(currentRow, 9).Value = item.Manager;
                    worksheet.Cell(currentRow, 10).Value = item.Status;

                    if (item.Status.ToLower() == "completed")
                    {
                        worksheet.Cell(currentRow, 10).Style.Font.FontColor = XLColor.Green;
                    }
                    else if (item.Status.ToLower() == "in progress")
                    {
                        worksheet.Cell(currentRow, 10).Style.Font.FontColor = XLColor.LightSkyBlue;
                    }
                    else if (item.Status.ToLower() == "planning")
                    {
                        worksheet.Cell(currentRow, 10).Style.Font.FontColor = XLColor.DarkGoldenrod;
                    }
                    else if (item.Status.ToLower() == "locked")
                    {
                        worksheet.Cell(currentRow, 10).Style.Font.FontColor = XLColor.Red;
                    }

                    worksheet.Cell(currentRow, 11).Value = item.IsActive;

                    if (item.IsActive.ToLower() == "active")
                    {
                        worksheet.Cell(currentRow, 11).Style.Font.FontColor = XLColor.Green;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 11).Style.Font.FontColor = XLColor.Red;
                    }
                }
                worksheet.Column("1").Width = 10;
                worksheet.Column("2").Width = 10;
                worksheet.Column("3").Width = 20;
                worksheet.Column("4").Width = 20;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 10;
                worksheet.Column("7").Width = 15;
                worksheet.Column("8").Width = 15;
                worksheet.Column("9").Width = 20;
                worksheet.Column("10").Width = 15;
                worksheet.Column("11").Width = 15;

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "ProjectMaster.xlsx");
                }
            }
        }

        #endregion


        #region PMUmappings
        [EncryptedActionParameter]
        [HttpGet]
        public IActionResult PMUMappings(string SlNo = "", string StartDate = "", string EndDate = "", string PMUVersion = "")
        {
            PMUMapping pmumapping = new PMUMapping();

            pmumapping.ProjectId = Convert.ToInt32(HttpContext.Session.GetString("projectId"));
            pmumapping.HubId = Convert.ToInt32(HttpContext.Session.GetString("HubId"));
            pmumapping.MappedprojectList = _masterRepository.GetMappedProjects();
            pmumapping.MappedhubList = _masterRepository.GetMappedHubs(0);

            if (PMUVersion != "")
            {
                pmumapping.ApprovalStartDate = StartDate;
                pmumapping.ApprovalEndDate = EndDate;
                pmumapping.ApprovalVersion = PMUVersion;
                pmumapping.ApprovalSlNo = SlNo;
            }

            return View(pmumapping);
        }

        [HttpPost]
        public IActionResult PV_PMUmappingTable(PMUMapping pMUMapping)
        {

            int ProjectId = Convert.ToInt32(HttpContext.Session.GetString("projectId"));
            int HubId = Convert.ToInt32(HttpContext.Session.GetString("HubId"));

            if(ProjectId != pMUMapping.ProjectId || HubId != pMUMapping.HubId)
            {
                pMUMapping.CurrentSelectedVersion = "";
                pMUMapping.CurrentSelectedVersion = pMUMapping.CurrentSelectedVersion == null ? "" : pMUMapping.CurrentSelectedVersion;
            }

            HttpContext.Session.SetString("projectName", pMUMapping.ProjectName);
            HttpContext.Session.SetString("projectId", Convert.ToString(pMUMapping.ProjectId));
            HttpContext.Session.SetString("HubId", Convert.ToString(pMUMapping.HubId));
            HttpContext.Session.SetString("HubName", Convert.ToString(pMUMapping.HubName));

            var projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(RoleId), LoginId);
            var result = _masterRepository.PMUMappings_GetList
                (
                    pMUMapping.ProjectId, pMUMapping.IsFromTemplate, pMUMapping.CurrentSelectedVersion, pMUMapping.HubId, pMUMapping.Template_Id,
                    pMUMapping.IsScopeChanged, pMUMapping.IsCloneAccepted
                );

            HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));
            HttpContext.Session.SetString("IsWeekEndExclude", Convert.ToString(result.IsWeekendExculded));
            HttpContext.Session.SetString("IsKPIIncluded", Convert.ToString(result.IsKPIIncluded));

            if (pMUMapping.ApprovalSlNo == null || pMUMapping.ApprovalSlNo == "")
            {
                result.RevisedRequestData = "";
                HttpContext.Session.SetString("ApprovalRemarks", "");
                HttpContext.Session.SetString("SortedOrder", "");
            }
            else
            {
                var revisedRequestedDates = _masterRepository.GetRevisedDates_AllRequestData
                    (pMUMapping.ProjectId, Convert.ToInt32(pMUMapping.ApprovalSlNo), pMUMapping.ApprovalVersion,
                    pMUMapping.ApprovalStartDate, pMUMapping.ApprovalEndDate, pMUMapping.HubId, HttpContext.Session.GetString("SortedOrder"));
                result.RevisedRequestData = JsonConvert.SerializeObject(revisedRequestedDates);
            }

            return PartialView(result);
        }

        [HttpPost]
        public IActionResult GetPMUDataToCompare(int projectId, string CurrentSelectedVersion, int HubId)
        {
            var result = _masterRepository.PMUMappings_GetList(projectId, false, CurrentSelectedVersion, HubId, 0);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CheckForApproval(int projectId, int HubId)
        {
            var result = _masterRepository.CheckForApproval(projectId, HubId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CheckForScopeChange(int projectId, int HubId)
        {
            var result = _masterRepository.CheckForScopeChange(projectId, HubId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult DropdownList()
        {
            var list = _masterRepository.PMUMappings_DropdownList();
            return Ok(new { WBSHeader = list.Item1, Task = list.Item2, Resources = list.Item3, Template = list.Item4 });
        }

        [HttpPost]
        public IActionResult SavePMUMappings()
        {
            var files = Request.Form.Files;
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string[] fileDetails = file.Name.Split("_");
                    var fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads", fileDetails[0], fileDetails[1]);
                    if (!Directory.Exists(fileDirectory))
                        Directory.CreateDirectory(fileDirectory);
                    var extension = Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(fileDirectory, file.Name + file.FileName).Replace(" ", " ");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }

            var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
            var Documents = Convert.ToString(Request.Form["Documents"]);
            var Remarks = Convert.ToString(Request.Form["Remarks"]);
            var LatestVersion = Convert.ToString(Request.Form["LatestVersion"]);
            var LatestVersionGroup = Convert.ToString(Request.Form["LatestVersionGroup"]);
            var PreviousVersion = Convert.ToString(Request.Form["PreviousVersion"]);
            var PreviousVersionGroup = Convert.ToString(Request.Form["PreviousVersionGroup"]);
            var isLatest = Convert.ToBoolean(Request.Form["IsLatest"]);
            var projectId = Convert.ToInt32(Request.Form["ProjectId"]);
            var hubId = Convert.ToInt32(Request.Form["HubId"]);
            var IsWeekendExcluded = Convert.ToBoolean(Request.Form["IsWeekendExcluded"]);
            var IsKPIIncluded = Convert.ToBoolean(Request.Form["IsKPIIncluded"]);
            var ExtendedId = Convert.ToInt32(Request.Form["ExtendedId"]);
            var ApprovalRemarks = HttpContext.Session.GetString("ApprovalRemarks");
            var IsCloneAcceptedForProject = Convert.ToInt32(Request.Form["IsCloneAcceptedForProject"]);
            var saveAppRemarks = Convert.ToString(Request.Form["saveAppRemarks"]);
            var isSaveAppRemarks = Convert.ToInt32(Request.Form["isSaveAppRemarks"]);

            var result = _masterRepository.SavePMUMappings(
                    jsonObject, Documents, Remarks, HttpContext.Session.GetString("UserName"),
                    LatestVersion, LatestVersionGroup, PreviousVersion, PreviousVersionGroup,
                    isLatest, projectId, IsWeekendExcluded, IsKPIIncluded,
                    hubId, ExtendedId, ApprovalRemarks, IsCloneAcceptedForProject, saveAppRemarks, isSaveAppRemarks
                );

            var projectlist = _masterRepository.Get_ProjectList(
                    Convert.ToInt32(HttpContext.Session.GetString("RoleId")),
                    HttpContext.Session.GetString("UserName")
                );
            HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));
            if (result.ToLower().Contains("success"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";
            }
            return Ok(result);
        }

        [HttpPost]
        public IActionResult SaveNewWBSHeaderTask(string newData, string type, bool kpitask)
        {
            var UserName = HttpContext.Session.GetString("UserName");
            var result = _masterRepository.SaveNewWBSHeaderTask(newData, type, kpitask, UserName);
            return Ok(new { result.Item1, result.Item2 });
        }

        [HttpPost]
        public IActionResult DeleteWBSHeaderTask(int deleteId, string type)
        {
            var UserName = HttpContext.Session.GetString("UserName");
            var result = _masterRepository.DeleteWBSHeaderTask(deleteId, type, UserName);
            return Ok(new { result });
        }

        [HttpPost]
        public IActionResult SaveNewTemplate()
        {
            var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
            var TemplateName = Convert.ToString(Request.Form["TemplateName"]);
            var result = _masterRepository.SavePMUMappingsNewTemplate(jsonObject, TemplateName, HttpContext.Session.GetString("UserName"));
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AutoSavePMUMappings()
        {
            var files = Request.Form.Files;
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string[] fileDetails = file.Name.Split("_");
                    var fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads", fileDetails[0], fileDetails[1]);
                    if (!Directory.Exists(fileDirectory))
                        Directory.CreateDirectory(fileDirectory);
                    var extension = Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(fileDirectory, file.Name + file.FileName).Replace(" ", " ");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }

            var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
            var Documents = Convert.ToString(Request.Form["Documents"]);
            var Remarks = Convert.ToString(Request.Form["Remarks"]);
            var projectId = Convert.ToInt32(Request.Form["ProjectId"]);
            var hubId = Convert.ToInt32(Request.Form["HubId"]);
            var IsWeekendExcluded = Convert.ToBoolean(Request.Form["IsWeekendExcluded"]);
            var IsKPIIncluded = Convert.ToBoolean(Request.Form["IsKPIIncluded"]);
            var LatestVersion = Convert.ToString(Request.Form["LatestVersion"]);
            var LatestVersionGroup = Convert.ToString(Request.Form["LatestVersionGroup"]);
            var IsCloneAcceptedForProject = Convert.ToInt32(Request.Form["IsCloneAcceptedForProject"]);

            var result = _masterRepository.AutoSavePMUMappings(
                    jsonObject, Documents, Remarks, HttpContext.Session.GetString("UserName"),
                    projectId, IsWeekendExcluded, IsKPIIncluded, hubId, LatestVersion, LatestVersionGroup, IsCloneAcceptedForProject
            );

            return Ok(result);
        }

        [HttpPost]
        public IActionResult SaveNotes(int HubId, int ProjectId, string Notes)
        {
            var result = _masterRepository.AddNotes(HubId, ProjectId, Notes, HttpContext.Session.GetString("UserName"));
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetNotes(int HubId, int ProjectId)
        {
            var result = _masterRepository.GetNotes(HubId, ProjectId);
            return Ok(result);
        }

        [HttpGet]
        public JsonResult GetNewPMUMappingsHubData(int ProjectId)
        {
            var result = _masterRepository.GetMappedHubs(ProjectId);
            var data = result.GroupBy(test => test.Value)
                   .Select(grp => grp.First())
                   .ToList().Distinct();
            return Json(data, new System.Text.Json.JsonSerializerOptions());
        }

        [HttpPost]
        public IActionResult PV_PMUMappingTableClone(
            int CloneFromProjectId, int CloneFromHubId, string CloneFromProjectName, string CloneFromHubName,
            int ProjectId, int HubId,string Version,int IsResourceRequired, int IsScopeChange, int IsCloneAccepted, int IsEmptyTable,int IsFromAutoClone,
            string ApprovedLatestVersion, string ApprovedLatestVersionGroup, string CurrentWorkingVersion
        )
        {
            var result = new NewPMUMappings();

            if (IsEmptyTable == 0)
            {
                result = _masterRepository.PMUMappingsClone_GetList(
                    CloneFromProjectId, CloneFromHubId,
                    ProjectId,HubId,Version, IsResourceRequired,
                    IsScopeChange, IsCloneAccepted
                );

                result.ApprovedLatestVersion = ApprovedLatestVersion;
                result.ApprovedLatestVersionGroup = ApprovedLatestVersionGroup;
                result.CurrentWorkingVersion = CurrentWorkingVersion;

                HttpContext.Session.SetString("IsWeekEndExclude", Convert.ToString(result.IsWeekendExculded));

                // We are not setting or taking the flag ( IsKPIIncluded ) since is not required on cloning.
                // Only on scope change we are taking and setting the kpi value in session
                if (IsScopeChange == 1 && IsCloneAccepted == 0)
                {
                    HttpContext.Session.SetString("IsKPIIncluded", Convert.ToString(result.IsKPIIncluded));
                }
            }
            // if need to load empty grid then
            else
            {
                result.ApprovedLatestVersion = "";
                result.ApprovedLatestVersionGroup = "";
                result.CurrentWorkingVersion = "";
                result.PMUMappingDetails = [];
                result.RemarkDetails = [];
                result.DocumentDetails = [];
                result.PMUVersionList = _masterRepository.GetPMUMappingVersion(ProjectId, HubId, IsScopeChange, IsCloneAccepted);
                result.IsKPIIncluded = true;

                // since we are loading a empty table week end will be included (flase which will be by default) and kpi will be yes (true)
                HttpContext.Session.SetString("IsWeekEndExclude", Convert.ToString(result.IsWeekendExculded));
                HttpContext.Session.SetString("IsKPIIncluded", Convert.ToString(result.IsKPIIncluded));
            }

            if (IsScopeChange == 1 && IsCloneAccepted == 0 && IsFromAutoClone == 1)
            {
                HttpContext.Session.SetString("projectName", CloneFromProjectName);
                HttpContext.Session.SetString("projectId", Convert.ToString(CloneFromProjectId));
                HttpContext.Session.SetString("HubId", Convert.ToString(CloneFromHubId));
                HttpContext.Session.SetString("HubName", Convert.ToString(CloneFromHubName));
            }
            return PartialView(result);
        }

        [HttpGet]
        public IActionResult GetProjectBasedOnAction(string Type)
        {
            var projectlist = _masterRepository.Get_ProjectListBasedOnAction(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName"), Type);
            return Ok(projectlist);
        }

        [HttpGet]
        public IActionResult GetPMUExcelSummaryData(int ProjectId, string projectName, int HubId, string hubName, string Version)
        {

            NewPMUMappings newPMUMappings = new NewPMUMappings();
            newPMUMappings = _masterRepository.PMUMappings_GetList(ProjectId, false, Version, HubId, 0);
            var fileName = projectName + "_" + hubName + ".xlsx";
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("PMUMappingsExcel");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Sl.No";
                worksheet.Cell(currentRow, 2).Value = "Slack";
                worksheet.Cell(currentRow, 3).Value = "WBS Header";
                worksheet.Cell(currentRow, 4).Value = "Task";
                worksheet.Cell(currentRow, 5).Value = "Dependency";
                worksheet.Cell(currentRow, 6).Value = "Duration";
                worksheet.Cell(currentRow, 7).Value = "Start Date";
                worksheet.Cell(currentRow, 8).Value = "End Date";
                worksheet.Cell(currentRow, 9).Value = "Percentage";
                worksheet.Cell(currentRow, 10).Value = "Resources";
                worksheet.Cell(currentRow, 11).Value = "File";
                worksheet.Cell(currentRow, 12).Value = "Remarks";
                foreach (var item in newPMUMappings.PMUMappingDetails)
                {
                    currentRow++;

                    worksheet.Cell(currentRow, 1).Value = item.SlNo;
                    if (item.IsCritical == "1")
                    {
                        worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    worksheet.Cell(currentRow, 2).Value = item.Slack;
                    worksheet.Cell(currentRow, 3).Value = item.WBSHeader;
                    worksheet.Cell(currentRow, 4).Value = item.Task;
                    if (item.IsKPI == true && item.IsKPIIncluded)
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.Blue;
                    }
                    worksheet.Cell(currentRow, 5).Value = item.Dependency;
                    worksheet.Cell(currentRow, 6).Value = item.Duration;
                    worksheet.Cell(currentRow, 7).Value = item.StartDate;
                    worksheet.Cell(currentRow, 8).Value = item.EndDate;
                    worksheet.Cell(currentRow, 9).Value = item.TaskPercentage;
                    worksheet.Cell(currentRow, 10).Value = item.Resources;

                    var remarksData = newPMUMappings.DocumentDetails.Where(m => m.SlNo == item.SlNo).ToList();
                    var remarksValue = remarksData.Count() > 0 ? "Yes" : "";
                    worksheet.Cell(currentRow, 11).Value = remarksValue;

                    var filesData = newPMUMappings.RemarkDetails.Where(m => m.SlNo == item.SlNo).ToList();
                    var filesValue = filesData.Count() > 0 ? "Yes" : "";
                    worksheet.Cell(currentRow, 12).Value = filesValue;
                }
                worksheet.Column("1").Width = 10;
                worksheet.Column("2").Width = 10;
                worksheet.Column("3").Width = 40;
                worksheet.Column("4").Width = 40;
                worksheet.Column("5").Width = 15;
                worksheet.Column("6").Width = 10;
                worksheet.Column("7").Width = 15;
                worksheet.Column("8").Width = 15;
                worksheet.Column("9").Width = 15;
                worksheet.Column("10").Width = 30;
                worksheet.Column("11").Width = 15;
                worksheet.Column("12").Width = 15;

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

        [HttpPost]
        public JsonResult PMUmappingData(int ProjectId, int Hub, string PMUVersion)
        {
            var result = _masterRepository.PMUMappingsData(ProjectId, Hub, PMUVersion);
            return Json(result);
        }

        public IActionResult SavePreviousVersionPath()
        {
            var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
            var pMUVersion = Convert.ToString(Request.Form["PMUVersion"]);
            var projectId = Convert.ToInt32(Request.Form["ProjectId"]);
            var hubId = Convert.ToInt32(Request.Form["HubId"]);

            var result = _masterRepository.SavePreviousVersionPath(
                    jsonObject, HttpContext.Session.GetString("UserName"), pMUVersion, projectId, hubId);
            return Ok(result);
        }
        #endregion

    }
}