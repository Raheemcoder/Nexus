using Ideation.Models;
using Irony.Parsing;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
//using System.Web.Mvc;

using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Models
{
    public class ProjectUpdates
    {
        public int? RoleId { get; set; }
        public string? ProjectCode { get; set; }
        public string? UpdatesYesNo { get; set; }
        public string? ProjectName { get; set; }
        public string? ProjectDescription { get; set; }
        public string? ProjectHub { get; set; }
        public string? ProjectDivision { get; set; }
        public string? ProjectType { get; set; }
        public string? ProjectClassification { get; set; }
        public string? HghCode { get; set; }
        public string? RAndDName { get; set; }
        public string? ProjectStatus { get; set; }
        public string? Comments { get; set; }
        public string? UploadDocument { get; set; }
        public string? TargetTtd { get; set; }
        public string? TargetProductionDate { get; set; }
        public string? TargetCost { get; set; }
        public string? Currency { get; set; }
        public string? Sku { get; set; }
        public string? Volume { get; set; }
        public IEnumerable<PUCurrencyMaster>? CurrencyList { get; set; }
        public IEnumerable<SelectListItem>? CurrencyNameList { get; set; }
        public List<dynamic>? ViewInfoHistory { get; set; }
        public string? ViewInfoHistoryData { get; set; }
        public string? VolumeInfoHistoryData { get; set; }
        public List<dynamic>? VolumeInfoHistory { get; set; }
        public string? ProjectLead { get; set; }
        public string? ProjectLeadID { get; set; }

        public string? M1Quantity { get; set; }
        public string? M2Quantity { get; set; }
        public string? M3Quantity { get; set; }
        public string? Y1Quantity { get; set; }
        public string? Y2Quantity { get; set; }
        public string? Y3Quantity { get; set; }
        public string? ProjectUpdatesHeaderId { get; set; }
        public string? UserName { get; set; }
        public string? OldUploadedFiles { get; set; }
        public string? ProjectDocId { get; set; }
        public string? UserId { get; set; }



        public string? Status { get; set; }
        public string DivisionName { get; set; }

        public IEnumerable<SelectListItem> DivisionList { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }
        public IEnumerable<SelectListItem> RandDList { get; set; }
        public IEnumerable<SelectListItem> ProjectTypeList { get; set; }
        public IEnumerable<SelectListItem> ProjectClassificationList { get; set; }
        public IEnumerable<SelectListItem> ProjectLeadList { get; set; }
        public IEnumerable<PUDivisionMaster> Divisionmaster { get; set; }
        public IEnumerable<PUStatusMaster> Statusmaster { get; set; }
        public IEnumerable<RandDMaster> RandDmaster { get; set; }
        public IEnumerable<ProjectTypeMaster> ProjectTypemaster { get; set; }
        public IEnumerable<ProjectClassificationMaster> ProjectClassificationmaster { get; set; }
        public IEnumerable<ProjectLeadMaster> ProjectLeadmasterList { get; set; }
        public IEnumerable<ProjectUpdatesDetailsHeader>? ProjectUpdatesDetailsList { get; set; }
        public string? ProjectUpdatesDetailsHeaderData { get; set; }



        public IEnumerable<ProjectUpdatesDetailsHeader>? ProjectMasterDataList { get; set; }
        public IEnumerable<ProjectUpdatesDetailsHeader>? ProjectDetailsHeaderDataList { get; set; }
        public string? JsonFormProjectUpdatesData { get; set; }

        public string? CreatedBy { get; set; }   
        public string? CreatedDate { get; set; }   

    }

    public class PUDivisionMaster
    {
        public string DivisionName { get; set; }
    } 
    public class PUCurrencyMaster
    {
        public string? CurrencyName { get; set; }
    }
    public class PUStatusMaster
    {
        public string StatusName { get; set; }
        public string StatusId { get; set; }
    }
    public class RandDMaster
    {
        public string RandDName { get; set; }
    }
    public class ProjectTypeMaster
    {
        public string ProjectType { get; set; }
    }
    public class ProjectClassificationMaster
    {
        public string ProjectClassification { get; set; }
    }
    public class ProjectLeadMaster
    {
        public string ProjectLead { get; set; }
        public string? UserId { get; set; }

    }
    public class ProjectUpdatesDetailsHeader
    {
        public string? ProjectCode { get; set; }
        public string? ProjectId { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? ProjectName { get; set; }
        public string? ProjectHub { get; set; }
        public string? ProjectDivision { get; set; }
        public string? ProjectType { get; set; }
        public string? ProjectClassification { get; set; }
        public string? RAndDName { get; set; }
        public string? ProjectStatus { get; set; }
        public string? StatusName { get; set; }

        public string? HghCode { get; set; }
        public string? ProjectDescription { get; set; }
        public string? LastMonth { get; set; }
        public string? CurrentMonth { get; set; }
        public string? HubId { get; set; }


        public string? Comment { get; set; }
        public string? UserName { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? IsContainDocument { get; set; }
        public string? IsLatestComment { get; set; }
        public string? CreatedByName { get; set; }

        public string? Sku { get; set; }
        public string? Volume { get; set; }
        public string? TargetTTD { get; set; }
        public string? TargetProductionDate { get; set; }
        public string? AcceptedTargetCost { get; set; }
        public string? Currency { get; set; }
        public string? DocumentName { get; set; }
        public string? ProjectLead { get; set; }
        public string? ProjectLeadID { get; set; }
        public string? M1Quantity { get; set; }
        public string? M2Quantity { get; set; }
        public string? M3Quantity { get; set; }
        public string? Y1Quantity { get; set; }
        public string? Y2Quantity { get; set; }
        public string? Y3Quantity { get; set; }
        public string? ProjectUpdatesHeaderId { get; set; }
        public string? ProjectDocId { get; set; }
      

    }

    public class JsonList
    {
        public string JSONData { get; set; }
        public string Item2 { get; set; }
        public string message { get; set; }
        public bool isResult { get; set; }
        public string MessageClass { get; set; }
        public string Item1 { get; set; }
        public int result { get; set; }
        public IEnumerable<ProjectUpdatesDetailsHeader>? ProjectDetailsHeaderDataList { get; set; }

    }
}
