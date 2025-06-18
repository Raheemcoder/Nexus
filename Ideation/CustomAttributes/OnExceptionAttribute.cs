using log4net.Config;
using log4net.Repository;
using log4net;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Ideation.CustomAttributes
{
    public class OnExceptionAttribute : IExceptionFilter
    {
        readonly ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        ILoggerRepository loggerRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        public void OnException(ExceptionContext context)
        {
            XmlConfigurator.Configure(loggerRepository, new FileInfo("log4net.config"));
            string controller = context.RouteData.Values["controller"].ToString();
            string action = context.RouteData.Values["action"].ToString();
            logger.Error(new { Controller = controller, Action = action, Exception = context.Exception });

            var routeData = new RouteValueDictionary(new
            {
                controller = "Landing",
                action = "ErrorPage",
                id = 1,
            });
            context.ExceptionHandled = true;
            context.Result = new RedirectToRouteResult(routeData);
            context.Result.ExecuteResultAsync(context);
        }
    }
}
