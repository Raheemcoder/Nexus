using Ideation.Models;

namespace Ideation.Core
{
    public interface IPrototypeRepository
    {
        public ProtMaster GetProtMaster();
        PrototypeSubmissionDetail UploadPrototypeDetails(Prototype prototype, string userName, string prototypeId);
        void UploadAddPrototypData(Prototype prototype, string userName);
        IEnumerable<PrototypeDetailsHeader> GetPrototypeDetailsHeaderData(string EmpID,string AppShortName);
        public IEnumerable<PrototypeDetailsHeader> GetPrototypeDetailsHeaderData(string ProjectNo, string ProductName, int StatusId,string emp,string AppShortName);

        Prototype GetPrototypeData(string prototypeId, string statusId);
        public IEnumerable<ProjectNumberList> GetProjectNumber();
        public IEnumerable<ProductNameList> GetProjectNames();
        public IEnumerable<StatusList> GetStatusNames();
        Prototype GetPmdUser(string prototypeId,string AppShortName);
        Prototype GetSupportingDocumentDetail(string prototypeId);
        Prototype GetPrototypeHistoryDetail(string prototypeId,string flag);


        //IEnumerable<HubDetail> GetHubDetails();

        public PrototypeReport GetPrototypeReportData(string PrototypeId);

        (List<HubDetail> hubUserDetail, List<HubDetail> hubDetailTableData, List<HubDetail> batchNoDetail) GetHubDetails(string PrototypeId, string BatchNo,string AppShortName);
        IEnumerable<PrototypeSubmissionDetail> UploadPrototypeHubDetailsInPmdReview<PrototypeSubmissionDetail>(string hubDetailsData, string prototypeId, string userName);
        Prototype UploadPrototypePmdReviewData(Prototype prototype, string userName);

        public IEnumerable<HubStatusinform> GetHubStatusInfo(string PrototypeId);
        Prototype GetPrototypeHubReviewData(string prototypeId, string userName);
        Prototype UploadPrototypeHubReviewData(Prototype protype, string userName);
        IEnumerable<HubDetail> GetPrototypeHubStatusDetails(string prototypeId);
        Prototype GetPrototypeHgmlReviewData(string prototypeId, string userName);
        Prototype UploadPrototypeHgmlReviewData(Prototype prototype, string userName);
        Prototype GetPrototypeApprovedData(string prototypeId);
        Prototype GetPrototypeReworkData(string prototypeId);

        public void DeletePrototypeData(string prototypeId);
        string DeleteSupportingDocument(string fileName, string prototypeId, string statusId);

        public int InsertDownloadedFileInfo(string data);
        public IEnumerable<CompositionHistory> GetCompositionHistory(string PrototypeId);

    }
}
