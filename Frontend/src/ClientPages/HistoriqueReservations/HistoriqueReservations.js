import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const HistoriqueReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch client data from localStorage
  const clientData = JSON.parse(localStorage.getItem('clientData'));
  const clientId = clientData ? clientData.id : null;

  // Use the navigate function to handle the redirection
  const navigate = useNavigate();

  useEffect(() => {
    // If no client ID is found, show an error message
    if (!clientId) {
      setError("Client not logged in or no client data found.");
      setLoading(false);
      return;
    }

    // Fetch reservations for the client from the backend
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

  // If loading, display a loading message
  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // If no reservations, display a message
  if (reservations.length === 0) {
    return <div className="alert alert-warning">No reservations found.</div>;
  }

  // Table displaying reservations
  return (
    <div className="container mt-5">
      <h2>Your Reservations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Activity Details</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.provider.firstName} {reservation.provider.lastName}</td>
              <td>{reservation.activityDetails}</td>
              <td>{reservation.status}</td>
              <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Button to navigate back to Client/Profile */}
      <button 
        className="btn btn-primary mt-4" 
        onClick={() => navigate('/client/profile')}
      >
        Back to Profile
      </button>
    </div>
  );
};

export default HistoriqueReservations;
