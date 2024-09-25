const express = require('express');
const PDFDocument = require('pdfkit');
const path = require('path');
const app = express();
const PORT = 8081;

app.post('/generateReport/:agentId', (req, res) => {
    const doc = new PDFDocument();

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=AgentReport.pdf');

    // Construct the logo path
    const logoPath = path.join('C:/Users/hp/Downloads/istockphoto-887059364-612x612.jpg');

    // Add a logo
    doc.image(logoPath, 50, 50, { width: 100 });

    // Add title and content
    doc.fontSize(25).text('Agent Report', 100, 80);
    doc.fontSize(12).text(`Report for Agent ID: ${req.params.agentId}`, 100, 120);
    doc.text('This is a sample report content...', 100, 160);

    // Finalize PDF and send it
    doc.pipe(res);
    doc.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
