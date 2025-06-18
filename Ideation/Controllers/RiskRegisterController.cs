using Microsoft.AspNetCore.Mvc;

namespace Ideation.Controllers
{
    public class RiskRegisterController : Controller
    {
        public IActionResult RRIndex()
        {
            return View();
        }
        public IActionResult RiskRegister()
        {
            return View();
        } 
        public IActionResult ViewRisk()
        {
            return View();
        }
    }
}
