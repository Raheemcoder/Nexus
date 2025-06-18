using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.PowerBI.Api.Models;
using NonFactors.Mvc.Grid;
using Org.BouncyCastle.Bcpg.OpenPgp;
using System.Numerics;

namespace Ideation.Models
{
    public class ProjectMasters
    {
        public string? ProjectType { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? Template { get; set; }
        public string? ProjectDescription { get; set; }
        public string? ItemTypeName { get; set; }
        public string? BucketName { get; set; }
        public string? ProjectBriefId { get; set; }
        public string? Product { get; set; }
        public string? HubName { get; set; }
        public string? HubList { get; set; }
        public string? ProjectCode { get; set; }
        public string? CreatedBy { get; set; }
        public string? Remarks { get; set; }
        public string? Portfolio { get; set; }
        public string? ItemType { get; set; }
        public string SetProjectMasterHeaderDataList { get; set; }
        public string SetBucket { get; set; }
        public string SetItemType { get; set; }
        public string SetTemplate { get; set; }
        public string? Item { get; set; }
        public string Usergrp { get; set; }
        public string? ProjectMasterHeaderData { get; set; }
        public string? PortfolioData { get; set; }
        public string? BucketData { get; set; }
        public string? ItemTypeData { get; set; }
        public string? TemplateData { get; set; }
        public string? UserGrpData { get; set; }
        public string? D3GrpData { get; set; }
        public string? TypeOfProject { get; set; }
        public string? ProjectStatus { get; set; }
        public string? TransportName { get; set; }


        public IEnumerable<SelectListItem> ItemList { get; set; }
        public IEnumerable<SelectListItem> ProjecTypeList { get; set; }
        public IEnumerable<SelectListItem> TemplateList { get; set; }
        public IEnumerable<SelectListItem> ItemTypeList { get; set; }
        public IEnumerable<SelectListItem> BucketList { get; set; }
        public IEnumerable<SelectListItem> HubDataList { get; set; }
        public IEnumerable<SelectListItem> PortfolioList { get; set; }
        public IEnumerable<SelectListItem> FromYearList { get; set; }
        public IEnumerable<SelectListItem> ToYearList { get; set; }
        public IEnumerable<SelectListItem> DepartmentList { get; set; }
        public IEnumerable<LoginUserGroup> UserGroup { get; set; }
        public IEnumerable<D3UserGroup> D3UserGroup { get; set; }
        public IEnumerable<PMItemMaster> ItemMaster { get; set; }
        public IEnumerable<PMProjectTypeMaster> ProjectTypeMaster { get; set; }
        public IEnumerable<PMTemplateMaster> TemplateMaster { get; set; }
        public IEnumerable<TemplateMaster> TemplateMasterForList { get; set; }
        public IEnumerable<PMItemTypeMaster> ItemTypeMaster { get; set; }
        public IEnumerable<PMBucketMaster> BucketMaster { get; set; }
        public IEnumerable<PMHubMaster> HubMaster { get; set; }
        public IEnumerable<PMPortfolioMaster> PortfolioMaster { get; set; }
        public IEnumerable<ProjectMasterHeaderData> ProjectMasterHeaderDataList { get; set; }
        public TemplateData TemplateDataList { get; set; }
        public IEnumerable<BudgetPlan> BudgetPlan { get; set; }
        public IEnumerable<BudgetHistory> BudgetHistory { get; set; }
        public IEnumerable<GetProjectDates> ProjectDates { get; set; }
        public IEnumerable<BudgetProjectData> BudgetProjectData { get; set; }
        public IEnumerable<CategoryMaster> CategoryMaster { get; set; }
        public IEnumerable<CategoryValue> CategoryValue { get; set; }
        public IEnumerable<Year> FromYearValue { get; set; }
        public IEnumerable<Year> ToYearValue { get; set; }
        public IEnumerable<DepartmentMaster> DepartmentValue { get; set; }
        public IEnumerable<BudgetTransfer> ToTransferData { get; set; }
        public IEnumerable<BudgetTransfer> FromTransferData { get; set; }
        public IEnumerable<DepartmentBudgetResource> ActiveDepartmentUsers { get; set; }
        public IEnumerable<DepartmentBudgetResource> ActiveDepartments { get; set; }
        public IEnumerable<StatusList> StatusList { get; set; }
        public IEnumerable<DepartmentListMaster> DepartmentListMaster { get; set; }
        public IEnumerable<DepartmentBudgetCollection> DepartmentBudgetMaster { get; set; }
        public IEnumerable<SelectListItem> CurrencyDataList { get; set; }
        public IEnumerable<SelectListItem> MaterialList { get; set; }
        public IEnumerable<SelectListItem> DivisionList { get; set; }
        public IEnumerable<SelectListItem> MaterialTypeList { get; set; }
        public IEnumerable<SelectListItem> PurchaseGroupList { get; set; }
        public IEnumerable<SelectListItem> ProjectList { get; set; }
        public IEnumerable<SelectListItem> CategoryList { get; set; }
        public IEnumerable<SelectListItem> IsProjectPlanningList { get; set; }
        public IEnumerable<SelectListItem> IsHGHList { get; set; }
        public IEnumerable<MaterialList> MaterialListValue { get; set; }
        public IEnumerable<DivisionListForMaterial> DivisionValue { get; set; }
        public IEnumerable<MaterialTypeList> MaterialTypeValue { get; set; }
        public IEnumerable<PurchaseGroupList> PurchaseGroupValue { get; set; }
        public IEnumerable<ProjectListForExpenses> ProjectValue { get; set; }
        public string ProjectMaster { get; set; }
        public string ProjectName { get; set; }
        public string ApprovalRemarks { get; set; }
        public string ReqBudget { get; set; }
        public string? Role { get; set; }
        public string? BudgetType { get; set; }
        public string? ItemID { get; set; }
        public string? Amount { get; set; }
        public string? Year { get; set; }
        public string TotalBudgetAmt { get; set; }
        public string BaselineBudget { get; set; }
        public string AdditionalBudget { get; set; }
        public string TransferBudget { get; set; }
        public string TotalExpenseAmt { get; set; }
        public string Balance { get; set; }
        public string Expense { get; set; }
        public string? ProjectDataToSave { get; set; }
        public string? IsSave { get; set; }
        public string? CreatedDate { get; set; }
        public string? Category { get; set; }
        public string? DepartmentName { get; set; }
        public string OutMessage { get; set; }
        public string StyleClass { get; set; }
        public string ProjectId { get; set; }
        public int NoOfDepartmentResources { get; set; }
        public string ProjectStartYear { get; set; }
        public string PendingDeptFlag { get; set; }
        public IEnumerable<ProjectsCollection> ProjectsList { get; set; }
        public IEnumerable<ProjectBusinessValueCollection> BusinessInformation { get; set; }
        public string BusinessJsonData { get; set; }
        public string Currency { get; set; }
        public string AssignedAmt { get; set; }
        public string AssignedBalance { get; set; }
        public IEnumerable<BICurrencyMaster> CurrencyList { get; set; }
        public IEnumerable<ProjectBusinessValueCollection> ProjectDataList { get; set; }
        public int DepartmentId { get; set; }
        public List<IFormFile>? PostedFile { get; set; }
        public string? DocumentData { get; set; }
        public string EnclosureName { get; set; }
        public int DocumentId { get; set; }
        public int IsApproved { get; set; }
        public int IsActive { get; set; }
        public string MaterialCode { get; set; }
        public string MaterialName { get; set; }
        public string DivisionName { get; set; }
        public string MaterialTypeName { get; set; }
        public string UOM { get; set; }
        public string PurchaseGroup { get; set; }
        public string HSNCode { get; set; }
        public int IsBudgetRequested { get; set; }
        public string Projects { get; set; }
        public string StatusValue { get; set; }
        public string Departments { get; set; }
        public string SAPBudgetAmt { get; set; }
        public string IsProjectPalanning { get; set; }
        public string IsHGHRequired { get; set; }
        public IEnumerable<DropdownData> ProjectPlanning { get; set; }
        public IEnumerable<DropdownData> HGHData { get; set; }
        public string DivisionId { get; set; }
    }

    #region List page
    public class PMItemMaster
    {
        public string? ItemId { get; set; }
        public string? ItemName { get; set; }
    }

    public class PMProjectTypeMaster
    {
        public string ProjectTypeId { get; set; }
        public string ProjectTypeName { get; set; }
    }
    public class PMPortfolioMaster
    {
        public string PortfolioId { get; set; }
        public string PortfolioName { get; set; }
    }

    public class PMBucketMaster
    {
        public string Parent { get; set; }
        public string BucketId { get; set; }
        public string BucketName { get; set; }
    }

    public class PMItemTypeMaster
    {
        public string Parent { get; set; }
        public string ItemTypeId { get; set; }
        public string ItemTypeName { get; set; }
    }
    public class PMTemplateMaster
    {
        public string Parent { get; set; }
        public string TemplateId { get; set; }
        public string Template { get; set; }
        public string TemplateDescription { get; set; }
    }
    public class TemplateMaster
    {
        public string TemplateId { get; set; }
        public string TemplateDescription { get; set; }
    }
    public class PMHubMaster
    {
        public string HubId { get; set; }
        public string HubName { get; set; }
    }
    public class BICurrencyMaster

    {
        public int? CurrencyId { get; set; }
        public string? CurrencyName { get; set; }

    }
    public class ProjectMasterHeaderData
    {
        public string? ProjectBriefId { get; set; }
        public string? Product { get; set; }
        public string? ProjectType { get; set; }
        public string? ProjectId { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? Template { get; set; }
        public string? ProjectCode { get; set; }
        public string? HubName { get; set; }
        public string? SAPStatus { get; set; }
        public string? Remarks { get; set; }
        public string? ItemType { get; set; }
        public string? ProjectDescription { get; set; }
        public string? PrjIdProduct { get; set; }
        public string? CreatedDate { get; set; }
        public string? Legacy { get; set; }
        public string? ProjectStatus { get; set; }
        public string? Division { get; set; }
        public string? DivisionId { get; set; }
        public string? IsProjectPlanning { get; set; }
        public string? IsHGHRequired { get; set; }
    }

    public class ViewProjectData
    {
        public string? Product { get; set; }
        public string? Template { get; set; }
        public string? ItemType { get; set; }
        public string? BucketName { get; set; }
        public string? HubName { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? Remarks { get; set; }
        public string? DivisionId { get; set; }
        public string? IsProjectPlanning { get; set; }
        public string? IsHGHRequired { get; set; }
        public string? PlanningExists { get; set; }
        public int BudgetExists { get; set; }
        public int HGHSuppDocExists { get; set; }
        public IEnumerable<ProjectBusinessValueCollection> BusinessData { get; set; }
    }

    public class SAPresponse
    {
        public string Response { get; set; }
    }
    public class HODName
    {
        public string Name { get; set; }
        public string EmployeeName { get; set; }
        public string UserName { get; set; }
    }
    public class GetResources
    {
        public string EmployeeName { get; set; }
        public string UserName { get; set; }
    }

    public class LoginUserGroup
    {
        public string UserGroup { get; set; }
        public string UserPortfolio { get; set; }
        public string UserBucket { get; set; }
        public string UserItemType { get; set; }
        public string UserTemplate { get; set; }
    }
    public class D3UserGroup
    {
        public string UserPortfolio { get; set; }
        public string UserBucket { get; set; }
        public string UserItemType { get; set; }
        public string UserTemplate { get; set; }
    }
    public class HGHDocumentCollection
    {
        public int DocId { get; set; }
        public string DocumentName { get; set; }
    }
    #endregion

    #region Template Resource Master
    public class TemplateData
    {
        public string Role { get; set; }
        public string TemplateName { get; set; }
        public string ProjectElement { get; set; }
        public int Duration { get; set; }
        public string Unit { get; set; }
        public string Resources { get; set; }
        public string Description { get; set; }
        public string KeyValue { get; set; }
        public string HODName { get; set; }
        public string ActualDays { get; set; }
        public int RoleId { get; set; }
        public IEnumerable<SelectListItem> TemplateList { get; set; }
        public IEnumerable<PITemplateMaster> TemplateMaster { get; set; }
        public string SetTemplateDataList { get; set; }
        public IEnumerable<GetTemplateDataList_NUI>? TemplateMasterList { get; set; }
        public IEnumerable<GetTemplateDataList>? TemplateMasterListOld { get; set; }
        public IEnumerable<GetDepartmentUsersList>? GetDepartmentUsersList { get; set; }
        public IEnumerable<GetAddedTemplateResourceName_NUI>? AddedResourceName { get; set; }
        public IEnumerable<GetAddedTemplateResourceName>? AddedResourceNameOld { get; set; }
    }
    public class GetDepartmentUsersList
    {
        public string DepartmentName { get; set; }
        public string Resources { get; set; }
    }
    public class PITemplateMaster
    {
        public string Key { get; set; }
        public string Description { get; set; }
    }

    public class GetTemplateDataList
    {
        public string Role { get; set; }
        public string RoleId { get; set; }
        public string TemplateName { get; set; }
        public string ProjectId { get; set; }
        public string ProjectElement { get; set; }
        public string Duration { get; set; }
        public string Unit { get; set; }
        public string Resources { get; set; }
        public string KeyValue { get; set; }
        public string HODName { get; set; }
        public string IsActive { get; set; }
        public string IsBudgetPlanning { get; set; }
        public string Product { get; set; }

    }
    public class GetAddedTemplateResourceName
    {
        public string ProjectElement { get; set; }
        public string KeyValue { get; set; }
        public string ResourceName { get; set; }
    }

    public class GetTemplateDataList_NUI
    {
        public string Role { get; set; }
        public string RoleId { get; set; }
        public string TemplateName { get; set; }
        public string ProjectId { get; set; }
        public string ProjectElement { get; set; }
        public string Duration { get; set; }
        public string Unit { get; set; }
        public string Resources { get; set; }
        public string KeyValue { get; set; }
        public string HODName { get; set; }
        public string IsActive { get; set; }
        public string IsBudgetPlanning { get; set; }
        public string Product { get; set; }

    }
    public class GetAddedTemplateResourceName_NUI
    {
        public string TemplateId { get; set; }
        public string RoleId { get; set; }
        public string Role { get; set; }
        public string ResourceName { get; set; }
        public string Duration { get; set; }

    }

    public class GetUpdatetempaltedata
    {
        public int Duration { get; set; }
        public string KeyValue { get; set; }
        public string ResourceName { get; set; }
    }
    public class ExcelTemplateMasterData
    {
        public string RoleId { get; set; }
        public string Role { get; set; }
        public string HODName { get; set; }
        public int Duration { get; set; }
        public string Unit { get; set; }
        public string Resources { get; set; }
    }
    #endregion

    #region Project Resource Master Old UI
    public class ResourceData
    {
        public string ProjectId { get; set; }
        public string TemplateName { get; set; }
        public string Role { get; set; }
        public string ProjectElement { get; set; }
        public int Duration { get; set; }
        public string Unit { get; set; }
        public string SearchedProjectId { get; set; }
        public string Resources { get; set; }
        public string KeyValue { get; set; }
        public string ProjectIdList { get; set; }
        public string HODName { get; set; }
        public int ActualDays { get; set; }
        public int AllocatedDays { get; set; }
        public float PlannedBudget { get; set; }


        public IEnumerable<SelectListItem> ResourceList { get; set; }
        public IEnumerable<PIResourceMaster> ResourceMaster { get; set; }
        public string SetResourceDataList { get; set; }
        public IEnumerable<GetResourceDataList>? ResourceMasterList { get; set; }

        public IEnumerable<ResourceTemplateName> TemplateNameData { get; set; }

        public IEnumerable<GetAddedProjectResourceName> AddedResourceName { get; set; }
    }
    public class PIResourceMaster
    {
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectIdList { get; set; }
    }
    public class ResourceTemplateName
    {
        public string TemplateName { get; set; }
        public float PlannedBudget { get; set; }
        public int Duration { get; set; }
    }
    public class GetResourceDataList
    {
        public string ProjectId { get; set; }
        public string Role { get; set; }
        public string ProjectElement { get; set; }
        public int Duration { get; set; }
        public string Unit { get; set; }
        public string Resources { get; set; }
        public string KeyValue { get; set; }
        public string HODName { get; set; }
        public int ActualDays { get; set; }
        public int AllocatedDays { get; set; }
        public float PlannedBudget { get; set; }

    }
    public class ResourceName
    {
        public string Name { get; set; }
    }
    public class ResourceDays
    {
        public string KeyValue { get; set; }
        public int Days { get; set; }
        public string ResourceName { get; set; }
        public string ProjectId { get; set; }

    }
    public class GetAddedProjectResourceName
    {
        public string ProjectElement { get; set; }
        public string KeyValue { get; set; }
        public int Days { get; set; }
        public string ResourceName { get; set; }

    }
    public class ExcelResourceMasterData
    {
        public string TemplateCode { get; set; }
        public string Role { get; set; }
        public int Duration { get; set; }
        public string AllocatedDays { get; set; }
        public float PlannedBudget { get; set; }
        public int AssignedDuration { get; set; }
        public string ResourceName { get; set; }
    }
    #endregion

    #region project resource master NEW UI
    public class ProjectResourceData
    {
        public string SearchedProjectId { get; set; }
        public IEnumerable<ResourcesCollection> ResourcesList { get; set; }
        public IEnumerable<ProjectsCollection> ProjectsList { get; set; }
        public IEnumerable<ProjectHeaderDataCollection> ProjectHeaderData { get; set; }
        public IEnumerable<ProjectRoleDataListCollection> ProjectRoleDataList { get; set; }
        public IEnumerable<ProjectRoleResourceDataListCollection> ProjectRoleResourceDataList { get; set; }
    }

    public class ProjectsCollection
    {
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
    }
    public class ResourcesCollection
    {
        public string ResourceName { get; set; }
    }

    public class ProjectHeaderDataCollection
    {
        public string TemplateId { get; set; }
        public string TemplateName { get; set; }
        public float PlannedBudget { get; set; }
        public int AssignedDuration { get; set; }
    }

    public class ProjectRoleDataListCollection
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public string Unit { get; set; }
        public string HOD { get; set; }
        public int RoleDuration { get; set; }
        public int RoleAllocatedDuration { get; set; }
        public float PlannedBudget { get; set; }
        public int AssignedDuration { get; set; }
    }

    public class ProjectRoleResourceDataListCollection
    {
        public string RoleId { get; set; }
        public string ResourceName { get; set; }
        public string Duration { get; set; }
    }

    public class ExcelResourceMasterData_NUI
    {
        public string TemplateName { get; set; }
        public float TotalPlannedBudget { get; set; }
        public int TotalAssignedDuration { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public string HOD { get; set; }
        public int RoleAllocatedDuration { get; set; }
        public string Unit { get; set; }
        public float PlannedBudget { get; set; }
        public int AssignedDuration { get; set; }
        public int Duration { get; set; }
        public string ResourceName { get; set; }
    }

    #endregion

    #region Cost Center Master
    public class RoleCostCenterMaster
    {
        public string CapturedRole { get; set; }
        public string CostCenter { get; set; }

        public string Role { get; set; }
        public string CostCenterName { get; set; }

        public IEnumerable<GetRoleCostCenterList>? RoleCostCenterList { get; set; }
        public IEnumerable<GetAddedCostCenterName>? AddedCostCenterName { get; set; }
        public IEnumerable<GetCostCentre>? CostCenterList { get; set; }
    }
    public class GetCostCentre
    {
        public string Role { get; set; }
    }
    public class GetRoleCostCenterList
    {
        public string Role { get; set; }
        public string CostCenterName { get; set; }
    }

    public class GetAddedCostCenterName
    {
        public string Role { get; set; }
        public string CostCenterName { get; set; }
    }

    public class CostCenterName
    {
        public string Name { get; set; }
    }

    public class ExcelRoleCostCenterMasterData
    {
        public string Role { get; set; }
        public string CostCenterName { get; set; }
    }
    #endregion

    #region Budget Pages
    public class CategoryValue
    {
        public string CategoryName { get; set; }
        public string value { get; set; }
    }
    public class BudgetPlan
    {
        public string ProjectId { get; set; }
        public string ProductName { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentId { get; set; }
        public string NoOfPendingRequest { get; set; }
        public string ReqBaselineBudget { get; set; }
        public string AppBaselineBudget { get; set; }
        public string ReqAdditionalBudget { get; set; }
        public string AppAdditionalBudget { get; set; }
        public string L2PendingBaselineBudget { get; set; }
        public string L2PendingAdditionalBudget { get; set; }
        public string Category { get; set; }
        public string CategoryId { get; set; }
        public string Status { get; set; }
        public string StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string BudgetYear { get; set; }
        public string Remarks { get; set; }
        public string BaselineApprovalStatus { get; set; }
        public string AdditionalBudgetApprovalStatus { get; set; }
        public string BudgetType { get; set; }
        public string RequestedBudget { get; set; }
        public string L1ApprovedBudget { get; set; }
        public string L2ApprovedBudget { get; set; }
        public string L1ActionBy { get; set; }
        public string L1ActionOn { get; set; }
        public string L2ActionOn { get; set; }
        public string L2ActionBy { get; set; }
        public string Year { get; set; }
        public string L2ApprovedRemarks { get; set; }
        public string L1ApprovedRemarks { get; set; }
        public string IsBaselineNotrequired { get; set; }
        public string PendingBudget { get; set; }
        public string TotalBudget { get; set; }
        public string Yearfreez { get; set; }
        public string BudgetReqNo { get; set; }
        public string SAPLogNo { get; set; }
        public string ReqPendDeptCount { get; set; }
        public string ReqPendDeptName { get; set; }
        public string ProjectStartYear { get; set; }
    }
    public class BudgetProjectData
    {
        public string ProductName { get; set; }
        public string ProjectId { get; set; }
        public string Template { get; set; }
        public string CreatedDate { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string ApprovedBaselinebudget { get; set; }
        public string ApprovedAdditionalbudget { get; set; }
        public string RequestedBaselinebudget { get; set; }
        public string RequestedAdditionalBudget { get; set; }
    }
    public class BudgetHistory
    {
        public string ProjectId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string BudgetType { get; set; }
        public string RequestedBudget { get; set; }
        public string ApprovedBudget { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string RequestRemarks { get; set; }
        public string ActionOn { get; set; }
        public string Action { get; set; }
        public string ActionBy { get; set; }
        public string ApproveRemarks { get; set; }
        public string L2ActionOn { get; set; }
        public string L2Action { get; set; }
        public string L2ActionBy { get; set; }
        public string L2ApproveRemarks { get; set; }
        public string DepartmentName { get; set; }
        public string RequestedYear { get; set; }
        public string Amount { get; set; }
        public string CategoryName { get; set; }
        public string BudgetTypeClass { get; set; }
        public string Status { get; set; }
        public string StatusClass { get; set; }
        public string Remarks { get; set; }
        public string BudgetReqNo { get; set; }
        public string RequestedAmount { get; set; }
        public string ApprovedAmount { get; set; }
        public string AssignedAmt { get; set; }
        public string AssignedBalance { get; set; }
        public string ToYear { get; set; }


    }
    public class GetExcelData_TeamRoleMaster
    {
        public string DepartmentName { get; set; }
        public string HODName { get; set; }
        public string Resources { get; set; }
    }

    public class GetExcelData_BudgetPlanning
    {
        public string DepartmentName { get; set; }
        public string IsActive { get; set; }
        public string BudgetPlanning { get; set; }
    }
    public class GetPRTeamMasterExcelData
    {
        public string DepartmentName { get; set; }
        public string PRRequestor { get; set; }
        public string PRApprover { get; set; }
    }
    public class GetProjectDates
    {
        public string ProjectStartDate { get; set; }
        public string ProjectEndDate { get; set; }
        public string RequestedYear { get; set; }
        public string ProjectId { get; set; }
        public string ProductName { get; set; }
        public string ReqBaselineBudget { get; set; }
        public string ReqAdditionalBudget { get; set; }
        public string AppBaselineBudget { get; set; }
        public string AppAdditionalBudget { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int CountOfSavedReq { get; set; }
    }
    public class Year
    {
        public string YearId { get; set; }
        public string YearVal { get; set; }
    }
    public class DepartmentMaster
    {
        public string? DepartmentName { get; set; }
        public string DepartmentId { get; set; }
    }

    public class BudgetTransfer
    {
        public string TransferReqNo { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string CategoryId { get; set; }
        public string Category { get; set; }
        public string ExpenseAmt { get; set; }
        public string Year { get; set; }
        public string Balance { get; set; }
        public string Budget { get; set; }
        public string ToTransfer { get; set; }
    }
    public class APIConfig
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string URL { get; set; }
        public string JsonPayload { get; set; }
        public string Status { get; set; }
        public string FromYearJson { get; set; }
        public string ToYearJson { get; set; }
        public string NegativeFromYearJson { get; set; }
        public string Response { get; set; }

    }
    public class GetBudgetExpenseForYear
    {
        public string Category { get; set; }
        public string Department { get; set; }
        public string Budget { get; set; }
        public string Expense { get; set; }
    }
    public class DepartmentBudgetResource
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
        public string HOD { get; set; }
        public string Resource { get; set; }
        public int IsConfirmed { get; set; }
        public int IsMailSent { get; set; }
        public int IsBudgetRequested { get; set; }
    }
    public class ProjectSAPDifference
    {
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string SAPBuget { get; set; }
        public string IspaceBudget { get; set; }
        public string Balance { get; set; }
    }
    public class DepartmentListMaster
    {
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
    public class DepartmentBudgetCollection
    {
        public string Department { get; set; }
        public string TotalBudget { get; set; }
    }

    public class ProjectBusinessValueCollection
    {
        public int GridRowNo { get; set; }
        public string ProjectId { get; set; }
        public string Product { get; set; }
        public string ProjectBriefId { get; set; }
        public string M1Q { get; set; }
        public string M2Q { get; set; }
        public string M3Q { get; set; }
        public string M4Q { get; set; }
        public string M5Q { get; set; }
        public string M6Q { get; set; }
        public string Y0Q { get; set; }
        public string Y1Q { get; set; }
        public string Y2Q { get; set; }
        public string Y3Q { get; set; }
        public string Y0V { get; set; }
        public string Y1V { get; set; }
        public string Y2V { get; set; }
        public string Y3V { get; set; }
        public string NPV { get; set; }
        public string IRR { get; set; }
        public int HUBId { get; set; }
        public string HUBName { get; set; }
        public string SKU { get; set; }
        public string UOM { get; set; }
        public string SellingPriceINR { get; set; }
        public string SellingPriceUSD { get; set; }
        public string ProposedSellingPrice { get; set; }
        public string ProjectStartYear { get; set; }
        public string ProjectStartYearSum { get; set; }
        public string ProjectNextYear { get; set; }
        public string ProjectNextYearSum { get; set; }
        public string TotalBudgetRequested { get; set; }
        public string TotalAllocatedBudget { get; set; }
        public string BusinessValue { get; set; }
        public int IsActive { get; set; }
        public string Currency { get; set; }
        public int AdhocProjectBusinessInformationId { get; set; }
    }

    #endregion

    #region PR Creation

    public class PRCreation
    {
        public long PRHeaderId { get; set; }
        public string Role { get; set; }
        public string LoginId { get; set; }
        public int StatusId { get; set; }
        public int IsInitiatorPR { get; set; }
        public string PRNoList { get; set; }
        public string FromDate { get; set; }
        public IEnumerable<PRHeaderCollection> PRHeaderList { get; set; }
        public IEnumerable<PRDetailsCollection> PRDetailsList { get; set; }
        public IEnumerable<PRDropdownCollection> PRDropdownList { get; set; }
        public IEnumerable<PRDocumentCollection> PRDocumentList { get; set; }
    }

    public class PRHeaderCollection
    {
        public long PRHeaderId { get; set; }
        public string Department { get; set; }
        public string Category { get; set; }
        public string MaterialType { get; set; }
        public string PRType { get; set; }
        public string Priority { get; set; }
        public string ReferenceNo { get; set; }
        public string PRNo { get; set; }
        public string ReferenceNoExcel { get; set; }
        public string PRNoExcel { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string StatusExcel { get; set; }
        public string StatusClass { get; set; }
        public string Remarks { get; set; }
        public string SentForPRCreationBy { get; set; }
        public string SentForPRCreationOn { get; set; }
        public string PRCreatedOn { get; set; }
        public string PRInitiatedBy { get; set; }
        public string PRInitiatedOn { get; set; }
        public string IsEditableRole { get; set; }
        public int IsSAPFailed { get; set; }
        public int IsInitiatorPR { get; set; }
    }
    public class PRDetailsCollection
    {
        public long DetailId { get; set; }
        public string Project { get; set; }
        public string ProjectIdDesc { get; set; }
        public string GLCode { get; set; }
        public string GLCodeDescription { get; set; }
        public string BalanceBudget { get; set; }
        public string MaterialCode { get; set; }
        public string MaterialCodeDescription { get; set; }
        public string PurchaseGrp { get; set; }
        public string HSNCode { get; set; }
        public string Quantity { get; set; }
        public string UOM { get; set; }
        public string StandardCost { get; set; }
        public string ApproximateCost { get; set; }
        public string PlantCode { get; set; }
        public string StorageLocationCode { get; set; }
        public string StockOnHand { get; set; }
        public string DeliveryDate { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public int IsSaved { get; set; }
    }
    public class PRDropdownCollection
    {
        public string Type { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public string Parent { get; set; }
    }
    public class PRIdValueCollection
    {
        public string id { get; set; }
        public string value { get; set; }
    }
    public class PRDocumentCollection
    {
        public long VendorDetailId { get; set; }
        public string VendorName { get; set; }
        public string DocumentName { get; set; }
        public string UploadedOn { get; set; }
        public string UploadedBy { get; set; }
        public int IsSaved { get; set; }
    }
    public class PRHistoryCollection
    {
        public string FromStage { get; set; }
        public string ToStage { get; set; }
        public string FromStageId { get; set; }
        public string ToStageId { get; set; }
        public string AssingedTo { get; set; }
        public string ReceivedOn { get; set; }
        public string SubmittedOn { get; set; }
        public string SubmittedBy { get; set; }
        public int Days { get; set; }
        public string Remarks { get; set; }
    }
    public class MaterialList
    {
        public string? MaterialName { set; get; }
        public string? MaterialId { set; get; }
    }
    public class MaterialTypeList
    {
        public string? MaterialTypeName { set; get; }
        public string? MaterialTypeId { set; get; }
    }
    public class PurchaseGroupList
    {
        public string? PurchaseGroupName { set; get; }
        public string? PurchaseGroupId { set; get; }
    }
    public class DivisionListForMaterial
    {
        public string? DivisionName { set; get; }
        public string? DivisionId { set; get; }
    }
    public class ProjectListForExpenses
    {
        public string? ProjectName { set; get; }
        public string? ProjectId { set; get; }
    }
    public class PRTeamMaster
    {
        public string? DepartmentId { set; get; }
        public string? DepartmentName { set; get; }
        public string? PRRequestor { set; get; }
        public string? PRApprover { set; get; }
    }

    #endregion

    #region ExpensesRequest
    public class ExpensesRequest
    {
        public string ExpensesRefId { get; set; }
        public string DetailsId { get; set; }
        public string ExpenseHeaderId { get; set; }
        public string NatureOfExpenses { get; set; }
        public string BillrefNo { get; set; }
        public string Advance { get; set; }
        public string ActualExpenses { get; set; }
        public string Otherfee { get; set; }
        public string ModeofFare { get; set; }
        public string DistanceTravelled { get; set; }
        public string PlaceOfLoadingAndBoarding { get; set; }
        public string LocalconveyCharges { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string InitiatedOn { get; set; }
        //public int StatusId { get; set; }
        public string Status { get; set; }
        public string StatusName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string CategoryId { get; set; }
        public string Category { get; set; }
        public string TotalExpenses { get; set; }
        public string TotalExpenses1 { get; set; }
        public string ClaimedBy { get; set; }
        public string ClaimedOn { get; set; }
        public string ApprovedBy { get; set; }
        public string ApprovedOn { get; set; }
        public string ProjectId { get; set; }
        public string ProjectMaster { get; set; }
        public string TransportName { get; set; }
        public string NetExpenses { get; set; }
        public IEnumerable<DepartmentMaster> DepartmentValue { get; set; }
        public IEnumerable<CategoryValue> CategoryValue { get; set; }
        public IEnumerable<SelectListItem> ProjectList { get; set; }
        public IEnumerable<DropdownData> ModeOfTransportValue { get; set; }
        public IEnumerable<SelectListItem> DepartmentList { get; set; }
        public IEnumerable<SelectListItem> CategoryList { get; set; }
        public IEnumerable<SelectListItem> ModeOfTransportList { get; set; }
        public IEnumerable<ProjectListForExpenses> ProjectValue { get; set; }
        public string? UploadDocument { get; set; }
        public string? RequestedData { get; set; }
        public string? Remarks { get; set; }
        public string? ApprovalFlow { get; set; }
        public string? Role { get; set; }
        public string? ExpensesRequestData { get; set; }
        public string? SupportingDocuments { get; set; }
        public string? TravelDate { get; set; }
        public string? StatusId { get; set; }
        public IEnumerable<ExpenseRequestHistory> ExpenseHistoryList { get; set; }
        public IEnumerable<StatusNameList> StatusList { get; set; }
        public string DocumentName { get; set; }
        public string ActionRemarks { get; set; }
        public string LoginId { get; set; }
        public string DocId { get; set; }
        public string ProjectName { get; set; }
        public string TotalBalance { get; set; }
        public string TotalBudget { get; set; }
        public string PurposeOfTravel { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public string EmployeeMaster { get; set; }
        public string GSTNo { get; set; }
        public string PlaceOfStay { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FieldRemarks { get; set; }
        public string EmployeeName { get; set; }
        public string UserName { get; set; }
        public string FileName { get; set; }
        public string DocCreatedBy { get; set; }
        public string DocCreatedOn { get; set; }
        public string CategoryCommaSeperated { get; set; }
        public string UTRNo { get; set; }
        public string UTRDocument { get; set; }
        public string BankDetails { get; set; }
    }
    public class ExpenseRequestHistory
    {
        public string FromStage { get; set; }
        public string FromStageName { get; set; }
        public string ToStage { get; set; }
        public string ToStageName { get; set; }
        public string Action { get; set; }
        public string SubmittedBy { get; set; }
        public string SubmittedOn { get; set; }
        public string AssignedTo { get; set; }
        public string Remarks { get; set; }
        public string ReceivedOn { get; set; }
        public string NoOfDaysTaken { get; set; }
    }
    public class ExpensesRequestHeader
    {
        public string ExpensesRefId { get; set; }
        public string ExpenseHeaderId { get; set; }
        public string ProjectName { get; set; }
        public string DepartmentName { get; set; }
        public string CategoryName { get; set; }
        public int ProjectId { get; set; }
        public int DepartmentId { get; set; }
        public int CategoryId { get; set; }
        public string Employee { get; set; }
        public string ClaimedOn { get; set; }
    }
    public class ExpensesRequestDetails
    {
        public string ExpensesRefId { get; set; }
        public string DetailsId { get; set; }
        public string NatureOfExpenses { get; set; }
        public string BillrefNo { get; set; }
        public string ModeOfFare { get; set; }
        public string PurposeOfTravel { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public string PlaceOfLAndB { get; set; }
        public string TravelDate { get; set; }
        public string FieldRemarks { get; set; }
        public string PlaceOfStay { get; set; }
        public string GSTNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Advance { get; set; }
        public string ActualExpenses { get; set; }
        public string Otherfee { get; set; }
        public string LocalconveyCharges { get; set; }
        public string NetExpenses { get; set; }
        public string Category { get; set; }
        public string CategoryId { get; set; }
        public string ProjectId { get; set; }
        public string UTRNo { get; set; }
        public string UTRDocument { get; set; }
    }
    public class ExpensesDocument
    {
        public long DetailsId { get; set; }
        public string DocumentName { get; set; }
        public string DocId { get; set; }
        
    }

    #endregion
}