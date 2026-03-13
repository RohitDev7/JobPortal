import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faRocket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from "react-bootstrap";

// Add all solid icons to library
library.add(fas);

export default function Banner() {
    const categories = [
        { title: "Software Dev", jobs: "12 Jobs Available", icon: "code" },
        { title: "Data & AI", jobs: "8 Jobs Available", icon: "brain" },
        { title: "Design", jobs: "15 Jobs Available", icon: "pencil-ruler" },
        { title: "Cloud & DevOps", jobs: "6 Jobs Available", icon: "cloud" },
        { title: "Security", jobs: "4 Jobs Available", icon: "shield-halved" },
        { title: "Management", jobs: "9 Jobs Available", icon: "chart-line" },
        { title: "Support & IT", jobs: "11 Jobs Available", icon: "headset" },
        { title: "Mobile Dev", jobs: "7 Jobs Available", icon: "mobile-screen-button", active: true }
    ];

    return (
        <>
            <div className="jobPortal">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="hero">
                                <h1>
                                    Discover more than <span>8000+ jobs</span>
                                </h1>
                                <p>
                                    Explore thousands of jobs across different professions. Find your
                                    dream job and build your career today.
                                </p>

                                <div className="searchBar">
                                    <input type="text" placeholder="Search Job Title" defaultValue="React Developer" />
                                    <input type="text" placeholder="Location" defaultValue="Gurugram" />
                                    <select defaultValue="Experience">
                                        <option disabled>Experience</option>
                                        <option>0-1 Years</option>
                                        <option>2-5 Years</option>
                                        <option>5+ Years</option>
                                    </select>
                                    <button>Search</button>
                                </div>

                                <div className="stats">
                                    <div className="statCard">
                                        <div>
                                            <FontAwesomeIcon icon={faBriefcase} className="stat-icon" />
                                        </div>
                                        <div className="card-flex">
                                            <h3>8k+</h3>
                                            <p>Current Jobs</p>
                                        </div>
                                    </div>
                                    <div className="statCard">
                                        <div>
                                            <FontAwesomeIcon icon={faRocket} className="stat-icon" />
                                        </div>
                                        <div className="card-flex">
                                            <h3>400+</h3>
                                            <p>Startups</p>
                                        </div>
                                    </div>
                                    <div className="statCard">
                                        <div>
                                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                                        </div>
                                        <div className="card-flex">
                                            <h3>20k+</h3>
                                            <p>Talent</p>
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
                                    <h2>Explore jobs by category</h2>
                                    <p>Find the right job in your preferred domain</p>
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