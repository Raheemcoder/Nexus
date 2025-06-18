using Ideation.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ideation.Core
{
    public interface IKDSMasterRepository
    {
        //IEnumerable<SelectListItem> GetDropDownList(string Type);
        //IEnumerable<KDSMaster> GetList(string CompanyCode, long id);
        //int InsertUpdate(KDSMaster KDS, long UserId, string CompanyCode);
       public int Get_Sequence(string Type);
        long InsertUpdate(KDSMaster kds, string LoginId);
        KDSMaster GetList(int Id);
    }
}
