import React, { useEffect, useState } from "react"
import axios from "axios"
import Chart from "react-apexcharts"
import Sidebar from '../../../components/Sidebar'
import Table from 'react-bootstrap/Table';
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
export default function ManageCustomers({ sidebarOpen, setSidebarOpen }) {
    const [customer, setCustomer] = useState([])
      const [documents, setDocuments] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5002/customers")
            .then(res => {
                setCustomer(res.data)
                console.log("customer data", res)
            })
            .catch(err => {
                console.log("error fetching customer api", err)
            })
    }, [])

      useEffect(() => {
        axios.get("http://localhost:5002/travelDocuments")
            .then(res => {
                setDocuments(res.data)
                console.log("documents data", res)
            })
            .catch(err => {
                console.log("error fetching documents api", err)
            })
    }, [])

    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:5002/customers/${id}`)
        setCustomer(customer.filter((item) => item.id !== id))
        console.log("delete ho gya hai", customer.filter((item) => item.id !== id))
    }
    return (
        <>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h2 className="dashboard-title">Manage Customers</h2>
                        </Col>
                        <Col lg={12}>
                            <div className="chart-card">
                                <h4>Recent Bookings</h4>
                                <div className="table-responsive">
                                    <Table striped bordered >
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Password</th>
                                                <th>Nationality</th>
                                                <th>Currentcity</th>
                                                <th>Preferred Travel Style</th>
                                                <th>Travel Frequecy</th>
                                                <th>Budget Range</th>
                                                <th>Preferred Destination</th>
                                                <th>Intrests</th>
                                                  <th>Document Title</th>
                                                <th>Document Type</th>
                                                <th>Expiry Date</th>
                                                <th>File</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customer.map((item) => (
                                                documents.map((doc) => (
                                                <tr key={item.id + doc.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.firstname + item.lastname || item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.password}</td>
                                                    <td>{item.nationality}</td>
                                                    <td>{item.currentcity}</td>
                                                    <td>{item.preferredtravelstyle}</td>
                                                    <td>{item.travelfrequecy}</td>
                                                    <td>{item.budgetrange}</td>
                                                    <td>{item.preferreddestination}</td>
                                                    <td>{item.intrests}</td>
                                                
                                                        <td>{doc.title}</td>
                                                        <td>{doc.documentType}</td>
                                                        <td>{doc.expiryDate}</td>
                                                        <td>
                                                            <a href={`/${doc.fileUrl}`} target="_blank" rel="noreferrer">
                                                                View
                                                            </a>
                                                        </td>

                                                         <td style={{
                                                            color: item.status === "Active" ? "green" : "red"
                                                        }}>
                                                            {item.status}
                                                        </td>

                                                    <td>
                                                        <Link to={`/edit-customer/${item.id}`}>
                                                            <button>Edit</button>
                                                        </Link>

                                                        <button onClick={() => deleteItem(item.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                               ))
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
