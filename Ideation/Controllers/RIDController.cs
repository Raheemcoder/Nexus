using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Math;
using Ideation.Controllers;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.PowerBI.Api.Models;
using Newtonsoft.Json;
using System.IO.Compression;

namespace Ideation.Controllers
{
    [SessionExpire]
    public class RIDController : BaseController
    {
        private readonly IRIDRepository RIDRepository;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration? Configuration;
        public RIDController(IWebHostEnvironment webHostEnvironment, IRIDRepository RIDRepository, IConfiguration Configuration)
        {
            this.RIDRepository = RIDRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.Configuration = Configuration;
        }

        //[HttpGet]
        //public IActionResult RIDIndex()
        //{
        //    RID rid = new RID();
        //    rid.DivisionList = RIDRepository.GetDivisionList("Division");
        //    return View("RIDIndex", rid);
        //}

        //[HttpGet]
        //[EncryptedActionParameter]
        //public IActionResult SearchRID(string DivisionId, string DivisionName)
        //{
        //    if (HttpContext.Session.GetString("Role") == "IRA" || HttpContext.Session.GetString("Role").ToUpper() == "IRA GLOBAL" || HttpContext.Session.GetString("Role").ToUpper() == "IRA INDIA")
        //    {
        //        if(DivisionId != null)
        //        {
        //            HttpContext.Session.SetString("DivisionId", DivisionId);
        //        }
        //        return RedirectToAction("IngredientsRegulation", "RID");
        //    }

        //    var Source = "RnD";
        //    var LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var Status = 111;
        //    if (DivisionId != null)
        //    {
        //        //ViewBag.PageName = DivisionName;
        //        HttpContext.Session.SetString("DivisionId", DivisionId);
        //        HttpContext.Session.SetString("DivisionName", DivisionName);
        //        RID rid = new RID();
        //        var result = RIDRepository.GetIngredientList(DivisionId, Source, LoginId);
        //        rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
        //        var result1 = RIDRepository.GetComplianceRequestList(DivisionId, LoginId, Status);
        //        rid.ComplianceRequestListJson = JsonConvert.SerializeObject(result1);
        //        rid.FunctionList = RIDRepository.GetFunctionList();
        //        rid.RegionList = RIDRepository.GetRegionList();
        //        rid.IRAStatusList = RIDRepository.GetIRAStatusList();

        //        return View("SearchRID", rid);
        //    }
        //    else
        //    {
        //        DivisionId = HttpContext.Session.GetString("DivisionId");
        //        DivisionName = HttpContext.Session.GetString("DivisionName");
        //        //ViewBag.PageName = DivisionName;
        //        RID rid = new RID();
        //        var result = RIDRepository.GetIngredientList(DivisionId, Source, LoginId);
        //        rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
        //        var result1 = RIDRepository.GetComplianceRequestList(DivisionId, LoginId, Status);
        //        rid.ComplianceRequestListJson = JsonConvert.SerializeObject(result1);
        //        rid.FunctionList = RIDRepository.GetFunctionList();
        //        rid.RegionList = RIDRepository.GetRegionList();
        //        rid.IRAStatusList = RIDRepository.GetIRAStatusList();

        //        return View("SearchRID", rid);
        //    }
        //}

        //public JsonResult GetIngredientBasedOnSearch(string StartDate, string EndDate, string SearchText,string Source)
        //{
        //    var LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var DivisionId = HttpContext.Session.GetString("DivisionId");
        //    var result = RIDRepository.GetIngredientList(DivisionId, Source,LoginId, StartDate, EndDate, SearchText);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}

        //public JsonResult GetComplianceRequestBasedOnSearch(int Status)
        //{
        //    var DivisionId = HttpContext.Session.GetString("DivisionId");
        //    var LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var result = RIDRepository.GetComplianceRequestList(DivisionId,LoginId,Status);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}

        //[HttpGet]
        //public JsonResult GetParticularIngredientDetails(int IngredientId)
        //{
        //    var result = RIDRepository.GetParticularIngredientDetails(IngredientId);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}
        //[HttpGet]
        //public IActionResult IngredientsRegulation()
        //{

        //    RID rid = new RID();
        //    rid.Division_Id = HttpContext.Session.GetString("DivisionId");
        //    rid.LoginId = HttpContext.Session.GetString("UserName").ToString();

        //    rid.Source = "IRA";
        //    var result = RIDRepository.GetIngredientList(rid.Division_Id,rid.Source," ");
        //    rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
        //    return View("IngredientsRegulation", rid);
        //}
        //[HttpGet]
        //public IActionResult GetIngredientsRegulationById(long IngredientId)
        //{
        //    var list = RIDRepository.IngredientListById(IngredientId);
        //    string jsonResponse = JsonConvert.SerializeObject(list);
        //    return Json(jsonResponse);
        //}
        //[HttpGet]
        //[EncryptedActionParameter]
        //public IActionResult AddIngredient(string ingredientId)
        //{
        //    var role = HttpContext.Session.GetString("Role");
        //    RID rid = new RID();
        //    rid.IngredientReqId = Convert.ToInt32(ingredientId);
        //    rid.IngredientId = Convert.ToInt32(ingredientId);
        //    if (rid.IngredientId > 0)
        //        {
        //            rid = RIDRepository.IngredientListByIngredientId(rid.IngredientId,role);

        //            rid.IngredientListData = JsonConvert.SerializeObject(rid.IngredientsList);
        //            rid.IngredientFileData = JsonConvert.SerializeObject(rid.IngredientFileList);
        //            if (!String.IsNullOrEmpty(rid.FunctionId))
        //            {
        //                rid.FunctionId_arr = rid.FunctionId.Split(',');
        //            }
        //    }
        //    rid.IngredientId = Convert.ToInt32(ingredientId);
        //    rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(RIDRepository.GetAddDetails(role));
        //    rid.Division_Id = HttpContext.Session.GetString("DivisionId");
        //    rid.FunctionDetails = RIDRepository.GetFunctionDropdown(rid.IngredientId,"AddIngredient");
           
        //    return View(rid);
        //}
        //[HttpPost]
        //public IActionResult DeleteIngredient(int ingredientId)
        //{
        //    RID rid = new RID();
        //    rid.LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var result = RIDRepository.DeleteIngredientById(ingredientId,rid.LoginId);
        //    TempData["Message"] = result.Item1;
        //    TempData["Messageclass"] = result.Item2;
        //    return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());

        //}
        //[HttpGet]
        //public JsonResult GetRegulatoryStatus()
        //{
        //    var result = RIDRepository.GetAddDropdown();
        //    var SLTypeList = result.GroupBy(test => test.Value)
        //           .Select(grp => grp.First())
        //           .ToList().Distinct();
        //    return Json(SLTypeList, new System.Text.Json.JsonSerializerOptions());
        //}
        //[HttpPost]
        ////[DisableRequestSizeLimit]
        //public JsonResult SaveDetails([FromForm] RID rID)
        //{
        //    var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
           
        //    List<RID> attachmentnames = JsonConvert.DeserializeObject<List<RID>>(rID.DocumentData);
        //    var count = attachmentnames.Count();
        //    rID.LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var result = RIDRepository.IngredientsDetailsInsert(rID);
        //    if(result.Item1.Contains("_"))
        //    {
        //        rID.IngredientId = Convert.ToInt32(result.Item1.Split("_")[1]);
        //    }
        //    TempData["Message"] = result.Item1.Split("_")[0];
        //    TempData["Messageclass"] = result.Item2;
        //    if (result.Item1.Contains("Successfully")) 
        //    {
        //        var filePath = uploadsFolder + "\\" + rID.IngredientId;

        //        if (rID.PostedFile != null && rID.PostedFile.Count >= 0)
        //        {
        //            var file = rID.PostedFile;

        //            for (var i = 0; i < count; i++)
        //            {
        //                var postedFile = rID.PostedFile[i];
        //                var _newPath = filePath + "\\" + attachmentnames[i].RegionId + "\\" + attachmentnames[i].CategoryId + "\\";
        //                if (!Directory.Exists(_newPath))
        //                {
        //                    Directory.CreateDirectory(_newPath);
        //                }
        //                var fileName = attachmentnames[i].EnclosureName;
        //                if (postedFile.Length > 0 && postedFile.FileName != null && postedFile.FileName != "")
        //                {

        //                    var path = _newPath + fileName;
        //                    using (var stream = new FileStream(path, FileMode.Create))
        //                    {
        //                        postedFile.CopyTo(stream);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());


        //}
        //[HttpPost]
        //[RequestSizeLimit(100000000000)]
        //[DisableRequestSizeLimit]
        //public JsonResult UpdateDetails([FromForm] RID rID)
        //{
        //    var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
        //    List<RID> attachmentnames = JsonConvert.DeserializeObject<List<RID>>(rID.DocumentData);
        //    var count = rID.PostedFile!=null?rID.PostedFile.Count:0;
        //    rID.LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var result = RIDRepository.IngredientsDetailsUpdate(rID);
        //    rID.IngredientId = Convert.ToInt32(result.Item1.Split("_")[1]);
        //    var filePath = uploadsFolder + "\\" + rID.IngredientId;            
        //    TempData["Message"] = result.Item1.Split("_")[0];
        //    TempData["Messageclass"] = result.Item2;
        //    if (result.Item1.Contains("Successfully"))
        //    {
        //        if (rID.PostedFile != null && rID.PostedFile.Count >= 0)
        //        {
        //            var file = rID.PostedFile;

        //            for (var i = 0; i < count; i++)
        //            {
        //                var postedFile = rID.PostedFile[i];
        //                var postedFileName = postedFile.FileName.Replace(" ","");
        //              var index=  attachmentnames.FindIndex(m=>m.EnclosureName== postedFileName);
        //                var _newPath = filePath + "\\" + attachmentnames[index].RegionId + "\\" + attachmentnames[index].CategoryId + "\\";
        //                if (!Directory.Exists(_newPath))
        //                {
        //                    Directory.CreateDirectory(_newPath);
        //                }
        //                var fileName = attachmentnames[index].EnclosureName;
        //                if (postedFile.Length > 0 && postedFile.FileName != null && postedFile.FileName != "")
        //                {

        //                    var path = _newPath + fileName;
        //                    using (var stream = new FileStream(path, FileMode.Create))
        //                    {
        //                        postedFile.CopyTo(stream);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());

        //}
        //[HttpGet]
        //public IActionResult RIDViewEdit()
        //{

        //    RID rid = new RID();
        //    //rid.Division_Id = HttpContext.Session.GetString("DivisionId");
        //    rid.Division_Id = HttpContext.Session.GetString("DivisionId");
        //    //rid.LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    rid.StatusDetails = RIDRepository.GetStatusList("IRStatus");
        //    var result = RIDRepository.GetIngredientRequest(rid.Division_Id, " ", "", "", 0);
        //    rid.IngredientListJson = JsonConvert.SerializeObject(result);
        //    return View("RIDViewEdit", rid);
        //}
        //public JsonResult GetIngredientBasedOnSearchRegulation(string StartDate, string EndDate,int Status)
        //{
        //    RID rid = new RID();
        //    rid.Division_Id = HttpContext.Session.GetString("DivisionId");
        //    //rid.LoginId = HttpContext.Session.GetString("UserName").ToString();

        //    var result = RIDRepository.GetIngredientRequest(rid.Division_Id,"", StartDate, EndDate, Status);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}
        
        //[HttpGet]
        //public IActionResult ApproveRID()
        //{
        //    var DivisionId = HttpContext.Session.GetString("DivisionId");
        //    var DivisionName = HttpContext.Session.GetString("DivisionName");
        //    var LoginId = HttpContext.Session.GetString("UserName").ToString();
           
        //    RID rid = new RID();
        //    var result = RIDRepository.Approve_GetIngredientList(DivisionId,LoginId);
        //    var UserApprovalLevel = RIDRepository.GetUserApprovalLevel(LoginId);
        //    HttpContext.Session.SetString("UserApprovalLevel", UserApprovalLevel);
        //    rid.UserApprovalLevel = UserApprovalLevel;

        //    if(UserApprovalLevel.ToLower() == "level1")
        //    {
        //        var result2 = RIDRepository.GetMostRecentRemark();
        //        rid.MostRecentRemark = JsonConvert.SerializeObject(result2);
        //    }

        //    rid.Approve_DivisionBasedIngredientListJson = JsonConvert.SerializeObject(result);
        //    return View("ApproveRID", rid);
        //}

        //[HttpGet]
        //public JsonResult Approve_GetParticularIngredientDetails(int IngredientId)
        //{
        //    var result = RIDRepository.Approve_GetParticularIngredientDetails(IngredientId);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}

        //[HttpGet]
        //public JsonResult RegulatoryStatusDropDownData()
        //{
        //    var result = RIDRepository.RegulatoryStatusDropDownData("RegStatusAndCategory");
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}

        //[HttpPost]
        //public string ApproveRevertIngredient(string IngredientToApprove,string Action,string Remarks,bool IsSubmitted=true)
        //{
        //    try
        //    {
        //        var UserId = HttpContext.Session.GetString("UserName");
        //        var ApprovalLevel = "";
        //        if (HttpContext.Session.GetString("UserApprovalLevel") != null)
        //        {
        //            ApprovalLevel = HttpContext.Session.GetString("UserApprovalLevel");
        //        }

        //        var result = RIDRepository.ApproveRevertIngredient(UserId, IngredientToApprove, ApprovalLevel, Action, Remarks, IsSubmitted);

                

        //        if (result.ToLower().Contains("successfully") == true)
        //        {
        //            if (IsSubmitted ==true)
        //            {
        //                TempData["MessageClass"] = "alert-success";
        //                TempData["Message"] = "Saved Successfully";
        //                return "1";
        //            }
        //            else
        //            {
        //                TempData["MessageClass"] = "alert-success";
        //                TempData["Message"] = "Updated Successfully";
        //                return "2";
        //            }
        //        }
        //        else
        //        {
        //            return "0";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return "0";
        //    }
        //}

        //[HttpGet]
        //public JsonResult GetUpdatedIngredentialDetail()
        //{
        //    var DivisionId = HttpContext.Session.GetString("DivisionId");
        //    var LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var result = RIDRepository.Approve_GetIngredientList(DivisionId, LoginId);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    RID rid = new RID();
        //    var UserApprovalLevel = RIDRepository.GetUserApprovalLevel(LoginId);
        //    HttpContext.Session.SetString("UserApprovalLevel", UserApprovalLevel);
        //    rid.UserApprovalLevel = UserApprovalLevel;
        //    return Json(jsonResponse);
        //}

        //public JsonResult ComplianceRequest_Save(string IngredientName,string Region, string FunctionId, string CASNumber)
        //{
        //    var DivisionId = HttpContext.Session.GetString("DivisionId");
        //    var LoginId = HttpContext.Session.GetString("UserName").ToString();
        //    var result = RIDRepository.ComplianceRequest_Save(IngredientName, Region, FunctionId, LoginId, DivisionId, CASNumber);
        //    TempData["ComplianceRequest_SaveMessage"] = result.Item1;
        //    TempData["ComplianceRequest_SaveMessageClass"] = result.Item2;
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}
        //public IActionResult ZipFileDownload(string[] docNames, int ingredientId, int regionId, int categoryId)
        //{
        //    var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
        //    var filePath = uploadsFolder + "\\" + ingredientId + "\\" + regionId + "\\" + categoryId + "\\";
        //    //string[] fileNames = file.Split(",");
        //    var zipfilename = "DownloadZip.zip";
        //    string[] fileNames = docNames[0].Contains(",") ? docNames[0].Split(",") : docNames;
        //    List<string> filePaths = new List<string>();
        //    foreach (var path in fileNames)
        //    {
        //        filePaths.Add(Path.Combine(filePath, path));
        //    }
        //    var tempFile = Path.GetTempFileName();
        //    using (var zipFile = System.IO.File.Create(tempFile))
        //    using (var zipArchive = new ZipArchive(zipFile, ZipArchiveMode.Create))
        //    {
        //        foreach (var file in filePaths)
        //        {
        //            zipArchive.CreateEntryFromFile(file, Path.GetFileName(file));
        //        }
        //    }
        //    var stream = new FileStream(tempFile, FileMode.Open);
        //    StreamWriter sw = new StreamWriter(stream);
        //    sw.AutoFlush = true;
        //    stream.Flush();
        //    stream.Position = 0;
        //    return File(stream, "application/octet-stream", zipfilename);
        //}
        //[HttpGet]
        //[EncryptedActionParameter]
        //public IActionResult AddIngredientRequest(string ingredientId)
        //{
        //    var role = HttpContext.Session.GetString("Role");
        //    RID rid = new RID();
        //    rid.IngredientId = Convert.ToInt32(ingredientId);
        //    if (rid.IngredientId > 0)
        //    {
        //        rid = RIDRepository.IngredientRequestListById(rid.IngredientId,role).FirstOrDefault();
        //        rid.Source = "IngredientRequest";
        //        if (!String.IsNullOrEmpty(rid.FunctionId))
        //        {
        //            rid.FunctionId_arr = rid.FunctionId.Split(',');
        //        }
        //        rid.FunctionDetails = RIDRepository.GetFunctionDropdown(Convert.ToInt32(ingredientId), "Compliance");
        //    }
        //    rid.IngredientId = Convert.ToInt32(ingredientId);
        //    rid.DivisionBasedIngredientListJson = JsonConvert.SerializeObject(RIDRepository.GetAddDetails(role));
        //    rid.Division_Id = HttpContext.Session.GetString("DivisionId");

        //    rid.FunctionDetails = RIDRepository.GetFunctionDropdown(rid.IngredientId,"Compliance");
        //    return View(rid);
        //}
        //[HttpGet]
        //public FileResult FileDownload(string docName, int ingredientId,int regionId,int categoryId)
        //{
        //    try
        //    {
        //        var uploadsFolder = Path.Combine(this.webHostEnvironment.WebRootPath, Configuration["RIDFileUpload:RIDFileUploadLocal"]);
        //        var filePath = uploadsFolder + "\\" + ingredientId + "\\" + regionId + "\\" + categoryId + "\\";
        //        var FileUploadPath = filePath + docName;
        //        byte[] bytes = System.IO.File.ReadAllBytes(FileUploadPath);
        //        return File(bytes, "application/octet-stream", docName);
        //    }
        //    catch (Exception)
        //    {
        //        return File("", "application/octet-stream", "Try Again");
        //    }
        //}
        //public IActionResult FunctionMaster()
        //{
        //    return View();
        //}
        //public IActionResult GetFunctionList()
        //{
        //    var result = RIDRepository.GetFunction();
        //    return Ok(result);
        //}
        //[HttpPost]
        //public IActionResult SaveFunction(int functionId,string functionName,bool status)
        //{
        //    var LoginId = HttpContext.Session.GetString("UserName");
        //    var result = RIDRepository.SaveFunctionDetails(functionId, functionName, status, LoginId);
        //    TempData["Message"] = result.Item1;
        //    TempData["Messageclass"] = result.Item2;
        //    return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());
        //}
        //[HttpPost]
        //public IActionResult DeleteFunction(int functionId)
        //{
        //    var LoginId = HttpContext.Session.GetString("UserName");
        //    var result = RIDRepository.DeleteFunctionDetails(functionId,LoginId);
        //    TempData["Message"] = result.Item1;
        //    TempData["Messageclass"] = result.Item2;
        //    return Json(result.Item1, new System.Text.Json.JsonSerializerOptions());

        //}
        //public JsonResult DisplayUploadedFiles(int IngredientId,int RegionId,int CategoryId)
        //{
        //    var result = RIDRepository.GetUploadedFiles(IngredientId, RegionId, CategoryId);
        //    string jsonResponse = JsonConvert.SerializeObject(result);
        //    return Json(jsonResponse);
        //}

    }
}