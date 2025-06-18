using iText.Html2pdf;
using iText.Kernel.Events;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.IO;

namespace Ideation
{
    public class PdfHeader
    {
        public static readonly string SRC = "../../../NPDImages/";

        public void ManipulatePdf(string htmlSource, string pdfDest)
        {
            Header headerHandler = new Header();
            Footer footerHandler = new Footer();

            using (FileStream outputStream = new FileStream(pdfDest, FileMode.Create))
            {
                using (PdfWriter writer = new PdfWriter(outputStream))
                {
                    using (PdfDocument pdfDocument = new PdfDocument(writer))
                    {
                        pdfDocument.AddEventHandler(PdfDocumentEvent.START_PAGE, headerHandler);
                        pdfDocument.AddEventHandler(PdfDocumentEvent.END_PAGE, footerHandler);

                        ConverterProperties converterProperties = new ConverterProperties().SetBaseUri(SRC);
                        HtmlConverter.ConvertToPdf(htmlSource, pdfDocument, converterProperties);
                    }
                }
            }

            int totalPages = footerHandler.GetTotalPages(pdfDest);

            using (FileStream outputStream = new FileStream(pdfDest, FileMode.Open))
            {
                using (PdfWriter writer = new PdfWriter(outputStream))
                {
                    using (PdfDocument pdfDocument = new PdfDocument(new PdfReader(outputStream), writer))
                    {
                        footerHandler.WriteTotal(pdfDocument, totalPages);
                    }
                }
            }
        }

        protected class Header : IEventHandler
        {
            public void HandleEvent(Event @event)
            {
                // Implement your header logic here
                // This method will be called for each page during PDF generation
            }
        }

        protected class Footer : IEventHandler
        {
            protected float x = 550;
            protected float y = 20;
            protected float descent = 3;
            private int totalPageCount;

            public void HandleEvent(Event @event)
            {
                PdfDocumentEvent docEvent = (PdfDocumentEvent)@event;
                PdfDocument pdf = docEvent.GetDocument();
                PdfPage page = docEvent.GetPage();
                int pageNumber = pdf.GetPageNumber(page);
                Rectangle pageSize = page.GetPageSize();

                PdfCanvas pdfCanvas = new PdfCanvas(page.NewContentStreamBefore(), page.GetResources(), pdf);
                Canvas canvas = new Canvas(pdfCanvas, pageSize);

                //Paragraph p = new Paragraph()
                //    .Add("Page ")
                //    .Add(pageNumber.ToString())
                //    .Add(" of ")
                //   // .Add(totalPageCount.ToString())
                //    .SetTextAlignment(TextAlignment.RIGHT);

                //canvas.ShowTextAligned(p, x, y, TextAlignment.RIGHT);
                canvas.Close();
            }

            public int GetTotalPages(string pdfPath)
            {
                using (PdfDocument pdfDocument = new PdfDocument(new PdfReader(pdfPath)))
                {
                    return pdfDocument.GetNumberOfPages();
                }
            }

            public void WriteTotal(PdfDocument pdf, int totalPages)
            {
                totalPageCount = totalPages;

                for (int pageNumber = 1; pageNumber <= totalPages; pageNumber++)
                {
                    PdfPage page = pdf.GetPage(pageNumber);
                    Rectangle pageSize = page.GetPageSize();

                    PdfCanvas pdfCanvas = new PdfCanvas(page.NewContentStreamBefore(), page.GetResources(), pdf);
                    Canvas canvas = new Canvas(pdfCanvas, pageSize);

                    Paragraph p = new Paragraph()
                              .Add("Page ")
                              .Add(pageNumber.ToString())
                              .Add(" of ")
                              .Add(totalPageCount.ToString())
                              .SetTextAlignment(TextAlignment.RIGHT);

                    canvas.ShowTextAligned(p, x, y, TextAlignment.RIGHT);
                    canvas.Close();
                }

                PdfPage lastPage = pdf.GetLastPage();
                Rectangle lastPageSize = lastPage.GetPageSize();
                PdfCanvas lastPageCanvas = new PdfCanvas(lastPage.NewContentStreamAfter(), lastPage.GetResources(), pdf);
                Canvas lastPageFooterCanvas = new Canvas(lastPageCanvas, lastPageSize);

                Paragraph totalPageNumberParagraph = new Paragraph(totalPages.ToString())
                    .SetFixedLeading(12)
                    .SetTextAlignment(TextAlignment.LEFT);

                lastPageFooterCanvas.ShowTextAligned(totalPageNumberParagraph, 0, descent, TextAlignment.RIGHT);
                lastPageFooterCanvas.Close();
            }
        }
    }
}
