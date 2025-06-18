using Ideation.Models;

namespace Ideation.Core
{
    public interface IDashBoardRepository
    {
        public IEnumerable<DashBoard> GetDashBoardData(string LoginId, string role);
        public IEnumerable<IdeationList> GetDashBoardStatus(string platform, string bussinessdivision, string statusname, string LoginId,string role);
    }
}
