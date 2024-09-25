import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

function Claim(data) {

    data=data.data

    console.log("addpaymentData>>>>>>>>>>>>>>>>>>>>><<<<<<< ",data);

    const handleClose = () => data.setShow(false);
    const handleShow = () => data.setShow(true);

    const handleSubmit = () => {

        data.applyclaim();
        data.setShow(false);
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
                    <Modal.Title >Policy Claim</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form className="p-2">
    <div className='container'>
        <div className='row'>
        <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Claim Amount"
                    value={data.claimAmount}
                    onChange={(e) => {
                        data.setClaimAmount(e.target.value);
                    }}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="amount"
                    placeholder="Enter BankName"
                    value={data.bankName}
                    onChange={(e) => {
                        data.setBankName(e.target.value);
                    }}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Enter Branch Name"
                    value={data.branchName}
                    onChange={(e) => {
                        data.setBranchName(e.target.value);
                    }}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Enter Account Number"
                    value={data.bankAccountNumber}
                    onChange={(e) => {
                        data.setAccountNo(e.target.value);
                    }}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Enter ifsc"
                    value={data.ifscCode}
                    onChange={(e) => {
                        data.setIfscCode(e.target.value);
                    }}
                />
            </div>
        </div>
    </div>

    
</form>


                </Modal.Body>
                <Modal.Footer>

                    <button className='btn btn-outline-secondary' onClick={handleClose}>Close</button>
                    <button className='btn btn-outline-primary' onClick={handleSubmit}>Submit</button>
                </Modal.Footer>
        </Modal>
     </>
  )
}

export default Claim;