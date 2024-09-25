import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function AddPayment({ data = {} }) {
    const {
        show = false,
        paymentType = '',
        cardNumber = '',
        cvv = '',
        expiry = '',
        amount = '',
        setShow = () => {},
        setPaymentType = () => {},
        setCardNumber = () => {},
        setCvv = () => {},
        setExpiry = () => {},
        setAmount = () => {}, // Add setAmount here
        payInHandler = () => {}
    } = data;

    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        payInHandler();
        setShow(false);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="p-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <select
                                    className="form-select py-3 mb-3 rounded-pill"
                                    id="paymentType"
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                >
                                    <option defaultValue>Choose Payment Type</option>
                                    <option value="CREDIT_CARD">CREDIT_CARD</option>
                                    <option value="DEBIT_CARD">DEBIT_CARD</option>
                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <input
                                    type="text"
                                    className="form-control rounded-pill py-3 mb-3"
                                    id="amount"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} // Use setAmount to update amount
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <input
                                    type="text"
                                    className="form-control rounded-pill py-3 mb-3"
                                    id="paymentId"
                                    placeholder="Enter Card Number"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <input
                                    type="text"
                                    className="form-control rounded-pill py-3 mb-3"
                                    id="cvv"
                                    placeholder="Enter CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <input
                                    type="text"
                                    className="form-control rounded-pill py-3 mb-3"
                                    id="expiry"
                                    placeholder="Enter Expiry"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={handleClose}>
                    Close
                </button>
                <button className="btn btn-outline-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddPayment;
