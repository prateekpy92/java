import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerCustomer } from '../../services/customer/CustomerService';
import { useNavigate } from 'react-router-dom'; // For navigation

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    username: '',
    password: '',
    address: {
      houseNumber: '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    roles: ['ROLE_CUSTOMER']
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerCustomer(formData);
      console.log('Customer registration response:', response);
      alert('Customer registered successfully!');
    } catch (error) {
      console.error('Error registering customer:', error);
      alert('Registration failed');
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h3 className="text-center mb-4">Customer Registration</h3>

            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMobileNumber" className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDateOfBirth" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <h4 className="mt-4">Address Details</h4>

            <Form.Group controlId="formHouseNumber" className="mb-3">
              <Form.Label>House Number</Form.Label>
              <Form.Control
                type="text"
                name="houseNumber"
                value={formData.address.houseNumber}
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStreet" className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCity" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formState" className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPincode" className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.address.pincode}
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Register
            </Button>
            <Button variant="secondary" className="w-100" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerRegistration;
