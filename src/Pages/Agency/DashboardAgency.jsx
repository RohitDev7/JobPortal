// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import Sidebar from "../../components/Sidebar"
// import Table from "react-bootstrap/Table"
// import { Container, Row, Col } from "react-bootstrap"

// export default function AgencyDashboard({ sidebarOpen, setSidebarOpen }) {

//   const [bookings, setBookings] = useState([])
//   const [totalRevenue, setTotalRevenue] = useState(0)
//   const [totalCustomers, setTotalCustomers] = useState(0)
//   const [totalPassengers, setTotalPassengers] = useState(0)

//   useEffect(() => {
//     fetchBookings()
//   }, [])

//   async function fetchBookings() {
//     try {

//       const agencyId = localStorage.getItem("agencyId")
//       if (!agencyId) return

//       const servicesRes = await axios.get("http://localhost:5002/services")
//       const bookingsRes = await axios.get("http://localhost:5002/bookings")

//       const myServices = servicesRes.data.filter(service =>
//         service.postedBy == agencyId
//       )

//       const myBookings = bookingsRes.data.filter(booking =>
//         myServices.some(service => service.id == booking.serviceId)
//       )

//       let revenue = 0
//       let passengersCount = 0

//       myBookings.forEach(booking => {

//         let price = booking.price?.amount || 0
//         let passengers = parseInt(booking.passengers) || 1

//         revenue += price * passengers
//         passengersCount += passengers
//       })

//       setBookings(myBookings)
//       setTotalRevenue(revenue)
//       setTotalCustomers(myBookings.length) // ek booking = ek customer
//       setTotalPassengers(passengersCount)

//     } catch (err) {
//       console.log(err)
//     }
//   }

//   return (
//     <>
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//         <Container>

//           <h2 className="mb-4">Agency Dashboard</h2>

//           {/* 3 Cards Row */}
//           <Row className="mb-4">

//             <Col md={4}>
//               <div className="stat-card">
//                 <h5>Total Customers</h5>
//                 <h2>{totalCustomers}</h2>
//               </div>
//             </Col>

//             <Col md={4}>
//               <div className="stat-card">
//                 <h5>Total Passengers</h5>
//                 <h2>{totalPassengers}</h2>
//               </div>
//             </Col>

//             <Col md={4}>
//               <div className="stat-card">
//                 <h5>Total Revenue</h5>
//                 <h2>₹{totalRevenue}</h2>
//               </div>
//             </Col>

//           </Row>

//           {/* Table */}
//           <div className="chart-card">
//             <h4>All Bookings</h4>

//             <Table striped bordered>
//               <thead>
//                 <tr>
//                     <th>ID</th>
//                   <th>Service</th>
//                   <th>Customer</th>
//                   <th>Pickup Date</th>
//                   <th>Passengers</th>
//                          <th>Price (Per Seat)</th>
//                   <th>Total Amount</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((booking, index) => {

//                   let price = booking.price?.amount || 0
//                   let passengers = parseInt(booking.passengers) || 1
//                   let total = price * passengers

//                   return (
//                     <tr key={index}>
//                         <td>{booking.id}</td>
//                       <td>{booking.serviceName}</td>
//                       <td>{booking.fullName}</td>
//                       <td>{booking.pickupDate}</td>
//                       <td>{passengers}</td>
//                       <td>₹{price}</td>
//                       <td>₹{total}</td>
//                     </tr>
//                   )
//                 })}
//               </tbody>

//             </Table>
//           </div>

//         </Container>
//       </div>
//     </>
//   )
// }


// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import Sidebar from "../../components/Sidebar"
// import Table from "react-bootstrap/Table"
// import { Container, Row, Col } from "react-bootstrap"

// export default function AgencyDashboard({ sidebarOpen, setSidebarOpen }) {
//   const [customers, setCustomers] = useState([])
//   const [bookings, setBookings] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const customerRes = await axios.get("http://localhost:5002/customers")
//       const bookingRes = await axios.get("http://localhost:5002/bookings")

//       setCustomers(customerRes.data)
//       setBookings(bookingRes.data)
//     }

//     fetchData()
//   }, [])


// const totalCustomers = customers.length

// const totalPassengers = bookings
//   .map(b => Number(b.passengers) || 0)
//   .reduce((a, b) => a + b, 0)

// const totalRevenue = bookings
//   .map(b => b.price?.amount || 0)
//   .reduce((a, b) => a + b, 0)

// const totalPassengerAmount = bookings
//   .map(b => (b.price?.amount || 0) * (Number(b.passengers) || 0))
//   .reduce((a, b) => a + b, 0)

//   return (
//     <>
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//         <Container>

//           <h2 className="mb-4">Agency Dashboard</h2>


//           <Row className="mb-4">

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Customers</h5>
//                 <h2>{totalCustomers}</h2>
//               </div>
//             </Col>

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Passengers</h5>
//                 <h2>{totalPassengers}</h2>
//               </div>
//             </Col>

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Revenue</h5>
//                 <h2>₹{totalRevenue}</h2>
//               </div>
//             </Col>

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Passenger Amount</h5>
//                 <h2>₹{totalPassengerAmount}</h2>
//               </div>
//             </Col>

//           </Row>

//           {/* Table */}
//           <div className="chart-card">
//             <h4>All Bookings</h4>

//             <Table striped bordered>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Service</th>
//                   <th>Customer</th>
//                   <th>Pickup Date</th>
//                   <th>Passengers</th>
//                   <th>Price (Per Seat)</th>
//                   <th>Total Amount</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((b, i) => (
//                   <tr key={i}>
//                     <td>{b.id}</td>
//                     <td>{b.serviceName}</td>
//                     <td>{b.fullName}</td>
//                     <td>{b.pickupDate}</td>
//                     <td>{b.passengers}</td>
//                     <td>₹{b.price?.amount}</td>
//                     <td>
//                       ₹{(b.price?.amount || 0) * (Number(b.passengers) || 0)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//             </Table>
//           </div>

//         </Container>
//       </div>
//     </>
//   )
// }




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Table from "react-bootstrap/Table";
// import { Container, Row, Col } from "react-bootstrap";

// export default function AgencyDashboard({ sidebarOpen, setSidebarOpen }) {
//   const [customers, setCustomers] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   // Get logged-in agency id
//   const agencyId = localStorage.getItem("agencyId"); // e.g., "c22d" or "dde3"

//   useEffect(() => {
//     if (!agencyId) return; // exit if not logged in

//     // fetch only customers for this agency
//     axios
//       .get(`http://localhost:5002/customers`)
//       .then((res) => {
//         // filter by agencyId on frontend (if backend doesn't support query param)
//         const filtered = res.data.filter(c => c.agencyId === agencyId);
//         setCustomers(filtered);
//       })
//       .catch(err => console.log(err));

//     // fetch only bookings for this agency
//     axios
//       .get(`http://localhost:5002/bookings`)
//       .then((res) => {
//         const filtered = res.data.filter(b => b.agencyId === agencyId);
//         setBookings(filtered);
//       })
//       .catch(err => console.log(err));
//   }, [agencyId]);

//   // calculate totals from all bookings of this agency
//   const totalCustomers = customers.length;
//   const totalPassengers = bookings.reduce((sum, b) => sum + (Number(b.passengers) || 0), 0);
//   const totalRevenue = bookings.reduce((sum, b) => sum + (b.price?.amount || 0), 0);
//   const totalPassengerAmount = bookings.reduce(
//     (sum, b) => sum + ((b.price?.amount || 0) * (Number(b.passengers) || 0)),
//     0
//   );

//   const firstBooking = bookings[0] || {};

//   return (
//     <>
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
//         <Container>
//           <h2 className="mb-4">Agency Dashboard</h2>

//           <Row className="mb-4">
//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Customers</h5>
//                 <h2>{totalCustomers}</h2>
//               </div>
//             </Col>

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Passengers</h5>
//                 <h2>{totalPassengers}</h2>
//               </div>
//             </Col>

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Revenue</h5>
//                 <h2>₹{totalRevenue}</h2>
//               </div>
//             </Col>

//             <Col md={3}>
//               <div className="stat-card">
//                 <h5>Total Passenger Amount</h5>
//                 <h2>₹{totalPassengerAmount}</h2>
//               </div>
//             </Col>
//           </Row>

//           <div className="chart-card">
//             <h4>First Booking</h4>
//             <Table striped bordered>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Service</th>
//                   <th>Customer</th>
//                   <th>Pickup Date</th>
//                   <th>Passengers</th>
//                   <th>Price (Per Seat)</th>
//                   <th>Total Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{firstBooking.id}</td>
//                   <td>{firstBooking.serviceName}</td>
//                   <td>{firstBooking.fullName}</td>
//                   <td>{firstBooking.pickupDate}</td>
//                   <td>{firstBooking.passengers}</td>
//                   <td>₹{firstBooking.price?.amount}</td>
//                   <td>
//                     ₹{(firstBooking.price?.amount || 0) *
//                       (Number(firstBooking.passengers) || 0)}
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";

export default function AgencyDashboard({ sidebarOpen, setSidebarOpen }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  const agencyId = localStorage.getItem("agencyId") || "";

  useEffect(() => {
    if (!agencyId) return;
    const fetchData = async () => {
      try {
        setLoading(true);

        const servicesRes = await axios.get("http://localhost:5002/services");
        const allServices = servicesRes.data;
        const myServices = allServices.filter(
          (s) => String(s.postedBy) === String(agencyId)
        );
        const myServiceIds = myServices.map((s) => String(s.id));


        const bookingsRes = await axios.get("http://localhost:5002/bookings");
        const allBookings = bookingsRes.data;
        const myBookings = allBookings.filter((b) =>
          myServiceIds.includes(String(b.serviceId))
        );

        setBookings(myBookings);
        setLoading(false);

        console.log("Services", myServices);
        console.log("Bookings", myBookings);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [agencyId]);


  const totalCustomers = bookings.length

  const totalPassengers = bookings
    .map(b => Number(b.passengers) || 0)
    .reduce((a, b) => a + b, 0)


  const totalRevenue = bookings
    .map(b => b.price?.amount || 0)
    .reduce((a, b) => a + b, 0)

  const totalPassengerAmount = bookings
    .map(b => (b.price?.amount || 0) * (Number(b.passengers) || 0))
    .reduce((a, b) => a + b, 0)

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={
          sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"
        }
      >
        <Container>
          <h2 className="mb-4">Agency Dashboard</h2>

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <Row className="mb-4">
                <Col md={3}>
                  <div className="stat-card">
                    <h5>Total Customers</h5>
                    <h2>{totalCustomers}</h2>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="stat-card">
                    <h5>Total Passengers</h5>
                    <h2>{totalPassengers}</h2>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="stat-card">
                    <h5>Total Revenue</h5>
                    <h2>₹{totalRevenue}</h2>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="stat-card">
                    <h5>Total Passenger Amount</h5>
                    <h2>₹{totalPassengerAmount}</h2>
                  </div>
                </Col>
              </Row>

              <div className="chart-card">
                <h4>My Bookings</h4>
                {bookings.length === 0 ? (
                  <p>No bookings found for your services.</p>
                ) : (
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Passengers</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td>{b.id}</td>
                          <td>{b.serviceName}</td>
                          <td>{b.fullName}</td>
                          <td>{b.pickupDate}</td>
                          <td>{b.passengers}</td>
                          <td>₹{b.price?.amount}</td>
                          <td>₹{(b.price?.amount || 0) * Number(b.passengers || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}