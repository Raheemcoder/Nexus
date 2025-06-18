using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class MilestoneMaster
    {
        public int MilestoneId { get; set; }
        // [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Name")]
        public string MilestoneName { get; set; }
        public string JsonData { get; set; }
        public int Duration { get; set; }
        public string? RoleId { get; set; }

        //Required(ErrorMessage = "Please select RelationType")]
        public int SequenceNo { get; set; }
        //public IEnumerable<SelectListItem> SequenceList { get; set; }
        //[Required(ErrorMessage = "Please select RelationType")]
        public string RelationType { get; set; }
        //public Dictionary<string,string> SelectedRelationType { get; set; }
        public int count { get; set; }
        //[Required(ErrorMessage = "Please select SetRelaion")]
        public string SetRelation { get; set; }
        // public IEnumerable<SelectListItem> SetRelationsList { get; set; }
        [Required]
        public string Status { get; set; }
        public string Action { get; set; }
        public int Flag { get; set; }
        public string TemplateId { get; set; }
        public string TemplateName { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string OutMessage { get; set; }

        public string StyleClass { get; set; }
        public string SubmilestoneExit { get; set; }
    }
}
