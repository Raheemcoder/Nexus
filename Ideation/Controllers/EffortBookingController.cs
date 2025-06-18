using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using iText.StyledXmlParser.Jsoup.Select;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Bcpg;
using System.Globalization;
using System.Web.WebPages;
using static Ideation.Models.MMProject;

namespace Ideation.Controllers
{
    public class EffortBookingController : BaseController
    {
        IEffortRepository effortRepository;
        IApproveRepository approveRepository;
        IApportionRepository apportionRepository;
        public EffortBookingController(IEffortRepository effortRepository, IApportionRepository apportionRepository, IApproveRepository approveRepository) : base()
        {
            this.effortRepository = effortRepository;
            this.approveRepository = approveRepository;
            this.apportionRepository = apportionRepository;
        }

        [EncryptedActionParameter]
        public IActionResult EffortBooking(string StartDate, string EndDate)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;

            EffortTracker effort = new EffortTracker();

            DateTime now = DateTime.Now;
            CultureInfo culture = CultureInfo.CurrentCulture;
            DayOfWeek firstDayOfWeek = culture.DateTimeFormat.FirstDayOfWeek;
            DateTime firstDay = now.AddDays(-(int)now.DayOfWeek);
            DateTime lastDay = now.AddDays(-(int)now.DayOfWeek + 5 + (int)firstDayOfWeek);
            if (!string.IsNullOrEmpty(StartDate))
            {
                firstDay = DateTime.ParseExact(StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            if (!string.IsNullOrEmpty(StartDate))
            {
                lastDay = DateTime.ParseExact(EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            effort.MonthlyEfforts = effortRepository.GetMonthlyEfforts(UserId, firstDay);

            var effortsList = effortRepository.GetWeekData(UserId, firstDay, lastDay);
            effort.WeeklyEfforts = effortsList.Item1;
            effort.WeeklyApportionEfforts = effortsList.Item2;
            effort.Remarks = effortsList.Item4.Count() == 0 ? "" : effortsList.Item4.ToList()[0].Remarks;
            effort.Status = effortsList.Item4.Count() == 0 ? "" : effortsList.Item4.ToList()[0].Status;
            effort.ProjectList = effortRepository.GetProjectList(UserId);

            var Leaves_Holidays = effortRepository.GetLeaves_HolidaysList(UserId);
            effort.HolidaysList = JsonConvert.SerializeObject(Leaves_Holidays.Item1);
            effort.LeavesList = JsonConvert.SerializeObject(Leaves_Holidays.Item2);
            effort.UserName = UserId;
            effort.WeekPickerHidden = firstDay.ToString("dd/MM/yyyy").Replace("-", "/");

            var checkManager = approveRepository.GetManagerRole(UserId);
            HttpContext.Session.SetString("checkManager", checkManager);

            return View(effort);
        }

        [EncryptedActionParameter]
        public IActionResult MyProjects()
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            return View();
        }

        public JsonResult GetMyProjectList()
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = effortRepository.GetMyProjects(UserId);
            return Json(result);

        }

        [EncryptedActionParameter]
        public IActionResult ProjectResourceMaster()
        {
            EffortTracker ET = new EffortTracker();
            var result = effortRepository.Get_ProjectMasterResourceData("", "", "No");
            ET.JsonFormProjectsDetails = JsonConvert.SerializeObject(result);
            ET.ResourceList = result.Select(p => p.ResourceName).Distinct().Select(p => new SelectListItem { Text = p, Value = p, Selected = true });
            ET.ProjectDataList = result.Select(p => p.ProjectCode + "-" + p.ProjectDescription).Distinct().Select(p => new SelectListItem { Text = p, Value = p.Split('-')[0] + "-" + p.Split('-')[1], Selected = true });
            return View(ET);
        }
        public JsonResult Get_ProjectResourceMasterData(string Projects, string Resources, string IsFiltered)
        {
            var result = effortRepository.Get_ProjectMasterResourceData(Projects, Resources, "Yes");
            return Json(result);
        }

        [EncryptedActionParameter]
        public IActionResult Apportion(string StartDate, string EndDate)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            Apportion apportion = new Apportion();

            apportion.TaskList = apportionRepository.GetTasksList().Select(m => new SelectListItem { Text = m.TaskName, Value = m.TaskId.ToString() });

            var lists = apportionRepository.GetAllList(UserId);

            apportion.DivisionList = lists.Item1.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionName.ToString(), Selected = true });
            apportion.ClassificationList = lists.Item2.Select(m => new SelectListItem { Text = m.ClassificationName, Value = m.ClassificationName.ToString(), Selected = true });
            apportion.ProjectTypeList = lists.Item3.Select(m => new SelectListItem { Text = m.ProjectTypeName, Value = m.ProjectTypeName.ToString(), Selected = true });
            apportion.RnDList = lists.Item4.Select(m => new SelectListItem { Text = m.RnDTeam, Value = m.RnDTeam.ToString(), Selected = true });

            DateTime now = DateTime.Now;
            CultureInfo culture = CultureInfo.CurrentCulture;
            DayOfWeek firstDayOfWeek = culture.DateTimeFormat.FirstDayOfWeek;
            DateTime firstDay = now.AddDays(-(int)now.DayOfWeek);
            DateTime lastDay = now.AddDays(-(int)now.DayOfWeek + 5 + (int)firstDayOfWeek);

            if (!string.IsNullOrEmpty(StartDate))
            {
                firstDay = DateTime.ParseExact(StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            if (!string.IsNullOrEmpty(StartDate))
            {
                lastDay = DateTime.ParseExact(EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            apportion.MonthlyEfforts = effortRepository.GetMonthlyEfforts(UserId, firstDay);
            var effortsList = effortRepository.GetWeekData(UserId, firstDay, lastDay);
            apportion.WeeklyEfforts = effortsList.Item1;
            apportion.TotalEfforts = effortsList.Item3;
            apportion.ProjectList = effortRepository.GetProjectList(UserId);
            apportion.SerializedWeekEfforts = JsonConvert.SerializeObject(apportion.TotalEfforts);

            var Leaves_Holidays = effortRepository.GetLeaves_HolidaysList(UserId);
            apportion.HolidaysList = JsonConvert.SerializeObject(Leaves_Holidays.Item1);
            apportion.LeavesList = JsonConvert.SerializeObject(Leaves_Holidays.Item2);

            apportion.WeekPickerHidden = firstDay.ToString("dd/MM/yyyy").Replace("-", "/");

            return View(apportion);
        }
        public IActionResult Apportion_test()
        {
            return View();
        }

        public IActionResult demo()
        {
            return View();
        }
        public JsonResult ProjectDropDown()
        {
            var ProjectList = effortRepository.GetProjectList(HttpContext.Session.GetString("UserName"));
            return Json(ProjectList);
        }
        public JsonResult SaveData(string EffortDetails, string DeletedDetais, string RemarksAddedProjectIds, string DeletedRemarksDetails)
        {
            var UserId = HttpContext.Session.GetString("UserName").ToLower() ?? string.Empty;

            var result = effortRepository.EffortBookingSave(UserId, EffortDetails, DeletedDetais, RemarksAddedProjectIds, DeletedRemarksDetails);
            if (result.Equals("Successfully Saved"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";
            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }

            return Json(result);
        }

        public JsonResult SaveApportionData(string EffortDetails, int TaskId, string Remarks, string Division = "", string Classification = "", string ProjectType = "", string RnD = "")
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;

            var result = apportionRepository.ApportionSave(UserId, EffortDetails, TaskId, Remarks, Division, Classification, ProjectType, RnD);
            if (result.Equals("Successfully Saved"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";
            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }

            return Json(result);
        }

        public void DeleteApportionData(int ApportionId, string StartDate, string EndDate)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            apportionRepository.DeleteApportionData(ApportionId, StartDate, EndDate, UserId);
        }

        public JsonResult ShowApportionData(int ApportionId)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var data = apportionRepository.ShowApportionData(ApportionId, UserId);
            return Json(data);
        }

        public JsonResult GetProjectList(string Division, string Classification, string ProjectType, string RnD, string IsFiltered)
        {
            var LoginId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var data = apportionRepository.GetProjectList(Division, Classification, ProjectType, RnD, IsFiltered, LoginId);
            return Json(data);
        }
        public JsonResult GetApportionViewData(string Year, string Month)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var data = apportionRepository.GetApportionDataViews(UserId, Year, Month);
            return Json(data);
        }

        [EncryptedActionParameter]
        public IActionResult Approve(string UserId, string StartDate, string EndDate, string EffortsDate, string isSearch)
        {
            Approve approve = new Approve();
            EffortTracker effort = new EffortTracker();
            DateTime now = DateTime.Now;

            CultureInfo culture = CultureInfo.CurrentCulture;
            DayOfWeek firstDayOfWeek = culture.DateTimeFormat.FirstDayOfWeek;
            DateTime firstDay = now.AddDays(-(int)now.DayOfWeek);
            DateTime lastDay = now.AddDays(-(int)now.DayOfWeek + 5 + (int)firstDayOfWeek);
            if (!string.IsNullOrEmpty(StartDate))
            {
                firstDay = Convert.ToDateTime(StartDate, culture);
            }

            if (!string.IsNullOrEmpty(StartDate))
            {
                firstDay = Convert.ToDateTime(StartDate, culture);
            }
            if (!string.IsNullOrEmpty(EffortsDate))
            {
                DateTime Effortdate = Convert.ToDateTime(EffortsDate, culture);
                approve.Effortdate = Effortdate.ToString("yyyy-MM-dd");
            }
            if (!string.IsNullOrEmpty(EndDate))
            {
                lastDay = Convert.ToDateTime(EndDate, culture);
            }

            if (UserId == null)
            {
                UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
                approve.WeeklyEfforts = approveRepository.GetWeekDataBasedOnManager(UserId, firstDay, lastDay);
            }
            else
            {
                approve.selectedUsers = UserId;
                approve.WeeklyEfforts = approveRepository.GetWeekDataBasedOnUser(UserId, firstDay, lastDay);
            }

            if (isSearch == "Searched")
            {
                approve.UserList = approveRepository.GetUserList(HttpContext.Session.GetString("UserName") ?? string.Empty);
                approve.UserListselect = approve.UserList.Select(m => new SelectListItem { Text = m.EmployeeName + "-" + m.EmpCode, Value = m.EmployeeId.ToString() });
                approve.UserName = UserId;
            }
            else
            {
                approve.UserList = approveRepository.GetUserList(UserId);
                approve.UserListselect = approve.UserList.Select(m => new SelectListItem { Text = m.EmployeeName + "-" + m.EmpCode, Value = m.EmployeeId.ToString(), Selected = true });
            }

            approve.ProjectList = effortRepository.GetProjectList(UserId);

            var WeeklyEffortsuser = approveRepository.GetWeekData_approval(UserId, firstDay, lastDay);
            approve.WeeklyEffortsuser = WeeklyEffortsuser.Item1;
            approve.WeeklyApportionEffortsforUser = WeeklyEffortsuser.Item2;
            approve.WeekPickerHidden = firstDay.ToString("dd/MM/yyyy").Replace("-", "/");

            return View(approve);
        }

        [HttpGet]
        public IActionResult Approve_PV(string UserId, string StartDate, string EndDate, string EffortsDate, string isSearch)
        {
            CultureInfo culture = CultureInfo.CurrentCulture;
            DateTime Effortdate = Convert.ToDateTime(EffortsDate, culture);
            DateTime firstDay = Convert.ToDateTime(StartDate, culture);
            DateTime lastDay = Convert.ToDateTime(EndDate, culture);

            Approve approve = new Approve();
            approve.ProjectList = effortRepository.GetProjectList(UserId);

            var WeeklyEffortsuser = approveRepository.GetWeekData_basedOnEfforts(UserId, firstDay, lastDay);

            approve.WeeklyEffortsuser = WeeklyEffortsuser.Item1;
            approve.WeeklyApportionEffortsforUser = WeeklyEffortsuser.Item2;

            return PartialView(approve);
        }

        public JsonResult SaveApproveData(string EffortDetails)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;

            var result = approveRepository.ApproveSave(EffortDetails, UserId);
            if (result.Equals("Successfully Approved"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";
            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }

            return Json(result);
        }

        public JsonResult SaveSendBackData(string EffortDetails)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = approveRepository.SaveSendBack(EffortDetails, UserId);
            if (result.Equals("Successfully Sended Back"))
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-success";
            }
            else
            {
                TempData["Message"] = result;
                TempData["MessageClass"] = "alert-danger";
            }
            return Json(result);
        }

        public async Task<ActionResult> EffortReport([FromServices] PowerBISettings powerBISettings)
        {
            try
            {
                var result = new EmbedConfig { Username = powerBISettings.UserName };
                var accessToken = await GetPowerBIAccessToken(powerBISettings);
                var tokenCredentials = new TokenCredentials(accessToken, "Bearer");
                ViewBag.LoginId = HttpContext.Session.GetString("UserName");

                using (var client = new PowerBIClient(new Uri(powerBISettings.ApiUrl), tokenCredentials))
                {
                    Guid workspaceId, reportId;
                    if (HttpContext.Session.GetString("checkManager").Equals("1"))
                    {
                        workspaceId = powerBISettings.EBMgrWorkspaceId;
                        reportId = powerBISettings.EBMgrReportId;
                    }
                    else
                    {
                        workspaceId = powerBISettings.EBUserWorkspaceId;
                        reportId = powerBISettings.EBUserReportId;
                    }

                    var report = await client.Reports.GetReportInGroupAsync(workspaceId, reportId);
                    GenerateTokenRequest generateTokenRequestParameters;
                    generateTokenRequestParameters = new GenerateTokenRequest(accessLevel: "view");
                    var tokenResponse = await client.Reports.GenerateTokenAsync(workspaceId, reportId, generateTokenRequestParameters);

                    result.EmbedToken = tokenResponse;
                    result.EmbedUrl = report.EmbedUrl;
                    result.Id = Convert.ToString(report.Id);
                }
                return View(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        private async Task<string> GetPowerBIAccessToken(PowerBISettings powerBISettings)
        {
            using (var client = new HttpClient())
            {
                var form = new Dictionary<string, string>();
                form["grant_type"] = "password";
                form["resource"] = powerBISettings.ResourceUrl;
                form["username"] = powerBISettings.UserName;
                form["password"] = powerBISettings.Password;
                form["client_id"] = powerBISettings.ApplicationId.ToString();
                form["client_secret"] = powerBISettings.ApplicationSecret;
                form["scope"] = "openid";

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded");

                using (var formContent = new FormUrlEncodedContent(form))
                using (var response = await client.PostAsync(powerBISettings.AuthorityUrl, formContent))
                {
                    var body = await response.Content.ReadAsStringAsync();
                    var jsonBody = JObject.Parse(body);

                    var errorToken = jsonBody.SelectToken("error");
                    if (errorToken != null)
                    {
                        throw new Exception(errorToken.Value<string>());
                    }

                    return jsonBody.SelectToken("access_token").Value<string>();
                }
            }
        }

        [HttpGet]
        public ActionResult ProjectRemarks()
        {
            EffortTracker effort = new EffortTracker();
            DateTime currentDate = DateTime.Now;
            DayOfWeek currentDayOfWeek = currentDate.DayOfWeek;

            int daysUntilStartOfWeek = (7 + (currentDayOfWeek - DayOfWeek.Sunday)) % 7;
            int daysUntilEndOfWeek = (7 + (DayOfWeek.Saturday - currentDayOfWeek)) % 7;
            if (daysUntilStartOfWeek == 0)
            {
                daysUntilStartOfWeek = 7;
            }
            DateTime weekStartDate = currentDate.AddDays(-daysUntilStartOfWeek);
            DateTime weekEndDate = currentDate.AddDays(daysUntilEndOfWeek);

            effort.FromDate = weekStartDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            effort.ToDate = weekEndDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            var fromdate = effort.FromDate;
            var todate = effort.ToDate;

            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var Projectid = "";
            var result = effortRepository.GetProjectReport_Details(Projectid, UserId, fromdate, todate);
            effort.ProjectRemarksData = JsonConvert.SerializeObject(result);
            effort.ProjectList = effortRepository.GetProjectList(UserId);
            effort.UserNamesList = effortRepository.GetAllUsernames(UserId);
            return View(effort);
        }
        public string GetProjectReport_Details(string Projectid, string FromDate, string Todate, string UserId)
        {
            var Jsonresult = "";
            if (string.IsNullOrEmpty(UserId))
            {
                if (string.IsNullOrEmpty(Projectid)) { Projectid = ""; }
                var User_Id = HttpContext.Session.GetString("UserName") ?? string.Empty;
                UserId = User_Id;
                var result = effortRepository.GetProjectReport_Details(Projectid, UserId, FromDate, Todate);
                Jsonresult = JsonConvert.SerializeObject(result);
            }
            else
            {
                var result = effortRepository.GetProjectReport_DetailsBasedOnSearch(Projectid, FromDate, Todate, UserId);
                Jsonresult = JsonConvert.SerializeObject(result);
            }
            return Jsonresult;
        }
        public string GetTaskDetails(string date, int task, string CreatedBy)
        {
            EffortTracker effort = new EffortTracker();
            var result = effortRepository.GetTask_details(date, task, CreatedBy);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }

        public JsonResult GetProjectRemarks(string ProjectId)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            var result = effortRepository.GetProjectRemarks(ProjectId, UserId);
            return Json(result);
        }

        public void SaveRemarksBasedOnProject(string ProjectId, string RemarksDate, string Remarks)
        {
            var UserId = HttpContext.Session.GetString("UserName") ?? string.Empty;
            effortRepository.SaveRemarksBasedOnProject(ProjectId, UserId, Remarks, RemarksDate);
        }
    }
}