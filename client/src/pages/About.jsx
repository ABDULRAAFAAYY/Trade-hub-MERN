// ============================================
// TRADE HUB - About Page Component
// ============================================
// Displays company information and feature highlights.

import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureBox from '../components/FeatureBox';

function About() {
    return (
        <>
            <Header />

            {/* About Page Header */}
            <section id="about-header">
                <h2>#KnowUs</h2>
                <p>We've got nothing to hide</p>
            </section>

            {/* About Content */}
            <section id="about-head" className="section-p1">
                <img src="/images/about2.jpeg" alt="About Trade Hub" />
                <div>
                    <h2>Who We Are?</h2>
                    <p>
                        Welcome to Trade Hub, your one-stop online shop for a wide range of
                        high-quality products, delivered right to your doorstep across Pakistan.
                        From electronics and home essentials to fashion and beauty, we offer a
                        diverse selection to cater to all your needs. Our mission is to provide
                        customers with a seamless and enjoyable shopping experience, backed by
                        excellent customer service and reliable delivery. We are committed to
                        offering top-notch products at competitive prices, ensuring you get the
                        best value for your money. At Trade Hub, we believe in convenience,
                        quality, and customer satisfaction above all else.
                    </p>
                    <br /><br />
                    <marquee bgcolor="#ccc" loop="-1" scrollAmount="5" width="100%">
                        Discover a wide range of quality products and enjoy fast delivery all across Pakistan!
                    </marquee>
                </div>
            </section>

            {/* Features Section */}
            <section id="feature" className="section-p1">
                <FeatureBox
                    image="/images/freeship.png"
                    title="Free Shipping"
                />
                <FeatureBox
                    image="/images/images.jfif"
                    title="Online Order"
                />
                <FeatureBox
                    image="/images/24-hrs-7-days-always-open-service-availability-poster_1017-52820.avif"
                    title="24/7 Support"
                />
                <FeatureBox
                    image="/images/repair.png"
                    title="Repairing Services"
                />
            </section>

            <Footer />
        </>
    );
}

export default About;
