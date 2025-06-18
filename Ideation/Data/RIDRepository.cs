using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using System.Web.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using DocumentFormat.OpenXml.Math;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections.Generic;
using System.Globalization;
using System;

namespace Ideation.Data
{
    public class RIDRepository : IRIDRepository
    {
        public IEnumerable<DivisionData> GetDivisionList(string KDSType)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<DivisionData>(storedProcedure, new { @KDSType = KDSType }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<IngredientListData> GetIngredientList(int DivisionId, string Source, string LoginId, string StartDate = "", string EndDate = "", string SearchText = "", int IngredientTypeId = 0)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Ingredient_GetDetailsByCategory";
                    var result = con.Query<IngredientListData>(storedProcedure, new { @DivisionId = DivisionId, @IngredientType = IngredientTypeId, @StartDate = StartDate, @EndDate = EndDate, @SearchText = SearchText, @Source = Source, @LoginId = LoginId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public (IEnumerable<IngredientListData>, IEnumerable<ParticularIngredientData>) GetParticularIngredientDetails(int IngredientId, int DivisionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                using (var reader = con.QueryMultiple("Ingredient_GetDetailsByIngredientId", new { @IngredientId = IngredientId, @DivisionId = DivisionId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        var IngredientHeaderList = reader.Read<IngredientListData>().ToList();
                        var IngredientDetailsList = reader.Read<ParticularIngredientData>().ToList();

                        return (IngredientHeaderList, IngredientDetailsList);
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public (IEnumerable<IngredientListData>, IEnumerable<ParticularIngredientData>)
            GetParticularIngredientDetailsForFSGlobalCompliance(int IngredientId, int DivisionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                using (var reader = con.QueryMultiple("Ingredient_GetDetailsByIngredientId_ForGlobalCompliance", new { @IngredientId = IngredientId, @DivisionId = DivisionId }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        var IngredientHeaderList = reader.Read<IngredientListData>().ToList();
                        var IngredientDetailsList = reader.Read<ParticularIngredientData>().ToList();

                        return (IngredientHeaderList, IngredientDetailsList);
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public IEnumerable<RID> GetAddDetails(int Division, string role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Division", Division);
                    parameters.Add("@Role", role);
                    const string storedProcedure = "RID_AddDetailsGet";
                    var result = con.Query<RID>(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<SelectListItem> GetAddDropdown()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "RID_RegStatusGet";
                    var result = con.Query<SelectListItem>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<SelectListItem> GetFunctionDropdown(int ingredientId, string type)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientId", ingredientId);
                    parameters.Add("@Type", type);

                    var result = con.Query<SelectListItem>("RID_FunctionGet", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public Tuple<string, string> IngredientsDetailsInsert(RID ingredient)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientName", ingredient.IngredientName);
                parameters.Add("@Synonyms", ingredient.Synonyms);
                parameters.Add("@CASNo", ingredient.CASNumber);
                parameters.Add("@DivisionId", ingredient.Division_Id);
                parameters.Add("@FunctionId", ingredient.FunctionId);
                parameters.Add("@LoginId", ingredient.LoginId);
                parameters.Add("@DocumentData", ingredient.DocumentData);
                parameters.Add("@JsonData", ingredient.GridData);
                parameters.Add("@Source", ingredient.Source);
                parameters.Add("@RemarksData", ingredient.RemarksData);
                parameters.Add("@IsConfirmed", ingredient.IsConfirmed);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query<RID>("[IngredientHeader_Save]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }

        public Tuple<string, string> IngredientsDetailsUpdate(RID ingredient)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientId", ingredient.IngredientId);
                parameters.Add("@IngredientName", ingredient.IngredientName);
                parameters.Add("@Synonyms", ingredient.Synonyms);
                parameters.Add("@CASNo", ingredient.CASNumber);
                parameters.Add("@DivisionId", ingredient.Division_Id);
                parameters.Add("@FunctionId", ingredient.FunctionId);
                parameters.Add("@LoginId", ingredient.LoginId);
                parameters.Add("@DocumentData", ingredient.DocumentData);
                parameters.Add("@JsonData", ingredient.GridData);
                parameters.Add("@Source", ingredient.Source);
                parameters.Add("@RemarksData", ingredient.RemarksData);
                parameters.Add("@IsConfirmed", ingredient.IsConfirmed);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query<RID>("[IngredientHeader_Update]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }

        public Tuple<string, string> DeleteIngredientById(int IngredientId, string LoginId, int DivisionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientId", IngredientId);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Division", DivisionId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[IngredientHeader_Delete]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));

            }
        }

        public IEnumerable<RID> IngredientListById(long IngredientId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientId", IngredientId);
                return con.Query<RID>("[Ingredient_GetHubDetailsByIngredientId]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public IEnumerable<RID> IngredientRequestListById(long IngredientReqId, string role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientReqId", IngredientReqId);
                parameters.Add("@Role", role);
                return con.Query<RID>("[IngredientRequest_GetById]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public RID IngredientListByIngredientId(long IngredientId, string role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientId", IngredientId);
                parameters.Add("@Role", role);
                var result = con.QueryMultiple("[IngredientHeader_GetById]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                RID rid = new RID();
                rid = result.Read<RID>().FirstOrDefault();
                rid.IngredientsList = result.Read<dynamic>();
                rid.IngredientFileList = result.Read<dynamic>();
                return rid;
            }
        }

        public IEnumerable<SelectListItem> GetStatusList(string KDSType)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@KDSType", KDSType);
                    return con.Query<SelectListItem>("[Masters_Get]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<RID> GetIngredientRequest(int DivisionId, string LoginId = "", string StartDate = "", string EndDate = "", int Status = 0)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DivisionId", DivisionId);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@FromDate", StartDate);
                parameters.Add("@ToDate", EndDate);
                parameters.Add("@Status", Status);

                return con.Query<RID>("[IngredientRequest_Get]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public IEnumerable<Approve_IngredientListData> Approve_GetIngredientList(int DivisionId, string LoginId, string PageAppLevel)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Ingredient_GetDetailsByCategory_Approval";
                    var result = con.Query<Approve_IngredientListData>(storedProcedure,
                        new { @DivisionId = DivisionId, @LoginId = LoginId, @PageAppLevel = PageAppLevel },
                        commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<RID> GetRemarksById(int IngredientId, string type)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientId", IngredientId);
                parameters.Add("@Type", type);

                return con.Query<RID>("[IngredientRemarksList]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }


        public IEnumerable<Approve_ParticularIngredientData> Approve_GetParticularIngredientDetails(int IngredientId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Ingredient_GetHubDetailsByIngredientId";
                    var result = con.Query<Approve_ParticularIngredientData>(storedProcedure, new { @IngredientId = IngredientId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public (IEnumerable<RegStatusData>, IEnumerable<CategoryData>) RegulatoryStatusDropDownData(string KDSType)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                using (var reader = con.QueryMultiple("Masters_Get", new { @KDSType = KDSType }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        RID rid = new RID();
                        var RegStatusList = reader.Read<RegStatusData>().ToList();
                        var CategoryList = reader.Read<CategoryData>().ToList();

                        return (RegStatusList, CategoryList);
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public Tuple<string, string> ApproveRevertIngredient(string UserId, string JsonString, string ApprovalLevel, string Action, string Remarks, bool IsSubmitted)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserId", UserId);
                    param.Add("@JsonString", JsonString);
                    param.Add("@ApprovalLevel", ApprovalLevel);
                    param.Add("@Action", Action);
                    param.Add("@Remarks", Remarks);
                    param.Add("@IsSubmitted", IsSubmitted);
                    param.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@MessageClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("Ingredients_SaveApprovalData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("@Message"), param.Get<string>("@MessageClass"));
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public IEnumerable<SelectListItem> GetFunctionList()
        {
            string KDSType = "Function_DropDown";
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<SelectListItem>(storedProcedure, new { @KDSType = KDSType }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<SelectListItem> GetRegionList()
        {
            string KDSType = "Region_DropDown";
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<SelectListItem>(storedProcedure, new { @KDSType = KDSType }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public Tuple<string, string> ComplianceRequest_Save(string botanicalName, string IngredientName, string Region, string FunctionId, string LoginId, int DivisionId, string CASNumber, int IngredientTypeId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@BotanicalName", botanicalName);
                parameters.Add("@IngredientName", IngredientName);
                parameters.Add("@CASNumber", CASNumber);
                parameters.Add("@Region", Region);
                parameters.Add("@FunctionId", FunctionId);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@DivisionId", DivisionId);
                parameters.Add("@IngredientTypeId", IngredientTypeId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query<string>("[IngredientRequest_Insert]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }

        public IEnumerable<SelectListItem> GetIRAStatusList()
        {
            string KDSType = "IRStatus";
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<SelectListItem>(storedProcedure, new { @KDSType = KDSType }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ComplianceRequestData> GetComplianceRequestList(int DivisionId, string LoginId, int ingredientTypeId, int Status)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@DivisionId", DivisionId);
                    parameters.Add("@LoginId", LoginId);
                    parameters.Add("@ingredientTypeId", ingredientTypeId);
                    parameters.Add("@Status", Status);
                    const string storedProcedure = "[IngredientRequest_Get]";
                    var result = con.Query<ComplianceRequestData>(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<ComplianceRequestData> GetFoodSupplementComplianceRequestList(int DivisionId, string LoginId, int IngredientTypeId, int Status)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@DivisionId", DivisionId);
                    parameters.Add("@IngredientTypeId", IngredientTypeId);
                    parameters.Add("@Status", Status);
                    parameters.Add("@LoginId", LoginId);
                    const string storedProcedure = "[FoodSupplementIngredientRequest_Get]";
                    var result = con.Query<ComplianceRequestData>(storedProcedure, parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string GetUserApprovalLevel(string LoginId, int DivisionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@DivisionId", DivisionId);
                parameters.Add("@ApprovalLevel", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query<string>("[User_GetApprovalLevel]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return parameters.Get<string>("@ApprovalLevel");
            }
        }

        public IEnumerable<MostRecentRemark> GetMostRecentRemark()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                return con.Query<MostRecentRemark>("[Ingredient_GetRemarks]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);

            }
        }

        public IEnumerable<MostRecentRemark> FSGetMostRecentRemark(int DivisionId, int IngredientTypeId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DivisionId", DivisionId);
                parameters.Add("@IngredientTypeId", IngredientTypeId);
                return con.Query<MostRecentRemark>("[FoodSupplement_IngredientGetRemarks]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);

            }
        }

        public IEnumerable<dynamic> GetFunction()
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                return con.Query<dynamic>("[FunctionMaster_Get]", commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public Tuple<string, string> SaveFunctionDetails(int functionId, string functionName, bool status, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FunctionId", functionId);
                parameters.Add("@FunctionName", functionName);
                parameters.Add("@Status", status);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[Function_InsertUpdate]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }

        public Tuple<string, string> DeleteFunctionDetails(int functionId, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FunctionId", functionId);
                parameters.Add("@LoginId", LoginId);
                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                con.Query("[Function_Delete]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));
            }
        }

        public IEnumerable<dynamic> GetUploadedFiles(int IngredientId, int RegionId, int CategoryId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IngredientId", IngredientId);
                parameters.Add("@RegionId", RegionId);
                parameters.Add("@CategoryId", CategoryId);
                return con.Query<dynamic>("[RID_GetUploadedFiles]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public IEnumerable<IngredientTypeData> GetIngredientTypeData()
        {
            var KDSType = "IngredientType";
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<IngredientTypeData>(storedProcedure, new { @KDSType = KDSType }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<RegStatusData> GetRegStatusData(int DivisionId)
        {
            string KDSType = "RegStatus";
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<RegStatusData>(storedProcedure, new { @KDSType = KDSType, @Division = DivisionId }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public (IEnumerable<IngredientListData> HeaderCollection, IEnumerable<ParticularIngredientData> DetailsCollection,
            IEnumerable<ComplainceRemarksData> ComplianceRemarksCollection, IEnumerable<CRRegionGroupData> RegionGroupCollection)
            GetAddEdit_FSDetails(int DivisionId, int IngredientORRequestId, int IngredientType, int From, string Role)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                using (var reader = con.QueryMultiple("[Ingredient_GetAddEdit_FSDetails]",
                    new { IngredientORRequestId = IngredientORRequestId, @DivisionId = DivisionId, @IngredientType = IngredientType, @From = From, @Role = Role },
                    commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        var IngredientHeaderList = reader.Read<IngredientListData>().ToList();
                        var IngredientDetailsList = reader.Read<ParticularIngredientData>().ToList();
                        var IngredientComplainceRemarksList = reader.Read<ComplainceRemarksData>().ToList();
                        var IngredientCRDetailsList = reader.Read<CRRegionGroupData>().ToList();

                        return (IngredientHeaderList, IngredientDetailsList, IngredientComplainceRemarksList, IngredientCRDetailsList);
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }
            }
        }

        public IEnumerable<dynamic> GetIngredientNameList(int DivisionId, string type = "all")
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DivisionId", DivisionId);
                parameters.Add("@Type", type);

                return con.Query<dynamic>("[RID_GetIngredientNames]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public IEnumerable<dynamic> GetCASNumberList(int DivisionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DivisionId", DivisionId);
                return con.Query<dynamic>("[RID_GetCASNumber]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public IEnumerable<RID> GetFoodSupplementComplianceRequestList(int DivisionId, int IngredientTypeId, string LoginId = "", string StartDate = "", string EndDate = "", int Status = 0)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@DivisionId", DivisionId);
                    parameters.Add("@IngredientTypeId", IngredientTypeId);
                    parameters.Add("@LoginId", LoginId);
                    if (!string.IsNullOrEmpty(StartDate))
                        parameters.Add("@FromDate", DateTime.ParseExact(StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    else
                        parameters.Add("@FromDate", StartDate);
                    if (!string.IsNullOrEmpty(EndDate))
                        parameters.Add("@ToDate", DateTime.ParseExact(EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    else
                        parameters.Add("@ToDate", EndDate);
                    parameters.Add("@Status", Status);

                    return con.Query<RID>("[FoodSupplementIngredientRequest_Get]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                }
                catch (Exception e)
                {
                    throw (e);
                }

            }

        }

        public IEnumerable<IngredientTypeData> GetIngredientTypeList(string KDSType)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Masters_Get";
                    var result = con.Query<IngredientTypeData>(storedProcedure, new { @KDSType = KDSType }, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<Approve_IngredientListData> FoodSupplementApprove_GetIngredientList
            (int DivisionId, string LoginId, int IngredientTypeId, string pageAppLevel)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "FoodSupplementIngredient_GetDetailsByCategory_Approval";
                    var result = con.Query<Approve_IngredientListData>(storedProcedure,
                        new { @DivisionId = DivisionId, @LoginId = LoginId, @IngredientTypeId = IngredientTypeId, @pageAppLevel = pageAppLevel },
                        commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public (IEnumerable<RegStatusData>, IEnumerable<CategoryData>) FoodSupplementsRegulatoryStatusDropDownData(int divisionId, string KDSType)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                using (var reader = con.QueryMultiple("Masters_Get", new { @Division = divisionId, @KDSType = KDSType }, commandType: CommandType.StoredProcedure))
                {
                    try
                    {
                        RID rid = new RID();
                        var RegStatusList = reader.Read<RegStatusData>().ToList();
                        var CategoryList = reader.Read<CategoryData>().ToList();

                        return (RegStatusList, CategoryList);
                    }
                    catch (Exception e)
                    {
                        throw (e);
                    }
                }

            }
        }

        public Tuple<string, string, int> InsertUpdateFSIngredient(InsertUpdateFSIngredient insertUpdateFSIngredient)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@IngredientORRequestId", insertUpdateFSIngredient.IngredientORRequestId);
                parameters.Add("@IngredientType", insertUpdateFSIngredient.IngredientType);
                parameters.Add("@From", insertUpdateFSIngredient.From);
                parameters.Add("@Remarks", insertUpdateFSIngredient.Remarks);
                parameters.Add("@DivisionId", insertUpdateFSIngredient.DivisionId);
                parameters.Add("@LoginId", insertUpdateFSIngredient.LoginId);
                parameters.Add("@Action", insertUpdateFSIngredient.Action);
                parameters.Add("@SaveType", insertUpdateFSIngredient.SaveType);

                parameters.Add("@HeaderJson", insertUpdateFSIngredient.HeaderJson);
                parameters.Add("@DetailsJson", insertUpdateFSIngredient.DetailsJson);
                parameters.Add("@ComplainceRemarksJson", insertUpdateFSIngredient.ComplainceRemarksJson);
                parameters.Add("@RegionGroupJson", insertUpdateFSIngredient.RegionGroupJson);

                parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameters.Add("@IngredientId", dbType: DbType.Int32, direction: ParameterDirection.Output);

                con.Execute("[Ingredient_SaveAddEdit_FSDetails]", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);

                return new Tuple<string, string, int>(parameters.Get<string>("@Message"),
                    parameters.Get<string>("@Messageclass"), parameters.Get<int?>("@IngredientId") ?? 0);
            }
        }

        public IEnumerable<ComplianceHeaderMaster> GetComplianceHeaderData()
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    const string storedProcedure = "Get_FoodSupplementMasterData";
                    var result = con.Query<ComplianceHeaderMaster>(storedProcedure, commandTimeout: 1200, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public Tuple<string, string> SaveComplianceHeaderDetails(string headerData, string LoginId)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@ComplianceHeaderJson", headerData);
                    parameters.Add("@LoginId", LoginId);
                    parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ComplianceHeaderMaster_InsertUpdate", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));

                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public Tuple<string, string> DeleteComplianceHeaderDetails(int regionId, int ingredientTypeId, int headerId, string LoginId)
        {

            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@RegionId", regionId);
                    parameters.Add("@IngredientTypeId", ingredientTypeId);
                    parameters.Add("@HeaderId", headerId);
                    parameters.Add("@LoginId", LoginId);
                    parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    con.Execute("ComplianceHeaderMaster_Delete", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(parameters.Get<string>("@Message"), parameters.Get<string>("@Messageclass"));

                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public Tuple<string, string, int> SaveComplianceRemarksData(int ingredientId, string ingredientName, string botanicalName, int ingredientTypeId, int division, int region, string headerData, string additionalInformation, string inMedicine, string inFoodSupplement, string source, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientId", ingredientId);
                    parameters.Add("@IngredientName", ingredientName);
                    parameters.Add("@BotanicalName", botanicalName);
                    parameters.Add("@IngredientTypeId", ingredientTypeId);
                    parameters.Add("@DivisionId", division);
                    parameters.Add("@RegionId", region);
                    parameters.Add("@ComplianceHeaderJson", headerData);
                    parameters.Add("@AdditionalInformation", additionalInformation);
                    parameters.Add("@InMedicine", inMedicine);
                    parameters.Add("@InFoodSupplement", inFoodSupplement);
                    parameters.Add("@Source", source);
                    parameters.Add("@LoginId", LoginId);
                    parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@IngId", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    con.Execute("ComplianceRemarks_InsertUpdate", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string, int>(parameters.Get<string>("@Message"),
                    parameters.Get<string>("@Messageclass"), parameters.Get<int?>("@IngId") ?? 0);

                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public Tuple<string, string, int> SaveClaimsInfoData(int ingredientId, string ingredientName, string botanicalName, int ingredientTypeId, int division, int regionId, int categoryId, string claimsInfo, string Source, string LoginId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientId", ingredientId);
                    parameters.Add("@IngredientName", ingredientName);
                    parameters.Add("@BotanicalName", ingredientName);
                    parameters.Add("@IngredientTypeId", ingredientTypeId);
                    parameters.Add("@DivisionId", division);
                    parameters.Add("@RegionId", regionId);
                    parameters.Add("@CategoryId", categoryId);
                    parameters.Add("@ClaimsInfo", claimsInfo);
                    parameters.Add("@Source", Source);
                    parameters.Add("@LoginId", LoginId);
                    parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    parameters.Add("@IngId", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    con.Execute("ClaimsInfo_InsertUpdate", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string, int>(parameters.Get<string>("@Message"),
                    parameters.Get<string>("@Messageclass"), parameters.Get<int?>("@IngId") ?? 0);

                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public (IEnumerable<dynamic> CRemarksData, IEnumerable<dynamic> HeaderData)
            GetFoodSupplementComplianceRemarks(int ingredientTypeId, int ingredientId, int regionId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientTypeId", ingredientTypeId);
                    parameters.Add("@IngredientId", ingredientId);
                    parameters.Add("@RegionId", regionId);
                    var result = con.QueryMultiple("Get_ComplianceRemarksData", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return (result.Read<dynamic>(), result.Read<dynamic>());
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public IEnumerable<dynamic> GetFoodSupplementClaimsInfo(int ingredientId, int regionId, int categoryId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientId", ingredientId);
                    parameters.Add("@RegionId", regionId);
                    parameters.Add("@CategoryId", categoryId);
                    var result = con.Query("Get_ClaimsInfoData", parameters, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return result;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public string GetFoodSupplementComplianceRemarksInactives(int ingredientId, int regionId, int categoryId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientId", ingredientId);
                    parameters.Add("@RegionId", regionId);
                    parameters.Add("@CategoryId", categoryId);
                    var result = con.QueryFirstOrDefault("Get_ComplianceRemarksData_Inactives", parameters, commandType: CommandType.StoredProcedure);
                    string fsInactiveComRemarks = result?.FSInactivesComplianceRemarks;
                    return fsInactiveComRemarks;
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

        public (IEnumerable<dynamic> Header, IEnumerable<dynamic> Details) GetIngHistoryData(int ingredientId)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().RIDConnString))
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@IngredientId", ingredientId);

                    var result = con.QueryMultiple("GetIngHistoryData", parameters, commandType: CommandType.StoredProcedure,
                        commandTimeout: CommonConstants.CommandTimeOut);
                    var header = result.Read<dynamic>().ToList();
                    var details = result.Read<dynamic>().ToList();
                    return (header, details);
                }
                catch (Exception e)
                {
                    throw (e);
                }
            }
        }

    }
}