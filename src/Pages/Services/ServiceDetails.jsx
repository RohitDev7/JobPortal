import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

function ServiceDetails() {
  const { id } = useParams(); // URL se ID lo

  const fetchServiceDetails = async () => {
    const res = await axios.get(`http://localhost:5003/serviceDetails/${id}`);
    console.log("service details api:", res);
    return res.data;
  };

  const {
    data: service,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: fetchServiceDetails,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (isError) return <h2 className="text-center mt-5">Error loading data</h2>;
  if (!service) return <h2 className="text-center mt-5">Service not found</h2>;

  return (
    <div className="job-details-page py-5">
      <Container>
        <Row className="mb-5">
          
          <Col lg={8}>
            <div className="job-details-page-card">
              <h3>{service?.title || "Service Title"}</h3>
              
              {/* Provider Logo and Basic Info */}
              {service?.provider?.logo && (
                <img
                  src={service?.provider?.logo}
                  width="80"
                  className="mx-auto mb-3"
                  alt={service?.provider?.name}
                />
              )}

              <div className="compnay-header">
                <p>
                  <strong>Provider:</strong> {service?.provider?.name}
                </p>
                <p>
                  <strong>Route:</strong> {service?.route?.from || "?"} →{" "}
                  {service?.route?.to || "?"}
                </p>
                {service?.route?.distance && (
                  <p><strong>Distance:</strong> {service?.route?.distance}</p>
                )}
                {service?.route?.duration && (
                  <p><strong>Duration:</strong> {service?.route?.duration}</p>
                )}
                {service?.route?.highway && (
                  <p><strong>Highway:</strong> {service?.route?.highway}</p>
                )}
                {service?.route?.tollCharges && (
                  <p><strong>Toll Charges:</strong> {service?.route?.tollCharges}</p>
                )}
                {service?.route?.bestTimeToTravel && (
                  <p><strong>Best Time to Travel:</strong> {service?.route?.bestTimeToTravel}</p>
                )}
                {service?.route?.frequency && (
                  <p><strong>Frequency:</strong> {service?.route?.frequency}</p>
                )}
                {service?.route?.terrain && (
                  <p><strong>Terrain:</strong> {service?.route?.terrain}</p>
                )}
                {service?.route?.maxAltitude && (
                  <p><strong>Max Altitude:</strong> {service?.route?.maxAltitude}</p>
                )}
                {service?.route?.bestSeason && (
                  <p><strong>Best Season:</strong> {service?.route?.bestSeason}</p>
                )}
                <p>
                  <strong>Service Type:</strong> {service?.serviceType}
                </p>
                <p>
                  <strong>Vehicle Type:</strong> {service?.vehicleType}
                </p>
              </div>

              {/* Vehicle Details - Handle both object and array formats */}
              <div className="compnay-calss">
                <h5 className="mt-2">Vehicle Details</h5>
                {service?.vehicleDetails && Array.isArray(service.vehicleDetails) ? (
                  service.vehicleDetails.map((vehicle, index) => (
                    <div key={index} className="mb-3">
                      <p><strong>Model:</strong> {vehicle.model}</p>
                      <p><strong>Engine:</strong> {vehicle.engine}</p>
                      <p><strong>Price:</strong> {vehicle.price}</p>
                      <p><strong>Features:</strong> {vehicle.features?.join(", ")}</p>
                    </div>
                  ))
                ) : service?.vehicleDetails ? (
                  <ul>
                    <li><strong>Model:</strong> {service.vehicleDetails.model}</li>
                    {service.vehicleDetails.year && <li><strong>Year:</strong> {service.vehicleDetails.year}</li>}
                    {service.vehicleDetails.color && <li><strong>Color:</strong> {service.vehicleDetails.color}</li>}
                    {service.vehicleDetails.registration && <li><strong>Registration:</strong> {service.vehicleDetails.registration}</li>}
                    {service.vehicleDetails.seats && <li><strong>Seats:</strong> {service.vehicleDetails.seats}</li>}
                    {service.vehicleDetails.configuration && <li><strong>Configuration:</strong> {service.vehicleDetails.configuration}</li>}
                    {service.vehicleDetails.features && <li><strong>Features:</strong> {service.vehicleDetails.features?.join(", ")}</li>}
                  </ul>
                ) : (
                  <p>No vehicle details available</p>
                )}
              </div>

              {/* Price Details */}
              <div className="compnay-calss">
                <h5 className="mt-2">Price Details</h5>
                <p className="m-0 pb-0">
                  <strong>Price Range:</strong> {service?.price?.currency}
                  {service?.price?.min} - {service?.price?.currency}
                  {service?.price?.max} / {service?.price?.period}
                </p>
                
                {/* Fare Types if available */}
                {service?.price?.fareTypes && (
                  <div className="mt-2">
                    <strong>Fare Types:</strong>
                    <ul>
                      {Object.entries(service.price.fareTypes).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Discounts */}
              {service?.price?.discounts && Object.keys(service.price.discounts).length > 0 && (
                <div className="compnay-calss pt-1">
                  <h5 className="mt-2">Discounts</h5>
                  <ul>
                    {Object.entries(service.price.discounts).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Charges */}
              {service?.price?.additionalCharges && Object.keys(service.price.additionalCharges).length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Additional Charges</h5>
                  <ul>
                    {Object.entries(service.price.additionalCharges).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Duration */}
              <div className="compnay-calss">
                <h5 className="mt-2">Duration</h5>
                {service?.duration?.hours !== undefined && (
                  <p><strong>Journey Time:</strong> {service?.duration?.hours}h {service?.duration?.minutes}m</p>
                )}
                {service?.duration?.minDays && (
                  <p><strong>Min Days:</strong> {service.duration.minDays}</p>
                )}
                {service?.duration?.maxDays && (
                  <p><strong>Max Days:</strong> {service.duration.maxDays}</p>
                )}
                <p><strong>Flexible:</strong> {service?.duration?.flexible ? "Yes" : "No"}</p>
                {service?.duration?.maxWaitingTime && (
                  <p><strong>Max Waiting Time:</strong> {service?.duration?.maxWaitingTime}</p>
                )}
                {service?.duration?.trafficNote && (
                  <p><strong>Traffic Note:</strong> {service.duration.trafficNote}</p>
                )}
              </div>

              {/* Included Gear (for bike rentals) */}
              {service?.includedGear && service.includedGear.length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Included Gear</h5>
                  <div className="company-badge">
                    {service.includedGear.map((item, i) => (
                      <span className="badges" key={i}>{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Flight Schedule */}
              {service?.flightSchedule && service.flightSchedule.length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Flight Schedule</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Flight</th>
                          <th>Departure</th>
                          <th>Arrival</th>
                          <th>Days</th>
                        </tr>
                      </thead>
                      <tbody>
                        {service.flightSchedule.map((flight, i) => (
                          <tr key={i}>
                            <td>{flight.flight}</td>
                            <td>{flight.departure}</td>
                            <td>{flight.arrival}</td>
                            <td>{flight.days}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Popular Routes (for bike rentals) */}
              {service?.route?.popularRoutes && service.route.popularRoutes.length > 0 && (
                <div className="compnay-calss">
                  <h5 className="mt-2">Popular Routes</h5>
                  {service.route.popularRoutes.map((route, i) => (
                    <div key={i} className="mb-2">
                      <p><strong>{route.name}</strong> - {route.distance} ({route.duration})</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="compnay-calss">
                <h5 className="mt-2">Amenities</h5>
                <div className="company-badge">
                  {service?.amenities?.map((amenity, i) => (
                    <span className="badges" key={i}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="compnay-calss">
                <h5 className="mt-2">Route Stops</h5>
                <div className="company-badge">
                  {service?.route?.stops?.map((stop, i) => (
                    <span className="badges" key={i}>
                      {stop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="compnay-calss">
                <h5 className="mt-2">Service Highlights</h5>
                <ul>
                  {service?.serviceHighlights?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="compnay-calss">
                <h5>Description</h5>
                <p>{service?.description || "No description available"}</p>
              </div>

              {/* Driver Details - Handle both regular and guide available formats */}
              <div className="compnay-calss">
                <h5>Driver Details</h5>
                {service?.driverDetails ? (
                  <div>
                    {service.driverDetails.name && service.driverDetails.name !== "No driver (self-drive)" ? (
                      <ul>
                        <li><strong>Name:</strong> {service.driverDetails.name}</li>
                        {service.driverDetails.age && <li><strong>Age:</strong> {service.driverDetails.age}</li>}
                        {service.driverDetails.experience && <li><strong>Experience:</strong> {service.driverDetails.experience}</li>}
                        {service.driverDetails.languages && <li><strong>Languages:</strong> {service.driverDetails.languages?.join(", ")}</li>}
                        {service.driverDetails.rating && <li><strong>Rating:</strong> ⭐ {service.driverDetails.rating}</li>}
                        {service.driverDetails.totalTrips && <li><strong>Total Trips:</strong> {service.driverDetails.totalTrips}</li>}
                        {service.driverDetails.badges && <li><strong>Badges:</strong> {service.driverDetails.badges?.join(", ")}</li>}
                        {service.driverDetails.specialties && <li><strong>Specialties:</strong> {service.driverDetails.specialties?.join(", ")}</li>}
                      </ul>
                    ) : (
                      <p>Self-drive service</p>
                    )}
                    
                    {/* Guide Available (for bike rentals) */}
                    {service.driverDetails.guideAvailable && (
                      <div className="mt-2">
                        <h6>Guide Available:</h6>
                        <ul>
                          <li><strong>Name:</strong> {service.driverDetails.guideAvailable.name}</li>
                          <li><strong>Experience:</strong> {service.driverDetails.guideAvailable.experience}</li>
                          <li><strong>Languages:</strong> {service.driverDetails.guideAvailable.languages?.join(", ")}</li>
                          <li><strong>Rating:</strong> ⭐ {service.driverDetails.guideAvailable.rating}</li>
                          <li><strong>Specialties:</strong> {service.driverDetails.guideAvailable.specialties?.join(", ")}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No driver details available</p>
                )}
              </div>

              <div className="compnay-calss">
                <h5>Cancellation Policy</h5>
                <p>{service?.cancellationPolicy || "No cancellation policy listed"}</p>
              </div>

              <div className="compnay-calss">
                <h5>Payment Options</h5>
                <ul>
                  {service?.paymentOptions?.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              </div>

              {/* Seasonal Offers */}
              {service?.seasonalOffers && (
                <div className="compnay-calss">
                  <h5>Seasonal Offers</h5>
                  <p>{service.seasonalOffers}</p>
                </div>
              )}

              {/* Nearby Attractions */}
              {service?.nearbyAttractions && service.nearbyAttractions.length > 0 && (
                <div className="compnay-calss">
                  <h5>Nearby Attractions</h5>
                  <div className="company-badge">
                    {service.nearbyAttractions.map((attraction, i) => (
                      <span className="badges" key={i}>{attraction}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {service?.reviews && service.reviews.length > 0 && (
                <div className="compnay-calss">
                  <h5>Customer Reviews</h5>
                  {service.reviews.map((review, i) => (
                    <div key={i} className="mb-3 p-3 border rounded">
                      <p><strong>{review.user}</strong> ⭐ {review.rating}</p>
                      <p>"{review.comment}"</p>
                      <small className="text-muted">{review.date}</small>
                    </div>
                  ))}
                </div>
              )}

              <div className="compnay-calss">
                <h5 className="mt-2">Tags</h5>
                <div className="company-badge">
                  {service?.tags?.map((tag, i) => (
                    <span className="badges" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            {/* Contact Person */}
            <div className="p-4 mb-4 shadow-sm">
              <h5>Contact Person</h5>
              {service?.contactPerson ? (
                <>
                  <p><strong>{service.contactPerson.name}</strong></p>
                  <p>{service.contactPerson.designation}</p>
                  <p>Email: {service.contactPerson.email}</p>
                  <p>Phone: {service.contactPerson.phone}</p>
                  {service.contactPerson.whatsapp && <p>WhatsApp: {service.contactPerson.whatsapp}</p>}
                  <p><strong>Available:</strong> {service.contactPerson.available}</p>
                  <p><strong>Response Time:</strong> {service.contactPerson.responseTime}</p>
                </>
              ) : (
                <p>No contact information available</p>
              )}
            </div>

            {/* Booking Info */}
            <div className="p-4 mb-4 shadow-sm">
              <h5>Booking Info</h5>
              {service?.bookingInfo ? (
                <>
                  <p><strong>Method:</strong> {service.bookingInfo.method}</p>
                  {service.bookingInfo.deadline && <p><strong>Deadline:</strong> {service.bookingInfo.deadline}</p>}
                  {service.bookingInfo.minAdvance && <p><strong>Min Advance:</strong> ₹{service.bookingInfo.minAdvance}</p>}
                  {service.bookingInfo.confirmationTime && <p><strong>Confirmation Time:</strong> {service.bookingInfo.confirmationTime}</p>}
                  {service.bookingInfo.peakSeasonSurcharge && (
                    <p><strong>Peak Season Surcharge:</strong> {service.bookingInfo.peakSeasonSurcharge}</p>
                  )}
                  {service.bookingInfo.documentsRequired && (
                    <>
                      <p><strong>Documents Required:</strong></p>
                      <ul>
                        {service.bookingInfo.documentsRequired.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {service.bookingInfo.ageRequirement && (
                    <p><strong>Age Requirement:</strong> {service.bookingInfo.ageRequirement}</p>
                  )}
                  {service.bookingInfo.externalUrl && (
                    <p>
                      <a href={service.bookingInfo.externalUrl} target="_blank" rel="noopener noreferrer">
                        Book Here
                      </a>
                    </p>
                  )}
                </>
              ) : (
                <p>No booking information available</p>
              )}
              <Button variant="primary" className="w-100 mt-3">
                Book Now
              </Button>
            </div>

            {/* Service Stats */}
            <div className="p-4 shadow-sm">
              <h5>Service Stats</h5>
              {service?.stats ? (
                <>
                  <p>Views: {service.stats.views}</p>
                  <p>Bookings: {service.stats.bookings}</p>
                  <p>Cancelled: {service.stats.cancelled || 0}</p>
                  <p>Avg Rating: ⭐ {service.stats.avgRating}</p>
                  {service.stats.fiveStarRatings && <p>5-Star Ratings: {service.stats.fiveStarRatings}</p>}
                  {service.stats.reviews && <p>Total Reviews: {service.stats.reviews}</p>}
                  {service.stats.onTimePerformance && <p>On-Time Performance: {service.stats.onTimePerformance}</p>}
                  {service.stats.repeatCustomers && <p>Repeat Customers: {service.stats.repeatCustomers}</p>}
                </>
              ) : (
                <p>No stats available</p>
              )}
              <hr />
              <small>
                <strong>Posted:</strong> {service?.createdAt}<br />
                <strong>Updated:</strong> {service?.updatedAt}
              </small>
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span className={service?.status === "active" ? "text-success" : "text-danger"}>
                  {service?.status}
                </span>
              </p>
            </div>
          </Col>

          {/* Provider Details Section */}
          <Col lg={12}>
            <div className="job-details-page-card mt-4">
              {service?.provider?.logo && (
                <img
                  src={service?.provider?.logo}
                  width="80"
                  className="mx-auto"
                  alt={service?.provider?.name}
                />
              )}

              <div className="compnay-calss pt-0">
                <h5 className="mt-3">{service?.provider?.name}</h5>
                <p>{service?.provider?.about}</p>
              </div>

              <div className="compnay-calss">
                <ul>
                  {service?.provider?.serviceType && (
                    <li><strong>Service Type:</strong> {service.provider.serviceType}</li>
                  )}
                  {service?.provider?.companySize && (
                    <li><strong>Company Size:</strong> {service.provider.companySize}</li>
                  )}
                  {service?.provider?.founded && (
                    <li><strong>Founded:</strong> {service.provider.founded}</li>
                  )}
                  {service?.provider?.headOffice && (
                    <li><strong>Head Office:</strong> {service.provider.headOffice}</li>
                  )}
                  {service?.provider?.website && (
                    <li>
                      <strong>Website:</strong>{" "}
                      <a href={service.provider.website} target="_blank" rel="noopener noreferrer">
                        {service.provider.website}
                      </a>
                    </li>
                  )}
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