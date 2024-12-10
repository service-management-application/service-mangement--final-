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
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
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
