import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faClock, 
  faIndianRupeeSign,
  faHeadset,
  faStar,
  faMapMarkedAlt,
  faWallet,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';

const WhyChoose = () => {
  const features = [
    {
      icon: faShieldAlt,
      title: "Safe & Secure",
      description: "Your safety is our priority with verified travel partners and secure bookings",
      color: "#4CAF50"
    },
    {
      icon: faClock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your travel needs and queries",
      color: "#2196F3"
    },
    {
      icon: faIndianRupeeSign,
      title: "Best Prices",
      description: "Guaranteed best prices with no hidden charges and exclusive deals",
      color: "#FF9800"
    },
    {
      icon: faStar,
      title: "5000+ Services",
      description: "Access to thousands of travel services across India at your fingertips",
      color: "#9C27B0"
    },
    {
      icon: faMapMarkedAlt,
      title: "Pan India Coverage",
      description: "Services available in Delhi, Jaipur and 1000+ destinations across India",
      color: "#E91E63"
    },
    {
      icon: faWallet,
      title: "Easy Payments",
      description: "Multiple payment options with secure transaction processing",
      color: "#00BCD4"
    },
    {
      icon: faThumbsUp,
      title: "1000+ Destinations",
      description: "Explore thousands of destinations with our extensive travel network",
      color: "#FF5722"
    },
    {
      icon: faHeadset,
      title: "Expert Assistance",
      description: "Travel experts to help you plan the perfect itinerary",
      color: "#795548"
    }
  ];

  const stats = [
    { number: "50k+", label: "Daily Bookings", city: "Delhi" },
    { number: "1000+", label: "Destinations", city: "Jaipur" },
    { number: "5000+", label: "Services", city: "India" },
    { number: "24/7", label: "Support", city: "Available" }
  ];

  return (

    <>
    <div className="hero-section">
        <Container>
            <Row>
                <Col lg={12}>
        <h1>Why Choose Us</h1>
        <p className="hero-subtitle">Experience the best travel services with unmatched benefits</p>
        </Col>
        <Col lg={12}>
        <div className="hero-stats">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
              <span>{stat.city}</span>
            </div>
          ))}
      
        </div>
            </Col>
        </Row>
        </Container>
      </div>



<div className="features-section">
    <Container>
        <Row>
            <Col lg={12}>
        <h2>What Makes Us Different</h2>
        <p className="section-subtitle">Discover why millions of travelers trust us for their journey</p>
        </Col>

        <Col lg={12}>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="icon-wrapper" style={{ backgroundColor: feature.color + '20' }}>
                <FontAwesomeIcon icon={feature.icon} style={{ color: feature.color }} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        </Col>
        </Row>
        </Container>
      </div>



 <div className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <h2>Your Trusted Travel Partner</h2>
            <p>With thousands of daily bookings and millions of happy customers, we're India's fastest growing travel platform.</p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <FontAwesomeIcon icon={faShieldAlt} className="benefit-icon" />
                <div>
                  <h4>Verified Partners</h4>
                  <p>All our service providers are thoroughly verified for quality</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <FontAwesomeIcon icon={faClock} className="benefit-icon" />
                <div>
                  <h4>Instant Confirmation</h4>
                  <p>Get immediate confirmation on all your bookings</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <FontAwesomeIcon icon={faIndianRupeeSign} className="benefit-icon" />
                <div>
                  <h4>Price Match Guarantee</h4>
                  <p>We'll match any genuine price you find elsewhere</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="benefits-image">
            <div className="image-grid">
              <div className="grid-item">Delhi → Goa</div>
              <div className="grid-item">Mumbai → Jaipur</div>
              <div className="grid-item">Chennai → Bangalore</div>
              <div className="grid-item">Kolkata → Delhi</div>
            </div>
          </div>
        </div>
      </div>



    <div className="why-choose-us">

     

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"Excellent service! Booked a Delhi to Goa flight and got the best price. The baggage storage option was very convenient."</p>
            <div className="customer">
              <strong>Rahul Sharma</strong>
              <span>Delhi</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"Amazing experience with bike rental in Jaipur. Great prices and smooth booking process. Highly recommended!"</p>
            <div className="customer">
              <strong>Priya Patel</strong>
              <span>Jaipur</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"The 24/7 customer support helped me modify my booking at midnight. Truly exceptional service!"</p>
            <div className="customer">
              <strong>Amit Kumar</strong>
              <span>Mumbai</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join millions of happy travelers who trust us for their travel needs</p>
        <button className="cta-button">Explore Services</button>
      </div>
    </div>
    </>
  );
};

export default WhyChoose;
