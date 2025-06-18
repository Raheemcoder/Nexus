using ClosedXML.Excel;
using Ideation.Core;
using Ideation.CustomAttributes;
using Ideation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using NonFactors.Mvc.Grid;

namespace Ideation.Controllers
{
    [SessionExpire]
    [Authorize]
    [TypeFilter(typeof(OnExceptionAttribute))]
    public class IdeationController : Controller
    {
        IIdeationRepository ideationRepository;
        IMasterRepository master;
        public IdeationController(IMasterRepository master, IIdeationRepository ideationRepository)
        {
            this.ideationRepository = ideationRepository;
            this.master = master;
        }
        public IActionResult Ideation(IdeationData ideation)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            if (ideation != null && String.IsNullOrWhiteSpace(ideation.StartDate))
            {
                ideation.StartDate = DateTime.Now.AddDays(-30).ToString("dd-MM-yyyy");
                ideation.StatusId = "2";
            }
            if (ideation != null && String.IsNullOrWhiteSpace(ideation.EndDate))
            {
                ideation.EndDate = DateTime.Now.ToString("dd-MM-yyyy");
            }
            
            Masters masters = master.GetMasters();
            ideation.PlatformTypeList = masters.PlatformTypes.Select(m => new SelectListItem { Text = m.PlatformTypeName, Value = m.PlatformTypeId.ToString() });
            ideation.BusinessDivisionList = masters.BusinessDivisions.Select(m => new SelectListItem { Text = m.BusinessDivisionName, Value = m.BusinessDivisionId.ToString() });
            ideation.GeographicList = masters.GeographicScopes.Select(m => new SelectListItem { Text = m.GeographicName, Value = m.GeographicId.ToString() });
            ideation.StatusList = masters.Statuses.Select(m => new SelectListItem { Text = m.StatusName, Value = m.StatusId.ToString(), Selected = m.StatusId.ToString() == "2"? true : false });
            ideation.RemarksList = masters.Remarks.Select(m => new SelectListItem { Text = m.RemarkName, Value = m.RemarkId.ToString()});
            ideation.RemarkDiscriptionList = masters.Remarks.Select(m => new SelectListItem { Text = m.RemarkDiscription, Value = m.RemarkId.ToString()});
            ideation.IdeationListData = ideationRepository.GetIdeation(ideation.StartDate,ideation.EndDate, ideation.BusinessDivisionId, ideation.PlatformTypeId, ideation.GeographicId, ideation.StatusId, loginId,role);
            return View(ideation);
        }

        [HttpPost]
        public JsonResult GetIdeationById(int InnovationId)
        {
            IdeationData ideation = new IdeationData();
            Masters masters = master.GetMasters();
            
            //ViewBag.RemarkList = remarkList.Select(m => new SelectListItem { Text = m.RemarkName, Value = m.RemarkId.ToString() });
            var res = Json(ideationRepository.GetIdeationById(InnovationId));
            return res;
        }

        [HttpPost]
        public JsonResult UpdateIdeationStatus(IdeationStatus idstats)
        {
            idstats.ActionBy = HttpContext.Session.GetString("UserName");
            var res = Json(ideationRepository.IdeationStatusUpdate(idstats));
            return res;
        }

        [HttpPost]
        public JsonResult GetIdeationRemarks(int InnovationId)
        {
            var result = Json(ideationRepository.GetIdeationByRemarks(InnovationId));
            return result;
        }

        [HttpPost]
        public JsonResult GetRemarkDiscription(int RemarkId)
        {
            var result = Json(ideationRepository.GetRemarkDes(RemarkId));
            return result;
        }


        [HttpGet]
        public ActionResult ExportIndex(IdeationData ideation)
        {
            if (ideation != null && String.IsNullOrWhiteSpace(ideation.StartDate))
            {
                ideation.StartDate = DateTime.Now.AddDays(-30).ToString("dd/MM/yyyy");
            }
            if (ideation != null && String.IsNullOrWhiteSpace(ideation.EndDate))
            {
                ideation.EndDate = DateTime.Now.ToString("dd/MM/yyyy");
            }
            return Export(CreateExportableGrid(ideation), "Innovation_Ideation");
        }

        private ActionResult Export(IGrid grid, String fileName)
        {
            Int32 col = 1;
            //using ExcelPackage package = new ExcelPackage();
            //ExcelWorksheet sheet = package.Workbook.Worksheets.Add("Data");

            using (XLWorkbook wb = new XLWorkbook())
            {
                IXLWorksheet sheet = wb.Worksheets.Add();

                foreach (IGridColumn column in grid.Columns)
                {
                    sheet.Cell(1, col).Value = XLCellValue.FromObject(column.Title);
                    sheet.Column(col++).Width = 18;

                    column.IsEncoded = false;
                }

                foreach (IGridRow<Object> row in grid.Rows)
                {
                    col = 1;

                    foreach (IGridColumn column in grid.Columns)
                        sheet.Cell(row.Index + 2, col++).Value = XLCellValue.FromObject(column.ValueFor(row));
                }

                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{fileName}.xlsx");
                }
            }

        }
        private IGrid<IdeationList> CreateExportableGrid(IdeationData ideation)
        {
            var loginId = HttpContext.Session.GetString("UserName");
            var role = HttpContext.Session.GetString("Role");
            IGrid<IdeationList> grid = new Grid<IdeationList>(ideationRepository.GetIdeation(ideation.StartDate,ideation.EndDate, ideation.BusinessDivisionId, ideation.PlatformTypeId,ideation.GeographicId, ideation.StatusId,loginId,role));
            grid.ViewContext = new ViewContext { HttpContext = HttpContext };
            grid.Query = Request.Query;

            grid.Columns.Add(model => model.InnovationId).Titled("Id");
            grid.Columns.Add(model => model.InnovationTitle).Titled("Title");
            grid.Columns.Add(model => model.PlatformTypeName).Titled("Platform");
            grid.Columns.Add(model => model.Other).Titled("Other_Platform");
            grid.Columns.Add(model => model.GeographicName).Titled("Geographic");
            grid.Columns.Add(model => model.BusinessDivisionName).Titled("BusinessDivision");
            grid.Columns.Add(model => model.StrategicFitName).Titled("StrategicFit");
            grid.Columns.Add(model => model.Description).Titled("Description");
            grid.Columns.Add(model => model.StatusName).Titled("Status");
            grid.Columns.Add(model => model.CreatedBy).Titled("CreatedBy");
            grid.Columns.Add(model => model.CreatedDate).Titled("CreatedDate").Formatted("{0:d}");


            foreach (IGridColumn column in grid.Columns)
            {
                column.Filter.IsEnabled = true;
                column.Sort.IsEnabled = true;
            }

            return grid;
        }

        
    }
}