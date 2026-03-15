import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ServiceDetails() {

  const { id } = useParams();

  const fetchJobDetails = async () => {
    const res = await axios.get(`http://localhost:5002/serviceDetails/${id}`);
    console.log("job details api:", res.data);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: fetchJobDetails,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return <h2 className="text-center mt-5">Loading...</h2>;

  if (isError)
    return <h2 className="text-center mt-5">Error loading data</h2>;

  return (
    <div className="job-details-page py-5">
      <Container>

        <Row className="mb-5">

          {/* LEFT SIDE */}
          <Col lg={8}>
            <div className="job-details-page-card p-4 shadow-sm rounded bg-white">
              <h3 className="mb-3">{data?.title}</h3>
              <p>
                {data?.description}
              </p>
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col lg={4}>
            <div className="p-4 shadow-sm rounded bg-light">

              <h5 className="mb-3">Service Info</h5>

              <p>
                <strong>ID :</strong> {data?.id}
              </p>

              <p>
                <strong>Status :</strong> Active
              </p>

            </div>
          </Col>

        </Row>

      </Container>
    </div>
  );
}

export default ServiceDetails;