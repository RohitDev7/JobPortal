import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../../../components/Sidebar';
import Table from 'react-bootstrap/Table';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ManageServicesDetails({ sidebarOpen, setSidebarOpen }) {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState({});



  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5002/serviceDetails");
        console.log("Fetched services:", res.data);
        
        const allServices = res.data;
        
        console.log("All services:", allServices);
        setServices(allServices);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []); 

  const filteredServices = services.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.route?.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.route?.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.agencyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.provider?.providerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`http://localhost:5002/serviceDetails/${id}`);
      setServices(services.filter(item => item.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ReadMore = ({ text, id }) => {
    const isExpanded = expandedRows[id];
    const words = text?.split(" ") || [];
    const shortText = words.slice(0, 50).join(" ");
  
    return (
      <span>
        {isExpanded ? text : shortText}
        {words.length > 50 && (
          <span
            style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            onClick={() => toggleExpand(id)}
          >
            {isExpanded ? " Read less" : " Read more"}
          </span>
        )}
      </span>
    );
  };

  const updateServiceStatus = async (id, newStatus) => {
    try {
      const serviceToUpdate = services.find(item => item.id === id);
      const updatedService = { ...serviceToUpdate, status: newStatus };
      
      await axios.put(`http://localhost:5002/serviceDetails/${id}`, updatedService);
      
      setServices(services.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
      
      alert(`Service ${newStatus} successfully!`);
    } catch (err) {
      console.error(`Error updating service status to ${newStatus}:`, err);
      alert(`Failed to ${newStatus} service. Please try again.`);
    }
  };

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this service?")) {
      updateServiceStatus(id, "approved");
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this service?")) {
      updateServiceStatus(id, "rejected");
    }
  };

  const handlePending = (id) => {
    if (window.confirm("Are you sure you want to mark this service as pending?")) {
      updateServiceStatus(id, "pending");
    }
  };

  const handleBan = (id) => {
    if (window.confirm("Are you sure you want to ban this service? This action can be reversed.")) {
      updateServiceStatus(id, "banned");
    }
  };

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
        <Container fluid>
          <Col lg={12}>
            <div className="manage-heading d-flex align-items-center justify-content-between">
              <div className="manage-headings">
                <h2 className="dashboard-title">Manage All Services Details</h2>
                <p className="text-muted">Admin View - Showing all services from all agencies</p>
              </div>

              <div className="d-flex align-items-center gap-2 manage-heading-search">
                <input
                  type="search"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: "8px", width: "300px" }}
                />

                <Link to="/agency-add-manage-service-details">
                  <Button variant="primary" className="w-100 manage-add-sevices">
                    Add Service
                  </Button>
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-4">
            <div className="chart-card">
              <div className="table-responsive">
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Agency ID</th>
                      <th>Agency Name</th>
                      <th>Provider Name</th>
                      <th>Provider Website</th>
                      <th>Service Type</th>
                      <th>Vehicle Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Distance</th>
                      <th>Route Duration</th>
                      <th>Stops</th>
                      <th>Highway</th>
                      <th>Toll Charges</th>
                      <th>Best Time</th>
                      <th>Vehicle Model</th>
                      <th>Vehicle Year</th>
                      <th>Vehicle Color</th>
                      <th>Registration</th>
                      <th>Features</th>
                      <th>Price Amount</th>
                      <th>Currency</th>
                      <th>Period</th>
                      <th>Discounts</th>
                      <th>Additional Charges</th>
                      <th>Duration Hours</th>
                      <th>Duration Minutes</th>
                      <th>Flexible</th>
                      <th>Max Waiting Time</th>
                      <th>Amenities</th>
                      <th>Service Highlights</th>
                      <th>Description</th>
                      <th>Driver Name</th>
                      <th>Driver Age</th>
                      <th>Driver Experience</th>
                      <th>Driver Languages</th>
                      <th>Driver Rating</th>
                      <th>Driver Total Trips</th>
                      <th>Driver Badges</th>
                      <th>Driver Phone</th>
                      <th>Cancellation Policy</th>
                      <th>Payment Options</th>
                      <th>Contact Person Name</th>
                      <th>Contact Person Designation</th>
                      <th>Contact Person Email</th>
                      <th>Contact Person Phone</th>
                      <th>Booking Method</th>
                      <th>Booking Deadline</th>
                      <th>Min Advance</th>
                      <th>Confirmation Time</th>
                      <th>Peak Season Surcharge</th>
                      <th>Views</th>
                      <th>Bookings</th>
                      <th>Cancelled</th>
                      <th>Avg Rating</th>
                      <th>5-Star Ratings</th>
                      <th>Total Reviews</th>
                      <th>Tags</th>
                      <th>Seasonal Offers</th>
                      <th>Nearby Attractions</th>
                      <th>Posted By</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th>ISME Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.length === 0 ? (
                      <tr><td colSpan="71">No services found.</td></tr>
                    ) : (
                      filteredServices.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.slug}</td>
                          <td>{item.agencyId}</td>
                          <td>{item.agencyName}</td>
                          <td>{item.provider?.providerName}</td>
                          <td><a href={item.provider?.website} target="_blank" rel="noopener noreferrer">{item.provider?.website}</a></td>
                          <td>{item.serviceType}</td>
                          <td>{item.vehicleType}</td>
                          <td>{item.route?.from}</td>
                          <td>{item.route?.to}</td>
                          <td>{item.route?.distance}</td>
                          <td>{item.route?.duration}</td>
                          <td>{item.route?.stops?.join(", ")}</td>
                          <td>{item.route?.highway}</td>
                          <td>{item.route?.tollCharges}</td>
                          <td>{item.route?.bestTimeToTravel}</td>
                          <td>{item.vehicleDetails?.model}</td>
                          <td>{item.vehicleDetails?.year}</td>
                          <td>{item.vehicleDetails?.color}</td>
                          <td>{item.vehicleDetails?.registration}</td>
                          <td>{item.vehicleDetails?.features?.join(", ")}</td>
                          <td>{item.price?.amount}</td>
                          <td>{item.price?.currency}</td>
                          <td>{item.price?.period}</td>
                          <td>
                            {item.price?.discounts && Object.entries(item.price.discounts).map(([key, val]) => (
                              <div key={key}><strong>{key}:</strong> {val}</div>
                            ))}
                          </td>
                          <td>
                            {item.price?.additionalCharges && Object.entries(item.price.additionalCharges).map(([key, val]) => (
                              <div key={key}><strong>{key}:</strong> {val}</div>
                            ))}
                          </td>
                          <td>{item.duration?.hours}</td>
                          <td>{item.duration?.minutes}</td>
                          <td>{item.duration?.flexible ? "Yes" : "No"}</td>
                          <td>{item.duration?.maxWaitingTime}</td>
                          <td>{item.amenities?.join(", ")}</td>
                          <td>{item.serviceHighlights?.join(", ")}</td>
                          <td><ReadMore text={item.description} id={item.id} /></td>
                          <td>{item.driverDetails?.name}</td>
                          <td>{item.driverDetails?.age}</td>
                          <td>{item.driverDetails?.experience}</td>
                          <td>{item.driverDetails?.languages?.join(", ")}</td>
                          <td>{item.driverDetails?.rating}</td>
                          <td>{item.driverDetails?.totalTrips}</td>
                          <td>{item.driverDetails?.badges?.join(", ")}</td>
                          <td>{item.driverDetails?.phone}</td>
                          <td><ReadMore text={item.cancellationPolicy} id={`cancel-${item.id}`} /></td>
                          <td>{item.paymentOptions?.join(", ")}</td>
                          <td>{item.contactPerson?.name}</td>
                          <td>{item.contactPerson?.designation}</td>
                          <td>{item.contactPerson?.email}</td>
                          <td>{item.contactPerson?.phone}</td>
                          <td>{item.bookingInfo?.method}</td>
                          <td>{item.bookingInfo?.deadline}</td>
                          <td>{item.bookingInfo?.minAdvance}</td>
                          <td>{item.bookingInfo?.confirmationTime}</td>
                          <td>{item.bookingInfo?.peakSeasonSurcharge}</td>
                          <td>{item.stats?.views}</td>
                          <td>{item.stats?.bookings}</td>
                          <td>{item.stats?.cancelled}</td>
                          <td>{item.stats?.avgRating}</td>
                          <td>{item.stats?.fiveStarRatings}</td>
                          <td>{item.stats?.reviews}</td>
                          <td>{item.tags?.join(", ")}</td>
                          <td>{item.seasonalOffers}</td>
                          <td>{item.nearbyAttractions?.join(", ")}</td>
                          <td>{item.postedBy}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.updatedAt}</td>
                          <td>
                            <span className={item.status === "approved" ? "text-success" : item.status === "pending" ? "text-warning" : item.status === "rejected" ? "text-danger" : item.status === "banned" ? "text-dark" : "text-muted"}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <Link to={`/agency-edit-manage-service-details/${item.id}`}>
                              <button className="btn btn-sm btn-primary me-2 mb-1">Edit</button>
                            </Link>
                            <button onClick={() => deleteItem(item.id)} className="btn btn-sm btn-danger">Delete</button>
                          </td>
                          <td>
                            <div className="d-flex flex-column gap-1">
                              {item.status !== "approved" && (
                                <button 
                                  onClick={() => handleApprove(item.id)} 
                                  className="btn btn-sm btn-success"
                                  style={{ fontSize: "12px" }}
                                >
                                  Approve
                                </button>
                              )}
                              {item.status !== "rejected" && (
                                <button 
                                  onClick={() => handleReject(item.id)} 
                                  className="btn btn-sm btn-danger"
                                  style={{ fontSize: "12px" }}
                                >
                                 Reject
                                </button>
                              )}
                              {item.status !== "pending" && (
                                <button 
                                  onClick={() => handlePending(item.id)} 
                                  className="btn btn-sm btn-warning"
                                  style={{ fontSize: "12px" }}
                                >
                                 Pending
                                </button>
                              )}
                            
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
}