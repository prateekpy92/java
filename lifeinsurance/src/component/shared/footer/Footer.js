import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is included

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} lg={3} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-4">LifeInSurance</h6>
            <p className="mb-0">
              "Guardians of Your Peace, Shielding Your Tomorrow."
            </p>
          </Col>

          <Col md={4} lg={3} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Plans</a></li>
              <li><a href="#!" className="text-light text-decoration-none">About Us</a></li>
            </ul>
          </Col>

          <Col md={4} lg={3} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <ul className="list-unstyled">
              <li><i className="fas fa-home me-2"></i> Hyderabad</li>
              <li><i className="fas fa-envelope me-2"></i> prateekpy92@gmail.com</li>
              <li><i className="fas fa-phone me-2"></i> +91 8618564721</li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mt-4">
            <div style={{
              backgroundColor: '#DFB722', /* Background color for the copyright section */
              padding: '10px 0', /* Padding for better spacing */
              borderRadius: '5px' /* Optional: Rounded corners */
            }}>
              <p className="mb-0 text-muted">2024 © LifeInSurance</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
