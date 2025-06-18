using Dapper;
using DocumentFormat.OpenXml.Bibliography;
using Ideation.Core;
using Ideation.Models;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Data
{
    public class NPDLaunchMasterRepository : INPDLaunchMasterRepository
    {

        public NPDLaunchMaster GetNpdLaunchMasterData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    const string storedProcedure = "GetNPDLaunchMasterData";
                    var result = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    NPDLaunchMaster npdLM = new NPDLaunchMaster();
                    npdLM.NpdHGMLDivisionList = result.Read<NpdHGMLDivisionMaster>();
                    npdLM.NpdHGMLCategoryList = result.Read<NpdHGMLCategoryMaster>();
                    npdLM.NpdHGMLProductGroupList = result.Read<NpdHGMLProductGroupMaster>();
                    npdLM.NpdHGMLFormulationList = result.Read<NpdHGMLFormulationMaster>();
                    npdLM.NpdHGMLSourceList = result.Read<NpdHGMLSourceMaster>();
                    npdLM.NpdHGMLSubCategoryList = result.Read<NpdHGMLSubCategoryMaster>();
                    npdLM.IsNpdList = result.Read<SelectListItem>();
                    npdLM.NpdLaunchYearTypeList = result.Read<SelectListItem>();
                    npdLM.StatusList = result.Read<SelectListItem>();

                    return npdLM;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<NpdLaunchMasterHeaderData> GetNPDLaunchMasterHeaderData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", "");
                    p.Add("@Category", "");
                    p.Add("@ProductGroup", "");
                    p.Add("@Formulation", "");
                    p.Add("@Source", "");
                    var result = con.Query<NpdLaunchMasterHeaderData>("GetNPDLaunchMasterHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IEnumerable<NpdLaunchMasterHeaderData> GetNPDLaunchMasterHeaderData(string division, string category, string productGroup, string formulation, string source)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", division);
                    p.Add("@Category", category);
                    p.Add("@ProductGroup", productGroup);
                    p.Add("@Formulation", formulation);
                    p.Add("@Source", source);
                    var result = con.Query<NpdLaunchMasterHeaderData>("GetNPDLaunchMasterHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }
        public IEnumerable<NpdLaunchMasterHeaderData> GetNPDLMProductHierarchyData(string division, string category, string productGroup, string formulation)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", division);
                    p.Add("@Category", category);
                    p.Add("@ProductGroup", productGroup);
                    p.Add("@Formulation", formulation);
                    var result = con.Query<NpdLaunchMasterHeaderData>("GetNPDLMProductHierarchyData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Tuple<string, string> InsertProductHierarchyData(NPDLaunchMaster HierarchyData, string UserName)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ProductHierarchyData", HierarchyData.ProductHierarchyData);
                parameters.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                parameters.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);
                parameters.Add("@UserName", UserName);
                connection.Query("Update_NPDLM_ProductHierarchyData", parameters, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(parameters.Get<string>("@Msg"), parameters.Get<string>("@Msg_Class"));
            }

        }
        public IEnumerable<NPDLMProductLaunchInformation> GetProductLaunchInformationData(string division, string category, string type, string npdLaunchYearType, string npdLaunchYear, string status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@Division", division);
                    param.Add("@Category", category);
                    param.Add("Type", type);
                    param.Add("NpdLaunchYearType", npdLaunchYearType);
                    param.Add("NpdLaunchYear", npdLaunchYear);
                    param.Add("StatusId", status);

                    var result = con.Query<NPDLMProductLaunchInformation>("Get_NPDLM_ProductLaunchInformationData", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Tuple<string, string> UploadProductLaunchInformationData(NPDLaunchMaster npdLM)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("UserName", npdLM.UserName);
                param.Add("ProductLaunchInformationData", npdLM.ProductLaunchInformationData);
                param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                connection.Query("Upload_NPDLM_ProductLaunchInformationData", param, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
            }

        }

        public IEnumerable<NPDLMMyApprovalPending> GetMyApprovalPendingData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var result = con.Query<NPDLMMyApprovalPending>("GetNPDLMmyApprovalPendingData", commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<NPDLMMyApprovalPending> GetMyapprovalPendingHeaderData(string division, string category, string productGroup, string subCategory)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", division);
                    p.Add("@Category", category);
                    p.Add("@ProductGroup", productGroup);
                    p.Add("@SubCategory", subCategory);
                    var result = con.Query<NPDLMMyApprovalPending>("GetNPDLMmyApprovalPendingData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }


        public Tuple<string, string> InsertMyApprovalPendingData(NPDLaunchMaster MyApprovalData)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@MyApprovalData", MyApprovalData.SaveMyApprovalData);
                    param.Add("@RejectRemarks", MyApprovalData.RejectRemarks);
                    param.Add("@Username", MyApprovalData.UserName);
                    param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);


                    connection.Query("Update_NPDLM_MyApprovalPendingData", param, commandType: CommandType.StoredProcedure);
                    return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public Tuple<string, string> UploadNpdListData(NPDLaunchMaster npdLM)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("UserName", npdLM.UserName);
                param.Add("NpdListData", npdLM.NpdListData);
                param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                connection.Query("Upload_NPDLM_NpdListData", param, commandType: CommandType.StoredProcedure);
                return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
            }

        }

        public NPDLaunchMaster GetOtherMasterInfoBySubCateg(string subCategory, string ProductGroup)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    NPDLaunchMaster npd = new NPDLaunchMaster();

                    param.Add("SubCategory", subCategory);
                    param.Add("ProductGroup", ProductGroup);
                    using (var reader = con.QueryMultiple("GetOtherMasterInfoBySubCateg", new { SubCategory = subCategory, ProductGroup = ProductGroup }, commandType: CommandType.StoredProcedure))
                    {
                        npd.NPDDivisionInfo = reader.Read<DivisionInfo>().ToList();
                        npd.NPDCategoryInfo = reader.Read<CategoryInfo>().ToList();
                        return npd;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<SubCategoryInfo> GetOtherMasterInfoByProductGroup(string ProductGroup)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();

                    param.Add("ProductGroup", ProductGroup);
                    var res = con.Query<SubCategoryInfo>("GetSubCategoryInfoByProductGroup", new { ProductGroup = ProductGroup }, commandType: CommandType.StoredProcedure);
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<dynamic> Excel_GetHeaderNames(string Page)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();

                    param.Add("ProductGroup", Page);
                    var res = con.Query<dynamic>("Excel_GetHeaderNames", new { Page = Page }, commandType: CommandType.StoredProcedure).ToList();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public (IEnumerable<dynamic> NPDDetails, string Message) Excel_NPDLMFileUpload(string LoginId, string JsonValue, string Country)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();

                    param.Add("LoginId", LoginId);
                    param.Add("JsonValue", JsonValue);
                    param.Add("Country", Country);
                    var result = con.QueryMultiple("Excel_NPDLMFileUpload", param, commandType: CommandType.StoredProcedure);
                    var NPDDetails = result.Read<dynamic>().ToList();
                    var message = result.ReadFirstOrDefault<string>();
                    return (NPDDetails, message);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public IEnumerable<NpdLaunchMasterHeaderData> GetIndiaNPDLaunchMasterHeaderData(string Division, string country, int IsFromExcel = 0)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@Division", Division);
                    p.Add("@Country", country);
                    p.Add("@IsFromExcel", IsFromExcel);
                    var result = con.Query<NpdLaunchMasterHeaderData>("GetIndiaNPDLaunchMasterHeaderData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<dynamic> GetMaterialModificationHistory(string MatCode)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@MatCode", MatCode);
                    var result = con.Query<dynamic>("GetNPDLMMaterialModificationHistory", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}