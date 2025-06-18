using Ideation.Core;
using Ideation.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ideation.ViewComponents
{
    public class SubMenuViewComponent : ViewComponent
    {
        IRoleRepository RoleRepository;
        public SubMenuViewComponent(IRoleRepository roleRepository)
        {

            RoleRepository = roleRepository;
        }

        public IViewComponentResult Invoke()
        {
            var RoleId = Convert.ToInt64(HttpContext.Session.GetString("RoleId"));
            var Role= Convert.ToString(HttpContext.Session.GetString("Role"));
            var AppName = Convert.ToString(HttpContext.Session.GetString("AppName"));
            var result = RoleRepository.GetMenuListByRole(RoleId, AppName,"SubMenu", Role);
            return View(result);
        }

    }
}
