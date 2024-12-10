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
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationError, setReservationError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // For button state

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
          `http://localhost:4000/providers/get/${providerId}`
        );
        setProvider(response.data);
      } catch (err) {
        console.error("Error fetching provider data:", err);
        setError("Failed to load provider information.");
      } finally {
        setLoading(false);
      }
    };

    // Check if the user is logged in (i.e., check for the client token in localStorage)
    const token = localStorage.getItem("ClientToken");
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true

    fetchProvider();
  }, []);

  const handleReservation = async () => {
    if (isProcessing) return; // Prevent duplicate submissions
    setIsProcessing(true);

    const clientData = JSON.parse(localStorage.getItem("clientData"));
    const clientId = clientData ? clientData.id : null;
    const providerId = localStorage.getItem("selectedProviderId");

    if (!clientId) {
      setReservationError("Client not logged in.");
      setIsProcessing(false);
      return;
    }

    try {
      const reservationData = {
        client: clientId,
        provider: providerId,
      };

      // Make the API request to create the reservation
      const response = await axios.post("http://localhost:4000/reservations/create", reservationData);

      // If reservation is created successfully
      setReservationSuccess(true);
      setReservationError(""); // Clear error

      // Change button text
      setIsProcessing(false); // Stop processing (enable button again)
    } catch (err) {
      console.error("Error creating reservation:", err);
      setReservationError("Already reserved.");
      setIsProcessing(false);
    }
  };

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
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{provider.firstName + " " + provider.lastName}</h1>
                <ul className="fs-5 mb-5">
                  <li>Price: <span>{provider.price}</span> $/HR</li>
                  <li>Phone number: <span>{provider.phoneNumber}</span></li>
                  <li>Location: <span>{provider.state || "N/A"}</span></li>
                  {provider.activity_description && (
                    <li>Description: <span>{provider.activity_description}</span></li> // Added description field
                  )}
                </ul>
                <div className="d-flex">
                  <Link
                    style={{ marginRight: "10px" }}
                    className="btn btn-outline-dark flex-shrink-0"
                    to="/provider/Providermessanger"
                  >
                    Contact Provider
                  </Link>

                  {isLoggedIn && (
                    <button
                      className="btn btn-outline-dark flex-shrink-0"
                      onClick={handleReservation}
                      disabled={isProcessing || reservationSuccess}
                    >
                      {reservationSuccess ? "Already Reserved" : "Reserve"}
                    </button>
                  )}
                </div>
                {reservationSuccess && (
                  <p className="text-success">Reservation made successfully!</p>
                )}
                {reservationError && (
                  <p className="text-danger">{reservationError}</p>
                )}
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
