﻿using Ideation.Common;
using Ideation.Core;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.PowerBI.Api.Models;
using Microsoft.PowerBI.Api;
using Microsoft.Rest;
using Newtonsoft.Json.Linq;
using System.Text;

namespace Ideation.Controllers
{
    public class KPIDBReportController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ICommonRepository _commonRepository;
        private readonly string WorkSpaceId;
        private readonly string BIReportId;
        private readonly string EmbedUrlBase;
        private readonly string UserName;
        private readonly string Password;
        private readonly string ApplicationId;
        private readonly string ApplicationSecret;
        private readonly string AuthorityUrl;
        private readonly string ResourceUrl;
        private readonly string ApiUrl;
        private readonly string ProjectWorkspaceId;
        private readonly string ProjectReportId;

        public KPIDBReportController(IConfiguration configuration, ICommonRepository commonRepository)
        {
            _configuration = configuration;
            _commonRepository = commonRepository;
            WorkSpaceId = _configuration.GetValue<string>("PowerBI1:WorkspaceId");
            BIReportId = _configuration.GetValue<string>("PowerBI1:ReportId");
            EmbedUrlBase = _configuration.GetValue<string>("PowerBI1:EmbedUrlBase");
            UserName = _configuration.GetValue<string>("PowerBI1:UserName");
            Password = _configuration.GetValue<string>("PowerBI1:Password");
            ApplicationId = _configuration.GetValue<string>("PowerBI1:ApplicationId");
            ApplicationSecret = _configuration.GetValue<string>("PowerBI1:ApplicationSecret");
            AuthorityUrl = _configuration.GetValue<string>("PowerBI1:AuthorityUrl");
            ResourceUrl = _configuration.GetValue<string>("PowerBI1:ResourceUrl");
            ApiUrl = _configuration.GetValue<string>("PowerBI1:ApiUrl");
            ProjectWorkspaceId = _configuration.GetValue<string>("PowerBI1:KPIWorkSpaceId");
            ProjectReportId = _configuration.GetValue<string>("PowerBI1:KPIReportId");
        }
        [EncryptedActionParameter]
        public async Task<IActionResult> KPIDashboardReport()
        {

            PowerBISettings data = new PowerBISettings
            {
                WorkspaceId = new Guid(ProjectWorkspaceId),
                ReportId = new Guid(ProjectReportId),
                EmbedUrlBase = EmbedUrlBase,
                UserName = UserName,
                Password = Password,
                ApplicationId = new Guid(ApplicationId),
                ApplicationSecret = ApplicationSecret,
                AuthorityUrl = AuthorityUrl,
                ResourceUrl = ResourceUrl,
                ApiUrl = ApiUrl
            };
            var result = new EmbedConfig { Username = data.UserName };
            var accessToken = await GetPowerBIAccessToken(data);
            var tokenCredentials = new TokenCredentials(accessToken, "Bearer");
            using (var client = new PowerBIClient(new Uri(data.ApiUrl), tokenCredentials))
            {
                var workspaceId = new Guid(ProjectWorkspaceId);
                var reportId = new Guid(ProjectReportId);
                var logresponse = SavePowerBILogsInfo(Convert.ToString(reportId), "KPI Dashboard Report");
                var report = await client.Reports.GetReportInGroupAsync(workspaceId, reportId);
                var generateTokenRequestParameters = new GenerateTokenRequest(accessLevel: "view");
                var tokenResponse = await client.Reports.GenerateTokenAsync(workspaceId, reportId, generateTokenRequestParameters);
                result.EmbedToken = tokenResponse;
                result.EmbedUrl = report.EmbedUrl;
                result.Id = Convert.ToString(report.Id);
                return View(result);
            }
        }

        private async Task<string> GetPowerBIAccessToken(PowerBISettings Data)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var form = new Dictionary<string, string>();
                    form["grant_type"] = "password";
                    form["resource"] = Data.ResourceUrl;
                    form["username"] = Data.UserName;
                    form["password"] = Data.Password;
                    form["client_id"] = Data.ApplicationId.ToString();
                    form["client_secret"] = Data.ApplicationSecret;
                    form["scope"] = "openid";
                    client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded");
                    using (var formContent = new FormUrlEncodedContent(form))
                    using (var response = await client.PostAsync(Data.AuthorityUrl, formContent))
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
            catch (Exception ex)
            {
                throw ex;
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
