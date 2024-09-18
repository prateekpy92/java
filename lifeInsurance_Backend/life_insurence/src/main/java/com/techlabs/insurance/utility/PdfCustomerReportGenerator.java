//package com.techlabs.insurance.utility;
//
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//
//import org.springframework.stereotype.Component;
//
//import com.lowagie.text.Document;
//import com.lowagie.text.DocumentException;
//import com.lowagie.text.Font;
//import com.lowagie.text.FontFactory;
//import com.lowagie.text.PageSize;
//import com.lowagie.text.Paragraph;
//import com.lowagie.text.Phrase;
//import com.lowagie.text.pdf.CMYKColor;
//import com.lowagie.text.pdf.PdfPCell;
//import com.lowagie.text.pdf.PdfPTable;
//import com.lowagie.text.pdf.PdfWriter;
//import com.techlabs.insurance.dto.CustomerReportDTO;
//import com.techlabs.insurance.dto.PolicyReportDTO;
//
//import jakarta.servlet.http.HttpServletResponse;
//@Component
//public class PdfCustomerReportGenerator {
//
//    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
//
//    public void generate(CustomerReportDTO customerReport, HttpServletResponse response) throws DocumentException, IOException {
//        // Set response headers
//        response.setContentType("application/pdf");
//        response.setHeader("Content-Disposition", "attachment; filename=customer_report.pdf");
//
//        Document document = new Document(PageSize.A4);
//        PdfWriter.getInstance(document, response.getOutputStream());
//        document.open();
//
//        // Title
//        Font titleFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 20, Font.BOLD, new CMYKColor(0, 100, 100, 0));
//        Paragraph title = new Paragraph("Customer Report", titleFont);
//        title.setAlignment(Paragraph.ALIGN_CENTER);
//        document.add(title);
//
//        // Customer Info
//        Font infoFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12);
//        document.add(new Paragraph("Customer Name: " + customerReport.getCustomerName(), infoFont));
//        document.add(new Paragraph("Phone: " + customerReport.getPhone(), infoFont));
//        document.add(new Paragraph("Email: " + customerReport.getEmail(), infoFont));
//        document.add(new Paragraph("City: " + customerReport.getCity() + ", " + customerReport.getState(), infoFont));
//
//        // Policies Table
//        PdfPTable table = new PdfPTable(5);
//        table.setWidthPercentage(100);
//        table.setWidths(new int[]{2, 2, 2, 2, 2});
//        table.setSpacingBefore(10);
//
//        // Header
//        PdfPCell headerCell = new PdfPCell();
//        headerCell.setBackgroundColor(new CMYKColor(0, 0, 100, 0));
//        headerCell.setPadding(5);
//        Font headerFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, Font.BOLD, CMYKColor.WHITE);
//
//        headerCell.setPhrase(new Phrase("Policy ID", headerFont));
//        table.addCell(headerCell);
//        headerCell.setPhrase(new Phrase("Policy Name", headerFont));
//        table.addCell(headerCell);
//        headerCell.setPhrase(new Phrase("Premium Amount", headerFont));
//        table.addCell(headerCell);
//        headerCell.setPhrase(new Phrase("Sum Assured", headerFont));
//        table.addCell(headerCell);
//        headerCell.setPhrase(new Phrase("Maturity Date", headerFont));
//        table.addCell(headerCell);
//
//        // Data
//        for (PolicyReportDTO policy : customerReport.getPolicies()) {
//            table.addCell(String.valueOf(policy.getPolicyId()));
//            table.addCell(policy.getPolicyName());
//            table.addCell(String.valueOf(policy.getPremiumAmount()));
//            table.addCell(String.valueOf(policy.getSumAssured()));
//            table.addCell(DATE_FORMAT.format(policy.getMaturityDate()));
//        }
//
//        document.add(table);
//        document.close();
//    }
//}
