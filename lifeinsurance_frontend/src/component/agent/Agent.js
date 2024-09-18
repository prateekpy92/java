import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { useNavigate } from 'react-router-dom';

const Agent = () => {
    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '0.375rem',
        boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)',
        transition: 'transform 0.3s ease',
        padding: '1.5rem'
    };

    const cardBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem'
    };

    const cardTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '0.75rem'
    };

    const buttonStyle = {
        fontSize: '1rem',
        fontWeight: '500',
        padding: '0.5rem 1rem',
        border: '1px solid #007bff',
        borderRadius: '0.375rem',
        color: '#007bff',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    };

    const buttonHoverStyle = {
        backgroundColor: '#ffcd00',
        color: '#fff'
    };

    return (
        <div>
            <Navbar />
            <div className='bg-warning text-center py-3 text-dark fw-bold'>
                Agent Dashboard
            </div>

            <div className='container my-5'>
                {/* Card Row */}
                <div className='row'>
                    {[
                        { title: 'Profile', route: '/agent_profile' },
                        { title: 'Marketing', route: '/scheme' },
                        { title: 'Customers', route: '/add_customer' },
                        { title: 'Insurance Accounts', route: '/agent_accounts' },
                        { title: 'Policy Payment', route: '/policy_payment' },
                        { title: 'Agent Commission', route: '/agent/agent_commission' }
                    ].map((item, index) => (
                        <div className='col-sm-6 col-md-4 mb-4' key={index}>
                            <div 
                                className="card"
                                style={cardStyle}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div className="card-body" style={cardBodyStyle}>
                                    <h3 className='card-title' style={cardTitleStyle}>{item.title}</h3>
                                    <button 
                                        className='btn'
                                        style={buttonStyle}
                                        onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        onClick={() => navigate(item.route)}
                                    >
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Agent;
