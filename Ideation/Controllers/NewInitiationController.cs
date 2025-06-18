//using Grpc.Core;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using Grpc.Core;
using Ideation.Common;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using iTextSharp.tool.xml.html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.PowerBI.Api.Models;
using Newtonsoft.Json;
using System.Data;
using System.Drawing;
using System.Text;
using System.Text.RegularExpressions;


namespace Ideation.Controllers
{
    [SessionExpire]
    [AuthorizeActionFilter]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class NewInitiationController : BaseController
    {

        private readonly IConfiguration? Configuration;

        private readonly IWebHostEnvironment webHostEnvironment;
        public static string isLocal = AppSettingsPath.AppPathDetails.IsLocal;
        public static string isQA = AppSettingsPath.AppPathDetails.IsQA;
        public INpdRepository npdRepository;
        public IPackageInitiativeRepository PackageInitiativeRepository;
        IMasterRepository master;
        public IReformulationRepository reformulationRepository;
        private readonly IHttpContextAccessor httpContextAccessor;


        public NewInitiationController(IWebHostEnvironment webHostEnvironment, INpdRepository npdRepository, IMasterRepository master, IPackageInitiativeRepository PackageInitiativeRepository, IReformulationRepository reformulationRepository, IConfiguration Configuration,
           IHttpContextAccessor httpContextAccessor)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.npdRepository = npdRepository;
            this.master = master;
            this.PackageInitiativeRepository = PackageInitiativeRepository;
            this.reformulationRepository = reformulationRepository;
            this.Configuration = Configuration;
            this.httpContextAccessor = httpContextAccessor;
        }


        public void LogError(string controller, string action, Exception ex)
        {

            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });

        }
        [MenuAccess("ProjectBrief List")]

        public IActionResult NewInitiation()
        {
            //throw new Exception();
            NewInitiation data = new NewInitiation();
            PBMasters masters = master.GetPBMasters();

            var empId = HttpContext.Session.GetString("UserName");
            var RoleId = HttpContext.Session.GetString("RoleId");
            var Role = HttpContext.Session.GetString("Role");
            data.HubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });
            data.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            data.StatusList = masters.StatusList.Select(m => new SelectListItem { Text = m.StatusName, Value = m.StatusId.ToString() });
            data.ProjectList = masters.ProjectList.Select(m => new SelectListItem { Text = m.ProjectName, Value = m.ProjectId.ToString() });
            data.RoleId = RoleId;
            data.Role = Role;
            data.empId = empId;

            var year = HttpContext.Session.GetString("SearchedYear");

            if(year != null)
            {
                data.SearchedYear = year;
            }

            if (ViewBag.IsEdit != null)
            {
                data.IsEdit = ViewBag.IsEdit ? true : false;
            }
            if (ViewBag.IsEdit != null)
            {
                data.IsRead = ViewBag.IsRead ? true : false;
            }
            return View(data);
        }
        public IActionResult Send()
        {
            TempData["Messageclass"] = "alert-primary";
            TempData["Message"] = "Sucessfully Updated";
            return RedirectToAction("NewInitiation");
        }
        public IActionResult Reject()
        {
            TempData["Messageclass"] = "alert-danger";
            TempData["Message"] = "Sucessfully Updated";
            return RedirectToAction("NewInitiation");
        }
        public IActionResult Approve()
        {
            TempData["Messageclass"] = "alert-success";
            TempData["Message"] = "Project Brief Saved Successfully";
            return RedirectToAction("NewInitiation");
        }
        [MenuAccess("NPD")]
        [HttpGet]
        public IActionResult NewProduction()
        {
            try
            {
                PBMasters masters = master.GetPBMasters();
                NPD npd = new NPD();

                var userName = HttpContext.Session.GetString("UserName");

                var divisionList = PackageInitiativeRepository.GetDivision(userName);

                npd.DivisionList = divisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionId) });
                npd.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryId) });
                npd.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = Convert.ToString(m.CurrencyName) });
                npd.IsEdit = ViewBag.IsEdit ? true : false;
                npd.IsRead = ViewBag.IsRead ? true : false;
                npd.Role = HttpContext.Session.GetString("Role");
                npd.UserName = userName;

                PBMasters KDSData = master.GetKDSMasterData();
                npd.MoldList= KDSData.MoldList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.ProjectCategorizationList= KDSData.ProjectCategorizationList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.ComplexityToBeAssignedList= KDSData.ComplexityToBeAssignedList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.RAndDNameList= KDSData.RAndDNameList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.ProjectPriorityList= KDSData.ProjectPriorityList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });

                return View(npd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        // [ValidateAntiForgeryToken]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]

        public IActionResult NewProduction(NPD npd)
        {
            string controllerName = "NewInitiation";
            string actionName = "NewProduction";
            LogError(controllerName, actionName, new Exception("Request to save NPD form is initiated in NewInitiation Controller"));

            try
            {
                PBMasters masters = master.GetPBMasters();

                var userName = HttpContext.Session.GetString("UserName");
                npd.UserName = userName;

                var divisionList = PackageInitiativeRepository.GetDivision(userName);

                npd.DivisionList = divisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionId) });
                npd.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryId) });
                npd.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = Convert.ToString(m.CurrencyName) });
                if (npd.ProjectId == "" || npd.ProjectId == null)
                {
                    string result = npdRepository.UploadNpdData(npd);

                }
                else
                {
                    npdRepository.UpdateNpdData(npd);

                }
                return RedirectToAction("NewInitiation", "NewInitiation");
            }
            catch (Exception ex)
            {
                //throw new System.Exception(ex.Message);
                //throw new System.Exception(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [MenuAccess("NPD")]
        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult EditProduction(string projectId, string status, string icon)
        {
            var initiatorHub = "";

            try
            {
                var userName = HttpContext.Session.GetString("UserName");
                var hub = HttpContext.Session.GetString("Hub");

                NPD npd = new NPD();

                npd.Icon = icon;

                PBMasters masters = master.GetPBMasters();

                npd.ProjectId = projectId;
                var npdData = npdRepository.GetNpdData(projectId);

                foreach (var data in npdData.NpdHeaderTable)
                {
                    if (data.ReceivedDate != null)
                    {
                        npd.ReceivedDate = data.ReceivedDate;

                    }
                }

                var statusName = npdData.StatusNameDb.ElementAt(0).StatusName;
                var statusId = Convert.ToInt32(npdData.StatusNameDb.ElementAt(0).StatusId);

                if (icon == "View" && statusId == 3)
                {
                    statusId = statusId + 1;
                }

                npd.CurrentStatusId = Convert.ToString(statusId);

                if ((npdData.NpdHeaderTable).Count() > 0)
                {
                    initiatorHub = npdData.NpdHeaderTable.ElementAt(0).Hub;
                }

                npd.CurrentStatusName = statusName;

                //if the status is Draft or Sent Back to Initiator
                if ((statusId == 1 || statusId == 8 || statusId == 9) && icon != "View")
                {
                    var divisionList = PackageInitiativeRepository.GetDivision(userName);
                    npd.DivisionList = divisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionId) });
                }
                else
                {
                    npd.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionId) });
                }

                npd.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryId) });
                npd.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = Convert.ToString(m.CurrencyName) });

                masters.HubList = masters.HubList.Where(m => m.HubName != initiatorHub && m.HubName != "HGML").ToList();
                npd.HgmlDataHubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = Convert.ToString(m.HubId) });


                PBMasters KDSData = master.GetKDSMasterData();
                npd.MoldList = KDSData.MoldList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.ProjectCategorizationList = KDSData.ProjectCategorizationList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.ComplexityToBeAssignedList = KDSData.ComplexityToBeAssignedList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.RAndDNameList = KDSData.RAndDNameList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
                npd.ProjectPriorityList = KDSData.ProjectPriorityList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });


                //if the status is HGML Review or HUB Review
                if (statusId == 2 || statusId == 3 || statusId == 13)
                {
                    var hgmlReviewData = npdRepository.GetHgmlReviewData(projectId);
                    var jsonFormHgmlReviewData = JsonConvert.SerializeObject(hgmlReviewData);

                    npd.JsonFormNpdHgmlReviewData = jsonFormHgmlReviewData;
                }

                //if the status is HUB Review
                if (statusId == 3)
                {
                    var hubReviewData = npdRepository.GetNpdHubReviewData(projectId, userName);
                    var jsonFormHubReviewData = JsonConvert.SerializeObject(hubReviewData);
                    npd.JsonFormNpdHubReviewData = jsonFormHubReviewData;

                }

                //if the status is HGML Approve or Rejected
                if (statusId == 4 || statusId == 7 || statusId == 14)
                {
                    var hgmlApproveData = npdRepository.GetNpdHgmlApproveData(projectId);
                    var jsonFormHgmlApproveData = JsonConvert.SerializeObject(hgmlApproveData);
                    npd.JsonFormNpdHgmlApproveData = jsonFormHgmlApproveData;
                }

                //if the status is Fine Screening Review(PMD Review) or Approved
                if (statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12)
                {
                    var hgmlApproveData = npdRepository.GetNpdHgmlApproveData(projectId);
                    var jsonFormNpdHgmlApproveData = JsonConvert.SerializeObject(hgmlApproveData);
                    npd.JsonFormNpdHgmlApproveData = jsonFormNpdHgmlApproveData;

                    var pmdReviewData = npdRepository.GetNpdPmdReviewData(projectId);
                    var jsonFormNpdPmdReviewData = JsonConvert.SerializeObject(pmdReviewData);
                    npd.JsonFormNpdPmdReviewData = jsonFormNpdPmdReviewData;
                }
                var jsonFormNpdData = JsonConvert.SerializeObject(npdData);
                npd.JsonFormNpdData = jsonFormNpdData;

                foreach (var data in npdData.NpdHeaderTable)
                {
                    npd.Status = data.Status;
                    npd.Division = data.Division;
                    npd.Category = data.Category;
                }

                npd.IsEdit = ViewBag.IsEdit ? true : false;
                npd.IsRead = ViewBag.IsRead ? true : false;
                npd.Role = HttpContext.Session.GetString("Role");
                ViewBag.StatusId = statusId;
                ViewBag.IconName = icon;

                return View(npd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult EditProduction(NPD npd)
        {
            NPD npdData = new NPD();

            string controllerName = "NewInitiation";
            string actionName = "EditProduction";
            LogError(controllerName, actionName, new Exception("Request to save EditProduction form is initiated in NewInitiation Controller"));

            var userName = HttpContext.Session.GetString("UserName");
            npdData.UserName = userName;

            try
            {
                //string a = Session("Hub");
                if ((npd.Status == 1 || npd.Status == 2 || npd.Status == 8 || npd.Status == 9 || npd.Status == 5 || npd.Status == 16 || npd.Status == 11) && (npd.CurrentStatusName == "New" || npd.CurrentStatusName == "Pending For Approval" || npd.CurrentStatusName == "Brief Demoted to Initiator" || npd.CurrentStatusName== "Sent Back to Initiator"))
                {
                    npdRepository.UpdateNpdData(npd);
                }
                if ((npd.Status == 2 || npd.Status == 3 || npd.Status == 5 || npd.Status == 16 || npd.Status == 7 || npd.Status == 8 || npd.Status == 13) && (npd.CurrentStatusName == "HGML Review" || npd.CurrentStatusName == "Brief Demoted to HGML Review"))
                {
                    npdData = npdRepository.UploadNpdHgmlReviewData(npd);
                }
                if ((npd.Status == 4 || npd.Status == 3) && npd.CurrentStatusName == "HUB Review")
                {
                    npdRepository.UploadNpdHubReviewData(npd);
                }
                if ((npd.Status == 4 || npd.Status == 3 || npd.Status == 5 || npd.Status == 16 || npd.Status == 7 || npd.Status == 14) && (npd.CurrentStatusName == "HGML Approve" || npd.CurrentStatusName == "Brief Demoted to HGML Approve"))
                {
                    npdData = npdRepository.UploadNpdHgmlApproveData(npd);
                }
                if ((npd.Status == 2 || npd.Status == 4 || npd.Status == 5 || npd.Status == 16 || npd.Status == 6 || npd.Status == 12 || npd.Status == 11 || npd.Status == 13 || npd.Status == 14) && npd.CurrentStatusName == "Fine Screening Review"|| npd.CurrentStatusName == "Under Exploration")
                {
                    npdData = npdRepository.UploadNpdPmdReviewData(npd);
                }

                TempData["Message"] = npdData.OutMessage;
                TempData["Messageclass"] = npdData.StyleClass;

                return RedirectToAction("NewInitiation", "NewInitiation");
            }
            catch (Exception ex)
            {
                //throw new System.Exception(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        public async Task<IActionResult> DownloadImageFile(string fileName)
        {
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:NPDFileUploadLocal"], fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var fileNameWithoutPath = System.IO.Path.GetFileName(filePath);
            new FileExtensionContentTypeProvider().TryGetContentType(fileNameWithoutPath, out var contentType);

            return File(fileBytes, contentType ?? "application/octet-stream", fileNameWithoutPath);
        }

        [HttpPost]
        public JsonResult SaveImageFile(IFormFile file)
        {
            var Data = "";

            if (file != null)
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:NPDFileUploadLocal"]);


                var FileInfo = new FileInfo(file.FileName.ToString());
                var name = FileInfo.Name;
                var fileName = Path.GetFileNameWithoutExtension(name);
                var FileExtension = FileInfo.Extension;

                var newFileName = string.Concat(RemoveSpecialChars(fileName), FileExtension);



                var filePath = Path.Combine(uploadsFolder, newFileName);

                bool existsFolder = Directory.Exists(filePath);

                if (!existsFolder)
                {
                    System.IO.Directory.CreateDirectory(uploadsFolder);
                }

                Data = System.Text.Json.JsonSerializer.Serialize(newFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                return Json(Data);
            }
            else
            {
                return Json(Data);
            }
        }

        public void DeleteImageFile(string fileName)
        {
            try
            {
                //var filePath = Path.Combine(webHostEnvironment.WebRootPath, "NPD images", fileName);

                var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:NPDFileUploadLocal"], fileName);

                // Check if file exists with its full path
                if (System.IO.File.Exists(filePath))
                {
                    // If file found, delete it    
                    System.IO.File.Delete(filePath);
                }
            }
            catch (IOException ioExp)
            {
                Console.WriteLine(ioExp.Message);
            }
        }

       
        [EncryptedActionParameter]
        public IActionResult HGMLReview(string projectId)
        {
            NPD npd = new NPD();
            PBMasters masters = master.GetPBMasters();
            npd.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            npd.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });

            npd.HgmlDataHubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });
            //npd.HgmlDataHubUsersList=npdRepository

            npd.ProjectId = projectId;

            var npdData = npdRepository.GetNpdData(projectId);
            var jsonFormNpdData = JsonConvert.SerializeObject(npdData);

            foreach (var data in npdData.NpdHeaderTable)
            {
                npd.Division = data.Division;
                npd.Category = data.Category;
            }

            var hgmlReviewData = npdRepository.GetHgmlReviewData(projectId);
            var jsonFormHgmlReviewData = JsonConvert.SerializeObject(hgmlReviewData);

            npd.JsonFormNpdData = jsonFormNpdData;
            npd.JsonFormNpdHgmlReviewData = jsonFormHgmlReviewData;

            return View(npd);
        }

        [HttpPost]
        public IActionResult HGMLReview(NPD npd)
        {
            npdRepository.UploadNpdHgmlReviewData(npd);
            return RedirectToAction("NewInitiation", "NewInitiation");
        }

        [EncryptedActionParameter]
        public IActionResult PendingWithHGML(string projectId)
        {
            NPD npd = new NPD();
            PBMasters masters = master.GetPBMasters();

            npd.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            npd.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });

            npd.ProjectId = projectId;

            var npdData = npdRepository.GetNpdData(projectId);
            var jsonFormNpdData = JsonConvert.SerializeObject(npdData);

            foreach (var data in npdData.NpdHeaderTable)
            {
                npd.Division = data.Division;
                npd.Category = data.Category;
            }

            npd.JsonFormNpdData = jsonFormNpdData;
            return View(npd);
        }
        [MenuAccess("Reformulation")]
        public IActionResult Reformulation()
        {
            PBMasters masters = master.GetPBMasters();
            Reformulation reformulation = new Reformulation();

            var userName = HttpContext.Session.GetString("UserName");

            var masters1 = PackageInitiativeRepository.GetDivision(userName);
            // var masters2 = PackageInitiativeRepository.GetCategory(userName);

            reformulation.DivisionList = masters1.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });

            //   reformulation.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            reformulation.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });
            reformulation.IsEdit = ViewBag.IsEdit ? true : false;
            reformulation.IsRead = ViewBag.IsRead ? true : false;
            reformulation.UserName=userName;
            reformulation.Role = HttpContext.Session.GetString("Role");

            PBMasters KDSData = master.GetKDSMasterData();
            reformulation.MoldList = KDSData.MoldList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.ProjectCategorizationList = KDSData.ProjectCategorizationList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.ComplexityToBeAssignedList = KDSData.ComplexityToBeAssignedList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.RAndDNameList = KDSData.RAndDNameList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.ProjectPriorityList = KDSData.ProjectPriorityList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });

            return View(reformulation);
        }
        [HttpPost]
        public IActionResult Reformulation(Reformulation reformulation)
        {
            try
            {
                PBMasters masters = master.GetPBMasters();
                var userName = HttpContext.Session.GetString("UserName");

                var masters1 = PackageInitiativeRepository.GetDivision(userName);
                // var masters2 = PackageInitiativeRepository.GetCategory(userName);

                reformulation.DivisionList = masters1.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
                reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
                reformulation.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });
                if (reformulation.ProjectId == "" || reformulation.ProjectId == null)
                {
                    string result = reformulationRepository.UploadReformulationData(reformulation);
                }
                else
                {
                    reformulationRepository.UpdateReformulationData(reformulation);

                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "Reformulation", e);
            }
            return RedirectToAction("NewInitiation", "NewInitiation");
        }

        [HttpGet]
        [MenuAccess("Reformulation")]
        [EncryptedActionParameter]
        public IActionResult EditReformulation(string projectId, string Status = "", string StatusId = "")
        {
            var userName = HttpContext.Session.GetString("UserName");
            var hub = HttpContext.Session.GetString("Hub");
            var Role = HttpContext.Session.GetString("Role");
            var ManagerId = HttpContext.Session.GetString("ManagerId");

            PBMasters masters = master.GetPBMasters();

            Reformulation reformulation = new Reformulation();
            reformulation.Role = Role;
            reformulation.ProjectId = projectId;
            reformulation.HUBName = hub;

            reformulation.StatusList = JsonConvert.SerializeObject(masters.StatusList);
            reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            reformulation.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });

            var reformulationData = reformulationRepository.GetReformulationData(reformulation.ProjectId, reformulation.HUBName);
            var statusName = reformulationData.ReformulationTableData.ElementAt(0).Status;
            var initiatorHub = reformulationData.ReformulationTableData.ElementAt(0).Hub;
            reformulation.statusName = statusName;
            reformulation.StatusId = StatusId;

            foreach (var data in reformulationData.ReformulationTableData)
            {
                if (data.ReceivedDate != null)
                {
                    reformulation.ReceivedDate = data.ReceivedDate;
                }
            }


            if (StatusId == "1" || StatusId == "8" || StatusId == "9" || StatusId == "11" && Status != "View")
            {
                var masters1 = PackageInitiativeRepository.GetDivision(userName);
                reformulation.DivisionList = masters1.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            }
            else
            {
                reformulation.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            }


            masters.HubList = masters.HubList.Where(m => m.HubName != initiatorHub && m.HubName != "HGML").ToList();
            reformulation.HgmlDataHubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });


            var hgmlApprovalStages = reformulationRepository.GetApprovalStages(projectId);

            var jsonFormHgmlApprovalStagesData = JsonConvert.SerializeObject(hgmlApprovalStages);
            reformulation.JsonFormReformulationApprovalStagesData = jsonFormHgmlApprovalStagesData;

            var hgmlReviewData = reformulationRepository.GetHgmlReviewData(projectId);
            var jsonFormHgmlReviewData = JsonConvert.SerializeObject(hgmlReviewData);
            reformulation.JsonFormReformulationHgmlReviewData = jsonFormHgmlReviewData;
            
            PBMasters KDSData = master.GetKDSMasterData();
            reformulation.MoldList = KDSData.MoldList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.ProjectCategorizationList = KDSData.ProjectCategorizationList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.ComplexityToBeAssignedList = KDSData.ComplexityToBeAssignedList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.RAndDNameList = KDSData.RAndDNameList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            reformulation.ProjectPriorityList = KDSData.ProjectPriorityList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });

            if (StatusId == "2" || StatusId == "13")
            {
                var hgmlReviewDatas = reformulationRepository.GetHgmlReviewData(projectId);
                var jsonFormHgmlReviewDatas = JsonConvert.SerializeObject(hgmlReviewDatas);
                reformulation.HgmlData = jsonFormHgmlReviewDatas;


                //foreach (var data in hgmlReviewDatas.HgmlDataList)
                //{
                //    reformulation.Hubs = data.Hub;
                //}
                //// pack.HubForDropDown = String.IsNullOrWhiteSpace(pack.Hubs) ? new string[0] : pack.Hubs.Replace(" ", "").Split(',');

                //foreach (var data in hgmlReviewDatas.HgmlDataList)
                //{
                //    reformulation.HubUsers = data.HubUsers;
                //}

                //pack.hubuser = String.IsNullOrWhiteSpace(pack.HubUsers) ? new string[0] : pack.HubUsers.Replace(" ", "").Split(',');

            }
            var jsonReformulationData = JsonConvert.SerializeObject(reformulationData);
            foreach (var data in reformulationData.ReformulationTableData)
            {
                reformulation.Division = data.Division;
                reformulation.Category = data.Category;
                reformulation.Status = data.Status;

            }
            foreach (var data in reformulationData.ReformulationProjectDetails)
            {
                reformulation.BenchMarkSampleImage = data.BenchmarkImage;

            }

            //if (statusName == "Rejected") { }

            if (StatusId == "4" || StatusId == "5" || StatusId == "16" || StatusId == "3" || StatusId == "6" || StatusId == "7"|| StatusId == "12"|| StatusId == "14")
            {
                if (StatusId == "3")
                {
                    var hubReviewData = reformulationRepository.GetHUBReviewData(projectId, statusName, userName, Status, Role);
                    var jsonFormHubReviewData = JsonConvert.SerializeObject(hubReviewData);
                    reformulation.HubApprove = hubReviewData.HubApprove;
                    reformulation.JsonFormReformulationHubReviewData = jsonFormHubReviewData;

                }
                else
                {
                    var hubReviewData = reformulationRepository.GetHUBReviewData(projectId);
                    var jsonFormHubReviewData = JsonConvert.SerializeObject(hubReviewData);
                    reformulation.JsonFormReformulationHubReviewData = jsonFormHubReviewData;

                    var pmdReviewData = reformulationRepository.GetReformulationPmdReviewData(projectId);
                    var jsonFormPmdReviewData = JsonConvert.SerializeObject(pmdReviewData);
                    reformulation.JsonFormReformulationPmdReviewData = jsonFormPmdReviewData;


                }

                var hubBusinessData = reformulationRepository.GetReformulationHubData(projectId);
                var jsonFormHubBusinessData = JsonConvert.SerializeObject(hubBusinessData);
                reformulation.JsonFormReformulationHubBusinessData = jsonFormHubBusinessData;


            }
            reformulation.ReformulationJSON = jsonReformulationData;
            reformulation.ViewStatus = Status;
            reformulation.IsEdit = ViewBag.IsEdit ? true : false;
            reformulation.IsRead = ViewBag.IsRead ? true : false;
            reformulation.UserName = userName;
            return View(reformulation);

        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult EditReformulation(Reformulation reformulation)
        {
            try
            {
                var userName = HttpContext.Session.GetString("UserName");
                reformulation.UserName = userName;
                PBMasters masters = master.GetPBMasters();
                reformulation.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
                reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
                if ((reformulation.StatusValue == 1 || reformulation.StatusValue == 0 || reformulation.StatusValue == 8 || reformulation.StatusValue == 2 || reformulation.StatusValue == 9) && reformulation.StatusId == "8" || reformulation.StatusId == "1" || reformulation.StatusId == "9" || reformulation.StatusId == "11")
                {
                    reformulationRepository.UpdateReformulationData(reformulation);
                }
                else if ((reformulation.StatusValue == 2 || reformulation.StatusValue == 3 || reformulation.StatusValue == 5 || reformulation.StatusValue == 16 || reformulation.StatusValue == 7 || reformulation.StatusValue == 8)
                            && reformulation.StatusId == "2" || reformulation.StatusId == "13" || reformulation.StatusId == "14")
                {
                    var result = reformulationRepository.UploadHGMLReview(reformulation);

                    TempData["Message"] = result.Item1;
                    TempData["Messageclass"] = result.Item2;

                    //if (result != "Request has been updated successfully")
                    //{
                    //    TempData["Message"] = result;
                    //    TempData["Messageclass"] = "alert-danger";
                    //}
                    //else
                    //{
                    //    TempData["Message"] = result;
                    //    TempData["Messageclass"] = "alert-success";
                    //}
                }
                else if ((reformulation.StatusValue == 3 || reformulation.StatusValue == 4) && reformulation.StatusId == "3")
                {
                    reformulationRepository.UploadHUBReview(reformulation);
                }
                else if (reformulation.StatusId == "4")
                {
                    var result = reformulationRepository.UploadHGMLReview(reformulation);
                    TempData["Message"] = result.Item1;
                    TempData["Messageclass"] = result.Item2;
                    //if (result != "Request has been updated successfully")
                    //{
                    //    TempData["Message"] = result;
                    //    TempData["Messageclass"] = "alert-danger";
                    //}
                    //else
                    //{
                    //    TempData["Message"] = result;
                    //    TempData["Messageclass"] = "alert-success";
                    //}
                }
                else if (reformulation.StatusId == "5" || reformulation.StatusId == "16" || reformulation.StatusId == "6"|| reformulation.StatusId == "12"|| reformulation.StatusId == "11")
                {

                    var result = reformulationRepository.UploadReformulationPmdReviewData(reformulation);
                    TempData["Message"] = result.Item1;
                    TempData["Messageclass"] = result.Item2;
                    //if (result != "Request has been updated successfully")
                    //{
                    //    TempData["Message"] = result;
                    //    TempData["Messageclass"] = "alert-danger";
                    //}
                    //else
                    //{
                    //    TempData["Message"] = result;
                    //    TempData["Messageclass"] = "alert-success";
                    //}
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "Reformulation", e);

            }
            return RedirectToAction("NewInitiation", "NewInitiation");

        }

        [MenuAccess("Packaging Initiative")]
        [HttpGet]
        public IActionResult PackageIntiatives()
        {
            PBMasters masters = master.GetPBMasters();
            PackageInitiatives pack = new PackageInitiatives();

            var userName = HttpContext.Session.GetString("UserName");

            var masters1 = PackageInitiativeRepository.GetDivision(userName);
            // var masters2 = PackageInitiativeRepository.GetCategory(userName);

            pack.DivisionList = masters1.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            pack.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });

            PBMasters KDSData = master.GetKDSMasterData();
            pack.MoldList = KDSData.MoldList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.ProjectCategorizationList = KDSData.ProjectCategorizationList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.ComplexityToBeAssignedList = KDSData.ComplexityToBeAssignedList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.RAndDNameList = KDSData.RAndDNameList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.ProjectPriorityList = KDSData.ProjectPriorityList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });

            // pack.CategoryList = masters2.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            pack.IsEdit = ViewBag.IsEdit ? true : false;
            pack.IsRead = ViewBag.IsRead ? true : false;
            pack.Role = HttpContext.Session.GetString("Role");
            pack.UserName = userName;
            return View(pack);
        }



        [HttpPost]
        //[ValidateAntiForgeryToken]

        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult PackageIntiatives(PackageInitiatives packageData)
        {
            try
            {
                PBMasters masters = master.GetPBMasters();
                packageData.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
                packageData.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
                packageData.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });
                if (packageData.ProjectId == "" || packageData.ProjectId == null)
                {
                    string result = PackageInitiativeRepository.InsertPackageData(packageData);
                }
                else
                {
                    PackageInitiativeRepository.UpdatePackageInitiativeData(packageData);
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "PackageIntiatives", e);
            }
            return RedirectToAction("NewInitiation", "NewInitiation");
        }

        public async Task<IActionResult> DownloadPackageImageFile(string fileName)
        {
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PackageInitiativesImageUploadLocal"], fileName);
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var FileName = System.IO.Path.GetFileName(filePath);
            new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(filePath), out var contentType);
            return File(fileBytes, contentType ?? "application/octet-stream", FileName);
        }

        [HttpPost]
        public ActionResult SavePackageInitiativesImageFile(IFormFile file)
        {
            var Data = "";
            if (file != null)
            {
                var uploadFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PackageInitiativesImageUploadLocal"]);

                var FileInfo = new FileInfo(file/*[i]*/.FileName.ToString());
                var name = FileInfo.Name;
                var namewithoutex = Path.GetFileNameWithoutExtension(name);
                var filename1 = RemoveSpecialChars(namewithoutex);
                // var date = DateTime.Now.ToString("dd-MM-yy HH-mm-ss");
                var fileName = filename1 + FileInfo.Extension;
                var filePath = Path.Combine(uploadFolder, fileName);
                bool FolderExists = System.IO.Directory.Exists(filePath);

                if (!FolderExists)
                {
                    System.IO.Directory.CreateDirectory(uploadFolder);
                }

                Data = System.Text.Json.JsonSerializer.Serialize(fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                //}
                return Json(Data);
            }
            else
            {
                return Json(Data);
            }
        }
        public void DeletePackImageFile(string fileName)
        {
            try
            {
                var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:PackageInitiativesImageUploadLocal"], fileName);
                if (System.IO.File.Exists(filePath))
                {

                    System.IO.File.Delete(filePath);
                }
            }
            catch (IOException ioExp)
            {
                Console.WriteLine(ioExp.Message);
            }
        }

        [MenuAccess("Packaging Initiative")]
        [EncryptedActionParameter]
        public IActionResult EditPackageIntiatives(string ProjectID, string Status = "", string ID = "")
        {
            PackageInitiatives pack = new PackageInitiatives();
            var initiatorHub = "";
            var hub = HttpContext.Session.GetString("Hub");
            var userName = HttpContext.Session.GetString("UserName");
            pack.UserName = userName;

            PBMasters masters = master.GetPBMasters();
            var masters1 = PackageInitiativeRepository.GetDivision(userName);

            var PackageData = PackageInitiativeRepository.GetPackageInitiativePageData(ProjectID, userName);

            foreach (var data in PackageData.PackageHeader)
            {
                if (data.ReceivedDate != null)
                {
                    pack.ReceivedDate = data.ReceivedDate;

                }
            }

            if ((PackageData.PackageHeader).Count() > 0)
            {
                initiatorHub = PackageData.PackageHeader.ElementAt(0).Hub;
            }


            if (ID == "1" || ID == "8" || ID == "9" || ID == "11")
            {

                var divisionList = PackageInitiativeRepository.GetDivision(userName);
                pack.DivisionList = divisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            }
            else
            {
                pack.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            }
            pack.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            pack.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });

            pack.ProjectId = ProjectID;

            masters.HubList = masters.HubList.Where(m => m.HubName != initiatorHub && m.HubName != "HGML").ToList();
            pack.HubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });

            pack.HubListJson = JsonConvert.SerializeObject(pack.HubList);


            PBMasters KDSData = master.GetKDSMasterData();
            pack.MoldList = KDSData.MoldList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.ProjectCategorizationList = KDSData.ProjectCategorizationList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.ComplexityToBeAssignedList = KDSData.ComplexityToBeAssignedList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.RAndDNameList = KDSData.RAndDNameList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });
            pack.ProjectPriorityList = KDSData.ProjectPriorityList.Select(m => new SelectListItem { Text = m.KDSName, Value = m.KDSValue });

            if (ID == "3" || Status == "View")
            {
                var GetPackData = PackageInitiativeRepository.GetPackageInitiativeHUBReviewData(ProjectID, userName);
                var GetPackDataResult = JsonConvert.SerializeObject(GetPackData);
                pack.JsonFormPackHUbBusinessData = GetPackDataResult;
                foreach (var data in GetPackData.PackIsHubApproved)
                {
                    pack.IsHubApproved = data.IsHubApproved;
                }
            }
            if (ID == "4" || ID == "5" || ID == "16"|| ID == "6" || ID == "12" || ID == "14" || Status == "View")
            {
                var GetRemarksData = PackageInitiativeRepository.GetPackageInitiativeHGMLApproveData(ProjectID, userName);
                var GetRemarksDataResult = JsonConvert.SerializeObject(GetRemarksData);
                pack.JsonPackHUBRemarksData = GetRemarksDataResult;
            }
            if (ID == "5" || ID == "16" || ID == "6" || ID == "12" || Status == "View")
            {
                var GetPMDData = PackageInitiativeRepository.GetPackageInitiativePMDReviewData(ProjectID, userName);
                var GetPMDRemarks = JsonConvert.SerializeObject(GetPMDData);
                pack.JsonPMDReview = GetPMDRemarks;
            }

            foreach (var data in PackageData.PackageHeader)
            {
                pack.Division = data.Division;
                pack.Category = data.Category;
            }
            foreach (var data in PackageData.PackageHGMLData)
            {
                pack.Hubs = data.Hubs;
            }
            pack.HubForDropDown = String.IsNullOrWhiteSpace(pack.Hubs) ? new string[0] : pack.Hubs.Replace(" ", "").Split(',');

            foreach (var data in PackageData.PackageHGMLData)
            {
                pack.HubUsers = data.HubUsers;
            }

            pack.hubuser = String.IsNullOrWhiteSpace(pack.HubUsers) ? new string[0] : pack.HubUsers.Replace(" ", "").Split(',');

            var jsonResult = JsonConvert.SerializeObject(PackageData);

            pack.JsonData = jsonResult;
            pack.Status = Status;
            pack.ID = ID;


            if (Status == "View")
            {
                pack.ViewStatus = Status;
            }
            pack.IsEdit = ViewBag.IsEdit ? true : false;
            pack.IsRead = ViewBag.IsRead ? true : false;
            LogError("NewInitiation", "EditPackageIntiatives", new Exception("Edit Package Initiative saving initiated"));

            return View(pack);

        }

        [HttpPost]

        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult EditPackageIntiativeData(PackageInitiatives packageData)
        {

            var userName = HttpContext.Session.GetString("UserName");
            packageData.UserName = userName;

            try
            {
                if (packageData.StatusId == 2 || packageData.StatusId == 3 || packageData.StatusId == 4 || packageData.StatusId == 5 || packageData.StatusId == 6 || packageData.StatusId == 7 || packageData.StatusId == 8 || packageData.StatusId == 12 || packageData.StatusId == 11 || packageData.StatusId == 13 || packageData.StatusId == 14 || packageData.StatusId == 16)
                {
                    if (packageData.CurrentStatus == 2 || packageData.CurrentStatus == 13)
                    {
                        var result = PackageInitiativeRepository.InsertUpdatePackageInitiativeHGMLData(packageData);
                        TempData["Message"] = result.Item1;
                        TempData["Messageclass"] = result.Item2;

                    }
                    if (packageData.CurrentStatus == 3)
                    {
                        PackageInitiativeRepository.InsertUpdatePackageInitiativeHUBData(packageData);
                    }
                    if (packageData.CurrentStatus == 4 || packageData.CurrentStatus == 14)
                    {
                        var result = PackageInitiativeRepository.InsertUpdatePackageInitiativeHGMLApproveData(packageData);
                        TempData["Message"] = result.Item1;
                        TempData["Messageclass"] = result.Item2;
                    }
                    if (packageData.CurrentStatus == 5 || packageData.CurrentStatus == 6 || packageData.CurrentStatus == 12 || packageData.CurrentStatus == 16)
                    {
                        var result = PackageInitiativeRepository.InsertUpdatePackageInitiativePMDReviewData(packageData);
                        TempData["Message"] = result.Item1;
                        TempData["Messageclass"] = result.Item2;
                    }
                }
                if ((packageData.StatusId == 1 || packageData.StatusId == 2 || packageData.StatusId == 13 || packageData.CurrentStatus == 11 || packageData.StatusId == 9 || packageData.CurrentStatus == 8 || packageData.CurrentStatus == 9) && packageData.CurrentStatus != 5 && packageData.CurrentStatus != 16)
                {
                    PackageInitiativeRepository.UpdatePackageInitiativeData(packageData);
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "EditPackageIntiativeData", e);
            }
            return RedirectToAction("NewInitiation", "NewInitiation");
        }

        public IActionResult ReformulationApproved()
        {
            return View();
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult ReformulationRejected(string projectId)
        {
            PBMasters masters = master.GetPBMasters();
            Reformulation reformulation = new Reformulation();
            reformulation.ProjectId = projectId;
            reformulation.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            reformulation.HgmlDataHubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });


            var ReformulationData = reformulationRepository.GetReformulationData(projectId);
            var jsonReformulationData = JsonConvert.SerializeObject(ReformulationData);

            foreach (var data in ReformulationData.ReformulationTableData)
            {
                reformulation.Division = data.Division;
                reformulation.Category = data.Category;
            }

            var hgmlReviewData = reformulationRepository.GetHgmlReviewData(projectId);
            var jsonFormHgmlReviewData = JsonConvert.SerializeObject(hgmlReviewData);


            reformulation.JsonFormReformulationHgmlReviewData = jsonFormHgmlReviewData;
            reformulation.ReformulationJSON = jsonReformulationData;
            return View(reformulation);
        }


        public string ProjectBriefDisplay(string Year, string Hub, string Division, string ProjectType, string Status)
        {
            NewInitiation data = new NewInitiation();
            var userName = HttpContext.Session.GetString("UserName");
            var year = HttpContext.Session.GetString("SearchedYear");
            if(year != null)
            {
                Year = year;
            }

            var DocumentData = npdRepository.GetProjectList(Year, Hub, Division, ProjectType, Status, userName);
            var jsonResult = JsonConvert.SerializeObject(DocumentData);
            return jsonResult;
        }
        /// <summary>
        /// Menthod to return All the Prjoect details
        /// </summary>
        /// <param name="Year">year</param>
        /// <param name="Hub">Hub Name</param>
        /// <param name="Division">Division Name</param>
        /// <param name="ProjectType">Project Type</param>
        /// <param name="Status">Status</param>
        /// <returns> Project details with the appied filters</returns>
        public string ProjectBriefDisplayfilter(string Year, string Hub, string Division, string ProjectType, string Status)
        {
            var userName = HttpContext.Session.GetString("UserName");
            HttpContext.Session.SetString("SearchedYear", Year);
            var DocumentData = npdRepository.GetProjectList(Year, Hub, Division, ProjectType, Status, userName);
            var jsonResult = JsonConvert.SerializeObject(DocumentData);
            return jsonResult;
        }
        public IActionResult DeletePageData(string ProjectID)

        {
            PackageInitiativeRepository.DeletPageDataInTable(ProjectID);
            return RedirectToAction("NewInitiation", "NewInitiation");
        }
        public PartialViewResult Header(string ProjectId, string Type)
        {
            PdfData data = new PdfData();

            var ProjectHeader = npdRepository.GetPdfData(ProjectId, Type, 1).ToList();
            if (ProjectHeader.Count >= 1)
            {
                data = ProjectHeader[0];
            }
            return PartialView(data);
        }
        public PartialViewResult PDFNPD(string ProjectId, string Type, string Status)
        {
            //ProjectId = "PB231013";
            //Type = "NPD";
            //Status = "1";
            PdfData data = new PdfData();
            ViewBag.Status = Status;
            ViewBag.ProjectType = "NPD";
            ViewBag.ProjectId = ProjectId;
            var userName = HttpContext.Session.GetString("UserName");
            ViewBag.DownloadedBy = HttpContext.Session.GetString("LoggedUserName");

            var ProjectHeader = npdRepository.GetPdfData(ProjectId, Type, 1).ToList();
            if (ProjectHeader.Count >= 1)
            {
                data = ProjectHeader[0];
            }
            ViewBag.IssenttoHUB = ProjectHeader[0].IssenttoHUB;
            //var projectName= ProjectHeader[0].ProjectName;
            data.ProductPositioning = npdRepository.GetPdfData(ProjectId, Type, 2);
            data.ProductProfile = npdRepository.GetPdfData(ProjectId, Type, 3);
            data.PackagingProfiledata = npdRepository.GetPdfData(ProjectId, Type, 4);
            data.BusinessInformationdata = npdRepository.GetPdfData(ProjectId, Type, 5);
            data.Sustainabilitydata = npdRepository.GetPdfData(ProjectId, Type, 6);

            var values = PackageInitiativeRepository.GetFieldWiseRemarks_PDF(ProjectId);
            data.packagingMasterList = values.packagingMasterList;
            data.PackagingProfileFieldRemarks = values.PackagingProfileFieldRemarks;

            if (Status == "5" || Status == "16" || Status == "6"|| Status == "12")
            {
                var pdfdata = PackageInitiativeRepository.GetApprovalData_PDF(ProjectId);
                data.MarketingTeamApprovalData = pdfdata.MarketingTeamApprovalData;
                data.HGMLReviewTeamApprovalData = pdfdata.HGMLReviewTeamApprovalData;
                data.HUBReviewTeamApprovalData = pdfdata.HUBReviewTeamApprovalData;
                // data.HGMLApproveTeamApprovalData = pdfdata.HGMLApproveTeamApprovalData;
                if (Status == "6")
                {
                    data.FinescreeningTeamApprovalData = pdfdata.FinescreeningTeamApprovalData;
                }
                if (Status == "12")
                {
                    data.FinescreeningTeamApprovalData = pdfdata.FinescreeningTeamApprovalData;
                    data.AcceptedTeamApprovalData = pdfdata.AcceptedTeamApprovalData;
                    data.UpdatedTeamApprovalData = pdfdata.UpdatedTeamApprovalData;
                }
            }

            foreach (var item in data.ProductProfile)
            {
                if (item.BenchmarkProductsImage != null)
                {
                    if (isQA == "Y")
                    {
                        var filePath = Path.Combine(webHostEnvironment.WebRootPath, "NPDimages", item.BenchmarkProductsImage);


                        if (System.IO.File.Exists(filePath))
                        {
                            var request = httpContextAccessor.HttpContext.Request;
                            var image = $"{request.Scheme}://{request.Host}{request.PathBase}/NPDImages/{item.BenchmarkProductsImage}";
                            item.Imagecontent = image;
                        }
                    }
                    else
                    {
                        if (item.BenchmarkProductsImage != null)
                        {
                            var filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathNPD"], item.BenchmarkProductsImage);
                            item.Imagecontent = filePath;
                        }
                    }
                }
            }
            foreach (var item in data.PackagingProfiledata)
            {
                if (item.ImagesUpload != null)
                {
                    var ImageList = item.ImagesUpload.Split(',');
                    for (int i = 0; i < ImageList.Length; i++)
                    {
                        if (isQA == "Y")
                        {
                            var filePath = Path.Combine(webHostEnvironment.WebRootPath, "NPDimages", ImageList[i]);
                            if (System.IO.File.Exists(filePath))
                            {
                                var request = httpContextAccessor.HttpContext.Request;
                                var image = $"{request.Scheme}://{request.Host}{request.PathBase}/NPDImages/{ImageList[i]}";
                                if (i + 1 == ImageList.Length)
                                {
                                    item.Imagecontent += image;
                                }
                                else
                                {
                                    item.Imagecontent += image + ',';
                                }
                                //item.Imagecontent = filePath;
                            }
                        }
                        else
                        {
                            if (ImageList[i] != null)
                            {
                                var filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathNPD"], ImageList[i]);
                                if (i + 1 == ImageList.Length)
                                {
                                    item.Imagecontent += filePath;
                                }
                                else
                                {
                                    item.Imagecontent += filePath + ',';
                                }
                            }
                        }

                    }
                }
            }
            if (ViewBag.Status == "3" || ViewBag.Status == "4" || ViewBag.Status == "5" || ViewBag.Status == "16" || ViewBag.Status == "6" || ViewBag.Status == "12" || ViewBag.Status == "14")
            {
                var hgmlReviewData = npdRepository.GetHgmlReviewData(ProjectId);

                var HGMLBIRemarks = hgmlReviewData.BusinessInformationHGMLRemarksList.ToList();
                var HGMLPDRemarks = hgmlReviewData.ProjectDetailsHGMLRemarksList.ToList();
                var HGMLPPRemarks = hgmlReviewData.PackagingProfileHGMLRemarksList.ToList();
                var HGMLProductRemarks = hgmlReviewData.ProductPositioningHGMLRemarksList.ToList();
                var HGMLFPRemarks = hgmlReviewData.FormulationProfileHGMLRemarksList.ToList();
                var HGMLSusatinabilityRemarks = hgmlReviewData.SustainabilityHGMLRemarksList.ToList();
                var HGMLtoHubRemarks = hgmlReviewData.HgmlDataList.ToList();
                if (HGMLBIRemarks.Count > 0)
                {
                    data.BusinessInformationHgmlRemark = HGMLBIRemarks[0].BusinessInformationHgmlRemark;

                }
                if (HGMLPDRemarks.Count > 0)
                {
                    data.ProjectDetailsHgmlRemark = HGMLPDRemarks[0].ProjectDetailsHgmlRemark;

                }
                if (HGMLPPRemarks.Count > 0)
                {
                    data.PackagingProfileHgmlRemark = HGMLPPRemarks[0].PackagingProfileHgmlRemark;

                }
                if (HGMLProductRemarks.Count > 0)
                {
                    data.ProductPositioningHgmlRemark = HGMLProductRemarks[0].ProductPositioningHgmlRemark;

                }
                if (HGMLFPRemarks.Count > 0)
                {
                    data.FormulationProfileHgmlRemark = HGMLFPRemarks[0].FormulationProfileHgmlRemark;

                }
                if (HGMLtoHubRemarks.Count > 0)
                {
                    data.HGMLtoHubRemarks = HGMLtoHubRemarks[0].HgmlToHubRemarks;

                }
                if (HGMLSusatinabilityRemarks.Count > 0)
                {
                    data.HGMLSusatinabilityRemark = HGMLSusatinabilityRemarks[0].SustainabilityHgmlRemark;

                }

            }
            if (ViewBag.Status == "3" || ViewBag.Status == "4" || ViewBag.Status == "5" || ViewBag.Status == "16" || ViewBag.Status == "6" || ViewBag.Status == "12" || ViewBag.Status == "14")
            {
                var hubReviewData = npdRepository.GetNpdHgmlApproveData(ProjectId);


                data.ProjectDetailsHubRemarksList = hubReviewData.HgmlApproveProjectDetailsHubRemarks.ToList();
                data.ProductPositioningHubRemarksList = hubReviewData.HgmlApproveProductPositioningHubRemarks.ToList();
                data.FormulationProfileHubRemarksList = hubReviewData.HgmlApproveFormulationProfileHubRemarks.ToList();
                data.PackagingProfileHubRemarksList = hubReviewData.HgmlApprovePackagingProfileHubRemarks.ToList();
                data.SustainabilityHubRemarksList = hubReviewData.HgmlApproveSustainabilityHubRemarks.ToList();
                data.BusinessInformationHubRemarksList = hubReviewData.HgmlApproveBusinessInformationHubRemarks.ToList();
                data.HgmlDataList = hubReviewData.HgmlDataList.ToList();
                data.HgmlApproveBusinessInformationData = hubReviewData.HgmlApproveBusinessInformationData.ToList();
                data.NPDHubStatus = hubReviewData.HgmlDataHubParticipatingMarketsList.ToList();
            }
            if (ViewBag.Status == "6" || ViewBag.Status == "5" || ViewBag.Status == "16"|| ViewBag.Status == "12")
            {
                var pmdReviewData = npdRepository.GetNpdPmdReviewData(ProjectId);
                var ProjectDetailsPmdRemarksList = pmdReviewData.ProjectDetailsPmdRemarksList.ToList();
                if (ProjectDetailsPmdRemarksList.Count > 0)
                {
                    data.ProjectDetailsPmdRemarks = ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemarks;
                }
                var ProductPositioningPmdRemarksList = pmdReviewData.ProductPositioningPmdRemarksList.ToList();
                if (ProductPositioningPmdRemarksList.Count > 0)
                {
                    data.ProductPositioningPmdRemarks = ProductPositioningPmdRemarksList[0].ProductPositioningPmdRemarks;

                }

                var FormulationProfilePmdRemarksList = pmdReviewData.FormulationProfilePmdRemarksList.ToList();
                if (FormulationProfilePmdRemarksList.Count > 0)
                {
                    data.FormulationProfilePmdRemarks = FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemarks;

                }

                var PackagingProfilePmdRemarksList = pmdReviewData.PackagingProfilePmdRemarksList.ToList();
                if (PackagingProfilePmdRemarksList.Count > 0)
                {
                    data.PackagingProfilePmdRemarks = PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemarks;
                }

                var BusinessInformationPmdRemarksList = pmdReviewData.BusinessInformationPmdRemarksList.ToList();
                if (BusinessInformationPmdRemarksList.Count > 0)
                {
                    data.BusinessInformationPmdRemarks = BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemarks;
                    //data.PmdDataList = pmdReviewData.PmdDataList.ToList();
                }

                var SustainabilityPmdRemarksList = pmdReviewData.SustainabilityPmdRemarksList.ToList();
                if (SustainabilityPmdRemarksList.Count > 0)
                {
                    data.SustainabilityPmdRemarks = SustainabilityPmdRemarksList[0].SustainabilityPmdRemarks;
                }

                var targetdata = pmdReviewData.TargetCostDataList.ToList();
                if (targetdata.Count > 0)
                {
                    data.NPDTargetCostDataList = targetdata;
                }

                data.PmdDataList = pmdReviewData.PmdDataList.ToList();

            }
            return PartialView(data);
        }
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]

        public JsonResult GeneratePdfHtml(PdfData data)
        {
            var html = data.JsonString;
            //var htmlHeader = data.JsonHeaderString;
            html = html.Replace("strtTag", "<").Replace("EndTag", ">");
            //htmlHeader = htmlHeader.Replace("strtTag", "<").Replace("EndTag", ">");
            HttpContext.Session.SetString("HtmlData", html);

            // HttpContext.Session.SetString("HtmlHeaderData", htmlHeader);
            return Json("", new System.Text.Json.JsonSerializerOptions());
        }

        public PartialViewResult ReformulationDraft(string ProjectId, string Type, string Status)
        {
            PdfData data = new PdfData();
            ViewBag.Status = Status;
            ViewBag.ProjectType = "Reformulation";
            ViewBag.ProjectId = ProjectId;
            ViewBag.DownloadedBy = HttpContext.Session.GetString("LoggedUserName");
            var ProjectHeader = npdRepository.GetPdfData(ProjectId, Type, 1).ToList();
            if (ProjectHeader.Count >= 1)
            {
                data = ProjectHeader[0];
            }
            ViewBag.IssenttoHUB = ProjectHeader[0].IssenttoHUB;

            data.BusinessInformationdata = npdRepository.GetPdfData(ProjectId, Type, 2);
            data.PackagingProfiledata = npdRepository.GetPdfData(ProjectId, Type, 3);
            data.ProductPositioning = npdRepository.GetPdfData(ProjectId, Type, 4);
            data.Sustainabilitydata = npdRepository.GetPdfData(ProjectId, Type, 6);

            if (Status == "5" || Status == "16" || Status == "6" || Status == "12")
            {
                var pdfdata = PackageInitiativeRepository.GetApprovalData_PDF(ProjectId);
                data.MarketingTeamApprovalData = pdfdata.MarketingTeamApprovalData;
                data.HGMLReviewTeamApprovalData = pdfdata.HGMLReviewTeamApprovalData;
                data.HUBReviewTeamApprovalData = pdfdata.HUBReviewTeamApprovalData;
                // data.HGMLApproveTeamApprovalData = pdfdata.HGMLApproveTeamApprovalData;
                if (Status == "6")
                {
                    data.FinescreeningTeamApprovalData = pdfdata.FinescreeningTeamApprovalData;
                }
                if (Status == "12")
                {
                    data.FinescreeningTeamApprovalData = pdfdata.FinescreeningTeamApprovalData;
                    data.AcceptedTeamApprovalData = pdfdata.AcceptedTeamApprovalData;
                    data.UpdatedTeamApprovalData = pdfdata.UpdatedTeamApprovalData;
                }
            }
            var values = PackageInitiativeRepository.GetFieldWiseRemarks_PDF(ProjectId);
            data.packagingMasterList = values.packagingMasterList;
            data.PackagingProfileFieldRemarks = values.PackagingProfileFieldRemarks;
            data.ReformulationBenchMarkImages = values.ReformulationBenchMarkImages;

            if (data.ReformulationBenchMarkImages != null)
            {
                foreach (var item in data.ReformulationBenchMarkImages)
                {
                    if (item.Image != null)
                    {
                        var ImageList = item.Image.Split(',');

                        for (int i = 0; i < ImageList.Length; i++)
                        {
                            if (isQA == "Y")
                            {
                                var filePath = Path.Combine(webHostEnvironment.WebRootPath, "NPDimages", ImageList[i]);

                                if (System.IO.File.Exists(filePath))
                                {
                                    var request = httpContextAccessor.HttpContext.Request;
                                    var image = $"{request.Scheme}://{request.Host}{request.PathBase}/NPDImages/{ImageList[i]}";

                                    if (i + 1 == ImageList.Length)
                                    {
                                        item.Imagecontent += image;
                                    }
                                    else
                                    {
                                        item.Imagecontent += image + ',';
                                    }
                                }
                            }
                            else
                            {
                                var filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathNPD"], ImageList[i]);
                                if (i + 1 == ImageList.Length)
                                {
                                    item.Imagecontent += filePath;
                                }
                                else
                                {
                                    item.Imagecontent += filePath + ',';
                                }
                                //var filePath = Path.Combine(webHostEnvironment.WebRootPath, "Imagepath", item.ImagesUpload);
                            }
                        }
                    }
                }
            }

            foreach (var item in data.PackagingProfiledata)
            {
                if (item.ImagesUpload != null)
                {
                    var ImageList = item.ImagesUpload.Split(',');
                    for (int i = 0; i < ImageList.Length; i++)
                    {
                        if (isQA == "Y")
                        {
                            var filePath = Path.Combine(webHostEnvironment.WebRootPath, "NPDimages", ImageList[i]);

                            if (System.IO.File.Exists(filePath))
                            {
                                var request = httpContextAccessor.HttpContext.Request;
                                var image = $"{request.Scheme}://{request.Host}{request.PathBase}/NPDImages/{ImageList[i]}";

                                if (i + 1 == ImageList.Length)
                                {
                                    item.Imagecontent += image;
                                }
                                else
                                {
                                    item.Imagecontent += image + ',';
                                }
                            }
                        }
                        else
                        {
                            var filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathNPD"], ImageList[i]);
                            if (i + 1 == ImageList.Length)
                            {
                                item.Imagecontent += filePath;
                            }
                            else
                            {
                                item.Imagecontent += filePath + ',';
                            }
                            //var filePath = Path.Combine(webHostEnvironment.WebRootPath, "Imagepath", item.ImagesUpload);
                        }
                    }
                }
            }
            var ReformularionBenchmarkImage = npdRepository.GetPdfData(ProjectId, Type, 4).ToList();

            if (ReformularionBenchmarkImage.Count > 0)
            {
                if (ReformularionBenchmarkImage[0].BenchmarkImage != null)
                {
                    if (isQA == "Y")
                    {
                        var filePath = Path.Combine(webHostEnvironment.WebRootPath, "NPDimages", ReformularionBenchmarkImage[0].BenchmarkImage);

                        if (System.IO.File.Exists(filePath))
                        {
                            var request = httpContextAccessor.HttpContext.Request;
                            var image = $"{request.Scheme}://{request.Host}{request.PathBase}/NPDImages/{ReformularionBenchmarkImage[0].BenchmarkImage}";

                            data.ReformularionBenchmarkImage = image;
                        }
                    }
                    else
                    {
                        var filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathNPD"], ReformularionBenchmarkImage[0].BenchmarkImage);
                        data.ReformularionBenchmarkImage = filePath;
                    }
                }
            }
            data.ProducDescription = npdRepository.GetPdfData(ProjectId, Type, 5);

                if (ViewBag.Status == "3" || ViewBag.Status == "4" || ViewBag.Status == "5"|| ViewBag.Status=="16" || ViewBag.Status == "6" || ViewBag.Status == "12"|| ViewBag.Status == "14")
            {

                var hgmlReviewData = reformulationRepository.GetHgmlReviewData(ProjectId);

                var HGMLBIRemarks = hgmlReviewData.BusinessInformationHGMLRemarksList.ToList();
                var HGMLPDRemarks = hgmlReviewData.ProjectDetailsHGMLRemarksList.ToList();
                var HGMLPPRemarks = hgmlReviewData.PackagingProfileHGMLRemarksList.ToList();
                var HGMLProductRemarks = hgmlReviewData.ProductDetailsHGMLRemarksList.ToList();
                var HGMLFPRemarks = hgmlReviewData.FormulationProfileHGMLRemarksList.ToList();
                var HGMLtoHubRemarks = hgmlReviewData.HGMLtoHubRemarksList.ToList();
                var SustainabilityRemarks = hgmlReviewData.SustainabilityHGMLRemarksList.ToList();
                data.RHgmlDataList = hgmlReviewData.HgmlDataList.ToList();
                data.RhgmlGridDataList = hgmlReviewData.HgmlDataGridList.ToList();

                if (HGMLBIRemarks.Count > 0)
                {
                    data.BusinessInformationHgmlRemark = HGMLBIRemarks[0].BusinessInformationHgmlRemark;
                }
                if (HGMLPDRemarks.Count > 0)
                {
                    data.ProjectDetailsHgmlRemark = HGMLPDRemarks[0].ProjectDetailsHgmlRemark;
                }
                if (HGMLPPRemarks.Count > 0)
                {
                    data.PackagingProfileHgmlRemark = HGMLPPRemarks[0].PackagingProfileHgmlRemark;
                }
                if (HGMLProductRemarks.Count > 0)
                {
                    data.ProductPositioningHgmlRemark = HGMLProductRemarks[0].ProductDetailsHgmlRemark;
                }
                if (HGMLFPRemarks.Count > 0)
                {
                    data.FormulationProfileHgmlRemark = HGMLFPRemarks[0].FormulationProfileHgmlRemark;
                }
                if (HGMLtoHubRemarks.Count > 0)
                {
                    data.HGMLtoHubRemarks = HGMLtoHubRemarks[0].HgmlToHubRemarks;

                }
                if (SustainabilityRemarks.Count > 0)
                {
                    data.HGMLSusatinabilityRemark = SustainabilityRemarks[0].SustainabilityHgmlRemark;

                }

                var hubReviewData = reformulationRepository.GetHUBReviewData(ProjectId);
                data.RHubBusinessInformationRemarks = hubReviewData.BusinessInformationHubRemarksList.ToList();
                data.RProjectDetailsHubRemarksList = hubReviewData.ProjectDetailsHubRemarksList.ToList();
                data.RFormulationProfileHubRemarksList = hubReviewData.FormulationProfileHubRemarksList.ToList();
                data.RHubPackagingProfileRemarks = hubReviewData.PackagingProfileHubRemarksList.ToList();
                data.RproductDetailsHubRemark = hubReviewData.ProductDetailsHubRemarksList.ToList();
                data.RSustainabilityHubRemark = hubReviewData.HgmlApproveSustainabilityHubRemarks.ToList();
                data.RHubStatus = hubReviewData.HgmlDataHUBParticipatingMarketsList.ToList();

                //data.RproductDetailsHubRemark = hubReviewData.productDetailsHubRemark.ToList();

                // data.RHgmlApproveBusinessInformationData = hubReviewData.ReformulationHubBusinessInformation.ToList();

            }
            var pmdReviewData = reformulationRepository.GetReformulationPmdReviewData(ProjectId);
            var ProjectDetailsPmdRemarksList = pmdReviewData.ProjectDetailsPmdRemarksList.ToList();
            if (ProjectDetailsPmdRemarksList.Count > 0)
            {
                data.ProjectDetailsPmdRemarks = ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemark;
            }
            var ProductPositioningPmdRemarksList = pmdReviewData.ProductDetailsPmdRemarksList.ToList();
            if (ProductPositioningPmdRemarksList.Count > 0)
            {
                data.ProductPositioningPmdRemarks = ProductPositioningPmdRemarksList[0].ProductDetailsPmdRemark;

            }

            var FormulationProfilePmdRemarksList = pmdReviewData.FormulationProfilePmdRemarksList.ToList();
            if (FormulationProfilePmdRemarksList.Count > 0)
            {
                data.FormulationProfilePmdRemarks = FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemark;

            }

            var PackagingProfilePmdRemarksList = pmdReviewData.PackagingProfilePmdRemarksList.ToList();
            if (PackagingProfilePmdRemarksList.Count > 0)
            {
                data.PackagingProfilePmdRemarks = PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemark;
            }
            var BusinessInformationPmdRemarksList = pmdReviewData.BusinessInformationPmdRemarksList.ToList();
            if (BusinessInformationPmdRemarksList.Count > 0)
            {
                data.BusinessInformationPmdRemarks = BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemark;
            }
            var targetcostdata = pmdReviewData.TargetCostDataList.ToList();
            if (targetcostdata.Count > 0)
            {
                data.TargetCostDataList = targetcostdata;
            }
            data.ReformulationPmdDataList = pmdReviewData.PmdDataList.ToList();
            var hubBusinessData = reformulationRepository.GetReformulationHubData(ProjectId);
            if (hubBusinessData != null)
            {
                data.RHgmlApproveBusinessInformationData = hubBusinessData.ReformulationHubBusinessInformation.ToList();
            }
            var SustainabilityPmdRemarks = pmdReviewData.SustainabilityPmdRemarksList.ToList();
            if (SustainabilityPmdRemarks.Count > 0)
            {
                data.SustainabilityPmdRemarks = SustainabilityPmdRemarks[0].SustainabilityPmdRemark;
            }

            return PartialView(data);
        }
        public PartialViewResult PIDraft(string ProjectId, string Type, string Status)
        {
            PdfData data = new PdfData();
            ViewBag.Status = Status;
            ViewBag.ProjectType = "Packaging Initiative";
            ViewBag.ProjectId = ProjectId;
            var userName = HttpContext.Session.GetString("UserName");
            ViewBag.DownloadedBy = HttpContext.Session.GetString("LoggedUserName");
            var ProjectHeader = npdRepository.GetPdfData(ProjectId, Type, 1).ToList();
            if (ProjectHeader.Count >= 1)
            {
                data = ProjectHeader[0];
            }
            ViewBag.IssenttoHUB = ProjectHeader[0].IssenttoHUB;

            data.ProducDescription = npdRepository.GetPdfData(ProjectId, Type, 2);
            data.BusinessInformationdata = npdRepository.GetPdfData(ProjectId, Type, 3);
            data.PackagingProfiledata = npdRepository.GetPdfData(ProjectId, Type, 4);
            data.Sustainabilitydata = npdRepository.GetPdfData(ProjectId, Type, 5);

            var values = PackageInitiativeRepository.GetFieldWiseRemarks_PDF(ProjectId);
            data.packagingMasterList = values.packagingMasterList;
            data.PackagingProfileFieldRemarks = values.PackagingProfileFieldRemarks;

            if (Status == "5" || Status == "16"|| Status == "6"|| Status == "12")
            {
                var pdfdata = PackageInitiativeRepository.GetApprovalData_PDF(ProjectId);
                data.MarketingTeamApprovalData = pdfdata.MarketingTeamApprovalData;
                data.HGMLReviewTeamApprovalData = pdfdata.HGMLReviewTeamApprovalData;
                data.HUBReviewTeamApprovalData = pdfdata.HUBReviewTeamApprovalData;
                // data.HGMLApproveTeamApprovalData = pdfdata.HGMLApproveTeamApprovalData;
                if (Status == "6")
                {
                    data.FinescreeningTeamApprovalData = pdfdata.FinescreeningTeamApprovalData;
                }
                if(Status == "12")
                {
                    data.FinescreeningTeamApprovalData = pdfdata.FinescreeningTeamApprovalData;
                    data.AcceptedTeamApprovalData = pdfdata.AcceptedTeamApprovalData;
                    data.UpdatedTeamApprovalData = pdfdata.UpdatedTeamApprovalData;
                }

            }

            foreach (var item in data.PackagingProfiledata)
            {
                if (item.ImagesUpload != null)
                {
                    var ImageList = item.ImagesUpload.Split(',');
                    for (int i = 0; i < ImageList.Length; i++)
                    {
                        if (isQA == "Y")
                        {
                            var filePath = Path.Combine(webHostEnvironment.WebRootPath, "PackageInitiativesImages", ImageList[i]);
                            if (System.IO.File.Exists(filePath))
                            {
                                var request = httpContextAccessor.HttpContext.Request;
                                var image = $"{request.Scheme}://{request.Host}{request.PathBase}/PackageInitiativesImages/{ImageList[i]}";
                                if (i + 1 == ImageList.Length)
                                {
                                    item.Imagecontent += image;
                                }
                                else
                                {
                                    item.Imagecontent += image + ',';
                                }
                            }
                        }
                        else
                        {
                            if (ImageList[i] != null)
                            {
                                var filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathPI"], ImageList[i]);
                                if (i + 1 == ImageList.Length)
                                {
                                    item.Imagecontent += filePath;
                                }
                                else
                                {
                                    item.Imagecontent += filePath + ',';
                                }
                            }
                        }
                    }
                }
            }
          if (ViewBag.Status == "3" || ViewBag.Status == "4" || ViewBag.Status == "5"|| ViewBag.Status == "16" || ViewBag.Status == "6"|| ViewBag.Status == "12"|| ViewBag.Status == "14")
            {
                var PackageData = PackageInitiativeRepository.GetPackageInitiativePageData(ProjectId, userName);

                var HGMLBIRemarks = PackageData.PackageBusinessHGML.ToList();
                var HGMLPDRemarks = PackageData.PackageProjectDetailsHGML.ToList();
                var HGMLPPRemarks = PackageData.PackExpectedHGML.ToList();
                var HGMLProductRemarks = PackageData.PackageProductDescriptionHGML.ToList();
                //var HGMLFPRemarks = PackageData.FormulationProfileHGMLRemarksList.ToList();
                var HGMLtoHubRemarks = PackageData.PackageHGMLData.ToList();
                var HGMLSusatinabilityRemark = PackageData.PackSustainabilityHGML.ToList();
                if (HGMLBIRemarks.Count > 0)
                {
                    data.BusinessInformationHgmlRemark = HGMLBIRemarks[0].BusinessInformation;
                }
                if (HGMLPDRemarks.Count > 0)
                {
                    data.ProjectDetailsHgmlRemark = HGMLPDRemarks[0].PackProjectDetails;
                }
                if (HGMLPPRemarks.Count > 0)
                {
                    data.PackagingProfileHgmlRemark = HGMLPPRemarks[0].PackagingProfile;
                }
                if (HGMLProductRemarks.Count > 0)
                {
                    data.ProductPositioningHgmlRemark = HGMLProductRemarks[0].ProductDescription;
                }
                // data.FormulationProfileHgmlRemark = HGMLFPRemarks[0].FormulationProfileHgmlRemark;
                if (HGMLtoHubRemarks.Count > 0)
                {
                    data.HGMLtoHubRemarks = HGMLtoHubRemarks[0].HgmlToHubRemarks;
                }
                if (HGMLSusatinabilityRemark.Count > 0)
                {
                    data.HGMLSusatinabilityRemark = HGMLSusatinabilityRemark[0].PackSustainability;
                }

            }
            if (ViewBag.Status == "3" || ViewBag.Status == "4" || ViewBag.Status == "5" || ViewBag.Status == "16" || ViewBag.Status == "6" || ViewBag.Status == "12" || ViewBag.Status == "14")
            {
                var GetRemarksData = PackageInitiativeRepository.GetPackageInitiativeHGMLApproveData(ProjectId, userName);
                data.HubBusinessInformationRemarks = GetRemarksData.PackageBusinessHUB.ToList();
                data.HubProjectDetailsRemarks = GetRemarksData.PackageProjectDetailsHUB.ToList();
                data.HubProdctDescriptionRemarks = GetRemarksData.PackageProductDescriptionHUB.ToList();
                data.HubPackagingProfileRemarks = GetRemarksData.PackExpectedHUB.ToList();
                data.PackageInitiativesBusinessInformation = GetRemarksData.PackageBusinessInfo.ToList();
                data.PSustainabilityHUBRemarks = GetRemarksData.PackageSustainabilityHUB.ToList();
                data.HubStatus = GetRemarksData.HgmlDataHUBParticipatingMarket.ToList();
            }

            var GetPMDData = PackageInitiativeRepository.GetPackageInitiativePMDReviewData(ProjectId, userName);
            var PackageProjectDetailsPMD = GetPMDData.PackageProjectDetailsPMD.ToList();
            if (PackageProjectDetailsPMD.Count > 0)
            {
                data.PackProjectDetailsPMDRemarks = PackageProjectDetailsPMD[0].PackProjectDetails;
            }
            var PackageProductDescriptionPMD = GetPMDData.PackageProductDescriptionPMD.ToList();
            if (PackageProductDescriptionPMD.Count > 0)
            {
                data.PackageProductDescriptionPMDRemarks = PackageProductDescriptionPMD[0].ProductDescription;
            }
            var PackageBusinessPMD = GetPMDData.PackageBusinessPMD.ToList();
            if (PackageBusinessPMD.Count > 0)
            {
                data.PackageBusinessPMDPMDRemarks = PackageBusinessPMD[0].BusinessInformation;
            }
            var SustainabilityPMDRemarks = GetPMDData.PackSustainabilityPMD.ToList();
            if (SustainabilityPMDRemarks.Count > 0)
            {
                data.SustainabilityPmdRemarks = SustainabilityPMDRemarks[0].PackSustainability;
            }
            var PackExpectedPMD = GetPMDData.PackExpectedPMD.ToList();
            if (PackExpectedPMD.Count > 0)
            {
                data.PackExpectedPMDPMDRemarks = PackExpectedPMD[0].PackagingProfile;
            }
            var targetcostdata = GetPMDData.TargetCostDataList.ToList();
            if (targetcostdata.Count > 0)
            {
                data.TargetCostData = targetcostdata;
            }
            data.PackagePmdData = GetPMDData.PackagePmdData.ToList();
            data.PackageHGMLData = GetPMDData.PackageHGMLData.ToList();
            //var GetPackData = PackageInitiativeRepository.GetPackageInitiativeHUBReviewData(ProjectId, userName);
            //var PackageHeaderTableData = GetPackData.PackageHeaderTableData.ToList();
            //var PackageInitiativesBusinessInformation = GetPackData.PackageBusinessInfo.ToList();


            return PartialView(data);
        }

        [HttpPost]
        public JsonResult SaveNpdPopupHubBusinessInformation(string projectId, string userName, string businessInformationData)
        {
            NPD npd = new NPD();

            npdRepository.SaveNpdPopupHubBusinessInformation(projectId, userName, businessInformationData);

            var hgmlApproveData = npdRepository.GetNpdHgmlApproveData(projectId);
            var jsonFormHgmlApproveData = JsonConvert.SerializeObject(hgmlApproveData);

            return Json(jsonFormHgmlApproveData);
        }

        [HttpPost]
        public string HubStatusInfo(string projectId)
        {
            var hubInfoDataData = npdRepository.GetHubStatusInfo(projectId);
            var jsonResult = JsonConvert.SerializeObject(hubInfoDataData);
            return jsonResult;
        }

        [HttpPost]
        public string GetHubApprovalData(string projectId)
        {

            var hubApprovalData = reformulationRepository.GetHubApprovalData(projectId);
            var jsonResult = JsonConvert.SerializeObject(hubApprovalData);
            return jsonResult;
        }

        public NPD GetHubNameAndHubUserEmailForHgmlApprove(string projectId)
        {
            return npdRepository.GetHubNameAndHubUserEmailForHgmlApprove(projectId);
        }

        public void SendMailFromPMDReview()
        {
            //return null;
        }



        public JsonResult GetCategory(string divisionId)
        {
            var userName = HttpContext.Session.GetString("UserName");

            var result = PackageInitiativeRepository.GetCategory(divisionId, userName);
            var jsonResult = Json(result);
            return jsonResult;

        }


        //send mail from PMD


        public JsonResult GeneratePdfforSendmail(string toMailids, string remarks, string ProjectId, [FromServices] IWebHostEnvironment env)
        {
            npdRepository.savesendmailuserdata(toMailids, ProjectId);
            if (remarks == null)
            {
                remarks = "NA";
            }

            //var FileName = "ProjectBrief" + ".pdf";

            var html = HttpContext.Session.GetString("HtmlData");
            long ticks = DateTime.Now.Ticks;
            if (!Directory.Exists(Path.Combine(env.WebRootPath, "PDFDownload")))
            {
                Directory.CreateDirectory(Path.Combine(env.WebRootPath, "PDFDownload"));
            }
            var filePath = Path.Combine(env.WebRootPath, "PDFDownload", "ProjectBrief_" + ticks + ".pdf");

            var projectData = npdRepository.GetProjectDetailsForSendMail(ProjectId).SingleOrDefault();

            new PdfHeader().ManipulatePdf(html, filePath);

            byte[] pdf = System.IO.File.ReadAllBytes(filePath);
            MemoryStream stream = new MemoryStream(pdf);

            var fullPath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:Pdfuploads"], filePath);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            using (var fileStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
            {
                fileStream.Write(pdf, 0, pdf.Length);
            }



            var subject = "Project Brief [" + projectData.ID + "]-" + projectData.ProjectName + "-" + projectData.CurrentDate;

            string tableHtml = "<p style=\" font: 10pt RotisSemiSans; \">Hi Team,<br/><br/>Please find the Project Details </p>" +
                "<table style=\"border-collapse:collapse;font: 10pt RotisSemiSans;width: 100%;\">" +
                "<tr style=\"background-color: #B4C6E7; text-align: center; font-weight: bold;\">" +
                "<td style=\"border: 1px solid black;\">Project Brief ID</td>" +
                "<td style=\"border: 1px solid black;\">Initiator HUB Name</td>" +
                "<td style=\"border: 1px solid black;\">Division</td>" +
                "<td style=\"border: 1px solid black;\">Category</td>" +
                "<td style=\"border: 1px solid black;\">Project Type</td>" +
                "<td style=\"border: 1px solid black;\">Project Name</td>" +
                "<td style=\"border: 1px solid black;\">Project Categorization</td>" +
                "<td style=\"border: 1px solid black;\">Initiated By</td>" +
                "<td style=\"border: 1px solid black;\">Initiated Date</td>" +
                "<td style=\"border: 1px solid black;\">HGML Approved Date</td>" +
                "<td style=\"border: 1px solid black;\">Remarks</td>" +



                "</tr>" +
                "<tr style=\"text-align: center;\">" +
                "<td style=\"border: 1px solid black;\">" + projectData.ID + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.Hub + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.Division + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.Category + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.ProjectType + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.ProjectName + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.ProjectCategorization + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.SubmittedBy + "</td>" +
                "<td style=\"border: 1px solid black;\">" + projectData.SubmittedDate + "</td>" +
                 "<td style=\"border: 1px solid black;\">" + projectData.HGMLApprovedate + "</td>" +
                 "<td style=\"border: 1px solid black;\">" + remarks + "</td>" + "</tr></table>";

            //"</table>" + " <br/> Note : " + remarks + "<br/><br/>\r\n\r\n    <h5 class=\"font-size: 17px;\">This is an auto generated mail, Please do not reply </h5>";

            string signatureHtml = "<p style=\" font: 10pt RotisSemiSans; \">Thanks and Regards<br/>Team - Project Brief <br/> <b><i>This is an auto generated mail, Please do not reply </i><b> <br/></p>";
            string tableHtmlbody = tableHtml + signatureHtml;

            //string fileName = ProjectId + "_" + projectData.ProjectName + ".pdf";

            string fileName;
            string sanitizedProjectName = Regex.Replace(projectData.ProjectName, @"[^\w\d\s]", string.Empty);

            if (sanitizedProjectName.Length > 200)
            {
                fileName = $"{ProjectId}_{sanitizedProjectName.Substring(0, 185)}.pdf";
            }
            else
            {
                fileName = $"{ProjectId}_{sanitizedProjectName}.pdf";
            }



            SendMail.SendEmailLocal(subject, toMailids, "", tableHtmlbody, stream, fileName);

            var JsonResult = Json("1");
            //return RedirectToAction("NewInitiation", "NewInitiation");
            return JsonResult;



        }

        public FileResult GeneratePdf(string ProjectId, string Type, [FromServices] IWebHostEnvironment env)
        {
            try
            {
                var html = HttpContext.Session.GetString("HtmlData");
                long ticks = DateTime.Now.Ticks;
                if (!Directory.Exists(Path.Combine(env.WebRootPath, "PDFDownload")))
                {
                    Directory.CreateDirectory(Path.Combine(env.WebRootPath, "PDFDownload"));
                }
                var filePath = Path.Combine(env.WebRootPath, "PDFDownload", "ProjectBrief_" + ticks + ".pdf");

                var projectData = npdRepository.GetProjectDetailsForSendMail(ProjectId).SingleOrDefault();

                new PdfHeader().ManipulatePdf(html, filePath);

                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                //string fileName = ProjectId +"_"+ projectData.ProjectName + ".pdf";
                string fileName;
                string sanitizedProjectName = Regex.Replace(projectData.ProjectName, @"[^\w\d\s]", string.Empty);

                if (sanitizedProjectName.Length > 200)
                {
                    fileName = $"{ProjectId}_{sanitizedProjectName.Substring(0, 185)}.pdf";
                }
                else
                {
                    fileName = $"{ProjectId}_{sanitizedProjectName}.pdf";
                }

                return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);

            }

            catch (Exception ex)
            {
                LogError("New Initiation", "GeneratePDF", ex);
                return null;
            }

        }

        public JsonResult GetProjectBriefHistory(string ProjectId)
        {

            HttpContext.Session.SetString("ProjectId", ProjectId);
            var result = PackageInitiativeRepository.GetProjectBriefHistoryDetail(ProjectId, "");
            return Json(result);
        }



        public IActionResult GetProjectBriefHistoryExcel()
        {


            var ProjectId = HttpContext.Session.GetString("ProjectId");

            var documentdata = PackageInitiativeRepository.GetProjectBriefHistoryDetail(ProjectId, "1");

            var document = documentdata.ProjectBriefHistoryDetails;
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("ProjectBriefHistoryDetails");
                //var row1RangeC1 = worksheet.Range("A1:H1");
                //row1RangeC1.Style.Fill.BackgroundColor = XLColor.Blue;
                var currentRow = 1;
                #region Header

                worksheet.Cell(currentRow, 1).Value = "Sl.No";
                worksheet.Cell(currentRow, 1).Style.Font.SetBold();
                worksheet.Cell(currentRow, 1).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 1).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 2).Value = "From Stage";
                worksheet.Cell(currentRow, 2).Style.Font.SetBold();
                worksheet.Cell(currentRow, 2).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 2).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 2).Style.Fill.BackgroundColor = XLColor.BallBlue;


                worksheet.Cell(currentRow, 3).Value = "To Stage";
                worksheet.Cell(currentRow, 3).Style.Font.SetBold();
                worksheet.Cell(currentRow, 3).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 3).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 3).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 4).Value = "Assigned To";
                worksheet.Cell(currentRow, 4).Style.Font.SetBold();
                worksheet.Cell(currentRow, 4).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 5).Value = "Received On";
                worksheet.Cell(currentRow, 5).Style.Font.SetBold();
                worksheet.Cell(currentRow, 5).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 6).Value = "Submitted On";
                worksheet.Cell(currentRow, 6).Style.Font.SetBold();
                worksheet.Cell(currentRow, 6).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 6).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 6).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 7).Value = "Submitted By";
                worksheet.Cell(currentRow, 7).Style.Font.SetBold();
                worksheet.Cell(currentRow, 7).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 7).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 7).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 8).Value = "No. Of Days Taken";
                worksheet.Cell(currentRow, 8).Style.Font.SetBold();
                worksheet.Cell(currentRow, 8).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 8).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 8).Style.Fill.BackgroundColor = XLColor.BallBlue;

                worksheet.Cell(currentRow, 9).Value = "Remarks";
                worksheet.Cell(currentRow, 9).Style.Font.SetBold();
                worksheet.Cell(currentRow, 9).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.White;
                worksheet.Cell(currentRow, 9).Style.Fill.BackgroundColor = XLColor.BallBlue;
                #endregion
                #region Body

                var index = 1;
                foreach (var item in document)
                {
                    currentRow++;
                    if (index % 2 == 0)
                    {
                        worksheet.Cell(currentRow, 1).Value = index;
                        worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 1).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 2).Value = item.FromStageName;
                        worksheet.Cell(currentRow, 2).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 2).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 3).Value = item.ToStageName;
                        worksheet.Cell(currentRow, 3).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 3).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 4).Value = item.AssignedTo;
                        worksheet.Cell(currentRow, 4).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 4).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 5).Value = item.ReceivedOn;
                        worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 5).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 6).Value = item.SubmittedOn;
                        worksheet.Cell(currentRow, 6).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 6).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 7).Value = item.RemarksBy;
                        worksheet.Cell(currentRow, 7).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 7).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 8).Value = item.NoOfDaysTaken;
                        worksheet.Cell(currentRow, 8).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 8).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        worksheet.Cell(currentRow, 9).Value = item.Remarks;
                        worksheet.Cell(currentRow, 9).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                        worksheet.Cell(currentRow, 9).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    }
                    else
                    {
                        worksheet.Cell(currentRow, 1).Value = index;
                        worksheet.Cell(currentRow, 2).Value = item.FromStageName;
                        worksheet.Cell(currentRow, 3).Value = item.ToStageName;
                        worksheet.Cell(currentRow, 4).Value = item.AssignedTo;
                        worksheet.Cell(currentRow, 5).Value = item.ReceivedOn;
                        worksheet.Cell(currentRow, 6).Value = item.SubmittedOn;
                        worksheet.Cell(currentRow, 7).Value = item.RemarksBy;
                        worksheet.Cell(currentRow, 8).Value = item.NoOfDaysTaken;
                        worksheet.Cell(currentRow, 9).Value = item.Remarks;
                    }
                    index++;
                }
                worksheet.Column("1").Width = 10;
                worksheet.Column("2").Width = 25;
                worksheet.Column("3").Width = 25;
                worksheet.Column("4").Width = 40;
                worksheet.Column("5").Width = 25;
                worksheet.Column("6").Width = 25;
                worksheet.Column("7").Width = 30;
                worksheet.Column("8").Width = 20;
                worksheet.Column("9").Width = 70;

                #endregion

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Project Brief LifeCycle History.xlsx");
                }
            }
        }

        public JsonResult GetPackagingRemarks(string ProjectId, string Product, string SKU, string FieldName)
        {
            var result = PackageInitiativeRepository.GetPackagingProfileRemarks(ProjectId, Product, SKU, FieldName);
            return Json(result);
        }

        //[HttpPost]
        //public string GetTotalBusinessValue(string projectId, int ProjectType)
        //{
        //    var totalValue = reformulationRepository.GetTotalBusinessValue(projectId, ProjectType);
        //    var jsonResult = JsonConvert.SerializeObject(totalValue);
        //    return jsonResult;
        //}
        public JsonResult GetFieldRemarks(string projectId, string productName, string sku, string fieldId)
        {
            var result = npdRepository.GetFieldRemarks(projectId, productName, sku, fieldId, "NPD");
            return Json(result);
        }
        [HttpPost]
        public JsonResult NPDAutoSaveData(NPD npd)
        {
            string controllerName = "NewInitiation";
            string actionName = "NewProduction";
            LogError(controllerName, actionName, new Exception("Request to save NPD form is initiated in NewInitiation Controller"));

            PBMasters masters = master.GetPBMasters();

            var userName = HttpContext.Session.GetString("UserName");
            npd.UserName = userName;

            var divisionList = PackageInitiativeRepository.GetDivision(userName);

            npd.DivisionList = divisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionId) });
            npd.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = Convert.ToString(m.CategoryId) });
            npd.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = Convert.ToString(m.CurrencyName) });

            var result = npdRepository.UploadNpdData(npd);

            return Json(new { success = true, message = "Data received successfully", result = result });

        }

        [HttpPost]
        public JsonResult NPDAutoSaveEditData(NPD npd)
        {
            NPD npdData = new NPD();
            var userName = HttpContext.Session.GetString("UserName");
            npd.UserName = userName;

            string controllerName = "NewInitiation";
            string actionName = "NewProduction";
            LogError(controllerName, actionName, new Exception("Request to save EditProduction form is initiated in NewInitiation Controller"));

            npdRepository.UpdateNpdData(npd);

            return Json(new { success = true, message = "Data received successfully", npdData });

        }
        [HttpPost]
        public JsonResult PackageInitiativeAutoSaveData(PackageInitiatives packageData)
        {
            PBMasters masters = master.GetPBMasters();
            packageData.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            packageData.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            packageData.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });

            string result = PackageInitiativeRepository.InsertPackageData(packageData);

            return Json(new { success = true, message = "Data received successfully", result });

        }

        [HttpPost]
        public JsonResult PackageInitiativeAutoSaveEditData(PackageInitiatives packageData)
        {
            var userName = HttpContext.Session.GetString("UserName");
            packageData.UserName = userName;

            PackageInitiativeRepository.UpdatePackageInitiativeData(packageData);


            return Json(new { success = true, message = "Data received successfully" });

        }
        [HttpPost]
        public JsonResult ReformulationAutoSaveData(Reformulation reformulation)
        {
            PBMasters masters = master.GetPBMasters();
            var userName = HttpContext.Session.GetString("UserName");

            var masters1 = PackageInitiativeRepository.GetDivision(userName);

            reformulation.DivisionList = masters1.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            reformulation.CurrencyList = masters.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = m.CurrencyName.ToString() });
            var result = reformulationRepository.UploadReformulationData(reformulation);


            return Json(new { success = true, message = "Data received successfully", result });

        }

        [HttpPost]
        public JsonResult ReformulationAutoSaveEditData(Reformulation reformulation)
        {
            var userName = HttpContext.Session.GetString("UserName");
            reformulation.UserName = userName;
            PBMasters masters = master.GetPBMasters();
            reformulation.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            reformulation.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });

            reformulationRepository.UpdateReformulationData(reformulation);


            return Json(new { success = true, message = "Data received successfully" });

        }

        public JsonResult GetUsersBasedOnDevision(string DivisionId)
        {
            var result = PackageInitiativeRepository.GetUsersBasedOnDevision(DivisionId);
            return Json(result);
        }
        public JsonResult GetSupportingDocumentsData(string ProjectId)
        {
            var result = PackageInitiativeRepository.GetSupportingDocumentsData(ProjectId);
            return Json(result);
        }
        public async Task<IActionResult> GetLegacyDataPDF(string ProjectId)
        {
            var filePath = "";
            if (isQA == "Y")
            {
                filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ISpaceFileUpload:LegacyPDFDocuments"], ProjectId + ".pdf");
            }
            else
            {
                filePath = Path.Combine(Configuration["ISpaceFileUpload:ImagepathNPD"], ProjectId + ".pdf");
            }
           
            if (System.IO.File.Exists(filePath) && isQA == "Y")
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                var FileName = System.IO.Path.GetFileName(filePath);
                new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(filePath), out var contentType);
                return File(fileBytes, contentType ?? "application/octet-stream", FileName);
            }
            else if (isQA != "Y")
            {
                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.GetAsync(filePath);
                    if (response.IsSuccessStatusCode)
                    {
                        var fileBytes = await response.Content.ReadAsByteArrayAsync();
                        var fileName = ProjectId + ".pdf";
                        var contentType = "application/pdf";
                        return File(fileBytes, contentType, fileName);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
            else 
            {
                return NotFound(); 
            }
        }
     [HttpPost]
        public string GetOtherHubApprovalData(string projectId)
        {

            var hubApprovalData = reformulationRepository.GetOtherHubApprovalData(projectId);
            var jsonResult = JsonConvert.SerializeObject(hubApprovalData);
            return jsonResult;
        }
        public JsonResult GetPMUDateRemarks(string ProjectId)
        {
            var result = reformulationRepository.GetPMUDateRemarks(ProjectId);
            return Json(result);
        }

        public JsonResult SavePMUDateAndRemarks(string PMDInfo)
        {
            var userName = HttpContext.Session.GetString("UserName");
            var result = reformulationRepository.SavePMUDateRemarks(PMDInfo, userName);
            return Json(result);
        }
    }
}
