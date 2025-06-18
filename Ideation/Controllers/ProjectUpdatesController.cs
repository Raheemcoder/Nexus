using DocumentFormat.OpenXml.Bibliography;
using Ideation.Core;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using NonFactors.Mvc.Grid;
using Org.BouncyCastle.Ocsp;
//using System.Web.Mvc;
//using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;

namespace Ideation.Controllers
{
    public class ProjectUpdatesController : BaseController
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;
        private readonly IProjectUpdatesRepository projectUpdatesRepository;


        public ProjectUpdatesController(IWebHostEnvironment webHostEnvironment, IConfiguration configuration, IProjectUpdatesRepository projectUpdatesRepository)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = configuration;
            this.projectUpdatesRepository = projectUpdatesRepository;
        }
        // [HttpGet]
        public IActionResult ProjectUpdates()
        {
            ProjectUpdates projectUpdates = projectUpdatesRepository.GetPUMastersData();
            projectUpdates.RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            var userName = HttpContext.Session.GetString("UserName");
            projectUpdates.DivisionList = projectUpdates.Divisionmaster.Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName) });
            projectUpdates.StatusList = projectUpdates.Statusmaster.Select(m => new SelectListItem { Text = m.StatusName, Value = m.StatusId });
            projectUpdates.RandDList = projectUpdates.RandDmaster.Select(m => new SelectListItem { Text = m.RandDName, Value = Convert.ToString(m.RandDName) });
            projectUpdates.ProjectTypeList = projectUpdates.ProjectTypemaster.Select(m => new SelectListItem { Text = m.ProjectType, Value = Convert.ToString(m.ProjectType) });
            projectUpdates.ProjectClassificationList = projectUpdates.ProjectClassificationmaster.Select(m => new SelectListItem { Text = m.ProjectClassification, Value = Convert.ToString(m.ProjectClassification) });
            projectUpdates.ProjectLeadList = projectUpdates.ProjectLeadmasterList.Select(m => new SelectListItem { Text = m.ProjectLead, Value = Convert.ToString(m.UserId) });
            var result = projectUpdatesRepository.GetProjectUpdatesDetailsHeaderData(userName);
            projectUpdates.ProjectUpdatesDetailsHeaderData = JsonConvert.SerializeObject(result);
            projectUpdates.Status = "2";
           
            return View(projectUpdates);
        }

        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult Project_Updates_History(string ProjectCode)
        {
            ProjectUpdates projectUpdates = new ProjectUpdates();

            ProjectUpdates projectUpdatesMaster = projectUpdatesRepository.GetPUMastersData();

            var userName = HttpContext.Session.GetString("UserName");
            var empId = HttpContext.Session.GetString("UserName");
            var RoleId = HttpContext.Session.GetString("RoleId");
            var Role = HttpContext.Session.GetString("Role");

            var res= projectUpdatesRepository.GetPU_CommentsHistory(ProjectCode, "", "", "History");
            var projectUpdatesData = res.Item3;
            projectUpdates.ProjectCode = ProjectCode;
            projectUpdates.ViewInfoHistoryData = JsonConvert.SerializeObject(res.Item3.ViewInfoHistory);
            projectUpdates.VolumeInfoHistoryData = JsonConvert.SerializeObject(res.Item3.VolumeInfoHistory);

            var jsonFormProjectUpdatesData = JsonConvert.SerializeObject(projectUpdatesData);
            projectUpdates.JsonFormProjectUpdatesData = jsonFormProjectUpdatesData;

            return View(projectUpdates);
        }

        public string ProjectUpdatesHeaderData(string PUDivision, string PURandD, string Status, string ProjectType, string ProjectClassification,string Updates,string ProjectLead,string UserName)
        {   
            var result = projectUpdatesRepository.GetProjectUpdatesDetailsHeaderData(PUDivision, PURandD, Status, ProjectType, ProjectClassification, Updates, ProjectLead,UserName);
            var Jsonresult = JsonConvert.SerializeObject(result);
            return Jsonresult;
        }


        [HttpGet]
        [EncryptedActionParameter]
        public IActionResult EditProjectUpdates(string projectCode)
        {
            ProjectUpdates projectUpdates = new ProjectUpdates();

            ProjectUpdates projectUpdatesMaster = projectUpdatesRepository.GetPUMastersData();

            projectUpdates.CurrencyNameList = projectUpdatesMaster.CurrencyList.Select(m => new SelectListItem { Text = m.CurrencyName, Value = Convert.ToString(m.CurrencyName) });
            projectUpdates.ProjectLeadList = projectUpdatesMaster.ProjectLeadmasterList.Select(m => new SelectListItem { Text = m.ProjectLead, Value = m.UserId });


            var userName = HttpContext.Session.GetString("UserName");
            projectUpdates.UserName=userName;
            projectUpdates.RoleId = Convert.ToInt32(HttpContext.Session.GetString("RoleId"));
            var projectUpdatesData = projectUpdatesRepository.GetPUData(projectCode, userName);
            var jsonFormProjectUpdatesData = JsonConvert.SerializeObject(projectUpdatesData);
            projectUpdates.JsonFormProjectUpdatesData = jsonFormProjectUpdatesData;
            
            return View(projectUpdates);
        }

        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]
        public IActionResult EditProjectUpdates(ProjectUpdates projectUpdates, List<IFormFile> files)
        {
            try
            {
                var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ProjectUpdatesFileUpload:ProjectUpdatesFileUploadLocal"]);

                long size = files.Sum(f => f.Length);
                List<string> fileNames = new List<string>();

                if (files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            var FileInfo = new FileInfo(file.FileName.ToString());
                            var name = FileInfo.Name;

                            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(name);
                            var fileName = RemoveSpecialChars(fileNameWithoutExtension);
                            fileName = fileName + FileInfo.Extension;

                            fileNames.Add(fileName);

                            var filePath = Path.Combine(uploadsFolder, fileName);

                            bool existsFolder = Directory.Exists(filePath);

                            if (!existsFolder)
                            {
                                System.IO.Directory.CreateDirectory(uploadsFolder);
                            }

                            using (var fileStream = new FileStream(filePath, FileMode.Create))
                            {
                                file.CopyTo(fileStream);
                            }

                            var fileNamesString = string.Join(",", fileNames);
                            projectUpdates.UploadDocument = fileNamesString;
                        }

                    }
                }
                else {
                    if (projectUpdates.OldUploadedFiles != null && projectUpdates.OldUploadedFiles != "")
                    {
                        projectUpdates.UploadDocument = projectUpdates.OldUploadedFiles;
                    }
                    
                }

                var userName = HttpContext.Session.GetString("UserName");

                projectUpdatesRepository.UploadPUData(projectUpdates, userName);

                return RedirectToAction("ProjectUpdates", "ProjectUpdates");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        public async Task<IActionResult> DownloadImageFile(string fileName)
        {
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["PrototypeFileUpload:PrototypeFileUploadLocal"], fileName);
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var FileName = System.IO.Path.GetFileName(filePath);
            new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(filePath), out var contentType);
            return File(fileBytes, contentType ?? "application/octet-stream", FileName);
        }

        public JsonResult GetUploadedDocumentDetail(string projectCode, string createdBy, string createdDate)
        {

            var result = projectUpdatesRepository.GetUploadedDocumentDetail(projectCode, createdBy, createdDate);

            return Json(result);
        }
        public JsonResult GetCommentsHistory(string projectCode, string FromDate, string ToDate,string Filter)
        {
            JsonList jsonList = new JsonList();
            try {
                var result = projectUpdatesRepository.GetPU_CommentsHistory(projectCode, FromDate, ToDate,Filter);
                jsonList.message = result.Item1;
                jsonList.ProjectDetailsHeaderDataList = result.Item2;
                return Json(jsonList);

            }
            catch(Exception e)
            {
                jsonList.message ="Exception in Project Updates Controller";
                return Json(jsonList);
            }
           
        }

        public IActionResult DownloadFile(string fileName)
        {
            // Replace the fileDirectoryPath with the actual directory where your files are stored
            var filePath = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["ProjectUpdatesFileUpload:ProjectUpdatesFileUploadLocal"], fileName);

            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "application/octet-stream", fileName);
            }

            // If the file does not exist, you can return an appropriate response, such as a 404 Not Found
            return NotFound();
        }
    }

}
