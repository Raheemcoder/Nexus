using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class LandingController : BaseController
    {
        private readonly IAccountRepository accRepository;
        private readonly IEPPMMasterRepository _masterRepository;
        public LandingController(IAccountRepository accRepository, IEPPMMasterRepository _masterRepository)
        {
            this.accRepository = accRepository;
            this._masterRepository = _masterRepository;
        }
        public IActionResult Index()
        {
            List<AppMappingDetails> mappings = new List<AppMappingDetails>();
            ViewBag.mappings = accRepository.GetAppMappingDetails(LoginId).ToList();
            return View();
        }
        public IActionResult ErrorPage()
        {
            return View();
        }
        public IActionResult UnauthorizedUser()
        {
            return View();
        }
        public IActionResult Redirection(string PageName)
        {
            string UserName = LoginId;
            if (PageName == "IW")
            {
                Account account = new Account();
                account.Username = UserName;
                account.PageName = PageName;

                var result = accRepository.GetAccounts(account);

                var Role = Convert.ToString(result);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);

                //var checkUser = accRepository.GetPBAuthenticationDetails(UserName);
                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("Role", result);
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                    if (result.ToLower() == "admin")
                    {

                        return RedirectToAction("YourInnovation", "NewInnovation");


                    }
                    else if (result.ToLower() == "view ideation")
                    {

                        return RedirectToAction("Dashboard", "NewDashboard");

                    }
                    else
                    {

                        return RedirectToAction("YourInnovation", "NewInnovation");

                    }

                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "PB")
            {
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);

                //var checkUser = accRepository.GetPBAuthenticationDetails(UserName);

                var Role = Convert.ToString("Admin");
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("RoleId", Convert.ToString(1));
                    HttpContext.Session.SetString("Hub", Convert.ToString("talent"));
                    HttpContext.Session.SetString("Role", Convert.ToString("Admin"));
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString("tp046"));
                    HttpContext.Session.SetString("ManagerId", Convert.ToString(10609));
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));

                    return RedirectToAction("ProjectBrief", "ProjectBrief");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }

            }
            else if (PageName == "PT")
            {
                var checkUser = accRepository.GetEPPMAuthenticationDetails(UserName, PageName);
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);

                var Role = Convert.ToString(checkUser.RoleName);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {

                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("UserId", Convert.ToString(checkUser.UserId));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.RoleName));

                    HttpContext.Session.SetString("IsFromPU", Convert.ToString(0));
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));

                    var projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), UserName);
                    HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));

                    var hub = _masterRepository.GetHubBasedOnProjectId(0);
                    HttpContext.Session.SetString("HubList", JsonConvert.SerializeObject(hub));

                    HttpContext.Session.SetString("AppName", Convert.ToString(PageName));
                    return RedirectToAction("Summary", "ProjectTracker");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "ET")
            {
                Account account = new Account();
                account.Username = UserName;
                account.PageName = PageName;
                var result = accRepository.GetAccounts(account);
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);

                var Role = Convert.ToString(result);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("Role", result);
                    HttpContext.Session.SetString("AppShortName", checkDetails);

                    return RedirectToAction("EffortBooking", "EffortBooking");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "MM")
            {
                var checkUser = accRepository.GetEPPMAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.RoleName);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {

                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("UserId", Convert.ToString(checkUser.UserId));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.RoleName));

                    return RedirectToAction("MMProjectMaster", "MasterManagement");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "PROT")
            {
                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                    HttpContext.Session.SetString("AppShortName", PageName);

                    return RedirectToAction("Prototype", "Prototype");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "PU")
            {
                var checkUser = accRepository.GetEPPMAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.RoleName);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("UserId", Convert.ToString(checkUser.UserId));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.RoleName));

                    HttpContext.Session.SetString("IsFromPU", Convert.ToString(1));
                    var projectlist = _masterRepository.Get_ProjectList(Convert.ToInt32(HttpContext.Session.GetString("RoleId")), UserName);
                    HttpContext.Session.SetString("getProjectList", JsonConvert.SerializeObject(projectlist));

                    var hub = _masterRepository.GetHubBasedOnProjectId(0);
                    HttpContext.Session.SetString("HubList", JsonConvert.SerializeObject(hub));

                    return RedirectToAction("ProjectUpdates", "ProjectUpdates");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "CGD")
            {
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);
                HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));

                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                    return RedirectToAction("ClaimsGridDocument", "NewClaimsGrid");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "RR")
            {
                return RedirectToAction("RiskRegister", "RiskRegister");
            }
            else if (PageName == "NPDLM")
            {
                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);

                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);

                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                    HttpContext.Session.SetString("AppName", Convert.ToString(PageName));
                    return RedirectToAction("N_NPDList", "NPDLaunchMaster");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "PI")
            {
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);
                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);
                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    if (checkUser.Role != "HOD")
                    {
                        HttpContext.Session.Clear();
                        HttpContext.Session.SetString("UserName", UserName);
                        HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                        HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                        HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                        HttpContext.Session.SetString("MenuActive", Convert.ToString(1));
                        HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                        HttpContext.Session.SetString("AppName", Convert.ToString(PageName));
                        if (checkUser.Role.ToLower() == "pr admin" || checkUser.Role.ToLower() == "deptuser" || checkUser.Role.ToLower() == "r&d head" || checkUser.Role.ToLower() == "r&d admin")
                        {
                            return RedirectToAction("ExpensesRequestList", "NewProjectInitiation");
                        }
                        return RedirectToAction("ProjectInitiationList", "NewProjectInitiation");
                    }

                    else
                    {
                        HttpContext.Session.Clear();
                        HttpContext.Session.SetString("UserName", UserName);
                        HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                        HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                        HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                        HttpContext.Session.SetString("MenuActive", Convert.ToString(checkUser.MenuActive));
                        HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                        HttpContext.Session.SetString("AppName", Convert.ToString(PageName));
                        return RedirectToAction("ProjectInitiationList", "NewProjectInitiation");
                    }
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "RID")
            {
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);
                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    return RedirectToAction("RIDIndex", "NewRID");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "RDMS")
            {
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);
                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                    HttpContext.Session.SetString("AppName", Convert.ToString(PageName));
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    return RedirectToAction("LicenseManagementList", "RDMS");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else if (PageName == "HGH")
            {
                var checkDetails = accRepository.GetUserBasedApplicationDetails(UserName);
                var checkUser = accRepository.GetPrototypeAuthenticationDetails(UserName, PageName);

                var Role = Convert.ToString(checkUser.Role);
                var IsPageAccessible = accRepository.GetPageAccess(PageName, Role);

                if (IsPageAccessible == 1)
                {
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("AppShortName", Convert.ToString(checkDetails));
                    HttpContext.Session.SetString("UserName", UserName);
                    HttpContext.Session.SetString("RoleId", Convert.ToString(checkUser.RoleId));
                    HttpContext.Session.SetString("Role", Convert.ToString(checkUser.Role));
                    HttpContext.Session.SetString("AppName", Convert.ToString(PageName));
                    HttpContext.Session.SetString("LoggedUserName", Convert.ToString(checkUser.LoggedUserName));
                    HttpContext.Session.SetString("EmailId", Convert.ToString(checkUser.EmailId));
                    return RedirectToAction("HGHCodeList", "HGH");
                }
                else
                {
                    return RedirectToAction("UnauthorizedUser", "Landing");
                }
            }
            else
            {
                return RedirectToAction("Landing", "Inndex");
            }
        }
    }
}