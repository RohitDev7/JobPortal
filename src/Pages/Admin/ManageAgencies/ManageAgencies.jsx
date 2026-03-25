// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import Sidebar from '../../../components/Sidebar'
// import Table from 'react-bootstrap/Table';
// import { Col, Container, Row } from "react-bootstrap"
// import { Link } from "react-router-dom";

// export default function ManageAgencies({ sidebarOpen, setSidebarOpen }) {
//     const [customer, setCustomer] = useState([])

//     useEffect(() => {
//         axios.get("http://localhost:5002/travelAgencies")
//             .then(res => {
//                 setCustomer(res.data)
//                 console.log("customer data", res)
//             })
//             .catch(err => {
//                 console.log("error fetching customer api", err)
//             })
//     }, [])


//     const deleteItem = async (id) => {
//         await axios.delete(`http://localhost:5002/travelAgencies/${id}`)
//         setCustomer(customer.filter((item) => item.id !== id))
//         console.log("delete ho gya hai", customer.filter((item) => item.id !== id))
//     }
//     return (
//         <>
//             <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//             <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//                 <Container>
//                     <Row>
//                         <Col lg={12}>
//                             <h2 className="dashboard-title">Manage Agencies</h2>
//                         </Col>
//                         <Col lg={12}>
//                             <div className="chart-card">
//                                 <div className="table-responsive">
//                                     <Table striped bordered >
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Name</th>
//                                                 <th>Email</th>
//                                                 <th>Phone</th>
//                                                 <th>Password</th>
                                              
//                                                 <th>Agency Name</th>
//                                                 <th>Website</th>
//                                                 <th>Location</th>
//                                                 <th>Service Type</th>
//                                                 <th>Company Size</th>
//                                                 <th className="descr">Description</th>
//                                                 <th>Agree</th>
//                                                 <th>Company Registration Number</th>
//                                                 <th>Gst Number</th>
//                                                 <th>License Number</th>
//                                                   <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {customer.map((item) => (

//                                               <tr key={item.id}>
//     <td>{item.id}</td>
//     <td>{item.firstname + " " + item.lastname}</td>
//     <td>{item.email}</td>
//     <td>{item.phone}</td>
//     <td>{item.password}</td>

//     <td>{item.agencyname}</td>
// <td>
//   <a href={item.website} target="_blank" rel="noopener noreferrer">
//     {item.website}
//   </a>
// </td>
//     <td>{item.location}</td>
//     <td>{item.servicetype}</td>
//     <td>{item.companysize}</td>
//     <td className="descr">{item.description}</td>
//     <td>{item.agree ? "Yes" : "No"}</td>
//     <td>{item.companyRegistrationNumber}</td>
//     <td>{item.gstNumber}</td>
//     <td>{item.licenseNumber}</td>

//     <td>
//         <Link to={`/edit-customer/${item.id}`}>
//             <button>Edit</button>
//         </Link>

//         <button onClick={() => deleteItem(item.id)}>
//             Delete
//         </button>
//     </td>
// </tr>

//                                             ))}
//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </>
//     )
// }


// ManageAgencies.jsx
import React, { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from '../../../components/Sidebar'
import Table from 'react-bootstrap/Table';
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function ManageAgencies({ sidebarOpen, setSidebarOpen }) {
    const [agencies, setAgencies] = useState([])
    const [activeTab, setActiveTab] = useState("all") // all, pending, approved, rejected
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAgencies()
    }, [])

    const fetchAgencies = async () => {
        try {
            const res = await axios.get("http://localhost:5002/travelAgencies")
            setAgencies(res.data)
            console.log("agencies data", res)
        } catch (err) {
            console.log("error fetching agencies api", err)
        }
    }

    const deleteItem = async (id) => {
        if (window.confirm("Are you sure you want to delete this agency?")) {
            await axios.delete(`http://localhost:5002/travelAgencies/${id}`)
            setAgencies(agencies.filter((item) => item.id !== id))
            console.log("delete ho gya hai")
        }
    }

    const updateAgencyStatus = async (id, newStatus) => {
        setLoading(true)
        try {
            const agency = agencies.find(a => a.id === id)
            const updatedAgency = { ...agency, status: newStatus, Status: newStatus }
            
            await axios.patch(`http://localhost:5002/travelAgencies/${id}`, {
                status: newStatus,
                Status: newStatus
            })
            
            // Update local state
            setAgencies(agencies.map(a => 
                a.id === id ? { ...a, status: newStatus, Status: newStatus } : a
            ))
            
            // If agency is rejected, also reject their services
            if (newStatus === "rejected") {
                await rejectAgencyServices(agency.agencyname || agency.firstname + " " + agency.lastname)
            }
            
            // If agency is approved, also approve their pending services
            if (newStatus === "approved") {
                await approveAgencyServices(agency.agencyname || agency.firstname + " " + agency.lastname)
            }
            
            alert(`Agency ${newStatus} successfully!`)
        } catch (err) {
            console.error("Error updating agency status:", err)
            alert("Error updating agency status")
        } finally {
            setLoading(false)
        }
    }
    
    const rejectAgencyServices = async (agencyName) => {
        try {
            const servicesRes = await axios.get("http://localhost:5002/services")
            const agencyServices = servicesRes.data.filter(s => s.providerName === agencyName)
            
            for (const service of agencyServices) {
                await axios.patch(`http://localhost:5002/services/${service.id}`, {
                    status: "rejected"
                })
            }
            console.log(`Rejected ${agencyServices.length} services for agency ${agencyName}`)
        } catch (err) {
            console.error("Error rejecting agency services:", err)
        }
    }
    
    const approveAgencyServices = async (agencyName) => {
        try {
            const servicesRes = await axios.get("http://localhost:5002/services")
            const pendingServices = servicesRes.filter(s => 
                s.providerName === agencyName && s.status === "pending"
            )
            
            for (const service of pendingServices) {
                await axios.patch(`http://localhost:5002/services/${service.id}`, {
                    status: "approved"
                })
            }
            console.log(`Approved ${pendingServices.length} services for agency ${agencyName}`)
        } catch (err) {
            console.error("Error approving agency services:", err)
        }
    }

    const getFilteredAgencies = () => {
        if (activeTab === "all") return agencies
        return agencies.filter(a => a.status === activeTab)
    }

    const getStatusCount = () => {
        return {
            pending: agencies.filter(a => a.status === "pending").length,
            approved: agencies.filter(a => a.status === "approved").length,
            rejected: agencies.filter(a => a.status === "rejected").length
        }
    }

    const statusCounts = getStatusCount()

    const filteredAgencies = getFilteredAgencies()

    return (
        <>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h2 className="dashboard-title">Manage Agencies</h2>
                        </Col>
                        
                        {/* Status Tabs */}
                        <Col lg={12} className="mb-4">
                            <div className="status-tabs">
                                <button 
                                    className={`status-tab ${activeTab === "all" ? "active" : ""}`}
                                    onClick={() => setActiveTab("all")}
                                >
                                    All ({agencies.length})
                                </button>
                                <button 
                                    className={`status-tab ${activeTab === "pending" ? "active" : ""}`}
                                    onClick={() => setActiveTab("pending")}
                                >
                                    Pending ({statusCounts.pending})
                                </button>
                                <button 
                                    className={`status-tab ${activeTab === "approved" ? "active" : ""}`}
                                    onClick={() => setActiveTab("approved")}
                                >
                                    Approved ({statusCounts.approved})
                                </button>
                                <button 
                                    className={`status-tab ${activeTab === "rejected" ? "active" : ""}`}
                                    onClick={() => setActiveTab("rejected")}
                                >
                                    Rejected ({statusCounts.rejected})
                                </button>
                            </div>
                        </Col>
                        
                        <Col lg={12}>
                            <div className="chart-card">
                                <div className="table-responsive">
                                    <Table striped bordered>
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
                                                <th>Company Registration</th>
                                                <th>GST Number</th>
                                                <th>License Number</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredAgencies.map((item) => (
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
                                                        <span className={`status-badge status-${item.status || "pending"}`}>
                                                            {item.status || "pending"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Link to={`/edit-customer/${item.id}`}>
                                                                <button className="btn-edit">Edit</button>
                                                            </Link>
                                                            
                                                            {(!item.status || item.status === "pending") && (
                                                                <>
                                                                    <button 
                                                                        className="btn-approve"
                                                                        onClick={() => updateAgencyStatus(item.id, "approved")}
                                                                        disabled={loading}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button 
                                                                        className="btn-reject"
                                                                        onClick={() => updateAgencyStatus(item.id, "rejected")}
                                                                        disabled={loading}
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </>
                                                            )}
                                                            
                                                            {item.status === "approved" && (
                                                                <button 
                                                                    className="btn-reject"
                                                                    onClick={() => updateAgencyStatus(item.id, "rejected")}
                                                                    disabled={loading}
                                                                >
                                                                    Reject
                                                                </button>
                                                            )}
                                                            
                                                            {item.status === "rejected" && (
                                                                <button 
                                                                    className="btn-approve"
                                                                    onClick={() => updateAgencyStatus(item.id, "approved")}
                                                                    disabled={loading}
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}
                                                            
                                                            <button 
                                                                className="btn-delete"
                                                                onClick={() => deleteItem(item.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
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
            
            <style>{`
                .status-tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 10px;
                }
                .status-tab {
                    padding: 8px 20px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    color: #666;
                    transition: all 0.3s;
                }
                .status-tab.active {
                    color: #ff5722;
                    border-bottom: 2px solid #ff5722;
                    margin-bottom: -12px;
                }
                .status-tab:hover {
                    color: #ff5722;
                }
                .status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    text-transform: uppercase;
                }
                .status-pending {
                    background: #fff3e0;
                    color: #ff9800;
                }
                .status-approved {
                    background: #e8f5e9;
                    color: #4caf50;
                }
                .status-rejected {
                    background: #ffebee;
                    color: #f44336;
                }
                .action-buttons {
                    display: flex;
                    gap: 5px;
                    flex-wrap: wrap;
                }
                .btn-edit, .btn-approve, .btn-reject, .btn-delete {
                    padding: 4px 8px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s;
                }
                .btn-edit {
                    background: #2196f3;
                    color: white;
                }
                .btn-approve {
                    background: #4caf50;
                    color: white;
                }
                .btn-reject {
                    background: #ff9800;
                    color: white;
                }
                .btn-delete {
                    background: #f44336;
                    color: white;
                }
                .btn-edit:hover, .btn-approve:hover, .btn-reject:hover, .btn-delete:hover {
                    opacity: 0.8;
                }
                button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    )
}