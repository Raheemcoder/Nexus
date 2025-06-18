using Ideation.Models;

namespace Ideation.Core
{
    public interface IReformulationRepository
    {
        string UploadReformulationData(Reformulation reformulation);
        //public IEnumerable<Reformulation> GetReformulationData(string LoginId);
        Reformulation GetReformulationData(string projectId, string Hubname = "");
        Reformulation GetReformulationHubData(string projectId);
        void UpdateReformulationData(Reformulation reformulation);
        public Tuple<string, string> UploadHGMLReview(Reformulation reformulation);
        Reformulation GetHgmlReviewData(string projectId);
        void UploadHUBReview(Reformulation reformulation);
        Reformulation GetHUBReviewData(string projectId, string status = "", string username = "", string Status = "", string Role = "");
        Reformulation GetApprovalStages(string projectId);
        public Tuple<string, string> UploadReformulationPmdReviewData(Reformulation reformulation);
        Reformulation GetReformulationPmdReviewData(string projectId);
        Reformulation GetHubApprovalData(string projectId);
        public IEnumerable<TotalBusinessvalue> GetTotalBusinessValue(string projectId, int ProjectType,string Year);
        Reformulation GetOtherHubApprovalData(string projectId);
        IEnumerable<PMDDateandRemarks> GetPMUDateRemarks(string ProjectId);
        public string SavePMUDateRemarks(string PMDInfo, string Username);
    }
}
