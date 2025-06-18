using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace Ideation.CustomAttributes
{
    public class SessionExpireAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session.GetString("UserName") == null)
            {
                bool isAjaxCall = filterContext.HttpContext.Request.Headers["x-requested-with"] == "XMLHttpRequest";
                if (isAjaxCall)
                {

                    filterContext.Result = new JsonResult(System.Text.Json.JsonSerializer.Serialize(new
                    {
                        HttpStatusCode.Unauthorized,
                        url = "ROOT + 'Login/Logout'",
                        message = "sorry, but you were logged out"
                    }));

                }
                else
                {
                    filterContext.Result = new RedirectToRouteResult(
                                   new RouteValueDictionary {
                            { "Controller", "Login" },
                            { "Action", "Logout" }
                                               });
                }
                return;
            }
            base.OnActionExecuting(filterContext);
        }

    }
}
