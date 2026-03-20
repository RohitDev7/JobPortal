import React, { useEffect, useState } from "react"
import axios from "axios"
import Chart from "react-apexcharts"
import Sidebar from '../../components/Sidebar'
import { Col, Container, Row } from "react-bootstrap"

export default function DashboardPage({ sidebarOpen, setSidebarOpen }) {

    const [stats, setStats] = useState({
        customers: 0,
        travelAgencies: 0,
        bookings: 0,
        transportProviders: 0
    })

    
    const [barData, setBarData] = useState([])
    const [pieData, setPieData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const customers = await axios.get("http://localhost:5002/customers")
            const travelAgencies = await axios.get("http://localhost:5002/travelAgencies")
            const bookings = await axios.get("http://localhost:5002/bookings")
            const transportProviders = await axios.get("http://localhost:5002/transportProviders")
            // const analytics = await axios.get("http://localhost:5002/analytics")

            const counts = [
                customers.data.length,
                travelAgencies.data.length,
                bookings.data.length,
                transportProviders.data.length
            ]

            setStats({
                customers: counts[0],
                travelAgencies: counts[1],
                bookings: counts[2],
                transportProviders: counts[3]
            })

            setBarData(counts)
            setPieData(counts)

        }

        fetchData()

    }, [])

    const barOptions = {
        chart: { id: "dashboard-bar" },
        xaxis: {
            categories: ["Customers", "Travel Agencies", "Bookings", "Transport Providers"]
        }
    }

    const pieOptions = {
        labels: ["Customers", "Travel Agencies", "Bookings", "Transport Providers"]
    }
  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
  
     <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
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

                {/* <div className="d-flex justify-content-between">
                    <p className="p-0 m-0">Active  (2)</p>  <p className="p-0 m-0">Inactive  (2)</p> 
                </div> */}
            </div>

            <div className="stat-card">
                <h5>Transport Providers</h5>
                <h2>{stats.transportProviders}</h2>
            </div>

        </div>

        <div className="chart-row">

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

        </div>
        </Row>
        </Container>
    </div>
    </>
  );
}

