import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AgencyAddManageServices({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  // Get all user data from localStorage
  const [loggedInUser, setLoggedInUser] = useState({
    agencyId: "",
    agencyName: "",
    providerId: "",
    providerName: "",
    name: "",
    email: "",
    logo: ""
  });

  const [form, setForm] = useState({
    title: "",
    providerName: "",
    providerId: "",
    agencyId: "",
    agencyName: "",
    location: "",
    price: "",
    type: "",
    duration: "",
    amenities: "",
    description: "",
    status: "pending",
    logo: ""
  });

  // Load user data when component mounts
  useEffect(() => {
    // Try to get user data from localStorage (adjust keys based on your login system)
    const userData = localStorage.getItem("user");
    const agencyId = localStorage.getItem("agencyId");
    const agencyName = localStorage.getItem("agencyName");
    const providerId = localStorage.getItem("providerId");
    const providerName = localStorage.getItem("providerName");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    
    // Parse user data if it exists as JSON
    let parsedUser = {};
    if (userData) {
      try {
        parsedUser = JSON.parse(userData);
      } catch (e) {
        console.log("User data not in JSON format");
      }
    }
    
    // Set logged in user data
    const finalAgencyId = agencyId || parsedUser.agencyId || parsedUser.id || "";
    const finalAgencyName = agencyName || parsedUser.agencyName || parsedUser.name || "";
    const finalProviderId = providerId || parsedUser.providerId || parsedUser.id || "";
    const finalProviderName = providerName || parsedUser.providerName || parsedUser.name || "";
    
    setLoggedInUser({
      agencyId: finalAgencyId,
      agencyName: finalAgencyName,
      providerId: finalProviderId,
      providerName: finalProviderName,
      name: userName || parsedUser.name || "",
      email: userEmail || parsedUser.email || "",
      logo: parsedUser.logo || ""
    });
    
    // Auto-fill the form with logged-in user data
    setForm(prev => ({
      ...prev,
      providerName: finalProviderName,
      providerId: finalProviderId,
      agencyId: finalAgencyId,
      agencyName: finalAgencyName,
      logo: parsedUser.logo || ""
    }));
    
    console.log("Logged in user loaded:", {
      agencyId: finalAgencyId,
      agencyName: finalAgencyName,
      providerId: finalProviderId,
      providerName: finalProviderName
    });
  }, []);

  const addService = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to send
      const serviceData = {
        title: form.title,
        providerName: form.providerName,
        providerId: form.providerId,
        agencyId: form.agencyId,
        agencyName: form.agencyName,
        location: form.location,
        price: form.price,
        type: form.type,
        duration: form.duration,
        amenities: form.amenities,
        description: form.description,
        status: form.status,
        logo: form.logo,
        postedBy: form.agencyId || form.providerId,
        createdAt: new Date().toISOString()
      };
      
      console.log("Adding service with data:", serviceData);
      
      await axios.post(`http://localhost:5002/services`, serviceData);
      alert("Service added successfully!");
      navigate("/manage-services");
    } catch (err) {
      console.log("Error adding service", err);
      alert("Error adding service. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className="dashboard-title">Add Service</h2>
            </Col>

            <Col lg={12}>
              <div className="chart-card">
                <form className="signup-form" onSubmit={addService}>
                  <Row>
                    {/* Display logged-in user info at the top */}
                    <Col md={12} className="mb-4">
                      <div className="alert alert-info">
                        <strong>👤 Logged in as:</strong> {loggedInUser.providerName || loggedInUser.name || "Agency User"} <br/>
                        <strong>🏢 Agency ID:</strong> {loggedInUser.agencyId} <br/>
                        <strong>📛 Provider ID:</strong> {loggedInUser.providerId} <br/>
                        <strong>✉️ Email:</strong> {loggedInUser.email}
                      </div>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Title *</Form.Label>
                      <Form.Control
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Delhi to Manali Volvo Bus"
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Provider Name *</Form.Label>
                      <Form.Control
                        name="providerName"
                        value={form.providerName}
                        onChange={handleChange}
                        required
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">
                        Auto-filled from your login (cannot be changed)
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Provider ID</Form.Label>
                      <Form.Control
                        name="providerId"
                        value={form.providerId}
                        onChange={handleChange}
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">
                        Auto-filled from your login
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Agency ID</Form.Label>
                      <Form.Control
                        name="agencyId"
                        value={form.agencyId}
                        onChange={handleChange}
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">
                        Auto-filled from your login
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Agency Name</Form.Label>
                      <Form.Control
                        name="agencyName"
                        value={form.agencyName}
                        onChange={handleChange}
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">
                        Auto-filled from your login
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Location *</Form.Label>
                      <Form.Control
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Delhi to Manali or Delhi"
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Price *</Form.Label>
                      <Form.Control
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 1500 or 2500"
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Type *</Form.Label>
                      <Form.Select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Service Type</option>
                        <option value="Bus">Bus</option>
                        <option value="Cab">Cab</option>
                        <option value="Flight">Flight</option>
                        <option value="Hotel">Hotel</option>
                      </Form.Select>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Duration *</Form.Label>
                      <Form.Control
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 12 hours or 2 days"
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Amenities</Form.Label>
                      <Form.Control
                        name="amenities"
                        value={form.amenities}
                        onChange={handleChange}
                        placeholder="e.g., AC, WiFi, Food, Water Bottle"
                      />
                      <Form.Text className="text-muted">
                        Comma separated values
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Logo URL</Form.Label>
                      <Form.Control
                        name="logo"
                        value={form.logo}
                        onChange={handleChange}
                        placeholder="https://example.com/logo.png"
                      />
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label>Description *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe your service in detail..."
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="pending">Pending (Awaiting Approval)</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        New services start as "pending" and need admin approval
                      </Form.Text>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Button type="submit" className="signup-btn">
                        Add Service
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}