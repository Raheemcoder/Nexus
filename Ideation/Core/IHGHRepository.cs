using Ideation.Models;
using Ideation.Models;
namespace Ideation.Core
{ 
    public interface IHGHRepository
    {
        #region HGHCode
        public (IEnumerable<dynamic> ProjectValue, string FromDate, string ToDate) GetHGHCodeMasterData(string LoginId, string Role);
        public IEnumerable<dynamic> GetHGHCodeList(string LoginId, string Role, string ProjectId, string FromDate, string ToDate);
        public (IEnumerable<dynamic> ProjectDetails, IEnumerable<dynamic> BusinesInfo, string HGHCode, string IsPresent, IEnumerable<dynamic> ExsistingHGHCode) HGH_GetProjectInfo(string ProjectId, string LoginId, string Role, string ProjectName, string HGHId);
        public Tuple<string, string> InsertHGHdata(string HGHCode, string ProjectId, string Remarks, string Action, string LoginId, string HGHId);

        public IEnumerable<dynamic> GetHGHCodeHistory(string ProjectId, string HGHId, string LoginId);

        public Tuple<string, string> DeleteHGHdata(string HGHId, string ProjectId, string LoginId);
        public Tuple<string, string> HGHSapRetry(string ProjectId, string LoginId);
        public IEnumerable<SAPresponse> GetSAPFailedInfo(string ReqNo, string Page);
        #endregion
    }
}
