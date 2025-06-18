using Ideation.Models;

namespace Ideation.Core
{
    public interface IInnovationRepository
    {
        public int AddInnovation(Innovation innovation,string empId,string fileName);
        public IEnumerable<Innovation> GetUniqueNo();

		public IEnumerable<Innovation> GetInnovation(string empid);
        public IEnumerable<Innovation> GetPendingInnovation(string empid);
        public IEnumerable<Innovation> GetInnovationDetails(int innovationId);

        public Innovation GetIdeationById(int InnovationId);

        public int UpdateInnovationDetails(InnovationStats innovation, string fileName);
        public IEnumerable<Innovation> IdeationGetList();
        public IEnumerable<Innovation> GetSearchedData(string startdate, string enddate, int platformdomainid, int platformtype, int geographicscope, int status);

    }
}
