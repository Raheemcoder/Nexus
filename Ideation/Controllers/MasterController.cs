//using DocumentFormat.OpenXml.EMMA;
//using DocumentFormat.OpenXml.Office2019.Excel.RichData2;
//using DocumentFormat.OpenXml.Wordprocessing;
//using Ideation.Controllers;
//using Ideation.Core;
//using Ideation.CustomAttributes;
//using Ideation.Filters;
//using Ideation.Models;
//using Irony;
//using iText.Kernel.Pdf;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.StaticFiles;
//using Microsoft.Build.ObjectModelRemoting;
//using Microsoft.CodeAnalysis;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Web;
//using System.Web.WebPages;
//using System.Xml.Serialization;
//using SelectListItem = System.Web.Mvc.SelectListItem;

//namespace EPPM_NM.Controllers
//{
//    [SessionExpire]
//    [Authorize]
//    [TypeFilter(typeof(OnExceptionAttribute))]
//    public class MasterController : BaseController
//    {
//        #region Constructor
//        private readonly IEPPMMasterRepository _masterRepository;
//        private readonly IConfiguration? Configuration;

//        private readonly IWebHostEnvironment webHostEnvironment;
//        public static string isLocal = AppSettingsPath.AppPathDetails.IsLocal;
//        public static string isQA = AppSettingsPath.AppPathDetails.IsQA;
//        public MasterController(IWebHostEnvironment webHostEnvironment, IEPPMMasterRepository masterRepository, IConfiguration Configuration)
//        {
//            this.webHostEnvironment = webHostEnvironment;
//            this._masterRepository = masterRepository;
//            this.Configuration = Configuration;
//        }

//        #endregion

//        [HttpGet]
//        // GET: Master
//        public IActionResult ProjectMaster()
//        {

//            return View();
//        }
//        [HttpPost]
//        public JsonResult ProjectMaster(ProjectData projectData)
//        {
//            Common accept = _masterRepository.Update_ProjectStatus(projectData.ProjectId, projectData.Status, HttpContext.Session.GetString("UserName").ToString(), projectData.IsActive);

//            List<PMUMapping> projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName").ToString()).ToList();
//            for (var index = 0; index < projectlist.Count; index++)
//            {
//                if (projectlist[index].ProjectId == projectData.ProjectId)
//                {
//                    projectlist[index].IsActive = projectData.IsActive;

//                }
//            }

//            //HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));
//            //Session["getProjectList"] = projectlist;

//            TempData["Message"] = accept.OutMessage;
//            TempData["MessageStyle"] = accept.StyleClass;
//            return Json("");
//        }

//        public ActionResult ProjectList()
//        {
//            EPPMProjectMaster projectmaster = new EPPMProjectMaster();
//            List<EPPMProjectMaster> fetchData = _masterRepository.Get_ProjectMasterList();
//            projectmaster.StatusDropdown = _masterRepository.Get_ProjectStatusMasterList();
//            for (int index = 0; index < fetchData.Count; index++)
//            {
//                fetchData[index].StatusDropdown = projectmaster.StatusDropdown;
//            }

//            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(fetchData);

//            return Json(jsonData);
//        }

//        //public ActionResult ProjectStatusMasterList()
//        //{
//        //    var projectStatusMasterList = _masterRepository.Get_ProjectStatusMasterList();
//        //    //string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(projectStatusMasterList);
//        //    return Json(projectStatusMasterList, JsonRequestBehavior.AllowGet);
//        //}

//        //public ActionResult MilestoneMaster()
//        //{
//        //    MilestoneMaster milestone = new MilestoneMaster();
//        //    List<MilestoneMaster> fetchData = _masterRepository.Get_MilestoneList(0).ToList();
//        //    milestone.count = fetchData.Count;
//        //    //milestone.SequenceNo = fetchData.Count + 1;
//        //    var getSequnceNo = _masterRepository.Get_MilestoneSequnceList();
//        //    ViewBag.SetRealtion = getSequnceNo.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.MilestoneName.ToString() });
//        //    var getSequnceNoForDropdown = _masterRepository.SequnceNumberForDropdown();
//        //    ViewBag.SetSequnce = getSequnceNoForDropdown.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.SequenceNo.ToString() });
//        //    return View(milestone);

//        //}
//        //[HttpGet]

//        //public ActionResult UserMaster()
//        //{
//        //    User u = new User();
//        //    var getRoleList = _masterRepository.Get_RolesList(0);
//        //    u.RoleList = getRoleList.Select(m => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Value = m.RoleId.ToString(), Text = m.RoleName });
//        //    // u.IsActive = true;
//        //    return View(u);
//        //}


//        //[HttpPost]
//        //public ActionResult AddUser(User user)
//        //{
//        //    //if (ModelState.IsValid)
//        //    //{
//        //    user.LoggedUserName = HttpContext.Session.GetString("UserName").ToString();
//        //    var common = _masterRepository.Insert_Update_User(user);
//        //    TempData["MessageClass"] = common.StyleClass;
//        //    TempData["Message"] = common.OutMessage;
//        //    return Json(common);
//        //    //}
//        //    //else
//        //    //{
//        //    //    IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
//        //    //    TempData["Message"] = "Form is invalid";
//        //    //    TempData["Messageclass"] = "alert-danger";
//        //    //    return RedirectToAction("UserMaster", "Master");
//        //    //}
//        //}
//        //[HttpGet]

//        //public ActionResult GetUserList()
//        //{
//        //    var getUserList = _masterRepository.UserMaster_GetList(0);

//        //    return Json(getUserList);
//        //}
//        //[HttpPost]
//        //public ActionResult EndDateChange(string milestoneId, string projectId, string startDate, string endDate)
//        //{
//        //    var data = _masterRepository.EndDateChange(milestoneId, projectId, startDate, endDate);
//        //    return Json(data);
//        //}
//        //public ActionResult GetMilestoneList()
//        //{
//        //    MilestoneMaster milestoneMaster = new MilestoneMaster();
//        //    List<MilestoneMaster> fetchData = _masterRepository.Get_MilestoneList(0).ToList();
//        //    milestoneMaster.JsonData = JsonConvert.SerializeObject(fetchData);

//        //    return Json(fetchData);
//        //}
//        //[HttpPost]

//        //public ActionResult MilestoneMaster(MilestoneMaster milestone)
//        //{

//        //    //if (ModelState.IsValid)
//        //    //{
//        //    MilestoneMaster milestoneMaster = new MilestoneMaster();
//        //    milestone.CreatedBy = HttpContext.Session.GetString("UserName").ToString();
//        //    var Message = _masterRepository.Insert_Milestone(milestone);
//        //    if (Message.ToString() == "Successfully")
//        //    {
//        //        TempData["Milestonemessage"] = "Inserted Successfully";
//        //        TempData["MessageClass"] = "alert-success";
//        //    }
//        //    else if (Message.ToString() == "exit")
//        //    {
//        //        TempData["Milestonemessage"] = "MilestoneName must be unique";
//        //        TempData["MessageClass"] = "alert-danger";
//        //    }
//        //    else if (Message.ToString() == "Updated")
//        //    {
//        //        TempData["Milestonemessage"] = "Milestone Updated Successfully";
//        //        TempData["MessageClass"] = "alert-success";
//        //    }
//        //    else if (Message.ToString() == "dependency")
//        //    {
//        //        TempData["Milestonemessage"] = "Please change the set relation of dependency milestones if you want to make milestones as inactive";
//        //        TempData["MessageClass"] = "alert-danger";
//        //    }

//        //    return Json(Message);
//        //    //}
//        //    //else
//        //    //{
//        //    //    //IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);

//        //    //    TempData["Milestonemessage"] = "Milestone Updated Successfully";
//        //    //    TempData["MessageClass"] = "alert-success";
//        //    //    return Json("");

//        //    //}


//        //}

//        //public ActionResult MilestoneMappingValidation(string relation, int projectId)
//        //{
//        //    var fetchData = _masterRepository.PMUMAppingValidationCheck(relation, projectId);
//        //    return Json(fetchData);

//        //}

//        //public ActionResult EditMilestone(int id)
//        //{
//        //    MilestoneMaster milestoneMaster = new MilestoneMaster();
//        //    var fetchData = _masterRepository.Get_MilestoneList(id).ToList();
//        //    milestoneMaster.JsonData = JsonConvert.SerializeObject(fetchData);
//        //    return Json(fetchData);

//        //}
//        //[HttpGet]

//        //public ActionResult PMUMapping()
//        //{
//        //    PMUMapping p = new PMUMapping();
//        //    var getProjectList = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName").ToString());
//        //    p.ProjectList = getProjectList.Select(m => new SelectListItem { Value = m.ProjectId.ToString(), Text = m.ProjectName });
//        //    var ProjectsunmappedList = _masterRepository.Get_ProjectsunmappedList();
//        //    p.ProjectsunmappedList = ProjectsunmappedList.ToList();
//        //    var ProjectsmappedList = _masterRepository.Get_ProjectsmappedList();
//        //    p.ProjectsmappedList = ProjectsmappedList.ToList();
//        //    p.UserName = HttpContext.Session.GetString("UserName");
//        //    var TemplateList = _masterRepository.Get_TemplateList();
//        //    p.TemplateList = TemplateList.Select(m => new SelectListItem { Value = m.TemplateId, Text = m.TemplateName });
//        //    var projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName").ToString());
//        //    HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));


//        //    return View(p);
//        //}
//        //[HttpPost]
//        //public ActionResult MilestonesList(string projectId, string projectName, string clonedProjectId, string clonedProjectName)
//        //{
//        //    HttpContext.Session.SetString("projectName", clonedProjectName);
//        //    HttpContext.Session.SetString("projectId", clonedProjectId.ToString());
//        //    var getMilestoneList = _masterRepository.Get_PMUMappingList(Convert.ToInt32(projectId));
//        //    return Json(getMilestoneList);
//        //}
//        //[HttpPost]
//        //public ActionResult NewProjectmappingList(PMUMapping pMUMapping)
//        //{
//        //    HttpContext.Session.SetString("projectName", pMUMapping.ProjectName);
//        //    HttpContext.Session.SetString("projectId", Convert.ToString(pMUMapping.ProjectId));
//        //    var getMilestoneList = _masterRepository.Get_NewPMUMappingList(pMUMapping.ProjectId);
//        //    p.JsonData = JsonConvert.SerializeObject(getMilestoneList).ToString(); return View(p);
//        //    return Json(getMilestoneList);
//        //}
//        //[HttpPost]
//        //[RequestFormLimits(ValueCountLimit = int.MaxValue)]
//        //[RequestSizeLimit(100_000_000)]
//        //public IActionResult UserList()
//        //{
//        //    var getUserList = _masterRepository.Get_UserList().Select(s => new { s.UserId, s.UserName });
//        //    TempData["UserList"] = _masterRepository.Get_UserList();
//        //    p.JsonData = JsonConvert.SerializeObject(getMilestoneList).ToString(); return View(p);
//        //    return Ok(getUserList);
//        //}
//        [HttpPost]
//        //public ActionResult ApproveProject(int projectId)
//        //{
//        //    var common = _masterRepository.ProjectApproval(projectId);
//        //    TempData["MessageClassPMU"] = common.StyleClass;
//        //    TempData["MessagePMU"] = common.OutMessage;
//        //    return Json("PMUMapping");

//        //}
//        //[HttpPost]

//        //public ActionResult PMUMapping(List<IFormFile> files, string FileName, string Griddata, string TotalSubGridData, string flag, string projectId, int changedmilestoneId, string AccepptVersionCreation, string Version, string DatesPapulationflage, string VersionReamrks, int chnagedSubgridDateId)
//        //{


//        //    List<PMUMapping> gridDataList = JsonConvert.DeserializeObject<List<PMUMapping>>(Griddata);
//        //    List<PMUMapping> FileNameList = JsonConvert.DeserializeObject<List<PMUMapping>>(FileName);

//        //    List<string> Data = new List<string>();

//        //    var uploadedFilename = " ";
//        //    if (files.Count > 0)
//        //    {


//        //        foreach (IFormFile file in files)
//        //        {
//        //            if (file != null)
//        //            {
//        //                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PMUFileUploadLocal"]);

//        //                var FileInfo = new FileInfo(file.FileName.ToString());
//        //                var name = FileInfo.Name;
//        //                if (FileNameList.Any(file => file.FileName == name))
//        //                {

//        //                    var fileName = Path.GetFileNameWithoutExtension(name);
//        //                    var FileExtension = FileInfo.Extension;

//        //                    var newFileName = string.Concat(RemoveSpecialChars(fileName), FileExtension);

//        //                    uploadedFilename = System.Text.Json.JsonSerializer.Serialize(newFileName);

//        //                    var filePath = Path.Combine(uploadsFolder, newFileName);

//        //                    bool existsFolder = Directory.Exists(filePath);

//        //                    if (!existsFolder)
//        //                    {
//        //                        System.IO.Directory.CreateDirectory(uploadsFolder);
//        //                    }

//        //                    Data.Add(uploadedFilename);

//        //                    using (var fileStream = new FileStream(filePath, FileMode.Create))
//        //                    {

//        //                        file.CopyTo(fileStream);
//        //                    }
//        //                }
//        //                else
//        //                {
//        //                    Console.WriteLine(" not exist");
//        //                }


//        //            }
//        //        }
//        //        string Username = HttpContext.Session.GetString("UserName").ToString();
//        //        for (int i = 0; i < gridDataList.Count; i++)
//        //        {
//        //            var gridDatafile = gridDataList[i].FileName;
//        //            List<string> filteredArray = new List<string>();
//        //            //for(var file in )
//        //            if (gridDataList[i].FileName != "")
//        //            {

//        //                // string[] filteredArray = Data.Where(s => s.Contains(gridDataList[i].MilestoneId.ToString())).ToArray();
//        //                for (int j = 0; j <= Data.Count - 1; j++)
//        //                {
//        //                    int milestonelength = gridDataList[i].MilestoneId.ToString().Count();
//        //                    if (Data[j].Substring(1, milestonelength).Equals(gridDataList[i].MilestoneId.ToString()))
//        //                    {
//        //                        filteredArray.Add(Data[j]);
//        //                    }

//        //                    //if(CompareStringWithID(Data[j], gridDataList[i].MilestoneId))
//        //                    //{
//        //                    //    filteredArray.Add(Data[j]);
//        //                    //}
//        //                }

//        //                if (filteredArray.Count > 0)
//        //                {
//        //                    gridDataList[i].FileName = string.Join(", ", filteredArray);
//        //                    gridDataList[i].CreatedBy = Username;
//        //                }

//        //            }
//        //        }
//        //    }
//        //    string updateddata = JsonConvert.SerializeObject(gridDataList);
//        //    var common = _masterRepository.Insert_PMUMapping(updateddata, TotalSubGridData, flag, projectId, changedmilestoneId, AccepptVersionCreation, Version, DatesPapulationflage, HttpContext.Session.GetString("UserName").ToString(), VersionReamrks);
//        //    var common1 = _masterRepository.Insert_SubPMUMapping(TotalSubGridData, flag, projectId, chnagedSubgridDateId, AccepptVersionCreation, Version, DatesPapulationflage, HttpContext.Session.GetString("UserName").ToString());

//        //    TempData["MessageClassPMU"] = common.StyleClass;
//        //    TempData["MessagePMU"] = common.OutMessage;
//        //    return Json(common);

//        //}

//        //[HttpPost]

//        //public ActionResult NewPMUMapping(string Griddata, string flag, string projectId, int changedmilestoneId)
//        //{
//        //    var common = _masterRepository.Insert_NewPMUMapping(Griddata, flag, projectId, changedmilestoneId);
//        //    TempData["MessageClassPMU"] = common.StyleClass;
//        //    TempData["MessagePMU"] = common.OutMessage;
//        //    return Json(common);

//        //}
//        //[HttpPost]
//        //public ActionResult MilestoneBasedDuration(string MilestoneName)
//        //{

//        //    var Duration = _masterRepository.GetDuration(MilestoneName);

//        //    return Json(Duration);

//        //}
//        //public ActionResult NewPMUMapping()
//        //{
//        //    PMUMapping p = new PMUMapping();
//        //    var getMilestoneList = _masterRepository.Get_MilestoneSequnceList();
//        //    if (getMilestoneList != null)
//        //    {
//        //        ViewBag.MilestoneList = getMilestoneList.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.MilestoneName.ToString() });
//        //    }
//        //    //ViewBag.SetRealtion = getSequnceNo.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.MilestoneName.ToString() });
//        //    return View();
//        //}
//        //public ActionResult Template()
//        //{
//        //    var getMilestoneList = _masterRepository.Get_MilestoneSequnceList();

//        //    if (getMilestoneList != null)
//        //    {
//        //        ViewBag.MilestoneList = getMilestoneList.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.MilestoneName.ToString() });
//        //    }
//        //    return View();
//        //}

//        //public ActionResult TemaplateDetailsSave(string TableDetails, string TemplateName)
//        //{
//        //    var result = _masterRepository.Insert_TemplateMaster(TableDetails, TemplateName, HttpContext.Session.GetString("UserName").ToString());
//        //    TempData["MessageClassPMU"] = result.StyleClass;
//        //    TempData["MessagePMU"] = result.OutMessage;
//        //    return Json(result);

//        //}
//        //public ActionResult SelectedTemplateDetails(int TemplateId)
//        //{
//        //    var getMilestoneList = _masterRepository.SelectedTemplateData(TemplateId);
//        //    return Json(getMilestoneList);
//        //}

//        //public ActionResult TemplateList()
//        //{
//        //    var TemplateList = _masterRepository.Get_TemplateList();
//        //    return Json(TemplateList);
//        //}
//        public ActionResult filepath(string fileName)
//        {
//            DateTime fileCreationTime = System.IO.File.GetCreationTime(fileName);
//            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PMUFileUploadLocal"], fileName);
//            return Json(filePath);
//        }

//        public async Task<IActionResult> DownloadPackageImageFile(string fileName)
//        {
//            DateTime fileCreationTime = System.IO.File.GetCreationTime(fileName);
//            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PMUFileUploadLocal"], fileName);
//            var fileBytes = System.IO.File.ReadAllBytes(filePath);
//            var FileName = System.IO.Path.GetFileName(filePath);
//            new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(filePath), out var contentType);
//            return File(fileBytes, contentType ?? "application/octet-stream", FileName);
//            //return  Json(filePath); ;
//        }

//        //public ActionResult DeleteImageFile(string fileName, int ProjectId, int MilestoneId, int rowNo)
//        //{
//        //    var result = "";
//        //    //fileName= "\"" + fileName + "\"";
//        //    var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PMUFileUploadLocal"], fileName.Trim());
//        //    try
//        //    {
//        //        if (System.IO.File.Exists(filePath))
//        //        {
//        //            // If file found, delete it    
//        //            System.IO.File.Delete(filePath);

//        //        }
//        //        result = _masterRepository.DeleteUploadedFile(ProjectId, MilestoneId, fileName, rowNo);

//        //    }
//        //    catch (IOException e)
//        //    {
//        //        Console.WriteLine("An error occurred while deleting the files: " + e.Message);
//        //    }
//        //    return Json(result);
//        //}

//        public ActionResult DisplayUploadedFiles(string ProjectId, string SeqNo, int HubId, string Version, int WBSHeaderId = 0, int TaskId = 0)
//        {
//            var result = _masterRepository.GetFile(ProjectId, SeqNo, HubId, Version, WBSHeaderId, TaskId);
//            return Json(result);
//        }
//        //public ActionResult SubMilestone()
//        //{
//        //    var getMilestoneList = _masterRepository.Get_MilestoneSequnceList();

//        //    if (getMilestoneList != null)
//        //    {
//        //        ViewBag.MilestoneList = getMilestoneList.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.MilestoneName.ToString() });
//        //    }

//        //    MilestoneMaster milestone = new MilestoneMaster();

//        //    var getSequnceNo = _masterRepository.Get_MilestoneSequnceList();
//        //    ViewBag.SetRealtion = getSequnceNo.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.MilestoneName.ToString() });
//        //    var getSequnceNoForDropdown = _masterRepository.SequnceNumberForDropdown();
//        //    ViewBag.SetSequnce = getSequnceNoForDropdown.Select(m => new SelectListItem { Value = m.SequenceNo.ToString(), Text = m.SequenceNo.ToString() });
//        //    return View(milestone);

//        //}
//        //[HttpPost]
//        //public ActionResult SubMilestone(string Griddata)
//        //{
//        //    var result = _masterRepository.Insert_SubMiestoneMaster(Griddata, HttpContext.Session.GetString("UserName").ToString());
//        //    TempData["MessageClassPMU"] = result.StyleClass;
//        //    TempData["MessagePMU"] = result.OutMessage;
//        //    return Json(result);
//        //}

//        //public IActionResult GetSubMilestones(string SequnceNo, string ProjectId)
//        //{
//        //    var GetSubMilestonesList = _masterRepository.GetSubMilestones(SequnceNo, ProjectId);
//        //    return Ok(GetSubMilestonesList);
//        //}
//        //public IActionResult GetSubMilestonesCount(string MilestoneId, string ProjectId, string ParentMilestoneId, int SequnceNo)
//        //{
//        //    var GetSubMilestonesList = _masterRepository.GetSubMilestonesCount(MilestoneId, ProjectId, ParentMilestoneId, SequnceNo);
//        //    return Ok(GetSubMilestonesList);
//        //}
//        //public IActionResult GetProjectSummarySubMilestoneDetails(string projectId, int SequenceNo)
//        //{
//        //    var GetSubMilestonesList = _masterRepository.GetProjectSummarySubMilestoneDetails(HttpContext.Session.GetString("RoleId").ToString(), HttpContext.Session.GetString("UserName").ToString(), projectId, SequenceNo);
//        //    return Ok(GetSubMilestonesList);
//        //}
//        [HttpGet]
//        public IActionResult NewPmuMappings(string SlNo = "", string StartDate = "", string EndDate = "", string PMUVersion = "")
//        {
//            PMUMapping pmumapping = new PMUMapping();
//            pmumapping.ProjectId = Convert.ToInt32(HttpContext.Session.GetString("projectId"));
//            pmumapping.HubId = Convert.ToInt32(HttpContext.Session.GetString("HubId"));
//            pmumapping.MappedprojectList = _masterRepository.GetMappedProjects();
//            pmumapping.MappedhubList = _masterRepository.GetMappedHubs(0);
//            if (PMUVersion != "")
//            {
//                pmumapping.ApprovalStartDate = StartDate;
//                pmumapping.ApprovalEndDate = EndDate;
//                pmumapping.ApprovalVersion = PMUVersion;
//                pmumapping.ApprovalSlNo = SlNo;
//            }
//            return View(pmumapping);
//        }

//        //[HttpPost]
//        //public IActionResult PV_NewPMUMappings(PMUMapping pMUMapping)
//        //{
//        //    HttpContext.Session.SetString("projectName", pMUMapping.ProjectName);
//        //    HttpContext.Session.SetString("projectId", Convert.ToString(pMUMapping.ProjectId));
//        //    HttpContext.Session.SetString("HubId", Convert.ToString(pMUMapping.HubId));
//        //    HttpContext.Session.SetString("HubName", Convert.ToString(pMUMapping.HubName));

//        //    var projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName"));
//        //    HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));

//        //    pMUMapping.CurrentSelectedVersion = pMUMapping.CurrentSelectedVersion == null ? "" : pMUMapping.CurrentSelectedVersion;
//        //    var result = _masterRepository.PMUMappings_GetList(pMUMapping.ProjectId, pMUMapping.IsFromTemplate, pMUMapping.CurrentSelectedVersion, pMUMapping.HubId, pMUMapping.Template_Id);
//        //    HttpContext.Session.SetString("IsWeekEndExclude", Convert.ToString(result.IsWeekendExculded));

//        //    if (pMUMapping.ApprovalSlNo == null || pMUMapping.ApprovalSlNo == "")
//        //    {
//        //        result.RevisedRequestData = "";
//        //        HttpContext.Session.SetString("ApprovalRemarks", "");
//        //    }
//        //    else
//        //    {
//        //        var revisedRequestedDates = _masterRepository.GetRevisedDates_AllRequestData(pMUMapping.ProjectId, Convert.ToInt32(pMUMapping.ApprovalSlNo), pMUMapping.ApprovalVersion,pMUMapping.ApprovalStartDate,pMUMapping.ApprovalEndDate, pMUMapping.HubId);
//        //        result.RevisedRequestData = JsonConvert.SerializeObject(revisedRequestedDates);
//        //    }

//        //    return PartialView(result);
//        //}
//        [HttpPost]
//        public IActionResult CheckForApproval(int projectId, int HubId)
//        {
//            var result = _masterRepository.CheckForApproval(projectId, HubId);
//            return Ok(result);
//        }
//        [HttpPost]
//        public IActionResult DropdownList()
//        {
//            var list = _masterRepository.PMUMappings_DropdownList();
//            return Ok(new { WBSHeader = list.Item1, Task = list.Item2, Resources = list.Item3, Template = list.Item4 });
//        }
//        //[HttpPost]
//        //public IActionResult SavePMUMappings()
//        //{
//        //    var files = Request.Form.Files;
//        //    foreach (var file in files)
//        //    {
//        //        if (file.Length > 0)
//        //        {
//        //            string[] fileDetails = file.Name.Split("_");
//        //            var fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads", fileDetails[0], fileDetails[1]);
//        //            if (!Directory.Exists(fileDirectory))
//        //                Directory.CreateDirectory(fileDirectory);
//        //            var extension= Path.GetExtension(file.FileName);
//        //            var filePath = Path.Combine(fileDirectory, file.Name+ file.FileName).Replace(" "," ");

//        //            using (var stream = new FileStream(filePath, FileMode.Create))
//        //            {
//        //                file.CopyTo(stream);
//        //            }
//        //        }
//        //    }
//        //    var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
//        //    var pMUVersion = Convert.ToString(Request.Form["PMUVersion"]);
//        //    var isLatest = Convert.ToBoolean(Request.Form["IsLatest"]);
//        //    var projectId = Convert.ToInt32(Request.Form["ProjectId"]);
//        //    var hubId = Convert.ToInt32(Request.Form["HubId"]);
//        //    var IsWeekendExcluded = Convert.ToBoolean(Request.Form["IsWeekendExcluded"]);
//        //    //var IsAutoSave = Convert.ToBoolean(Request.Form["IsAutoSave"]);
//        //    var changedslNo = Convert.ToString(Request.Form["ChangedSlInfo"]);
//        //    //var result = _masterRepository.SavePMUMappings(jsonObject, HttpContext.Session.GetString("UserName"), pMUVersion,isLatest,projectId, IsWeekendExcluded,hubId, changedslNo);
//        //    var projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName"));
//        //    HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));
//        //    if (result.ToLower().Contains("success"))
//        //    {
//        //        TempData["Message"] = result;
//        //        TempData["MessageClass"] = "alert-success";
//        //    }
//        //    return Ok(result);
//        //}

//        [HttpPost]
//        public IActionResult SaveNewWBSHeaderTask(string newData, string type, bool kpitask)
//        {
//            var UserName = HttpContext.Session.GetString("UserName");
//            var result = _masterRepository.SaveNewWBSHeaderTask(newData, type, kpitask, UserName);
//            return Ok(new { result.Item1, result.Item2 });
//        }

//        [HttpPost]
//        public IActionResult DeleteWBSHeaderTask(int deleteId, string type)
//        {
//            var UserName = HttpContext.Session.GetString("UserName");
//            var result = _masterRepository.DeleteWBSHeaderTask(deleteId, type, UserName);
//            return Ok(new { result });
//        }

//        [HttpPost]
//        public IActionResult SaveNewTemplate()
//        {
//            var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
//            var TemplateName = Convert.ToString(Request.Form["TemplateName"]);
//            var result = _masterRepository.SavePMUMappingsNewTemplate(jsonObject, TemplateName, HttpContext.Session.GetString("UserName"));
//            return Ok(result);
//        }
//        [HttpPost]
//        //public IActionResult AutoSavePMUMappings()
//        //{
//        //    var files = Request.Form.Files;
//        //    foreach (var file in files)
//        //    {
//        //        if (file.Length > 0)
//        //        {
//        //            string[] fileDetails = file.Name.Split("_");
//        //            var fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads", fileDetails[0], fileDetails[1]);
//        //            if (!Directory.Exists(fileDirectory))
//        //                Directory.CreateDirectory(fileDirectory);
//        //            var extension = Path.GetExtension(file.FileName);
//        //            var filePath = Path.Combine(fileDirectory, file.Name + file.FileName).Replace(" ", " ");

//        //            using (var stream = new FileStream(filePath, FileMode.Create))
//        //            {
//        //                file.CopyTo(stream);
//        //            }
//        //        }
//        //    }
//        //    var jsonObject = Convert.ToString(Request.Form["PMUMappings"]);
//        //    var pMUVersion = Convert.ToString(Request.Form["PMUVersion"]);
//        //    var isLatest = Convert.ToBoolean(Request.Form["IsLatest"]);
//        //    var projectId = Convert.ToInt32(Request.Form["ProjectId"]);
//        //    var hubId = Convert.ToInt32(Request.Form["HubId"]);
//        //    var IsWeekendExcluded = Convert.ToBoolean(Request.Form["IsWeekendExcluded"]);
//        //    var result = _masterRepository.AutoSavePMUMappings(jsonObject, HttpContext.Session.GetString("UserName"), pMUVersion, isLatest, projectId, IsWeekendExcluded, hubId);
//        //    return Ok(result);
//        //}
//        [HttpPost]
//        public IActionResult SaveNotes(int HubId, int ProjectId, string Notes)
//        {
//            var result = _masterRepository.AddNotes(HubId, ProjectId, Notes, HttpContext.Session.GetString("UserName"));
//            return Ok(result);
//        }
//        [HttpGet]
//        public IActionResult GetNotes(int HubId, int ProjectId)
//        {
//            var result = _masterRepository.GetNotes(HubId, ProjectId);
//            return Ok(result);
//        }
//        [HttpGet]
//        public IActionResult GetNewPMUMappingsExcelData(int ProjectId, int HubId)
//        {
//            NewPMUMappings newPMUMappings = new NewPMUMappings();
//            newPMUMappings = _masterRepository.PMUMappings_GetList(ProjectId, false, "", HubId, 0);
//            return Ok(newPMUMappings.PMUMappingDetails);
//        }
//        [HttpGet]
//        public JsonResult GetNewPMUMappingsHubData(int ProjectId)
//        {
//            var result = _masterRepository.GetMappedHubs(ProjectId);
//            var data = result.GroupBy(test => test.Value)
//                   .Select(grp => grp.First())
//                   .ToList().Distinct();
//            return Json(data, new System.Text.Json.JsonSerializerOptions());
//        }
//        //[HttpPost]
//        //public IActionResult PV_CloneNewPMUMappings(PMUMapping pMUMapping)
//        //{
//        //    var result = _masterRepository.PMUMappingsClone_GetList(pMUMapping.ProjectId,"", pMUMapping.HubId,pMUMapping.ApprovedLatestVersion);
//        //    HttpContext.Session.SetString("IsWeekEndExclude", Convert.ToString(result.IsWeekendExculded));
//        //    return PartialView(result);
//        //}
//    }
//}