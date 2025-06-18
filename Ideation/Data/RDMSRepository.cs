using Dapper;
using Ideation.Core;
using Ideation.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
namespace Ideation.Data
{
    public class RDMSRepository : IRDMSRepository
    {
        public PlantMaster GetRDMSDropDownData()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    
                    var result = con.QueryMultiple("RDMS_GetDropDownData", commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    PlantMaster pb = new PlantMaster();

                    pb.PlantCodeData = result.Read<DropdownData>().ToList();
                    pb.StatusData = result.Read<DropdownData>().ToList();
                   
                    return pb;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public IEnumerable<PlantMaster> GetPlantList(string plantCode,int Status)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PlantCode", plantCode);
                    param.Add("@Status", Status);
                    return con.Query<PlantMaster>("RDMS_GetPlantList", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IEnumerable<PlantMaster> GetPlantListById(int plantId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@PlantId", plantId);
                    return con.Query<PlantMaster>("RDMS_GetPlantListById", param: param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public PlantMaster UpdatePlantStatus(int plantId, int Status, string userName)
        {
            using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                PlantMaster pb = new PlantMaster();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@PlantId", plantId);
                parameter.Add("@Status", Status);
                parameter.Add("@LoginId", userName);
                parameter.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                parameter.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                con.Query("[dbo].[RDMS_UpdatePlantStatus]", parameter, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                pb.OutMessage = parameter.Get<string>("@OutMessage");
                pb.StyleClass = parameter.Get<string>("@StyleClass");
                return pb;
            }
        }
        public IEnumerable<DropdownData> GetLicenseManagementMasterData(string LoginId, string Role)
        {
            IEnumerable<DropdownData> result = new List<DropdownData>();
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    p.Add("@Role", Role);
                    const string storedProcedure = "RDMS_GetLicenceMasterData";
                    result = con.Query<DropdownData>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("RDMSRepository", "GetLicenseManagementMasterData", e.Message);
            }
            return result;
        }
        public (IEnumerable<LicenseHeaderCollection> LicenseHeader,IEnumerable<dynamic> LicenseTypeCount) GetLicenseManagementListData
            (string LoginId, string Role, string Plant, string Status, string FromDate, string ToDate, string LicType,string LicenceType,string DocCategory)
        {
            (IEnumerable<LicenseHeaderCollection>?, IEnumerable<dynamic>?) result = (null,null);
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    p.Add("@Role", Role);
                    p.Add("@Plant", Plant);
                    p.Add("@Status", Status);
                    p.Add("@FromDate", FromDate);
                    p.Add("@ToDate", ToDate);
                    p.Add("@LicType", LicType);
                    p.Add("@LicenceType", LicenceType);
                    p.Add("@DocCategory", DocCategory);
                    const string storedProcedure = "RDMS_GetLicenseListData";
                    var data = con.QueryMultiple(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    var header = data.Read<LicenseHeaderCollection>().ToList();
                    var count = data.Read<dynamic>().ToList();
                    result = (header, count);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("RDMSRepository", "GetLicenseManagementListData", e.Message);
            }
            return result;
        }
        public IEnumerable<dynamic> GetLicensePopupData(string LoginId, string Role, int Type, string LicenseHeaderId, string Version,string CreatedOn,string DocId)
        {
            IEnumerable<dynamic> data = null;
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var p = new DynamicParameters();
                    p.Add("@LoginId", LoginId);
                    p.Add("@Role", Role);
                    p.Add("@Type", Type);
                    p.Add("@Version", Version);
                    p.Add("@LicenseHeaderId", LicenseHeaderId);
                    p.Add("@CreatedOn", CreatedOn);
                    p.Add("@DocId", DocId);
                    const string storedProcedure = "RDMS_GetLicenseListPopupData";
                    data = con.Query<dynamic>(storedProcedure, p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("RDMSRepository", "GetLicensePopupData", e.Message);
            }
            return data;
        }

        public Tuple<string, string> InsertRDMSData(string RequestedData, string Productgroup,string DeclarationData, string Remarks, string LoginId, string Action)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@RequestedData", RequestedData);
                    param.Add("@Productgroup", Productgroup);
                    param.Add("@DeclarationData", DeclarationData);
                    param.Add("@Remarks", Remarks);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Action", Action);
                    param.Add("@OutMessage", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@StyleClass", dbType: DbType.String, direction: ParameterDirection.Output, size: 20);
                    con.Execute("InsertRDMSData", param, commandType: CommandType.StoredProcedure, commandTimeout: CommonConstants.CommandTimeOut);
                    return new Tuple<string, string>(param.Get<string>("OutMessage"), param.Get<string>("StyleClass"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public (IEnumerable<LicenseHeaderData> LicenseHeaderData, IEnumerable<ProductGroupData> ProductGroup, IEnumerable<DeclarationData> DeclarationData)
            GetRDMSData(string LoginId, string LicenceHeaderId)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@LicenceHeaderId", LicenceHeaderId);
                    
                    var result = con.QueryMultiple("[dbo].[GetRDMSData]", param, commandTimeout: 1200, commandType: CommandType.StoredProcedure);

                    var LicenseHeaderData = result.Read<LicenseHeaderData>().ToList();
                    var ProductGroup = result.Read<ProductGroupData>().ToList();
                    var DeclarationData = result.Read<DeclarationData>().ToList();

                    return (LicenseHeaderData, ProductGroup, DeclarationData);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Tuple<string, string> DeleteProductGroup(string LicenceHeaderId, string Version, string DocumentId,string LoginId)
        {
            var result = "";
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LicenceHeaderId", LicenceHeaderId);
                    param.Add("@Version", Version);
                    param.Add("@DocumentId", DocumentId);
                    param.Add("@LoginId", LoginId);
                    param.Add("@Msg", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                    param.Add("@Msg_Class", dbType: DbType.String, direction: ParameterDirection.Output, size: 40);

                    con.Query("RDMS_DeleteProductGroup", param, commandType: CommandType.StoredProcedure);
                    return System.Tuple.Create(param.Get<string>("@Msg"), param.Get<string>("@Msg_Class"));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Tuple<string, string> DeleteLicense(string LoginId, string LicenseHeaderId)
        {
            Tuple<string, string>? result = null;
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LoginId", LoginId);
                    param.Add("@LicenseHeaderId", LicenseHeaderId);
                    param.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 200);
                    param.Add("@Messageclass", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                    con.Query("[dbo].[RDMS_DeleteLicense]", param, commandType: CommandType.StoredProcedure, commandTimeout: 600);
                    result = new Tuple<string, string>(param.Get<string>("@Message"), param.Get<string>("@Messageclass"));
                }
            }
            catch (Exception e)
            {
                new Logger().LogError("RDMSRepository", "DeleteLicense", e.Message);
                result = new Tuple<string, string>(e.Message, "text-danger");
            }
            return result;
        }
        public IEnumerable<RDMSExcelData> GetExcelData(string LicenseHeaderId,string Version,string Type)
        {
            IEnumerable<RDMSExcelData> result = null;
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    var param = new DynamicParameters();
                    param.Add("@LicenseHeaderId", LicenseHeaderId);
                    param.Add("@Version", Version);
                    param.Add("@Type",Type);
                    result = con.Query<RDMSExcelData>("[dbo].[RDMS_GetExcelData]", param, commandType: CommandType.StoredProcedure, commandTimeout: 600);

                }
            }
            catch (Exception e)
            {
                new Logger().LogError("RDMSRepository", "GetExcelData", e.Message);
            }
            return result;
        }
        public IEnumerable<DropdownData> GetDocumentType(string DocCategoryId)
        {
            using (IDbConnection connection = new SqlConnection(new ConnStrings().PBConnectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("DocCategoryId", DocCategoryId);
                var result = connection.Query<DropdownData>("RDMS_GetDocumentTypeBasedOnCategory", parameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<dynamic> GetProductGroupMaterialData(string Plant, string ProductGroup, string FromDate, string ToDate, string LicenceType, string Material)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(new ConnStrings().PBConnectionString))
                {
                    DynamicParameters p = new DynamicParameters();
                    p.Add("@Plant", Plant);
                    p.Add("@ProductGroup", ProductGroup);
                    p.Add("@FromDate", FromDate);
                    p.Add("@ToDate", ToDate);
                    p.Add("@LicenceType", LicenceType);
                    p.Add("@Material", Material);
                    return con.Query<dynamic>("RDMS_GetProductGroupMaterialData", p, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}