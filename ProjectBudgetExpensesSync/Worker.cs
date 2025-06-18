using ProjectBudgetExpensesSync.Repository;
using log4net;
using log4net.Config;
using log4net.Repository;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;


namespace ProjectBudgetExpensesSync
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly ProjectBudgetExpensesSyncRepository repo;

        public Worker(ProjectBudgetExpensesSyncRepository repo)
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
                    DateTime currentTime = DateTime.Now;
                    DateTime nextRunTime = currentTime.Hour >= 6 ? currentTime.AddDays(1).Date.AddHours(6) : currentTime.Date.AddHours(6);
                    // DateTime nextRunTime = currentTime.AddSeconds(5);
                    TimeSpan timeToWait = nextRunTime - currentTime;
                    ExecuteEveryDayAt6AM();
                    await Task.Delay(timeToWait, stoppingToken);
                }

            }
            catch (Exception ex)
            {
                LogException(ex.Message);
            }
        }

        public void ExecuteEveryDayAt6AM()
        {
            try
            {
                var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
                log4net.Config.XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

                var Projectview_url = repo.GetConfigDetails("ProjectViewAPIURL").ConfigValue;
                var Budgetview_Url = repo.GetConfigDetails("BudgetViewAPIURL").ConfigValue;
                var Expensesview_url = repo.GetConfigDetails("ExpensesAPIURL").ConfigValue;

                Console.WriteLine("--- Started Running for API -----");
                 Sync_Project_Budget_Expenses(Projectview_url, "ProjectView");
                 Sync_Project_Budget_Expenses(Budgetview_Url, "BudgetView");
                 Sync_Project_Budget_Expenses(Expensesview_url, "ExpenseView");
                Console.WriteLine("--- Stopped Running  for API -----");
            }
            catch (Exception ex)
            {
                LogException(ex.Message.ToString());
            }
        }
        public void Sync_Project_Budget_Expenses(string url, string type)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.MaxResponseContentBufferSize = int.MaxValue;

                    var username = repo.GetConfigDetails("ViewAPIUserName").ConfigValue;
                    var password = repo.GetConfigDetails("ViewAPIPassword").ConfigValue;
                    client.DefaultRequestHeaders.Clear();
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var authenticationString = $"{username}:{password}";
                    var base64String = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(authenticationString));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64String);
                    string jsonPayload = string.Empty;
                    jsonPayload = repo.GetJsonPayload(type).JsonPayload;

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

                        if (response.IsSuccessStatusCode)
                        {
                            var saveresult = repo.SaveAPIResponse(jsonPayload, responseContent, type);
                            Console.WriteLine(saveresult);
                        }
                        else
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

