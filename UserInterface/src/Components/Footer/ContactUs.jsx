import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contactUs.css';

const ContactUs = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        const templateParams = {
            firstName,
            lastName,
            email,
            message,
        };

        emailjs.send('service_xq2q1xs', 'template_23d4i6f', templateParams, '8V1wrnt5MoHoP-tw5')
            .then((response) => {
                console.log('Email sent successfully:', response);
                setSuccessMessage('Your message has been sent successfully!');
                setErrorMessage('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setMessage('');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                setErrorMessage('Failed to send your message. Please try again.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={sendEmail}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="contactusbtn" type="submit">Send</button>
            </form>
        </div>
    );
};

export default ContactUs;
