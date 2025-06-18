using Ideation.Models;

namespace Ideation.Core
{
    public interface IEffortRepository
    {
        public List<object> GetMonthlyEfforts(string UserId, DateTime StartDate);
        Tuple<List<object>,List<object>, List<object>,IEnumerable<ManagerRemarks>> GetWeekData(string UserId, DateTime StartDate, DateTime EndDate);
        List<ProjectList> GetProjectList(string UserId);
        public List<ProjectList> GetMyProjects(string UserId);
        string EffortBookingSave(string UserId, string jsonString,string DeletedDate,string RemarksAddedProjectIds,string DeletedRemarksDetails);
        public List<ProjectList> Get_ProjectMasterResourceData(string Projects, string Resources, string IsFiltered);
        public Tuple<List<Leaves>, List<Leaves>> GetLeaves_HolidaysList(string UserId);
        public IEnumerable<EffortTracker> GetProjectReport_Details(string Projectid, string FromDate, string Todate,string User_Id);
        public IEnumerable<EffortTracker> GetProjectReport_DetailsBasedOnSearch(string Projectid, string FromDate, string Todate,string User_Id);
        public IEnumerable<EffortTracker> GetTask_details(string date,int task,string CreatedBy);
        List<UserNames> GetAllUsernames(string UserId);


        public List<ProjectRemarks> GetProjectRemarks(string ProjectId,string userId);
        void SaveRemarksBasedOnProject(string projectId, string userId, string remarks, string remarksDate);
    }

}
