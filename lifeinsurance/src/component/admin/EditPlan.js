import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function EditPlan(data) {
    // Destructure props from data
    data = data.data;

    const { editShow, setEditShow, planName, setPlanName, updatePlanHandler } = data;
    const [error, setError] = useState('');

    const handleClose = () => setEditShow(false);

    const handleSubmit = () => {
        // Regex for validation: only allows alphabets and spaces
        const regex = /^[a-zA-Z\s]+$/;

        if (!regex.test(planName)) {
            setError('Plan name should only contain alphabets and spaces.');
            return;
        }

        // Clear the error if validation passes
        setError('');

        // Call the handler to update the plan
        updatePlanHandler();

        // Close the modal
        setEditShow(false);
    };

    return (
        <>
            <Modal
                show={editShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="p-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPassword"
                                            value={planName}
                                            maxLength="100" // Restrict max length to 100 characters
                                            onChange={(e) => {
                                                setPlanName(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="floatingPassword">Plan Name</label>
                                    </div>
                                    {/* Show error if validation fails */}
                                    {error && <div className="text-danger">{error}</div>}
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-secondary" onClick={handleClose}>Close</button>
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditPlan;
