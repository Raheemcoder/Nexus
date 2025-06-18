using Ideation.Models;

namespace Ideation.Core
{
    public interface IGanttChartRepository
    {
        IEnumerable<PMUMapping> Get_GanttChart(int RoleId, int UserId, int ProjectId, int VersionId);
        IEnumerable<History> Get_ProjectHistoryList(int projectId);
        IEnumerable<History> Get_HistoryList(int SlNo, int projectId, int HubId, string Version, int wBSHeaderId, int TaskId);
    }
}
