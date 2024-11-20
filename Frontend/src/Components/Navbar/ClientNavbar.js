import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    // Simulating a logged-in client for demonstration purposes
    const clientData = JSON.parse(localStorage.getItem("clientData"));

    if (clientData) {
      setIsClientLoggedIn(true);
      setClientName(clientData.name);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0d6efd" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          SIF Agency
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/client/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/aboutus">
                About us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isClientLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome, {clientName}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/client/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/client/login">
                      Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/join" className="btn btn-light">
                  Join now
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
