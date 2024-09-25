// component/agent/AgentProfile.js
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { EditAgentService, AgentByUsername } from '../../services/agent/Agent';
import { emailRegex, mobileRegex, nameRegex } from "../../validation/Validation";
import { errorEmail, errorFirstname, errorLastname } from "../../validation/ErrorMessage";
import profile from "../../images/profile.webp";

const AgentProfile = () => {
    const [id, setId] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [msg, setMsg] = useState("");

    const getAgentData = async () => {
        try {
            const username = localStorage.getItem('username');
            if (!username) throw new Error("No username found in localStorage");

            const response = await AgentByUsername(username);
            if (response.status === 200) {
                setId(response.data.id);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setMobileNumber(response.data.mobileNumber);
                setDateOfBirth(response.data.dateOfBirth);
                setEmail(response.data.email);
            } else {
                throw new Error(`Failed to fetch data, status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to fetch agent data:", error.response ? error.response.data : error.message);
            setMsg("Failed to fetch agent data. Please check your credentials and try again.");
        }
    };

    const data = {
        id,
        firstName,
        lastName,
        dateOfBirth,
        mobile: mobileNumber,
        email
    };

    const editAgentProfiledata = async () => {
        try {
            let response = await EditAgentService(data);
            if (response.status === 200) {
                alert("Updated successfully");
            } else {
                throw new Error(`Failed to update data, status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update agent data:", error.response ? error.response.data : error.message);
            alert("Some issue occurred while updating. Please check your credentials and try again.");
        }
    };

    useEffect(() => {
        getAgentData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container rounded">
                <div className="row offset-1 justify-content-between">
                    <div className="col-md-3 border-right bg-white">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="220px"
                                src={profile}
                                alt="Profile"
                            />
                            <span className="font-weight-bold">{firstName + " " + lastName}</span>
                            <span className="text-black-50">{email}</span>
                        </div>
                    </div>
                    <div className="col-8 border-right bg-white">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Details</h4>
                            </div>
                            <div className="text-danger text-center">{msg}</div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">FirstName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            if (!nameRegex.test(e.target.value)) {
                                                setMsg(errorFirstname);
                                            } else {
                                                setMsg("");
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">LastName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        placeholder="Last name"
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            if (!nameRegex.test(e.target.value)) {
                                                setMsg(errorLastname);
                                            } else {
                                                setMsg("");
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label className="labels">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (!emailRegex.test(e.target.value)) {
                                                setMsg(errorEmail);
                                            } else {
                                                setMsg("");
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Mobile</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Mobile"
                                        value={mobileNumber}
                                        onChange={(e) => {
                                            setMobileNumber(e.target.value);
                                            if (!mobileRegex.test(e.target.value)) {
                                                setMsg("Invalid mobile number"); // Update this to the correct message
                                            } else {
                                                setMsg("");
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">DOB</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="YYYY-MM-DD"
                                        value={dateOfBirth}
                                        onChange={(e) => {
                                            setDateOfBirth(e.target.value);
                                            // Adjust validation based on your needs
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 d-flex">
                                    <button
                                        className="btn btn-warning fw-bold"
                                        type="button"
                                        onClick={() => {
                                            getAgentData();
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="btn btn-primary px-3 fw-bold ms-3"
                                        type="button"
                                        onClick={() => {
                                            editAgentProfiledata();
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "30vh" }}></div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AgentProfile;
