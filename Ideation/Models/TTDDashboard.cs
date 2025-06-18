using iText.Commons.Actions.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace Ideation.Models
{

    public class TTDDashboard
    {
        public int RowNo { get; set; }
        public string TTDHeaderId { get; set;}
        public int ProductionTargetYear { get; set; }
        public string ProjectBriefId { get; set; }
        public string ProductName { get; set; }
        public int RDId { get; set; }
        public string RDName { get; set; }
        public string PackSizes { get; set; }
        public int ClassificationTypeId { get; set; }
        public string ClassificationTypeName { get; set; }
        public int PriorityTypeId { get; set; }
        public string PriorityTypeName { get; set; }
        public string MarketTypeId { get; set; }
        public string MarketTypeName { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string BriefAcceptedDate { get; set; }
        // Business Information
        public string HGMLValue { get; set; }
        public string APACValue { get; set; }
        public string EuropeValue { get; set; }
        public string HUSAValue { get; set; }
        public string IndiaValue { get; set; }
        public string METAPValue { get; set; }
        public string BusinessValueYear1 { get; set; }
        public string BusinessValueYear2 { get; set; }
        //TTD Dates and Remarks 
        public string BaselineTTDDate { get; set; }
        public string BaselineTTDRemarks { get; set; }
        public string BaselineProductionDate { get; set; }
        public string BaselineProductionRemarks { get; set; }
        public string TTDTargetDate { get; set; }
        public string TTDTargetRemarks { get; set; }
        public string ProductionTargetDate { get; set; }
        public string ProductionTargetRemarks { get; set; }
        //Comments and Remarks
        public int TTDTargetCommentId { get; set; }
        public string TTDTargetCommentName { get; set; }
        public int ProductionTargetCommentId { get; set; }
        public string ProductionTargetCommentName { get; set; }
        public string Remarks { get; set; }
        public bool IsNew { get; set; }
        public bool IsActive { get; set; }
        public IEnumerable<TTDDropdownData> TTDDropDownDataList { get; set; }
        public IEnumerable<ProductData> ProductList { get; set; }
        public List<TTDDashboard> TTDData { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public bool IsRemarks {get; set;}
        public bool IsTTDComment { get; set; }
        public bool IsProductionComment { get; set; }
        public string ActionBy { get; set; }
        public int TTDLineNo { get; set; }
        public string LoginId { get; set; }
        
    }
    public class TTDDropdownData
    {
        public string Type { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public int Count { get; set; }
        public string DependOnType { get; set; }
        public string DependOnValue { get; set; }

    }


}
