using Ideation.Models;

namespace Ideation.Core
{
    public interface IRoleRepository
    {
        public int InsertUpdate(Role role, string UserId);
        public IEnumerable<Role> GetRolelist();
        public IEnumerable<Role> GetRoleListById(int RoleId);
        public IEnumerable<Menu> GetMenuListByRoleId(long RoleId);
        public IEnumerable<Menu> GetMenuListByRole(long RoleId,string AppName,string MenuType,string Role);
        public int UserMenu_InsertUpdateByRoleId(object xmlString, long RoleId, long LoginId);


    }
}
