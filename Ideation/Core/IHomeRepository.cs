using Ideation.Models;

namespace Ideation.Core
{
    public interface IHomeRepository
    {
        List<PMUMapping> Get_ProjectSummaryList(int projectId, string loggedUserName, int roleId,int HubId,string Version);
        PMUMapping Get_ProjectStatusList(string loggedUserName, int roleId);
        List<PMUMapping> Get_ProjectVersiondetails(int projectId, int HubId, string Version, int IsFrom);
        IEnumerable<ExcelData> Get_ProjectSummaryExcelList(int projectId, string loggedUserName, int roleId, int HubId, string Version);
    }
}