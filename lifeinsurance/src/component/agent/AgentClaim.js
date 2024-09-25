// component/agent/AgentCommission.js
import React from 'react';
import { agentClaim } from '../../services/agent/Agent'; // Correct import

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AgentClaim(data) {
    data = data.data;

    const handleClose = () => data.setShow(false);
    const handleShow = () => data.setShow(true);

    const handleSubmit = async () => {
        try {
            await agentClaim({
              username:localStorage.getItem("username"),
                claimAmount: data.claimAmount,
                bankName: data.bankName,
                branchName: data.branchName,
                ifscCode: data.ifscCode,
                accountNumber: data.accountNumber
            });
            data.setShow(false);
        } catch (error) {
            console.error("Error submitting claim:", error);
        }
    }
    

    return (
        <>
            <Modal
                show={data.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>MonoSurance's Payment System</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group mb-3">
                            <label>Claim Amount</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={data.claimAmount}
                                onChange={(e) => data.setClaimAmount(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Bank Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={data.bankName}
                                onChange={(e) => data.setBankName(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Branch Name</label>
                            <input 
                                type="text" 
                                className="form-control"  
                                value={data.branchName}
                                onChange={(e) => data.setBranchName(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Ifsc Code</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={data.ifscCode}
                                onChange={(e) => data.setIfscCode(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Account Number</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={data.accountNumber}
                                onChange={(e) => data.setAccountNumber(e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-secondary' onClick={handleClose}>Close</Button>
                    <Button variant='outline-primary' onClick={handleSubmit}>Claim</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AgentClaim;
