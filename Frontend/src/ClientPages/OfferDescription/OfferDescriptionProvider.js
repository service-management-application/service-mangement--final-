import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClientNavbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";

export default function OfferDescription() {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      const providerId = localStorage.getItem("selectedProviderId");

      if (!providerId) {
        setError("No provider selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/providerS/get/${providerId}`
        );
        setProvider(response.data);
      } catch (err) {
        console.error("Error fetching provider data:", err);
        setError("Failed to load provider information.");
      } finally {
        setLoading(false);
      }
    };

    // Check if the user is logged in (i.e., check for the provider token in localStorage)
    const token = localStorage.getItem("ClientToken");
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true

    fetchProvider();
  }, []);

  return (
    <div>
      <ClientNavbar />

      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <Link to="/client/ProfilesListInCat" className="btn btn-secondary mb-3">
            Go Back
          </Link>

          {loading ? (
            <p>Loading provider information...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : provider ? (
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <div className="card text-center">
                  <div className="card-body">
                    <img
                      src={provider.avatar || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                      alt="avatar"
                      className="rounded-circle mb-3"
                      style={{ width: "150px" }}
                    />
                    <p className="text-muted mb-1">
                      {provider.firstName} {provider.lastName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{provider.category.title || "Provider's Service"}</h1>
                <ul className="fs-5 mb-5">
                  <li>
                    Price: <span>{provider.price || "INBOX for the price " }</span>DT/HR
                  </li>
                  <li>
                    Location: <span>{provider.state || "N/A"}</span>
                  </li>
                  <li>Description:</li>
                </ul>
                <p className="lead">{provider.activity_description || "No description provided."}</p>
                <div className="d-flex">
                  <Link
                    className="btn btn-outline-dark flex-shrink-0"
                    to="/provider/Providermessanger"
                  >
                    <i className="bi-cart-fill me-1"></i>
                    Contact Client
                  </Link>
                  {/* Conditionally render the Reserve button based on login status */}
                  {isLoggedIn && (
                    <Link
                      className="btn btn-outline-dark flex-shrink-0"
                      to="/provider/Providermessanger"
                    >
                      <i className="bi-cart-fill me-1"></i>
                      Reserver
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>No provider information found.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
