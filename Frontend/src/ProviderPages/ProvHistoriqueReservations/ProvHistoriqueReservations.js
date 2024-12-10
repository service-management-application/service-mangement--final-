import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProvHistoriqueReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const providerData = JSON.parse(localStorage.getItem("providerData"));
  const providerId = providerData ? providerData.id : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!providerId) {
      setError("Provider not logged in or no provider data found.");
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/reservationservices/provider/${providerId}`
        );
        setReservations(response.data.reservations || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to fetch reservations.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [providerId]);

  const handleCancelReservation = async (reservationId) => {
    try {
      await axios.delete(
        `http://localhost:4000/reservationservices/${reservationId}`
      );
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation._id !== reservationId
        )
      );
      setSuccessMessage("Reservation cancelled successfully.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error cancelling reservation:", err);
      setError("Failed to cancel reservation.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      case "rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <h2 className="mb-4 text-center">Your Reservations</h2>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Client</th>
                <th>Service Description</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>
                      {reservation.Service?.Client
                        ? `${reservation.Service.Client.firstName} ${reservation.Service.Client.lastName}`
                        : "Client details not available"}
                    </td>
                    <td>
                      {reservation.Service?.description || "No description"}
                    </td>
                    <td>
                      <span className={getStatusClass(reservation.status)}>
                        {reservation.status || "Unknown"}
                      </span>
                    </td>
                    <td>
                      {new Date(reservation.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleCancelReservation(reservation._id)
                        }
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/Provider/ProfilProvider")}
        >
          Back to Profile
        </button>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default ProvHistoriqueReservations;
