using DocumentFormat.OpenXml.Math;
using Ideation.Core;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ideation.Controllers
{
    public class HGHController : BaseController
    {
        private readonly IHGHRepository hghrepo;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;

        #region Constructor
        public HGHController(IWebHostEnvironment webHostEnvironment, IHGHRepository hghrepo, IConfiguration Configuration)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.hghrepo = hghrepo;
            this.Configuration = Configuration;
        }
        #endregion

        #region HGL code
        [HttpGet]
        public IActionResult HGHCodeList()
        {
            HGH hgh = new HGH();
            var result = hghrepo.GetHGHCodeMasterData(LoginId, Role);
            hgh.ProjectValue = JsonConvert.SerializeObject(result.ProjectValue);
            hgh.FromDate = result.FromDate;
            hgh.ToDate = result.ToDate;
            return View(hgh);
        }
        public IActionResult AddHGHCode()
        {
            HGH hgh = new HGH();
            var result = hghrepo.GetHGHCodeMasterData(LoginId, Role);
            hgh.ProjectValue = JsonConvert.SerializeObject(result.ProjectValue);
            return View(hgh);
        }
        public IActionResult GetHGHCodeList(string ProjectId, string FromDate, string ToDate)
        {
            var result = hghrepo.GetHGHCodeList(LoginId, Role, ProjectId, FromDate, ToDate);
            return Ok(result);
        }
        public IActionResult HGH_GetProjectInfo(string ProjectId, string LoginId, string Role, string ProjectName, string HGHId)
        {
            HGH hgh = new HGH();
            var result = hghrepo.HGH_GetProjectInfo(ProjectId, LoginId, Role, ProjectName, HGHId);
            hgh.ProjectDetails = JsonConvert.SerializeObject(result.ProjectDetails);
            hgh.BusinessInfo = JsonConvert.SerializeObject(result.BusinesInfo);
            hgh.HGHCode = result.HGHCode;
            hgh.IsPresent = result.IsPresent;
            hgh.ExsistingHGHCode = JsonConvert.SerializeObject(result.ExsistingHGHCode);
            return Ok(hgh);
        }
        [HttpPost]
        public IActionResult InsertHGHdata()
        {
            var HGHCode = Convert.ToString(Request.Form["HGHCode"]);
            var ProjectId = Convert.ToString(Request.Form["ProjectId"]);
            var Action = Convert.ToString(Request.Form["Action"]);
            var Remarks = Convert.ToString(Request.Form["Remarks"]);
            var HGHId = Convert.ToString(Request.Form["HGHId"]);
            var result = hghrepo.InsertHGHdata(HGHCode, ProjectId, Remarks, Action, LoginId, HGHId);
            TempData["Message"] = result.Item1;
            TempData["MessageClass"] = result.Item2;
            return Json(result.Item1);
        }
        [EncryptedActionParameter]
        public IActionResult EditHGHCode(string HGHId, string ProjectId, string StatusId)
        {
            HGH hgh = new HGH();
            var result = hghrepo.GetHGHCodeMasterData(LoginId, Role);
            hgh.ProjectValue = JsonConvert.SerializeObject(result.ProjectValue);
            hgh.HGHId = HGHId;
            hgh.MProjectId = ProjectId;
            hgh.StatusId = StatusId;
            return View(hgh);
        }
        public IActionResult GetHGHCodeHistory(string ProjectId, string HGHId)
        {
            var result = hghrepo.GetHGHCodeHistory(ProjectId, HGHId, LoginId);
            return Json(result);
        }
        [EncryptedActionParameter]
        public IActionResult DeleteHGHCode(string HGHId, string ProjectId)
        {
            var result = hghrepo.DeleteHGHdata(HGHId, ProjectId, LoginId);
            TempData["Message"] = result.Item1;
            TempData["Messageclass"] = result.Item2;
            return RedirectToAction("HGHCodeList", "HGH");
        }
        public IActionResult HGHSapRetry(string ProjectId)
        {
            var result = hghrepo.HGHSapRetry(ProjectId, LoginId);
            return Json(result);
        }
        public JsonResult GetSAPFailedInfo(string ReqNo, string Page)
        {
            var result = hghrepo.GetSAPFailedInfo(ReqNo, Page);
            return Json(result);
        }
        #endregion

    }
}