using Ideation.Models;
using Newtonsoft.Json;

namespace Ideation.Common
{
    public class ADIntegration
    {
        static string apiEndPoint = AppSettings.APIDetails.APIEndPoint;
        static string basicUserName = AppSettings.APIDetails.BasicUserName;
        static string basicPassword = AppSettings.APIDetails.BasicPassword;
        public static bool UserAuthentication(string userName,string password,string authenticationType)
        {
            HttpClient client = new HttpClient();
            AuthenticatUser authenticatUser = new AuthenticatUser();
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(basicUserName+":"+ basicPassword);
            string basicToken = System.Convert.ToBase64String(plainTextBytes);
            client.DefaultRequestHeaders.Add("Authorization", "Basic " + basicToken);
            var data = new[]
            {
                new KeyValuePair<string,string>("UserName",userName),
                new KeyValuePair<string,string>("Password",password),
                new KeyValuePair<string,string>("type",authenticationType)
            };
            var response = client.PostAsync(apiEndPoint, new FormUrlEncodedContent(data)).GetAwaiter().GetResult();
            if(response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseMessage=response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                authenticatUser = JsonConvert.DeserializeObject<AuthenticatUser>(responseMessage);
                return authenticatUser.IsAuthenticated;
            }
            return false;
        }
    }
}
