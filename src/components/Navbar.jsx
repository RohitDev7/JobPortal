import { Link } from "react-router-dom"; 
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar expand="lg" className="main-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">TravelAgency</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/service">Services</Nav.Link>
            <Nav.Link as={Link} to="/book/1">My Bookings</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}