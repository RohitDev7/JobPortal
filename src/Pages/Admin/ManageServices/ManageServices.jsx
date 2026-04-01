// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import Chart from "react-apexcharts"
// import Sidebar from '../../../components/Sidebar'
// import Table from 'react-bootstrap/Table';
// import { Col, Container, Row } from "react-bootstrap"
// import { Link } from "react-router-dom";


// export default function ManageServices({ sidebarOpen, setSidebarOpen }) {
//   const [services, setServices] = useState([])
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredServices, setFilteredServices] = useState([]);


// /** copy on google **/

//   const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = 10;


// const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
// const paginate = (pageNumber) => {
//   if (pageNumber < 1 || pageNumber > totalPages) return;
//   setCurrentPage(pageNumber);
// };
// /** copy on google **/




// useEffect(() => {
//   const filtered = services.filter((item) =>
//     item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.location?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   setFilteredServices(filtered);
//   setCurrentPage(1); 
// }, [searchTerm, services]);

//   useEffect(() => {
//     axios.get("http://localhost:5002/services")
//       .then(res => {
//         setServices(res.data)
//         setFilteredServices(res.data)
//         console.log("services data", res)
//       })
//       .catch(err => {
//         console.log("error fetching services api", err)
//       })
//   }, [])



//   const deleteItem = async (id) => {
//     await axios.delete(`http://localhost:5002/services/${id}`)
//     setServices(services.filter((item) => item.id !== id))
//     console.log("delete ho gya hai", services.filter((item) => item.id !== id))
//   }




//   return (
//     <>
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//         <Container>
//           <Row>
//             <Col lg={12}>
//               <h2 className="dashboard-title">Manage Services</h2>
//             </Col>

//             <div className="stats-grid">
//               <div className="stat-card">
//                 <h4>{services.length}</h4>
//                 <p>Total Services</p>
//               </div>

//               <div className="stat-card">
//                 <h4>
//                   {services.filter(items => items.status === 'active').length}
//                 </h4>
//                 <p>Active Services</p>
//               </div>

//               <div className="stat-card">
//                 <h4>
//                   {services.filter(items => items.type === 'Cab').length}
//                 </h4>
//                 <p>Cabs</p>
//               </div>

//               <div className="stat-card">
//                 <h4>
//                   {services.filter(items => items.type === 'Bus').length}
//                 </h4>
//                 <p>Buses</p>
//               </div>

//               <div className="stat-card">
//                 <h4>
//                   {services.filter(items => items.type === 'Flight').length}
//                 </h4>
//                 <p>Flight</p>
//               </div>

//               <div className="stat-card">
//                 <h4>
//                   {services.filter(items => items.type === 'Hotel').length}
//                 </h4>
//                 <p>Hotel</p>
//               </div>
//             </div>




//             <Col lg={12} className="mt-5">
//               <div className="chart-card">
//                 <input
//                   type="search"
//                   placeholder="Search services..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
//                 />
//                 <div className="table-responsive">
//                   <Table striped bordered >
//                     <thead>
//                       <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Provider Name</th>
//                         <th>Location</th>
//                         <th>Price</th>
//                         <th>Type</th>
//                         <th>Duration</th>
//                         <th>Amenities</th>
//                         <th className="descr">Description</th>
//                         <th>Status</th>
//                         <th>Logo</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentItems.map((item) => (
//                         <tr key={item.id}>
//                           <td>{item.id}</td>
//                           <td>{item.title}</td>
//                           <td>{item.providerName}</td>
//                           <td>{item.location}</td>
//                           <td>{item.price}</td>
//                           <td>{item.type}</td>
//                           <td>{item.duration}</td>
//                           <td>{(item.amenities || []).join?.(", ") || item.amenities}</td>
//                           <td className="descr">{item.description}</td>
//                           <td>{item.status}</td>
//                           <td>
//                             <img src={item.logo} alt={item.title} width="50" />
//                           </td>
//                           <td>
//                             <Link to={`/edit-manage-services/${item.id}`}>
//                               <button>Edit</button>
//                             </Link>
//                             <button onClick={() => deleteItem(item.id)}>Delete</button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>

//                 {filteredServices.length > 0 && (
//           <div className="pagination">
//             <button 
//               className="pagination-btn"
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
//                 onClick={() => paginate(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button 
//               className="pagination-btn"
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         )}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   )
// }


// ManageServices.jsx
// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import Chart from "react-apexcharts"
// import Sidebar from '../../../components/Sidebar'
// import Table from 'react-bootstrap/Table';
// import { Col, Container, Row } from "react-bootstrap"
// import { Link } from "react-router-dom";

// export default function ManageServices({ sidebarOpen, setSidebarOpen }) {
//     const [services, setServices] = useState([])
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredServices, setFilteredServices] = useState([]);
//     const [activeTab, setActiveTab] = useState("all") // all, pending, approved, rejected
//     const [loading, setLoading] = useState(false)

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         fetchServices()
//     }, [])

//     const fetchServices = async () => {
//         try {
//             const res = await axios.get("http://localhost:5002/services")
//             setServices(res.data)
//             setFilteredServices(res.data)
//             console.log("services data", res)
//         } catch (err) {
//             console.log("error fetching services api", err)
//         }
//     }

//     useEffect(() => {
//         let filtered = services.filter((item) =>
//             item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.location?.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//         // Filter by status tab
//         if (activeTab !== "all") {
//             filtered = filtered.filter(item => item.status === activeTab)
//         }

//         setFilteredServices(filtered);
//         setCurrentPage(1);
//     }, [searchTerm, services, activeTab]);

//     const deleteItem = async (id) => {
//         if (window.confirm("Are you sure you want to delete this service?")) {
//             await axios.delete(`http://localhost:5002/services/${id}`)
//             setServices(services.filter((item) => item.id !== id))
//             console.log("delete ho gya hai")
//         }
//     }

//     const updateServiceStatus = async (id, newStatus) => {
//         setLoading(true)
//         try {
//             await axios.patch(`http://localhost:5002/services/${id}`, {
//                 status: newStatus
//             })

//             setServices(services.map(service => 
//                 service.id === id ? { ...service, status: newStatus } : service
//             ))

//             alert(`Service ${newStatus} successfully!`)
//         } catch (err) {
//             console.error("Error updating service status:", err)
//             alert("Error updating service status")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const getStatusCount = () => {
//         return {
//             pending: services.filter(s => s.status === "pending").length,
//             approved: services.filter(s => s.status === "approved").length,
//             rejected: services.filter(s => s.status === "rejected").length
//         }
//     }

//     const statusCounts = getStatusCount()

//     const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
//     const paginate = (pageNumber) => {
//         if (pageNumber < 1 || pageNumber > totalPages) return;
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <>
//             <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//             <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//                 <Container>
//                     <Row>
//                         <Col lg={12}>
//                             <h2 className="dashboard-title">Manage Services</h2>
//                         </Col>

//                         <div className="stats-grid">
//                             <div className="stat-card">
//                                 <h4>{services.length}</h4>
//                                 <p>Total Services</p>
//                             </div>
//                             <div className="stat-card">
//                                 <h4>{services.filter(items => items.status === 'approved').length}</h4>
//                                 <p>Active Services</p>
//                             </div>
//                             <div className="stat-card">
//                                 <h4>{services.filter(items => items.type === 'Cab').length}</h4>
//                                 <p>Cabs</p>
//                             </div>
//                             <div className="stat-card">
//                                 <h4>{services.filter(items => items.type === 'Bus').length}</h4>
//                                 <p>Buses</p>
//                             </div>
//                             <div className="stat-card">
//                                 <h4>{services.filter(items => items.type === 'Flight').length}</h4>
//                                 <p>Flight</p>
//                             </div>
//                             <div className="stat-card">
//                                 <h4>{services.filter(items => items.type === 'Hotel').length}</h4>
//                                 <p>Hotel</p>
//                             </div>
//                         </div>

//                         {/* Status Tabs */}
//                         <Col lg={12} className="mb-4">
//                             <div className="status-tabs">
//                                 <button 
//                                     className={`status-tab ${activeTab === "all" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("all")}
//                                 >
//                                     All ({services.length})
//                                 </button>
//                                 <button 
//                                     className={`status-tab ${activeTab === "pending" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("pending")}
//                                 >
//                                     Pending ({statusCounts.pending})
//                                 </button>
//                                 <button 
//                                     className={`status-tab ${activeTab === "approved" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("approved")}
//                                 >
//                                     Approved ({statusCounts.approved})
//                                 </button>
//                                 <button 
//                                     className={`status-tab ${activeTab === "rejected" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("rejected")}
//                                 >
//                                     Rejected ({statusCounts.rejected})
//                                 </button>
//                             </div>
//                         </Col>

//                         <Col lg={12} className="mt-4">
//                             <div className="chart-card">
//                                 <input
//                                     type="search"
//                                     placeholder="Search services..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
//                                 />
//                                 <div className="table-responsive">
//                                     <Table striped bordered>
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Title</th>
//                                                 <th>Provider Name</th>
//                                                 <th>Location</th>
//                                                 <th>Price</th>
//                                                 <th>Type</th>
//                                                 <th>Duration</th>
//                                                 <th>Amenities</th>
//                                                 <th className="descr">Description</th>
//                                                 <th>Status</th>
//                                                 <th>Logo</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentItems.map((item) => (
//                                                 <tr key={item.id}>
//                                                     <td>{item.id}</td>
//                                                     <td>{item.title}</td>
//                                                     <td>{item.providerName}</td>
//                                                     <td>{item.location}</td>
//                                                     <td>{item.price}</td>
//                                                     <td>{item.type}</td>
//                                                     <td>{item.duration}</td>
//                                                     <td>{(item.amenities || []).join?.(", ") || item.amenities}</td>
//                                                     <td className="descr">{item.description}</td>
//                                                     <td>
//                                                         <span className={`status-badge status-${item.status || "pending"}`}>
//                                                             {item.status || "pending"}
//                                                         </span>
//                                                     </td>
//                                                     <td>
//                                                         <img src={item.logo} alt={item.title} width="50" />
//                                                     </td>
//                                                     <td>
//                                                         <div className="action-buttons">
//                                                             <Link to={`/edit-manage-services/${item.id}`}>
//                                                                 <button className="btn-edit">Edit</button>
//                                                             </Link>

//                                                             {(!item.status || item.status === "pending") && (
//                                                                 <>
//                                                                     <button 
//                                                                         className="btn-approve"
//                                                                         onClick={() => updateServiceStatus(item.id, "approved")}
//                                                                         disabled={loading}
//                                                                     >
//                                                                         Approve
//                                                                     </button>
//                                                                     <button 
//                                                                         className="btn-reject"
//                                                                         onClick={() => updateServiceStatus(item.id, "rejected")}
//                                                                         disabled={loading}
//                                                                     >
//                                                                         Reject
//                                                                     </button>
//                                                                 </>
//                                                             )}

//                                                             {item.status === "approved" && (
//                                                                 <button 
//                                                                     className="btn-reject"
//                                                                     onClick={() => updateServiceStatus(item.id, "rejected")}
//                                                                     disabled={loading}
//                                                                 >
//                                                                     Reject
//                                                                 </button>
//                                                             )}

//                                                             {item.status === "rejected" && (
//                                                                 <button 
//                                                                     className="btn-approve"
//                                                                     onClick={() => updateServiceStatus(item.id, "approved")}
//                                                                     disabled={loading}
//                                                                 >
//                                                                     Approve
//                                                                 </button>
//                                                             )}

//                                                             <button 
//                                                                 className="btn-delete"
//                                                                 onClick={() => deleteItem(item.id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </Table>
//                                 </div>

//                                 {filteredServices.length > 0 && (
//                                     <div className="pagination">
//                                         <button 
//                                             className="pagination-btn"
//                                             onClick={() => paginate(currentPage - 1)}
//                                             disabled={currentPage === 1}
//                                         >
//                                             Previous
//                                         </button>
//                                         {[...Array(totalPages)].map((_, index) => (
//                                             <button
//                                                 key={index}
//                                                 className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
//                                                 onClick={() => paginate(index + 1)}
//                                             >
//                                                 {index + 1}
//                                             </button>
//                                         ))}
//                                         <button 
//                                             className="pagination-btn"
//                                             onClick={() => paginate(currentPage + 1)}
//                                             disabled={currentPage === totalPages}
//                                         >
//                                             Next
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>

//             <style>{`
//                 .status-tabs {
//                     display: flex;
//                     gap: 10px;
//                     margin-bottom: 20px;
//                     border-bottom: 2px solid #e0e0e0;
//                     padding-bottom: 10px;
//                 }
//                 .status-tab {
//                     padding: 8px 20px;
//                     background: transparent;
//                     border: none;
//                     cursor: pointer;
//                     font-size: 16px;
//                     font-weight: 500;
//                     color: #666;
//                     transition: all 0.3s;
//                 }
//                 .status-tab.active {
//                     color: #ff5722;
//                     border-bottom: 2px solid #ff5722;
//                     margin-bottom: -12px;
//                 }
//                 .status-tab:hover {
//                     color: #ff5722;
//                 }
//                 .status-badge {
//                     display: inline-block;
//                     padding: 4px 12px;
//                     border-radius: 20px;
//                     font-size: 12px;
//                     font-weight: 500;
//                     text-transform: uppercase;
//                 }
//                 .status-pending {
//                     background: #fff3e0;
//                     color: #ff9800;
//                 }
//                 .status-approved {
//                     background: #e8f5e9;
//                     color: #4caf50;
//                 }
//                 .status-rejected {
//                     background: #ffebee;
//                     color: #f44336;
//                 }
//                 .action-buttons {
//                     display: flex;
//                     gap: 5px;
//                     flex-wrap: wrap;
//                 }
//                 .btn-edit, .btn-approve, .btn-reject, .btn-delete {
//                     padding: 4px 8px;
//                     border: none;
//                     border-radius: 4px;
//                     cursor: pointer;
//                     font-size: 12px;
//                     transition: all 0.3s;
//                 }
//                 .btn-edit {
//                     background: #2196f3;
//                     color: white;
//                 }
//                 .btn-approve {
//                     background: #4caf50;
//                     color: white;
//                 }
//                 .btn-reject {
//                     background: #ff9800;
//                     color: white;
//                 }
//                 .btn-delete {
//                     background: #f44336;
//                     color: white;
//                 }
//                 .btn-edit:hover, .btn-approve:hover, .btn-reject:hover, .btn-delete:hover {
//                     opacity: 0.8;
//                 }
//                 button:disabled {
//                     opacity: 0.5;
//                     cursor: not-allowed;
//                 }
//                 .stats-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//                     gap: 20px;
//                     margin-bottom: 30px;
//                 }
//                 .pagination {
//                     display: flex;
//                     justify-content: center;
//                     gap: 5px;
//                     margin-top: 20px;
//                 }
//                 .pagination-btn {
//                     padding: 6px 12px;
//                     border: 1px solid #ddd;
//                     background: white;
//                     cursor: pointer;
//                     border-radius: 4px;
//                 }
//                 .pagination-btn.active {
//                     background: #ff5722;
//                     color: white;
//                     border-color: #ff5722;
//                 }
//                 .pagination-btn:hover:not(:disabled) {
//                     background: #f5f5f5;
//                 }
//                 .pagination-btn:disabled {
//                     opacity: 0.5;
//                     cursor: not-allowed;
//                 }
//             `}</style>
//         </>
//     )
// }




import React, { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from '../../../components/Sidebar'
import Table from 'react-bootstrap/Table';
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function ManageServices({ sidebarOpen, setSidebarOpen }) {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all")
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;


    useEffect(() => {
        axios
            .get("http://localhost:5002/services")
            .then((res) => setServices(res.data))
            .catch((err) => console.log(err));
    }, []);


    let filtered = services.filter((item) => {
        return (
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.providerName?.toLowerCase().includes(search.toLowerCase()) ||
            item.location?.toLowerCase().includes(search.toLowerCase())
        );
    });

    if (activeTab !== "all") {
        filtered = filtered.filter((item) => item.status === activeTab);
    }


    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const currentData = filtered.slice(start, start + itemsPerPage);


    const handleDelete = (id) => {
        if (!window.confirm("Delete this service?")) return;

        axios
            .delete(`http://localhost:5002/services/${id}`)
            .then(() => {
                setServices(services.filter((item) => item.id !== id));
            })
            .catch((err) => console.log(err));
    };


    const changeStatus = (id, status) => {
        axios
            .patch(`http://localhost:5002/services/${id}`, { status })
            .then(() => {
                setServices(
                    services.map((item) =>
                        item.id === id ? { ...item, status } : item
                    )
                );
            })
            .catch((err) => console.log(err));
    };




        const ReadMore = ({ text }) => {
        const [expanded, setExpanded] = useState(false);
        const words = text.split(" ");
      
        const shortText = words.slice(0, 50).join(" ");
      
        return (
          <span>
            {expanded ? text : shortText}
            {words.length >50 && (
              <span
                style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? " Read less" : " Read more"}
              </span>
            )}
          </span>
        );
      };

    return (
        <>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
                <Container>
                    <Row>
                         <Col lg={12} className="mb-4">
                            <div className="status-tabs">
                                <button
                                    className={`status-tab ${activeTab === "all" ? "active" : ""}`}
                                    onClick={() => setActiveTab("all")}
                                >
                                    All
                                </button>
                                <button
                                    className={`status-tab ${activeTab === "pending" ? "active" : ""}`}
                                    onClick={() => setActiveTab("pending")}
                                >
                                    Pending
                                </button>
                                <button
                                    className={`status-tab ${activeTab === "approved" ? "active" : ""}`}
                                    onClick={() => setActiveTab("approved")}
                                >
                                    Approved
                                </button>
                                <button
                                    className={`status-tab ${activeTab === "rejected" ? "active" : ""}`}
                                    onClick={() => setActiveTab("rejected")}
                                >
                                    Rejected
                                </button>
                            </div>
                        </Col>
                        <Col lg={12}>
                           <div className="manage-heading d-flex align-items-center justify-content-between">
                        <div className="manage-headings">
                            <h2 className="dashboard-title">Manage Services</h2>
                            </div>

  <div className="manage-heading-search">
                            <input
                                type="search"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                style={{ marginBottom: "15px" }}
                            />
                            </div>
                            </div>
                        </Col>

                       



                        <Col lg={12}>
                            <div className="chart-card">
                                <div className="table-responsive">
                                    <Table bordered striped>
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
                                            {currentData.map((item) => (
                                                <tr key={item.id}>
                                                   <td>{item.id}</td>
                                                    <td>{item.title}</td>
                                                     <td>{item.providerName}</td>
                                                     <td>{item.location}</td>
                                                      <td>{item.price}</td>
                                                       <td>{item.type}</td>
                                                       <td>{item.duration}</td>
                                                        <td>{(item.amenities || []).join?.(", ") || item.amenities}</td>
                                                        <td className="descr">
                                                            <ReadMore text={item.description} />
                                                        </td>
                                                        <td>{item.status || "pending"}</td>
                                                        <td>
                            <img src={item.logo} alt={item.title} width="50" />
                          </td>
                                                    
                                                    <td>
                                                        <Link to={`/edit-manage-services/${item.id}`}>
                                                            <button>Edit</button>
                                                        </Link>

                                                        <button onClick={() => changeStatus(item.id, "approved")}>
                                                            Approve
                                                        </button>

                                                        <button onClick={() => changeStatus(item.id, "rejected")}>
                                                            Reject
                                                        </button>

                                                        <button onClick={() => handleDelete(item.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>


                                    
                                </div>
                                <div className="table-pagination">
                                        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                                            Prev
                                        </button>

                                        <span>
                                            Page {page} of {totalPages || 1}
                                        </span>

                                        <button
                                            disabled={page === totalPages || totalPages === 0}
                                            onClick={() => setPage(page + 1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    );
}