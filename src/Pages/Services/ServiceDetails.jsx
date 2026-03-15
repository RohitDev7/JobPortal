import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Col, Container, Row, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams();

  const fetchServiceDetails = async () => {
    const res = await axios.get(`http://localhost:5002/serviceDetails/${id}`);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: fetchServiceDetails,
    enabled: !!id
  });

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (isError) return <h2 className="text-center mt-5">Error loading data</h2>;

  return (
    <div className="job-details-page py-5">
      <Container>
        <Row className="mb-5">
          {/* LEFT SIDE */}
          <Col lg={8}>
            <div className="job-details-page-card">
              {/* Title */}
              <h3>{data.title}</h3>

              {/* Service Type and Status */}
              <div className="compnay-header">
                <p>
                  <strong>Service Type:</strong> {data.serviceType}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={data.status === "active" ? "text-success" : "text-secondary"}>
                    {data.status}
                  </span>
                </p>

                <p>
                  <strong>Created:</strong> {new Date(data.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Route Information */}
              <div className="compnay-calss">
                <h5 className="mt-2">Route Details</h5>
                <p>
                  <strong>From:</strong> {data.route.from}<br />
                  <strong>To:</strong> {data.route.to}<br />
                  <strong>Distance:</strong> {data.route.distance}<br />
                  <strong>Duration:</strong> {data.route.duration}
                </p>
              </div>

              {/* Vehicle Information */}
              <div className="compnay-calss">
                <h5 className="mt-2">Vehicle Details</h5>
                <p>
                  <strong>Vehicle Type:</strong> {data.vehicleType}<br />
                  <strong>Price Range:</strong> {data.price.currency}{data.price.min} - {data.price.currency}{data.price.max}
                </p>
              </div>

              {/* Description */}
              <div className="compnay-calss">
                <h5>Description</h5>
                <p>{data.description}</p>
              </div>

              {/* Amenities */}
              <div className="compnay-calss">
                <h5 className="mt-2">Amenities</h5>
                <div className="company-badge">
                  {data.amenities.map((amenity, i) => (
                    <span className="badges" key={i}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="compnay-calss">
                <h5 className="mt-2">Customer Reviews</h5>
                {data.reviews && data.reviews.length > 0 ? (
                  data.reviews.map((review, i) => (
                    <div key={i} className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between">
                        <strong>{review.user}</strong>
                        <span>⭐ {review.rating} / 5</span>
                      </div>
                      <p className="mb-0 mt-2">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No reviews yet</p>
                )}
              </div>

              {/* Driver Details - Moved to left side as it's important info */}
              <div className="compnay-calss">
                <h5>Driver Information</h5>
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={data.driverDetails.photo} 
                    alt={data.driverDetails.name}
                    style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
                    className="me-3"
                  />
                  <div>
                    <h6 className="mb-1">{data.driverDetails.name}</h6>
                    <small>Experience: {data.driverDetails.experience}</small><br />
                    <small>Rating: ⭐ {data.driverDetails.rating} / 5.0</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col lg={4}>
            {/* Provider Information */}
            <div className="p-4 mb-4 shadow-sm text-center">
              <img 
                src={data.provider.logo} 
                width="80" 
                className="mx-auto" 
                alt={data.provider.name}
                style={{ objectFit: "contain" }}
              />

              <h5 className="mt-3">{data.provider.name}</h5>

              <ul className="list-unstyled">
                <li>
                  <strong>Head Office:</strong> {data.provider.headOffice}
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a href={data.provider.website} target="_blank" rel="noopener noreferrer">
                    {data.provider.website}
                  </a>
                </li>
              </ul>
            </div>

            {/* Driver Details Card - Alternative view on right */}
            <div className="p-4 mb-4 shadow-sm">
              <h5>Driver Details</h5>
              <div className="text-center mb-3">
                <img 
                  src={data.driverDetails.photo} 
                  alt={data.driverDetails.name}
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
                  className="mx-auto mb-3"
                />
                <h6>{data.driverDetails.name}</h6>
              </div>
              <ul className="list-unstyled">
                <li><strong>Experience:</strong> {data.driverDetails.experience}</li>
                <li><strong>Rating:</strong> ⭐ {data.driverDetails.rating} / 5.0</li>
              </ul>
            </div>

            {/* Price Card */}
            <div className="p-4 mb-4 shadow-sm">
              <h5>Price Details</h5>
              <h3 className="text-primary">
                {data.price.currency}{data.price.min} - {data.price.currency}{data.price.max}
              </h3>
              <p className="text-muted">per trip</p>

              <button className="w-100 btn btn-primary">
                Book Now
              </button>
            </div>

            {/* STATS - Created from available data */}
            <div className="p-4 shadow-sm">
              <h5>Service Stats</h5>
              <p><strong>Reviews:</strong> {data.reviews?.length || 0}</p>
              <p><strong>Amenities:</strong> {data.amenities?.length || 0}</p>
              <p><strong>Service ID:</strong> #{data.id}</p>

              <small>
                Created: {new Date(data.createdAt).toLocaleDateString()}
              </small>
            </div>
          </Col>
        </Row>

        {/* Raw Data Display (Optional - for debugging) */}
        <details className="mt-4">
          <summary className="text-muted">View Raw Data</summary>
          <pre className="bg-light p-3 mt-2" style={{ fontSize: "12px", overflowX: "auto" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </Container>
    </div>
  );
}

export default ServiceDetails;