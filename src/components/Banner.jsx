import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faRocket, faUsers, faCar, faBus, faPlane, faMotorcycle, faTrain, faUmbrellaBeach, faHotel, faHiking } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
library.add(fas);

export default function Banner() {
    const categories = [
        { 
            title: "Luxury Cabs", 
            services: "25+ Services", 
            icon: "car",
            description: "Premium sedans & SUVs"
        },
        { 
            title: "Executive Buses", 
            services: "18+ Services", 
            icon: "bus",
            description: "Volvo & AC coaches"
        },
        { 
            title: "Flights", 
            services: "32+ Services", 
            icon: "plane",
            description: "Domestic & International"
        },
        { 
            title: "Luxury Hotels", 
            services: "45+ Services", 
            icon: "hotel",
            description: "5-star & boutique stays"
        },
        { 
            title: "Pilgrimage Tours", 
            services: "15+ Services", 
            icon: "hiking",
            description: "Spiritual journeys"
        },
        { 
            title: "Train Booking", 
            services: "12+ Services", 
            icon: "train",
            description: "IRCTC confirmed tickets"
        },
        { 
            title: "Bike Rentals", 
            services: "8+ Services", 
            icon: "motorcycle",
            description: "Self-drive bikes"
        },
         { 
            title: "Holiday Packages", 
            services: "28+ Services", 
            icon: "umbrella-beach",
            description: "Curated tour packages",
            active: true 
        }
    ];

    return (
        <>
            <div className="jobPortal">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="hero">
                                <h1>
                                    Discover more than <span>5000+ travel services</span>
                                </h1>
                                <p>
                                    Explore thousands of travel services across India. Book your perfect
                                    trip with cabs, buses, flights, and bike rentals at best prices.
                                </p>
                                <div className="searchBar">
                                    <input type="text" placeholder="From"  />
                                    <input type="text" placeholder="To"  />
                                    <input type="date" placeholder="Travel Date" defaultValue="2026-03-20" />
                                    <Link to="/service">
                                        <button>Search</button>
                                    </Link>
                                </div>
                                <div className="stats">
                                    <div className="statCard">
                                        <div>
                                            <FontAwesomeIcon icon={faBriefcase} className="stat-icon" />
                                        </div>
                                        <div className="card-flex">
                                            <h3>50k+</h3>
                                            <p>Daily Bookings</p>
                                        </div>
                                    </div>
                                    <div className="statCard">
                                        <div>
                                            <FontAwesomeIcon icon={faRocket} className="stat-icon" />
                                        </div>
                                        <div className="card-flex">
                                            <h3>1000+</h3>
                                            <p>Destinations</p>
                                        </div>
                                    </div>
                                    <div className="statCard">
                                        <div>
                                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                                        </div>
                                        <div className="card-flex">
                                            <h3>2M+</h3>
                                            <p>Happy Customers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="categories">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="categoryHeader">
                                <div>
                                    <h2>Explore travel services by category</h2>
                                    <p>Find the best travel options for your journey</p>
                                </div>
                            </div>
                            <div className="categoryGrid">
                                {categories.map((cat, index) => (
                                    <div
                                        key={index}
                                        className={`categoryCard ${cat.active ? "activeCard" : ""}`}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={['fas', cat.icon]} />
                                        </div>
                                        <div>
                                            <h4>{cat.title}</h4>
                                            <p className="services-count">{cat.services}</p>
                                            <p className="service-desc">{cat.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}