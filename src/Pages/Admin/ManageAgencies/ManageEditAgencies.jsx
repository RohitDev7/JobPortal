
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ManageEditAgencies({ sidebarOpen, setSidebarOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    agencyname: "",
    website: "",
    location: "",
    servicetype: "",
    companysize: "",
    description: "",
    agree: false,
    companyRegistrationNumber: "",
    gstNumber: "",
    licenseNumber: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5002/travelAgencies/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.log("Error fetching agency", err);
      });
  }, [id]);

  const updateAgency = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5002/travelAgencies/${id}`,
        form
      );
      navigate("/manage-agencies");
    } catch (err) {
      console.log("Error updating agency", err);
    }
  };

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div
        className={
          sidebarOpen
            ? "dashboard-container sidebar-open"
            : "dashboard-container"
        }
      >
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className="dashboard-title">Edit Agency</h2>
            </Col>

            <Col lg={12}>
              <div className="chart-card">
                <form className="signup-form" onSubmit={updateAgency}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        value={form.firstname}
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        value={form.lastname}
                        onChange={(e) =>
                          setForm({ ...form, lastname: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Agency Name</Form.Label>
                      <Form.Control
                        value={form.agencyname}
                        onChange={(e) =>
                          setForm({ ...form, agencyname: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        value={form.website}
                        onChange={(e) =>
                          setForm({ ...form, website: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Service Type</Form.Label>
                      <Form.Control
                        value={form.servicetype}
                        onChange={(e) =>
                          setForm({ ...form, servicetype: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Company Size</Form.Label>
                      <Form.Control
                        value={form.companysize}
                        onChange={(e) =>
                          setForm({ ...form, companysize: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Company Registration Number</Form.Label>
                      <Form.Control
                        value={form.companyRegistrationNumber}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            companyRegistrationNumber: e.target.value,
                          })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>GST Number</Form.Label>
                      <Form.Control
                        value={form.gstNumber}
                        onChange={(e) =>
                          setForm({ ...form, gstNumber: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>License Number</Form.Label>
                      <Form.Control
                        value={form.licenseNumber}
                        onChange={(e) =>
                          setForm({ ...form, licenseNumber: e.target.value })
                        }
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Button type="submit" className="signup-btn">
                        Update Agency
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