using Ideation.Models;

namespace Ideation.Core
{
    public interface IPackageInitiativeRepository
    {
        public string InsertPackageData(PackageInitiatives packageData);

        public PackageInitiatives GetPackageInitiativePageData(string ID, string username);

        public PackageInitiatives GetPackageInitiativeHUBReviewData(string ID, string username);
        public PackageInitiatives GetPackageInitiativeHGMLApproveData(string ID, string username);
        public PackageInitiatives GetPackageInitiativePMDReviewData(string ID, string username);


        public void UpdatePackageInitiativeData(PackageInitiatives packageData);
        public void DeletPageDataInTable(string ID);

        public Tuple<string, string> InsertUpdatePackageInitiativeHGMLData(PackageInitiatives packageData);
        public void InsertUpdatePackageInitiativeHUBData(PackageInitiatives packageData);

        public Tuple<string, string> InsertUpdatePackageInitiativeHGMLApproveData(PackageInitiatives packageData);
        public Tuple<string, string> InsertUpdatePackageInitiativePMDReviewData(PackageInitiatives packageData);

        IEnumerable<DivisionMaster> GetDivision(string username);
        IEnumerable<CategoryMaster> GetCategory(string divisionId, string username);

        public PackageInitiatives GetProjectBriefHistoryDetail(string ProjectId, string flag);

        IEnumerable<FieldRemarks> GetPackagingProfileRemarks(string ProjectId, string Product, string SKU, string selectedPackge);

        void SavePackagingProfileRemarks(string ProjectId, string Product, string SKU, string FieldName, string Remarks, string userId);

        IEnumerable<packHgmlApprove> GetUsersBasedOnDevision(string DivisionId);
       public PackageInitiatives GetFieldWiseRemarks_PDF(string ProjectId);
        public PdfData GetApprovalData_PDF(string ProjectId);
        public IEnumerable<SupportingDocument> GetSupportingDocumentsData(string ProjectId);

    }

}

