using Ideation.Models;

namespace Ideation.Core
{
    public interface INpdRepository
    {
        string UploadNpdData(NPD npd);

        public IEnumerable<ProjectBrief> GetProjectList(string Year, string Hub, string Division, string ProjectType, string Status, string userName);
        public IEnumerable<ProjectBrief> GetProjectDetailsForSendMail(string projectId);

        NPD GetNpdData(string projectId);
        void UpdateNpdData(NPD npd);
        public IEnumerable<PdfData> GetPdfData(string ProjectId, string Type, int Key);

        IEnumerable<NpdHgmlReview> GetUserEmailBasedOnHub(string hubIds);

        NPD UploadNpdHgmlReviewData(NPD npd);
        NPD GetHgmlReviewData(string projectId);
        void UploadNpdHubReviewData(NPD npd);
        NPD GetNpdHubReviewData(string projectId, string userName);
        NPD GetNpdHgmlApproveData(string projectId);
        NPD UploadNpdHgmlApproveData(NPD npd);
        void SaveNpdPopupHubBusinessInformation(string projectId, string UserName, string businessInformationData);

        IEnumerable<User> GetUserEmailBasedOnHubUser(string hubUser);
        NPD UploadNpdPmdReviewData(NPD npd);
        public IEnumerable<HubStatusinfo> GetHubStatusInfo(string projectId);
        public NPD GetNpdPmdReviewData(string projectId);

        NPD GetHubNameAndHubUserEmailForHgmlApprove(string projectId);
        IEnumerable<ProjectBrief> GetProductNamesInProjectBrief(string projectId, string projectType);
        public void savesendmailuserdata(string toMailids, string ProjectId);
        IEnumerable<NPDFieldRemarks> GetFieldRemarks(string projectId, string productName, string sku, string fieldId, string type);



    }
}
