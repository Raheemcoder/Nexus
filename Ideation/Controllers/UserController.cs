using DocumentFormat.OpenXml.Wordprocessing;
using Ideation.Core;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Ideation.Filters;
using System.Linq.Expressions;
using Ideation.CustomAttributes;

namespace Ideation.Controllers
{
    [SessionExpire]
    [AuthorizeActionFilter]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly IMasterRepository master;
        //IConfiguration configuration;

        public UserController(IUserRepository UserRepo, IMasterRepository master)
        {
            userRepository = UserRepo;
            this.master = master;
        }
        [MenuAccess("User")]

        public IActionResult List()
        {
            User data = new User();
            data.IsEdit = ViewBag.IsEdit ? true : false;
            data.IsRead = ViewBag.IsRead ? true : false;
            return View(data);
        }
        /// <summary>
        /// Edit UserData
        /// </summary>
        /// <param name="LoginID"></param>
        /// <returns></returns>
        [MenuAccess("User")]
        [HttpGet, EncryptedActionParameter]
        public IActionResult Add(string LoginId)
        {
            ModelState.Clear();

            PBMasters masters = master.GetPBMasters();
            User data = new User();
            ViewBag.Title = "Add";
            ViewBag.PageTitle = "Add User";
            try
            {
                if (LoginId != null)
                {
                    data.LoginId = LoginId.ToString();
                    ViewBag.Title = "Edit ";
                    ViewBag.PageTitle = "Edit User";
                    var userdata = userRepository.Userlist(data.LoginId).FirstOrDefault();
                    data.Role = userdata.Role;
                    data.UserId = userdata.UserId;
                    data.Name = userdata.Name.ToString();
                    data.EmailId = userdata.EmailId.ToString();
                    data.DivisionNames = userdata.DivisionNames;
                    data.CategoryNames = userdata.CategoryNames;
                    // data.Category = userdata.Category;
                    data.UserType = userdata.UserType;
                    data.Hub = userdata.Hub;
                    data.HubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });
                    data.Active = userdata.Status;
                    data.Manager = String.IsNullOrWhiteSpace(userdata.ManagerNames) ? new string[0] : userdata.ManagerNames.Replace(" ", "").Split(',');
                    //data.Manager = userdata.ManagerNames;
                    data.Division = String.IsNullOrWhiteSpace(userdata.DivisionNames) ? new string[0] : userdata.DivisionNames.Replace(" ", "").Split(',');
                    data.Category = String.IsNullOrWhiteSpace(userdata.CategoryNames) ? new string[0] : userdata.CategoryNames.Replace(" ", "").Split(',');
                    data.RoleList = masters.RoleList.Select(m => new SelectListItem { Text = m.UserRoleName, Value = m.UserRoleId.ToString() });
                    data.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
                    data.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
                    data.UserTypeList = masters.UserTypeList.Select(m => new SelectListItem { Text = m.UserTypeName, Value = m.UserTypeId.ToString() });
                    data.UserList = userRepository.GetUserNames().Select(m => new SelectListItem { Text = m.EmailID, Value = m.UserId.ToString() });
                    data.IsEdit = ViewBag.IsEdit ? true : false;
                    data.IsRead = ViewBag.IsRead ? true : false;
                    return View(data);
                }
                data.HubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });
                data.RoleList = masters.RoleList.Select(m => new SelectListItem { Text = m.UserRoleName, Value = m.UserRoleId.ToString() });
                data.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
                data.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
                data.UserTypeList = masters.UserTypeList.Select(m => new SelectListItem { Text = m.UserTypeName, Value = m.UserTypeId.ToString() });
                data.UserList = userRepository.GetUserNames().Select(m => new SelectListItem { Text = m.EmailID, Value = m.UserId.ToString() });
                data.IsEdit = ViewBag.IsEdit ? true : false;
                data.IsRead = ViewBag.IsRead ? true : false;
                data.Active = "1";
            }
            catch (Exception ex)
            {
                return Json(ex.ToString());

            }

            return View(data);
        }
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = int.MaxValue)]

        public IActionResult Add(User user)
        {
            var LoggedUserId = HttpContext.Session.GetString("UserName");
            User data = new User();
            PBMasters masters = master.GetPBMasters();
            if (ModelState.IsValid)
            {
                var result = userRepository.AddUser(user, LoggedUserId);
                if (result > 0)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "User Inserted Successfully";
                    return RedirectToAction("List", "User");
                }
                else if (result == 0)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "User Updated Successfully";
                    return RedirectToAction("List", "User");
                }
                else if (result == -1)
                {
                    TempData["MessageClass"] = "alert-danger";
                    TempData["Message"] = "User already exist";
                    if (data.UserId != 0)
                    {
                        ViewBag.PageTitle = "Edit User";
                    }
                    else
                    {
                        ViewBag.PageTitle = "Add User";
                    }


                }
                else
                {
                    TempData["MessageClass"] = "alert-danger";
                    TempData["Message"] = "Error occured while saving. Please contact admin";
                }

                return RedirectToAction("List", "User");
            }

            data.HubList = masters.HubList.Select(m => new SelectListItem { Text = m.HubName, Value = m.HubId.ToString() });
            data.RoleList = masters.RoleList.Select(m => new SelectListItem { Text = m.UserRoleName, Value = m.UserRoleId.ToString() });
            data.DivisionList = masters.DivisionList.Select(m => new SelectListItem { Text = m.DivisionName, Value = m.DivisionId.ToString() });
            data.CategoryList = masters.CategoryList.Select(m => new SelectListItem { Text = m.CategoryName, Value = m.CategoryId.ToString() });
            data.UserTypeList = masters.UserTypeList.Select(m => new SelectListItem { Text = m.UserTypeName, Value = m.UserTypeId.ToString() });
            return View(data);

        }
        /// <summary>
        /// Loading UserData
        /// </summary>
        /// <returns></returns>

        public string UserListDisplay()
        {

            var DocumentData = userRepository.GetUserlist();
            var jsonResult = JsonConvert.SerializeObject(DocumentData);
            return jsonResult;

        }


        [HttpPost]
        public JsonResult GetCategoryBYId(int divisionId)
        {

            var result = userRepository.GetCategory(divisionId);
            var jsonResult = Json(result);
            return jsonResult;

        }
        [HttpPost]
        public JsonResult GetCategoriesBasedonDivision(string divisionIDs)
        {

            var result = userRepository.GetCategoriesBasedOnDivision(divisionIDs);
            var jsonResult = Json(result);
            return jsonResult;

        }

    }
}
