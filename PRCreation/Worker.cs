using log4net.Config;
using log4net.Repository;
using log4net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using PRCreation.Repository;

namespace PRCreation
{
    public class Worker : BackgroundService
    {

        private readonly ILogger<Worker> _logger;
        private readonly PRCreationRepository repo;

        public Worker(PRCreationRepository repo)
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
                    ExecuteEvery5mins();
                    await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                }
            }
            catch (Exception ex)
            {
                LogException(ex.Message);
            }
        }

        public void ExecuteEvery5mins()
        {
            try
            {
                var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
                log4net.Config.XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

                Console.WriteLine("--- Started Running -----");

                var data = repo.GetOpenPRCountAndAPICred();
                var count = Convert.ToInt32(data.FirstOrDefault(item => item.Key == "Count")?.Value);

                if (count > 0)
                {
                    var url = data.FirstOrDefault(item => item.Key == "API")?.Value;
                    var username = data.FirstOrDefault(item => item.Key == "UserName")?.Value;
                    var password = data.FirstOrDefault(item => item.Key == "Password")?.Value;
                    var prHeaderId = data.FirstOrDefault(item => item.Key == "PRHeaderIds")?.Value;

                    var prHeaderIds = prHeaderId?.Split(',');

                    foreach (var id in prHeaderIds)
                    {
                        CallPRCreationAPI(url, username, password, id);
                    }
                }

                Console.WriteLine("--- Stopped Running -----");
            }
            catch (Exception ex)
            {
                LogException(ex.Message.ToString());
            }
        }

        public void CallPRCreationAPI(string url, string username, string password,string Id)
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
                    var prJson = repo.GetPRJsonFormat(Id).ToList()[0];
                    jsonPayload = prJson.JsonPayLoad;

                    if (!string.IsNullOrEmpty(jsonPayload))
                    {
                        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                        var request = new HttpRequestMessage
                        {
                            Method = HttpMethod.Get,
                            RequestUri = new Uri(url),
                            Content = content
                        };
                        var response = client.SendAsync(request).Result;
                        var responseContent = response.Content.ReadAsStringAsync().Result;
                        if (responseContent == "")
                        {
                            responseContent = response.ReasonPhrase;
                        }
                        var result = repo.UpdatePRResponse(jsonPayload, responseContent, Id);
                        Console.WriteLine(result);

                        if (!response.IsSuccessStatusCode)
                        {
                            var errorContent = response.Content.ReadAsStringAsync().Result;
                            throw new Exception($"HTTP request failed with status code {response.StatusCode} and message: {responseContent}");
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