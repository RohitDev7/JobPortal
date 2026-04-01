import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../../../components/Sidebar';
import Table from 'react-bootstrap/Table';
import { Container, Col, Button } from "react-bootstrap";

export default function ManageBookingsAll({ sidebarOpen, setSidebarOpen }) {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5002/bookings");
        setBookings(res.data); 
        console.log("bookings:", res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);


  const filteredBookings = bookings.filter(item =>
    item.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.agencyName?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
    (item.agencyId?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
  );

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/bookings/${id}`);
      setBookings(bookings.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
        <Container>
         

              <Col lg={12}>
                                     <div className="manage-heading d-flex align-items-center justify-content-between">
                                  <div className="manage-headings">
                                      <h2 className="dashboard-title">All Bookings</h2>
                                      </div>
          
            <div className="manage-heading-search">
                                      <input
                type="search"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px" }}
              />
                                      </div>
                                      </div>
                                  </Col>

           <Col lg={12}>
                                    <div className="chart-card">
                                        <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                      <th>Agency ID</th>
                    <th>Agency Name</th>
                    <th>Service Name</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Pickup Date & Time</th>
                    <th>Return Date & Time</th>
                    <th>Passengers</th>
                    <th>Price (₹)</th>
                    <th>Discounts</th>
                    <th>Additional Charges</th>
                    <th>Special Requests</th>
                    <th>Payment Method</th>
                  
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                          <td>{booking.agencyId}</td>
                        <td>{booking.providerName || "-"}</td>
                        <td>{booking.serviceName}</td>
                        <td>{booking.fullName}</td>
                        <td>{booking.email}</td>
                        <td>{booking.phone}</td>
                        <td>{booking.pickupDate} {booking.pickupTime}</td>
                        <td>{booking.returnDate} {booking.returnTime}</td>
                        <td>{booking.passengers}</td>
                        <td>{booking.price?.amount} {booking.price?.currency}</td>
                        <td>
                          <ul>
                            {booking.price?.discounts && Object.entries(booking.price.discounts).map(([key, val]) => (
                              <li key={key}>{val}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {booking.price?.additionalCharges && Object.entries(booking.price.additionalCharges).map(([key, val]) => (
                              <li key={key}>{val}</li>
                            ))}
                          </ul>
                        </td>
                        <td>{booking.specialRequests}</td>
                        <td>{booking.paymentMethod}</td>
                      
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="16" className="text-center">No bookings found</td>
                    </tr>
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