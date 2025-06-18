using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace Ideation.Controllers
{
    public class NewDashboardController : BaseController
    {
        IDashBoardRepository dashBoard;
        IMasterRepository master;
        IIdeationRepository ideationRepository;
        public NewDashboardController(IDashBoardRepository dashBoard, IMasterRepository master, IIdeationRepository ideationRepository)
        {
            this.dashBoard = dashBoard;
            this.master = master;
            this.ideationRepository = ideationRepository;
        }
        public IActionResult Dashboard()
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            Masters masters = master.GetMasters();

            DashBoard dashBoardObj = new DashBoard();
            dashBoardObj.PlatformTypeList = masters.PlatformTypes;
            dashBoardObj.BusinessDivisionList = masters.BusinessDivisions;
            dashBoardObj.StatusList = dashBoard.GetDashBoardData(loginId,role);

            //ViewBag.PlatformList = masters.PlatformTypes;
            //ViewBag.BussinessDivisionList = masters.BusinessDivisions;
            //ViewBag.StatusList = masters.Statuses;

            //var result = dashBoard.GetDashBoardData();
            //ViewBag.result = dashBoard.GetDashBoardData();
            return View(dashBoardObj);
        }

        public string DashboardData(DashBoard dashBoardObj)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            var result = dashBoard.GetDashBoardData(loginId,role);
            var jsonData = JsonConvert.SerializeObject(result);
            return jsonData;
        }

        [HttpPost]
        public JsonResult GetStatusDashBoardData(string PlatformTypeName, string businessdivisionname, string statusname)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            var jsondata = Json(dashBoard.GetDashBoardStatus(PlatformTypeName, businessdivisionname, statusname, loginId,role));
            return jsondata;
        }

        [HttpPost]
        public JsonResult GetDashBoardById(int InnovationId)
        {
            var res = Json(ideationRepository.GetIdeationById(InnovationId));
            return res;
        }
    }
}
