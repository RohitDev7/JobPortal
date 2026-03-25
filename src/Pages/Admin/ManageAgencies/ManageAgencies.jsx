import React, { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from '../../../components/Sidebar'
import Table from 'react-bootstrap/Table';
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function ManageAgencies({ sidebarOpen, setSidebarOpen }) {
    const [customer, setCustomer] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5002/travelAgencies")
            .then(res => {
                setCustomer(res.data)
                console.log("customer data", res)
            })
            .catch(err => {
                console.log("error fetching customer api", err)
            })
    }, [])


    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:5002/travelAgencies/${id}`)
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
                            <h2 className="dashboard-title">Manage Agencies</h2>
                        </Col>
                        <Col lg={12}>
                            <div className="chart-card">
                                <div className="table-responsive">
                                    <Table striped bordered >
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Password</th>
                                              
                                                <th>Agency Name</th>
                                                <th>Website</th>
                                                <th>Location</th>
                                                <th>Service Type</th>
                                                <th>Company Size</th>
                                                <th className="descr">Description</th>
                                                <th>Agree</th>
                                                <th>Company Registration Number</th>
                                                <th>Gst Number</th>
                                                <th>License Number</th>
                                                  <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customer.map((item) => (

                                              <tr key={item.id}>
    <td>{item.id}</td>
    <td>{item.firstname + " " + item.lastname}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.password}</td>

    <td>{item.agencyname}</td>
<td>
  <a href={item.website} target="_blank" rel="noopener noreferrer">
    {item.website}
  </a>
</td>
    <td>{item.location}</td>
    <td>{item.servicetype}</td>
    <td>{item.companysize}</td>
    <td className="descr">{item.description}</td>
    <td>{item.agree ? "Yes" : "No"}</td>
    <td>{item.companyRegistrationNumber}</td>
    <td>{item.gstNumber}</td>
    <td>{item.licenseNumber}</td>

    <td>
        <Link to={`/edit-customer/${item.id}`}>
            <button>Edit</button>
        </Link>

        <button onClick={() => deleteItem(item.id)}>
            Delete
        </button>
    </td>
</tr>

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
