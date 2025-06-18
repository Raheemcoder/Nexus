using DocumentFormat.OpenXml.Bibliography;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Ideation.Controllers
{
    //[SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class BaseController : Controller
    {
        public string LoginId
        {
            get { return HttpContext.Session.GetString("UserName") ?? string.Empty; }
        }
        public string userName
        {
            get { return HttpContext.Session.GetString("UserName") ?? string.Empty; }
        }
        public string RoleId
        {
            get { return HttpContext.Session.GetString("RoleId") ?? string.Empty; }
        }
        public string Role
        {
            get { return HttpContext.Session.GetString("Role") ?? string.Empty; }
        }
        public string year
        {
            get { return HttpContext.Session.GetString("SearchedYear") ?? string.Empty; }
        }
        public string hub
        {
            get { return HttpContext.Session.GetString("Hub") ?? string.Empty; }
        }


        INpdRepository npdRepository = new NpdRepository();
        ICommonRepository commonRepository = new CommonRepository();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost]
        public JsonResult GetUserEmailBasedOnHub(string hubIds)
        {
            var result = npdRepository.GetUserEmailBasedOnHub(hubIds);
            var jsonResult = Json(result);
            return jsonResult;
        }

        public string RemoveSpecialChars(string inputString)
        {
            var newString = Regex.Replace(inputString, "[^0-9A-Za-z ,]", ",");
            newString = Regex.Replace(newString, "[,]", "");
            return string.Concat(newString, "_", DateTime.Now.Ticks);
        }

        public JsonResult GetUserEmailBasedOnHubUser(string hubUser)
        {
            var result = npdRepository.GetUserEmailBasedOnHubUser(hubUser);
            var jsonResult = Json(result);
            return jsonResult;
        }

        public JsonResult GetProductNamesInProjectBrief(string projectId, string projectType)
        {
            var result = npdRepository.GetProductNamesInProjectBrief(projectId, projectType);
            var jsonResult = Json(result);
            return jsonResult;
        }

       
    }
}
