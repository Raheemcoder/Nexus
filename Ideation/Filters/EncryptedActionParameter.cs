using Ideation.Common;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Ideation.Filters
{
    public class EncryptedActionParameter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {

                Dictionary<string, object> decryptedParameters = new Dictionary<string, object>();

                var en_result = filterContext.HttpContext.Request.Query["q"];

                if (filterContext.HttpContext.Request.Query["q"].Count > 0)
                {

                    string encryptedQueryString = filterContext.HttpContext.Request.Query["q"].ToString().Replace(" ", "+");
                    string decrptedString = CommonUtilities.DecryptStringAES(encryptedQueryString.ToString());
                    string[] paramsArrs = decrptedString.Split('&');

                    for (int i = 0; i < paramsArrs.Length; i++)
                    {

                        string[] paramArr = paramsArrs[i].Split('=');
                        decryptedParameters.Add(paramArr[0], paramArr[1]);

                    }
                }

                for (int i = 0; i < decryptedParameters.Count; i++)
                {

                    filterContext.ActionArguments[decryptedParameters.Keys.ElementAt(i)] = decryptedParameters.Values.ElementAt(i);

                }

                base.OnActionExecuting(filterContext);
            }
            catch (Exception ex)
            {
                filterContext.Result =

                    new RedirectToRouteResult(

                        new RouteValueDictionary {

                                { "Controller", "Login" },

                                { "Action", "WrongParameters" }

                        }
                   );
            }
        }
    }
}