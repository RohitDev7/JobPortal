import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BookService() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [specialRequests, setSpecialRequests] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get(`http://localhost:5002/serviceDetails/${id}`);
                console.log("booking API:", res);
                setService(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchService();
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        const bookingdata = {
            serviceId: service?.id,
            serviceName: service?.title,
            serviceType: service?.serviceType,
            price: service?.price,
            fullName: fullName,
            email: email,
            phone: phone,
            pickupDate: pickupDate,
            pickupTime: pickupTime,
            returnDate: returnDate,
            returnTime: returnTime,
            passengers: passengers,
            specialRequests: specialRequests,
            paymentMethod: paymentMethod
        };
        try {
            const res = await axios.post("http://localhost:5002/bookings", bookingdata);
            console.log("response:", res);
            alert("Booking Successful!");
            navigate(`/service-details/${id}`);
        } catch (err) {
            console.error("error:", err);
            alert("Booking failed!");
        }
    };

    if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
    if (isError) return <h2 className="text-center mt-5">Error aaya</h2>;
    if (!service) return <h2 className="text-center mt-5">Service nahi mila</h2>;

    return (
        <div className="job-details-page book-page py-5">
            <Container>
                <Row>
                    <Col lg={12} className="m-auto">
                        <div className="header-heading">
                            <h3 className="mb-0">Book Your Flight</h3>
                            <p className="mb-0 small">{service.title}</p>
                        </div>

                        <div className="service-summary">
                            <Row>
                                <Col md={6}>
                                    <p><strong>From:</strong> {service.route?.from}</p>
                                    <p><strong>To:</strong> {service.route?.to}</p>
                                    <p><strong>Duration:</strong> {service.route?.duration}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Price:</strong> ₹{service.price?.min} - ₹{service.price?.max || "N/A"}</p>
                                    <p><strong>Per:</strong> Trip</p>
                                    <p><strong>Provider:</strong> {service.provider?.name || "N/A"}</p>
                                </Col>
                            </Row>
                        </div>

                        <Form onSubmit={submitForm}>
                            <h5 className="mb-3">Personal Details</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Number of Passengers *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            defaultValue="1"
                                            value={passengers}
                                            onChange={(e) => setPassengers(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h5 className="mb-3 mt-4">Journey Details</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pickup Date *</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={pickupDate}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pickup Time *</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={pickupTime}
                                            onChange={(e) => setPickupTime(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Return Date</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            value={returnDate}
                                            onChange={(e) => setReturnDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Return Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={returnTime}
                                            onChange={(e) => setReturnTime(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Special Requests</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Any special requirements?"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                />
                            </Form.Group>

                            <h5 className="mb-3 mt-4">Payment Method</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option>Cash</option>
                                            <option>Credit/Debit div</option>
                                            <option>UPI</option>
                                            <option>Net Banking</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="price-summary">
                                <Row>
                                    <Col sm={6}>
                                        <h5>Total Amount:</h5>
                                    </Col>
                                    <Col sm={6} className="text-end">
                                        <h4 className="text-primary">₹3000 - ₹5000</h4>
                                        <small className="text-muted">
                                            *Final price may vary
                                        </small>
                                    </Col>
                                </Row>
                            </div>

                            <div className="d-flex gap-3 mt-4">
                                <Button variant="secondary" className="w-50" onClick={() => navigate(`/service-details/${id}`)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="w-50">
                                    Confirm Booking
                                </Button>
                            </div>
                        </Form>

                        <div className="alert-card">
                            <p className="mb-1">✓ Free cancellation up to 24 hours before</p>
                            <p className="mb-0">✓ Secure payment • No hidden charges</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BookService;