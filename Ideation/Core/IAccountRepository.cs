using Ideation.Models;

namespace Ideation.Core
{
    public interface IAccountRepository
    {
        public string GetAccounts(Account account);
        public int GetUserAccount(Account account);
        public Accountinfo GetPBAuthenticationDetails(string UserName);
        public Accountinfo GetPrototypeAuthenticationDetails(string UserName,string PageName);
        public Accountinfo GetEPPMAuthenticationDetails(string UserName,string PageName);
        public IEnumerable<AppMappingDetails> GetAppMappingDetails(string LoginId);
        public string GetUserBasedApplicationDetails(string UserName);
        void InsertLogOffInfo(string UserName);
        public int GetPageAccess(string PageName,string Role);
    }
}
