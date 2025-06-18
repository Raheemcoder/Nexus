using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.InkML;
using Ideation.Common;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using SelectListItem = System.Web.Mvc.SelectListItem;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class GanttChartController : Controller
    {

        #region Constructor
        private readonly IEPPMMasterRepository _masterRepository;
        private readonly IGanttChartRepository _ganttChartRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IConfiguration _configuration;
        public GanttChartController(IEPPMMasterRepository masterRepository, IGanttChartRepository ganttChartRepository, IConfiguration configuration,
            ICommonRepository commonRepository)
        {
            this._masterRepository = masterRepository;
            this._ganttChartRepository = ganttChartRepository;
            this._configuration = configuration;
            this._commonRepository = commonRepository;
        }
        #endregion

        public ActionResult GanttChart()
        {
            PMUMapping p = new PMUMapping();
            var getProjectList = _masterRepository.Get_ProjecVersiontList(HttpContext.Session.GetString("projectId").ToString());
            p.ProjectVersionList = getProjectList.Select(m => new SelectListItem { Value = m.VersionId.ToString(), Text = m.Version });
            return View(p);
        }

        public ActionResult GanttCharts(int projectId)
        {
            PMUMapping p = new PMUMapping();
            p.ProjectId = projectId;
            var getProjectList = _masterRepository.Get_ProjecVersiontList(projectId.ToString());
            p.ProjectVersionList = getProjectList.Select(m => new SelectListItem { Value = m.VersionId.ToString(), Text = m.Version });
            return Json(getProjectList);
        }

        public ActionResult GetDetails(int projectId, int VersionId)
        {
            PMUMapping p = new PMUMapping();
            p.ProjectId = projectId;
            var getProjectList = _masterRepository.Get_ProjecVersiontList(projectId.ToString());
            p.ProjectVersionList = getProjectList.Select(m => new SelectListItem { Value = m.VersionId.ToString(), Text = m.Version });
            p.PMUMappingList = _ganttChartRepository.Get_GanttChart(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), Convert.ToInt32(HttpContext.Session.GetString("UserId")), projectId, VersionId);
            return PartialView(p);
        }

        [HttpGet]
        public JsonResult GetPMUMappingHistory(int projectId, int SlNo, int HubId, string Version, int WBSHeaderId = 0, int TaskId = 0)
        {
            var data = _ganttChartRepository.Get_HistoryList(SlNo, projectId, HubId, Version, WBSHeaderId, TaskId).ToList();
            return Json(data);
        }

        public JsonResult GetProjectHistory(int projectId)
        {
            var data = _ganttChartRepository.Get_ProjectHistoryList(projectId).ToList();
            return Json(data);
        }

        // Both methods is for Project tracker and Project Update Gann chart
        [EncryptedActionParameter]
        public async Task<ActionResult> Index(string projectId, string projectCode, [FromServices] PowerBISettings powerBISettings, string isFromPu = "No", string ProjectName = "", string Hub = "")
        {
            try
            {
                Guid workspaceId;
                Guid reportId;
                var result = new EmbedConfig { Username = powerBISettings.UserName };
                var accessToken = await GetPowerBIAccessToken(powerBISettings);
                var tokenCredentials = new TokenCredentials(accessToken, "Bearer");

                if (projectId == null)
                {
                    projectId = HttpContext.Session.GetString("projectId");
                }
                if (!string.IsNullOrEmpty(projectId))
                {
                    HttpContext.Session.SetString("projectId", projectId ?? "");
                    HttpContext.Session.SetString("ProjectCode", projectCode ?? "");
                }

                if (string.IsNullOrEmpty(Hub))
                {
                    Hub = HttpContext.Session.GetString("HubId");
                }
                if (!string.IsNullOrEmpty(Hub))
                {
                    HttpContext.Session.SetString("HubId", Hub ?? "");
                }

                using (var client = new PowerBIClient(new Uri(powerBISettings.ApiUrl), tokenCredentials))
                {
                    if (powerBISettings.Environment == "UAT")
                    {
                        workspaceId = powerBISettings.WorkSpace_UAT;
                        reportId = powerBISettings.ReportId_UAT;
                    }
                    else
                    {
                        workspaceId = powerBISettings.WorkspaceId;
                        reportId = powerBISettings.ReportId;
                    }

                    var logresponse = SavePowerBILogsInfo(Convert.ToString(reportId), "Project Tracker Gantt Chart Report");

                    var report = await client.Reports.GetReportInGroupAsync(workspaceId, reportId);

                    GenerateTokenRequest generateTokenRequestParameters;

                    generateTokenRequestParameters = new GenerateTokenRequest(accessLevel: "view");

                    var tokenResponse = await client.Reports.GenerateTokenAsync(workspaceId, reportId, generateTokenRequestParameters);

                    result.EmbedToken = tokenResponse;
                    result.EmbedUrl = report.EmbedUrl;
                    result.Id = Convert.ToString(report.Id);
                    result.isFromPu = isFromPu;
                    result.ProjectCode = projectCode;
                    result.ProjectId = projectId;
                    result.ProjectName = ProjectName;
                    result.Hub = Hub;
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
        [NonAction]
        public string SavePowerBILogsInfo(string reportId, string reportName)
        {
            var apiUrl = _configuration["PowerBILogs:LogAPIUrl"];
            var appName = _configuration["PowerBILogs:LogApplicationName"];
            var userName = _configuration["PowerBILogs:LogUserName"];
            var password = _configuration["PowerBILogs:LogPassword"];
            var userId = HttpContext.Session.GetString("UserName");

            var credentials = $"{userName}:{password}";
            var base64Credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));

            var result = LogPowerBIReports.SavePowerBILogs(reportId, reportName, apiUrl, userId, appName, base64Credentials);
            var msg = _commonRepository.SavePowerBILogsInformation(reportId, reportName, userId, appName);

            return result;
        }
    }
}