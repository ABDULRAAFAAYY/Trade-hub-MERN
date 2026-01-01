// ============================================
// TRADE HUB - Contact Page Component
// ============================================
// Contact form and company contact information.

import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

// API base URL
const API_URL = 'https://trade-hub-mern.vercel.app';

function Contact() {
    // ============================================
    // STATE
    // ============================================

    // Form field states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Submission status
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitMessage('');

        try {
            // Send form data to API
            const response = await axios.post(`${API_URL}/api/contact`, formData);

            // Show success message
            setSubmitMessage(response.data.message);

            // Clear form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitMessage('Error sending message. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            <Header />

            {/* Contact Page Header */}
            <section id="about-header">
                <h2>#Let's_Communicate</h2>
                <p>LEAVE A MESSAGE. We would love to hear from you!</p>
            </section>

            {/* Contact Details and Map */}
            <section id="contact-details" className="section-p1">
                <div className="details">
                    <span>GET IN TOUCH</span>
                    <h2>Visit our location or contact us today</h2>
                    <h3>Head Office</h3>
                    <div>
                        {/* Address */}
                        <li>
                            <i className="fa-regular fa-map"></i>
                            <p>Club Road, Multan Cantt Residential Area, Multan, Punjab, Pakistan</p>
                        </li>

                        {/* Email */}
                        <li>
                            <i className="fa-regular fa-envelope"></i>
                            <p>Thetradehub786@hotmail.com</p>
                        </li>

                        {/* Phone */}
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <p>0300-6867113 / 0312-6893113</p>
                        </li>

                        {/* Hours */}
                        <li>
                            <i className="fa-regular fa-clock"></i>
                            <p>08:00 - 20:00, Mon - Sat</p>
                        </li>
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.8629977592364!2d71.4206514743628!3d30.183907311951657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b3186dabb459d%3A0xabe0fb63cab96a20!2sClub%20Road%2C%20Multan%20Cantt%20Residential%20Area%2C%20Multan%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1727134779113!5m2!1sen!2s"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Trade Hub Location"
                    ></iframe>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="form-details">
                <form onSubmit={handleSubmit}>
                    <span>LEAVE A MESSAGE</span>
                    <h2>We love to hear from you</h2>

                    {/* Name Input */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Subject Input */}
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />

                    {/* Message Textarea */}
                    <textarea
                        name="message"
                        cols="30"
                        rows="10"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    {/* Submit Button */}
                    <button
                        className="normal"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Sending...' : 'Submit'}
                    </button>

                    {/* Status Message */}
                    {submitMessage && (
                        <p className={submitMessage.includes('Error') ? 'error' : 'success'}>
                            {submitMessage}
                        </p>
                    )}
                </form>

                {/* Empty people section to maintain layout */}
                <div className="people"></div>
            </section>

            <Footer />
        </>
    );
}

export default Contact;
