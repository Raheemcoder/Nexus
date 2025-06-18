//using ClosedXML.Excel;
//using Ideation.Core;
//using Ideation.CustomAttributes;
//using Ideation.Models;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.Build.Evaluation;
//using Microsoft.CodeAnalysis;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Schema;
//using System.Diagnostics;
//using System.Xml.Serialization;
//using SelectListItem = System.Web.Mvc.SelectListItem;

//namespace Ideation.Controllers
//{
//    [SessionExpire]
//    [Authorize]
//    [TypeFilter(typeof(OnExceptionAttribute))]
//    public class HomeController : Controller
//    {
//        private readonly ILogger<HomeController> _logger;

//        private readonly IHomeRepository _homeRepository;
//        private readonly IEPPMMasterRepository _masterRepository;

//        public HomeController(ILogger<HomeController> logger, IHomeRepository homeRepository, IEPPMMasterRepository masterRepository)
//        {
//            _logger = logger;
//            this._homeRepository = homeRepository;
//            this._masterRepository = masterRepository;
//        }

//        public IActionResult Index()
//        {
//            return View();
//        }

//        public IActionResult Privacy()
//        {
//            return View();
//        }

//        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
//        public IActionResult Error()
//        {
//            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
//        }

//        [HttpGet]
//        public IActionResult Summary()
//        {
//            PMUMapping project = new PMUMapping();
//            project = _homeRepository.Get_ProjectStatusList(HttpContext.Session.GetString("UserName"), Convert.ToInt32(HttpContext.Session.GetString("RoleId")));
//            var getProjectList = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HttpContext.Session.GetString("UserName"));
//            project.ProjectList = getProjectList.Select(m => new SelectListItem { Value = m.ProjectId.ToString(), Text = m.ProjectName });
//            project.ProjectVersionList = _masterRepository.GetVersionForSummary(0, 0);
            
//            return View(project);
//        }
//        [HttpPost]
//        public ActionResult MilestoneList(string projectId, string projectName,int HubId,string HubName,string Version)
//        {
//            if (projectName != null)
//            {
//                HttpContext.Session.SetString("projectName", projectName);
//            }
//            HttpContext.Session.SetString("projectId", projectId);
//            if (HubName != null)
//            {
//                HttpContext.Session.SetString("HubName", Convert.ToString(HubName));
//            }
//            HttpContext.Session.SetString("HubId", Convert.ToString(HubId));
//            HttpContext.Session.GetString(Convert.ToString(HubId));
//            var summaryList = _homeRepository.Get_ProjectSummaryList(Convert.ToInt32(projectId), HttpContext.Session.GetString("UserName").ToString(), Convert.ToInt32(HttpContext.Session.GetString("RoleId")),HubId,Version);
//            //var summaryList = _homeRepository.Get_ProjectSummaryList(projectId,);
//            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(summaryList);
//            return Json(jsonData);
//        }
//        public IActionResult ErrorPage()
//        {
//            return View();
//        }
//        public ActionResult GetVersionRemarksDetails(string projectId,int HubId,string Version)
//        {

//            var versionremarksdetails = _homeRepository.Get_ProjectVersiondetails(Convert.ToInt32(projectId),HubId,Version);
//            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(versionremarksdetails);
//            return Json(jsonData);
//        }
//        [HttpGet]
//        public IActionResult GetExcelSummaryData(string projectId, string projectName, int HubId,string HubName,string Version)
//        {
//            PMUMapping pmumapping = new PMUMapping();
//            HttpContext.Session.SetString("projectId", projectId);
//            HttpContext.Session.SetString("HubId", Convert.ToString(HubId));
//            string fileName = projectName + "_" + HubName+ "_"+ Version+ ".xlsx";
//            pmumapping.SummaryExcelData = _homeRepository.Get_ProjectSummaryExcelList(Convert.ToInt32(projectId), HttpContext.Session.GetString("UserName").ToString(), Convert.ToInt32(HttpContext.Session.GetString("RoleId")), HubId,Version);
//            using (var workbook = new XLWorkbook())
//            {
//                var worksheet = workbook.Worksheets.Add("SummaryExcel");
//                var currentRow = 1;
//                worksheet.Cell(currentRow, 1).Value = "Sl.No";
//                worksheet.Cell(currentRow, 2).Value = "WBS Header";
//                worksheet.Cell(currentRow, 3).Value = "Task Name";
//                worksheet.Cell(currentRow, 4).Value = "Dependency";
//                worksheet.Cell(currentRow, 5).Value = "Task Status";
//                worksheet.Cell(currentRow, 6).Value = "Baseline Start Date";
//                worksheet.Cell(currentRow, 7).Value = "Baseline End Date";
//                worksheet.Cell(currentRow, 8).Value = "Start Date";
//                worksheet.Cell(currentRow, 9).Value = "End Date";
//                worksheet.Cell(currentRow, 10).Value = "Submitted Date";
//                worksheet.Cell(currentRow, 11).Value = "Actual Completed Date";
//                worksheet.Cell(currentRow, 12).Value = "User Name";
//                worksheet.Cell(currentRow, 13).Value = "Remarks";
//                worksheet.Cell(currentRow, 14).Value = "Completion Remarks";
//                worksheet.Cell(currentRow, 15).Value = "File";
//                var index = 1;
//                foreach (var item in pmumapping.SummaryExcelData)
//                {
//                    currentRow++;

//                        worksheet.Cell(currentRow, 1).Value = index;
//                        worksheet.Cell(currentRow, 2).Value = item.WBSHeaderDesc;
//                        worksheet.Cell(currentRow, 3).Value = item.TaskDesc;
//                        worksheet.Cell(currentRow, 4).Value = item.SetRelation;
//                        worksheet.Cell(currentRow, 5).Value = item.Status;
//                        if (item.Status== "OverDue")
//                        {
                            
//                            worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
//                            worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.Red;


//                    }
//                    else if(item.Status == "Completed")
//                        {

//                        worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
//                        worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.Green;


//                    }
//                    //else if (item.Status == "Not Started")
//                    //    {
                            
//                    //    worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
//                    //    worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.DarkBlue;

//                    //}
//                    else if(item.Status == "Open")
//                        {
                           
//                        worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
//                        worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.Orange;

//                    }
//                    else if (item.Status == "In Progress")
//                    {
//                        worksheet.Cell(currentRow, 5).Style.Font.FontColor = XLColor.White;
//                        worksheet.Cell(currentRow, 5).Style.Fill.BackgroundColor = XLColor.DarkBlue;
//                    }
//                    else
//                        {
//                            worksheet.Cell(currentRow, 5).Value = " ";

//                        }
//                    worksheet.Cell(currentRow, 6).Value = item.baselineStartDate;
//                    worksheet.Cell(currentRow, 7).Value = item.baselineEndDate;
//                    worksheet.Cell(currentRow, 8).Value = item.StartDate;
//                    worksheet.Cell(currentRow, 9).Value = item.EndDate;
//                    worksheet.Cell(currentRow, 10).Value = item.CompletedDate;
//                    worksheet.Cell(currentRow, 11).Value = item.ActualCompletedDate;
//                    worksheet.Cell(currentRow, 12).Value = item.UserName;
//                    worksheet.Cell(currentRow, 13).Value = item.Extention;
//                    worksheet.Cell(currentRow, 14).Value = item.Completion;
//                    worksheet.Cell(currentRow, 15).Value = item.FileName;
//                    if(item.FileName ==1)
//                    {
//                        worksheet.Cell(currentRow, 15).Value = "Yes";

//                    }
//                    else
//                    {
//                        worksheet.Cell(currentRow, 15).Value = " ";

//                    }
//                    index++;
//                }
//                worksheet.Column("1").Width = 10;
//                worksheet.Column("2").Width = 25;
//                worksheet.Column("3").Width = 25;
//                worksheet.Column("4").Width = 25;
//                worksheet.Column("5").Width = 25;
//                worksheet.Column("6").Width = 25;
//                worksheet.Column("7").Width = 30;
//                worksheet.Column("8").Width = 20;
//                worksheet.Column("9").Width = 20;
//                worksheet.Column("10").Width = 20;
//                worksheet.Column("11").Width = 20;
//                worksheet.Column("12").Width = 40;
//                worksheet.Column("13").Width = 40;
//                worksheet.Column("14").Width = 25;
//                worksheet.Column("15").Width = 30;
               
//                using (var stream = new MemoryStream())
//                {
//                    workbook.SaveAs(stream);
//                    var content = stream.ToArray();
//                    return File(content,
//                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//                    fileName);
//                }
//            }
           
            
//        }
//        public IActionResult GetSummaryVersion(int projectId, int HubId)
//        {
//            var result = _masterRepository.GetVersionForSummary(projectId, HubId);
//            return Ok(result);
//        }
        
//    }
//}