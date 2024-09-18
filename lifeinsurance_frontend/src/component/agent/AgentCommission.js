import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { agentClaim, getAgentDetail } from '../../services/agent/Agent';
import { successAlet, warningAlert } from '../alerts/Alert';
import AgentClaim from './AgentClaim';

function AgentCommission() {
    const [commissions, setCommissions] = useState([]);
    const [earning, setEarning] = useState(0);
    const [claim, setClaim] = useState(0);
    const [claims, setClaims] = useState([]);

    const [claimAmount, setClaimAmount] = useState('');
    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [show, setShow] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const claimHandler = async () => {
        const data = {
            username: localStorage.getItem('username'),
            claimAmount,
            bankName,
            branchName,
            ifscCode,
            accountNumber
        };

        try {
            if (parseFloat(claimAmount) > earning) {
                warningAlert("Claim amount should be less than earning");
            } else {
                const response = await agentClaim(data);
                if (response) {
                    successAlet("Claim submitted successfully");
                    setResponseData(response);
                }
            }
        } catch (error) {
            warningAlert("Claim submission failed");
        }
    };

    const data = {
        claimAmount, setClaimAmount,
        bankName, setBankName,
        branchName, setBranchName,
        ifscCode, setIfscCode,
        accountNumber, setAccountNumber,
        show, setShow,
        claimHandler
    };

    const getAgentData = async () => {
        try {
            const response = await getAgentDetail();
            console.log(response);
            if (response && response.data) {
                setCommissions(response.data.commissions || []);
                setEarning(response.data.totalCommission || 0);
                setClaims(response.data.claims || []);
                
                let x = 0;
                for (const c of (response.data.claims || [])) {
                    if (c.claimStatus === "APPROVED") {
                        x += c.claimAmount;
                    }
                }
                setClaim(x);
            } else {
                throw new Error("Unexpected response structure");
            }
        } catch (error) {
            console.error("Error fetching agent data:", error.response ? error.response.data.message : error.message);
            warningAlert(error.response ? error.response.data.message : "An error occurred while fetching agent data.");
        }
    };

    useEffect(() => {
        getAgentData();
    }, [responseData]);

    return (
        <div className='bg'>
            <Navbar />
            <AgentClaim data={data} />
            <div className='background2 text-center bg-dark display-3 py-3 text-white fw-bold'>Agent Commission</div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-danger fw-bold fs-4 my-5'>
                            Total Amount: {earning}
                        </div>
                    </div>
                    <div className='col-6 text-end'>
                        <button className='fw-bold px-3 btn btn-lg btn-success col-3 my-5'
                            onClick={() => setShow(true)}
                        >
                            Claim
                        </button>
                    </div>
                </div>
                <div>
                    <div className='text-center text-white bg-dark mb-5 fw-bold fs-3 my-5'>
                        COMMISSIONS
                    </div>
                    <table className="table table-bordered mb-5 table-info">
                        <thead>
                            <tr>
                                <th scope="col">COMMISSION ID</th>
                                <th scope="col">COMMISSION TYPE</th>
                                <th scope="col">ISSUE DATE</th>
                                <th scope="col">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commissions.map(commission => (
                                <tr key={commission.commisionId}>
                                    <th scope="row">{commission.commisionId}</th>
                                    <td>{commission.commisionType}</td>
                                    <td>{commission.issueDate?.substring(0, 10)}</td>
                                    <td>{commission.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {claims.length > 0 && (
                        <>
                            <div className='text-center text-white my-5 bg-dark fw-bold fs-3 mt-5'>
                                CLAIMS
                            </div>
                            <table className="table table-info table-bordered mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">CLAIM ID</th>
                                        <th scope="col">CLAIM STATUS</th>
                                        <th scope="col">ISSUE DATE</th>
                                        <th scope="col">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {claims.map(claim => (
                                        <tr key={claim.claimId}>
                                            <th scope="row">{claim.claimId}</th>
                                            <td>{claim.status}</td>
                                            <td>{claim.date?.substring(0, 10)}</td>
                                            <td>{claim.claimAmount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AgentCommission;
