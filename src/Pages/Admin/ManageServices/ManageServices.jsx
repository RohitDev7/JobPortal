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


/** copy on google **/

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;


const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
const paginate = (pageNumber) => {
  if (pageNumber < 1 || pageNumber > totalPages) return;
  setCurrentPage(pageNumber);
};
/** copy on google **/




useEffect(() => {
  const filtered = services.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredServices(filtered);
  setCurrentPage(1); 
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

            <div className="stats-grid">
              <div className="stat-card">
                <h4>{services.length}</h4>
                <p>Total Services</p>
              </div>

              <div className="stat-card">
                <h4>
                  {services.filter(items => items.status === 'active').length}
                </h4>
                <p>Active Services</p>
              </div>

              <div className="stat-card">
                <h4>
                  {services.filter(items => items.type === 'Cab').length}
                </h4>
                <p>Cabs</p>
              </div>

              <div className="stat-card">
                <h4>
                  {services.filter(items => items.type === 'Bus').length}
                </h4>
                <p>Buses</p>
              </div>

              <div className="stat-card">
                <h4>
                  {services.filter(items => items.type === 'Flight').length}
                </h4>
                <p>Flight</p>
              </div>

              <div className="stat-card">
                <h4>
                  {services.filter(items => items.type === 'Hotel').length}
                </h4>
                <p>Hotel</p>
              </div>
            </div>




            <Col lg={12} className="mt-5">
              <div className="chart-card">
                <input
                  type="search"
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
                        <th className="descr">Description</th>
                        <th>Status</th>
                        <th>Logo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.providerName}</td>
                          <td>{item.location}</td>
                          <td>{item.price}</td>
                          <td>{item.type}</td>
                          <td>{item.duration}</td>
                          <td>{(item.amenities || []).join?.(", ") || item.amenities}</td>
                          <td className="descr">{item.description}</td>
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

                {filteredServices.length > 0 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className="pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
