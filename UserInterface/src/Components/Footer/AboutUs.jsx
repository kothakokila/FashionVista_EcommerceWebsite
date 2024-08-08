import React from 'react';
import './aboutUs.css';

const AboutUs = () => {
    return (
        <div className='about-us'>
            <header>
                <h1>About Us</h1>
            </header>
            <section className='about-us-content'>
                <div className='mission'>
                    <h2>Our Mission</h2>
                    <p>
                        At Fashion Vista, our mission is to provide high-quality fashion products that meet the diverse needs of our customers. We are committed to offering exceptional service and creating a memorable shopping experience.
                    </p>
                </div>
                <div className='values'>
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Quality:</strong> We ensure the highest quality in all our products.</li>
                        <li><strong>Customer-Centric:</strong> Our customers are at the heart of everything we do.</li>
                        <li><strong>Innovation:</strong> We continually seek new trends and ideas to bring fresh styles to our customers.</li>
                    </ul>
                </div>
                <div className='team'>
                    <h2>Meet the Team</h2>
                    <p>
                        Our dedicated team is passionate about fashion and committed to making your shopping experience as enjoyable as possible. With years of experience in the fashion industry, our team brings creativity, expertise, and enthusiasm to every aspect of our business.
                    </p>
                </div>
            </section>
            <footer className='about-us-footer'>
                <p>© {new Date().getFullYear()} Fashion Vista. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;
