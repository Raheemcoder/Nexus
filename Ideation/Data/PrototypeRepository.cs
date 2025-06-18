using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.PowerBI.Api.Models;
using DocumentFormat.OpenXml.Wordprocessing;
using Grpc.Core;
using System.Collections.Generic;

namespace Ideation.Data
{
    public class PrototypeRepository : IPrototypeRepository
    {
        public ProtMaster GetProtMaster()
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                ProtMaster protMaster = new ProtMaster();
                var parameters = new DynamicParameters();

                const string storedProcedure = "GetPrototypeMasterData";
                var result = con.QueryMultiple(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                protMaster.ProjectDetailList = result.Read<ProtProjectMaster>();

                return protMaster;
            }
        }

        public PrototypeSubmissionDetail UploadPrototypeDetails(Prototype prototype, string userName, string prototypeId)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("PrototypeId", prototypeId);
                param.Add("ProjectNo", prototype.ProjectNo);
                param.Add("ProjectDescription", prototype.ProjectDescription);
                param.Add("HghCode", prototype.HghCode);
                param.Add("ProductName", prototype.ProductName);
                param.Add("DivisionName", prototype.DivisionName);
                param.Add("DosageForm", prototype.DosageForm);
                param.Add("ProvisionalClaim", prototype.ProvisionalClaim);
                param.Add("Remarks", prototype.Remarks);
                param.Add("SupportingDocument", prototype.SupportingDocument);
                param.Add("UserName", userName);
                param.Add("StatusId", prototype.StatusId);
                param.Add("PrototypeIdNew", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);
                param.Add("SubmissionNo", dbType: DbType.String, direction: ParameterDirection.Output, size: 1000);

                con.Execute("[dbo].[UploadPrototypeDetails]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                var PrototypeId = param.Get<string>("PrototypeIdNew");
                var submissionNo = param.Get<string>("SubmissionNo");

                var prototypeDetailsData = new PrototypeSubmissionDetail { PrototypeId = PrototypeId, SubmissionNo = submissionNo };

                return prototypeDetailsData;

            }
        }

        public void UploadAddPrototypData(Prototype prototype, string userName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("SubmissionNo", prototype.SubmissionNo);
                    param.Add("SubmissionDetails", prototype.SubmissionDetailsData);
                    param.Add("SelectedPmdUsersToSendPrototype", prototype.SelectedPmdUsersToSendPrototype);
                    param.Add("ConfirmationRemarks", prototype.ConfirmationRemarks);
                    param.Add("ApprovalStatus", prototype.ApprovalStatus);
                    param.Add("UserName", userName);
                    param.Add("StatusId", prototype.StatusId);
                    param.Add("ReceivedDate", prototype.ReceivedDate);

                    con.Execute("[dbo].[UploadAddPrototypeData]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        // public IEnumerable<PrototypeDetailsHeader> GetPrototypeDetailsHeaderData(string ProjectNo, string ProductName, int StatusId)
        public IEnumerable<PrototypeDetailsHeader> GetPrototypeDetailsHeaderData(string EmpID,string AppShortName)
        {
            Prototype prototype = new Prototype();
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@ProjectNo", "All");
                p.Add("@ProductName", "All");
                p.Add("@StatusId", 0);
                p.Add("@UserName", EmpID);
                p.Add("@AppShortName", AppShortName);

                //var result = reader.Read<PrototypeDetailsHeader>().ToList();
                var result = con.Query<PrototypeDetailsHeader>("GetPrototypeDetailsHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public IEnumerable<PrototypeDetailsHeader> GetPrototypeDetailsHeaderData(string ProjectNo, string ProductName, int StatusId, string EmpID,string AppShortName)
        {
            Prototype prototype = new Prototype();
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@ProjectNo", ProjectNo);
                p.Add("@ProductName", ProductName);
                p.Add("@StatusId", StatusId);
                p.Add("@UserName", EmpID);
                p.Add("@AppShortName", AppShortName);
                var result = con.Query<PrototypeDetailsHeader>("GetPrototypeDetailsHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public Prototype GetPrototypeData(string prototypeId, string statusId)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeData", new { PrototypeId = prototypeId, StatusId = statusId }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PrototypeDetailsList = reader.Read<PrototypeDetailsHeader>().ToList();
                    prototype.PrototypeSubmissionDetailsList = reader.Read<PrototypeSubmissionDetail>().ToList();
                }

                return prototype;
            }
        }

        public IEnumerable<ProjectNumberList> GetProjectNumber()
        {
            Prototype prototype = new Prototype();
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                var result = con.Query<ProjectNumberList>("GetPrototypeProjectNumberList", commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public IEnumerable<ProductNameList> GetProjectNames()
        {
            Prototype prototype = new Prototype();
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                var result = con.Query<ProductNameList>("GetPrototypeProductNameList", commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public IEnumerable<StatusList> GetStatusNames()
        {
            Prototype prototype = new Prototype();
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                var result = con.Query<StatusList>("GetPrototypeStatusList", commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public Prototype GetPmdUser(string prototypeId, string AppShortName)
        {
            Prototype prototype = new Prototype();
            
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypePmdUser", new { PrototypeId = prototypeId , AppShortName = AppShortName }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PmdUserList = reader.Read<PrototypePmdUserList>().ToList();

                }

                return prototype;
            }
        }

        public Prototype GetSupportingDocumentDetail(string prototypeId)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeSupportingDocumentDetail", new { PrototypeId = prototypeId }, commandType: CommandType.StoredProcedure))
                {
                    prototype.SupportingDocumentDetailList = reader.Read<PrototypeDetailsHeader>().ToList();

                }

                return prototype;
            }
        }
        public Prototype GetPrototypeHistoryDetail(string prototypeId, string flag)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeHistory", new { PrototypeId = prototypeId, Flag = flag }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PrototypeApprovalHistory = reader.Read<PrototypeHistoryDetails>().ToList();
                    prototype.statusNamesList = reader.Read<StatusNameList>().ToList();

                }

                return prototype;
            }
        }

        public (List<HubDetail> hubUserDetail, List<HubDetail> hubDetailTableData, List<HubDetail> batchNoDetail) GetHubDetails(string PrototypeId, string BatchNo,string AppShortName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeHubDetail", new { PrototypeId = PrototypeId, BatchNo = BatchNo, AppShortName= AppShortName }, commandType: CommandType.StoredProcedure))
                {
                    var hubUserDetail = reader.Read<HubDetail>().ToList();
                    var hubDetailTableData = reader.Read<HubDetail>().ToList();
                    var batchNoDetail = reader.Read<HubDetail>().ToList();

                    return (hubUserDetail, hubDetailTableData, batchNoDetail);
                }
            }
        }

        public IEnumerable<PrototypeSubmissionDetail> UploadPrototypeHubDetailsInPmdReview<PrototypeSubmissionDetail>(string hubDetailsData, string prototypeId, string userName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();

                    param.Add("PrototypeId", prototypeId);
                    param.Add("HubDetailsData", hubDetailsData);
                    param.Add("UserName", userName);

                    var result = con.Query<PrototypeSubmissionDetail>("[dbo].[UploadPrototypeHubDetailsDataInPmdReview]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Prototype UploadPrototypePmdReviewData(Prototype prototype, string userName)
        {
            Prototype prototypeData = new Prototype();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("PrototypeId", prototype.PrototypeId);
                    param.Add("SupportingDocument", prototype.SupportingDocument);
                    param.Add("ConfirmationRemarks", prototype.ConfirmationRemarks);
                    param.Add("ApprovalStatus", prototype.ApprovalStatus);
                    param.Add("UserName", userName);
                    param.Add("StatusId", prototype.StatusId);
                    param.Add("ReceivedDate", prototype.ReceivedDate);

                    param.Add("OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);

                    con.Execute("[dbo].[UploadPrototypePmdReviewData]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    prototypeData.OutMessage = param.Get<string>("@OutMessage");
                    prototypeData.StyleClass = param.Get<string>("@StyleClass");

                    return prototypeData;
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public PrototypeReport GetPrototypeReportData(string PrototypeId)
        {
            PrototypeReport protoreport = new PrototypeReport();
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@PrototypeId", PrototypeId);
                const string storedProcedure = "GetDataforPrototypePDF";

                using (var reader = con.QueryMultiple(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure))
                {
                    protoreport.headerdata = reader.Read<Headerdata>().ToList();
                    protoreport.stage2data = reader.Read<Stage2Data>().ToList();
                    protoreport.stage3data = reader.Read<Stage3Data>().ToList();
                    protoreport.stage5data = reader.Read<Stage5Data>().ToList();
                    protoreport.stagehubdata = reader.Read<stageHubdata>().ToList();
                    protoreport.hubstatuslist = reader.Read<HubstatuList>().ToList();
                }
                return protoreport;

            }
        }

        public IEnumerable<HubStatusinform> GetHubStatusInfo(string PrototypeId)

        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@PrototypeId", PrototypeId);
                const string storedProcedure = "GetPrototypeHubStatusInfo";
                var result = con.Query<HubStatusinform>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public Prototype GetPrototypeHubReviewData(string prototypeId, string userName)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeHubReviewData", new { PrototypeId = prototypeId, UserName = userName }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PrototypeHubReviewData = reader.Read<HubDetail>().ToList();
                }

                return prototype;
            }
        }

        public Prototype UploadPrototypeHubReviewData(Prototype prototype, string userName)
        {
            Prototype prototypeData = new Prototype();

            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("PrototypeId", prototype.PrototypeId);
                    param.Add("SupportingDocument", prototype.SupportingDocument);
                    param.Add("HubReviewSubmissionDetailsData", prototype.SubmissionDetailsData);
                    param.Add("ConfirmationRemarks", prototype.ConfirmationRemarks);
                    param.Add("ApprovalStatus", prototype.ApprovalStatus);
                    param.Add("UserName", userName);
                    param.Add("StatusId", prototype.StatusId);
                    param.Add("ReceivedDate", prototype.ReceivedDate);

                    param.Add("OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);

                    con.Execute("[dbo].[UploadPrototypeHubReviewData]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    prototypeData.OutMessage = param.Get<string>("@OutMessage");
                    prototypeData.StyleClass = param.Get<string>("@StyleClass");

                    return prototypeData;
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public IEnumerable<HubDetail> GetPrototypeHubStatusDetails(string prototypeId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeHubStatusDetails", new { PrototypeId = prototypeId }, commandType: CommandType.StoredProcedure))
                {
                    var hubStatusDetail = reader.Read<HubDetail>().ToList();

                    return hubStatusDetail;
                }
            }
        }

        public Prototype GetPrototypeHgmlReviewData(string prototypeId, string userName)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeHgmlReviewData", new { PrototypeId = prototypeId }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PrototypeHgmlReviewData = reader.Read<PrototypeSubmissionDetail>().ToList();
                }

                return prototype;
            }
        }


        public Prototype UploadPrototypeHgmlReviewData(Prototype prototype, string userName)
        {
            Prototype prototypeData = new Prototype();

            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("PrototypeId", prototype.PrototypeId);
                    param.Add("SupportingDocument", prototype.SupportingDocument);
                    param.Add("HgmlReviewSubmissionDetailsData", prototype.SubmissionDetailsData);
                    param.Add("ConfirmationRemarks", prototype.ConfirmationRemarks);
                    param.Add("ApprovalStatus", prototype.ApprovalStatus);
                    param.Add("UserName", userName);
                    param.Add("StatusId", prototype.StatusId);
                    param.Add("ReceivedDate", prototype.ReceivedDate);

                    param.Add("OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);

                    con.Execute("[dbo].[UploadPrototypeHgmlReviewData]", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                    prototypeData.OutMessage = param.Get<string>("@OutMessage");
                    prototypeData.StyleClass = param.Get<string>("@StyleClass");

                    return prototypeData;
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public Prototype GetPrototypeApprovedData(string prototypeId)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeApprovedData", new { PrototypeId = prototypeId }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PrototypeSubmissionDetailsList = reader.Read<PrototypeSubmissionDetail>().ToList();
                }

                return prototype;
            }
        }

        public Prototype GetPrototypeReworkData(string prototypeId)
        {
            Prototype prototype = new Prototype();

            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                using (var reader = con.QueryMultiple("GetPrototypeReworkData", new { PrototypeId = prototypeId }, commandType: CommandType.StoredProcedure))
                {
                    prototype.PrototypeSubmissionDetailsList = reader.Read<PrototypeSubmissionDetail>().ToList();
                }

                return prototype;
            }

        }

        public void DeletePrototypeData(string prototypeId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("PrototypeId", prototypeId);
                con.Execute("DeletePrototypeRecord", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

            }
        }

        public string DeleteSupportingDocument(string fileName, string prototypeId, string statusId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("PrototypeId", prototypeId);
                param.Add("FromStatusId", statusId);
                param.Add("FileName", fileName);

                param.Add("IsDocumentPresent", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);

                con.Execute("DeletePrototypeSupportingDocument", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                var IsDocumentPresent = param.Get<string>("IsDocumentPresent");

                return IsDocumentPresent;
            }
        }

        public int InsertDownloadedFileInfo(string data)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("FileInfo", data);
                var result=con.Execute("InsertPrototypeCompositionHistory", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                return result;

            }
        }

        public IEnumerable<CompositionHistory> GetCompositionHistory(string PrototypeId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@PrototypeId", PrototypeId);
                const string storedProcedure = "GetPrototypeCompositionHistory";
                var result = con.Query<CompositionHistory>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

    }
}
