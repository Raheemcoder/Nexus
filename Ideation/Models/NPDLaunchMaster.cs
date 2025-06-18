using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Ideation.Models
{
    public class NPDLaunchMaster
    {
        public IEnumerable<NpdHGMLDivisionMaster>? NpdHGMLDivisionList { get; set; }
        public IEnumerable<SelectListItem>? HGMLDivisionList { get; set; }

        public IEnumerable<NpdHGMLCategoryMaster>? NpdHGMLCategoryList { get; set; }
        public IEnumerable<SelectListItem>? HGMLCategoryList { get; set; }

        public IEnumerable<NpdHGMLProductGroupMaster>? NpdHGMLProductGroupList { get; set; }
        public IEnumerable<SelectListItem>? HGMLProductGroupList { get; set; }

        public IEnumerable<NpdHGMLFormulationMaster>? NpdHGMLFormulationList { get; set; }
        public IEnumerable<SelectListItem>? HGMLFormulationList { get; set; }

        public IEnumerable<NpdHGMLSourceMaster>? NpdHGMLSourceList { get; set; }
        public IEnumerable<SelectListItem>? HGMLSourceList { get; set; }

        public IEnumerable<NpdHGMLSubCategoryMaster>? NpdHGMLSubCategoryList { get; set; }
        public IEnumerable<SelectListItem>? HGMLSubCategoryList { get; set; }

        public string? NPDLaunchMasterHeaderData { get; set; }
        public string? NPDLaunchMasterProductHierarchyData { get; set; }
        public string? ProductHierarchyData { get; set; }
        public string? MyApprovalData { get; set; }

        public string? DivisionName { get; set; }
        public string? CategoryName { get; set; }
        public string? ProductName { get; set; }
        public string? FormulationName { get; set; }
        public string? SourceName { get; set; }
        public string? SubCategoryName { get; set; }
        public string? CategoryString { get; set; }
        public string? DivisionString { get; set; }
        public string? FormulationString { get; set; }
        public string? ProductString { get; set; }
        public string? SubCategoryString { get; set; }
        public string? SourceString { get; set; }
        public string? UserName { get; set; }
        public IEnumerable<SelectListItem>? IsNpdList { get; set; }
        public IEnumerable<SelectListItem>? NpdLaunchYearTypeList { get; set; }
        public string? NpdLaunchYearType { get; set; }
        public string? NpdLaunchYear { get; set; }
        public string? ProductLaunchInformationData { get; set; }

        public string? MyApprovalPendingData { get; set; }
        public string? SaveMyApprovalData { get; set; }
        public string? SingleOrMultiple { get; set; }
        public string? RejectRemarks { get; set; }
        public string? Status { get; set; }
        public IEnumerable<SelectListItem>? StatusList { get; set; }
        public string? NpdListData { get; set; }

        public IEnumerable<DivisionInfo>? NPDDivisionInfo { get; set; }
        public IEnumerable<CategoryInfo>? NPDCategoryInfo { get; set; }
        public IEnumerable<SubCategoryInfo>? NPDSubCategoryInfo { get; set; }
        public string? HGMLCategoryOptions { get; set; }
        public string? HGMLDivisionOptions { get; set; }
        public string? HGMLSubCategoryOptions { get; set; }
        public string? Role { get; set; }

    }
    public class NpdHGMLDivisionMaster
    {
        public string? DivisionName { get; set; }
    }
    public class NpdHGMLCategoryMaster
    {
        public string? CategoryName { get; set; }
    }
    public class NpdHGMLProductGroupMaster
    {
        public string? ProductName { get; set; }
    }
    public class NpdHGMLFormulationMaster
    {
        public string? FormulationName { get; set; }
    }
    public class NpdHGMLSourceMaster
    {
        public string? SourceName { get; set; }
    }
    public class NpdHGMLSubCategoryMaster
    {
        public string? SubCategoryName { get; set; }
    }

    public class NpdLaunchMasterHeaderData
    {
        public string? RowNumber { get; set; }
        public string? MaterialCode { get; set; }
        public string? MaterialName { get; set; }
        public string? CreatedDate { get; set; }
        public string? HGMLCategory { get; set; }
        public string? HGMLDivision { get; set; }
        public string? HGMLSubCategory { get; set; }
        public string? ProductGroup { get; set; }
        public string? HGMLFormulation { get; set; }
        public string? Source { get; set; }
        public string? IsNPD { get; set; }
        public string? BusinessLaunchDate { get; set; }
        public string? RandDLaunchDate { get; set; }
        public string? Status { get; set; }
        public string? Remarks { get; set; }
        public string? UpdatedBy { get; set; }
        public string? ApprovedOrRejectedBy { get; set; }
        public string? ApprovedOrRejectedOn { get; set; }
        public string? StatusId { get; set; }
        public string? SubmittedToMyApprovalPendingBy { get; set; }
        public string? HGMLCategoryOptions { get; set; }
        public string? HGMLDivisionOptions { get; set; }
        public string BusinessLaunchYear { get; set; }
        public string? HGMLSubCategoryOptions { get; set; }
        public string? MaterialCreatedDate { get; set; }
        public string? IndiaCategory { get; set; }
        public string? IndiaDivision { get; set; }
        public string? DubaiCategory { get; set; }
        public string? DubaiDivision { get; set; }
        public string? UpdatedOn { get; set; }

    }

    public class NPDLMProductLaunchInformation
    {

        public string? MaterialCode { get; set; }
        public string? MaterialName { get; set; }
        public string? CreatedDate { get; set; }
        public string? Source { get; set; }
        public string? IsNPD { get; set; }
        public string? BusinessLaunchDate { get; set; }
        public string? RandDLaunchDate { get; set; }
        public string? StatusId { get; set; }
        public string? StatusName { get; set; }
        public string? Status { get; set; }
        public string? Remarks { get; set; }
        public string? UpdatedBy { get; set; }
        public string? ApprovedOrRejectedBy { get; set; }

        public string? HGMLCategory { get; set; }
        public string? HGMLSubCategory { get; set; }
        public string? ProductGroup { get; set; }
        public string? HGMLDivision { get; set; }
        public string? HGMLFormulation { get; set; }
        public string? IsProductHierarchyFilled { get; set; }
        public string? MaterialCreatedDate { get; set; }




    }
    public class NPDLMMyApprovalPending
    {

        public string? MaterialCode { get; set; }
        public string? MaterialName { get; set; }
        public string? CreatedDate { get; set; }
        public string? HGMLCategory { get; set; }
        public string? HGMLSubCategory { get; set; }
        public string? ProductGroup { get; set; }
        public string? IsNPD { get; set; }
        public string? BusinessLaunchDate { get; set; }
        public string? RandDLaunchDate { get; set; }
        public string? UpdatedBy { get; set; }
        public string? ApprovedOrRejectedBy { get; set; }
        public string? Status { get; set; }
        public string? Remarks { get; set; }
        public string? IsProductHierarchyFilled { get; set; }
        public string? HGMLDivision { get; set; }
        public string? HGMLFormulation { get; set; }
        public string? HGMLCategoryOptions { get; set; }
        public string? HGMLDivisionOptions { get; set; }
        public string? BusinessLaunchYear { get; set; }
        public string? HGMLSubCategoryOptions { get; set; }
        public string? MaterialCreatedDate { get; set; }
    }
    public class DivisionInfo
    {
        public string? HGMLDivision { get; set; }

    }
    public class CategoryInfo
    {
        public string? HGMLCategory { get; set; }
    }
    public class SubCategoryInfo
    {
        public string? HGMLSubCategory { get; set; }
    }
}