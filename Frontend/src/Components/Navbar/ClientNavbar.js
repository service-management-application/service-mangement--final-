import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const clientData = localStorage.getItem("clientData");

    if (token && clientData) {
      setIsLoggedIn(true);
      setClientName(JSON.parse(clientData).firstName);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("clientData");
    setIsLoggedIn(false);
    setClientName(""); // Clear client name
    navigate("/"); // Navigate to the homepage
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0d6efd" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          SIF Agency
        </Link>

        {/* Mobile toggle button */}
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
          {/* Left side navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/client/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/client/aboutus">About us</Link>
            </li>
          </ul>

          {/* Authentication links */}
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome, {clientName}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/client/profile">Profile</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/join" className="btn btn-light">Join now</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
