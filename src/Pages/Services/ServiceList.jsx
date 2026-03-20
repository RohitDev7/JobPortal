import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import API from "../../config/apiConfig";

export default function ServiceList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/services");
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="service-page-card">
      <Container>
        <Row>
          <h1>All Travel Services</h1>
          {data.map((service) => (
            <Col lg={4} className="mt-4" key={service.id}>
              <div className="job-card">
                <div className="card-header d-flex align-items-center gap-3">
                  <div className="logo">
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
                    {service.amenities &&
                      service.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="skill-badge">
                          {amenity}
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
                      <strong> {service.price}</strong>
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
      </Container>
    </div>
  );
}