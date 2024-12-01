import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <h1 className="mb-4">Are youa client or service provider</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="mb-4" style={{width : "300px"}}>
          <Card className="border-0 shadow-lg h-100">
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="text-dark mb-3" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                I'm a client
              </Card.Title>
              <Link to="/Loginclient" className="text-decoration-none w-100">
                <Button variant="outline-dark" className="w-100 d-flex justify-content-between align-items-center" style={{marginTop: "30px"}}>
                  Join as Client
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4" style={{width : "300px"}}>
          <Card className="border-0 shadow-lg h-100" >
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="text-dark mb-3" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                I'm a service provider
              </Card.Title>
              <Link to="/LoginProvider" className="text-decoration-none w-100">
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
        DOn't have an account? {"  "}  
        <Link to="/Join" className="text-decoration-none fw-bold text-dark">
           Register now
        </Link>
      </p>
    </Container>
  );
};

export default Login;
