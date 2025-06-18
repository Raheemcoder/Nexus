using log4net;
using log4net.Config;
using log4net.Repository;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using BudgetAllocation.Service.Repository;

namespace BudgetSAPAllocation
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly BudgetAllocationRepository repo;

        public Worker(BudgetAllocationRepository repo)
        {
            this.repo = repo;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    Console.WriteLine("Worker running at:" + DateTime.Now);
                    ExecuteEvery30mins();
                    await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                }

            }
            catch (Exception ex)
            {
                LogException(ex.Message);
            }
        }
        public void ExecuteEvery30mins()
        {
            try
            {
                var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
                log4net.Config.XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

                Console.WriteLine("--- Started Running for API -----");
                var data = repo.GetBudgetDataToUpdate();

                if (data.Count() > 0)
                {
                    var url = repo.GetConfigDetails("BudgetAPIURL").ConfigValue;
                    var username = repo.GetConfigDetails("BudgetAPIUserName").ConfigValue;
                    var password = repo.GetConfigDetails("BudgetAPIPassword").ConfigValue;

                    foreach (var value in data)
                    {
                        Sync_BudgetToSAP(value.ProjectId.ToString(), value.Amount.ToString(), value.Year.ToString(), url, username, password);
                    }
                }
                Console.WriteLine("--- Stopped Running  for API -----");
            }
            catch (Exception ex)
            {
                LogException(ex.Message.ToString());
            }
        }
        public void Sync_BudgetToSAP(string ProjectId, string Amount, string Year, string url, string username, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.MaxResponseContentBufferSize = int.MaxValue;

                    client.DefaultRequestHeaders.Clear();
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var authenticationString = $"{username}:{password}";
                    var base64String = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(authenticationString));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64String);
                    string jsonPayload = string.Empty;

                    jsonPayload = repo.GetBudgetJsonData(ProjectId, Amount, Year).JsonPayload;

                    if (!string.IsNullOrEmpty(jsonPayload))
                    {
                        var responseData = "";

                        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                        var request = new HttpRequestMessage
                        {
                            Method = HttpMethod.Get,
                            RequestUri = new Uri(url),
                            Content = content
                        };
                        var response = client.SendAsync(request).Result;

                        var responseContent = response.Content.ReadAsStringAsync().Result;

                        var saveresult = repo.SaveBudgetResponse(jsonPayload, responseContent, ProjectId, Year, Amount);
                        Console.WriteLine(saveresult);
                        if (!response.IsSuccessStatusCode)
                        {
                            var errorContent = response.Content.ReadAsStringAsync().Result;
                            throw new Exception($"HTTP request failed with status code {response.StatusCode} and message: {errorContent}");

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                LogException(ex.Message.ToString());
            }
        }
        private void LogException(string message)
        {
            ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
            string dataToWrite = Environment.NewLine + "=====================================================================================================";
            dataToWrite = dataToWrite + Environment.NewLine + "==================== Created Date : " + DateTime.Now.ToString() + " ===========";
            dataToWrite = dataToWrite + Environment.NewLine + message;
            log.Info(dataToWrite);
        }
    }
}
