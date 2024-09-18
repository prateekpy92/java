import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

function AddPayment(data) {

   const [paymentType, setPaymentType] = useState(data.paymentType);
   const [paymentId, setPaymentId] = useState(data.paymentId);
   const [amount, setAmount] = useState(data.amount);
    const [account, setAccount] = useState(data.account);

    data=data.data

    console.log("addpaymentData>>>>>>>>>>>>>>>>>>>>><<<<<<< ",data);

    const handleClose = () => data.setShow(false);
    const handleShow = () => data.setShow(true);

    const handleSubmit = () => {

        data.payInHandler();
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
                    <Modal.Title >Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form className="p-2">
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
               
                <select
                    className="form-select py-3 mb-3 rounded-pill"
                    id="paymentType"
                    value={data.paymentType}
                    onChange={(e) => {
                        data.setPaymentType(e.target.value);
                    }}
                >
                    <option defaultValue>Choose Payment Type</option>
                    <option value="CREDIT_CARD">CREDIT_CARD</option>
                    <option value="DEBIT_CARD">DEBIT_CARD</option>
                </select>
            </div>


            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="amount"
                    placeholder="Enter Amount"
                    value={data.amount}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Enter Card Number"
                    value={data.cardNumber}
                    onChange={(e) => {
                        data.setCardNumber(e.target.value);
                    }}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Enter CVV"
                    value={data.cvv}
                    onChange={(e) => {
                        data.setCvv(e.target.value);
                    }}
                />
            </div>
            <div className='col-12 mt-3'>
                <input
                    type="text"
                    className="form-control rounded-pill py-3 mb-3"
                    id="paymentId"
                    placeholder="Enter Expiry"
                    value={data.expiry}
                    onChange={(e) => {
                        data.setExpiry(e.target.value);
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

export default AddPayment;