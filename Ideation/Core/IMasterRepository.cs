using Ideation.Models;

namespace Ideation.Core
{
    public interface IMasterRepository
    {
        public Masters GetMasters();
        public PBMasters GetPBMasters();
        public PBMasters GetKDSMasterData();
    }
}
