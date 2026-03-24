import React, { useEffect, useState } from "react"
import axios from "axios"
import Chart from "react-apexcharts"
import Sidebar from '../../../components/Sidebar'
import Table from 'react-bootstrap/Table';
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";


export default function ManageServices({ sidebarOpen, setSidebarOpen }) {
  const [services, setServices] = useState([])
const [searchTerm, setSearchTerm] = useState("");
const [filteredServices, setFilteredServices] = useState([]);


useEffect(() => {
  const filtered = services.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredServices(filtered);
}, [searchTerm, services]);

  useEffect(() => {
    axios.get("http://localhost:5002/services")
      .then(res => {
        setServices(res.data)
        setFilteredServices(res.data) 
        console.log("services data", res)
      })
      .catch(err => {
        console.log("error fetching services api", err)
      })
  }, [])



  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5002/services/${id}`)
    setServices(services.filter((item) => item.id !== id))
    console.log("delete ho gya hai", services.filter((item) => item.id !== id))
  }




  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className="dashboard-title">Manage Services</h2>
            </Col>
            <Col lg={12}>
              <div className="chart-card">
                <input
  type="text"
  placeholder="Search services..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
/>
                <div className="table-responsive">
                  <Table striped bordered >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Provider Name</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Amenities</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Logo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.providerName}</td>
                          <td>{item.location}</td>
                          <td>{item.price}</td>
                          <td>{item.type}</td>
                          <td>{item.duration}</td>
                          <td>{item.amenities.join(", ")}</td>
                          <td>{item.description}</td>
                          <td>{item.status}</td>
                          <td>
                            <img src={item.logo} alt={item.title} width="50" />
                          </td>
                          <td>
                            <Link to={`/edit-manage-services/${item.id}`}>
                              <button>Edit</button>
                            </Link>
                            <button onClick={() => deleteItem(item.id)}>Delete</button>
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
