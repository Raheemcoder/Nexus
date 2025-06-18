using Ideation.Models;
namespace Ideation.Core
{
    public interface IUserRepository
    {
        public int AddUser(User user, string LoggedUserId);
        public IEnumerable<User> GetUserlist();
        public IEnumerable<User> Userlist(string LoginId);
        public IEnumerable<CategoryMasters> GetCategory(int divisionId);
        public IEnumerable<Userinfo> GetUserNames();
        public IEnumerable<CategoryMasters> GetCategoriesBasedOnDivision(string divisionIDs);



    }
}
