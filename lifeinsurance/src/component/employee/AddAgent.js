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
  const [data, setData] = useState([]);
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
  const [formErrors, setFormErrors] = useState({});
  const [employee, setEmployee] = useState();
  const [onDelete, setOnDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const getAgents = async () => {
    try {
      let response = await GetAllAgent(pageNumber, pageSize);
      if (response && response.data) {
        setData(response.data.content || []);
        setTotalRecord(response.headers["agent-count"] || 0);
        setTotalPage(Math.ceil((response.headers["agent-count"] || 0) / pageSize));
      }
    } catch (error) {
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

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required.";
    if (!formData.lastName) errors.lastName = "Last Name is required.";
    if (!formData.mobile) errors.mobile = "Mobile No is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.username) errors.username = "Username is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
    if (!formData.apartment) errors.apartment = "Apartment is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.state) errors.state = "State is required.";
    if (!formData.pinCode) errors.pinCode = "Pin Code is required.";

    const dob = new Date(formData.dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18) errors.dateOfBirth = "You must be at least 18 years old.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm(); // Validate on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { firstName, lastName, mobile, email, dateOfBirth, username, password, houseNo, apartment, city, pinCode, state } = formData;

      let response;
      if (id) {
        response = await EditAgentService({ id, ...formData });
        toast.success("Agent updated successfully!");
      } else {
        response = await SaveAgent(firstName, lastName, dateOfBirth, username, password, mobile, email, houseNo, apartment, city, pinCode, state);
        toast.success("Agent added successfully!");
      }

      setShowModal(false);
      getAgents(); // Refresh the agent list
    } catch (error) {
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

  const DeleteAgent = async (data) => {
    try {
      let response = await DeleteAgentService(data.id);
      setOnDelete(response);
      toast.success("Agent deleted successfully!");
    } catch (error) {
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
        <div className="row mb-3">
          <div className="col-2">
            <PageSizeSetter
              setPageSize={setPageSize}
              setTotalpage={setTotalPage}
              totalrecord={totalRecord}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
          </div>
          <div className="col-10 text-end">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add New Agent
            </Button>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{id ? "Update Agent" : "Add New Agent"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="shadow-lg p-4 rounded border border-warning" onSubmit={handleSubmit}>
              <div className="h3 mb-4 text-center">Profile Details</div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="firstName" className="form-label">First Name*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {formErrors.firstName && <div className="text-danger">{formErrors.firstName}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="lastName" className="form-label">Last Name*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {formErrors.lastName && <div className="text-danger">{formErrors.lastName}</div>}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="mobile" className="form-label">Mobile No*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {formErrors.mobile && <div className="text-danger">{formErrors.mobile}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="email" className="form-label">Email*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="username" className="form-label">Username*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {formErrors.username && <div className="text-danger">{formErrors.username}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="password" className="form-label">Password*</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth*</label>
                  <input
                    type="date"
                    className="form-control rounded-pill"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formErrors.dateOfBirth && <div className="text-danger">{formErrors.dateOfBirth}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="houseNo" className="form-label">House No*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="houseNo"
                    name="houseNo"
                    value={formData.houseNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="apartment" className="form-label">Apartment*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                  />
                  {formErrors.apartment && <div className="text-danger">{formErrors.apartment}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="city" className="form-label">City*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {formErrors.city && <div className="text-danger">{formErrors.city}</div>}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="state" className="form-label">State*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {formErrors.state && <div className="text-danger">{formErrors.state}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="pinCode" className="form-label">Pin Code*</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                  {formErrors.pinCode && <div className="text-danger">{formErrors.pinCode}</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary rounded-pill">
                {id ? "Update" : "Add"}
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <Table data={data} deleteAgent={DeleteAgent} updateAgent={updateAgent} />
        <PaginationApp totalPage={totalPage} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
};

export default AddAgent;
