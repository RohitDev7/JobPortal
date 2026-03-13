import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faRocket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from "react-bootstrap";
library.add(fas);

export default function Banner() {
    const categories = [
        { title: "Cab Rentals", jobs: "12 Services Available", icon: "car" },
        { title: "Bus Tickets", jobs: "8 Services Available", icon: "bus" },
        { title: "Flights", jobs: "15 Services Available", icon: "plane" },
        { title: "Bike Rentals", jobs: "6 Services Available", icon: "motorcycle" },
        { title: "Train Booking", jobs: "4 Services Available", icon: "train" },
        { title: "Holiday Packages", jobs: "9 Services Available", icon: "umbrella-beach" },
        { title: "Hotel Booking", jobs: "11 Services Available", icon: "hotel" },
        { title: "Adventure Tours", jobs: "7 Services Available", icon: "hiking", active: true }
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
                                    <input type="text" placeholder="From" defaultValue="Delhi" />
                                    <input type="text" placeholder="To" defaultValue="Jaipur" />
                                    <input type="date" placeholder="Travel Date" defaultValue="2026-03-20" />
                                    <select defaultValue="Travel Type">
                                        <option disabled>Travel Type</option>
                                        <option>One Way</option>
                                        <option>Round Trip</option>
                                        <option>Multi City</option>
                                    </select>
                                    <button>Search</button>
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
                                            <p>{cat.jobs}</p>
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