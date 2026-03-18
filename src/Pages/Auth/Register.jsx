import { Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import React, { useState } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap'

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",

        nationality: "",
        currentcity: "",
        preferredtravelstyle: "",
        travelfrequecy: "",
        budgetrange: "",
        preferreddestination: "",
        intrests: "",

        agencyname: "",
        website: "",
        location: "",
        servicetype: "",
        companysize: "",
        description: "",
        agree: false,
    });

    const [error, setError] = useState("");
    const [role, setRole] = useState("");

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            if (role === "customer") {
                const res = await axios.post("http://localhost:5002/customers", {
                    firstname: form.firstname,
                    lastname: form.lastname,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                    confirmpassword: form.confirmpassword,
                    nationality: form.nationality,
                    currentcity: form.currentcity,
                    preferredtravelstyle: form.preferredtravelstyle,
                    travelfrequecy: form.travelfrequecy,
                    budgetrange: form.budgetrange,
                    preferreddestination: form.preferreddestination,
                    intrests: form.intrests
                })
                console.log(res.data);
            }
            else if (role === "agency") {
                const res = await axios.post("http://localhost:5002/travelAgencies", {
                    firstname: form.firstname,
                    lastname: form.lastname,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                    confirmpassword: form.confirmpassword,
                    agencyname: form.agencyname,
                    website: form.website,
                    location: form.location,
                    servicetype: form.servicetype,
                    companysize: form.companysize,
                    description: form.description,
                    agree: form.agree,
                });
                console.log(res.data);
            }
            setRole("");
            setError("");
            navigate({ to: "/login" });
        }
        catch {
            setError(error, "error")
        }

    }




    return (
        <div className='job-details-page register-pages py-5'>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={9}>
                        <div className="signup-card">
                            <h2 className="signup-title">Create Account</h2>

                            <Form onSubmit={handleSubmit}>
                                <Row>


                                    <Col md={12} className="mb-4">
                                        <Form.Label className="fw-bold">I want to register as:</Form.Label>
                                        <div className="d-flex gap-4">
                                            <Form.Check
                                                type="radio"
                                                label="Customer"
                                                name="role"
                                                value="customer"
                                                checked={role === "customer"}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Travel Agency"
                                                name="role"
                                                value="agency"
                                                checked={role === "agency"}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </div>
                                    </Col>


                                    <Col md={12}>
                                        <h5 className="section-title">Personal Information</h5>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>First Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstname"
                                            value={form.firstname}
                                            onChange={handlechange}
                                        />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Last Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter last name"
                                            name="lastname"
                                            value={form.lastname}
                                            onChange={handlechange}
                                        />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={form.email}
                                            onChange={handlechange}
                                        />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="+91 9876543210"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handlechange}
                                        />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Password *</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            value={form.password}
                                            onChange={handlechange}
                                        />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Confirm Password *</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmpassword"
                                            placeholder="Confirm password"
                                            value={form.confirmpassword}
                                            onChange={handlechange}
                                        />
                                    </Col>


                                    {role === "customer" && (
                                        <>
                                            <Col md={12}>
                                                <h5 className="section-title mt-3">Travel Profile</h5>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Nationality</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="nationality"
                                                    value={form.nationality}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Current City</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="currentcity"
                                                    value={form.currentcity}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Preferred Travel Style</Form.Label>
                                                <Form.Select
                                                    value={form.preferredtravelstyle}
                                                    onChange={handlechange}
                                                    name="preferredtravelstyle"
                                                >
                                                    <option value="">Select style</option>
                                                    <option>Luxury</option>
                                                    <option>Budget</option>
                                                    <option>Backpacking</option>
                                                    <option>Adventure</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Travel Frequency</Form.Label>
                                                <Form.Select
                                                    value={form.travelfrequecy}
                                                    onChange={handlechange}
                                                    name="travelfrequecy"
                                                >
                                                    <option>Select frequency</option>
                                                    <option>Rarely</option>
                                                    <option>Once a year</option>
                                                    <option>2-3 times a year</option>
                                                    <option>Frequent traveler</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Budget Range</Form.Label>
                                                <Form.Select
                                                    value={form.budgetrange}
                                                    onChange={handlechange}
                                                    name="budgetrange"
                                                >
                                                    <option>Select budget</option>
                                                    <option>₹10k - ₹25k</option>
                                                    <option>₹25k - ₹50k</option>
                                                    <option>₹50k - ₹1L</option>
                                                    <option>₹1L+</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Preferred Destinations</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="preferreddestination"
                                                    value={form.preferreddestination}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Label>Interests</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="intrests"
                                                    value={form.intrests}
                                                    onChange={handlechange}
                                                />
                                            </Col>
                                        </>

                                    )}


                                    {role === "agency" && (
                                        <>
                                            <Col md={12}>
                                                <h5 className="section-title mt-3">Agency Details</h5>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Agency Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="agencyname"
                                                    value={form.agencyname}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Website</Form.Label>
                                                <Form.Control
                                                    type="url"
                                                    placeholder=""
                                                    name="website"
                                                    value={form.website}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="location"
                                                    value={form.location}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Service Type</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="servicetype"
                                                    value={form.servicetype}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Company Size</Form.Label>
                                                <Form.Select
                                                    value={form.companysize}
                                                    onChange={handlechange}
                                                    name="companysize"
                                                >
                                                    <option value="">Select size</option>
                                                    <option>1-10</option>
                                                    <option>11-50</option>
                                                    <option>51-200</option>
                                                    <option>200+</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea" rows={3}
                                                    name="description"
                                                    value={form.description}
                                                    onChange={handlechange}
                                                />
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Check
                                                    type="checkbox"
                                                    label="I agree to Terms & Conditions"
                                                    name="agree"
                                                    value={form.agree}
                                                    onChange={(e) =>
                                                        setForm({ ...form, agree: e.target.checked })
                                                    }
                                                />
                                            </Col>
                                        </>
                                    )}

                                </Row>

                                <button type="submit" className="signup-btn">
                                    Create Account
                                </button>

                                {error && <p className="text-danger mt-2">{error}</p>}
                            </Form>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}