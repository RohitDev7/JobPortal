import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Banner from "../components/Banner";


export default function Homepage() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5002/jobs");
      return res.data;
    }
  });

  if (isLoading) return <h2>Loading...</h2>;

  const filters = {
    jobTypes: [
      { label: "Full Time", count: 42 },
      { label: "Part Time", count: 18 },
      { label: "Remote", count: 24 }
    ],
    experience: ["0-1 year (Fresher)", "2-3 years (Mid)", "5+ years (Senior)"],
    locations: ["Bangalore", "Delhi NCR", "Pune", "Hyderabad"]
  };

  return (
    <div>
      <Banner />
      <div className="parent-container">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="featured-heading">Featured Jobs</h2>
            </Col>
          </Row>

          <Row>
            <Col lg={3} className="mb-4">
              <div className="filter-sidebar">
                <h4>Filters</h4>

                <div className="filter-section">
                  <h5>Job Type</h5>
                  <ul className="filter-list">
                    {filters.jobTypes.map((item, idx) => (
                      <li key={idx}>
                        <label>
                          <input type="checkbox" /> {item.label} <span>({item.count})</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h5>Experience</h5>
                  <ul className="filter-list">
                    {filters.experience.map((exp, idx) => (
                      <li key={idx}>
                        <label>
                          <input type="checkbox" /> {exp}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h5>Location</h5>
                  <div className="location-search">
                    <input type="text" placeholder="Search location" />
                  </div>
                  <ul className="filter-list">
                    {filters.locations.map((loc, idx) => (
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
              <div className="category-header mb-4">
                <h3>Software Development</h3>
                <span>Showing {data.length} jobs in this category</span>
              </div>

              {/* Job cards row */}
              <Row>
                {data.map((job) => (
                  <Col lg={6} className="mb-4" key={job.id}>
                    <div className="job-card">

                      <div className="card-header d-flex align-items-start gap-3">
                        <div className='logo'>
                          <img src={job.logo} alt="logo" className="company-logo" />
                        </div>
                        <div className="header-title">
                          <h4 className="job-title">{job.title}</h4>
                          <p className="company-location">
                            {job.companyName} + {job.location}
                          </p>
                        </div>
                      </div>

                      <div className="card-body">
                        <p className="job-description">{job.description}</p>

                        <div className="skills-tags">
                          {job.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="skill-badge">{skill}</span>
                          ))}
                        </div>

                        <div className="job-meta d-flex flex-wrap gap-3 mt-2">
                          <span className="meta-item"><strong>{job.experience}</strong></span>
                          <span className="meta-item"><strong>{job.type}</strong></span>
                          <span className="meta-item"><strong>{job.salary}</strong></span>
                        </div>

                        <div className="card-footer d-flex justify-content-between align-items-center mt-3">
                          <span className="posted-date">{job.createdAt}</span>
                          <Link to={`/jobs/${job.id}`}>
                            <button className="apply-btn">Apply Now</button>
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