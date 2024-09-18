import React, { useEffect, useState } from 'react';
import { GetAllAgent, DeleteAgentService, EditAgentService, SaveAgent } from '../../services/agent/Agent';
import Table from '../shared/table/Table';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddAgent = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [agentData, setAgentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        dateOfBirth: "",
        username: "",
        password: "",
        houseNo: "",
        apartment: "",
        city: "",
        pinCode: "",
        state: ""
    });
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState("");

    const fetchAgents = async () => {
        try {
            const response = await GetAllAgent(pageNumber, pageSize);
            if (response && response.data) {
                setAgentData(response.data.content || []);
                setTotalPages(Math.ceil(parseInt(response.headers['agent-count']) / pageSize));
                setTotalElements(parseInt(response.headers['agent-count']));
            } else {
                console.error("Unexpected response format:", response);
            }
        } catch (error) {
            console.error("Error fetching agents:", error);
            toast.error("Failed to fetch agents.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await EditAgentService(editId, formData);
                toast.success("Agent updated successfully!");
            } else {
                await SaveAgent(formData);
                toast.success("Agent added successfully!");
            }
            fetchAgents(); // Refresh the agent list
            setShow(false); // Close the modal
        } catch (error) {
            console.error("Error saving agent:", error);
            toast.error("Failed to save agent.");
        }
    };

    const handleDelete = async (agentId) => {
        try {
            await DeleteAgentService(agentId);
            toast.success("Agent deleted successfully!");
            fetchAgents(); // Refresh the agent list
        } catch (error) {
            console.error("Error deleting agent:", error);
            toast.error("Failed to delete agent.");
        }
    };

    const handleUpdate = (agent) => {
        setFormData({
            firstName: agent.firstName,
            lastName: agent.lastName,
            mobile: agent.mobileNumber,
            email: agent.email,
            dateOfBirth: agent.dateOfBirth,
            houseNo: agent.houseNo,
            apartment: agent.apartment,
            city: agent.city,
            pinCode: agent.pinCode,
            state: agent.state
        });
        setEditId(agent.id);
        setEditMode(true);
        setShow(true);
    };

    useEffect(() => {
        fetchAgents();
    }, [pageNumber, pageSize]);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredData(agentData);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            setFilteredData(
                agentData.filter(agent =>
                    agent.firstName.toLowerCase().includes(lowercasedQuery) ||
                    agent.lastName.toLowerCase().includes(lowercasedQuery) ||
                    agent.email.toLowerCase().includes(lowercasedQuery) ||
                    agent.mobileNumber.includes(searchQuery)
                )
            );
        }
    }, [searchQuery, agentData]);

    return (
        <>
            <Navbar />
            {show && (
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit Agent" : "Add New Agent"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                            {/* Add more fields here similarly */}
                            <Button type="submit" className="btn btn-primary">{editMode ? "Update" : "Add"}</Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
            <div className='bg-primary text-center py-3 text-white fw-bold'>
                <h2>Agent Management</h2>
            </div>
            <div className='container mt-4'>
                <div className='row mb-4'>
                    <div className='col-md-4 mb-3 mb-md-0'>
                        <PaginationApp
                            totalpage={totalPages}
                            setpage={setPageNumber}
                            pageNumber={pageNumber}
                        />
                    </div>
                    <div className='col-md-4 mb-3 mb-md-0'>
                        <input
                            className='form-control'
                            placeholder='Search here'
                            aria-label='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='col-md-4'>
                        <PageSizeSetter
                            setPageSize={setPageSize}
                            setTotalpage={setTotalPages}
                            totalrecord={totalElements}
                            pageSize={pageSize}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <button
                        className='btn btn-primary fw-bold'
                        onClick={() => {
                            setFormData({
                                firstName: "",
                                lastName: "",
                                mobile: "",
                                email: "",
                                dateOfBirth: "",
                                username: "",
                                password: "",
                                houseNo: "",
                                apartment: "",
                                city: "",
                                pinCode: "",
                                state: ""
                            });
                            setEditMode(false);
                            setShow(true);
                        }}
                    >
                        Add New Agent
                    </button>
                </div>
                <Table
                    data={filteredData}
                    isDeleteButton={true}
                    isUpdateButton={true}
                    deleteFun={handleDelete}
                    UpdateFun={handleUpdate}
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAgent;
