import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { useState } from "react";


export default function Homepage() {
  const [activeTab, setActiveTab] = useState('all');
  const { data = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5002/services");
      return res.data;
    }
  });

  if (isLoading) return <h2>Loading...</h2>;

  const filters = {
    serviceTypes: [
      { label: "Cab Rentals", count: 1 },
      { label: "Bus Tickets", count: 1 },
      { label: "Flights", count: 1 },
      { label: "Bike Rentals", count: 1 }
    ],
    duration: ["0-2 hours", "2-5 hours", "5-10 hours", "Overnight"],
    destinations: ["Delhi", "Mumbai", "Bangalore", "Jaipur", "Goa"]
  };


    const filteredData = activeTab === 'all' 
    ? data 
    : data.filter(service => service.type === activeTab);

  const cabCount = data.filter(s => s.type === 'Cab').length;
  const busCount = data.filter(s => s.type === 'Bus').length;
  const flightCount = data.filter(s => s.type === 'Flight').length;
  const hotelCount = data.filter(s => s.type === 'Hotel').length;

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
                    {filters.serviceTypes.map((item, idx) => (
                      <li key={idx}>
                        <label>
                          <input type="checkbox" /> {item.label} <span>({item.count})</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h5>Duration</h5>
                  <ul className="filter-list">
                    {filters.duration.map((dur, idx) => (
                      <li key={idx}>
                        <label>
                          <input type="checkbox" /> {dur}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h5>Destination</h5>
                  <div className="location-search">
                    <input type="text" placeholder="Search destination" />
                  </div>
                  <ul className="filter-list">
                    {filters.destinations.map((loc, idx) => (
                      <li key={idx}>
                        <label>
                          <input type="checkbox" /> {loc}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={9}>


<div className="tab-filter mb-4">
                <div className="d-flex gap-2 border-bottom pb-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-light'}`}
                  >
                    All Services ({data.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('Cab')}
                    className={`btn ${activeTab === 'Cab' ? 'btn-primary' : 'btn-light'}`}
                  >
                    Cab ({cabCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('Bus')}
                    className={`btn ${activeTab === 'Bus' ? 'btn-primary' : 'btn-light'}`}
                  >
                    Bus ({busCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('Flight')}
                    className={`btn ${activeTab === 'Flight' ? 'btn-primary' : 'btn-light'}`}
                  >
                    Flight ({flightCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('Hotel')}
                    className={`btn ${activeTab === 'Hotel' ? 'btn-primary' : 'btn-light'}`}
                  >
                    Hotel ({hotelCount})
                  </button>
                </div>
              </div>

              <div className="category-header mb-4">
                <h3>Popular Routes</h3>
                <span>Showing {data.length} services available</span>
              </div>

              {/* Service cards row */}
              <Row>
                {filteredData.map((service) => (
                  <Col lg={6} className="mb-4" key={service.id}>
                    <div className="job-card">

                      <div className="card-header d-flex align-items-start gap-3">
                        <div className='logo'>
                          <img src={service.logo} alt="logo" className="company-logo" />
                        </div>
                        <div className="header-title">
                          <h4 className="job-title">{service.title}</h4>
                          <p className="company-location">
                            {service.providerName} • {service.location}
                          </p>
                        </div>
                      </div>

                      <div className="card-body">
                        <p className="job-description">{service.description}</p>

                        <div className="skills-tags">
                          {service.amenities && service.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="skill-badge">{amenity}</span>
                          ))}
                        </div>

                        <div className="job-meta d-flex flex-wrap gap-1 mt-2">
                          <span className="meta-item"><strong>{service.duration}</strong></span>
                          <span className="meta-item"><strong>
                            {service.type === 'Cab'}
                            {service.type === 'Bus'}
                            {service.type === 'Flight'}
                            {service.type === 'Hotel'} {service.type}
                          </strong></span>
                          <span className="meta-item"><strong> {service.price}</strong></span>
                        </div>

                        <div className="card-footer d-flex justify-content-between align-items-center mt-3">
                          <span className="posted-date">Available from {service.createdAt}</span>
                          {/* <Link to={`/services/${service.id}`}> */}
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
    </div>
  );
}