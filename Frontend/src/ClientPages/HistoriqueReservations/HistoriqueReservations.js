import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HistoriqueReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(null); // For handling cancel success
  const [cancelError, setCancelError] = useState(null); // For handling cancel error

  const clientData = JSON.parse(localStorage.getItem('clientData'));
  const clientId = clientData ? clientData.id : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!clientId) {
      setError("Client not logged in or no client data found.");
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/reservations/client/${clientId}`);
        setReservations(response.data.reservations);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch reservations.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [clientId]);

  const deleteReservation = async (reservationId) => {
    try {
      // Retrieve the clientId from localStorage
      const clientData = JSON.parse(localStorage.getItem('clientData'));
      const clientId = clientData ? clientData.id : null;
      const providerId = "your_provider_id_here"; // Replace with the actual provider ID (could be passed as prop or fetched)
  
      if (!clientId) {
        setCancelError("Client not logged in or no client data found.");
        return;
      }
  
      // Sending clientId and providerId as query params
      const response = await axios.delete(`http://localhost:4000/reservations/delete/${reservationId}`, {
        params: { clientId, providerId }, // Sending clientId and providerId in the query params
      });
  
      // On successful cancellation, remove the reservation from the UI
      setReservations(reservations.filter(reservation => reservation._id !== reservationId)); // Remove the canceled reservation from the list
      setCancelSuccess("Reservation canceled successfully.");
      setCancelError(null);
    } catch (err) {
      console.error(err);
      setCancelError("Failed to cancel reservation.");
      setCancelSuccess(null);
    }
  };
  
  

  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  if (reservations.length === 0) {
    return <div className="alert alert-warning text-center mt-5">No reservations found.</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center mb-4">Your Reservations</h2>

        {cancelSuccess && (
          <div className="alert alert-success text-center">{cancelSuccess}</div>
        )}
        {cancelError && (
          <div className="alert alert-danger text-center">{cancelError}</div>
        )}

        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Provider</th>
              <th>Activity Details</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th> {/* Add actions column */}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.provider.firstName} {reservation.provider.lastName}</td>
                <td>{reservation.provider.activity_description}</td>
                <td>
                  <span
                    className={`badge ${
                      reservation.status.toLowerCase() === 'approved'
                        ? 'bg-success'
                        : reservation.status.toLowerCase() === 'rejected'
                        ? 'bg-danger'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
                <td>
                  {reservation.status.toLowerCase() !== 'cancelled' && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteReservation(reservation._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate('/client/profile')}
          >
            Back to Profile
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoriqueReservations;
