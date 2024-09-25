import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerCustomer } from '../../services/customer/CustomerService';
import { useNavigate } from 'react-router-dom'; 
import bgImg from '../../images/img1.jpg'; 

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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentDate = new Date();
    const dob = new Date(formData.dateOfBirth);

    switch (name) {
      case 'email':
        if (!emailPattern.test(value)) {
          newErrors.email = 'Invalid email format.';
        } else {
          delete newErrors.email;
        }
        break;

      case 'dateOfBirth':
        if (dob >= currentDate) {
          newErrors.dateOfBirth = 'Date of birth cannot be in the future.';
        } else {
          delete newErrors.dateOfBirth;
        }
        break;

      case 'username':
        const existingUsernames = ['user1', 'user2', 'user3'];
        if (existingUsernames.includes(value)) {
          newErrors.username = 'Username already taken.';
        } else {
          delete newErrors.username;
        }
        break;

      case 'password':
        if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters long.';
        } else {
          delete newErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert('Please correct the errors before submitting.');
      return;
    }
    try {
      const response = await registerCustomer(formData);
      console.log('Customer registration response:', response);
      alert('Customer registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error registering customer:', error);
      alert('Registration failed');
    }
  };

  return (
    <section style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      padding: '50px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px',
        padding: '30px'
      }}>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
            <span style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
              Register and enjoy the service
            </span>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.mobileNumber}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobileNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.dateOfBirth}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dateOfBirth}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <h4>Address Details</h4>

              <Form.Group className="mb-3">
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  type="text"
                  name="houseNumber"
                  value={formData.address.houseNumber}
                  onChange={handleAddressChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
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
    </section>
  );
};

export default CustomerRegistration;
