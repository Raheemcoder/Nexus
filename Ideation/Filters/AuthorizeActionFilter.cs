using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Ideation.Filters
{
    public class AuthorizeActionFilter: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session.GetString("UserName") == null)
            {
                filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary {
                            { "Controller", "Login" },
                            { "Action", "login" }
                            });
                return;
            }
            base.OnActionExecuting(filterContext);
        }
    }
}
