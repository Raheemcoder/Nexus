using Ideation.Core;
using Ideation.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ideation.ViewComponents
{
    public class MainMenuViewComponent : ViewComponent
    {
        IRoleRepository RoleRepository;
        public MainMenuViewComponent(IRoleRepository roleRepository)
        {
            RoleRepository = roleRepository;
        }

        public IViewComponentResult Invoke()
        {

            var RoleId = Convert.ToInt64(HttpContext.Session.GetString("RoleId"));
            var Role = Convert.ToString(HttpContext.Session.GetString("Role"));
            var AppName = Convert.ToString(HttpContext.Session.GetString("AppName"));
            var result = RoleRepository.GetMenuListByRole(RoleId,AppName,"MainMenu", Role);

            return View(result);
        }

    }
}