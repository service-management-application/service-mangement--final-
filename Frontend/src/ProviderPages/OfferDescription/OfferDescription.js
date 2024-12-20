import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

export default function OfferDescription() {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationError, setReservationError] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const serviceId = localStorage.getItem("selectedServiceId");

      if (!serviceId) {
        setError("No service selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://service-mangement-final.onrender.com/services/get/${serviceId}`
        );
        setService(response.data);

        // Check if the service is already reserved
        const reservationCheck = await axios.get(
          `https://service-mangement-final.onrender.com/reservationservices/check-reservation/${serviceId}`
        );

        if (reservationCheck.data.isReserved) {
          setIsReserved(true);
        }
      } catch (err) {
        console.error("Error fetching service data:", err);
        setError("Failed to load service information.");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("providerToken");
    setIsLoggedIn(!!token);

    fetchService();
  }, []);

  const handleReservation = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const providerData = JSON.parse(localStorage.getItem("providerData"));
    const providerId = providerData ? providerData.id : null;
    const ServiceId = localStorage.getItem("selectedServiceId");

    if (!providerId) {
      setReservationError("Provider not logged in.");
      setIsProcessing(false);
      return;
    }

    try {
      const reservationData = {
        Service: ServiceId,
        provider: providerId,
      };

      await axios.post(
        "https://service-mangement-final.onrender.com/reservationservices/create",
        reservationData
      );

      setReservationSuccess(true);
      setReservationError("");
      setIsReserved(true); // Mark the service as reserved
    } catch (err) {
      console.error("Error creating reservation:", err);
      setReservationError("Failed to reserve activity.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ProviderNavbar />

      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <Link to="/provider/providercategories" className="btn btn-secondary mb-3">
            Go Back
          </Link>

          <div className="row gx-4 gx-lg-5 align-items-center">
            {service ? (
              <>
                <div className="col-md-6">
                  <div className="card text-center">
                    <div className="card-body">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle mb-3"
                        style={{ width: "150px" }}
                      />
                      <h5 className="card-title">
                        {service.Client?.firstName || "N/A"} {service.Client?.lastName || ""}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <h1 className="display-5 fw-bolder">Offer Details</h1>
                  <div className="card mb-4">
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li>
                          <strong>Email: </strong> {service.Client?.email || "N/A"}
                        </li>
                        <li>
                          <strong>Price: </strong> {service.price || "N/A"} $
                        </li>
                        <li>
                          <strong>Location: </strong> {service.state || "N/A"}
                        </li>
                        <li>
                          <strong>Description: </strong> {service.description || "N/A"}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="d-flex">
                    <Link
                      className="btn btn-outline-dark flex-shrink-0"
                      to="/provider/Providermessanger"
                    >
                      Contact Client
                    </Link>

                    <div style={{ margin: "0 10px" }}></div>

                    {isLoggedIn && !isReserved && (
                      <button
                        className="btn btn-outline-dark flex-shrink-0"
                        onClick={handleReservation}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Reserve"}
                      </button>
                    )}

                    {isReserved && (
                      <button className="btn btn-outline-dark flex-shrink-0" disabled>
                        Already Reserved
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
              </>
            ) : (
              <p>No client information found.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
