import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
    const navigate = useNavigate(); // Fixed the useNavigate usage

    const cardData = [
        { title: 'Customer Profile', path: '/customer_profile' },
        { title: 'Policy Payment', path: '/payments' },
        { title: 'Insurance Accounts', path: '/policy' },
        { title: 'Add Query', path: '/addquery' },
        { title: 'WithdrawPolicy', path: '/withdraw_Policy' },
        { title: 'Add Payment', path: '/add_payment' },
    ];

    return (
        <div>
            <Navbar />
            <header className='bg-warning text-center display-4 py-3 text-dark fw-bold'>
                Customer Dashboard
            </header>
            <div className='container my-5'>
                <div className='row'>
                    {cardData.map((card, index) => (
                        <div className='col-lg-4 col-md-6 mb-4' key={index}>
                            <div className='card bg-light h-100'>
                                <div className='card-body d-flex flex-column align-items-center'>
                                    <h5 className='text fw-bold'>{card.title}</h5> {/* Smaller font size */}
                                    <button 
                                        className='btn btn-lg btn-outline-success mt-3' 
                                        onClick={() => navigate(card.path)}
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
};

export default Customer;
