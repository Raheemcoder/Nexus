using Ideation.Models;

namespace Ideation.Core
{
    public interface IIdeationRepository
    {
        public IQueryable<IdeationList> GetIdeation(string StartDate, string EndDate, string BusinessDivisionId, string PlatformTypeId, string GeographicId, string StatusId, string LoginId, string role);
        public IdeationModalData GetIdeationById(int InnovationId);
        public IEnumerable<IdeationModalData> GetIdeationByRemarks(int InnovationId);
        public int IdeationStatusUpdate(IdeationStatus idstat);
        public IEnumerable<IdeationModalData> GetRemarkDes(int RemarkId);
    }
}
