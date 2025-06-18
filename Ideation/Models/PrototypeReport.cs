namespace Ideation.Models
{
    public class PrototypeReport
    {
        public string ProductName { get; set; }
        public string PrototypeNo { get; set; }
        public string Version { get; set; }
        public string ProjectNo { get; set; }
        public string HghCode { get; set; }
        public string ProvisionalClaim { get; set; }
        public string DosageForm { get; set; }
        public string FirstSubmissionDate { get; set; }
        public string FinalApproveDate { get; set; }
        public string NoOfDaysTaken { get; set; }
        public string ApprovedBatchNo { get; set; }
        public string NoOfSubmissions { get; set; }
        public string InitiatedBy { get; set; }
        public string ReviewdBy { get; set; }
        public string ApprovedBy { get; set; }
        public string? JsonString { get; set; }
       
        public IEnumerable<Headerdata> headerdata { get; set; }
        public IEnumerable<Stage2Data> stage2data { get; set; }
        public IEnumerable<Stage3Data> stage3data { get; set; }
        public IEnumerable<Stage5Data> stage5data { get; set; }
        public IEnumerable<stageHubdata> stagehubdata { get; set; }
        public IEnumerable<HubstatuList> hubstatuslist { get; set; }
        
      
        public string? stage3CreatedBy { get; set; }
        public string? stage4CreatedBy { get; set; }
    }
  
    public class Stage2Data
    {
        public string Stage2Createdby { get; set; }
        public string stage2 { get; set; }
        public string ApprovedDate2 { get; set; }
    }
    public class Stage3Data
    {
        public string Stage3Createdby { get; set; }
        public string stage3 { get; set; }
        public string ApprovedDate3 { get; set; }
    }
    public class stageHubdata
    {
        public string hubcreatedby { get; set; }
        public string hubnames { get; set; }
        public string ApprovedDatehub { get; set; }
    }
    public class Stage5Data
    {
        public string Stage5Createdby { get; set; }
        public string stage5 { get; set; }
        public string ApprovedDate5 { get; set; }
    }
    public class Headerdata
    {
        public string ProductName { get; set; }
        public string PrototypeNo { get; set; }
        public string Version { get; set; }
        public string ProjectNo { get; set; }
        public string HghCode { get; set; }
        public string ProvisionalClaim { get; set; }
        public string DosageForm { get; set; }
        public string FirstSubmissionDate { get; set; }
        public string FinalApproveDate { get; set; }
        public string NoOfDaysTaken { get; set; }
        public string ApprovedBatchNo { get; set; }
        public string NoOfSubmissions { get; set; }
        public string InitiatedBy { get; set; }
        public string ReviewdBy { get; set; }
        public string ApprovedBy { get; set; }
    }
    public class HubstatuList
    {
        public string HUBName { get; set; }    
    }
}

