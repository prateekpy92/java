import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { useNavigate } from 'react-router-dom';

function ClaimHomePage() {
    const navigate = useNavigate();

    // Inline styles for card and container
    const cardStyle = {
        borderRadius: '0.75rem',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    };

    return (
        <div>
            <Navbar />
            <header className="bg-warning text-center py-5">
                <h1 className="text-dark fw-bold mb-0">Claims</h1>
            </header>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div
                            className="card border-0"
                            style={cardStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="card-body d-flex flex-column align-items-center text-center">
                                <h3 className="card-title fw-bold mb-4">Agent Claims</h3>
                                <button
                                    className="btn btn-lg btn-success text-white"
                                    onClick={() => navigate('/admin/agent_claim')}
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div
                            className="card border-0"
                            style={cardStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="card-body d-flex flex-column align-items-center text-center">
                                <h3 className="card-title fw-bold mb-4">Policy Claims</h3>
                                <button
                                    className="btn btn-lg btn-success text-white"
                                    onClick={() => navigate('/admin/policy_claim')}
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ClaimHomePage;
