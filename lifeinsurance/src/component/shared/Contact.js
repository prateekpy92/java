import React, { useRef, useState } from 'react';
import emailjs from "@emailjs/browser";
import contact from '../../images/contact.png';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const Contact = () => {
    const form = useRef(); // Ref to the form element
    const [done, setDone] = useState(false); // To track if the email was successfully sent
    const [errors, setErrors] = useState({}); // To track form errors

    // Function to validate form inputs
    const validateForm = () => {
        const formData = new FormData(form.current);
        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const message = formData.get("message").trim();

        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!message) newErrors.message = "Message is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Function to handle email sending
    const sendEmail = (e) => {
        e.preventDefault();

        if (validateForm()) {
            emailjs
                .sendForm(
                    "service_7dfyxzy",
                    "template_n4lch46", 
                    form.current,
                    "LOv5k-HyYSVSQGxSv" 
                )
                .then(
                    (result) => {
                        console.log(result.text);
                        setDone(true); 
                        if (form.current) {
                            form.current.reset(); 
                        }
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                <div className='row mt-5'>
                    <div className='col-5'>
                        <img src={contact} className='' alt="Contact us"></img>
                    </div>
                    <div className='col-5'>
                        <div className="m-1">
                            <h1>Contact Us</h1>
                            <div className="fs-6 fw-light mb-2">Post your message below. We will get back to you ASAP</div>
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="mb-5">
                                    <label htmlFor="message">Message</label>
                                    <textarea className="form-control" id="message" name="message" rows="5"></textarea>
                                    {errors.message && <span className="error text-danger">{errors.message}</span>}
                                </div>
                                <div className="mb-5 row">
                                    <div className="col">
                                        <label>Your Name:</label>
                                        <input type="text" required maxLength="50" className="form-control" id="name" name="name" />
                                        {errors.name && <span className="error text-danger">{errors.name}</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="email_addr">Your Email:</label>
                                        <input type="email" required maxLength="50" className="form-control" id="email_addr" name="email" placeholder="name@example.com" />
                                        {errors.email && <span className="error text-danger">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success">Post</button>
                                </div>
                            </form>
                            {done && <span className="text-success mt-3">Thanks for contacting us!</span>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
