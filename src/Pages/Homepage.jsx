



import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Homepage() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5002/jobs");
      return res.data;
    }
  });

  if (isLoading) return <h2>Loading...</h2>;

  const selectJob = (job) => {
    console.log("Selected Job:", job);
  };

  return (
    <div>


      <div className="parent-container">
        <Container>
          <Row>
            {data.map((job) => (
              <Col lg={4} className="mb-4" key={job.id}>
                <div className="job-card">

                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className='company-name'>
                      <p className='m-0 p-0'><b>Company:</b> {job.company}</p>
                    </div>
                    <div className='logo'>
                      <img src={job.logo} alt="logo" className="company-logo" />
                    </div>
                  </div>

                  <div className="card-header">
                    <h2 className="m-0 p-0">{job.title}</h2>
                  </div>

                  <div className="card-header d-flex align-items-center gap-3">
                    <p><b>Location:</b> {job.location}</p>
                    <p><b>Experience:</b> {job.experience}</p>
                  </div>

                  <div className="card-header d-flex align-items-center gap-3">
                    <p><b>Salary:</b> {job.salary}</p>
                    <p><b>Job Type:</b> {job.type}</p>
                  </div>

                  <div className="card-header">
                    <p><b>Skills:</b> {job.skills.join(", ")}</p>
                  </div>

                  <div className="card-header">
                    <p className="desc">{job.description}</p>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center">

                    <Link to={`/jobs/${job.id}`}>
                    <button
                      className="apply-btn"
                      // onClick={() => selectJob(job)}
                    >
                      Apply Now
                    </button>
                    </Link>


                    <p className="m-0 p-0">{job.createdAt}</p>
                  </div>

                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}