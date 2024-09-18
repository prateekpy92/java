import React from 'react'

import contact from '../../images/contact.png'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'

const Contact = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='container-fluid'>
                <div className='row mt-5' >
                    <div className='col-5'>
                        <img src={contact} className=''></img>
                    </div>
                    <div className='col-5'>
                        <div class="m-1">
                            <h1>Contact Us</h1>
                            <div class="fs-6 fw-light mb-2">Post your message below. We will get back to you ASAP</div>
                            <form id="contact_form" name="contact_form" method="post">
                                <div class="mb-5">
                                    <label for="message">Message</label>
                                    <textarea class="form-control" id="message" name="message" rows="5"></textarea>
                                </div>
                                <div class="mb-5 row">
                                    <div class="col">
                                        <label>Your Name:</label>
                                        <input type="text" required maxlength="50" class="form-control" id="name" name="name"/>
                                    </div>
                                    <div class="col">
                                        <label for="email_addr">Your Email:</label>
                                        <input type="email" required maxlength="50" class="form-control" id="email_addr" name="email"
                                            placeholder="name@example.com"/>
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-success">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Contact