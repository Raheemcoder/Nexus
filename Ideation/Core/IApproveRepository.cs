using Ideation.Models;

namespace Ideation.Core
{
    public interface IApproveRepository
    {
        public IEnumerable<UserMaster> GetUserList(string UserId);
        List<object> GetWeekDataBasedOnUser(string UserId, DateTime StartDate, DateTime EndDate);
        List<object> GetProjectsBasedOnUserEffort(string UserId, DateTime Effortdate, DateTime firstDay, DateTime lastDay);
       // public List<object> GetTaskAndEfforts(string UserId, DateTime Effortdate, string ProjectId);
         Tuple<List<object>, List<object>> GetWeekData_approval(string UserId, DateTime StartDate, DateTime EndDate);
        Tuple<List<object>, List<object>> GetWeekData_basedOnEfforts(string UserId, DateTime StartDate, DateTime EndDate);
        public string GetManagerRole(string UserId);
        public List<ProjectList> GetProjectList(string UserId);

        public string ApproveSave(string jsonString, string UserId);
        public string SaveSendBack(string jsonString, string UserId);

        public List<object> GetWeekDataBasedOnManager(string UserId, DateTime StartDate, DateTime EndDate);

    }
}
