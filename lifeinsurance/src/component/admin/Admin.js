import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

const Admin = () => {
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    const validateUser = () => {
        if (localStorage.getItem('auth') === null || localStorage.getItem('Role') !== 'ROLE_ADMIN') {
            alert("You are not logged in or not authorized.");
            navigate('/login');
        }
        setValid(true);
    }

    useEffect(() => {
        validateUser();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    }

    // Inline styles for smaller cards
    const cardStyle = {
        height: '150px', // Reduced height for smaller cards
        maxWidth: '250px', // Reduced maximum width for smaller cards
        margin: 'auto', // Center the card horizontally
        borderRadius: '10px', // Rounded corners for a smoother look
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
    };

    const cardBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%' // Ensure the card body takes the full height of the card
    };

    // Inline styles for button
    const buttonStyle = {
        borderRadius: '20px', // Rounded button corners
        padding: '6px 12px', // Adjust padding for a better fit
        fontSize: '14px' // Smaller font size for the button
    };

    return (
        <div>
            <Navbar />
            <Container fluid className='my-5'>
                <h1 className='text-center text-primary mb-5 fw-bold'>
                    Admin Dashboard
                </h1>
                <Row className='g-4'>
                    {[{
                        title: 'Employees',
                        path: '/all_employee',
                        description: 'Manage and view all employees'
                    }, {
                        title: 'Plans',
                        path: '/all_Plan',
                        description: 'Overview of available plans'
                    }, {
                        title: 'Schemes',
                        path: '/schemes',
                        description: 'Manage and view schemes'
                    }].map((item, index) => (
                        <Col lg={4} md={6} key={index}>
                            <Card style={cardStyle} className='border-0'>
                                <Card.Body style={cardBodyStyle}>
                                    <Card.Title className='text-center mb-2 fs-6 fw-semibold'>
                                        {item.title}
                                    </Card.Title>
                                    <Card.Text className='text-center mb-2 fs-6'>
                                        {item.description}
                                    </Card.Text>
                                    <Button
                                        variant='primary'
                                        size='sm' // Use the 'sm' size for a smaller button
                                        style={buttonStyle} // Apply custom button styles
                                        onClick={() => handleNavigation(item.path)}
                                    >
                                        View More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className='g-4 mt-4'>
                    {[{
                        title: 'Agents',
                        path: '/add_agent',
                        description: 'Add and manage agents'
                    }, {
                        title: 'Claims',
                        path: '/admin/claim_home',
                        description: 'Review and manage claims'
                    }, {
                        title: 'Accounts',
                        path: '/get_all_policy',
                        description: 'Overview of accounts and policies'
                    }].map((item, index) => (
                        <Col lg={4} md={6} key={index}>
                            <Card style={cardStyle} className='border-0'>
                                <Card.Body style={cardBodyStyle}>
                                    <Card.Title className='text-center mb-2 fs-6 fw-semibold'>
                                        {item.title}
                                    </Card.Title>
                                    <Card.Text className='text-center mb-2 fs-6'>
                                        {item.description}
                                    </Card.Text>
                                    <Button
                                        variant='primary'
                                        size='sm' // Use the 'sm' size for a smaller button
                                        style={buttonStyle} // Apply custom button styles
                                        onClick={() => handleNavigation(item.path)}
                                    >
                                        View More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default Admin;
