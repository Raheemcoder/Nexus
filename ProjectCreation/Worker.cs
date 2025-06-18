using log4net;
using log4net.Config;
using log4net.Repository;
using ProjectCreation.Repository;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;

namespace ProjectCreation
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly ProjectCreationRepository repo;

        public Worker(ProjectCreationRepository repo)
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
                    ExecuteEvery10mins();
                    await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                }

            }
            catch (Exception ex)
            {
                LogException(ex.Message);
            }
        }
        public void ExecuteEvery10mins()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.MaxResponseContentBufferSize = int.MaxValue;
                    var data = repo.GetProjectCodetoCreate();

                    if (data.Count() > 0)
                    {
                        var URL = repo.GetConfigDetails("APIURL").ConfigValue;
                        var username = repo.GetConfigDetails("ViewAPIUserName").ConfigValue;
                        var password = repo.GetConfigDetails("ViewAPIPassword").ConfigValue;

                        foreach (var value in data)
                        {
                            CreateProject(value.ProjectCode.ToString(), URL, username, password);
                        }
                    }
                    Console.WriteLine("--- Stopped Running  for API -----");
                }
            }
            catch (Exception ex)
            {
                LogException(ex.Message.ToString());
            }
        }

        public void CreateProject(string ProjectCode, string url, string username, string password)
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

                    jsonPayload = repo.GetProjectCreationJson(ProjectCode).JsonPayload;

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

                        var saveresult = repo.SaveProjectCreationResponse(jsonPayload, responseContent, ProjectCode);
                        if (saveresult.Contains("Successfully"))
                        {
                            UpdateProjectIdAndDescription(ProjectCode, "India");
                            UpdateProjectIdAndDescription(ProjectCode, "Row");
                            UpdateProjectIdAndDescription(ProjectCode, "CC01");
                        }
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
        public void UpdateProjectIdAndDescription(string ProjectCode, string APIName)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var url = repo.GetConfigDetails(APIName+"ProjectUpdate").ConfigValue;
                    var username = repo.GetConfigDetails("BudgetAPIUserName").ConfigValue;
                    var password = repo.GetConfigDetails("BudgetAPIPassword").ConfigValue;
                    
                    client.MaxResponseContentBufferSize = int.MaxValue;
                    client.DefaultRequestHeaders.Clear();
                    client.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var authenticationString = $"{username}:{password}";
                    var base64String = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(authenticationString));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64String);
                    string jsonPayload = string.Empty;

                    jsonPayload = repo.GetProjectIdAndDescriptionJson(ProjectCode, APIName).JsonPayload;

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

                        var saveresult = repo.SaveProjectIdDescriptionResponse(jsonPayload, responseContent, ProjectCode,url,APIName);
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
