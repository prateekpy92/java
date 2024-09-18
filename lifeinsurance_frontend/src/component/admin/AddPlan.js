import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddPlan(data) {

    data = data.data;

    console.log(data);

    const handleClose = () => data.setShow(false);
    const handleShow = () => data.setShow(true);

    const handleSubmit = () => {

        data.addPlanHandler();
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
                    <Modal.Title >Add New Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="p-2">
                        <div className='container'>
                            <div className='row'>
                                
                                <div className='col-12'>

                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="floatingPassword"
                                        value={data.planName}

                                        onChange={
                                            (e)=>{
                                                data.setPlanName(e.target.value)
                                            }
                                            
                                        }
                                        />
                                        <label for="floatingPassword">Plan Name</label>
                                    </div>
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
    );
}

export default AddPlan;