using Ideation.Models;

namespace Ideation.Core
{
    public interface IProjectUpdatesRepository
    {
        public ProjectUpdates GetPUMastersData();
        public IEnumerable<ProjectUpdatesDetailsHeader> GetProjectUpdatesDetailsHeaderData(string userName);
        public IEnumerable<ProjectUpdatesDetailsHeader> GetProjectUpdatesDetailsHeaderData(string Division, string RandDName, string status, string ProjectType, string ProjectClassification,string Updates,string ProjectLead,string UserName);
        ProjectUpdates GetPUData(string projectCode, string userName);
        void UploadPUData(ProjectUpdates projectUpdates, string userName);
        IEnumerable<ProjectUpdates> GetUploadedDocumentDetail(string projectCode, string createdBy, string createdDate);
        Tuple<string, IEnumerable<ProjectUpdatesDetailsHeader>,ProjectUpdates,ProjectUpdates> GetPU_CommentsHistory(string projectCode, string FromDate, string ToDate,string Filter);

    }
}
