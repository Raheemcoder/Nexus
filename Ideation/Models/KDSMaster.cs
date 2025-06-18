using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class KDSMaster
    {
        // [Required(ErrorMessage = "Please select KDS Type")]
        public int? Id { get; set; }
        public string? Type { get; set; }
        public string? JQGrid { get; set; }
        public IEnumerable<JQGrid>? JQGridgrid { get; set; }
        public int? Order { get; set; }
        public string? Status { get; set; }
       // [Required(ErrorMessage = "Please enter KDS value")]
        public string? Value { get; set; }
        public IEnumerable<order>? order { get; set; }

    }
    public class order
    {
        public int? Result { get; set; }
    }
    public class JQGrid
    {
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDateUTC { get; set; }
       
    }
}
