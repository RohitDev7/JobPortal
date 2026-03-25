import React, { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from '../../components/Sidebar'
import Table from 'react-bootstrap/Table';
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap"
import { toast, Toaster } from 'react-hot-toast'

export default function Approved({ sidebarOpen, setSidebarOpen }) {
    const [pendingAgencies, setPendingAgencies] = useState([])
    const [pendingServices, setPendingServices] = useState([])
    const [approvedAgencies, setApprovedAgencies] = useState([])
    const [approvedServices, setApprovedServices] = useState([])
    const [rejectedAgencies, setRejectedAgencies] = useState([])
    const [rejectedServices, setRejectedServices] = useState([])
    const [activeTab, setActiveTab] = useState('pending')
    const [loading, setLoading] = useState(true)
    
    // Modal states
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('') // 'agency' or 'service'
    const [selectedItem, setSelectedItem] = useState(null)
    const [newStatus, setNewStatus] = useState('')

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        setLoading(true)
        try {
            // Fetch travel agencies
            const agenciesRes = await axios.get("http://localhost:5002/travelAgencies")
            console.log("Agencies data:", agenciesRes.data)
            
            // Filter by status
            const pendingAgenciesData = agenciesRes.data.filter(agency => !agency.status || agency.status === 'pending')
            const approvedAgenciesData = agenciesRes.data.filter(agency => agency.status === 'approved')
            const rejectedAgenciesData = agenciesRes.data.filter(agency => agency.status === 'rejected')
            
            setPendingAgencies(pendingAgenciesData)
            setApprovedAgencies(approvedAgenciesData)
            setRejectedAgencies(rejectedAgenciesData)

            // Fetch services
            const servicesRes = await axios.get("http://localhost:5002/services")
            console.log("Services data:", servicesRes.data)
            
            // Filter by status
            const pendingServicesData = servicesRes.data.filter(service => !service.status || service.status === 'pending')
            const approvedServicesData = servicesRes.data.filter(service => service.status === 'approved')
            const rejectedServicesData = servicesRes.data.filter(service => service.status === 'rejected')
            
            setPendingServices(pendingServicesData)
            setApprovedServices(approvedServicesData)
            setRejectedServices(rejectedServicesData)
            
        } catch (err) {
            console.error("Error fetching data:", err)
            toast.error("Failed to fetch data. Please check your server connection.")
        } finally {
            setLoading(false)
        }
    }

    // Generic function to update status for any item
    const updateStatus = async (item, type, newStatusValue) => {
        try {
            const endpoint = type === 'agency' 
                ? `http://localhost:5002/travelAgencies/${item.id}`
                : `http://localhost:5002/services/${item.id}`
            
            await axios.patch(endpoint, {
                status: newStatusValue
            })
            
            toast.success(`${type === 'agency' ? (item.agencyname || item.firstname + ' ' + item.lastname) : item.title} status changed to ${newStatusValue}!`)
            
            // Refresh all data
            await fetchAllData()
            
        } catch (err) {
            console.error("Error updating status:", err)
            toast.error("Failed to update status")
        }
    }

    const handleApproveAgency = async (agency) => {
        await updateStatus(agency, 'agency', 'approved')
    }

    const handleRejectAgency = async (agency) => {
        await updateStatus(agency, 'agency', 'rejected')
    }

    const handlePendingAgency = async (agency) => {
        await updateStatus(agency, 'agency', 'pending')
    }

    const handleApproveService = async (service) => {
        await updateStatus(service, 'service', 'approved')
    }

    const handleRejectService = async (service) => {
        await updateStatus(service, 'service', 'rejected')
    }

    const handlePendingService = async (service) => {
        await updateStatus(service, 'service', 'pending')
    }

    // Open edit modal
    const openEditModal = (item, type) => {
        setSelectedItem(item)
        setModalType(type)
        setNewStatus(item.status || 'pending')
        setShowModal(true)
    }

    // Save status change from modal
    const handleSaveStatusChange = async () => {
        if (!selectedItem || !newStatus) return
        
        await updateStatus(selectedItem, modalType, newStatus)
        setShowModal(false)
        setSelectedItem(null)
        setNewStatus('')
    }

    const StatsCard = ({ count, label, color }) => (
        <div className="stat-card">
            <h4 style={{ color: color }}>{count}</h4>
            <p>{label}</p>
        </div>
    )

    // Render action buttons based on current status
    const renderActionButtons = (item, type, currentStatus) => {
        return (
            <div className="action-buttons">
                {currentStatus !== 'approved' && (
                    <button 
                        className="btn-approve"
                        onClick={() => type === 'agency' ? handleApproveAgency(item) : handleApproveService(item)}
                    >
                        ✓ Approve
                    </button>
                )}
                {currentStatus !== 'rejected' && (
                    <button 
                        className="btn-reject"
                        onClick={() => type === 'agency' ? handleRejectAgency(item) : handleRejectService(item)}
                    >
                        ✗ Reject
                    </button>
                )}
                {currentStatus !== 'pending' && (
                    <button 
                        className="btn-pending"
                        onClick={() => type === 'agency' ? handlePendingAgency(item) : handlePendingService(item)}
                    >
                        ⏳ Pending
                    </button>
                )}
                <button 
                    className="btn-edit"
                    onClick={() => openEditModal(item, type)}
                >
                    ✎ Edit
                </button>
            </div>
        )
    }

    if (loading) {
        return (
            <>
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
                    <Container>
                        <div className="text-center mt-5">
                            <h3>Loading...</h3>
                        </div>
                    </Container>
                </div>
            </>
        )
    }

    return (
        <>
            <Toaster position="top-right" />
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h2 className="dashboard-title">Admin Approvals</h2>
                            <p className="text-muted">Manage travel agencies and service provider applications - Full control to change any status</p>
                        </Col>

                        {/* Statistics Cards */}
                        <Col lg={12}>
                            <div className="stats-grid mb-4">
                                <StatsCard count={pendingAgencies.length} label="Pending Agencies" color="#ff9800" />
                                <StatsCard count={pendingServices.length} label="Pending Services" color="#ff9800" />
                                <StatsCard count={approvedAgencies.length} label="Approved Agencies" color="#4caf50" />
                                <StatsCard count={approvedServices.length} label="Approved Services" color="#4caf50" />
                                <StatsCard count={rejectedAgencies.length} label="Rejected Agencies" color="#f44336" />
                                <StatsCard count={rejectedServices.length} label="Rejected Services" color="#f44336" />
                            </div>
                        </Col>

                        {/* Tabs */}
                        <Col lg={12}>
                            <div className="approval-tabs mb-4">
                                <button 
                                    className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pending')}
                                >
                                    Pending Approvals
                                    {pendingAgencies.length + pendingServices.length > 0 && (
                                        <span className="badge pending">{pendingAgencies.length + pendingServices.length}</span>
                                    )}
                                </button>
                                <button 
                                    className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('approved')}
                                >
                                    Approved Items
                                    {approvedAgencies.length + approvedServices.length > 0 && (
                                        <span className="badge approved">{approvedAgencies.length + approvedServices.length}</span>
                                    )}
                                </button>
                                <button 
                                    className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('rejected')}
                                >
                                    Rejected Items
                                    {rejectedAgencies.length + rejectedServices.length > 0 && (
                                        <span className="badge rejected">{rejectedAgencies.length + rejectedServices.length}</span>
                                    )}
                                </button>
                            </div>
                        </Col>

                        {/* Pending Section */}
                        {activeTab === 'pending' && (
                            <>
                                <Col lg={12}>
                                    <div className="chart-card mb-4">
                                        <h4>Pending Agency Approvals ({pendingAgencies.length})</h4>
                                        {pendingAgencies.length === 0 ? (
                                            <p className="text-muted text-center py-4">No pending agency approvals</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Agency Name</th>
                                                            <th>Owner Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Location</th>
                                                            <th>Service Type</th>
                                                            <th>Documents</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pendingAgencies.map((agency) => (
                                                            <tr key={agency.id}>
                                                                <td>{agency.id}</td>
                                                                <td><strong>{agency.agencyname || 'N/A'}</strong></td>
                                                                <td>{agency.firstname} {agency.lastname}</td>
                                                                <td>{agency.email}</td>
                                                                <td>{agency.phone}</td>
                                                                <td>{agency.location}</td>
                                                                <td>
                                                                    <span className="badge bg-info">
                                                                        {agency.servicetype}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        className="btn-sm btn-info"
                                                                        onClick={() => {
                                                                            const docs = [
                                                                                { name: "Registration Certificate", number: agency.companyRegistrationNumber || 'N/A' },
                                                                                { name: "GST Certificate", number: agency.gstNumber || 'N/A' },
                                                                                { name: "License", number: agency.licenseNumber || 'N/A' }
                                                                            ]
                                                                            alert(`Documents:\n${docs.map(d => `${d.name}: ${d.number}`).join('\n')}`)
                                                                        }}
                                                                    >
                                                                        View Docs
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    {renderActionButtons(agency, 'agency', 'pending')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                </Col>

                                <Col lg={12}>
                                    <div className="chart-card">
                                        <h4>Pending Service Approvals ({pendingServices.length})</h4>
                                        {pendingServices.length === 0 ? (
                                            <p className="text-muted text-center py-4">No pending service approvals</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Title</th>
                                                            <th>Provider Name</th>
                                                            <th>Type</th>
                                                            <th>Price</th>
                                                            <th>Location</th>
                                                            <th>Description</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pendingServices.map((service) => (
                                                            <tr key={service.id}>
                                                                <td>{service.id}</td>
                                                                <td><strong>{service.title}</strong></td>
                                                                <td>{service.providerName}</td>
                                                                <td>
                                                                    <span className={`badge ${service.type === 'Flight' ? 'bg-primary' : service.type === 'Hotel' ? 'bg-success' : 'bg-warning'}`}>
                                                                        {service.type}
                                                                    </span>
                                                                </td>
                                                                <td>{service.price}</td>
                                                                <td>{service.location}</td>
                                                                <td className="descr">{service.description?.substring(0, 100)}...</td>
                                                                <td>
                                                                    {renderActionButtons(service, 'service', 'pending')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </>
                        )}

                        {/* Approved Section */}
                        {activeTab === 'approved' && (
                            <>
                                <Col lg={12}>
                                    <div className="chart-card mb-4">
                                        <h4>Approved Agencies ({approvedAgencies.length})</h4>
                                        {approvedAgencies.length === 0 ? (
                                            <p className="text-muted text-center py-4">No approved agencies yet</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Agency Name</th>
                                                            <th>Owner</th>
                                                            <th>Email</th>
                                                            <th>Location</th>
                                                            <th>Service Type</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {approvedAgencies.map((agency) => (
                                                            <tr key={agency.id}>
                                                                <td>{agency.id}</td>
                                                                <td><strong>{agency.agencyname || 'N/A'}</strong></td>
                                                                <td>{agency.firstname} {agency.lastname}</td>
                                                                <td>{agency.email}</td>
                                                                <td>{agency.location}</td>
                                                                <td>{agency.servicetype}</td>
                                                                <td>
                                                                    <span className="badge green">Approved</span>
                                                                </td>
                                                                <td>
                                                                    {renderActionButtons(agency, 'agency', 'approved')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                </Col>

                                <Col lg={12}>
                                    <div className="chart-card">
                                        <h4>Approved Services ({approvedServices.length})</h4>
                                        {approvedServices.length === 0 ? (
                                            <p className="text-muted text-center py-4">No approved services yet</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Title</th>
                                                            <th>Provider</th>
                                                            <th>Type</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {approvedServices.map((service) => (
                                                            <tr key={service.id}>
                                                                <td>{service.id}</td>
                                                                <td>{service.title}</td>
                                                                <td>{service.providerName}</td>
                                                                <td>{service.type}</td>
                                                                <td>{service.price}</td>
                                                                <td>
                                                                    <span className="badge green">Approved</span>
                                                                </td>
                                                                <td>
                                                                    {renderActionButtons(service, 'service', 'approved')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </>
                        )}

                        {/* Rejected Section */}
                        {activeTab === 'rejected' && (
                            <>
                                <Col lg={12}>
                                    <div className="chart-card mb-4">
                                        <h4>Rejected Agencies ({rejectedAgencies.length})</h4>
                                        {rejectedAgencies.length === 0 ? (
                                            <p className="text-muted text-center py-4">No rejected agencies</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Agency Name</th>
                                                            <th>Owner</th>
                                                            <th>Email</th>
                                                            <th>Location</th>
                                                            <th>Service Type</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rejectedAgencies.map((agency) => (
                                                            <tr key={agency.id}>
                                                                <td>{agency.id}</td>
                                                                <td><strong>{agency.agencyname || 'N/A'}</strong></td>
                                                                <td>{agency.firstname} {agency.lastname}</td>
                                                                <td>{agency.email}</td>
                                                                <td>{agency.location}</td>
                                                                <td>{agency.servicetype}</td>
                                                                <td>
                                                                    <span className="badge red">Rejected</span>
                                                                </td>
                                                                <td>
                                                                    {renderActionButtons(agency, 'agency', 'rejected')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                </Col>

                                <Col lg={12}>
                                    <div className="chart-card">
                                        <h4>Rejected Services ({rejectedServices.length})</h4>
                                        {rejectedServices.length === 0 ? (
                                            <p className="text-muted text-center py-4">No rejected services</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Title</th>
                                                            <th>Provider</th>
                                                            <th>Type</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rejectedServices.map((service) => (
                                                            <tr key={service.id}>
                                                                <td>{service.id}</td>
                                                                <td>{service.title}</td>
                                                                <td>{service.providerName}</td>
                                                                <td>{service.type}</td>
                                                                <td>{service.price}</td>
                                                                <td>
                                                                    <span className="badge red">Rejected</span>
                                                                </td>
                                                                <td>
                                                                    {renderActionButtons(service, 'service', 'rejected')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                </Container>
            </div>

            {/* Edit Status Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                <strong>{modalType === 'agency' ? selectedItem?.agencyname || selectedItem?.firstname + ' ' + selectedItem?.lastname : selectedItem?.title}</strong>
                            </Form.Label>
                            <Form.Select 
                                value={newStatus} 
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="mt-2"
                            >
                                <option value="pending">⏳ Pending</option>
                                <option value="approved">✓ Approved</option>
                                <option value="rejected">✗ Rejected</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveStatusChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .stat-card {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    text-align: center;
                }

                .stat-card h4 {
                    font-size: 32px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .stat-card p {
                    color: #666;
                    margin: 0;
                }

                .approval-tabs {
                    display: flex;
                    gap: 10px;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 10px;
                    flex-wrap: wrap;
                }

                .tab-btn {
                    padding: 10px 20px;
                    background: none;
                    border: none;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    color: #666;
                    position: relative;
                    transition: all 0.3s;
                }

                .tab-btn.active {
                    color: #007bff;
                }

                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -11px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #007bff;
                }

                .tab-btn .badge {
                    padding: 2px 6px;
                    border-radius: 10px;
                    font-size: 12px;
                    margin-left: 8px;
                }

                .tab-btn .badge.pending {
                    background: #ff9800;
                    color: white;
                }

                .tab-btn .badge.approved {
                    background: #4caf50;
                    color: white;
                }

                .tab-btn .badge.rejected {
                    background: #f44336;
                    color: white;
                }

                .action-buttons {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .btn-approve, .btn-reject, .btn-pending, .btn-edit {
                    padding: 5px 12px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    transition: all 0.3s;
                }

                .btn-approve {
                    background: #4caf50;
                    color: white;
                }

                .btn-approve:hover {
                    background: #45a049;
                }

                .btn-reject {
                    background: #f44336;
                    color: white;
                }

                .btn-reject:hover {
                    background: #da190b;
                }

                .btn-pending {
                    background: #ff9800;
                    color: white;
                }

                .btn-pending:hover {
                    background: #f57c00;
                }

                .btn-edit {
                    background: #2196f3;
                    color: white;
                }

                .btn-edit:hover {
                    background: #0b7dda;
                }

                .btn-sm {
                    padding: 2px 8px;
                    font-size: 12px;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }

                .btn-info {
                    background: #2196f3;
                    color: white;
                }

                .badge {
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                }

                .badge.green {
                    background: #4caf50;
                    color: white;
                }

                .badge.red {
                    background: #f44336;
                    color: white;
                }

                .badge.bg-warning {
                    background: #ff9800;
                    color: white;
                }

                .badge.bg-primary {
                    background: #2196f3;
                    color: white;
                }

                .badge.bg-success {
                    background: #4caf50;
                    color: white;
                }

                .badge.bg-info {
                    background: #00bcd4;
                    color: white;
                }

                .descr {
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .table-responsive {
                    overflow-x: auto;
                }

                .text-muted {
                    color: #6c757d;
                }

                .text-center {
                    text-align: center;
                }

                .py-4 {
                    padding-top: 1.5rem;
                    padding-bottom: 1.5rem;
                }

                .mt-5 {
                    margin-top: 3rem;
                }

                @media (max-width: 768px) {
                    .action-buttons {
                        flex-direction: column;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .tab-btn {
                        padding: 8px 12px;
                        font-size: 14px;
                    }
                }
            `}</style>
        </>
    )
}