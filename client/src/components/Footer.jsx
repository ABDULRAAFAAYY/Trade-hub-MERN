// ============================================
// TRADE HUB - Footer Component
// ============================================
// This component displays the footer at the bottom of every page.
// Contains contact info, navigation links, and social media icons.

import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="section-p1">
            {/* Contact Information Column */}
            <div className="col">
                {/* Footer Logo */}
                <img
                    className="logo"
                    src="/images/footlogo.png"
                    alt="Trade Hub Logo"
                    height="150px"
                />

                <h4>Contact</h4>

                {/* Address */}
                <p>
                    <strong>Address:</strong> Club Road, Multan Cantt Residential Area, Multan, Punjab, Pakistan
                </p>

                {/* Phone Numbers */}
                <p>
                    <strong>Phone:</strong> +92 312-6893113/ +92 300-6867113
                </p>

                {/* Business Hours */}
                <p>
                    <strong>Hours:</strong> 08:00 - 20:00, Mon - Sat
                </p>

                {/* Social Media Links */}
                <div className="follow">
                    <h4>Follow Us</h4>
                    <div className="icon">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/share/Gag3n5zty3cSfveh/?mibextid=LQQJ4d"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/trade_hub786"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/+923126893113"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>

                        {/* TikTok */}
                        <a
                            href="https://www.tiktok.com/@tradehub786"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-tiktok"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* About Links Column */}
            <div className="col">
                <h4>About</h4>
                <Link to="/about">About Us</Link>
                <a href="#">Delivery Information</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
                <Link to="/contact">Contact Us</Link>
            </div>

            {/* My Account Links Column */}
            <div className="col">
                <h4>My Account</h4>
                <a href="#">Sign In</a>
                <Link to="/cart">View Cart</Link>
                <a href="#">Track My Order</a>
                <a href="#">Help</a>
            </div>

            {/* Payment Methods Column */}
            <div className="col install">
                <p>Secured Payment Gateways</p>
                <img src="/images/payment.jpeg" alt="Payment Methods" />
            </div>

            {/* Copyright */}
            <div className="copyright">
                <p>2024, Trade Hub</p>
            </div>
        </footer>
    );
}

export default Footer;
