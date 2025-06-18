using Ideation.Models;
using static Ideation.Models.MMProject;

namespace Ideation.Core
{
    public interface IMasterManagementRepository
    {
        Ideation.Models.Common Update_ProjectStatus(int projectId, string projectStatus, string userName, string IsActive);
        IEnumerable<PMUMapping> Get_ProjectList();
        IEnumerable<PMUMapping> Get_ProjectList(int roleId, string UserName);
        List<EPPMProjectMaster> Get_ProjectMasterList(string Divisions, string IsFiltered, string Status = "");
        List<string> Get_ProjectStatusMasterList();
        IEnumerable<RoleList> Get_RolesList();
        string Insert_Update_User(MMUser mMUser);
        IEnumerable<MMUser> UserMaster_GetList(string userId);
        IEnumerable<SFUserList> GetUserList();
        IEnumerable<MMDropdown> GetHUBandDivisionList(string type);
        IEnumerable<dynamic> ProjectMaster_DropDownValues();
        IEnumerable<ManagerValue> ProjectMaster_ManagerValues();
        IEnumerable<MMProject> ProjectMaster_EditList(string ProjectCode);
        string ProjectMaster_UpdateData(MMProject mMProject);
        IEnumerable<ApplicationList> GetApplicationList(string loginId);
        IEnumerable<MMDropdown> GetCategoryList(string division);
        public IEnumerable<Users> ProjectMaster_UserValues();

        public List<string> GetUserMappedList(string Projectcode);
        public IEnumerable<MMProjectExcelReport> ProjectMaster_ExportExcel(string ProjectCode);
        public IEnumerable<MMUserExcelReport> UserMaster_ExportExcel(string ProjectCode);
        public IEnumerable<ProjectStatus> Get_MMProjectStatusList();
        public IEnumerable<DivisionList> Get_MMDivisionForDrpdwn();
    }
}
