import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useContext } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext"

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         if (role === "customer") {
    //             const res = await axios.get(`http://localhost:5002/customers`, {
    //                 email: email,
    //                 password: password
    //             })

    //             if (res.data.length > 0) {
    //                 alert("Customer Login Successful");
    //                 navigate({ to: "/dashboard" });
    //             } else {
    //                 setError("Invalid email or password");
    //                 alert("Invalid email or password");
    //             }


    //             console.log(res, "Customer Login Successful!!!")

    //         } else if (role === "agency") {
    //             const res = await axios.get(`http://localhost:5002/travelAgencies`, {
    //                 email: email,
    //                 password: password
    //             })

    //             if (res.data.length > 0) {
    //                 alert("Agency Login Successful ")
    //                 navigate({ to: "/dashboard" });
    //             } else {
    //                 setError("Invalid email or password");
    //                 alert("Invalid email or password");
    //             }

    //             console.log(res, "Agency Login Successful!!!")
    //         } else {
    //             setError("Please select a role");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError("Login failed");
    //     }
    // };


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (role === "customer") {

            const res = await axios.get(`http://localhost:5002/customers`);

            const user = res.data.find(
                (item) =>
                    item.email.toLowerCase() === email.trim().toLowerCase() &&
                    item.password === password.trim()
            );

            console.log(user, "Customer");

            if (user) {
                login(user);
                alert("Customer Login Successful");
                navigate({ to: "/dashboard" });
            } else {
                setError("Invalid email or password");
            }

        } else if (role === "agency") {

            const res = await axios.get(`http://localhost:5002/travelAgencies`);

            const user = res.data.find(
                (item) =>
                    item.email.toLowerCase() === email.trim().toLowerCase() &&
                    item.password === password.trim()
            );

            console.log(user, "Agency");

            if (user) {
                login(user);
                alert("Agency Login Successful");
                navigate({ to: "/dashboard" });
            } else {
                setError("Invalid email or password");
            }

        } else {
            setError("Please select a role");
        }

    } catch (error) {
        console.error(error);
        setError("Login failed");
    }
};
    return (
        <>
           
            <div className='job-details-page register-pages py-5'>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <div className="signup-card">
                                <h2 className="signup-title">Login Account</h2>

                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Label>Email Address *</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Col>

                                        <Col md={6} className="mb-3">
                                            <Form.Label>Password *</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Col>
   <Col md={12} className="mb-3">
                                        <Form.Group className="mb-3">
                                        <Form.Label>Select Role</Form.Label>
                                        <Form.Select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="customer">Customer</option>
                                            <option value="agency">Agency</option>
                                        </Form.Select>
                                    </Form.Group>
                                    </Col>
                                    </Row>

                                    

                                    <button type="submit" className="signup-btn">
                                        Login
                                    </button>

                                    {error && <p className="text-danger mt-2">{error}</p>}
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
             <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}