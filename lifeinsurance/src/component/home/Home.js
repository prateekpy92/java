import React from 'react'
import Navbar from '../shared/navbar/Navbar'


import Faq from '../shared/Faq'
import Footer from '../shared/footer/Footer'
import Card from '../shared/card/Card'
import Card1 from '../shared/card/Card1'
import Card2 from '../shared/card/Card2'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
    const naviagte = new useNavigate()
    return (
        <>
            <Navbar></Navbar>
            <div className='container'>
                <div className='row my-5'>
                    <div className='col-5 '>
                        <div className='display-1 mt-5 fw-bold text-danger'>
                            The Smarter Choice For Safe Life
                        </div>
                        <div className='ms-5 mt-3'>
                            <button className='btn btn-lg btn-outline-primary fw-bold 'onClick={()=>{ naviagte('/services')}}>View Our Plans</button>
                        </div>
                    </div>
                    <div className='col-7'>
                        {/* <img src={home2} alt='homepage' className='img-fluid' style={{ height: "70vh", width: "70vw" }} /> */}
                    </div>
                </div>
            </div>

            <div className='row align-items-center bg1'>
                <div className='col-2 offset-1'>
                    <div className='text-center display-3 fw-bolder text-danger'>
                        We Provides
                    </div>
                </div>

                <div className='col-9 fw-bold  text-primary fs-5'>
                    LifeInSurance is a digital platform that provides financial protection against the risk of loss or unexpected events
                </div>
            </div>


            <div className='row mt-5'>
                <div className='col-3'>
                    <div class="card border-0">
                        <div class="card-body">
                            <h5 class="card-title text-center fs-1 text2"> <i class="bi bi-files"></i></h5>
                            <p className='text-center'> 100% Paperless Process</p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card border-0">
                        <div class="card-body">
                            <h5 class="card-title text-center fs-1 text2"> <i class="bi bi-file-check"></i></h5>
                            <p className='text-center'> Minimal Documentation </p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card border-0">
                        <div class="card-body">
                            <h5 class="card-title text-center fs-1 text2"><i class="bi bi-shield-plus"></i></h5>
                            <p className='text-center'>  Simple & Secure Process </p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card border-0">
                        <div class="card-body">
                            <h5 class="card-title text-center fs-1 text2"> <i class="bi bi-chat-dots"></i> </h5>
                            <p className='text-center'> 24/7 Customer Support </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container-fluid'>
                <div className='row bg1'>
                    <div className='text-center text-danger display-1 fw-bold py-3'>Our Plans</div>
                </div>
            </div>

            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-4'>
                        <Card></Card>

                    </div>
                    <div className='col-4'>
                        <Card1></Card1>
                    </div>
                    <div className='col-4'>
                        <Card2></Card2>
                    </div>
                   
                </div>
                <div className='text-center display-1 text-danger fw-bold pt-5'>Frequently Asked Questions</div>
               <Faq></Faq>
            </div>

            <Footer></Footer>


        </>

    )
}

export default Home