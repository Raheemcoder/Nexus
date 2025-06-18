using Dapper;
using Ideation.Core;
using System.Data.SqlClient;
using System.Data;
using Ideation.Models;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.SignalR;
using System.Drawing;
using Ideation;
using Microsoft.AspNetCore.Mvc;
using Grpc.Core;
//using DocumentFormat.OpenXml.Office2016.Drawing.Command;

namespace Ideation.Data
{
    public class NpdRepository : INpdRepository
    {
        public void LogError(string controller, string action, Exception ex)
        {

            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType); logger.Error(new { Controller = controller, Action = action, Exception = ex });

        }
        /// <summary>
        /// To upload the data from the NPD page to DataBase on click of submit/save in NPD page
        /// </summary>
        public string UploadNpdData(NPD npd)
        {
            string controllerName = "ProjectBrief";
            string actionName = "NewProduction";
            string message = "";
            LogError(controllerName, actionName, new Exception("Request to save EditProduction form is initiated in NPD Repository"));

            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("UserName", npd.UserName);
                    parameters.Add("NpdHeaderTableData", npd.NpdHeaderTableData);
                    parameters.Add("ProjectDetailsData", npd.ProjectDetailsData);
                    parameters.Add("ProductPositioningData", npd.ProductPositionigData);
                    parameters.Add("FormulationProfileData", npd.FormulationProfileData);
                    parameters.Add("PackagingProfileData", npd.PackagingProfileData);
                    parameters.Add("BusinessInformationData", npd.BusinessInformationData);
                    parameters.Add("SustainabilityData", npd.SustainabilityData);
                    parameters.Add("ApprovalStatus", npd.ApprovalStatus);
                    parameters.Add("ProjectType", "NPD");
                    parameters.Add("SupportingDocumentData", npd.SupportingDocumentData);
                    parameters.Add("@ProjectId_Out", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);


                    const string storedProcedure = "UploadNpdData";
                    var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
                    message = parameters.Get<string>("@ProjectId_Out");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return message;
        }
        /// <summary>
        /// To update the data from the NPD-Draft page to DataBase on click of submit/save in NPD-Draft page
        /// </summary>
        public void UpdateNpdData(NPD npd)
        {
            string controllerName = "NewInitiation";
            string actionName = "EditProduction";
            LogError(controllerName, actionName, new Exception("Request to save EditProduction form is initiated  in NPD Repository"));

            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("UserName", npd.UserName);
                    parameters.Add("ProjectId", npd.ProjectId);
                    parameters.Add("NpdHeaderTableData", npd.NpdHeaderTableData);
                    parameters.Add("ProjectDetailsData", npd.ProjectDetailsData);
                    //parameters.Add("ProductPositioningData", npd.ProductPositionigData);
                    parameters.Add("ProductPositioningData", npd.ProductPositionigData);
                    parameters.Add("FormulationProfileData", npd.FormulationProfileData);
                    parameters.Add("PackagingProfileData", npd.PackagingProfileData);
                    parameters.Add("BusinessInformationData", npd.BusinessInformationData);
                    parameters.Add("ApprovalStatus", npd.ApprovalStatus);
                    parameters.Add("ProjectType", "NPD");
                    parameters.Add("Status", npd.Status);
                    parameters.Add("ReceivedDate", npd.ReceivedDate);
                    parameters.Add("SustainabilityData", npd.SustainabilityData);
                    parameters.Add("SendBackToInitiatorRemarks", npd.SendBackToInitiatorRemarks);
                    parameters.Add("SupportingDocumentData", npd.SupportingDocumentData);
                    parameters.Add("DeletedSupportingdocument", npd.DeletedSupportingdocument);

                    const string storedProcedure = "UpdateNpdData";
                    var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        /// <summary>
        /// To get the data from the project list when the user login to the application and after submitting or saving the data in the application
        /// </summary>
        public IEnumerable<ProjectBrief> GetProjectList(string Year, string Hub, string Division, string ProjectType, string Status, string userName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();

                parameter.Add("@Year", Year);
                parameter.Add("@Hub", Hub);
                parameter.Add("@Division", Division);
                parameter.Add("@ProjectTypeName", ProjectType);
                parameter.Add("@Status", Status);
                parameter.Add("@userName", userName);

                const string storedProcedure = "ProjectBriefDisplay";
                var result = con.Query<ProjectBrief>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// To get the data from DataBase to the NPD-Pending with HGML page on click of edit button when the staus of the project is pending with HGML
        /// </summary>

        public NPD GetNpdData(string projectId)
        {
            NPD npd = new NPD();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetNpdData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    npd.StatusNameDb = reader.Read<NpdHeaderTableData>().ToList();
                    npd.NpdHeaderTable = reader.Read<NpdHeaderTableData>().ToList();
                    npd.ProjectDetails = reader.Read<NpdProjectDetails>().ToList();
                    npd.ProductPositioning = reader.Read<NpdProductPositioning>().ToList();
                    //npd.ProductPositioning = System.Net.WebUtility.HtmlDecode(productPositioning);
                    npd.FormulationProfile = reader.Read<NpdFormulationProfile>().ToList();
                    npd.PackagingProfile = reader.Read<NpdPackagingProfile>().ToList();
                    npd.BusinessInformation = reader.Read<NpdBusinessInformation>().ToList();
                    npd.ApprovalStatusData = reader.Read<ApprovalStages>().ToList();
                    npd.Sustainability = reader.Read<NpdSustainability>().ToList();
                    npd.SupportingDocData = reader.Read<SupportingDocument>().ToList();
                }

                return npd;
            }
        }
        public IEnumerable<PdfData> GetPdfData(string ProjectId, string Type, int Key)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProjectId", ProjectId);
                parameter.Add("@ProjectType", Type);
                parameter.Add("@Key", @Key);

                const string storedProcedure = "GetDataforPDF";
                var result = con.Query<PdfData>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                return result;
            }
        }
        public IEnumerable<NpdHgmlReview> GetUserEmailBasedOnHub(string hubIds)
        {
            NPD npd = new NPD();

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("hubIds", hubIds);

                const string storedProcedure = "GetUserEmailBasedOnHub";

                var result = connection.Query<NpdHgmlReview>(storedProcedure, parameter, commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public NPD UploadNpdHgmlReviewData(NPD npd)
        {
            NPD npdData = new NPD();

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", npd.UserName);
                parameters.Add("ProjectId", npd.ProjectId);
                parameters.Add("ProjectType", "NPD");
                parameters.Add("Status", npd.Status);
                parameters.Add("ProjectDetailsHGMLRemarks", npd.ProjectDetailsHGMLRemarks);
                parameters.Add("ProductPositioningHGMLRemarks", npd.ProductPositioningHGMLRemarks);
                parameters.Add("FormulationProfileHGMLRemarks", npd.FormulationProfileHGMLRemarks);
                parameters.Add("PackagingProfileHGMLRemarks", npd.PackagingProfileHGMLRemarks);
                parameters.Add("BusinessInformationHGMLRemarks", npd.BusinessInformationHGMLRemarks);

                parameters.Add("SustainabilityHGMLRemarks", npd.SustainabilityHGMLRemarks);

                parameters.Add("IsSentToHub", npd.HgmlDataSendToHubConfirmation);
                parameters.Add("SendToHubRemarks", npd.SendToHubRemarks);
                parameters.Add("SendToPmdRemarks", npd.SendToPmdRemarks);
                parameters.Add("SendBackToInitiatorRemarks", npd.SendBackToInitiatorRemarks);
                parameters.Add("RejectRemarks", npd.RejectRemarks);
                parameters.Add("HgmlData", npd.HgmlData);
                parameters.Add("RemarksFromStage", "HGML Review");
                parameters.Add("ApprovalStatus", npd.ApprovalStatus);
                parameters.Add("ReceivedDate", npd.ReceivedDate);
                parameters.Add("SavedRemarks", npd.SavedRemarks);
                parameters.Add("DeletedRemarks", npd.DeletedRemarks);

                parameters.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);

                var result = connection.Query("UploadNpdHgmlReviewData", parameters, commandType: CommandType.StoredProcedure);

                npdData.OutMessage = parameters.Get<string>("@OutMessage");
                npdData.StyleClass = parameters.Get<string>("@StyleClass");

                return npdData;

                //const string storedProcedure = "UploadNpdHgmlReviewData";

                //var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
            }
        }


        public NPD GetHgmlReviewData(string projectId)
        {
            NPD npd = new NPD();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetNpdHgmlReviewData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    var projectDetailsHgmlRemark = reader.Read<NpdHgmlReview>().ToList();
                    var productPositioningHgmlRemark = reader.Read<NpdHgmlReview>().ToList();
                    var formulationProfileHgmlRemark = reader.Read<NpdHgmlReview>().ToList();
                    var packagingProfileHgmlRemark = reader.Read<NpdHgmlReview>().ToList();
                    var businessInformationHgmlRemark = reader.Read<NpdHgmlReview>().ToList();
                    var sustainabilityHgmlRemark = reader.Read<NpdHgmlReview>().ToList();

                    npd.HgmlDataList = reader.Read<NpdHgmlReview>().ToList();
                    npd.HgmlDataHubAndHubUserList = reader.Read<NpdHgmlReview>().ToList();

                    npd.ProjectDetailsHGMLRemarksList = projectDetailsHgmlRemark;
                    npd.ProductPositioningHGMLRemarksList = productPositioningHgmlRemark;
                    npd.FormulationProfileHGMLRemarksList = formulationProfileHgmlRemark;
                    npd.PackagingProfileHGMLRemarksList = packagingProfileHgmlRemark;
                    npd.BusinessInformationHGMLRemarksList = businessInformationHgmlRemark;
                    npd.SustainabilityHGMLRemarksList = sustainabilityHgmlRemark;

                }

                return npd;
            }
        }

        public void UploadNpdHubReviewData(NPD npd)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", npd.UserName);
                parameters.Add("ProjectId", npd.ProjectId);
                parameters.Add("ProjectType", "NPD");
                parameters.Add("RemarksFromStage", "HUB Review");
                parameters.Add("Status", npd.Status);
                parameters.Add("ProjectDetailsHubRemarks", npd.ProjectDetailsHubRemarks);
                parameters.Add("ProductPositioningHubRemarks", npd.ProductPositioningHubRemarks);
                parameters.Add("FormulationProfileHubRemarks", npd.FormulationProfileHubRemarks);
                parameters.Add("PackagingProfileHubRemarks", npd.PackagingProfileHubRemarks);
                parameters.Add("BusinessInformationHubRemarks", npd.BusinessInformationHubRemarks);

                parameters.Add("SustainabilityHubRemarks", npd.SustainabilityHubRemarks);

                parameters.Add("BusinessInformationData", npd.BusinessInformationData);
                parameters.Add("HgmlOrHubDataHubRemarks", npd.HgmlOrHubDataHubRemarks);
                parameters.Add("SendToHgmlRemarks", npd.SendToHgmlRemarks);
                parameters.Add("HgmlDataHubParticipatingMarkets", npd.HgmlDataHubParticipatingMarkets);
                parameters.Add("ApprovalStatus", npd.ApprovalStatus);
                parameters.Add("IsHubApproved", npd.HubApproveConfirmation);
                parameters.Add("ReceivedDate", npd.ReceivedDate);

                parameters.Add("SavedRemarks", npd.SavedRemarks);
                parameters.Add("DeletedRemarks", npd.DeletedRemarks);

                parameters.Add("SupportingDocumentData", npd.SupportingDocumentData);
                parameters.Add("DeletedSupportingdocument", npd.DeletedSupportingdocument);

                const string storedProcedure = "UploadNpdHubReviewData";

                var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
            }
        }
        public NPD GetNpdHubReviewData(string projectId, string userName)
        {
            NPD npd = new NPD();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetNpdHubReviewData", new { ProjectId = projectId, Username = userName }, commandType: CommandType.StoredProcedure))
                {
                    npd.HubApproveConfirmationList = reader.Read<NpdHgmlApprove>().ToList();
                    npd.ProjectDetailsHubRemarksList = reader.Read<NpdHubReview>().ToList();
                    npd.ProductPositioningHubRemarksList = reader.Read<NpdHubReview>().ToList();
                    npd.FormulationProfileHubRemarksList = reader.Read<NpdHubReview>().ToList();
                    npd.PackagingProfileHubRemarksList = reader.Read<NpdHubReview>().ToList();
                    npd.BusinessInformationHubRemarksList = reader.Read<NpdHubReview>().ToList();

                    npd.SustainabilityHubRemarksList = reader.Read<NpdHubReview>().ToList();

                    npd.HgmlOrHubDataHubRemarksList = reader.Read<NpdHubReview>().ToList();
                    npd.BusinessInformation = reader.Read<NpdBusinessInformation>().ToList();
                    npd.HgmlDataHubParticipatingMarketsList = reader.Read<NpdHubReview>().ToList();
                }

                return npd;
            }
        }
        public NPD GetNpdHgmlApproveData(string projectId)
        {
            NPD npd = new NPD();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                //DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("ProjectId", projectId);
                //parameters.Add("Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 10000000);

                using (var reader = con.QueryMultiple("GetNpdHgmlApproveData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    npd.HgmlApproveProjectDetailsHubRemarks = reader.Read<NpdHgmlReview>().ToList();
                    npd.HgmlApproveProductPositioningHubRemarks = reader.Read<NpdHgmlReview>().ToList();
                    npd.HgmlApproveFormulationProfileHubRemarks = reader.Read<NpdHgmlReview>().ToList();
                    npd.HgmlApprovePackagingProfileHubRemarks = reader.Read<NpdHgmlReview>().ToList();
                    npd.HgmlApproveBusinessInformationHubRemarks = reader.Read<NpdHgmlReview>().ToList();
                    npd.HgmlApproveSustainabilityHubRemarks = reader.Read<NpdHgmlReview>().ToList();

                    npd.HgmlApproveBusinessInformationData = reader.Read<NpdBusinessInformation>().ToList();

                    npd.ProjectDetailsHGMLRemarksList = reader.Read<NpdHgmlReview>().ToList();
                    npd.ProductPositioningHGMLRemarksList = reader.Read<NpdHgmlReview>().ToList();
                    npd.FormulationProfileHGMLRemarksList = reader.Read<NpdHgmlReview>().ToList();
                    npd.PackagingProfileHGMLRemarksList = reader.Read<NpdHgmlReview>().ToList();
                    npd.BusinessInformationHGMLRemarksList = reader.Read<NpdHgmlReview>().ToList();
                    npd.SustainabilityHGMLRemarksList = reader.Read<NpdHgmlReview>().ToList();

                    npd.HgmlDataList = reader.Read<NpdHgmlReview>().ToList();

                    npd.HubApprovalData = reader.Read<NpdHgmlApprove>().ToList();

                    npd.HgmlDataHubParticipatingMarketsList = reader.Read<NpdHubReview>().ToList();

                }

                return npd;
            }
        }
        public NPD UploadNpdHgmlApproveData(NPD npd)
        {
            NPD npdData = new NPD();

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", npd.UserName);
                parameters.Add("ProjectId", npd.ProjectId);
                parameters.Add("ProjectType", "NPD");
                parameters.Add("Status", npd.Status);
                parameters.Add("ProjectDetailsHGMLRemarks", npd.ProjectDetailsHGMLRemarks);
                parameters.Add("ProductPositioningHGMLRemarks", npd.ProductPositioningHGMLRemarks);
                parameters.Add("FormulationProfileHGMLRemarks", npd.FormulationProfileHGMLRemarks);
                parameters.Add("PackagingProfileHGMLRemarks", npd.PackagingProfileHGMLRemarks);
                parameters.Add("BusinessInformationHGMLRemarks", npd.BusinessInformationHGMLRemarks);

                parameters.Add("SustainabilityHGMLRemarks", npd.SustainabilityHGMLRemarks);

                parameters.Add("HgmlData", npd.HgmlData);
                parameters.Add("HgmlApproveSendBackHubRemarksData", npd.HgmlApproveSendBackHubRemarksData);
                parameters.Add("FromStage", "HGML Approve");
                parameters.Add("SendToPmdRemarks", npd.SendToPmdRemarks);
                parameters.Add("RejectRemarks", npd.RejectRemarks);
                parameters.Add("ApprovalStatus", npd.ApprovalStatus);
                parameters.Add("ReceivedDate", npd.ReceivedDate);
                parameters.Add("SavedRemarks", npd.SavedRemarks);
                parameters.Add("DeletedRemarks", npd.DeletedRemarks);


                //const string storedProcedure = "UploadNpdHgmlApproveData";

                //var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);

                parameters.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);

                var result = connection.Query("UploadNpdHgmlApproveData", parameters, commandType: CommandType.StoredProcedure);

                npdData.OutMessage = parameters.Get<string>("@OutMessage");
                npdData.StyleClass = parameters.Get<string>("@StyleClass");

                return npdData;
            }
        }

        public void SaveNpdPopupHubBusinessInformation(string projectId, string UserName, string businessInformationData)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", projectId);
                parameters.Add("UserName", UserName);
                parameters.Add("HubBusinessInformationData", businessInformationData);

                const string storedProcedure = "UpdateHubBusinessInformationData";

                var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
            }
        }


        public IEnumerable<User> GetUserEmailBasedOnHubUser(string hubUser)
        {

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("hubUsers", hubUser);

                const string storedProcedure = "GetUserEmailBasedOnHubUser";

                var result = connection.Query<User>(storedProcedure, parameter, commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public IEnumerable<HubStatusinfo> GetHubStatusInfo(string projectId)

        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@projectId", projectId);
                const string storedProcedure = "GetHubStatusInfo";
                var result = con.Query<HubStatusinfo>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public NPD UploadNpdPmdReviewData(NPD npd)
        {
            NPD npdData = new NPD();

            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserName", npd.UserName);
                parameters.Add("ProjectId", npd.ProjectId);
                parameters.Add("ProjectType", "NPD");
                parameters.Add("Status", npd.Status);
                parameters.Add("ProjectDetailsPmdRemarks", npd.ProjectDetailsPmdRemarks);
                parameters.Add("ProductPositioningPmdRemarks", npd.ProductPositioningPmdRemarks);
                parameters.Add("FormulationProfilePmdRemarks", npd.FormulationProfilePmdRemarks);
                parameters.Add("PackagingProfilePmdRemarks", npd.PackagingProfilePmdRemarks);
                parameters.Add("BusinessInformationPmdRemarks", npd.BusinessInformationPmdRemarks);
                parameters.Add("SustainabilityPmdRemarks", npd.SustainabilityPmdRemarks);
                parameters.Add("PmdData", npd.PmdData);
                parameters.Add("TargetCostData", npd.TargetCostData);
                parameters.Add("ConfirmationRemarks", npd.ConfirmationRemarks);
                parameters.Add("RemarksFromStage", "PMD Review");
                parameters.Add("ApprovalStatus", npd.ApprovalStatus);
                parameters.Add("ReceivedDate", npd.ReceivedDate);
                parameters.Add("SavedRemarks", npd.SavedRemarks);
                parameters.Add("DeletedRemarks", npd.DeletedRemarks);
                parameters.Add("RejectRemarks", npd.RejectRemarks);
                //const string storedProcedure = "UploadNpdPmdReviewData";

                //var result = connection.Query(storedProcedure, parameters, commandType: CommandType.StoredProcedure);

                parameters.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                parameters.Add("PmdDueDate", npd.PMdDueDate);

                var result = connection.Query("UploadNpdPmdReviewData", parameters, commandType: CommandType.StoredProcedure);

                npdData.OutMessage = parameters.Get<string>("@OutMessage");
                npdData.StyleClass = parameters.Get<string>("@StyleClass");

                return npdData;
            }
        }

        public NPD GetNpdPmdReviewData(string projectId)
        {
            NPD npd = new NPD();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetNpdPmdReviewData", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    npd.ProjectDetailsPmdRemarksList = reader.Read<NpdPmdReview>().ToList();
                    npd.ProductPositioningPmdRemarksList = reader.Read<NpdPmdReview>().ToList();
                    npd.FormulationProfilePmdRemarksList = reader.Read<NpdPmdReview>().ToList();
                    npd.PackagingProfilePmdRemarksList = reader.Read<NpdPmdReview>().ToList();
                    npd.BusinessInformationPmdRemarksList = reader.Read<NpdPmdReview>().ToList();
                    npd.SustainabilityPmdRemarksList = reader.Read<NpdPmdReview>().ToList();
                    npd.PmdDataList = reader.Read<NpdPmdReview>().ToList();
                    npd.PmdReviewUserEmailAndHubListForMailSending = reader.Read<NpdHgmlApprove>().ToList();
                    npd.TargetCostDataList = reader.Read<NpdTargetCost>().ToList();
                }

                return npd;
            }
        }

        public NPD GetHubNameAndHubUserEmailForHgmlApprove(string projectId)
        {
            NPD npd = new NPD();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetHubNameAndHubUserEmailForHgmlApprove", new { ProjectId = projectId }, commandType: CommandType.StoredProcedure))
                {
                    npd.HgmlApproveHubNameList = reader.Read<NpdHgmlApprove>().ToList();
                    npd.HgmlApproveHubUserList = reader.Read<NpdHgmlApprove>().ToList();
                }
                return npd;
            }
        }

        public IEnumerable<ProjectBrief> GetProjectDetailsForSendMail(string projectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@projectId", projectId);


                    const string storedProcedure = "GetProjectDetailsForSendMail";
                    var result = con.Query<ProjectBrief>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public IEnumerable<ProjectBrief> GetProductNamesInProjectBrief(string projectId, string projectType)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@ProjectId", projectId);
                    parameter.Add("@ProjectType", projectType);


                    const string storedProcedure = "GetProductNamesInProjectBrief";
                    var result = con.Query<ProjectBrief>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public void savesendmailuserdata(string toMailids, string ProjectId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@toMailids", toMailids);
                    parameter.Add("@ProjectId", ProjectId);
                    //parameter.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                    const string storedProcedure = "savesendmailuserdata";
                    var result = con.Query<ProjectBrief>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    //return parameter.Get<int>("Result");
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public IEnumerable<NPDFieldRemarks> GetFieldRemarks(string projectId, string productName, string sku, string fieldId, string type)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectId", projectId);
                parameters.Add("FieldId", fieldId);
                parameters.Add("ProductName", productName);
                parameters.Add("SKU", sku);
                parameters.Add("Type", type);
                var result = connection.Query<NPDFieldRemarks>("Get_PB_FieldRemarks", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            };
        }

    }
}

