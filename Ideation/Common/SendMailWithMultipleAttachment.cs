using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.CodeAnalysis;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace Ideation.Common
{
    public class SendMailWithMultipleAttachment
    {
        public static void LogError(string controller, string action, Exception ex)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });
        }

        public static string SendMailWithMultipleAttachmentMethod(string ToEmail, string CCEmail, string BCCEmail, string Subject,
            string HtmlBodyWithSignature, List<(string FileName, MemoryStream ms)> fileStreams)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient();

                mail.IsBodyHtml = true;
                mail.Subject = Subject;
                mail.Body = HtmlBodyWithSignature;

                mail.To.Add(ToEmail);

                string[] ccMailList = CCEmail.Split(';');
                foreach (string mailId in ccMailList)
                {
                    if (mailId != "")
                        mail.CC.Add(mailId);
                }

                string[] bccMailList = BCCEmail.Split(';');
                foreach (string mailId in bccMailList)
                {
                    if (mailId != "")
                        mail.Bcc.Add(mailId);
                }

                if (fileStreams != null)
                {
                    foreach (var (fileName, stream) in fileStreams)
                    {
                        stream.Position = 0;
                        Attachment attachment = new Attachment(stream, fileName, "application/octet-stream");
                        mail.Attachments.Add(attachment);
                    }
                }

                //------------------------------------Other enviroment than Development
                SmtpServer.Host = "192.168.1.44";
                SmtpServer.Port = 25;
                mail.From = new MailAddress("ispace.alerts@himalayawellness.com");

                //------------------------------------testing - Development
                //SmtpServer.Host = "smtp.outlook.com";
                //NetworkCredential networkCredential = new NetworkCredential("Mail Id", "Pwd");
                //SmtpServer.EnableSsl = true; 
                //SmtpServer.Port = 587;
                //SmtpServer.UseDefaultCredentials = false;
                //SmtpServer.Credentials = networkCredential;
                //mail.From = new MailAddress("Mail Id", "Dev Test");

                SmtpServer.Send(mail);

                return "success";
            }
            catch (Exception ex)
            {
                LogError("SendMailWithMultipleAttachmentMethod", "exception", new Exception(ex.ToString()));
                return ex.ToString();
            }
        }
    }
}