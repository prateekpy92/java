import React from 'react'
import employee from '../../images/Insurance.png'
import plan from '../../images/plan.jpg'
import Navbar from '../shared/navbar/Navbar'
import Footer from '../shared/footer/Footer'
import { useNavigate } from 'react-router-dom'


const Customer = () => {
    const navigate = new useNavigate();
    return (
        <div>
            <Navbar></Navbar>
            <div className='bg-warning text-center display-3 py-3 text-dark fw-bold'>Customer Dashboard</div>
            <div className='container'>

                <div className='row my-5'>
                    <div className='col-4'>
                        <div class="card d-flex p-5 bg1">
                            <div class="card-body d-flex align-items-center">
                                <div className='d-block '>
                                    <div className='text fw-bold fs-1'>Customer Profile</div>
                                    <button className='btn btn-lg btn-outline-success'
                                     onClick={
                                        ()=>{
                                            navigate('/customer_profile')
                                        }}>View More</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="card d-flex bg1 p-5">
                            <div class="card-body d-flex align-items-center">
                                <div className='d-block '>
                                    <div className='text fw-bold fs-1'>Policy Payment</div>
                                    <button className='btn btn-lg btn-outline-success' onClick={()=>{
                                        navigate('/payments') 
                                    }}>View More</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="card d-flex p-5 bg1">
                            <div class="card-body d-flex align-items-center">
                                <div className='d-block '>
                                    <div className='text fw-bold fs-1'>Insurance Accounts</div>
                                    <button className='btn btn-lg btn-outline-success'
                                    onClick={()=>{
                                        navigate('/policy') 
                                    }}>View More</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>

            <Footer></Footer>

        </div>
    )
}

export default Customer