import React from 'react';
import axios from 'axios';

const AgentReport = ({ agentId, onDownloadSuccess }) => {
    const handleDownload = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/insuranceapp/generateReport/${agentId}`, {}, {
                
                responseType: 'blob', 
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'AgentReport.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            if (onDownloadSuccess) {
                onDownloadSuccess();
            }
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };
    

    return (
        <div>
            <button onClick={handleDownload} className='btn btn-primary'>
                Download Report
            </button>
        </div>
    );
};

export default AgentReport;
