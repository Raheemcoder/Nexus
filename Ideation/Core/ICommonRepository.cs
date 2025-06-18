using Ideation.Models;

namespace Ideation.Core
{
    public interface ICommonRepository
    {
        public string SavePowerBILogsInformation(string reportId, string reportName, string loginId, string appName);

    }
}
