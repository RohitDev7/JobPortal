import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faTag,
  faClock,
  faShieldAlt,
  faHeadset,
  faHeart,
  faArrowRight,
  faCar,
  faBus,
  faPlane,
  faHotel,
  faWifi,
  faWater,
  faMusic,
  faUtensils,
  faSpa,
  faSwimmer,
  faChargingStation,
  faSnowflake,
  faBellConcierge,
  faLock,
  faHeadphones,
  faMobile,
  faStore,
  faPhone,
  faEnvelope,
  faLocationDot,
  faUsers,
  faAward,
  faMapPin,
  faRoute,
  faClock as faClockRegular
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "@tanstack/react-router";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';




const WhyChoose = () => {
  const fetchServiceDetails = async () => {
    const { data } = await axios.get('http://localhost:5002/serviceDetails');
    return data;
  };

  const { data: serviceDetails, isLoading, error } = useQuery({
    queryKey: ['serviceDetails'],
    queryFn: fetchServiceDetails,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });


  const popularDestinations = [
    {
      id: 1,
      name: "Goa",
      price: "4,999",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Jaipur",
      price: "3,499",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Manali",
      price: "6,999",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      name: "Kerala",
      price: "8,999",
      rating: 4.8,
      image: "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      name: "Dubai",
      price: "24,999",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Bali",
      price: "18,999",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];


  const travelDeals = [
    {
      id: 1,
      title: "Goa Weekend Escape",
      discount: "20% OFF",
      duration: "3 Days / 2 Nights",
      originalPrice: "₹6,249",
      discountedPrice: "₹4,999",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Manali Snow Trek",
      discount: "15% OFF",
      duration: "4 Days / 3 Nights",
      originalPrice: "₹8,999",
      discountedPrice: "₹7,649",
      image: "https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "Royal Jaipur Tour",
      discount: "25% OFF",
      duration: "2 Days / 1 Night",
      originalPrice: "₹10,587",
      discountedPrice: "₹3,499",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const features = [
    {
      id: 1,
      title: "Secure Booking",
      description: "Your payments are protected with top-tier encryption standards.",
      icon: faShieldAlt
    },
    {
      id: 2,
      title: "24/7 Support",
      description: "Our customer team is always ready to help you, anytime, anywhere.",
      icon: faHeadset
    },
    {
      id: 3,
      title: "Trusted by 2M+",
      description: "Join millions of happy travelers who book their journeys with us.",
      icon: faHeart
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Cab': return faCar;
      case 'Bus': return faBus;
      case 'Flight': return faPlane;
      case 'Hotel': return faHotel;
      default: return faStar;
    }
  };

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('ac') || amenityLower.includes('snow')) return faSnowflake;
    if (amenityLower.includes('water')) return faWater;
    if (amenityLower.includes('music')) return faMusic;
    if (amenityLower.includes('wifi')) return faWifi;
    if (amenityLower.includes('meal') || amenityLower.includes('dining')) return faUtensils;
    if (amenityLower.includes('spa')) return faSpa;
    if (amenityLower.includes('pool')) return faSwimmer;
    if (amenityLower.includes('charging')) return faChargingStation;
    if (amenityLower.includes('butler') || amenityLower.includes('service')) return faBellConcierge;
    return faStar;
  };

  const topServices = serviceDetails?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading amazing travel experiences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>Failed to load travel services. Please try again later.</p>
      </div>
    );
  }

  return (

    <>

      <section className="destinations-section">
        <Container>
          <div className="section-header">
            <div>
              <h2>Popular Destinations</h2>
              <p>Explore India's most loved travel spots</p>
            </div>
            <a href="#" className="view-all">
              View All <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <Row>
            {popularDestinations.map(dest => (
              <Col key={dest.id} lg={4} md={6} className="mb-4">
                <div className="destination-card">
                  <div className="card-image">
                    <img src={dest.image} alt={dest.name} />
                  </div>
                  <div className="card-content">
                    <h3>{dest.name}</h3>
                    <div className="price-rating">
                      <span className="price">Starting from ₹{dest.price}</span>
                      <span className="rating">
                        <FontAwesomeIcon icon={faStar} className="star-icon" /> {dest.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="deals-section">
        <Container>
          <h2>Special Travel Deals</h2>
          <Row>
            {travelDeals.map(deal => (
              <Col key={deal.id} lg={4} md={6} className="mb-4">
                <div className="deal-card">
                  <div className="deal-image">
                    <img src={deal.image} alt={deal.title} />
                    <span className="discount-badge">
                      <FontAwesomeIcon icon={faTag} /> {deal.discount}
                    </span>
                  </div>
                  <div className="deal-content">
                    <h3>{deal.title}</h3>
                    <p className="duration">
                      <FontAwesomeIcon icon={faClock} /> {deal.duration}
                    </p>
                    <div className="price-section">
                      <span className="discounted-price">{deal.discountedPrice}</span>
                      <span className="original-price">{deal.originalPrice}</span>

                    </div>
                    <Button className="book-now">Book Now</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


      <section className="services-section">
        <Container>
          <Col lg={12}>
            <div className="section-header">
              <div>
                <h2>Travel Services</h2>
                <p>Premium travel services tailored just for you</p>
              </div>
              <a href="#" className="view-all">
                View All Services <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </Col>

          <Row>
            {topServices.map(service => (
              <Col key={service.id} lg={4} md={6} className="mb-4">
                <div className="service-card">
                  <div className="service-badge">
                    <span className="service-type">
                      <FontAwesomeIcon icon={getTypeIcon(service.serviceType)} /> {service.serviceType}
                    </span>
                    {service.serviceHighlights && service.serviceHighlights.length > 0 && (
                      <span className="featured-badge">
                        <FontAwesomeIcon icon={faAward} /> Featured
                      </span>
                    )}
                  </div>

                  <div className="service-header">
                    <img
                      src={service.provider?.logo || 'https://via.placeholder.com/50'}
                      alt={service.provider?.name}
                      className="service-logo"
                    />
                    <h3>{service.title}</h3>
                  </div>


                  <div className="route-info">
                    <FontAwesomeIcon icon={faRoute} className="me-2" />
                    <span>{service.route?.from} → {service.route?.to}</span>
                  </div>

                  <div className="service-details">
                    <span className="duration">
                      <FontAwesomeIcon icon={faClockRegular} /> {service.duration?.hours}h {service.duration?.minutes}m
                    </span>
                    <span className="distance">
                      <FontAwesomeIcon icon={faMapPin} /> {service.route?.distance}
                    </span>
                  </div>

                  <div className="price-section">
                    <span className="price-label">Starting from</span>
                    <span className="price">
                      {service.price?.currency} {service.price?.min?.toLocaleString()}
                    </span>
                    <span className="price-period">/{service.price?.period}</span>
                  </div>

                  <div className="amenities">
                    {service.amenities?.slice(0, 4).map((item, index) => (
                      <span key={index} className="amenity-tag">
                        <FontAwesomeIcon icon={getAmenityIcon(item)} />
                        {item.length > 15 ? item.substring(0, 12) + '...' : item}
                      </span>
                    ))}
                  </div>
                  {/* <Button className="view-details">View Details</Button> */}

                  <Link to={`/service-details/${service.id}`}>
                    <button className="apply-btn view-details">Book Now</button>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


      <section className="features-section">
        <Container>
          <div className="guarantee-box">
            <h3>Best Price Guarantee</h3>
            <p>Find a lower price? We'll match it. We ensure you get the best deals.</p>
          </div>

          <h2>Why Choose Us</h2>
          <p className="subtitle">We make your travel experience seamless and memorable</p>

          <Row>
            {features.map(feature => (
              <Col key={feature.id} lg={4} md={6} className="mb-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>



      <section className="app-section">
        <Container>
          <div className="app-content">
            <h2>Download Our Travel App</h2>
            <p>Book flights, hotels and cabs on the go. Get exclusive app-only deals and manage your trips easily.</p>

            <div className="app-buttons">
              <Button className="app-store">
                <FontAwesomeIcon icon={faMobile} className="store-icon" />
                <span className="store-text">App Store</span>
              </Button>
              <Button className="google-play">
                <FontAwesomeIcon icon={faStore} className="store-icon" />
                <span className="store-text">Google Play</span>
              </Button>
            </div>

            <div className="quote">
              <h3>The World is Just One Flight Away</h3>
            </div>
          </div>
        </Container>
      </section>


      <footer className="footer">
        <Container>
          <Row className="footer-content">
            <Col lg={4} md={6} className="footer-section">
              <h3>TravelEase</h3>
              <p>Your one-stop destination for all travel needs. Book flights, hotels, and cabs with best prices guaranteed.</p>
            </Col>

            <Col lg={2} md={6} className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </Col>

            <Col lg={2} md={6} className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Cancellation</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </Col>

            <Col lg={4} md={6} className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#"><FontAwesomeIcon icon={faStar} /></a>
                <a href="#"><FontAwesomeIcon icon={faStar} /></a>
                <a href="#"><FontAwesomeIcon icon={faStar} /></a>
                <a href="#"><FontAwesomeIcon icon={faStar} /></a>
              </div>
              <div className="contact-info mt-3">
                <p><FontAwesomeIcon icon={faPhone} /> +91 1234567890</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> info@travelease.com</p>
              </div>
            </Col>
          </Row>

          <div className="footer-bottom">
            <p>2026 TravelEase Agency. All rights reserved</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </Container>
      </footer>
    </>


  );
};

export default WhyChoose;