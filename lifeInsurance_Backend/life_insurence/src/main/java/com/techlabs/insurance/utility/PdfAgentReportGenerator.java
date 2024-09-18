package com.techlabs.insurance.utility;

import java.io.IOException;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.techlabs.insurance.dto.AgentReportDTO;
import com.techlabs.insurance.dto.ClaimReportDTO;
import com.techlabs.insurance.dto.CommissionReportDTO;

import io.swagger.v3.oas.annotations.servers.Server;
import jakarta.servlet.http.HttpServletResponse;
@Service
public class PdfAgentReportGenerator {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    public void generate(AgentReportDTO agentReport, HttpServletResponse response) throws DocumentException, IOException {
        // Set response headers
        response.setContentType("application/pdf");
//        response.setHeader("Content-Disposition", "attachment; filename=agent_report.pdf");

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // Title
        Font titleFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 20, Font.BOLD, new CMYKColor(0, 100, 100, 0));
        Paragraph title = new Paragraph("Agent Report", titleFont);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        // Agent Info
        Font infoFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12);
        document.add(new Paragraph("Agent Name: " + agentReport.getAgentName(), infoFont));
        document.add(new Paragraph("Phone: " + agentReport.getPhone(), infoFont));
        document.add(new Paragraph("Email: " + agentReport.getEmail(), infoFont));
        document.add(new Paragraph("Region: " + agentReport.getRegion(), infoFont));
        document.add(new Paragraph("Total Commission: $" + agentReport.getTotalCommission(), infoFont));

        // Commissions Table
        PdfPTable commissionTable = new PdfPTable(3);
        commissionTable.setWidthPercentage(100);
        commissionTable.setWidths(new int[]{2, 2, 2});
        commissionTable.setSpacingBefore(10);

        PdfPCell headerCell = new PdfPCell();
        headerCell.setBackgroundColor(new CMYKColor(0, 0, 100, 0));
        headerCell.setPadding(5);
        Font headerFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, Font.BOLD, CMYKColor.WHITE);

        headerCell.setPhrase(new Phrase("Commission ID", headerFont));
        commissionTable.addCell(headerCell);
        headerCell.setPhrase(new Phrase("Amount", headerFont));
        commissionTable.addCell(headerCell);
        headerCell.setPhrase(new Phrase("Date Earned", headerFont));
        commissionTable.addCell(headerCell);

        for (CommissionReportDTO commission : agentReport.getCommissions()) {
            commissionTable.addCell(String.valueOf(commission.getCommissionId()));
            commissionTable.addCell(String.valueOf(commission.getAmount()));
            commissionTable.addCell(DATE_FORMAT.format(commission.getDateEarned()));
        }

        document.add(new Paragraph("Commissions:", FontFactory.getFont(FontFactory.TIMES_ROMAN, 14, Font.BOLD)));
        document.add(commissionTable);

        // Claims Table
        PdfPTable claimTable = new PdfPTable(3);
        claimTable.setWidthPercentage(100);
        claimTable.setWidths(new int[]{2, 2, 2});
        claimTable.setSpacingBefore(10);

        PdfPCell claimHeaderCell = new PdfPCell();
        claimHeaderCell.setBackgroundColor(new CMYKColor(0, 0, 100, 0));
        claimHeaderCell.setPadding(5);
        Font claimHeaderFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, Font.BOLD, CMYKColor.WHITE);

        claimHeaderCell.setPhrase(new Phrase("Claim ID", claimHeaderFont));
        claimTable.addCell(claimHeaderCell);
        claimHeaderCell.setPhrase(new Phrase("Amount", claimHeaderFont));
        claimTable.addCell(claimHeaderCell);
        claimHeaderCell.setPhrase(new Phrase("Status", claimHeaderFont));
        claimTable.addCell(claimHeaderCell);

        for (ClaimReportDTO claim : agentReport.getClaims()) {
            claimTable.addCell(String.valueOf(claim.getClaimId()));
            claimTable.addCell(String.valueOf(claim.getClaimAmount()));
            claimTable.addCell(claim.getClaimStatus());
        }

        document.add(new Paragraph("Claims:", FontFactory.getFont(FontFactory.TIMES_ROMAN, 14, Font.BOLD)));
        document.add(claimTable);

        document.close();
    }
}
