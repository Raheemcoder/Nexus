//using DocumentFormat.OpenXml.Spreadsheet;
//using Ideation.Common;
//using Ideation.Core;
//using Ideation.CustomAttributes;
//using Ideation.Data;
//using Ideation.Models;
//using Microsoft.AspNetCore.Authentication;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.PowerBI.Api;
//using Newtonsoft.Json;
//using NuGet.Protocol;
//using System.Net;
//using System.Net.Http.Headers;
//using System.Security.Claims;

//namespace Ideation.Controllers
//{
//    [TypeFilter(typeof(OnExceptionAttribute))]
//    public class AccountController : Controller
//    {
//        IAccountRepository acc;
//        private readonly IEPPMMasterRepository _masterRepository;

//        public AccountController(IAccountRepository account, IEPPMMasterRepository masterRepository)
//        {
//            this.acc = account;
//            _masterRepository = masterRepository;
//        }
//        // GET: Account 
//        [HttpGet]
//        public ActionResult Login()
//        {

//            return View();
//        }
//        [HttpPost]
//        public IActionResult Login(Account account)
//        {

//            if (ModelState.IsValid)
//            {
//                if (account.Username.Contains("@"))
//                {
//                    account.Username = (account.Username).Split('@')[0];
//                }

//                //if (ADIntegration.UserAuthentication(account.Username, account.Password, "SSO"))  //user name changed
//                //{
//                    HttpContext.Session.SetString("UserName", account.Username);//user name changed

//                    var claims = new[] { new Claim(ClaimTypes.Name, account.Username), new Claim(ClaimTypes.Role, "SomeRoleName") };

//                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

//                    HttpContext.User = new ClaimsPrincipal(identity);

//                    HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity)).GetAwaiter().GetResult();

//                    //var result = acc.GetAccounts(account);

//                    //if (result != "-1")
//                    //{
//                        HttpContext.Session.SetString("Role", "Admin");
//                        return RedirectToAction("Index", "Landing");
//                    //}
//                    //else
//                    //{
//                    //    TempData["Messageclass"] = "alert-danger";
//                    //    TempData["Message"] = "User does not have the access";
//                    //}
                    
                    
//                //}
//                //else
//                //{
//                //    TempData["Messageclass"] = "alert-danger";
//                //    TempData["Message"] = "Invalid Credentials, Please login with your Outlook Credentials";

//                //    //var result = acc.GetUserAccount(account);
//                //    //if (result == 1)
//                //    //{
//                //    //    HttpContext.Session.SetString("UserName", account.Username);
//                //    //    var claims = new[] { new Claim(ClaimTypes.Name, account.Username), new Claim(ClaimTypes.Role, "SomeRoleName") };
//                //    //    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
//                //    //    HttpContext.User = new ClaimsPrincipal(identity);
//                //    //    HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity)).GetAwaiter().GetResult();
//                //    //    var res = acc.GetAccounts(account);
//                //    //    if (res == "Admin")
//                //    //    {
//                //    //        HttpContext.Session.SetString("Role", res);
//                //    //    }
//                //    //    return RedirectToAction("Landing", "Landing");
//                //    //}
//                //    //else
//                //    //{
//                //    //    TempData["Messageclass"] = "alert-danger";
//                //    //    TempData["Message"] = "Invalid Credentials, Please login with your Outlook Credentials";
//                //    //}
//                //}

//            }
//            return View(account);
//        }

//        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
//        public ActionResult Logout()
//        {
//            var UserName = HttpContext.Session.GetString("UserName");
//            acc.InsertLogOffInfo(UserName);

//            HttpContext.SignOutAsync();
//            if (HttpContext.Session != null)
//            {
//                HttpContext.Session.Clear();
//            }

//            foreach (var cookie in Request.Cookies.Keys)
//            {
//                Response.Cookies.Delete(cookie);
//            }

//            return RedirectToAction("Login", "Account");
//        }

//        public ActionResult AutoLogin()
//        {
//            return Ok("You are successfully Re-loggedIn!!");
//        }
//        public ActionResult LogOff()
//        {
//            if (HttpContext.Session != null)
//            {
//                HttpContext.Session.Clear();
//            }

//            foreach (var cookie in Request.Cookies.Keys)
//            {
//                Response.Cookies.Delete(cookie);
//            }

//            return RedirectToAction("Login", "Account");

//        }

//    }
//}
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicrosoftSSO.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login(string returnUrl = "/")
        {
            var redirectUrl = Url.Action("LoginCallback", "Account", new { returnUrl });
            return Challenge(new AuthenticationProperties { RedirectUri = redirectUrl }, OpenIdConnectDefaults.AuthenticationScheme);
        }

        [HttpGet]
        public IActionResult LoginCallback(string returnUrl = "/")
        {
            return LocalRedirect(returnUrl);
        }

        [Authorize]
        public IActionResult Logout()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                OpenIdConnectDefaults.AuthenticationScheme,
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}