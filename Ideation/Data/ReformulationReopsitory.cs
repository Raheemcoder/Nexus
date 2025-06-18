using Dapper;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Ideation.Core;
using System.Collections.Immutable;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Drawing;
using Grpc.Core;
using Microsoft.AspNetCore.SignalR;
using System.Linq.Expressions;
using static Ideation.Models.Reformulation;
using static iText.IO.Image.Jpeg2000ImageData;
using static iTextSharp.text.pdf.PdfStructTreeController;

namespace Ideation.Data
{
    public class ReformulationReopsitory : IReformulationRepository
    {

        public static void LogError(string controller, string action, Exception ex)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });
        }


        public string UploadReformulationData(Reformulation reformulation)
        {
            string message = "";
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectHeaders", reformulation.ProjectHeaders);
                    para.Add("ProductDescription", reformulation.reformulationProductDescription);
                    para.Add("ProjectDetails", reformulation.reformulationProjectDetails);
                    para.Add("AdditionalFormulations", reformulation.reformulationAdditionalFormulationRequirements);
                    para.Add("BusinessInformation", reformulation.reformulationBusinessInformation);
                    para.Add("PackagingProfile", reformulation.reformulationPackagingProfile);
                    para.Add("InitiatorRemarks", reformulation.InitiatorRemarks);
                    para.Add("SaveOrSubmit", reformulation.SaveOrSubmit);
                    para.Add("SustainabilityData", reformulation.SustainabilityData);
                    para.Add("SupportingDocumentData", reformulation.SupportingDocumentData);
                    para.Add("BenchMarkImagesData", reformulation.BenchMarkImagesData);
                    para.Add("@ProjectId_Out", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);

                    const string StoredProcedure = "ConformReformulation";
                    
                    var result = connection.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    message = para.Get<string>("@ProjectId_Out");

                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "UploadReformulationData", e);
            }
            return message;

        }
        public Reformulation GetReformulationData(string projectId, string Hubname = "")
        {
            try
            {
                Reformulation reformulation = new Reformulation();

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    using (var reader = con.QueryMultiple("GetReformulationData", new { ProjectId = projectId, HubName = Hubname }, commandType: CommandType.StoredProcedure))
                    {
                        var reformulationTableData = reader.Read<ReformulationTableData>().ToList();
                        var reformulationProductDescription = reader.Read<ReformulationProductDetails>().ToList();
                        var reformulationProjectDetails = reader.Read<ReformulationProjectDetails>().ToList();
                        var reformulationAdditionalFormulationRequirements = reader.Read<ReformulationAdditionalFormulation>().ToList();
                        var reformulationBusinessInformation = reader.Read<ReformulationBusinessInformation>().ToList();
                        var reformulationPackagingProfile = reader.Read<ReformulationPackagingProfile>().ToList();
                        var InitiatorRemarksDb = reader.Read<ReformulationInitiatorRemarks>().ToList();
                        var sustainabilityData = reader.Read<ReformulationSustainability>().ToList();

                        reformulation.ReformulationTableData = reformulationTableData;
                        reformulation.ReformulationProductDetails = reformulationProductDescription;
                        reformulation.ReformulationProjectDetails = reformulationProjectDetails;
                        reformulation.ReformulationAdditionalFormulation = reformulationAdditionalFormulationRequirements;
                        reformulation.ReformulationBusinessInformation = reformulationBusinessInformation;
                        reformulation.ReformulationPackagingProfile = reformulationPackagingProfile;
                        reformulation.ReformulationInitiatorRemarks = InitiatorRemarksDb;
                        reformulation.Sustainability = sustainabilityData;
                        reformulation.SupportingDocData = reader.Read<SupportingDocument>().ToList();
                        reformulation.ReformulationBenchMarkImages = reader.Read<ReformulaitonBenchmarkImages>().ToList();
                        return reformulation;

                    }
                }

            }
            catch (Exception e)
            {
                LogError("NewInitiation", "GetReformulationData", e);
                return null;
            }

        }
        public void UpdateReformulationData(Reformulation reformulation)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("projectId", reformulation.ProjectId);
                    para.Add("ProjectHeaders", reformulation.ProjectHeaders);
                    para.Add("ProductDescription", reformulation.reformulationProductDescription);
                    para.Add("ProjectDetails", reformulation.reformulationProjectDetails);
                    para.Add("AdditionalFormulations", reformulation.reformulationAdditionalFormulationRequirements);
                    para.Add("BusinessInformation", reformulation.reformulationBusinessInformation);
                    para.Add("PackagingProfile", reformulation.reformulationPackagingProfile);
                    para.Add("InitiatorRemarks", reformulation.InitiatorRemarks);
                    para.Add("ApprovalStatus", reformulation.ApprovalStatus);
                    para.Add("Username", reformulation.UserName);
                    para.Add("ReceivedDate", reformulation.ReceivedDate);
                    para.Add("SustainabilityData", reformulation.SustainabilityData);
                    para.Add("SendBackToInitiatorRemarks", reformulation.SendBackToInitiatorRemarks);
                    para.Add("SupportingDocumentData", reformulation.SupportingDocumentData);
                    para.Add("DeletedSupportingdocument", reformulation.DeletedSupportingdocument);
                    para.Add("BenchMarkImagesData", reformulation.BenchMarkImagesData);
                    para.Add("DeletedBenchMarkImages", reformulation.DeletedBenchMarkImages);
                    const string StoredProcedure = "UpdateReformulation";
                    var result = connection.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "UpdateReformulationData", e);
            }
        }
        public Tuple<string, string> UploadHGMLReview(Reformulation reformulation)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectId", reformulation.ProjectId);
                    para.Add("ProjectType", "Reformulation");
                    para.Add("Status", reformulation.StatusValue);
                    para.Add("HgmlProductDetailsRemarks", reformulation.HgmlProductDetailsRemarks);
                    para.Add("HgmlProjectDetailsRemarks", reformulation.HgmlProjectDetailsRemarks);
                    para.Add("HgmlAdditionalFormulationRemarks", reformulation.HgmlAdditionalFormulationRemarks);
                    para.Add("HgmlBusinessInformationRemarks", reformulation.HgmlBusinessInformationRemarks);
                    para.Add("HgmlPackagingProfileRemarks", reformulation.HgmlPackagingProfileRemarks);
                    para.Add("SendToHub", reformulation.HgmlDataSendToHubConfirmation);
                    para.Add("SendToHubRemarks", reformulation.SendToHubRemarks);
                    para.Add("SendToPmdRemarks ", reformulation.SendToPmdRemarks);
                    para.Add("SendBackToInitiatorRemarks", reformulation.SendBackToInitiatorRemarks);
                    para.Add("RejectRemarks", reformulation.RejectRemarks);
                    para.Add("HgmlToHubRemarks", reformulation.HgmlDataHgmlToHubRemarks);
                    para.Add("HgmlData", reformulation.HgmlData);
                    para.Add("HgmltoHubDataRemarks", reformulation.HgmlToHubRemarks);
                    para.Add("RemarksType", "HGML");
                    para.Add("ApprovalStatus", reformulation.ApprovalStatus);
                    para.Add("HgmlApproveToHub", reformulation.JsonFormReformulationHgmlToHubData);
                    para.Add("CreatedBy", reformulation.UserName);
                    para.Add("ReceivedDate", reformulation.ReceivedDate);
                    para.Add("SustainabilityHGMLRemarks", reformulation.SustainabilityHGMLRemarks);
                    para.Add("SavedRemarks", reformulation.SavedPackagingRemarks);
                    para.Add("DeletedRemarks", reformulation.DeletedPackagingRemarks);
                    para.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    para.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);
                    const string StoredProcedure = "ReformulationHgmlReview";
                    var result = connection.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return System.Tuple.Create(para.Get<string>("@Msg"), para.Get<string>("@Msg_Class"));
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "UploadHGMLReview", e);
                return System.Tuple.Create("", "");
            }
        }
        public Reformulation GetHgmlReviewData(string projectId)
        {
            Reformulation reformulation = new Reformulation();
            try
            {

                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    using (var reader = con.QueryMultiple("GetReformulationHgmlReviewData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                    {
                        var projectDetailsHgmlRemark = reader.Read<ReformulationHgmlReview>().ToList();
                        var productDetailsHgmlRemark = reader.Read<ReformulationHgmlReview>().ToList();
                        var formulationProfileHgmlRemark = reader.Read<ReformulationHgmlReview>().ToList();
                        var packagingProfileHgmlRemark = reader.Read<ReformulationHgmlReview>().ToList();
                        var businessInformationHgmlRemark = reader.Read<ReformulationHgmlReview>().ToList();
                        var hgmlToHubRemark = reader.Read<SpecificHubRemark>().ToList();
                        var hgmlDataList = reader.Read<ReformulationHgmlReview>().ToList();
                        var hgmlGridDataList = reader.Read<ReformulationHgmlGridData>().ToList();
                        var sustainabilityHgmlRemark = reader.Read<ReformulationHgmlReview>().ToList();

                        reformulation.HgmlDataList = hgmlDataList;
                        reformulation.ProjectDetailsHGMLRemarksList = projectDetailsHgmlRemark;
                        reformulation.ProductDetailsHGMLRemarksList = productDetailsHgmlRemark;
                        reformulation.FormulationProfileHGMLRemarksList = formulationProfileHgmlRemark;
                        reformulation.PackagingProfileHGMLRemarksList = packagingProfileHgmlRemark;
                        reformulation.BusinessInformationHGMLRemarksList = businessInformationHgmlRemark;
                        reformulation.HGMLtoHubRemarksList = hgmlToHubRemark;
                        reformulation.HgmlDataGridList = hgmlGridDataList;
                        reformulation.SustainabilityHGMLRemarksList = sustainabilityHgmlRemark;
                    }
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "GetHgmlReviewData", e);
            }

            return reformulation;
        }
        public void UploadHUBReview(Reformulation reformulation)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("UserName", reformulation.UserName);
                    para.Add("ProjectId", reformulation.ProjectId);
                    para.Add("ProjectType", "Reformulation");
                    para.Add("Status", reformulation.StatusValue);
                    para.Add("HubProductDetailsRemarks", reformulation.HUBProductDetailsRemarks);
                    para.Add("HubProjectDetailsRemarks", reformulation.HUBProjectDetailsRemarks);
                    para.Add("HubAdditionalFormulationRemarks", reformulation.HUBAdditionalFormulationRemarks);
                    para.Add("HubBusinessInformationRemarks", reformulation.HUBBusinessInformationRemarks);
                    para.Add("HubPackagingProfileRemarks", reformulation.HUBPackagingProfileRemarks);
                    para.Add("HgmlOrHubDataRemarks", reformulation.HgmlOrHubDataHubRemarks);
                    para.Add("HubApprove", reformulation.HubApprove);
                    para.Add("RemarksType", "HUB");
                    para.Add("HubRemarksToHgml", reformulation.SendToHgmlRemarks);
                    para.Add("BusinessInformation", reformulation.reformulationBusinessInformation);
                    para.Add("ApprovalStatus", reformulation.ApprovalStatus);
                    para.Add("CreatedBy", reformulation.UserName);
                    para.Add("Hub", reformulation.HUBName);
                    para.Add("IsHubApproved", reformulation.HubApprove);
                    para.Add("SendToHgmlRemarks", reformulation.SendToHgmlRemarks);
                    para.Add("HgmlDataHUBParticipatingMarkets", reformulation.HgmlDataHUBParticipatingMarkets);
                    para.Add("ReceivedDate", reformulation.ReceivedDate);
                    para.Add("SustainabilityHubRemarks", reformulation.SustainabilityHubRemarks);
                    para.Add("SavedRemarks", reformulation.SavedPackagingRemarks);
                    para.Add("DeletedRemarks", reformulation.DeletedPackagingRemarks);
                    para.Add("SupportingDocumentData", reformulation.SupportingDocumentData);
                    para.Add("DeletedSupportingdocument", reformulation.DeletedSupportingdocument);
                    const string StoredProcedure = "ReformulationHUBReview";
                    var result = connection.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                LogError("NewInitiation", "UploadHUBReview", e);
            }
        }
        public Reformulation GetHUBReviewData(string projectId, string status = "", string username = "", string Status = "", string Role = "")
        {
            Reformulation reformulation = new Reformulation();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                if (status != "HUB Review")
                {
                    using (var reader = con.QueryMultiple("GetReformulationHubRemarks", new { ProjectId = projectId, Username = "" }, commandType: CommandType.StoredProcedure))
                    {
                        var projectDetailsHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var productDetailsHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var formulationProfileHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var packagingProfileHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var businessInformationHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var hubApprovalStatus = reader.Read<HubApprovalStatus>().ToList();
                        var hubList = reader.Read<HubList>().ToList();

                        reformulation.HubApprovalStatusList = hubApprovalStatus;
                        reformulation.ProjectDetailsHubRemarksList = projectDetailsHubRemark;
                        reformulation.ProductDetailsHubRemarksList = productDetailsHubRemark;
                        reformulation.FormulationProfileHubRemarksList = formulationProfileHubRemark;
                        reformulation.PackagingProfileHubRemarksList = packagingProfileHubRemark;
                        reformulation.BusinessInformationHubRemarksList = businessInformationHubRemark;
                        reformulation.HubBIList = hubList;
                        reformulation.HgmlDataHUBParticipatingMarketsList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.HgmlApproveSustainabilityHubRemarks = reader.Read<ReformulationHubReview>().ToList();
                    }
                }
                else if (status == "HUB Review" && Status == "View" && Role == "HGML Team")
                {
                    using (var reader = con.QueryMultiple("GetReformulationHubRemarks", new { ProjectId = projectId, Username = "" }, commandType: CommandType.StoredProcedure))
                    {
                        var projectDetailsHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var productDetailsHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var formulationProfileHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var packagingProfileHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var businessInformationHubRemark = reader.Read<ReformulationHubReview>().ToList();
                        var hubApprovalStatus = reader.Read<HubApprovalStatus>().ToList();
                        var hubList = reader.Read<HubList>().ToList();

                        reformulation.HubApprovalStatusList = hubApprovalStatus;
                        reformulation.ProjectDetailsHubRemarksList = projectDetailsHubRemark;
                        reformulation.ProductDetailsHubRemarksList = productDetailsHubRemark;
                        reformulation.FormulationProfileHubRemarksList = formulationProfileHubRemark;
                        reformulation.PackagingProfileHubRemarksList = packagingProfileHubRemark;
                        reformulation.BusinessInformationHubRemarksList = businessInformationHubRemark;
                        reformulation.HubBIList = hubList;
                        reformulation.HgmlDataHUBParticipatingMarketsList = reader.Read<ReformulationHubReview>().ToList();

                        reformulation.HgmlApproveSustainabilityHubRemarks = reader.Read<ReformulationHubReview>().ToList();
                    }
                }
                else
                {
                    using (var reader = con.QueryMultiple("GetReformulationHubRemarks", new { ProjectId = projectId, Username = username }, commandType: CommandType.StoredProcedure))
                    {
                        reformulation.HUBProjectDetailsRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.HUBProductDetailsRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.HUBAdditionalFormulationProfileRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.HUBPackagingProfileRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.HUBBusinessInformationRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.HUBHgmlDataRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.ReformulationHubBusinessInformation = reader.Read<ReformulationBusinessInformation>().ToList();
                        reformulation.HgmlDataHUBParticipatingMarketsList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.HubApprove = reader.Read<String>().ToList().FirstOrDefault();
                        reformulation.SustainabilityHubRemarksList = reader.Read<SpecificHubRemark>().ToList();
                        reformulation.HgmlApproveSustainabilityHubRemarks = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.ProjectDetailsHubRemarksList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.ProductDetailsHubRemarksList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.FormulationProfileHubRemarksList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.PackagingProfileHubRemarksList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.BusinessInformationHubRemarksList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.AllHUBParticipatingMarketsList = reader.Read<ReformulationHubReview>().ToList();
                        reformulation.HubApprovalStatusList = reader.Read<HubApprovalStatus>().ToList();
                        reformulation.HubBIList = reader.Read<HubList>().ToList();

                    }
                }
            }
            return (reformulation);
        }
        public Reformulation GetReformulationHubData(string projectId)
        {
            Reformulation reformulation = new Reformulation();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetHubData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    var HubBusinessInformation = reader.Read<ReformulationBusinessInformation>().ToList();
                    reformulation.ReformulationHubBusinessInformation = HubBusinessInformation;
                }
                return reformulation;
            }
        }
        public Reformulation GetReformulationPmdReviewData(string projectId)
        {
            Reformulation reformulation = new Reformulation();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetReformulationPmdReviewData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    reformulation.ProjectDetailsPmdRemarksList = reader.Read<ReformulationPmdReview>().ToList();
                    reformulation.ProductDetailsPmdRemarksList = reader.Read<ReformulationPmdReview>().ToList();
                    reformulation.FormulationProfilePmdRemarksList = reader.Read<ReformulationPmdReview>().ToList();
                    reformulation.PackagingProfilePmdRemarksList = reader.Read<ReformulationPmdReview>().ToList();
                    reformulation.BusinessInformationPmdRemarksList = reader.Read<ReformulationPmdReview>().ToList();
                    reformulation.PmdDataList = reader.Read<ReformulationPmdData>().ToList();
                    reformulation.HubApproveConfirmationList = reader.Read<reformHgmlApprove>().ToList();
                    reformulation.TargetCostDataList = reader.Read<TargetCostData>().ToList();
                    reformulation.SustainabilityPmdRemarksList = reader.Read<ReformulationPmdReview>().ToList();
                }

                return reformulation;
            }
        }
        public Tuple<string, string> UploadReformulationPmdReviewData(Reformulation reformulation)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                DynamicParameters para = new DynamicParameters();
                para.Add("ProjectId", reformulation.ProjectId);
                para.Add("ProjectType", "Reformulation");
                para.Add("Status", reformulation.StatusValue);
                para.Add("PmdProductDetailsRemarks", reformulation.PMDProductDetailsRemarks);
                para.Add("PmdProjectDetailsRemarks", reformulation.PMDProjectDetailsRemarks);
                para.Add("PmdAdditionalFormulationRemarks", reformulation.PMDAdditionalFormulationRemarks);
                para.Add("PmdBusinessInformationRemarks", reformulation.PMDBusinessInformationRemarks);
                para.Add("PmdPackagingProfileRemarks", reformulation.PMDPackagingProfileRemarks);
                para.Add("SendToHgmlRemarks", reformulation.SendToHgmlRemarks);
                para.Add("RejectRemarks", reformulation.RejectRemarks);
                para.Add("PmdData", reformulation.PmdData);
                para.Add("PmdTargetCost", reformulation.TargetCostGridData);
                para.Add("RemarksType", "PMD");
                para.Add("ApprovalStatus", reformulation.ApprovalStatus);
                para.Add("CreatedBy", reformulation.UserName);
                para.Add("ReceivedDate", reformulation.ReceivedDate);
                para.Add("ReceivedDate", reformulation.ReceivedDate);
                para.Add("SustainabilityPmdRemarks", reformulation.SustainabilityPmdRemarks);
                para.Add("SavedRemarks", reformulation.SavedPackagingRemarks);
                para.Add("DeletedRemarks", reformulation.DeletedPackagingRemarks);
                para.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                para.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);
                para.Add("PmdDueDate", reformulation.PMdDueDate);
                const string StoredProcedure = "UploadReformulationPmdReview";
                var result = con.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(para.Get<string>("@Msg"), para.Get<string>("@Msg_Class"));
            }
        }
        public Reformulation GetApprovalStages(string projectId)
        {
            Reformulation reformulation = new Reformulation();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetApprovalStatus", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    var ApprovalStages = reader.Read<ApprovalStages>().ToList();

                    reformulation.ApprovalStages = ApprovalStages;
                }
                return reformulation;
            }
        }
        public Reformulation GetHubApprovalData(string projectId)
        {
            Reformulation reformulation = new Reformulation();


            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetHgmlApproveHubData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    reformulation.ApprovalData = reader.Read<HubApprovalStatus>().ToList();
                }
                return reformulation;
            }
        }
        public IEnumerable<TotalBusinessvalue> GetTotalBusinessValue(string projectId, int ProjectType, string Year)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@projectId", projectId);
                p.Add("@ProjectType", ProjectType);
                p.Add("@Year", Year);

                var result = con.Query<TotalBusinessvalue>("Get_HUBTotalBusinessValue1", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public Reformulation GetOtherHubApprovalData(string projectId)
        {
            Reformulation reformulation = new Reformulation();


            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetHgmlApproveOtherHubData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    reformulation.ApprovalData = reader.Read<HubApprovalStatus>().ToList();
                }
                return reformulation;
            }
        }
        public IEnumerable<PMDDateandRemarks> GetPMUDateRemarks(string ProjectId)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", ProjectId);
                var result = connection.Query<PMDDateandRemarks>("GetPBPMdDateAndRemarks", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public string SavePMUDateRemarks(string PMDInfo,string Username)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("PMDInfo", PMDInfo);
                parameters.Add("UserName", Username);

                var result = connection.Query("SavePBPMdDateAndRemarks", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToString();
                return result;
            }
        }

    }
}