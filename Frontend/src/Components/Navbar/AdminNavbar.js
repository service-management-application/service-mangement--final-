import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

export default function AdminNavbar() {
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
            <NavDropdown
              title={
                <>
                  <PersonCircle size={20} className="me-2" /> Hello
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/admin/adminprofile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/adminlogin">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
