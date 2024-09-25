import React, { useState } from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { useNavigate } from 'react-router-dom';

const WithdrawPolicy = () => {
    const [policyId, setPolicyId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8081/policy/${policyId}/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:localStorage.getItem('auth')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResponseMessage(data.message);
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar />
            <header className='bg-warning text-center display-4 py-3 text-dark fw-bold'>
                Withdraw Your Insurance Policy
            </header>
            <div className='container my-5'>
                <form onSubmit={handleSubmit} className='text-center'>
                    <label htmlFor="policyId" className='fw-bold'>Policy ID:</label>
                    <input
                        type="number"
                        id="policyId"
                        value={policyId}
                        onChange={(e) => setPolicyId(e.target.value)}
                        required
                        className='form-control my-3'
                    />
                    <button type="submit" className='btn btn-lg btn-outline-danger'>
                        Withdraw Policy
                    </button>
                </form>
                {responseMessage && (
                    <div className='mt-4'>
                        <p>{responseMessage}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default WithdrawPolicy;
