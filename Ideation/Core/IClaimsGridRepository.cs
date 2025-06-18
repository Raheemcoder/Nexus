using Ideation.Models;

namespace Ideation.Core
{
    public interface IClaimsGridRepository
    {
        public IEnumerable<ProjectList> GetProjectList();
        public Tuple<string,string> AddClaimsData(ClaimsGridDocument obj);
        public IEnumerable<ClaimsGridProjectData> GetDataByProjectNo(string ProjectNo);
        public ClaimsGridDocument GetClaimsData(string ProjectNo,string UserId,string Stage, string GirdId);
        public ClaimsGridDocument GetCFTReviewData(string ProjectNo, string UserId);
        public string UpdateClaimsData(ClaimsGridDocument obj);
        public IEnumerable<ExistingClaimsProject> GetExistingClaimsProjectList();
        public string AddUpdateCFTReview(ClaimsGridDocument obj);
        public string AddUpdateDSGReview(ClaimsGridDocument obj);
        public IEnumerable<ClaimsDepartments> GetDeptList();
        public IEnumerable<ClaimsLicenseCategory> GetLicenseCategoryList();
        public IEnumerable<ClaimsHub> GetHubList();
        public IEnumerable<DeptUsers> GetUserEmailBasedOnDept(string User, string DeptIds);
        public ClaimsUserDetails GetClaimsGridProjectsBasedOnUser(string UserId);
        public string DeleteClaimsRecord(string ProjectNumber);
        public IEnumerable<CFTApprovalStatus> GetClaimsGridCFTApprovalStatus(string ProjectNo, string GridId);
        public IEnumerable<CFTRemarksList> GetCFTRemarksBasedOnDept(string ProjectNo, string DeptName, string GridId);
        public string GetUserDeptName(string User);
        public IEnumerable<StatusList> GetStatusList();
        public IEnumerable<ClaimsGridListView> getFilterClaimsGridList(string UserId, string ProjectNo, string Status, String Division);
        public IEnumerable<ClaimsProductDescrtion> getClaimsProductionDescritpionDetials(string User, string ProjectNo, string Status, string GridId);
        public IEnumerable<OnPackLabelClaims> getPackLabelOrCommunicationDetails(string User, string ProjectNo, string Status, string GridId);
        public ClaimsPdf getClaimsInformation(string User, string ProjectNo, string Status, string GridId);
        public string DeleteClaimsRemarksRecord(string ProjectNumber, string ClaimsId, string UserId, string Type,string GridId);
        public ClaimsGridDocument FetchClaimsDetails(string ProjectNumber, string GridId);
        public IEnumerable<Object> Fetch_CFT_ClaimsDetails(string ProjectNumber, string TypeOfClaimsRemarks, string TypeOfCFT, string GridId);
        public IEnumerable<Object> Fetch_CFT_ClaimsWithRemarks(string ProjectNumber, string TypeOfClaimsRemarks, string TypeOfCFT, string GridId);
        public IEnumerable<ClaimsHistoryRemarks> FetchFormHistoryDetails(string GridId, string ProjectNumber);
        public IEnumerable<RequiredClaims> GetRquiredClaimsDetails(string ProjectNumber);
        public IEnumerable<SupportingDocument> GetSupportingDocuments(string ProjectNumber, string GridId);
        public ClaimsPdf GetClaimsApprovalData_PDF(string GridId);
        public void savesendmailuserdata(string toMailids, string GridId);
        public IEnumerable<ClaimsSendMailData> GetClaimsDetailsForSendMail(string GridId);

        public IEnumerable<DepartmentBasedOnHub> GetDepartmentBasedOnHubName(string HubName);
        public IEnumerable<DocumentDetails> GetMultipleDepartmentsUploadedDocuments(string GridId, string ClaimsId,string Type);
        public IEnumerable<DocumentDetails> GetMultipleDepartmentsUploadedExcel(string GridId);

        public IEnumerable<DivisionMaster> GetDivisionList();
        public IEnumerable<ClaimsDepartments> GetDeptListForSendMail();

        public IEnumerable<PMDUsersMaster> GetPMDUsersList();

        public string GetCCMailIds (string toMailids,string GridId);
        public Tuple<string, string> GetClaimsAllDepartments(string GridId, string ProjectNumber);
    }
}
