import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Sidebar from "../../components/Sidebar";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";

export default function DashboardPage({ sidebarOpen, setSidebarOpen }) {
  const [stats, setStats] = useState({
    customers: 0,
    travelAgencies: 0,
    bookings: 0,
    transportProviders: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customers = await axios.get("http://localhost:5002/customers");
      const travelAgencies = await axios.get(
        "http://localhost:5002/travelAgencies",
      );
      const bookings = await axios.get("http://localhost:5002/bookings");
      const transportProviders = await axios.get(
        "http://localhost:5002/transportProviders",
      );

      const counts = [
        customers.data.length,
        travelAgencies.data.length,
        bookings.data.length,
        transportProviders.data.length,
      ];

      setStats({
        customers: counts[0],
        travelAgencies: counts[1],
        bookings: counts[2],
        transportProviders: counts[3],
      });

      setBarData(counts);
      setPieData(counts);

      setRecentBookings(bookings.data.slice(0, 5));
    };

    fetchData();
  }, []);

  const barOptions = {
    chart: { id: "dashboard-bar" },
    xaxis: {
      categories: [
        "Customers",
        "Travel Agencies",
        "Bookings",
        "Transport Providers",
      ],
    },
  };

  const pieOptions = {
    labels: ["Customers", "Travel Agencies", "Bookings", "Transport Providers"],
  };

  let totalRevenue = 0;

  recentBookings.forEach((b) => {
    totalRevenue += b.price?.amount || 0;
  });

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={
          sidebarOpen
            ? "dashboard-container sidebar-open"
            : "dashboard-container"
        }
      >
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className="dashboard-title">Admin Dashboard</h2>
            </Col>

            <div className="stats-row mb-5">
              <div className="stat-card">
                <h5>Total customers</h5>
                <h2>{stats.customers}</h2>
              </div>

              <div className="stat-card">
                <h5>Travel Agencies</h5>
                <h2>{stats.travelAgencies}</h2>
              </div>

              <div className="stat-card">
                <h5>Bookings</h5>
                <h2>{stats.bookings}</h2>
              </div>

              <div className="stat-card">
                <h5>Transport Providers</h5>
                <h2>{stats.transportProviders}</h2>
              </div>
            </div>

            <div className="stats-row mb-5">
              <div className="stat-card">
                <h5>Total Revenue</h5>
                <h2>₹{totalRevenue.toLocaleString()}</h2>
              </div>
              <div className="stat-card">
                <h5>Active Bookings</h5>
                <h2>{recentBookings.filter((b) => b.fullName).length}</h2>
              </div>
              <div className="stat-card">
                <h5>Pending</h5>
                <h2>{recentBookings.filter((b) => !b.fullName).length}</h2>
              </div>
            </div>

            <div className="chart-row">
              <Row>
                <Col lg={6}>
                  <div className="chart-card">
                    <h4>System Overview</h4>
                    <Chart
                      options={barOptions}
                      series={[{ name: "Count", data: barData }]}
                      type="bar"
                      width="100%"
                      height={300}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="chart-card">
                    <h4>All Data</h4>
                    <Chart
                      options={pieOptions}
                      series={pieData}
                      type="pie"
                      width="100%"
                      height={300}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="chart-card mt-4">
              <h4>Recent Bookings</h4>
              <div className="table-responsive">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking, i) => (
                      <tr key={i}>
                        <td>{booking.serviceName}</td>
                        <td>{booking.fullName || "—"}</td>
                        <td>{booking.pickupDate || "—"}</td>
                        <td>₹{booking.price?.amount || 0}</td>
                        <td>
                          <span
                            className={
                              booking.fullName ? "badge green" : "badge yellow"
                            }
                          >
                            {booking.fullName ? "Confirmed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
