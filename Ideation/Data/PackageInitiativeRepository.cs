using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Ideation.Models;
using Ideation;
using System.Data.SqlClient;
using System.Data;
using Ideation.Core;
using DocumentFormat.OpenXml.Office2010.Excel;
using System.IO.Packaging;
using System.Runtime.InteropServices;
using System.Xml.Linq;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Office2016.Excel;
using System.Collections.Immutable;
using Microsoft.CodeAnalysis;

namespace Ideation.Data
{
    public class PackageInitiativeRepository : IPackageInitiativeRepository
    {
        public static void LogError(string controller, string action, Exception ex)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });
        }

        public string InsertPackageData(PackageInitiatives packageData)
        {
            string message = "";
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();


                    parameters.Add("PackageHeaderTableData", packageData.PackageHeaderTableData);
                    parameters.Add("PackagingProjectDetails", packageData.PackageProjectDetails);
                    parameters.Add("ProductDescData", packageData.PackageProductDescription);
                    parameters.Add("BusinessInfoData", packageData.PackageBusinessInformation);
                    parameters.Add("ExpectedPackingData", packageData.PackageExpextedPackagingProfile);
                    parameters.Add("PackageInitiatorRemarks", packageData.PackageInitiatorRemarks);
                    parameters.Add("ApprovalStatus", packageData.ApprovalStatus);
                    parameters.Add("SustainabilityData", packageData.PackageSustainability);
                    parameters.Add("SupportingDocumentData", packageData.SupportingDocumentData);
                    parameters.Add("@ProjectId_Out", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    var result = connection.Query("InsertPackageInitiativeData", parameters, commandType: CommandType.StoredProcedure);
                    message = parameters.Get<string>("@ProjectId_Out");


                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "PackageIntiatives", e);
            }
            return message;

        }
        public PackageInitiatives GetPackageInitiativePageData(string ProjectID, string username)
        {
            PackageInitiatives pack = new PackageInitiatives();
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                using (var reader = connection.QueryMultiple("GetPackageInitiativePageData", new { packageID = ProjectID, UserName = username }, commandType: CommandType.StoredProcedure))
                {
                    var PackageHeaderTableData = reader.Read<PackageHeaderTableData>().ToList();
                    var PackageInitiativesProjectDetails = reader.Read<PackageInitiativesProjectDetails>().ToList();
                    var PackageInitiativesProductDescription = reader.Read<PackageInitiativesProductDescription>().ToList();
                    var PackageInitiativesBusinessInformation = reader.Read<PackageInitiativesBusinessInformation>().ToList();
                    var PackageInitiativesExpectedData = reader.Read<PackageInitiativesExpectedPackagingProfile>().ToList();
                    var HGMLDataRemarks = reader.Read<PackageInitiativeHGMLReviewHGMLData>().ToList();

                    var ProjectDetailsHGMLData = reader.Read<PackageProjectDetailsHGML>().ToList();
                    var productDescriptionHGMLData = reader.Read<PackageProductDescriptionHGML>().ToList();
                    var BusinessInfoHGMLData = reader.Read<PackageBusinessHGML>().ToList();
                    var ExpectedPAckHGMLData = reader.Read<PackExpectedHGML>().ToList();

                    var ProjectDetailsHUBData = reader.Read<PackageProjectDetailsHUB>().ToList();
                    var productDescriptionHUBData = reader.Read<PackageProductDescriptionHUB>().ToList();
                    var BusinessInfoHUBData = reader.Read<PackageBusinessHUB>().ToList();
                    var ExpectedPackHUBData = reader.Read<PackExpectedHUB>().ToList();
                    var HGMLDataORHUBRemarks = reader.Read<PackageHGMLDataORHUBRemarks>().ToList();
                    var ApprovalStatusData1 = reader.Read<ApprovalStages>().ToList();
                    pack.PackageHGMLData = reader.Read<PackageInitiativeHGMLReviewHGMLData>().ToList();
                    pack.PackageSustainabilityData = reader.Read<PackageInitiativesSustainabilityData>().ToList();
                    pack.PackSustainabilityHGML = reader.Read<PackageSustainabilityHGML>().ToList();
                    pack.PackageSustainabilityHUB = reader.Read<PackageSustainabilityHUB>().ToList();

                    pack.SupportingDocData = reader.Read<SupportingDocument>().ToList();

                    pack.PackageHeader = PackageHeaderTableData;
                    pack.ProjectDetails = PackageInitiativesProjectDetails;
                    pack.PackageProductDesc = PackageInitiativesProductDescription;
                    pack.PackageBusinessInfo = PackageInitiativesBusinessInformation;
                    pack.PackageExpectedData = PackageInitiativesExpectedData;
                    pack.PackageHGMLData = HGMLDataRemarks;

                    pack.PackageProjectDetailsHGML = ProjectDetailsHGMLData;
                    pack.PackageProductDescriptionHGML = productDescriptionHGMLData;
                    pack.PackageBusinessHGML = BusinessInfoHGMLData;
                    pack.PackExpectedHGML = ExpectedPAckHGMLData;

                    pack.PackageProjectDetailsHUB = ProjectDetailsHUBData;
                    pack.PackageProductDescriptionHUB = productDescriptionHUBData;
                    pack.PackageBusinessHUB = BusinessInfoHUBData;
                    pack.PackExpectedHUB = ExpectedPackHUBData;
                    pack.PackageHGMLDataORHUBRemarks = HGMLDataORHUBRemarks;
                    pack.ApprovalStatusData = ApprovalStatusData1;

                }

                return pack;
            }
        }

        public PackageInitiatives GetPackageInitiativeHUBReviewData(string ProjectID, string username)
        {
            PackageInitiatives pack = new PackageInitiatives();
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                using (var reader = connection.QueryMultiple("GetPackageInitiativeHUBReviewData", new { packageID = ProjectID, UserName = username }, commandType: CommandType.StoredProcedure))
                {
                    var PackageInitiativesBusinessInformation = reader.Read<PackageInitiativesBusinessInformation>().ToList();
                    var HGMLDataORHUBRemarks = reader.Read<PackageHGMLDataORHUBRemarks>().ToList();
                    var ishubapproved = reader.Read<IsHubApprove>().ToList();
                    pack.HgmlDataHUBParticipatingMarket = reader.Read<HgmlDataHUBParticipatingMarket>().ToList();


                    pack.PackageBusinessInfo = PackageInitiativesBusinessInformation;
                    pack.PackageHGMLDataORHUBRemarks = HGMLDataORHUBRemarks;
                    pack.PackIsHubApproved = ishubapproved;


                }

                return pack;
            }
        }

        public PackageInitiatives GetPackageInitiativePMDReviewData(string ProjectID, string username)
        {
            PackageInitiatives pack = new PackageInitiatives();
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                using (var reader = connection.QueryMultiple("GetPackageInitiativePMDReviewData", new { ProjectID = ProjectID, UserName = username }, commandType: CommandType.StoredProcedure))
                {
                    pack.PackageProjectDetailsPMD = reader.Read<PackageProjectDetailsPMD>().ToList();
                    pack.PackageProductDescriptionPMD = reader.Read<PackageProductDescriptionPMD>().ToList();
                    pack.PackageBusinessPMD = reader.Read<PackageBusinessPMD>().ToList();
                    pack.PackExpectedPMD = reader.Read<PackExpectedPMD>().ToList();
                    pack.PackagePmdData = reader.Read<PmdData>().ToList();
                    pack.PackageHGMLData = reader.Read<PackageInitiativeHGMLReviewHGMLData>().ToList();
                    pack.HubApproveConfirmationList = reader.Read<packHgmlApprove>().ToList();
                    pack.TargetCostDataList = reader.Read<PackTargetCostData>().ToList();
                    pack.PackSustainabilityPMD = reader.Read<PackSustainabilityPMD>().ToList();

                }

                return pack;
            }
        }
        public PackageInitiatives GetPackageInitiativeHGMLApproveData(string ProjectID, string username)
        {
            PackageInitiatives pack = new PackageInitiatives();
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                using (var reader = connection.QueryMultiple("GetPackageInitiativeHGMLApproveData", new { ProjectID = ProjectID, UserName = username }, commandType: CommandType.StoredProcedure))
                {
                    var PackageInitiativesBusinessInformation = reader.Read<PackageInitiativesBusinessInformation>().ToList();
                    var ProjectDetailsHUBData = reader.Read<PackageProjectDetailsHUB>().ToList();
                    var productDescriptionHUBData = reader.Read<PackageProductDescriptionHUB>().ToList();
                    var BusinessInfoHUBData = reader.Read<PackageBusinessHUB>().ToList();
                    var ExpectedPackHUBData = reader.Read<PackExpectedHUB>().ToList();

                    var ProjectDetailsHGMLData = reader.Read<PackageProjectDetailsHGML>().ToList();
                    var productDescriptionHGMLData = reader.Read<PackageProductDescriptionHGML>().ToList();
                    var BusinessInfoHGMLData = reader.Read<PackageBusinessHGML>().ToList();
                    var ExpectedPAckHGMLData = reader.Read<PackExpectedHGML>().ToList();
                    var HGMLDataRemarks = reader.Read<PackageInitiativeHGMLReviewHGMLData>().ToList();
                    var ishubapproved = reader.Read<IsHubApprove>().ToList();
                    pack.HgmlDataHUBParticipatingMarket = reader.Read<HgmlDataHUBParticipatingMarket>().ToList();
                    pack.PackageSustainabilityHUB = reader.Read<PackageSustainabilityHUB>().ToList();
                    pack.PackSustainabilityHGML = reader.Read<PackageSustainabilityHGML>().ToList();

                    pack.PackageBusinessInfo = PackageInitiativesBusinessInformation;
                    pack.PackageProjectDetailsHUB = ProjectDetailsHUBData;
                    pack.PackageProductDescriptionHUB = productDescriptionHUBData;
                    pack.PackageBusinessHUB = BusinessInfoHUBData;
                    pack.PackExpectedHUB = ExpectedPackHUBData;
                    pack.PackageHGMLData = HGMLDataRemarks;

                    pack.PackageProjectDetailsHGML = ProjectDetailsHGMLData;
                    pack.PackageProductDescriptionHGML = productDescriptionHGMLData;
                    pack.PackageBusinessHGML = BusinessInfoHGMLData;
                    pack.PackExpectedHGML = ExpectedPAckHGMLData;
                    pack.PackIsHubApproved = ishubapproved;

                }

                return pack;
            }
        }


        public void DeletPageDataInTable(string ProjectID)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("packageID", ProjectID);
                var result = connection.Query("DeleteDataInTable", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

            };
        }

        public void UpdatePackageInitiativeData(PackageInitiatives packageData)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("ProjectId", packageData.ProjectId);
                parameters.Add("CreatedBy", packageData.UserName);
                parameters.Add("Status", packageData.StatusId);
                parameters.Add("PackageHeaderTableData", packageData.PackageHeaderTableData);
                parameters.Add("PackagingProjectDetails", packageData.PackageProjectDetails);
                parameters.Add("ProductDescData", packageData.PackageProductDescription);
                parameters.Add("BusinessInfoData", packageData.PackageBusinessInformation);
                parameters.Add("ExpectedPackingData", packageData.PackageExpextedPackagingProfile);
                parameters.Add("PackageInitiatorRemarks", packageData.PackageInitiatorRemarks);
                parameters.Add("ApprovalStatus", packageData.ApprovalStatus);
                parameters.Add("ReceivedDate", packageData.ReceivedDate);
                parameters.Add("SustainabilityData", packageData.PackageSustainability);
                parameters.Add("SendBackToInitiatorRemarks", packageData.packageSendBackToInitiatorRemarks);
                parameters.Add("SupportingDocumentData", packageData.SupportingDocumentData);
                parameters.Add("DeletedSupportingdocument", packageData.DeletedSupportingdocument);
                var result = connection.Query("UpdatePackageInitiativeData", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);


            }

        }

        public Tuple<string, string> InsertUpdatePackageInitiativeHGMLData(PackageInitiatives packageData)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", packageData.UserName);
                parameters.Add("ProjectId", packageData.ProjectId);
                parameters.Add("ProjectType", "Package Initiative");
                parameters.Add("Status", packageData.StatusId);
                parameters.Add("ProjectDetailsHGMLRemarks", packageData.PackageProjectDetailsHGMLRemarks);
                parameters.Add("ProductDescriptionHGMLRemarks", packageData.PackageProductDescriptionHGMLReamrks);
                parameters.Add("BusinessInformationHGMLRemarks", packageData.PackageBusinessInformationHGMLRemarks);
                parameters.Add("ExpectedPackagingHGMLRemarks", packageData.ExpectedPackagingHGMLRemarks);
                parameters.Add("SustainabilityHGMLRemarks", packageData.SustainabilityHGMLRemarks);

                parameters.Add("IsSentToHub", packageData.HGMLYesOrNo);

                parameters.Add("SendToHubRemarks", packageData.PackSendToHubRemarks);
                parameters.Add("SendToPmdRemarks", packageData.PackSendToPmdRemarks);
                parameters.Add("SendBackToInitiatorRemarks", packageData.packageSendBackToInitiatorRemarks);
                parameters.Add("RejectRemarks", packageData.PackRejectRemarks);
                parameters.Add("HgmlData", packageData.HgmlData);

                parameters.Add("RemarksType", "HGML Review");
                parameters.Add("ApprovalStatus", packageData.ApprovalStatus);
                parameters.Add("ReceivedDate", packageData.ReceivedDate);

                parameters.Add("SavedRemarks", packageData.SavedRemarks);
                parameters.Add("DeletedRemarks", packageData.DeletedRemarks);


                parameters.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                parameters.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                connection.Query("InsertUpdatePackageHGMLReviewData", parameters, commandType: CommandType.StoredProcedure);

                return System.Tuple.Create(parameters.Get<string>("@Msg"), parameters.Get<string>("@Msg_Class"));

            }
        }
        public void InsertUpdatePackageInitiativeHUBData(PackageInitiatives packageData)
        {

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", packageData.UserName);
                parameters.Add("ProjectId", packageData.ProjectId);
                parameters.Add("ProjectType", "Package Initiative");
                parameters.Add("Status", packageData.StatusId);

                parameters.Add("RemarksType", "HUB Review");

                parameters.Add("ProjectDetailsHUBRemarks", packageData.PackageProjectDetailsHUBRemarks);
                parameters.Add("ProductDescriptionHUBRemarks", packageData.PackageProductDescriptionHUBReamrks);
                parameters.Add("BusinessInformationHUBRemarks", packageData.PackageBusinessInformationHUBRemarks);
                parameters.Add("ExpectedPackagingHUBRemarks", packageData.ExpectedPackagingHUBRemarks);
                parameters.Add("HgmlOrHubDataHubRemarks", packageData.PackageHGMLDataHUBRemarks);
                parameters.Add("SustainabilityHUBRemarks", packageData.SustainabilityHUBRemarks);


                parameters.Add("ApprovalStatus", packageData.ApprovalStatus);
                parameters.Add("BusinessInformationData", packageData.PackageBusinessInformation);
                parameters.Add("SendToHubRemarks", packageData.SendToHGMLApproveRemarks);
                parameters.Add("ISHubApproved", packageData.IsHubApproved);
                parameters.Add("HgmlDataHUBParticipatingMarkets", packageData.HgmlDataHUBParticipatingMarkets);
                parameters.Add("ReceivedDate", packageData.ReceivedDate);

                parameters.Add("SavedRemarks", packageData.SavedRemarks);
                parameters.Add("DeletedRemarks", packageData.DeletedRemarks);

                parameters.Add("SupportingDocumentData", packageData.SupportingDocumentData);
                parameters.Add("DeletedSupportingdocument", packageData.DeletedSupportingdocument);

                //parameters.Add("Msg", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = connection.Query("InsertUpdatePackageHUBReviewData", parameters, commandType: CommandType.StoredProcedure);

                //return parameters.Get<string>("Result");
            }
        }
        public Tuple<string, string> InsertUpdatePackageInitiativeHGMLApproveData(PackageInitiatives packageData)
        {

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", packageData.UserName);
                parameters.Add("ProjectId", packageData.ProjectId);
                parameters.Add("ProjectType", "Package Initiative");
                parameters.Add("Status", packageData.StatusId);

                parameters.Add("RejectRemarks", packageData.PackRejectRemarks);
                parameters.Add("SendToPmdRemarks", packageData.PackSendToPmdRemarks);

                parameters.Add("RemarksType", "HGML Approve");

                parameters.Add("ApprovalStatus", packageData.ApprovalStatus);
                parameters.Add("ProjectDetailsHGMLRemarks", packageData.PackageProjectDetailsHGMLRemarks);
                parameters.Add("ProductDescriptionHGMLRemarks", packageData.PackageProductDescriptionHGMLReamrks);
                parameters.Add("BusinessInformationHGMLRemarks", packageData.PackageBusinessInformationHGMLRemarks);
                parameters.Add("ExpectedPackagingHGMLRemarks", packageData.ExpectedPackagingHGMLRemarks);
                parameters.Add("HgmlApproveToHubData", packageData.JsonPackHgmlToHubData);

                parameters.Add("HgmlData", packageData.HgmlData);
                parameters.Add("ReceivedDate", packageData.ReceivedDate);

                parameters.Add("SavedRemarks", packageData.SavedRemarks);
                parameters.Add("DeletedRemarks", packageData.DeletedRemarks);

               // parameters.Add("HgmlApproveToOtherHubData", packageData.JsonPackHgmlToOtherHubData);

                parameters.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                parameters.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);
                parameters.Add("SustainabilityHGMLRemarks", packageData.SustainabilityHGMLRemarks);

                var result = connection.Query("InsertUpdatePackageHGMLApproveData", parameters, commandType: CommandType.StoredProcedure);

                return System.Tuple.Create(parameters.Get<string>("@Msg"), parameters.Get<string>("@Msg_Class"));

            }
        }
        public Tuple<string, string> InsertUpdatePackageInitiativePMDReviewData(PackageInitiatives packageData)
        {

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", packageData.UserName);
                parameters.Add("ProjectId", packageData.ProjectId);
                parameters.Add("ProjectType", "Package Initiative");
                parameters.Add("Status", packageData.StatusId);
                parameters.Add("PmdData", packageData.PMDData);
                parameters.Add("PmdTargetCost", packageData.TargetCostGridData);

                parameters.Add("RemarksType", "PMD Review");

                parameters.Add("ApprovalStatus", packageData.ApprovalStatus);
                parameters.Add("ProjectDetailsPMDRemarks", packageData.PackageProjectDetailsPMDRemarks);
                parameters.Add("ProductDescriptionPMDRemarks", packageData.PackageProductDescriptionPMDReamrks);
                parameters.Add("BusinessInformationPMDRemarks", packageData.PackageBusinessInformationPMDRemarks);
                parameters.Add("ExpectedPackagingPMDRemarks", packageData.ExpectedPackagingPMDRemarks);

                parameters.Add("PackPMDDataApproveRemarks", packageData.PackPMDDataApproveRemarks);
                parameters.Add("SendBackToHGMLApproveRemarks", packageData.packageSendBackToInitiatorRemarks);
                parameters.Add("ReceivedDate", packageData.ReceivedDate);
                parameters.Add("RejectRemarks", packageData.PackRejectRemarks);

                parameters.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                parameters.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);
                parameters.Add("SustainabilityPMDRemarks", packageData.SustainabilityPMDRemarks);

                parameters.Add("SavedRemarks", packageData.SavedRemarks);
                parameters.Add("DeletedRemarks", packageData.DeletedRemarks);
                parameters.Add("PmdDueDate", packageData.PMdDueDate);


                connection.Query("InsertUpdatePackageInitiativePMDReviewData", parameters, commandType: CommandType.StoredProcedure);

                return System.Tuple.Create(parameters.Get<string>("@Msg"), parameters.Get<string>("@Msg_Class"));
            }

        }

        public IEnumerable<DivisionMaster> GetDivision(string username)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("Username", username);

                var result = connection.Query<DivisionMaster>("GetDivisonBasedOnUserLogin", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<CategoryMaster> GetCategory(string divisionId, string username)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("UserName", username);
                parameters.Add("DivId", divisionId);

                var result = connection.Query<CategoryMaster>("GetCategoryBasedOnUserLogin", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public PackageInitiatives GetProjectBriefHistoryDetail(string ProjectId, string flag)
        {
            PackageInitiatives pack = new PackageInitiatives();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetProjectBriefViewHistory", new { ProjectId = ProjectId, Flag = flag }, commandType: CommandType.StoredProcedure))
                {
                    pack.ProjectBriefHistoryDetails = reader.Read<ProjectBriefHistoryDetails>().ToList();
                    pack.statusNamesList = reader.Read<ProjectBriefStatusNameList>().ToList();

                }

                return pack;
            }
        }

        public IEnumerable<FieldRemarks> GetPackagingProfileRemarks(string ProjectId, string Product, string SKU, string FieldName)
        {

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Product", Product);
                parameters.Add("ProjectId", ProjectId);
                parameters.Add("SKU", SKU);
                parameters.Add("PackageName", FieldName);
                var result = connection.Query<FieldRemarks>("GetPackagingProfileFieldRemarks", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            };
        }

        public void SavePackagingProfileRemarks(string ProjectId, string Product, string SKU, string FieldName, string Remarks, string userId)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Product", Product);
                parameters.Add("ProjectId", ProjectId);
                parameters.Add("SKU", SKU);
                parameters.Add("PackageName", FieldName);
                parameters.Add("Remarks", Remarks);
                parameters.Add("UserId", userId);
                connection.Query("SavePackagingProfileFieldRemarks", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

            };
        }

        public IEnumerable<packHgmlApprove> GetUsersBasedOnDevision(string divisionId)

        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("DivId", divisionId);
                var result = connection.Query<packHgmlApprove>("GetPBUsersBasedOnDevision", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }


        public PackageInitiatives GetFieldWiseRemarks_PDF(string ProjectId)
        {
            PackageInitiatives pack = new PackageInitiatives();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("Get_FieldWiseRemarksForPDF", new { ProjectId = ProjectId }, commandType: CommandType.StoredProcedure))
                {
                    pack.PackagingProfileFieldRemarks = reader.Read<FieldRemarks>();
                    pack.packagingMasterList = reader.Read<PackagingMaster>();
                    pack.ReformulationBenchMarkImages = reader.Read<BenchMarkImages>();

                }
                 return pack;
            }
        }
        public PdfData GetApprovalData_PDF(string ProjectId)
        {
            PdfData pack = new PdfData();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetApprovedDetailsForPDF", new { ProjectId = ProjectId }, commandType: CommandType.StoredProcedure))
                {
                    pack.MarketingTeamApprovalData = reader.Read<MarketingTeamData>();
                    pack.HGMLReviewTeamApprovalData = reader.Read<HGMLReviewTeamData>();
                    pack.HUBReviewTeamApprovalData = reader.Read<HUBReviewTeamData>();
                    //pack.HGMLApproveTeamApprovalData = reader.Read<HGMLApproveTeamData>();
                    pack.FinescreeningTeamApprovalData = reader.Read<FineScreeningTeamData>();
                    //pack.AcceptedTeamApprovalData = reader.Read<AcceptedTeamData>();
                  //  pack.UpdatedTeamApprovalData = reader.Read<UpdatedTeamData>();

                }
                return pack;
            }
        }

        public IEnumerable<SupportingDocument> GetSupportingDocumentsData(string ProjectId) {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", ProjectId);
                var result = connection.Query<SupportingDocument>("GetPBSupportingDocuments", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}


