import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { eightCharAlphanumericPasswordRegex, emailRegex, houseNoRegex, mobileRegex, nameRegex, pinRegex, salaryRegex } from '../../validation/Validation';
import { errorApartment, errorCity, errorEmail, errorFirstname, errorHouseNo, errorLastname, errorMobile, errorPassword, errorPin, errorSalary, errorState } from '../../validation/ErrorMessage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddEmployee({ data }) {
    const {
        show, setShow, firstName, setFirstName, mobileNumber, setMobileNumber,
        salary, setSalary, userName, setUsername, password, setPassword,
        state, setState, pincode, setPincode, lastName, setLastName, email, setEmail,
        dateOfBirth, setDateOfBirth, houseNo, setHouseNo, apartment, setApartment,
        city, setCity, addEmployeeHandler
    } = data;

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleSubmit = async () => {
        try {
            // Log the form data being sent to the backend
            const employeeData = {
                salary,
                username: userName,
                password,
                firstName,
                lastName,
                mobileNumber,
                email,
                dateOfBirth,
                houseNo,
                apartment,
                city,
                state,
                pincode: parseInt(pincode) // Ensuring pincode is passed as a number
            };

            console.log('Employee data:', employeeData); // Logging employee data for debugging

            // Sending the employee data to the backend
            await addEmployeeHandler(employeeData);

            // If successful, display success message
            toast.success('Employee added successfully!');
            setTimeout(() => {
                navigate('/all_employee'); // Redirect to 'all_employee' after success
            }, 1000);

        } catch (error) {
            // Log the error for debugging
            console.error('Error adding employee:', error.response); // Log the detailed error
            toast.error('Failed to add employee.');
        } finally {
            setShow(false);
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <div className="text-danger text-center fw-bold">{msg}</div>
                <Modal.Body>
                    <form className="p-2">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6'>
                                    {/* First Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="firstName"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                if (!nameRegex.test(e.target.value)) {
                                                    setMsg(errorFirstname);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="mobileNumber"
                                            placeholder="Mobile Number"
                                            value={mobileNumber}
                                            onChange={(e) => {
                                                setMobileNumber(e.target.value);
                                                if (!mobileRegex.test(e.target.value)) {
                                                    setMsg(errorMobile);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="mobileNumber">Mobile Number</label>
                                    </div>

                                    {/* Salary */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="number"
                                            className="form-control rounded-pill"
                                            id="salary"
                                            placeholder="Salary"
                                            value={salary}
                                            onChange={(e) => {
                                                setSalary(e.target.value);
                                                if (!salaryRegex.test(e.target.value)) {
                                                    setMsg(errorSalary);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="salary">Salary</label>
                                    </div>

                                    {/* Username */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="userName"
                                            placeholder="Username"
                                            value={userName}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <label htmlFor="userName">Username</label>
                                    </div>

                                    {/* Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control rounded-pill"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                if (!eightCharAlphanumericPasswordRegex.test(e.target.value)) {
                                                    setMsg(errorPassword);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>

                                    {/* State */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="state"
                                            placeholder="State"
                                            value={state}
                                            onChange={(e) => {
                                                setState(e.target.value);
                                                if (!nameRegex.test(e.target.value)) {
                                                    setMsg(errorState);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="state">State</label>
                                    </div>

                                    {/* Pincode */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="pincode"
                                            placeholder="Pincode"
                                            value={pincode}
                                            onChange={(e) => {
                                                setPincode(e.target.value);
                                                if (!pinRegex.test(e.target.value)) {
                                                    setMsg(errorPin);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="pincode">Pincode</label>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    {/* Last Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="lastName"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                if (!nameRegex.test(e.target.value)) {
                                                    setMsg(errorLastname);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>

                                    {/* Email */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control rounded-pill"
                                            id="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (!emailRegex.test(e.target.value)) {
                                                    setMsg(errorEmail);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="email">Email Address</label>
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control rounded-pill"
                                            id="dateOfBirth"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                                    </div>

                                    {/* House Number */}
                                    <div className="form-floating mb-4">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="houseNo"
                                            placeholder="House Number"
                                            value={houseNo}
                                            onChange={(e) => {
                                                setHouseNo(e.target.value);
                                                if (!houseNoRegex.test(e.target.value)) {
                                                    setMsg(errorHouseNo);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="houseNo">House Number</label>
                                    </div>

                                    {/* Apartment */}
                                    <div className="form-floating mb-4">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="apartment"
                                            placeholder="Apartment"
                                            value={apartment}
                                            onChange={(e) => {
                                                setApartment(e.target.value);
                                                if (!houseNoRegex.test(e.target.value)) {
                                                    setMsg(errorApartment);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="apartment">Apartment</label>
                                    </div>

                                    {/* City */}
                                    <div className="form-floating mb-2">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            id="city"
                                            placeholder="City"
                                            value={city}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                                if (!nameRegex.test(e.target.value)) {
                                                    setMsg(errorCity);
                                                } else {
                                                    setMsg('');
                                                }
                                            }}
                                        />
                                        <label htmlFor="city">City</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    <Button variant="outline-primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default AddEmployee;
