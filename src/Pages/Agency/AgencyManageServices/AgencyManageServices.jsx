import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../../../components/Sidebar';
import Table from 'react-bootstrap/Table';
import { Container, Row, Col,Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ManageServices({ sidebarOpen, setSidebarOpen }) {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const agencyId = localStorage.getItem("agencyId") || "";

  useEffect(() => {
    if (!agencyId) return;

    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5002/services");
        console.log("Fetched services:", res.data);
        const myServices = res.data.filter(
          s => String(s.postedBy) === String(agencyId)
        );
        console.log("Filtered services:", myServices);
        setServices(myServices);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, [agencyId]);


  const filteredServices = services.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5002/services/${id}`);
    setServices(services.filter(item => item.id !== id));
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
   

          

          <Col lg={12}>
  <div className="manage-heading d-flex align-items-center justify-content-between">
    <div className="manage-headings">
      <h2 className="dashboard-title">Agency Manage Agencies</h2>
    </div>

    <div className="d-flex align-items-center gap-2 manage-heading-search" >
      <input
        type="search"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px" }}
      />

<Link to="/agency-add-manage-services">
  <Button
    variant="primary"
    className="w-100 manage-add-sevices"
  >
    Add Service
  </Button>
</Link>
    </div>
  </div>
</Col>

 <Col lg={12} className="mb-4">
                            <div className="chart-card">
                                <div className="table-responsive">
         
            <Table striped bordered>
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
                {filteredServices.length === 0 ? (
                  <tr><td colSpan={6}>No services found.</td></tr>
                ) : (
                  filteredServices.map(item => (
                    <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.providerName}</td>
        <td>{item.location}</td>
        <td>{item.price}</td>
        <td>{item.type}</td>
        <td>{item.duration}</td>
        <td>{item.amenities}</td>
        <td> <ReadMore text={item.description} /></td>
        <td>{item.status}</td>
        <td>
          {item.logo && (
            <img
              src={item.logo}
              alt="logo"
              width="50"
              height="50"
            />
          )}
        </td>
        <td>
          <Link to={`/agency-edit-manage-services/${item.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </td>
      </tr>
                  ))
                )}
              </tbody>
            </Table>
    
          </div>
          </div>
          </Col>
        </Container>
      </div>
    </>
  );
}


// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import Sidebar from '../../../components/Sidebar'
// import Table from 'react-bootstrap/Table';
// import { Col, Container, Row } from "react-bootstrap"
// import { Link } from "react-router-dom";

// export default function ManageServices({ sidebarOpen, setSidebarOpen }) {
//     const [services, setServices] = useState([]);
//     const [search, setSearch] = useState("");
//     const [activeTab, setActiveTab] = useState("all")
//     const [page, setPage] = useState(1);

//     const itemsPerPage = 10;


//     useEffect(() => {
//         axios
//             .get("http://localhost:5002/services")
//             .then((res) => setServices(res.data))
//             .catch((err) => console.log(err));
//     }, []);


//     let filtered = services.filter((item) => {
//         return (
//             item.title?.toLowerCase().includes(search.toLowerCase()) ||
//             item.providerName?.toLowerCase().includes(search.toLowerCase()) ||
//             item.location?.toLowerCase().includes(search.toLowerCase())
//         );
//     });

//     if (activeTab !== "all") {
//         filtered = filtered.filter((item) => item.status === activeTab);
//     }


//     const totalPages = Math.ceil(filtered.length / itemsPerPage);
//     const start = (page - 1) * itemsPerPage;
//     const currentData = filtered.slice(start, start + itemsPerPage);


//     const handleDelete = (id) => {
//         if (!window.confirm("Delete this service?")) return;

//         axios
//             .delete(`http://localhost:5002/services/${id}`)
//             .then(() => {
//                 setServices(services.filter((item) => item.id !== id));
//             })
//             .catch((err) => console.log(err));
//     };


//     const changeStatus = (id, status) => {
//         axios
//             .patch(`http://localhost:5002/services/${id}`, { status })
//             .then(() => {
//                 setServices(
//                     services.map((item) =>
//                         item.id === id ? { ...item, status } : item
//                     )
//                 );
//             })
//             .catch((err) => console.log(err));
//     };

//     return (
//         <>
//             <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//             <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//                 <Container>
//                     <Row>
//                          <Col lg={12} className="mb-4">
//                             <div className="status-tabs">
//                                 <button
//                                     className={`status-tab ${activeTab === "all" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("all")}
//                                 >
//                                     All
//                                 </button>
//                                 <button
//                                     className={`status-tab ${activeTab === "pending" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("pending")}
//                                 >
//                                     Pending
//                                 </button>
//                                 <button
//                                     className={`status-tab ${activeTab === "approved" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("approved")}
//                                 >
//                                     Approved
//                                 </button>
//                                 <button
//                                     className={`status-tab ${activeTab === "rejected" ? "active" : ""}`}
//                                     onClick={() => setActiveTab("rejected")}
//                                 >
//                                     Rejected
//                                 </button>
//                             </div>
//                         </Col>
//                         <Col lg={12}>
//                            <div className="manage-heading d-flex align-items-center justify-content-between">
//                         <div className="manage-headings">
//                             <h2 className="dashboard-title">Manage Services</h2>
//                             </div>

//   <div className="manage-heading-search">
//                             <input
//                                 type="search"
//                                 placeholder="Search..."
//                                 value={search}
//                                 onChange={(e) => {
//                                     setSearch(e.target.value);
//                                     setPage(1);
//                                 }}
//                                 style={{ marginBottom: "15px" }}
//                             />
//                             </div>
//                             </div>
//                         </Col>

                       



//                         <Col lg={12}>
//                             <div className="chart-card">
//                                 <div className="table-responsive">
//                                     <Table bordered striped>
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
//                                             {currentData.map((item) => (
//                                                 <tr key={item.id}>
//                                                    <td>{item.id}</td>
//                                                     <td>{item.title}</td>
//                                                      <td>{item.providerName}</td>
//                                                      <td>{item.location}</td>
//                                                       <td>{item.price}</td>
//                                                        <td>{item.type}</td>
//                                                        <td>{item.duration}</td>
//                                                         <td>{(item.amenities || []).join?.(", ") || item.amenities}</td>
//                                                         <td className="descr">{item.description}</td>
//                                                         <td>{item.status || "pending"}</td>
//                                                         <td>
//                             <img src={item.logo} alt={item.title} width="50" />
//                           </td>
                                                    
//                                                     <td>
//                                                         <Link to={`/edit-manage-services/${item.id}`}>
//                                                             <button>Edit</button>
//                                                         </Link>

//                                                         <button onClick={() => changeStatus(item.id, "approved")}>
//                                                             Approve
//                                                         </button>

//                                                         <button onClick={() => changeStatus(item.id, "rejected")}>
//                                                             Reject
//                                                         </button>

//                                                         <button onClick={() => handleDelete(item.id)}>
//                                                             Delete
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </Table>


                                    
//                                 </div>
//                                 <div className="table-pagination">
//                                         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//                                             Prev
//                                         </button>

//                                         <span>
//                                             Page {page} of {totalPages || 1}
//                                         </span>

//                                         <button
//                                             disabled={page === totalPages || totalPages === 0}
//                                             onClick={() => setPage(page + 1)}
//                                         >
//                                             Next
//                                         </button>
//                                     </div>
//                             </div>
//                         </Col>

//                     </Row>
//                 </Container>
//             </div>
//         </>
//     );
// }