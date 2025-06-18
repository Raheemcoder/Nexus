namespace Ideation.Models
{
    public class PBMasters
    {
        public IEnumerable<CategoryMaster> CategoryList { get; set; }
        public IEnumerable<HubMaster> HubList { get; set; }
        public IEnumerable<DivisionMaster> DivisionList { get; set; }
        public IEnumerable<RoleMaster> RoleList { get; set; }
        public IEnumerable<StatusMaster> StatusList { get; set; }
        public IEnumerable<ProjectMaster> ProjectList { get; set; }
        public IEnumerable<UserTypeMaster> UserTypeList { get; set; }
        public IEnumerable<CurrencyMaster> CurrencyList { get; set; }
        public IEnumerable<PBKDSMaster> MoldList { get; set; }
        public IEnumerable<PBKDSMaster> ProjectCategorizationList { get; set; }
        public IEnumerable<PBKDSMaster> ComplexityToBeAssignedList { get; set; }
        public IEnumerable<PBKDSMaster> RAndDNameList { get; set; }
        public IEnumerable<PBKDSMaster> ProjectPriorityList { get; set; }
        public string Year { set; get; }
        
    }
    public class CategoryMaster

    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string DepartmentName { get; set; }
        public string Year { get; set; }
        public string DepartmentId { get; set; }

    }
    public class HubMaster

    {
        public int HubId { get; set; }
        public string HubName { get; set; }

    }
    public class DivisionMaster

    {
        public int DivisionId { get; set; }
        public string DivisionName { get; set; }

    }
    public class StatusMaster

    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }

    }
    public class ProjectMaster
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectCode { get; set; }

    }
    public class RoleMaster

    {
        public int UserRoleId { get; set; }
        public string UserRoleName { get; set; }

    }
    public class UserTypeMaster

    {
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }

    }
    public class CurrencyMaster

    {
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }

    }
    public class PBKDSMaster
    {
        public string KDSValue { get; set; }
        public string KDSName { get; set; }
    }
}
