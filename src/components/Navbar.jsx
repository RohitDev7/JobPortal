import { Link } from "@tanstack/react-router";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavigationBar() {
    return (
        <Navbar expand="lg" className="main-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">TravelAgency</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <div className="nav-parent">
                            <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
                        </div>
                        <div className="nav-parent">
                            <Nav.Link as={Link} to="/service">
                Services
              </Nav.Link>
                        </div>
                        <div className="nav-parent">
                           <Nav.Link as={Link} to="/book/$id">
                My Bookings
              </Nav.Link>
                        </div>
                        <div className="nav-parent">
                            <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}