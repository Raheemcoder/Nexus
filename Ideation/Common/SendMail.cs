using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using System.Net;
using System.Net.Mail;
using System.Configuration;
using Ideation.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Ideation.Common
{
    public class SendMail
    {
        public static void LogError(string controller, string action, Exception ex)
        {

            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { Controller = controller, Action = action, Exception = ex });

        }
        public static string SendEmailLocal(string Subject, string ToEMail, string CCEmail, string HtmlBodyWithSignature, MemoryStream ms, string fileName)
        {
            try
            {
                MailMessage mail = new MailMessage();

                SmtpClient SmtpServer = new SmtpClient("192.168.1.44");
                SmtpServer.Port = 25;
                mail.From = new MailAddress("ispace.alerts@himalayawellness.com");

                foreach (var item in ToEMail.Split(','))
                {
                    mail.To.Add(item);
                }

                mail.Subject = Subject;
                mail.Body = HtmlBodyWithSignature;

                string[] ccMailList = CCEmail.Split(';');
                foreach (string mailId in ccMailList)
                {
                    if (mailId != "")
                        mail.CC.Add(mailId);
                }

                string bcc = "tp046@himalayawellness.com;tp031@himalayawellness.com;tp006@himalayawellness.com;shankar.mb@himalayawellness.com";

                string[] bccMailList = bcc.Split(';');
                foreach (string mailId in bccMailList)
                {
                    if (mailId != "")
                        mail.Bcc.Add(mailId);
                }

                if (ms != null)
                {
                    Attachment attachment = new Attachment(ms, fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                    mail.Attachments.Add(attachment);
                }
                mail.IsBodyHtml = true;
                SmtpServer.Send(mail);

                return "Successfully Sent";
            }
            catch (Exception ex)
            {
                LogError("sendmail", "exception", new Exception(ex.ToString()));
                return ex.ToString();
            }
        }
    }
}