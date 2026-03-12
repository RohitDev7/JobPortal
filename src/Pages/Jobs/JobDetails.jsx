import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Badge, ListGroup } from "react-bootstrap";

export default function JobDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5002/jobDetails");
        console.log("API FULL RESPONSE :", res);
        // Correctly log the first job company name
        console.log("First Job Company:", res.data.data[0]?.company?.name);

        setData(res.data.data || []); // use 'data' from API
      } catch (err) {
        console.error(err);
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">{error}</h2>;

  return (
    <Container className="mt-5">
      {data.map((job) => (
        <Row key={job.id} className="mb-5 p-3 border rounded shadow-sm">
          <Col lg={8}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company?.name}</p>
            <p><strong>Location:</strong> {job.location.city}, {job.location.state}, {job.location.country} {job.location.remote && "(Remote)"}</p>
            <p><strong>Job Type:</strong> {job.jobType} | <strong>Work Mode:</strong> {job.workMode}</p>
            <p><strong>Salary:</strong> {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} / {job.salary.period}</p>

            <h5 className="mt-3">Skills</h5>
            {job.skills.map((skill, i) => (
              <Badge key={i} bg="info" className="me-2">{skill}</Badge>
            ))}

            <h5 className="mt-3">Benefits & Perks</h5>
            <ListGroup horizontal>
              {job.benefits.map((b, i) => <ListGroup.Item key={i}>{b}</ListGroup.Item>)}
              {job.perks.map((p, i) => <ListGroup.Item key={i}>{p}</ListGroup.Item>)}
            </ListGroup>
          </Col>
        </Row>
      ))}
    </Container>
  );
}