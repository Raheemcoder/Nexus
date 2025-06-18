using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Data;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class KDSMasterController : Controller
    {
        private readonly IKDSMasterRepository KDSrepo;

        public KDSMasterController(IKDSMasterRepository KDSrepo)
        {
            this.KDSrepo = KDSrepo;
    }    
        [HttpGet]
        public IActionResult KDSMaster()
        {
           // int id;
            KDSMaster kds = new KDSMaster();
            kds= KDSrepo.GetList(0);
           // kds.JQGridgrid.Valid
            kds.JQGrid = JsonConvert.SerializeObject(kds.JQGridgrid);
            return View(kds);
        }
        [HttpGet]
        public IActionResult KDSAdd(int id)
        {
            KDSMaster kds = new KDSMaster();

          //  kds = 
            var JsonData= KDSrepo.GetList(id);
            var jsonData = JsonConvert.SerializeObject(JsonData);

            kds.JQGrid = jsonData;

            return View(kds);
        }
        [HttpPost]
        public IActionResult KDSAdd(KDSMaster KDS)
        {
            var empId = HttpContext.Session.GetString("UserName");

            if (ModelState.IsValid)
            {
                if (KDS.Status == "Active")
                {
                    KDS.Status = "1";
                }
                else if (KDS.Status == "In Active")
                {
                    KDS.Status = "0";
                }
                else KDS.Status = "1"; 
                long result = KDSrepo.InsertUpdate(KDS, empId);
                if (result > 0)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "KDS Master Inserted Successfully";
                    return RedirectToAction("KDSMaster", "KDSMaster");
                }
                else if (result == 0)
                {
                    TempData["MessageClass"] = "alert-success";
                    TempData["Message"] = "KDS Master  Updated Successfully";
                    return RedirectToAction("List", "KDSMaster");
                }
                else if (result == -1)
                {
                    TempData["MessageClass"] = "alert-danger";
                    TempData["Message"] = "KDS Master  already exist";
                }




            }
          //  ViewBag.KDSType = KDSMasterRepository.GetDropDownList("KDSTYP", CompanyCode);

            return View(KDS);
        }
        public IActionResult Get_Sequence(string Type)
        {
            var Result = KDSrepo.Get_Sequence(Type);
          //  Result = int.Parse(Result);
            return Json(Result);
        }
    }
}
