using Ideation.CustomAttributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Ideation.Models;
using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using Ideation.Data;
using Ideation.Core;

namespace Ideation.CustomAttributes
{
    [SessionExpire]
    public class MenuAccessAttribute : ActionFilterAttribute
    {
        private readonly string menuName;
        public RoleRepository roleRepository = new RoleRepository();
        public MenuAccessAttribute(string menuName)
        {
            this.menuName = menuName;
        }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            try
            {
                //var menuDetails = filterContext.HttpContext.Session.GetString("MenuDetails");
                var RoleId = Convert.ToInt64(filterContext.HttpContext.Session.GetString("RoleId"));
                var AppName = Convert.ToString(filterContext.HttpContext.Session.GetString("AppName"));
                var result = roleRepository.GetMenuListByRoleId(RoleId);
                var menuDetails = JsonConvert.SerializeObject(result);
                List<Menu> menuList = JsonConvert.DeserializeObject<List<Menu>>(menuDetails);
                var menu = menuList.AsParallel().Where(m => m.MenuName.ToLower().Replace(" ", "") == menuName.ToLower().Replace(" ", "")).FirstOrDefault();
                Controller controller = filterContext.Controller as Controller; 
                controller.ViewBag.IsEdit = (menu?.IsEdit); 
                controller.ViewBag.IsRead = (menu?.IsRead);
                if (!(menu?.IsEdit ?? false) && !(menu?.IsRead ?? false))
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "action", "Unauthorized" }, { "controller", "Login" }, { "area", "" } });
                }
            }
            catch (Exception ex)
            {
                
            }
        }
    }
}