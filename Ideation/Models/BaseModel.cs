namespace Ideation.Models
{
    public class BaseModel
    {
        public string? ProjectId { get; set; }
        public string? JsonData { get; set; }
        public string? EncryptedLink { get; set; }
        public bool IsActive { get; set; }
        public long? LoginId { get; set; }
        public bool? IsEdit { get; set; }
        public bool? IsRead { get; set; }

    }
    public class ApprovalStages
    {
        public string? FromStageName { get; set; }
        public string? FromStage { get; set; }
        public string? ToStageName { get; set; }
        public string? ToStage { get; set; }
        public string? Remarks { get; set; }
        public string? RemarksBy { get; set; }
        public string? Date { get; set; }
    }
   public class SupportingDocument
   {
        public string DocumentName { get; set; }
        public string DocumentId { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedOn { get; set; }
        public string CreatedBy { get; set; }
        public string StatusId { get; set; }
        public string StatusName { get; set; }
    }

    public class PMDDateandRemarks
    {
        public string Remarks { get; set; }
        public string Date { get; set; }
        public string CreatedBy { get; set; }
        public string Createddate { get; set; }
    }

    public class DropdownData
    {
        public string Type { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public int Count {  get; set; }
    }
}