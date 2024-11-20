import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Join = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <h1 className="mb-4">Join as a client or freelancer</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ maxWidth: "500px" }}>
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="text-dark mb-3" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                I'm a client, looking for a service
              </Card.Title>
              <Link to="/Registerclient" className="text-decoration-none w-100">
                <Button variant="outline-dark" className="w-100 d-flex justify-content-between align-items-center" style={{marginTop: "30px"}}>
                  Join as Client
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ maxWidth: "500px" }}>
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="text-dark mb-3" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                I'm a service provider, looking for work
              </Card.Title>
              <Link to="/RegisterProvider" className="text-decoration-none w-100">
                <Button variant="outline-dark" className="w-100 d-flex justify-content-between align-items-center">
                  Join as Provider
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/Login" className="text-decoration-none fw-bold text-dark">
          Log in
        </Link>
      </p>
    </Container>
  );
};

export default Join;
