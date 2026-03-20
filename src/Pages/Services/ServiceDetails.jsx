import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/serviceDetails/${id}`);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (!data) return <h2 className="text-center mt-5">No data available</h2>;

  return (
    <div className="job-details-page py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8}>
            <div className="job-details-page-card">
              <h3>{data?.title}</h3>

              <div className="compnay-header">
                <p><strong>Service Type:</strong> {data?.serviceType}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={data?.status === "active" ? "text-success" : "text-secondary"}>
                    {data?.status}
                  </span>
                </p>
                <p><strong>Created:</strong> {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Last Updated:</strong> {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Slug:</strong> {data?.slug || 'N/A'}</p>
              </div>

              {data?.route && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Route Details</h5>
                  <ul className="route-details">
                    <li><strong>From:</strong> {data.route.from || 'N/A'}</li>
                    <li><strong>To:</strong> {data.route.to || 'N/A'}</li>
                    <li><strong>Distance:</strong> {data.route.distance || 'N/A'}</li>
                    <li><strong>Duration:</strong> {data.route.duration || 'N/A'}</li>
                    <li><strong>Highway:</strong> {data.route.highway || 'N/A'}</li>
                    <li><strong>Toll Charges:</strong> {data.route.tollCharges || 'N/A'}</li>
                    <li><strong>Best Time to Travel:</strong> {data.route.bestTimeToTravel || 'N/A'}</li>
                    <li>
                      <strong>Stops:</strong>
                      <ul className="p-0 pt-1">
                        {data.route.stops && data.route.stops.length > 0 ? (
                          data.route.stops.map((stop, i) => <li key={i}>{stop}</li>)
                        ) : (
                          <li>No stops available</li>
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              )}

              {data?.vehicleDetails && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Vehicle Details</h5>
                  <ul>
                    <li><strong>Vehicle Type:</strong> {data.vehicleType || 'N/A'}</li>
                    <li><strong>Model:</strong> {data.vehicleDetails.model || 'N/A'}</li>
                    <li><strong>Year:</strong> {data.vehicleDetails.year || 'N/A'}</li>
                    <li><strong>Color:</strong> {data.vehicleDetails.color || 'N/A'}</li>
                    <li><strong>Registration:</strong> {data.vehicleDetails.registration || 'N/A'}</li>
                    <li>
                      <strong>Vehicle Features:</strong>
                      <ul className="p-0 pt-1">
                        {data.vehicleDetails.features && data.vehicleDetails.features.length > 0 ? (
                          data.vehicleDetails.features.map((feature, i) => <li key={i}>{feature}</li>)
                        ) : (
                          <li>No features available</li>
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              )}

         
              {data?.price && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Price Details</h5>
                  <p>
                    <strong>Price Range:</strong> {data.price.currency || ''}{data.price.min || 'N/A'} - {data.price.currency || ''}{data.price.max || 'N/A'} ({data.price.period || 'N/A'})
                  </p>

                  {data.price.discounts && Object.keys(data.price.discounts).length > 0 && (
                    <div className="py-2 pt-1">
                      <p><strong>Discounts:</strong></p>
                      <ul>
                        {Object.keys(data.price.discounts).map((key, i) => (
                          <li key={i}><strong>{key}:</strong> {data.price.discounts[key]}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.price.additionalCharges && Object.keys(data.price.additionalCharges).length > 0 && (
                    <div className="py-2">
                      <p><strong>Additional Charges:</strong></p>
                      <ul>
                        {Object.keys(data.price.additionalCharges).map((key, i) => (
                          <li key={i}><strong>{key}:</strong> {data.price.additionalCharges[key]}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

         
              {data?.duration && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Duration Details</h5>
                  <ul>
                    <li><strong>Duration:</strong> {data.duration.hours || 0}h {data.duration.minutes || 0}m</li>
                    <li><strong>Flexible Timing:</strong> {data.duration.flexible ? "Yes" : "No"}</li>
                    <li><strong>Max Waiting Time:</strong> {data.duration.maxWaitingTime || 'N/A'}</li>
                  </ul>
                </div>
              )}

            
              <div className="compnay-calss">
                <h5>Description</h5>
                <p>{data?.description || 'No description available'}</p>
              </div>

   
              {data?.serviceHighlights && data.serviceHighlights.length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Service Highlights</h5>
                  <div className="company-badge">
                    {data.serviceHighlights.map((highlight, i) => (
                      <span className="badges" key={i}>{highlight}</span>
                    ))}
                  </div>
                </div>
              )}

           
              {data?.amenities && data.amenities.length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Amenities</h5>
                  <div className="company-badge">
                    {data.amenities.map((amenity, i) => (
                      <span className="badges" key={i}>{amenity}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="compnay-calss">
                <h5 className="mt-2">Cancellation Policy</h5>
                <p>{data?.cancellationPolicy || 'No cancellation policy available'}</p>
              </div>

              <div className="compnay-calss">
                <h5 className="mt-2">Payment Options</h5>
                {data?.paymentOptions && data.paymentOptions.length > 0 ? (
                  <ul>
                    {data.paymentOptions.map((option, i) => <li key={i}>{option}</li>)}
                  </ul>
                ) : (
                  <p>No payment options available</p>
                )}
              </div>

              <div className="compnay-calss">
                <h5 className="mt-2">Booking Information</h5>
                {data?.bookingInfo ? (
                  <ul>
                    <li><strong>Method:</strong> {data.bookingInfo.method || 'N/A'}</li>
                    <li><strong>Deadline:</strong> {data.bookingInfo.deadline || 'N/A'}</li>
                    <li><strong>Minimum Advance:</strong> ₹{data.bookingInfo.minAdvance || 'N/A'}</li>
                    <li><strong>Confirmation Time:</strong> {data.bookingInfo.confirmationTime || 'N/A'}</li>
                    <li><strong>Peak Season Surcharge:</strong> {data.bookingInfo.peakSeasonSurcharge || 'N/A'}</li>
                  </ul>
                ) : (
                  <p>No booking information available</p>
                )}
              </div>

              <div className="compnay-calss">
                <h5 className="mt-2">Tags</h5>
                {data?.tags && data.tags.length > 0 ? (
                  <div className="company-badge">
                    {data.tags.map((tag, i) => (
                      <span className="badges" key={i}>#{tag}</span>
                    ))}
                  </div>
                ) : (
                  <p>No tags available</p>
                )}
              </div>

              {data?.seasonalOffers && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Seasonal Offers</h5>
                  <p>{data.seasonalOffers}</p>
                </div>
              )}

              {data?.nearbyAttractions && data.nearbyAttractions.length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Nearby Attractions</h5>
                  <ul>
                    {data.nearbyAttractions.map((attraction, i) => <li key={i}>{attraction}</li>)}
                  </ul>
                </div>
              )}

              <div className="compnay-calss Customer">
                <h5 className="mt-2 mb-0">Customer Reviews</h5>
                {data.reviews ? (
                  <div>
                    {data.reviews.map((review, index) => (
                      <div key={index} className="bg-light rounded customer-reviews">
                        <div className="d-flex justify-content-between">
                          <strong>{review.user ?? "Anonymous"}</strong>
                          <span>{review.rating ?? "Not available"} / 5</span>
                        </div>
                        <p className="mb-0 mt-2">{review.comment ?? "No comment"}</p>
                        <small className="text-muted">
                          {review.date ? new Date(review.date).toLocaleDateString() : "Date not available"}
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="compnay-calss-review">
                    <p>No reviews available</p>
                  </div>
                )}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="job-details-page-card rightBar">
              {data?.provider && (
                <div className="compnay-calss pt-0">
                  <img
                    src={data.provider.logo}
                    width="80"
                    className="mx-auto d-block"
                    alt={data.provider.name}
                    style={{ objectFit: "contain" }}
                  />
                  <h5 className="mt-3 text-center">{data.provider.name}</h5>
                  <ul className="list-unstyled">
                    <li><strong>Service Type:</strong> {data.provider.serviceType || 'N/A'}</li>
                    <li><strong>Head Office:</strong> {data.provider.headOffice || 'N/A'}</li>
                    <li><strong>Founded:</strong> {data.provider.founded || 'N/A'}</li>
                    <li><strong>Company Size:</strong> {data.provider.companySize || 'N/A'}</li>
                    <li>
                      <strong>Website:</strong>{" "}
                      {data.provider.website ? (
                        <a href={data.provider.website} target="_blank" rel="noopener noreferrer">
                          {data.provider.website}
                        </a>
                      ) : 'N/A'}
                    </li>
                  </ul>
                  <p><small>{data.provider.about || 'No information available'}</small></p>
                </div>
              )}

              {data?.driverDetails && (
                <div className="compnay-calss">
                  <h5>Driver Details</h5>
                  <div className="DriverDetails text-left">
                    <img
                      src={data.driverDetails.photo}
                      alt={data.driverDetails.name}
                      className="rounded-circle"
                      width="100"
                      height="100"
                      style={{ objectFit: "cover" }}
                    />
                    <h6 className="mt-2">{data.driverDetails.name}</h6>
                    <ul>
                      <li><strong>Age:</strong> {data.driverDetails.age || 'N/A'}</li>
                      <li><strong>Experience:</strong> {data.driverDetails.experience || 'N/A'}</li>
                      <li><strong>Rating:</strong> {data.driverDetails.rating || 'N/A'} / 5.0</li>
                      <li><strong>Total Trips:</strong> {data.driverDetails.totalTrips?.toLocaleString() || 'N/A'}</li>
                      <li><strong>Languages:</strong> {data.driverDetails.languages?.join(", ") || 'N/A'}</li>
                    </ul>
                    {data.driverDetails.badges && data.driverDetails.badges.length > 0 && (
                      <>
                        <p><strong>Badges:</strong></p>
                        <div className="company-badge mapssi justify-content-start">
                          {data.driverDetails.badges.map((badge, i) => (
                            <span className="badges" key={i}>{badge}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {data?.price && (
                <div className="compnay-calss price-details">
                  <h5>Quick Price</h5>
                  <div className="price-detailss">
                    <h3>
                      {data.price.currency || ''}{data.price.min || 'N/A'} - {data.price.currency || ''}{data.price.max || 'N/A'}
                      <span>/{data.price.period || 'N/A'}</span>
                    </h3>
                    <Link to={`/book/${data.id}`}>
                      <button className="btn btn-primary w-100">Book Now</button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="compnay-calss">
                <h5>Service Stats</h5>
                {data?.stats ? (
                  <ul className="list-unstyled">
                    <li><strong>Views:</strong> {data.stats.views ?? "Not available"}</li>
                    <li><strong>Bookings:</strong> {data.stats.bookings ?? "Not available"}</li>
                    <li><strong>Cancelled:</strong> {data.stats.cancelled ?? "Not available"}</li>
                    <li><strong>Average Rating:</strong> {data.stats.avgRating ?? "Not available"} / 5</li>
                    <li><strong>5-Star Ratings:</strong> {data.stats.fiveStarRatings ?? "Not available"}</li>
                    <li><strong>Total Reviews:</strong> {data.stats.reviews ?? "Not available"}</li>
                    <li><strong>Service ID:</strong> {data.id ?? "Not available"}</li>
                  </ul>
                ) : (
                  <p>No stats available</p>
                )}
              </div>

              {data?.contactPerson && (
                <div className="compnay-calss">
                  <h5>Contact Person</h5>
                  <ul className="list-unstyled">
                    <li><strong>Name:</strong> {data.contactPerson.name || 'N/A'}</li>
                    <li><strong>Designation:</strong> {data.contactPerson.designation || 'N/A'}</li>
                    <li><strong>Email:</strong> {data.contactPerson.email || 'N/A'}</li>
                    <li><strong>Phone:</strong> {data.contactPerson.phone || 'N/A'}</li>
                    <li><strong>Available:</strong> {data.contactPerson.available || 'N/A'}</li>
                    <li><strong>Response Time:</strong> {data.contactPerson.responseTime || 'N/A'}</li>
                  </ul>
                </div>
              )}

              <div className="compnay-calss">
                <h5>Additional Info</h5>
                <ul className="list-unstyled">
                  <li><strong>Posted By:</strong> User #{data?.postedBy || 'N/A'}</li>
                  <li><strong>Created:</strong> {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</li>
                  <li><strong>Last Updated:</strong> {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'N/A'}</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ServiceDetails;