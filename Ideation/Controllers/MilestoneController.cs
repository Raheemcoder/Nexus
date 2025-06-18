using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using System.Globalization;
using static Microsoft.AspNetCore.Razor.Language.TagHelperMetadata;
using SelectListItem = System.Web.Mvc.SelectListItem;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class MilestoneController : BaseController
    {

        private readonly IEPPMMasterRepository _masterRepository;
        //private readonly IMasterRepository _masterRepository;
        public MilestoneController(IEPPMMasterRepository masterRepository)
        {
            this._masterRepository = masterRepository;
        }
        // GET: Milestone
        //public IActionResult Index(string FilteredProjectId)
        //{
        //    MyMilestone myMilestone = new MyMilestone();

        //    string UserName = HttpContext.Session.GetString("UserName");
        //    int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
        //    myMilestone.RoleId = RoleId.ToString();
        //    var SearchText = FilteredProjectId ?? string.Empty;
        //    var Type = SearchText == "" ? "List" : "search";
        //    int roleid = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));

        //    string Email = SearchText == "" ? HttpContext.Session.GetString("EmailId") : "";
        //    if (roleid == 3)
        //    {
        //        Email = HttpContext.Session.GetString("EmailId");
        //    }
        //    var UserId = HttpContext.Session.GetString("EmailId").Split("@")[0];


        //    myMilestone.PmuMappingList = _masterRepository.Get_MyMilestone(UserName, SearchText, "", Type, RoleId, Email).ToList();
        //    myMilestone.Countlist = myMilestone.PmuMappingList.Count();
        //    myMilestone.SearchProjectId = SearchText;

        //    //myMilestone.PmuMappingList = _masterRepository.Get_MyMilestone(" ", " ", "List", " ").ToList();
        //    //myMilestone.MilestoneNameList = _masterRepository.Get_MilestoneName();

        //    var UserList = _masterRepository.Get_UserList();
        //    myMilestone.UserLsit = UserList.Select(m => new SelectListItem { Value = m.UserId, Text = m.UserName });

        //    var status = _masterRepository.GetStatusList();
        //    HttpContext.Session.SetString("StatusList", JsonConvert.SerializeObject(status));

        //    myMilestone.JsonData = JsonConvert.SerializeObject(myMilestone.PmuMappingList);
        //    return View(myMilestone);

        //}

        //GET: Milestone
        //[EncryptedActionParameter]
        //[HttpGet]
        //public IActionResult Index(string ProjectId, string HubId)
        //{
        //    MyMilestone myMilestone = new MyMilestone();

        //    string UserName = HttpContext.Session.GetString("UserName");
        //    int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
        //    myMilestone.RoleId = RoleId.ToString();

        //    if (ProjectId != null && HubId != null)
        //    {
        //        HttpContext.Session.SetString("SearchedHub", HubId);
        //        HttpContext.Session.SetString("SearchedProjectId", ProjectId);
        //    }
        //    if(ProjectId == null && HubId == null)
        //    {
        //         HubId = HttpContext.Session.GetString("SearchedHub");
        //         ProjectId = HttpContext.Session.GetString("SearchedProjectId");
        //    }
        //var SearchedStatusId = HttpContext.Session.GetString("SearchedStatusId");

        //if (SearchedHub !=null || SearchedProjectId !=null || SearchedStatusId != null)
        //{
        //myMilestone.PmuMappingList = _masterRepository.GetMyMileStoneSearchedData(HubId, ProjectId, RoleId, UserName);
        //}
        //else
        //{
        //    myMilestone.PmuMappingList = _masterRepository.Get_MyMilestone(UserName,RoleId).ToList();
        //}

        //myMilestone.Countlist = myMilestone.PmuMappingList.Count();
        //var status = _masterRepository.GetStatusList();
        //HttpContext.Session.SetString("StatusList", JsonConvert.SerializeObject(status));

        //myMilestone.JsonData = JsonConvert.SerializeObject(myMilestone.PmuMappingList);
        //    //return View(myMilestone);
        //}

        //GET: Particular mile stone's sub milestone datas
        //[HttpPost]
        //public IActionResult Index(int ProjectId, string DisplaySubMilestone)
        //{
        //    MyMilestone myMilestone = new MyMilestone();
        //    var getMilestoneNameList = _masterRepository.ProjectMappedMilestones(ProjectId, DisplaySubMilestone).ToList();
        //    //myMilestone.ProjectBasedMilestone= getMilestoneNameList.Select(m => new SelectListItem { Value = m.MilestoneId.ToString(), Text = m.MilestoneName });
        //    return Json(getMilestoneNameList);
        //}
        //[HttpGet]
        //public IActionResult MilestonelIST()
        //{
        //    var milestoneList = _masterRepository.Get_MilestoneName();
        //    return Json(milestoneList);

        //}

        //public IActionResult DatePicker(int MilestoneId, int ProjectId)
        //{

        //    var myMilestone = _masterRepository.Milestone_DatePicker(MilestoneId, ProjectId);
        //    return Json(myMilestone);
        //}
        ////changed
        //public IActionResult Filtersearch(string UserId, string SearchText, string Status, string Type, string Email)
        //{

        //    int roleid = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
        //    string UserName = HttpContext.Session.GetString("UserName");
        //    if (roleid == 3)
        //    {
        //        Email = HttpContext.Session.GetString("EmailId");
        //    }
        //    var myMilestoneCards = _masterRepository.Get_MyMilestone(UserName, SearchText, Status, Type, roleid, Email);

        //    return Json(myMilestoneCards);
        //}
        //[HttpPost]
        //public IActionResult DependentMilestoneList(int projectId, int slNo, string startDate, string pmuVersion, string endDate, int Hub)
        //{
        //    var myMilestoneCards = _masterRepository.Get_DependentMyMilestone(projectId, slNo, pmuVersion, startDate, endDate,Hub);
        //    return Ok(myMilestoneCards);
        //}
        //[HttpPost]
        //public string ApproveOrRejectMilestone(int projectId, int slNo, string startDate, string pmuVersion, string endDate, long extendId, string status,string remarks,string ApprovalRemarks, int Hub)
        //{
        //    var result = _masterRepository.ApproveOrRejectMilestone(projectId, slNo, startDate, pmuVersion, endDate, extendId, status, HttpContext.Session.GetString("UserName"), remarks, ApprovalRemarks,Hub);
        //    if (result.ToString().ToLower().Contains("successfully"))
        //    {
        //        TempData["ARMMessage"] = result;
        //        TempData["ARMMessageClass"] = "alert-success";
        //    }
        //    return result;
        //}
        //[HttpPost]
        //public ActionResult EditePmuMapping(MyMilestone milestone, string DisplaySubMilestone, string VersionReamrks)
        //{
        //    var common = "";
        //    string UserName = HttpContext.Session.GetString("UserName");
        //    int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
        //    if (DisplaySubMilestone == "True")
        //    {
        //        common = _masterRepository.SubPmuCardEdit(milestone, UserName, RoleId, VersionReamrks);

        //    }
        //    else
        //    {
        //        common = _masterRepository.PmuCardEdit(milestone, UserName, RoleId, VersionReamrks);

        //    }

        //    if (common.ToString() == "Updated")
        //    {
        //        TempData["Message"] = "Updated Successfully";
        //        TempData["MessageClass"] = "alert-success";
        //    }
        //    if (common.ToString() == "mailsend")
        //    {
        //        TempData["Message"] = "Please wait for the response! Mail sent to the project manager for approval";
        //        TempData["MessageClass"] = "alert-success";
        //    }
        //    if (common.Contains("extension"))
        //    {
        //        TempData["Message"] = common;
        //        TempData["MessageClass"] = "alert-danger";
        //    }
        //    return Json(common);
        //}
        //public IActionResult ChangeStatusOfMilestone(int ProjectId, int MilestoneId, string MilestoneStatus)
        //{
        //    string UserName = HttpContext.Session.GetString("UserName");
        //    var common = _masterRepository.Milestonedatechange(ProjectId, MilestoneId, MilestoneStatus);
        //    if (common.ToString() == "Updated")
        //    {
        //        TempData["Message"] = "Updated Successfully";
        //        TempData["MessageClass"] = "alert-success";
        //    }
        //    return Json(common);
        //}

        //public IActionResult AlertforCompletthemilestone(int ProjectId, int MilestoneId, string DisplaySubMilestone, int SlNo,int Hub)
        //{
        //    string UserName = HttpContext.Session.GetString("UserName");
        //    var common = _masterRepository.Checkingdependedmilestonestaus(ProjectId, MilestoneId, DisplaySubMilestone, SlNo,Hub).ToList();
        //    return Json(common);
        //}

        public IActionResult getusermail()
        {
            User u = new User();
            string UserName = HttpContext.Session.GetString("UserName");
            u.EmailId = HttpContext.Session.GetString("EmailId");
            u.RoleName = HttpContext.Session.GetString("Role");

            return Json(u);
        }

        public IActionResult ApproveUserRequestMaster()
        {
            return View();
        }
        public IActionResult GetUserRequestedEndDateList(string status)
        {
            string UserName = HttpContext.Session.GetString("UserName");
            string EmailId = HttpContext.Session.GetString("EmailId");
            int roleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            HttpContext.Session.SetString("SelectedStatus", status);
            var myMilestoneCards = _masterRepository.GetUserRequestedEndDateList(status, UserName, EmailId, roleId);
            return Ok(myMilestoneCards);
        }
        //[HttpPost]
        //public IActionResult GetVersion(int ProjectId)
        //{
        //    var myMilestoneCards = _masterRepository.GetVersion(ProjectId);
        //    return Json(myMilestoneCards);
        //}


        [HttpPost]
        public ActionResult New_EditPMUMapping(MyMilestone milestone)
        {
            var common = "";
            string UserName = HttpContext.Session.GetString("UserName");
            int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            if (!string.IsNullOrEmpty(milestone.ActualCompletedDate))
                milestone.NewActualCompletedDate = DateTime.ParseExact(milestone.ActualCompletedDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            if (!string.IsNullOrEmpty(milestone.ExtendedDate))
                milestone.NewExtendedDate = DateTime.ParseExact(milestone.ExtendedDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            common = _masterRepository.UpdatePMUDetails(JsonConvert.SerializeObject(milestone), RoleId, UserName);

            if (common.ToString() == "Updated")
            {
                TempData["Message"] = "Updated Successfully";
                TempData["MessageClass"] = "alert-success";
            }
            //if (common.ToString() == "mailsend")
            //{
            //    TempData["Message"] = "Please wait for the response! Mail sent to the project manager for approval";
            //    TempData["MessageClass"] = "alert-success";
            //}
            //if (common.Contains("extension"))
            //{
            //    TempData["Message"] = common;
            //    TempData["MessageClass"] = "alert-danger";
            //}
            return Json(common);
        }

        //public IActionResult GetMilestoneRevisedDates(int ProjectId, string MilestoneId, int SlNo, string PMUVersion, string StartDate, string EndDate, int Hub)
        //{
        //    var revisedDates = _masterRepository.GetMilestoneRevisedDates(ProjectId, MilestoneId, SlNo, PMUVersion, StartDate, EndDate,Hub);
        //    return Ok(revisedDates);
        //}
        public IActionResult GetMyMileStoneSearchedData(string HubId, string ProjectId, string StatusId)
        {

            int RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            string UserName = HttpContext.Session.GetString("UserName");

            if (HubId != null)
            {
                HttpContext.Session.SetString("SearchedHub", HubId);
            }
            else
            {
                HttpContext.Session.Remove("SearchedHub");
            }
            //if (ProjectId != null)
            //{
            //    HttpContext.Session.SetString("SearchedProjectId", ProjectId);
            //}
            //else
            //{
            //    HttpContext.Session.Remove("SearchedProjectId");
            //}
            if (StatusId != null)
            {
                HttpContext.Session.SetString("SearchedStatusId", StatusId);
            }
            else
            {
                HttpContext.Session.Remove("SearchedStatusId");
            }

            var myMilestoneCards = _masterRepository.GetMyMileStoneSearchedData(HubId, ProjectId, RoleId, UserName);
            return Json(myMilestoneCards);
        }

        //[EncryptedActionParameter]
        //[HttpGet]
        //public IActionResult MyMilestoneApproval(string ProjectId,string HubId)
        //{
        //    MyMilestone myMilestone = new MyMilestone();
        //    var PrjId = Convert.ToInt32(ProjectId);
        //    var Hub = Convert.ToInt32(HubId);
        //    var result = _masterRepository.MyMilestoneApprovalDetail(PrjId,Hub);
        //    myMilestone.JsonData = JsonConvert.SerializeObject(result);
        //    return View(myMilestone);
        //}

        [HttpGet]
        public IActionResult GetParticularTaskRemarksHistory(int projectId, int slNo, int hubId)
        {
            var milestoneList = _masterRepository.GetParticularTaskRemarksHistory(projectId, slNo, hubId);
            return Json(milestoneList);
        }

        public IActionResult MyMilestoneMaster()
        {
            return View();
        }
        public IActionResult GetMyMileStoneList(string status)
        {
            string UserName = HttpContext.Session.GetString("UserName");
            string EmailId = HttpContext.Session.GetString("EmailId");
            int roleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            if (status == null)
            {
                status = HttpContext.Session.GetString("SStatus");
            }
            else
            {
                HttpContext.Session.SetString("SStatus", status);
            }
            var myMilestoneCards = _masterRepository.GetMyMileStoneList(status, UserName, EmailId, roleId);
            return Ok(myMilestoneCards);
        }
    }
}