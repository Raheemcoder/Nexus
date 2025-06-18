using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Office2021.PowerPoint.Comment;
using DocumentFormat.OpenXml.Spreadsheet;
using Grpc.Core;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class InnovationController : Controller
    {
        IMasterRepository master;
        IInnovationRepository innovationRep;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnv;

        public InnovationController(IMasterRepository master, IInnovationRepository innovationRep, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            this.master = master;
            this.innovationRep = innovationRep;
            this.hostingEnv = env;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult YourInnovation()
        {
            Innovation innovation = new Innovation();
            Masters masters = master.GetMasters();
            innovation.PlatformTypeList = masters.PlatformTypes.Select(m => new SelectListItem { Text = m.PlatformTypeName, Value = m.PlatformTypeId.ToString() });
            innovation.BusinessDivisionList = masters.BusinessDivisions.Select(m => new SelectListItem { Text = m.BusinessDivisionName, Value = m.BusinessDivisionId.ToString() });
            innovation.GeographicScopeList = masters.GeographicScopes.Select(m => new SelectListItem { Text = m.GeographicName, Value = m.GeographicId.ToString() });
            innovation.StrategicFitList = masters.StrategicFits.Select(m => new SelectListItem { Text = m.StrategicFitName, Value = m.StrategicFitId.ToString() });
            var empId = HttpContext.Session.GetString("UserName");
            ViewBag.InnovationData = innovationRep.GetInnovation(empId);
            //ViewBag.PendingInnovation = innovationRep.GetInnovationDetails(empId);
            ViewBag.PendingInnovation = innovationRep.GetPendingInnovation(empId);
            var result = ViewBag.InnovationData;
            return View(innovation);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> YourInnovation(Innovation innovation)
        {
            var empId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            var uploadPath = Path.Combine(hostingEnv.WebRootPath, "ImageUpload");
            innovation.StrategicFitNames = string.Join(",", innovation.StrategicFitId);
			var file_name = "";
			if (ModelState.IsValid)
            {
                if (innovation.PostedFile != null)
                {
                    if(innovation.PostedFile.FileName != null)
                    {
						file_name = Regex.Replace(innovation.PostedFile.FileName, "[^0-9a-zA-Z_.()]+", "", RegexOptions.Compiled);
						string extension = System.IO.Path.GetExtension(file_name).ToLower();
						string[] fileList = file_name.Split(extension);
                        var uniqueno = innovationRep.GetUniqueNo().FirstOrDefault();
						file_name = fileList[0]+ uniqueno.uniqueNo + extension;
					}
					using (var fileStream = new FileStream(Path.Combine(uploadPath, file_name), FileMode.Create))
                    {
                        await innovation.PostedFile.CopyToAsync(fileStream);
                    }
                }
                
                var res = innovationRep.AddInnovation(innovation, empId, file_name);
                TempData["Messageclass"] = "alert-success";
                TempData["Successmessage"] = "Congratulations! Innovation submitted successfully";
                return RedirectToAction("YourInnovation", "Innovation");
            }
            Masters masters = master.GetMasters();
            innovation.PlatformTypeList = masters.PlatformTypes.Select(m => new SelectListItem { Text = m.PlatformTypeName, Value = m.PlatformTypeId.ToString() });
            innovation.BusinessDivisionList = masters.BusinessDivisions.Select(m => new SelectListItem { Text = m.BusinessDivisionName, Value = m.BusinessDivisionId.ToString() });
            innovation.GeographicScopeList = masters.GeographicScopes.Select(m => new SelectListItem { Text = m.GeographicName, Value = m.GeographicId.ToString() });
            innovation.StrategicFitList = masters.StrategicFits.Select(m => new SelectListItem { Text = m.StrategicFitName, Value = m.StrategicFitId.ToString() });
            return View(innovation);
        }


        [HttpPost]
        public JsonResult GetInnovationData(int innovationId)
        {
            var result = innovationRep.GetIdeationById(innovationId);
            result.StrategicFitId = result.StrategicFitNames?.Split(",");
            var jsondata = Json(result);
            return jsondata;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateInnovationData(InnovationStats innovationStats)
        {
            var uploadPath = Path.Combine(hostingEnv.WebRootPath, "ImageUpload");
            innovationStats.StrategicFitNames = string.Join(",", innovationStats.StrategicFitId);
			var file_name = "";
			if (innovationStats.PostedFile != null)
            {
				if (innovationStats.PostedFile.FileName != null)
                {
					file_name = Regex.Replace(innovationStats.PostedFile.FileName, "[^0-9a-zA-Z_.()]+", "", RegexOptions.Compiled);
					string extension = System.IO.Path.GetExtension(file_name).ToLower();
					string[] fileList = file_name.Split(extension);
					var uniqueno = innovationRep.GetUniqueNo().FirstOrDefault();
					file_name = fileList[0] + uniqueno.uniqueNo + extension;
				}
				using (var fileStream = new FileStream(Path.Combine(uploadPath, file_name), FileMode.Create))
                {
                    await innovationStats.PostedFile.CopyToAsync(fileStream);
                }

            }
            var result = Json(innovationRep.UpdateInnovationDetails(innovationStats, file_name));
            return RedirectToAction("YourInnovation", "Innovation");
        }

        
    }
}
