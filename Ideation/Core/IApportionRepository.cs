using Ideation.Models;

namespace Ideation.Core
{
    public interface IApportionRepository
    {
        public IEnumerable<Tasks> GetTasksList();
        public Tuple<IEnumerable<Division>, IEnumerable<Classification>, IEnumerable<ProjectType>, IEnumerable<RND>> GetAllList(string userId);
        public IEnumerable<ProjectList> GetProjectList(string Division, string Classification, string ProjectType, string RnD, string IsFiltered, string LoginId);
        public string ApportionSave(string UserId,string EffortDetails, int TaskId, string Remarks, string Division, string Classification, string ProjectType,  string RnD);
        public IEnumerable<ApportionDataView> GetApportionDataViews(string UserId, string Year, string Month);
        public IEnumerable<object> ShowApportionData(int ApportionId, string UserId);
        public void DeleteApportionData(int ApportionId, string StartDate, string EndDate,string UserId);

    }
}
