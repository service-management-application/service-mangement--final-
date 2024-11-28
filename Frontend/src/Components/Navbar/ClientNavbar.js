import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const [clientName, setClientName] = useState("");
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    // Check if client data exists in localStorage
    const clientData = JSON.parse(localStorage.getItem("clientData"));
    if (clientData) {
      setIsClientLoggedIn(true);
      setClientName(clientData.name);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem("clientData");
    setIsClientLoggedIn(false);
    setClientName("");
    navigate("/"); // Redirect to the home page after logout
  };

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
              <Link className="nav-link text-light" to="/client/aboutus">
                About us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isClientLoggedIn ? (
              <>
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
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              </>
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
