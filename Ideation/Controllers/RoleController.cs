using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using DocumentFormat.OpenXml.Office2010.Excel;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Xml;

namespace Ideation.Controllers
{
    [SessionExpire]
    [AuthorizeActionFilter]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class RoleController : Controller
    {
        private readonly IRoleRepository RoleRepository;
        private readonly IMasterRepository master;
        public RoleController(IRoleRepository RoleRepo, IMasterRepository master)
        {
            RoleRepository = RoleRepo;
            this.master = master;
        }

        [MenuAccess("Role")]
        public IActionResult RoleList()
        {
            Role data = new Role();
            data.IsEdit = ViewBag.IsEdit ? true : false;
            data.IsRead = ViewBag.IsRead ? true : false;
            return View(data);
        }
        /// <summary>
        /// Adding or Editing the Roles
        /// </summary>
        /// <param name="RoleId"></param>
        /// <returns></returns>
        [MenuAccess("Role")]
        [HttpGet, EncryptedActionParameter]
        public IActionResult Add(string RoleId)
        {
            Role data = new Role();
            ViewBag.PageTitle = "Add Role";
            data.Status = "1";
            if (RoleId != null)
            {
                data.RoleId = Convert.ToInt32(RoleId);
                ViewBag.PageTitle = "Edit Role";
                var userdata = RoleRepository.GetRoleListById(Convert.ToInt32(RoleId)).SingleOrDefault();
                data.RoleName = userdata.RoleName;
                data.Status = userdata.IsActive.ToString();
                data.RoleId = userdata.RoleId;
            }
            data.IsEdit = ViewBag.IsEdit ? true : false;
            data.IsRead = ViewBag.IsRead ? true : false;
            return View(data);
        }
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]

        public IActionResult Add(Role data)
        {
            if (ModelState.IsValid)
            {
                var UserId = HttpContext.Session.GetString("UserName");

                long result = RoleRepository.InsertUpdate(data, UserId);
                if (result > 0)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "Role Inserted Successfully";
                    return RedirectToAction("RoleList", "Role");
                }
                else if (result == 0)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "Role Updated Successfully";
                    return RedirectToAction("RoleList", "Role");
                }
                else if (result == -1)
                {
                    TempData["MessageClass"] = "alert-danger";
                    TempData["Message"] = "Role already exist";
                    if (data.RoleId != 0)
                    {
                        ViewBag.PageTitle = "Edit Role";
                    }
                    else
                    {
                        ViewBag.PageTitle = "Add Role";
                    }
                }

            }
            return View();
        }

        [MenuAccess("Role")]
        [HttpGet, EncryptedActionParameter]
        public IActionResult MenuAdd(string RoleId, string RoleName)
        {
            var Role = Convert.ToInt32(RoleId);
            //var finalRole = Replace(RoleName, '', '');
            var finalRole = RoleName.Replace("#", "&");
            var list = RoleRepository.GetMenuListByRoleId(Role);
            ViewBag.RoleName = finalRole;
            ViewBag.RoleId = RoleId;
            ViewBag.Edit = ViewBag.IsEdit ? true : false;
            ViewBag.Read = ViewBag.IsRead ? true : false;
            return View(list);
        }
        /// <summary>
        /// To display the Roles
        /// </summary>
        /// <returns></returns>
        public string RoleListDisplay()
        {

            var DocumentData = RoleRepository.GetRolelist();
            var jsonResult = JsonConvert.SerializeObject(DocumentData);
            return jsonResult;
        }
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]

        public JsonResult MenuMappingJson(long Id)
        {
            var list = RoleRepository.GetMenuListByRoleId(Id);
            // HttpContext.Session.SetString("MenuDetails", JsonConvert.SerializeObject(list));
            return Json(list);
        }
        /// <summary>
        /// updating menu master of particular Role
        /// </summary>
        /// <param name="MenuPermissions"></param>
        /// <param name="RoleId"></param>
        /// <returns></returns>
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]

        public JsonResult MenuAdd(string MenuPermissions, long RoleId)
        {
            XmlDocument xmlDocument = JsonConvert.DeserializeXmlNode(MenuPermissions, "MenuPermissions");
            var xmlString = xmlDocument.InnerXml;
            //var RoleId = 1;
            var result = RoleRepository.UserMenu_InsertUpdateByRoleId(xmlString, RoleId, 1);
            if (result > 0)
                if (result == 1)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "Inserted Successfully";
                }
                else if (result == 2)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "Updated Successfully";
                }
            return Json(result);
        }
    }
}
