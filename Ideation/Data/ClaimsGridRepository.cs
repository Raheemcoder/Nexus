using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using Microsoft.CodeAnalysis;
using System.Drawing;
using Microsoft.Build.Evaluation;
using NonFactors.Mvc.Grid;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;

namespace Ideation.Data
{
    public class ClaimsGridRepository : IClaimsGridRepository
    {
        public IEnumerable<ProjectList> GetProjectList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "Get_ClaimsGrid_ProjectList";
                    var result = con.Query<ProjectList>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public ClaimsUserDetails GetClaimsGridProjectsBasedOnUser(string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                using (var reader = con.QueryMultiple("Get_ClaimsGridData_BasedOnUser", new { UserId = UserId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        ClaimsUserDetails claimsUserDetails = new ClaimsUserDetails();
                        claimsUserDetails = reader.Read<ClaimsUserDetails>().FirstOrDefault();
                        claimsUserDetails.ClaimsGridList = reader.Read<ClaimsGridListView>();
                        return claimsUserDetails;
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public IEnumerable<CFTApprovalStatus> GetClaimsGridCFTApprovalStatus(string ProjectNo, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "Get_CFTApprovalStatus";
                    var result = con.Query<CFTApprovalStatus>(storedProcedure, new { ProjectNo = ProjectNo, GridId = GridId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<CFTRemarksList> GetCFTRemarksBasedOnDept(string ProjectNo, string DeptName, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "Get_CFTRemarksBasedOnDept";
                    var result = con.Query<CFTRemarksList>(storedProcedure, new { ProjectNo = ProjectNo, DeptName = DeptName, GridId = GridId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }


        public IEnumerable<ClaimsHub> GetHubList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "Get_ClaimsGrid_HubList";
                    var result = con.Query<ClaimsHub>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<DeptUsers> GetUserEmailBasedOnDept(string User, string DeptIds)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "Get_UsersBasedOnDept";
                    var result = con.Query<DeptUsers>(storedProcedure, new { UserId = User, DeptIds = DeptIds }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }



        public Tuple<string, string> AddClaimsData(ClaimsGridDocument obj)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ClaimsHeaders", obj.ClaimsHeaders);
                    para.Add("ProductDescription", obj.ProductDescription);
                    para.Add("ProjectDetails", obj.ProjectDetails);
                    para.Add("ProjectBrief", obj.ProjectBrief);
                    para.Add("OnPackClaims", obj.OnPackClaims);
                    para.Add("CommunicationClaims", obj.CommunicationClaimsData);
                    //para.Add("SupportingDoc", obj.SupportingDoc);
                    para.Add("SupportingDoc", obj.SupportingDocumentData);
                    para.Add("InitiatedBy", obj.InitiatedBy);
                    para.Add("ApprovalStatus", obj.ApprovalStatus);
                    para.Add("DeptDetails", obj.DeptDetails);
                    para.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    para.Add("@ClaimsId_Out", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                    const string StoredProcedure = "Add_Claims_Data";
                    var result = con.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return System.Tuple.Create(para.Get<string>("@Output"), para.Get<string>("@ClaimsId_Out"));
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public string DeleteClaimsRecord(string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("GridId", GridId);
                    para.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                    const string StoredProcedure = "Delete_Claims_Data";
                    var result = con.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return para.Get<string>("Output");
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string UpdateClaimsData(ClaimsGridDocument obj)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("GridId", obj.GridId);
                    para.Add("ClaimsHeaders", obj.ClaimsHeaders);
                    para.Add("ProductDescription", obj.ProductDescription);
                    para.Add("ProjectDetails", obj.ProjectDetails);
                    para.Add("ProjectBrief", obj.ProjectBrief);
                    para.Add("OnPackClaims", obj.OnPackClaims);
                    para.Add("CommunicationClaims", obj.CommunicationClaimsData);
                    //para.Add("SupportingDoc", obj.SupportingDoc);
                    para.Add("InitiatedBy", obj.InitiatedBy);
                    para.Add("ApprovalStatus", obj.ApprovalStatus);
                    para.Add("DeptDetails", obj.DeptDetails);
                    para.Add("SupportingDocumentData", obj.SupportingDocumentData);
                    para.Add("DeletedSupportingdocument", obj.DeletedSupportingdocument);
                    para.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                    const string StoredProcedure = "Update_Claims_Data";
                    var result = con.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return para.Get<string>("Output");


                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string AddUpdateCFTReview(ClaimsGridDocument obj)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ClaimsHeaders", obj.ClaimsHeaders);
                    //para.Add("OnPackClaims", obj.OnPackClaims);
                    //para.Add("CommunicationClaims", obj.CommunicationClaimsData);
                    // para.Add("SupportingDoc", obj.SupportingDoc);
                    para.Add("InitiatedBy", obj.InitiatedBy);
                    para.Add("ApprovalStatus", obj.ApprovalStatus);
                    para.Add("OnPackClaimsRemarks", obj.OnPackClaimsRemarks);
                    para.Add("CommunicationClaimsRemarks", obj.CommunicationClaimsRemarks);
                    para.Add("@GridId", obj.GridId);
                    para.Add("SupportingDocumentData", obj.SupportingDocumentData);
                    para.Add("DeletedSupportingdocument", obj.DeletedSupportingdocument);
                    para.Add("DeletedCFTUploadedDocument", obj.DeletedCFTUploadedDocument);
                    para.Add("@IRAExcelDocument", obj.IRAExcelDocument);
                    para.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                    const string StoredProcedure = "AddUpdate_ClaimsCFTReview";
                    var result = con.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return para.Get<string>("Output");
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }


        public ClaimsGridDocument GetCFTReviewData(string ProjectNo, string UserId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                using (var reader = con.QueryMultiple("Get_Claims_CFTReview_Data", new { ProjectNumber = ProjectNo, UserId = UserId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        ClaimsGridDocument claims = new ClaimsGridDocument();

                        var ClaimsHeaders = reader.Read<ClaimsHeaders>().ToList();
                        var ClaimsProductDescription = reader.Read<ClaimsProductDescription>().ToList();
                        var ClaimsProjectDetails = reader.Read<ClaimsProjectDetails>().ToList();
                        var CFTOnPackReview = reader.Read<ClaimsOnPackDetails>().ToList();
                        var CFTCommunicationReview = reader.Read<ClaimsCommunicationDetails>().ToList();
                        var ClaimsSupportingDocument = reader.Read<ClaimsSupportingDocument>().ToList();
                        var DeptName = reader.Read<string>();

                        claims.ClaimsHeadersList = ClaimsHeaders;
                        claims.ClaimsProductDescription = ClaimsProductDescription;
                        claims.ClaimsProjectDetails = ClaimsProjectDetails;
                        claims.ClaimsOnPackDetails = CFTOnPackReview;
                        claims.ClaimsCommunicationDetails = CFTCommunicationReview;
                        claims.ClaimsSupportingDocument = ClaimsSupportingDocument;
                        claims.CFTDeptName = DeptName.FirstOrDefault();

                        return claims;
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public ClaimsGridDocument GetClaimsData(string ProjectNo, string UserId, string Stage, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                using (var reader = con.QueryMultiple("Get_Claims_Data", new { ProjectNumber = ProjectNo, UserId = UserId, Stage = Stage, GridId = GridId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        ClaimsGridDocument claims = new ClaimsGridDocument();
                        claims = reader.Read<ClaimsGridDocument>().FirstOrDefault();
                        var ClaimsHeaders = reader.Read<ClaimsHeaders>().ToList();
                        var ClaimsProductDescription = reader.Read<ClaimsProductDescription>().ToList();
                        var ClaimsProjectDetails = reader.Read<ClaimsProjectDetails>().ToList();
                        var ClaimsOnPackDetails = reader.Read<ClaimsOnPackDetails>().ToList();
                        var ClaimsCommunicationDetails = reader.Read<ClaimsCommunicationDetails>().ToList();
                        var ClaimsSupportingDocument = reader.Read<ClaimsSupportingDocument>().ToList();
                        claims.RequiredClaimsDetials = reader.Read<RequiredClaims>().ToList();
                        if (claims.RequiredClaimsDetials != null && claims.RequiredClaimsDetials.Count() > 0)
                        {
                            claims.MustHaveClaims = claims.RequiredClaimsDetials[0].MustHaveClaims;
                            claims.NiceToHaveClaims = claims.RequiredClaimsDetials[0].NiceToHaveClaims;
                            claims.ProjectBriefId = claims.RequiredClaimsDetials[0].ProjectBriefId;
                        }
                        //var DeptName = reader.Read<string>();
                        var Role = reader.Read<string>();

                        claims.ClaimsHeadersList = ClaimsHeaders;
                        claims.ClaimsProductDescription = ClaimsProductDescription;
                        claims.ClaimsProjectDetails = ClaimsProjectDetails;
                        claims.ClaimsOnPackDetails = ClaimsOnPackDetails;
                        claims.ClaimsCommunicationDetails = ClaimsCommunicationDetails;
                        claims.ClaimsSupportingDocument = ClaimsSupportingDocument;
                        //claims.CFTDeptName = DeptName.FirstOrDefault();
                        claims.Role = Role.FirstOrDefault();
                        claims.DeptBasedOnHub = reader.Read<DepartmentBasedOnHub>().ToList();
                        claims.DeptForFileUpload = reader.Read<DepartmentsForFileUpload>().ToList();
                        claims.CFTUploadedDocumentDetails = reader.Read<CftUploadedDocument>().ToList();
                        claims.DeptForExcelUpload = reader.Read<DepartmentsForExcelUpload>().ToList();


                        return claims;
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public IEnumerable<ClaimsGridProjectData> GetDataByProjectNo(string ProjectNo)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "ClaimsGrid_GetProjectData";
                    var result = con.Query<ClaimsGridProjectData>(StoredProcedure, new { ProjectNumber = ProjectNo }, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<StatusList> GetStatusList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "ClaimsGrid_GetStatusList";
                    var result = con.Query<StatusList>(StoredProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public string GetUserDeptName(string User)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "Get_ClaimsUserDeptName";
                    return con.Query<string>(StoredProcedure, new { UserId = User }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).FirstOrDefault();

                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ExistingClaimsProject> GetExistingClaimsProjectList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "ClaimsGrid_GetExistingProjectList";
                    var result = con.Query<ExistingClaimsProject>(StoredProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ClaimsDepartments> GetDeptList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "ClaimsGrid_GetDeptList";
                    var result = con.Query<ClaimsDepartments>(StoredProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<ClaimsGridListView> getFilterClaimsGridList(string UserId, string ProjectNo, string Status, string Division)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "FilterClaimsGridList";
                    var result = con.Query<ClaimsGridListView>(storedProcedure, new { UserId = UserId, ProjectNo = ProjectNo, Status = Status, Division = Division }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<ClaimsLicenseCategory> GetLicenseCategoryList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "ClaimsGrid_GetLicenseCategoryList";
                    var result = con.Query<ClaimsLicenseCategory>(StoredProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ClaimsProductDescrtion> getClaimsProductionDescritpionDetials(string User, string ProjectNo, string Status, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "GetClaims_PDFDetails";
                    var result = con.Query<ClaimsProductDescrtion>(storedProcedure, new { UserId = User, Status = Status, ProjectNumber = ProjectNo, GridId = GridId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<OnPackLabelClaims> getPackLabelOrCommunicationDetails(string User, string ProjectNo, string Status, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "GetClaims_PDFDetails";
                    var result = con.Query<OnPackLabelClaims>(storedProcedure, new { UserId = User, Status = Status, ProjectNumber = ProjectNo, GridId = GridId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    //result = result.Where(ele=> ele.SubClaims !=null return ({ ...ele,SubClaimsDetails: JsonConvert.DeserializeObject(ele.SubClaims) }))
                    for (var i = 0; i < result.Count; i++)
                    {
                        if (result[i].SubClaims != null)
                        {
                            result[i].SubClaimsDetails = JsonConvert.DeserializeObject<IEnumerable<SubOnPackClaims>>(result[i].SubClaims);
                        }
                        else
                        {
                            result[i].SubClaimsDetails = null;

                        }
                    }
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public ClaimsPdf getClaimsInformation(string User, string ProjectNo, string Status, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                using (var reader = con.QueryMultiple("GetClaims_PDFDetails", new { UserId = User, Status = Status, ProjectNumber = ProjectNo, GridId = GridId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        ClaimsPdf claims = new ClaimsPdf();
                        if (!reader.IsConsumed)
                        {
                            claims = reader.Read<ClaimsPdf>().FirstOrDefault();
                        }
                        claims.SupportingDocument = reader.Read<SupportDocument>();
                        return claims;
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public string DeleteClaimsRemarksRecord(string ProjectNumber, string ClaimsId, string UserId, string Type, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectNumber", ProjectNumber);
                    para.Add("ClaimsId", ClaimsId);
                    para.Add("UserId", UserId);
                    para.Add("Type", Type);
                    para.Add("GridId", GridId);
                    para.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    var result = con.Query("Delete_ClaimsRemarks_Data", para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return para.Get<string>("Output");
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }

        }
        public ClaimsGridDocument FetchClaimsDetails(string ProjectNumber, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                using (var reader = con.QueryMultiple("Fetch_Claims_Details", new { GridId = GridId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        ClaimsGridDocument claims = new ClaimsGridDocument();

                        var data1 = reader.Read<ClaimsExcelModel>().ToList();
                        var data2 = reader.Read<ClaimsExcelModel2>().ToList();

                        claims.OnPackClaimsExcelData = data1;
                        claims.CommunicationClaimsExcelData = data2;

                        return claims;
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }

        }



        public IEnumerable<object> Fetch_CFT_ClaimsDetails(string ProjectNumber, string TypeOfClaimsRemarks, string TypeOfCFT, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    var result = con.Query<object>("fetch_CFT_ClaimsDetails", new { ProjectNumber = ProjectNumber, TypeOfClaimsRemarks = TypeOfClaimsRemarks, TypeOfCFT = TypeOfCFT, GridId = GridId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<object> Fetch_CFT_ClaimsWithRemarks(string ProjectNumber, string TypeOfClaimsRemarks, string TypeOfCFT, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    var result = con.Query<object>("fetch_CFT_ClaimsWithRemarks", new { ProjectNumber = ProjectNumber, TypeOfClaimsRemarks = TypeOfClaimsRemarks, TypeOfCFT = TypeOfCFT, GridId = GridId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string AddUpdateDSGReview(ClaimsGridDocument obj)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ClaimsHeaders", obj.ClaimsHeaders);
                    para.Add("ProductDescription", obj.ProductDescription);
                    para.Add("ProjectDetails", obj.ProjectDetails);
                    para.Add("RephraseClaims", obj.ProjectBrief);
                    para.Add("InitiatedBy", obj.InitiatedBy);
                    para.Add("ApprovalStatus", obj.ApprovalStatus);
                    para.Add("OnPackClaims", obj.OnPackClaims);
                    para.Add("CommunicationClaims", obj.CommunicationClaimsData);
                    para.Add("GridId", obj.GridId);
                    para.Add("StatusId", obj.Stage);
                    para.Add("DeptDetails", obj.DeptDetails);
                    para.Add("SupportingDocumentData", obj.SupportingDocumentData);
                    para.Add("DeletedSupportingdocument", obj.DeletedSupportingdocument);
                    para.Add("@Output", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                    const string StoredProcedure = "DSG_Review_Updation";
                    var result = con.Query(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return para.Get<string>("Output");
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ClaimsHistoryRemarks> FetchFormHistoryDetails(string GridId, string ProjectNumber)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters para = new DynamicParameters();
                    para.Add("ProjectNumber", ProjectNumber);
                    para.Add("GridId", GridId);
                    const string StoredProcedure = "FetchClaimsHistoryRemarks";
                    var result = con.Query<ClaimsHistoryRemarks>(StoredProcedure, para, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<RequiredClaims> GetRquiredClaimsDetails(string ProjectNumber)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "GetRquiredClaimsDetails";
                    var result = con.Query<RequiredClaims>(StoredProcedure, new { ProjectNumber = ProjectNumber }, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<SupportingDocument> GetSupportingDocuments(string ProjectNumber, string GridId)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().ConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProjectNumber", ProjectNumber);
                parameters.Add("GridId", GridId);
                var result = connection.Query<SupportingDocument>("GetCGDSupportingDocuments", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public ClaimsPdf GetClaimsApprovalData_PDF(string GridId)
        {
            ClaimsPdf claimsData = new ClaimsPdf();

            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                using (var reader = con.QueryMultiple("GetClaimsApprovedDetailsFor_PDF", new { GridId = GridId }, commandType: CommandType.StoredProcedure))
                {
                    claimsData.DSGTeamApprovalData = reader.Read<DSGTeamData>();
                    claimsData.CFTTeamApprovalData = reader.Read<CFTTeamData>();
                    claimsData.DSGReviewTeamApprovalData = reader.Read<DSGReviewTeamData>();
                    claimsData.DSGManagerApprovalData = reader.Read<DSGManagerData>();
                    claimsData.DSGSignOffApprovalData = reader.Read<DSGSignoffData>();
                    claimsData.AddendumApprovalData = reader.Read<AddedndumData>();
                    claimsData.AddendumRemarks = reader.Read<AddendumRemarks>();
                }
                return claimsData;
            }
        }
        public void savesendmailuserdata(string toMailids, string GridId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@toMailids", toMailids);
                    parameter.Add("@GridId", GridId);

                    const string storedProcedure = "saveClaimssendmailuserdata";
                    var result = con.Query(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public IEnumerable<ClaimsSendMailData> GetClaimsDetailsForSendMail(string GridId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@GridId", GridId);


                    const string storedProcedure = "GetClaimsDetailsForSendMail";
                    var result = con.Query<ClaimsSendMailData>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<DepartmentBasedOnHub> GetDepartmentBasedOnHubName(string HubName)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@HubName", HubName);
                    const string storedProcedure = "GetDepartmentBasedOnHubName";
                    var result = con.Query<DepartmentBasedOnHub>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public IEnumerable<DocumentDetails> GetMultipleDepartmentsUploadedDocuments(string GridId, string ClaimsId, string Type)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    parameter.Add("@GridId", GridId);
                    parameter.Add("@ClaimsId", ClaimsId);
                    parameter.Add("@Type", Type);
                    const string storedProcedure = "GetMultiple_UploadedDocuments";
                    var result = con.Query<DocumentDetails>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<DocumentDetails> GetMultipleDepartmentsUploadedExcel(string GridId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();
                    parameter.Add("@GridId", GridId);
                    const string storedProcedure = "GetMultiple_UploadedExcelDocument";
                    var result = con.Query<DocumentDetails>(storedProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public IEnumerable<DivisionMaster> GetDivisionList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string storedProcedure = "Get_ClaimsGrid_DivisionList";
                    var result = con.Query<DivisionMaster>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
        public IEnumerable<ClaimsDepartments> GetDeptListForSendMail()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "ClaimsGrid_GetDeptListForSendMail";
                    var result = con.Query<ClaimsDepartments>(StoredProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<PMDUsersMaster> GetPMDUsersList()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    const string StoredProcedure = "Get_PmdUsersForClaimsGrid";
                    var result = con.Query<PMDUsersMaster>(StoredProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string GetCCMailIds(string toMailids, string GridId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters parameter = new DynamicParameters();
                    parameter.Add("@GridId", GridId);
                    parameter.Add("@toMailids", toMailids);
                    parameter.Add("@CCMailIds", dbType: DbType.String, direction: ParameterDirection.Output, size: 2000);
                    const string StoredProcedure = "GetCCMailIds_ClaimsGridSendMail";
                    var result = con.Query(StoredProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToString();

                    return parameter.Get<string>("CCMailIds");
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }


        public Tuple<string, string> GetClaimsAllDepartments(string GridId, string ProjectNumber)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().ConnectionString))
            {
                try
                {
                    DynamicParameters parameter = new DynamicParameters();
                    parameter.Add("@GridId", GridId);
                    parameter.Add("@ProjectNumber", ProjectNumber);
                    parameter.Add("@AllDepartmentUsers", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameter.Add("@AllDepartments", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    const string StoredProcedure = "GetClaimsAllDepartments";
                    var result = con.Query(StoredProcedure, parameter, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToString();

                    return System.Tuple.Create(parameter.Get<string>("@AllDepartments"), parameter.Get<string>("@AllDepartmentUsers"));
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }
    }
}
