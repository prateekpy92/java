import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';



function EditAgent({firstName,lastName, mobile,email,dob,show,setFirstName,setLastName, setMobileNumber,setEmail,setDob,setShow,editAgentData}) {

    console.log("values are!!!!!!!!!!!!!!!!!!!!!!!",firstName,lastName,email,mobile)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    
    const handleSubmit=async()=>{
       
        
        editAgentData();
        
        setShow(false);
    
    }



    return (
        <>
            <button className='btn btn-outline-success me-2'
                onClick={handleShow}
            ><i class="bi bi-pencil-square me-1"></i>Edit Detail</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Edit Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="p-2">
                        <div className="mb-3">
                            <label className="form-label">FirstName</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={
                                    (e) => {setFirstName(e.target.value) }
                                }
                                value={firstName}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">LastName</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={
                                    (e) =>{
                                    setLastName(e.target.value)
                                    }
                                }

                                value={lastName}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mobile</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={(e) =>

                                    setMobileNumber(e.target.value)
                                }

                                value={mobile}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={(e) =>

                                    setEmail(e.target.value)
                                }

                                value={email}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">DateOfBirth</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={(e) =>

                                    setDob(e.target.value)
                                }

                                value={dob}
                            />
                        </div>
                        
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-secondary' onClick={handleClose}>Close</button>
                    <button className='btn btn-outline-primary' onClick={handleSubmit}>Update</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditAgent;