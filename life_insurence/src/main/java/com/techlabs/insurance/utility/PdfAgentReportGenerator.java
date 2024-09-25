package com.techlabs.insurance.utility;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.techlabs.insurance.dto.AgentReportDTO;
import com.techlabs.insurance.dto.ClaimReportDTO;
import com.techlabs.insurance.dto.CommissionReportDTO;

@Service
public class PdfAgentReportGenerator {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final DateTimeFormatter LOCAL_DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public ResponseEntity<byte[]> generatePdfReport(AgentReportDTO report) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        Document document = new Document(new com.itextpdf.kernel.pdf.PdfDocument(writer));

        
        document.add(new Paragraph("Agent Report"));
        document.add(new Paragraph("Agent Name: " + report.getAgentName()));
        document.add(new Paragraph("Phone: " + report.getPhone()));
        document.add(new Paragraph("Email: " + report.getEmail()));
        document.add(new Paragraph("Total Commission: " + report.getTotalCommission()));

        
        if (report.getCommissions() != null && !report.getCommissions().isEmpty()) {
            document.add(new Paragraph("\nCommissions:"));

            
            Table commissionTable = new Table(new float[]{1, 2, 2, 2});
            commissionTable.addCell(new Cell().add(new Paragraph("Commission ID")));
            commissionTable.addCell(new Cell().add(new Paragraph("Amount")));
            commissionTable.addCell(new Cell().add(new Paragraph("Date Earned")));
            commissionTable.addCell(new Cell().add(new Paragraph("Policy ID")));

            for (CommissionReportDTO commission : report.getCommissions()) {
                commissionTable.addCell(new Cell().add(new Paragraph(String.valueOf(commission.getCommissionId()))));
                commissionTable.addCell(new Cell().add(new Paragraph(String.valueOf(commission.getAmount()))));
                commissionTable.addCell(new Cell().add(new Paragraph(DATE_FORMAT.format(commission.getDateEarned())))); // Handling Date
                commissionTable.addCell(new Cell().add(new Paragraph(commission.getPolicyId())));
            }

            document.add(commissionTable);
        }

        // Check if the claims list is not empty and add to PDF
        if (report.getClaims() != null && !report.getClaims().isEmpty()) {
            document.add(new Paragraph("\nClaims:"));

            // Table for claims
            Table claimTable = new Table(new float[]{1, 2, 2, 2, 2});
            claimTable.addCell(new Cell().add(new Paragraph("Claim ID")));
            claimTable.addCell(new Cell().add(new Paragraph("Policy ID")));
            claimTable.addCell(new Cell().add(new Paragraph("Status")));
            claimTable.addCell(new Cell().add(new Paragraph("Date Filed")));
            claimTable.addCell(new Cell().add(new Paragraph("Claim Amount")));

            for (ClaimReportDTO claim : report.getClaims()) {
                claimTable.addCell(new Cell().add(new Paragraph(String.valueOf(claim.getClaimId()))));
                claimTable.addCell(new Cell().add(new Paragraph(claim.getPolicyId())));
                claimTable.addCell(new Cell().add(new Paragraph(claim.getClaimStatus())));
                claimTable.addCell(new Cell().add(new Paragraph(claim.getDateFiled().format(LOCAL_DATE_FORMATTER)))); // Handling LocalDate
                claimTable.addCell(new Cell().add(new Paragraph(String.valueOf(claim.getClaimAmount()))));
            }

            document.add(claimTable);
        }

        // Close the document
        document.close();

        // Prepare PDF response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "AgentReport.pdf");

        return ResponseEntity.ok().headers(headers).body(out.toByteArray());
    }
}
