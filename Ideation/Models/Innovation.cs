using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;


namespace Ideation.Models
{
    public class Innovation
    {
        //public int EmployeeId { get; set; }


        [Required(ErrorMessage = "Please enter InnovationTitle")]
        public string? InnovationTitle { get; set; }


        [Required(ErrorMessage = "Please enter Keyword")]
        //[StringLength(100, ErrorMessage = "Enter more than 1 char less than 3 char")]
        public string? Keyword { get; set; }


        [Required(ErrorMessage = "Please select PlatformType")]
        public string? PlatformTypeId { get; set; }

        [Required(ErrorMessage = "Please select Other")]
        public string? Other { get; set; }


        [Required(ErrorMessage = "Please select Platform Domain")]
        public string? BusinessDivisionId { get; set; }


        [Required(ErrorMessage = "Please select Geographic Scope")]
        public string? GeographicId { get; set; }


        [Required(ErrorMessage = "Please select Strategic Fit")]
        public string[] StrategicFitId { get; set; }
        public string? StrategicFitNames { get; set; }

        public string? FilePath { get; set; }

        //[Required(ErrorMessage = "Enter Description")]
        public string? Description { get; set; }

        public int InnovationId { get; set; }
        public string? PlatformTypeName { get; set; }
        public string? StrategicFitName { get; set; }
        public string? BusinessDivisionName { get; set; }
        public string? GeographicName { get; set; }
        public string? StatusName { get; set; }
        public int StatusId { get; set; }
        public string? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? Remarks { get; set; }
        public string? RemarkDiscription { get; set; }
        public string? RemarkName { get; set; }
        public string? FileNames { get; set; }
        [Required(ErrorMessage = "Please upload file")]
        public IFormFile? PostedFile { get; set; }

        public IEnumerable<SelectListItem>? PlatformTypeList { get; set; }
        public IEnumerable<SelectListItem>? BusinessDivisionList { get; set; }
        public IEnumerable<SelectListItem>? GeographicScopeList { get; set; }
        public IEnumerable<SelectListItem>? StrategicFitList { get; set; }
        public IEnumerable<SelectListItem>? Status { get; set; }
        public string? JSONIdeationList { get; set; }


        public string? uniqueNo { get; set; }

    }
}
