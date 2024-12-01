import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProviderNavbar() {
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState(false);
  const [providerName, setProviderName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching provider data from localStorage
    const storedData = localStorage.getItem("providerData");
    const providerData = storedData ? JSON.parse(storedData) : null;

    if (providerData) {
      setIsProviderLoggedIn(true);
      setProviderName(providerData.firstName || "Provider");
    } else {
      setIsProviderLoggedIn(false);
    }
  }, []);

  // Handle log out
  const handleLogOut = () => {
    localStorage.removeItem("providerToken"); // Remove token
    localStorage.removeItem("providerData"); // Remove provider data
    setIsProviderLoggedIn(false); // Update state
    navigate("/LoginProvider"); // Redirect to home or login page
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0d6efd" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/provider/providerhome">
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
              <Link className="nav-link text-light" aria-current="page" to="/provider/ProviderHome">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/provider/providercategories">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/provider/aboutus">
                About us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isProviderLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome, {providerName}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogOut}>
                      Log Out
                    </button>
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
}
