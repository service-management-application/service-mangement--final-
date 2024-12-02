import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("AdminToken");
    const adminData = localStorage.getItem("adminData");

    if (token && adminData) {
      setIsAdminLoggedIn(true);
      setAdminName(JSON.parse(adminData).firstName);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("adminData");
    setIsAdminLoggedIn(false);
    setAdminName("");
    navigate("/admin/adminlogin");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/admin/dashboard">SIF Agency</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin/dashboard">Home</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isAdminLoggedIn ? (
              <NavDropdown
                title={
                  <>
                    <PersonCircle size={20} className="me-2" />
                    Welcome, {adminName}
                  </>
                }
                id="admin-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/admin/adminlogin" className="btn btn-light">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
