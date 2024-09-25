import React from 'react'

import contact from '../../images/contact.png'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'

const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='container-fluid'>
                <div className='row mt-5' >
                    <div className='col-5'>
                        <img src={contact} className=''></img>
                    </div>
                    <div className='col-5'>
                        <div className='text-center display-3 fw-bold text2'>
                            About Us
                        </div>
                        <div className='fs-5 '>
                            Welcome to LifeInsurance, your dedicated partner in protection.
                            We are committed to delivering innovative insurance solutions with a customer-centric approach.
                            At LifeInsurance, our experienced team is here to guide you through the intricacies of insurance, ensuring your peace of mind.
                            From comprehensive coverage to seamless, technology-driven solutions, we are here to safeguard what matters most to you.
                            Thank you for considering LifeInsurance as your trusted insurance partner.
                            Contact us for personalized assistance and explore the difference of our tailored insurance offerings.
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default About