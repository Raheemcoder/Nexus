using ClosedXML.Excel;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Filters;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System.Data.SqlClient;
using static Ideation.Models.MMProject;
using static iText.Html2pdf.Html.AttributeConstants;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class MasterManagementController : BaseController
    {
        #region Constructor
        private readonly IMasterManagementRepository masterManagementRepository;
        private readonly IUserRepository userRepository;
        public MasterManagementController(IMasterManagementRepository masterManagementRepository, IUserRepository userRepository)
            : base()
        {
            this.masterManagementRepository = masterManagementRepository;
            this.userRepository = userRepository;
        }
        #endregion

        #region Project Master
        [HttpGet]
        public IActionResult MMProjectMaster()
        {
            MMProject mmproj = new MMProject();
            mmproj.ProjectStatusList = masterManagementRepository.Get_MMProjectStatusList().
                Select(m => new SelectListItem { Text = m.Status, Value = Convert.ToString(m.Status), Selected = true });
            mmproj.DivisionsList = masterManagementRepository.Get_MMDivisionForDrpdwn().
                Select(m => new SelectListItem { Text = m.DivisionName, Value = Convert.ToString(m.DivisionName), Selected = true });

            return View(mmproj);
        }

        [HttpPost]
        public JsonResult MMProjectMaster(ProjectData projectData)
        {
            Ideation.Models.Common accept = masterManagementRepository.Update_ProjectStatus(projectData.ProjectId, projectData.Status,
                Convert.ToString(HttpContext.Session.GetString("UserName")), projectData.IsActive);

            List<PMUMapping> projectlist = masterManagementRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")),
                Convert.ToString(HttpContext.Session.GetString("UserName"))).ToList();

            for (var index = 0; index < projectlist.Count; index++)
            {
                if (projectlist[index].ProjectId == projectData.ProjectId)
                {
                    projectlist[index].IsActive = projectData.IsActive;
                }
            }

            HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));
            TempData["Message"] = accept.OutMessage;
            TempData["MessageStyle"] = accept.StyleClass;
            return Json("");
        }

        public ActionResult MMProjectList(string Divisions, string IsFiltered, string Status = "")
        {
            EPPMProjectMaster projectmaster = new EPPMProjectMaster();
            List<EPPMProjectMaster> fetchData = masterManagementRepository.Get_ProjectMasterList(Divisions, Status, IsFiltered);
            return Ok(fetchData);
        }

        [HttpGet, EncryptedActionParameter]
        public IActionResult EditMMProjectMaster(string ProjectCode, string IsMilestonesCompleted, string Status)
        {
            try
            {
                MMProject mMProject = new MMProject();
                mMProject = masterManagementRepository.ProjectMaster_EditList(ProjectCode).FirstOrDefault();
                mMProject.HubList = !string.IsNullOrEmpty(mMProject.Hub) ? mMProject.Hub.Split(",") : mMProject.HubList;
                var rnd = mMProject.RnDTeam == null ? "" : mMProject.RnDTeam;
                mMProject.RnDTeamList = rnd;
                mMProject.DropDownList = masterManagementRepository.ProjectMaster_DropDownValues();
                mMProject.ManagerList = masterManagementRepository.ProjectMaster_ManagerValues().Select(S => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Value = S.ManagerId, Text = S.ManagerName + " - " + S.ManagerEmailId });
                if (Status == "In Progress")
                {
                    mMProject.MilestonesCompleted = IsMilestonesCompleted;
                }
                return View(mMProject);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult EditMMProjectMaster(MMProject mMProject)
        {
            mMProject.Hub = string.Join(",", mMProject.HubList);
            mMProject.RnDTeam = string.Join(",", mMProject.RnDTeamList);
            var result = masterManagementRepository.ProjectMaster_UpdateData(mMProject);
            TempData["MessageStyle"] = "alert-success";
            TempData["Message"] = result;
            return RedirectToAction("MMProjectMaster");
        }

        #endregion

        #region UserMaster
        [HttpGet]
        public ActionResult MMUserMaster()
        {
            User user = new User();
            return View(user);
        }

        [HttpGet]
        public ActionResult MMGetUserList()
        {
            var getUserList = masterManagementRepository.UserMaster_GetList("00");
            return Json(getUserList);
        }

        [HttpPost]
        public IActionResult UserList()
        {
            var data = masterManagementRepository.GetUserList();
            return Ok(data);
        }

        [HttpGet, EncryptedActionParameter]
        public ActionResult MMAddUser(string loginId)
        {
            MMUser mMUser = new();
            ViewData["Title"] = "Add User";
            if (!string.IsNullOrEmpty(loginId))
            {
                ViewData["Title"] = "Edit User";
                mMUser = masterManagementRepository.UserMaster_GetList(loginId).Single();
                mMUser.DivisionId = !string.IsNullOrEmpty(mMUser.Division) ? mMUser.Division.Split(",") : mMUser.DivisionId;
                mMUser.CategoryId = !string.IsNullOrEmpty(mMUser.Category) ? mMUser.Category.Split(",") : mMUser.CategoryId;
                mMUser.ManagerId = !string.IsNullOrEmpty(mMUser.Manager) ? mMUser.Manager.Split(",") : mMUser.ManagerId;
                mMUser.ProfileId = !string.IsNullOrEmpty(mMUser.Profile) ? mMUser.Profile.Split(",") : mMUser.ProfileId;
                mMUser.CategoryList = masterManagementRepository.GetCategoryList(mMUser.Division)
                                           .Select(t => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Text = t.Name, Value = t.Id.ToString() }); ;
            }
            mMUser.HUBList = masterManagementRepository.GetHUBandDivisionList("Hub")
                                        .Select(t => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Text = t.Name, Value = t.Id.ToString() });
            mMUser.DivisionList = masterManagementRepository.GetHUBandDivisionList("Division")
                                        .Select(t => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Text = t.Name, Value = t.Id.ToString() });
            mMUser.ManagerList = userRepository.GetUserNames().Select(m => new Microsoft.AspNetCore.Mvc.Rendering.
            SelectListItem { Text = m.EmailID, Value = m.UserId.ToString() });
            mMUser.ApplicationLists = masterManagementRepository.GetApplicationList(loginId);
            mMUser.RoleLists = masterManagementRepository.Get_RolesList();
            mMUser.UserTypeList = masterManagementRepository.GetHUBandDivisionList("UserType").Select(t => new Microsoft.AspNetCore.Mvc.Rendering.
            SelectListItem { Text = t.Name, Value = t.Id.ToString() });
            mMUser.ApplicationListData = JsonConvert.SerializeObject(mMUser.ApplicationLists);
            mMUser.ProfileNameList = masterManagementRepository.GetHUBandDivisionList("ProfileName")
                .Select(t => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Text = t.Name, Value = t.Id.ToString() });
            mMUser.DepartmentList = masterManagementRepository.GetHUBandDivisionList("Department")
                                       .Select(t => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Text = t.Name, Value = t.Id.ToString() });

            return View(mMUser);
        }

        [HttpGet, EncryptedActionParameter]
        public IActionResult CategoryList(string division)
        {
            var data = masterManagementRepository.GetCategoryList(division);
            return Ok(data);
        }

        [HttpPost]
        public ActionResult MMAddUser(MMUser mMUser)
        {
            mMUser.CreatedBy = LoginId;
            mMUser.Division = string.Join(",", mMUser.DivisionId);
            var result = masterManagementRepository.Insert_Update_User(mMUser);
            TempData["MessageClass"] = "alert-success";
            TempData["Message"] = result;
            return Json(result);
        }

        [HttpGet]
        public ActionResult MMGetUsersListForMapping()
        {
            var getUserList = masterManagementRepository.ProjectMaster_UserValues();
            return Json(getUserList);
        }

        [HttpGet]
        public ActionResult GetUsersProjectMappingData(string Projectcode)
        {
            var getUserMappedList = masterManagementRepository.GetUserMappedList(Projectcode);
            return Json(getUserMappedList);
        }

        [HttpGet]
        public async Task<IActionResult> ExportProjectList(string Project)
        {

            IEnumerable<object> fetchData;

            if (Project == "PM")
            {
                fetchData = masterManagementRepository.ProjectMaster_ExportExcel(null).OfType<MMProjectExcelReport>();
            }
            else
            {
                fetchData = masterManagementRepository.UserMaster_ExportExcel("00").OfType<MMUserExcelReport>();
            }

            var header = fetchData.FirstOrDefault().GetType().GetProperties();

            XLWorkbook workbook = new XLWorkbook();

            IXLWorksheet worksheet = (Project == "PM") ? workbook.Worksheets.Add("ProjectMaster_Sheet_1") : workbook.Worksheets.Add("UserMaster_Sheet_1");

            for (int i = 0; i < header.Count(); i++)
            {
                worksheet.Cell(1, i + 1).Value = header[i].Name;
                worksheet.Column(i + 1).Width = 20;
            }

            var headerCells = worksheet.Range(1, 1, 1, header.Length).Cells();

            headerCells.Style.Fill.BackgroundColor = XLColor.LightGray;

            int row = 2;
            foreach (var item in fetchData)
            {
                var properties = item.GetType().GetProperties();

                var propertyValues = new object[properties.Length];

                for (int i = 0; i < properties.Length; i++)
                {
                    propertyValues[i] = properties[i].GetValue(item);
                }

                for (int j = 0; j < propertyValues.Length; j++)
                {
                    worksheet.Cell(row, j + 1).Value = XLCellValue.FromObject(properties[j].GetValue(item));
                }
                row++;
            }
            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var content = stream.ToArray();
                if (Project == "PM")
                {
                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ProjectMaster.xlsx");
                }
                else
                {
                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "UserMaster.xlsx");
                }

            }
        }
        #endregion
    }
}