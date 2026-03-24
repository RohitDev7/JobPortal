import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export default function EditCustomers({ sidebarOpen, setSidebarOpen }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setcustomer] = useState({
        firstname: "",
        lastname: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        nationality: "",
        currentcity: "",
        preferredtravelstyle: "",
        travelfrequecy: "",
        budgetrange: "",
        preferreddestination: "",
        intrests: "",
        Status: "",
    })

    const [documents, setDocuments] = useState({
        title: "",
        documentType: "",
        expiryDate: "",
        fileUrl: ""
    })

    useEffect(() => {
        axios.get(`http://localhost:5002/customers/${id}`)
            .then(res => {
                setcustomer(res.data)
            })
            .catch(err => {
                console.log("error fetching customer api", err)
            })
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:5002/travelDocuments`)
            .then(res => {
                const userDoc = res.data.find(doc => doc.customerId == id)
                if (userDoc) {
                    setDocuments(userDoc)
                }
            })
            .catch(err => {
                console.log("error fetching documents api", err)
            })
    }, [id])

    const updateCustomer = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5002/customers/${id}`, customer);

            if (documents.id) {
                await axios.put(`http://localhost:5002/travelDocuments/${documents.id}`, documents);
            }

            navigate("/manage-customer")
        }
        catch (err) {
            console.log("Error updating", err)
        }
    }

    return (
        <>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h2 className="dashboard-title">Edit Customers</h2>
                        </Col>

                        <Col lg={12}>
                            <div className="chart-card">
                                <form className="signup-form" onSubmit={updateCustomer}>
                                  <Row>


   <Col md={6} className="mb-3">
                                               <div className="form-group">
                                                   <label>Name</label>
                                                   <input
                                                       className="form-control"
                                                       name="name"
                                                       value={customer.name || customer.firstname + " " + customer.lastname}
                                                       onChange={e => setcustomer({ ...customer, name: e.target.value || `${customer.firstname} ${customer.lastname}` })}
                                                   />
   
                                               </div>
                                           </Col>

    <Col md={6} className="mb-3">
        <label>Email</label>
        <input className="form-control"
            value={customer.email}
            onChange={e => setcustomer({ ...customer, email: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Phone</label>
        <input className="form-control"
            value={customer.phone}
            onChange={e => setcustomer({ ...customer, phone: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Password</label>
        <input className="form-control"
            value={customer.password}
            onChange={e => setcustomer({ ...customer, password: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Nationality</label>
        <input className="form-control"
            value={customer.nationality}
            onChange={e => setcustomer({ ...customer, nationality: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Current City</label>
        <input className="form-control"
            value={customer.currentcity}
            onChange={e => setcustomer({ ...customer, currentcity: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Preferred Travel Style</label>
        <input className="form-control"
            value={customer.preferredtravelstyle}
            onChange={e => setcustomer({ ...customer, preferredtravelstyle: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Travel Frequency</label>
        <input className="form-control"
            value={customer.travelfrequecy}
            onChange={e => setcustomer({ ...customer, travelfrequecy: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Budget Range</label>
        <input className="form-control"
            value={customer.budgetrange}
            onChange={e => setcustomer({ ...customer, budgetrange: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Preferred Destination</label>
        <input className="form-control"
            value={customer.preferreddestination}
            onChange={e => setcustomer({ ...customer, preferreddestination: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Interests</label>
        <input className="form-control"
            value={customer.intrests}
            onChange={e => setcustomer({ ...customer, intrests: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Status</label>
        <input className="form-control"
            value={customer.Status}
            onChange={e => setcustomer({ ...customer, Status: e.target.value })}
        />
    </Col>



    <Col md={6} className="mb-3">
        <label>Document Title</label>
        <input className="form-control"
            value={documents.title}
            onChange={e => setDocuments({ ...documents, title: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Document Type</label>
        <input className="form-control"
            value={documents.documentType}
            onChange={e => setDocuments({ ...documents, documentType: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>Expiry Date</label>
        <input type="date" className="form-control"
            value={documents.expiryDate}
            onChange={e => setDocuments({ ...documents, expiryDate: e.target.value })}
        />
    </Col>

    <Col md={6} className="mb-3">
        <label>File URL</label>
        <input className="form-control"
            value={documents.fileUrl}
            onChange={e => setDocuments({ ...documents, fileUrl: e.target.value })}
        />
    </Col>


    {documents.fileUrl && (
        <Col md={12} className="mb-3">
            <a href={`/${documents.fileUrl}`} target="_blank" rel="noreferrer">
                View File
            </a>
        </Col>
    )}


    <Col md={12} className="mb-3">
        <Button type="submit" className="signup-btn">
            Save Employee
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
    )
}