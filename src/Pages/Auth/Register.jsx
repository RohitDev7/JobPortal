import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';

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

        passportFile: null,
        passportExpiry: "",

        agencyDocument: null,
        agencyLogo: null,
        companyRegistrationNumber: "",
        gstNumber: "",
        licenseNumber: "",



        title: "",
        providerName: "",
        from: "",
        to: "",
        location: "",
        price: "",
        type: "",
        duration: "",
        status: "active",
        amenities: "",
        description: "",
        logo: ""
    });

    const [error, setError] = useState("");
    const [role, setRole] = useState("");

    const handlechange = (e) => {
        if (e.target.type === "file") {
            setForm({ ...form, [e.target.name]: e.target.files[0] });
        } else if (e.target.type === "checkbox") {
            setForm({ ...form, [e.target.name]: e.target.checked });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

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
                });
                console.log(res.data);

                if (form.passportFile) {
                    await axios.post("http://localhost:5002/travelDocuments", {
                        customerId: res.data.id,
                        title: form.firstname + " Passport",
                        fileUrl: form.passportFile.name,
                        documentType: "Passport",
                        expiryDate: form.passportExpiry
                    });
                }
            } else if (role === "agency") {
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
                    companyRegistrationNumber: form.companyRegistrationNumber,
                    gstNumber: form.gstNumber,
                    licenseNumber: form.licenseNumber
                });
                console.log(res.data);

                await axios.post("http://localhost:5002/transportProviders", {
                    name: form.agencyname,
                    logo: form.agencyLogo ? form.agencyLogo.name : "",
                    website: form.website,
                    title: form.agencyname + " Company Document",
                    fileUrl: form.agencyDocument.name,
                    documentType: "Agency License",
                });


                await axios.post("http://localhost:5002/services", {
                    title: form.title,
                    providerId: 1,
                    providerName: form.providerName,
                    price: form.price,
                    type: form.type,
                    duration: form.duration,
                    amenities: form.amenities,
                    description: form.description,
                    status: form.status,
                    logo: form.logo ? form.logo : "",
                    postedBy: res.data.id,
                    createdAt: new Date().toISOString().split("T")[0]
                });


            }

            setRole("");
            setError("");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Registration failed");
        }
    };

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
                                        <div className="d-flex gap-4">
                                            <Form.Check type="radio" label="Customer" name="role"
                                                value="customer"
                                                checked={role === "customer"}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <Form.Check type="radio" label="Travel Agency" name="role"
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
                                        <Form.Control type="text" name="firstname" value={form.firstname} onChange={handlechange} />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Last Name *</Form.Label>
                                        <Form.Control type="text" name="lastname" value={form.lastname} onChange={handlechange} />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control type="email" name="email" value={form.email} onChange={handlechange} />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="tel" name="phone" value={form.phone} onChange={handlechange} />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Password *</Form.Label>
                                        <Form.Control type="password" name="password" value={form.password} onChange={handlechange} />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>Confirm Password *</Form.Label>
                                        <Form.Control type="password" name="confirmpassword" value={form.confirmpassword} onChange={handlechange} />
                                    </Col>

                                    {role === "customer" && (
                                        <>
                                            <Col md={12}>
                                                <h5 className="section-title mt-3">Travel Profile</h5>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Nationality</Form.Label>
                                                <Form.Control name="nationality" value={form.nationality} onChange={handlechange} />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Current City</Form.Label>
                                                <Form.Control name="currentcity" value={form.currentcity} onChange={handlechange} />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Preferred Travel Style</Form.Label>
                                                <Form.Select name="preferredtravelstyle" value={form.preferredtravelstyle} onChange={handlechange}>
                                                    <option value="">Select</option>
                                                    <option>Luxury</option>
                                                    <option>Budget</option>
                                                    <option>Backpacking</option>
                                                    <option>Adventure</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Travel Frequency</Form.Label>
                                                <Form.Select name="travelfrequecy" value={form.travelfrequecy} onChange={handlechange}>
                                                    <option>Select frequency</option>
                                                    <option>Rarely</option>
                                                    <option>Once a year</option>
                                                    <option>2-3 times a year</option>
                                                    <option>Frequent traveler</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Budget Range</Form.Label>
                                                <Form.Select name="budgetrange" value={form.budgetrange} onChange={handlechange}>
                                                    <option>Select budget</option>
                                                    <option>₹10k - ₹25k</option>
                                                    <option>₹25k - ₹50k</option>
                                                    <option>₹50k - ₹1L</option>
                                                    <option>₹1L+</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Preferred Destination</Form.Label>
                                                <Form.Control name="preferreddestination" value={form.preferreddestination} onChange={handlechange} />
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Label>Interests</Form.Label>
                                                <Form.Control name="intrests" value={form.intrests} onChange={handlechange} />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Passport Upload</Form.Label>
                                                <Form.Control type="file" name="passportFile" onChange={handlechange} />
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Label>Passport Expiry</Form.Label>
                                                <Form.Control type="date" name="passportExpiry" value={form.passportExpiry} onChange={handlechange} />
                                            </Col>
                                        </>
                                    )}

                                    {role === "agency" && (
                                        <>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Agency Name</Form.Label>
                                                    <Form.Control name="agencyname" value={form.agencyname} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Website</Form.Label>
                                                    <Form.Control name="website" value={form.website} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control name="location" value={form.location} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Service Type</Form.Label>
                                                    <Form.Control name="servicetype" value={form.servicetype} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Company Size</Form.Label>
                                                    <Form.Control name="companysize" value={form.companysize} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Company Reg Number</Form.Label>
                                                    <Form.Control name="companyRegistrationNumber" value={form.companyRegistrationNumber} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>GST Number</Form.Label>
                                                    <Form.Control name="gstNumber" value={form.gstNumber} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>License Number</Form.Label>
                                                    <Form.Control name="licenseNumber" value={form.licenseNumber} onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Agency Logo</Form.Label>
                                                    <Form.Control type="file" name="agencyLogo" onChange={handlechange} />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Agency Document</Form.Label>
                                                    <Form.Control type="file" name="agencyDocument" onChange={handlechange} />
                                                </Col>

                                            </Row>


                                            <Row>

                                                <h2 className='py-3'>Card Content</h2>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control
                                                        name="title"
                                                        value={form.title}
                                                        onChange={handlechange}
                                                        placeholder="Enter cab title"
                                                    />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Provider Name</Form.Label>
                                                    <Form.Control
                                                        name="providerName"
                                                        value={form.providerName}
                                                        onChange={handlechange}
                                                        placeholder="Enter provider name"
                                                    />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Price (₹)</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="price"
                                                        value={form.price}
                                                        onChange={handlechange}
                                                        placeholder="Enter price"
                                                    />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Type</Form.Label>
                                                    <Form.Select name="type" value={form.type} onChange={handlechange}>
                                                        <option value="">Select Type</option>
                                                        <option value="Bus">Bus</option>
                                                        <option value="Cab">Cab</option>
                                                        <option value="SUV">SUV</option>
                                                        <option value="Sedan">Sedan</option>
                                                    </Form.Select>
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Duration</Form.Label>
                                                    <Form.Control
                                                        name="duration"
                                                        value={form.duration}
                                                        onChange={handlechange}
                                                        placeholder="e.g. 5 Hours"
                                                    />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select name="status" value={form.status} onChange={handlechange}>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </Form.Select>
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Amenities</Form.Label>
                                                    <Form.Control
                                                        name="amenities"
                                                        value={form.amenities}
                                                        onChange={handlechange}
                                                        placeholder="AC, Water Bottle, Music System"
                                                    />
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label>Logo URL</Form.Label>
                                                    <Form.Control
                                                        name="logo"
                                                        value={form.logo}
                                                        onChange={handlechange}
                                                        placeholder="Paste image URL"
                                                    />
                                                </Col>

                                                <Col md={12} className="mb-3">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="description"
                                                        value={form.description}
                                                        onChange={handlechange}
                                                    />
                                                </Col>
         <Col md={12} className="mb-3">
                                                <Form.Check
    type="checkbox"
    label="I agree to terms & conditions"
    name="agree"
    checked={form.agree}
    onChange={handlechange}
/>
             </Col>                               </Row>
                                        </>
                                    )}

                                </Row>

                                <button type="submit" className="signup-btn">Create Account</button>
                                <Link to="/login" className="signup-signin">Sign In</Link>

                                {error && <p className="text-danger mt-2">{error}</p>}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}