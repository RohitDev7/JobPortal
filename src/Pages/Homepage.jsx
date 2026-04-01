import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import Banner from "../components/Banner";
import { useState, useEffect } from "react";
import WhyChoose from "../components/WhyChoose";

export default function Homepage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5002/services");
        // Only show services that are approved (not pending and not rejected)
        const visibleServices = res.data.filter(service => service.status === "approved");
        setData(visibleServices);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  const filteredData =
    activeTab === "all" ? data : data.filter((service) => service.type === activeTab);

  const cabCount = data.filter((s) => s.type === "Cab").length;
  const busCount = data.filter((s) => s.type === "Bus").length;
  const flightCount = data.filter((s) => s.type === "Flight").length;
  const hotelCount = data.filter((s) => s.type === "Hotel").length;

  const handlechekbox = (value, ww, wwe) => {
    if (ww.includes(value)) {
      wwe(ww.filter((item) => item !== value));
    } else {
      wwe([...ww, value]);
    }
  };

  const sidebarFilteredData = filteredData.filter((service) => {
    return (
      (selectedType.length === 0 || selectedType.includes(service.type)) &&
      (selectedDurations.length === 0 || selectedDurations.includes(service.duration)) &&
      (selectedDestinations.length === 0 || selectedDestinations.includes(service.location))
    );
  });

  const getStatusBadge = (status) => {
    if (status === "pending") {
      return <span className="pending-badge">Pending Approval</span>;
    }
    return null;
  };

  return (
    <div>
      <Banner />
      <div className="parent-container">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="featured-heading">Featured Travel Services</h2>
            </Col>
          </Row>

          <Row>
            <Col lg={3} className="mb-4">
              <div className="filter-sidebar">
                <h4>Filters</h4>

                <div className="filter-section">
                  <h5>Service Type</h5>
                  <ul className="filter-list">
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handlechekbox("Cab", selectedType, setSelectedType)}
                        />{" "}
                        Cab
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handlechekbox("Bus", selectedType, setSelectedType)}
                        />{" "}
                        Bus Tickets
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("Flight", selectedType, setSelectedType)
                          }
                        />{" "}
                        Flights
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handlechekbox("Hotel", selectedType, setSelectedType)}
                        />{" "}
                        Hotel
                      </label>
                    </li>
                  </ul>
                </div>

                <div className="filter-section">
                  <h5>Duration</h5>
                  <ul className="filter-list">
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("0-2 hours", selectedDurations, setSelectedDurations)
                          }
                        />{" "}
                        0-2 hours
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("2-5 hours", selectedDurations, setSelectedDurations)
                          }
                        />{" "}
                        2-5 hours
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("5-10 hours", selectedDurations, setSelectedDurations)
                          }
                        />{" "}
                        5-10 hours
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("Overnight", selectedDurations, setSelectedDurations)
                          }
                        />{" "}
                        Overnight
                      </label>
                    </li>
                  </ul>
                </div>

                <div className="filter-section">
                  <h5>Destinations</h5>
                  <ul className="filter-list">
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("Delhi", selectedDestinations, setSelectedDestinations)
                          }
                        />{" "}
                        Delhi
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("Mumbai", selectedDestinations, setSelectedDestinations)
                          }
                        />{" "}
                        Mumbai
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox(
                              "Bangalore",
                              selectedDestinations,
                              setSelectedDestinations
                            )
                          }
                        />{" "}
                        Bangalore
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("Jaipur", selectedDestinations, setSelectedDestinations)
                          }
                        />{" "}
                        Jaipur
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handlechekbox("Goa", selectedDestinations, setSelectedDestinations)
                          }
                        />{" "}
                        Goa
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={9}>
              <div className="tab-filter mb-4">
                <div className="d-flex gap-2 border-bottom pb-2">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`btn ${activeTab === "all" ? "btn-primary" : "btn-light"}`}
                  >
                    All Services ({data.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("Cab")}
                    className={`btn ${activeTab === "Cab" ? "btn-primary" : "btn-light"}`}
                  >
                    Cab ({cabCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("Bus")}
                    className={`btn ${activeTab === "Bus" ? "btn-primary" : "btn-light"}`}
                  >
                    Bus ({busCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("Flight")}
                    className={`btn ${activeTab === "Flight" ? "btn-primary" : "btn-light"}`}
                  >
                    Flight ({flightCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("Hotel")}
                    className={`btn ${activeTab === "Hotel" ? "btn-primary" : "btn-light"}`}
                  >
                    Hotel ({hotelCount})
                  </button>
                </div>
              </div>

              <div className="category-header mb-4">
                <h3>Popular Routes</h3>
                <span>Showing {data.length} services available</span>
              </div>

              <Row>
                {sidebarFilteredData.map((service) => (
                  <Col lg={6} className="mb-4" key={service.id}>
                    <div className="job-card">
                      <div className="card-header d-flex align-items-start gap-3">
                        <div className="logo">
                          <img src={service.logo} alt="logo" className="company-logo" />
                        </div>
                        <div className="header-title">
                          <h4 className="job-title">{service.title}</h4>
                          <p className="company-location">
                            {service.providerName} • {service.location}
                          </p>
                       
                          <div className="agency-info mt-1">
                            <small className="text-muted">
                              Agency ID: {service.agencyId || service.providerId} | 
                              Agency Name: {service.providerName}
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <p className="job-description">{service.description?.slice(0, 200)}...</p>

                        <div className="skills-tags">
                          {(service.amenities || "")
                            .toString()
                            .split(",")
                            .slice(0, 3)
                            .map((amenity, i) => (
                              <span key={i} className="skill-badge">
                                {amenity.trim()}
                              </span>
                            ))}
                        </div>

                        <div className="job-meta d-flex flex-wrap gap-1 mt-2">
                          <span className="meta-item">
                            <strong>{service.duration}</strong>
                          </span>
                          <span className="meta-item">
                            <strong>{service.type}</strong>
                          </span>
                          <span className="meta-item">
                            <strong>₹{service.price}</strong>
                          </span>
                        </div>

                        <div className="card-footer d-flex justify-content-between align-items-center mt-3">
                          <span className="posted-date">Available from {service.createdAt}</span>
                          <Link to={`/service-details/${service.id}`}>
                            <button className="apply-btn">Book Now</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <WhyChoose />
    </div>
  );
}