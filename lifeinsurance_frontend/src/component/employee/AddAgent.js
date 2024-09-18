import React, { useEffect, useState } from "react";
import Table from "../shared/table/Table";
import PaginationApp from "../shared/page/PaginationApp";
import { GetAllAgent, DeleteAgentService, EditAgentService, SaveAgent } from "../../services/agent/Agent";
import PageSizeSetter from "../shared/page/PageSizeSetter";
import Navbar from "../shared/navbar/Navbar";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AddAgent = () => {
  const [pageSize, setPageSize] = useState(3);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]); // Initialize as empty array
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
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
  const [employee, setEmployee] = useState();
  const [onDelete, setOnDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const getAgents = async () => {
    try {
      let response = await GetAllAgent(pageNumber, pageSize);
      if (response && response.data) {
        setData(response.data.content || []); // Ensure data is an array
        setTotalRecord(response.headers["agent-count"] || 0); // Default to 0 if undefined
        setTotalPage(Math.ceil((response.headers["agent-count"] || 0) / pageSize));
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    getAgents();
  }, [pageNumber, pageSize, employee, onDelete]);

  useEffect(() => {
    setPageNumber(0);
    getAgents();
  }, [pageSize]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response = await SaveAgent(formData);
      setEmployee(response);
      toast.success("Agent added successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving agent:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const updateAgent = (agent) => {
    setFormData({
      firstName: agent.firstName,
      lastName: agent.lastName,
      email: agent.email,
      mobile: agent.mobileNumber,
      dateOfBirth: agent.dateOfBirth,
      houseNo: agent.houseNo,
      apartment: agent.apartment,
      city: agent.city,
      pinCode: agent.pinCode,
      state: agent.state
    });
    setId(agent.id);
    setShowModal(true);
  };

  const EditAgent = async () => {
    try {
      let response = await EditAgentService({ id, ...formData });
      toast.success("Agent updated successfully!");
      setEmployee(response);
    } catch (error) {
      console.error("Error updating agent:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const DeleteAgent = async (data) => {
    try {
      let response = await DeleteAgentService(data.id);
      setOnDelete(response);
      toast.success("Agent deleted successfully!");
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="text-center text-dark m-5 fw-bold">
          <h1>Agent Management</h1>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Agent
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{id ? "Update Agent" : "Add New Agent"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="shadow-lg p-5 rounded-border border-warning text-dark" onSubmit={handleSubmit}>
              <div className="text-danger text-center fw-bold">{msg}</div>
              <div className="h3 mb-4">Profile Details</div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="firstName" className="form-label">
                    First Name*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="lastName" className="form-label">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="mobile" className="form-label">
                    Mobile No*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="email" className="form-label">
                    Email*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="username" className="form-label">
                    Username*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="password" className="form-label">
                    Password*
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date Of Birth*
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    min="1979-01"
                    max="2020-01"
                    className="form-control rounded-pill text-dark fw-bold"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>
              <div className="h3 mb-4">Address</div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="houseNo" className="form-label">
                    House No
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="houseNo"
                    value={formData.houseNo}
                    onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="apartment" className="form-label">
                    Apartment*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="apartment"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="city" className="form-label">
                    City*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="pinCode" className="form-label">
                    Pin Code*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label htmlFor="state" className="form-label">
                    State*
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill text-dark fw-bold"
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="btn btn-lg rounded-pill border border-warning"
              >
                {id ? "Update" : "Submit"}
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row mt-5">
          <div className="col-8 offset-1">
            <PaginationApp
              totalpage={totalPage}
              setpage={setPageNumber}
              pageNumber={pageNumber}
            />
          </div>
          <div className="col-2">
            <PageSizeSetter
              setPageSize={setPageSize}
              setTotalpage={setTotalPage}
              totalrecord={totalRecord}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>

        <div className="col-10 offset-1">
          <div className="text-center">
            <label htmlFor="agentDetails" className="form-label">
              <h1>Agent Details</h1>
            </label>
          </div>
          <div className="m-3 mb-5">
            <Table
              data={data || []} // Ensure data is an array
              isDeleteButton={true}
              isUpdateButton={true}
              deleteFun={DeleteAgent}
              UpdateFun={updateAgent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
