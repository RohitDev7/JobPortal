import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function NavigationBar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };
    return (

        <Navbar
  expand="lg"
  className={`main-navbar 
    ${sidebarOpen ? "sidebar-open" : "sidebar-closed"} 
    ${user ? "logged-in" : ""}`}
>
            <Container>
                <Navbar.Brand as={Link} to="/">TravelAgency</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    
                        {/* <Nav.Link as={Link} to="/login">Login</Nav.Link> */}

                        {user ?(
                        <div className="header-right">
                            <div className="profile-area" onClick={() => setOpen(!open)}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2-j72Jxr_A-mqdurEKlaIC_4zuXaKnD72A&s"
                                    alt="profile"
                                    className="profile-img"
                                />
                                <span className="profile-name">{user?.name}</span>
                            </div>

                            {open && (
                                <div className="profile-dropdown">
                                    <button onClick={() => navigate("/user")}>User</button>
                                    {/* <button onClick={() => navigate("/settings/profile")}>Profile</button>
            <button onClick={() => navigate("/settings")}>Settings</button> */}
                                    <button className="logout-btn" onClick={logout}>Logout</button>
                                </div>
                            )}
                        </div>
                        ):(
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/service">Services</Nav.Link>
                        <Nav.Link as={Link} to="/book">My Bookings</Nav.Link>
                             <Nav.Link as={Link} to="/login">Login</Nav.Link>
                             </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}