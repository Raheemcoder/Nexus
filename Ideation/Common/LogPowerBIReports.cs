using Ideation.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace Ideation.Common
{
    public class LogPowerBIReports
    {
        public static string SavePowerBILogs(string reportId, string reportName, string url, string loginId, string appName, string headerToken)
        {
            var result = "";
            try
            {
                var apiURL = url;

                var data = new
                {
                    BIReportId = reportId,
                    ReportName = reportName,
                    LoginId = loginId,
                    ApplicationName = appName,
                };

                System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", headerToken);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                var response = client.PostAsync(new Uri(apiURL), content).Result;

                if (response.IsSuccessStatusCode)
                {
                    result = Convert.ToString(response);
                }
                else
                {
                    result = $"Error: {response.StatusCode} - {response.ReasonPhrase}";
                }
            }
            catch (Exception ex)
            {
                result = $"Error: {ex.Message}\nStackTrace: {ex.StackTrace}";
            }
            return result;

        }
    }
}