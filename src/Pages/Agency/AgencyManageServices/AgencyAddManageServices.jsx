import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AgencyAddManageServices({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();


  const agencyId = localStorage.getItem("agencyId") || "";

  const [form, setForm] = useState({
    title: "",
    providerName: "",
    location: "",
    price: "",
    type: "",
    duration: "",
    amenities: "",
    description: "",
    status: "",
    logo: ""
  });

  const addService = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5002/services`, {
        ...form,
        postedBy: agencyId
      });
      navigate("/manage-services");
    } catch (err) {
      console.log("Error adding service", err);
    }
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
                    <Col md={6} className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Provider Name</Form.Label>
                      <Form.Control
                        value={form.providerName}
                        onChange={(e) => setForm({ ...form, providerName: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Amenities</Form.Label>
                      <Form.Control
                        value={form.amenities}
                        onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Logo URL</Form.Label>
                      <Form.Control
                        value={form.logo}
                        onChange={(e) => setForm({ ...form, logo: e.target.value })}
                      />
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        required
                      />
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