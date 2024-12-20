import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";

import axios from "axios";
import { toast } from "react-toastify";

export default function ProfilProvider() {
  const [providerData, setProviderData] = useState(null);
  const [providerDatacat, setProviderDatacat] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("providerData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProviderData(parsedData);
      setEditableData(parsedData);
      fetchReservations(parsedData.id);
      fetchProviderCategory(parsedData.id);
    }
  }, []);

  const fetchProviderCategory = async (providerId) => {
    try {
      const response = await axios.get(`hhttps://service-mangement-final-rxc3.onrender.com/providers/get/${providerId}`);
      if (response.status === 200) {
        setProviderDatacat(response.data); // Assuming the API returns category data
      }
    } catch (error) {
      console.error("Error fetching provider category:", error);
      toast.error("Error fetching provider category. Please try again.");
    }
  };

  const fetchReservations = async (providerId) => {
    try {
      const response = await axios.get(`hhttps://service-mangement-final-rxc3.onrender.com/reservations/provider/${providerId}`);
      if (response.status === 200) {
        setReservations(response.data.reservations || []); // Ensure reservations is always an array
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Error fetching reservations. Please try again.");
    }
  };

  const handleAccept = async (reservationId) => {
    try {
      const response = await axios.put(`hhttps://service-mangement-final-rxc3.onrender.com/reservations/accept/${reservationId}`, {
        providerId: providerData.id,
      });
      if (response.status === 200) {
        toast.success("Reservation accepted!");
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation._id === reservationId
              ? { ...reservation, status: "APPROVED" }
              : reservation
          )
        );
      }
    } catch (error) {
      console.error("Error accepting reservation:", error);
      toast.error("Error accepting reservation. Please try again.");
    }
  };

  const handleReject = async (reservationId) => {
    try {
      const response = await axios.put(`hhttps://service-mangement-final-rxc3.onrender.com/reservations/reject/${reservationId}`, {
        providerId: providerData.id,
      });
      if (response.status === 200) {
        toast.success("Reservation rejected!");
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation._id === reservationId
              ? { ...reservation, status: "REJECTED" }
              : reservation
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting reservation:", error);
      toast.error("Error rejecting reservation. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setProviderData(editableData);
    localStorage.setItem("providerData", JSON.stringify(editableData));

    try {
      const response = await axios.put(
        `hhttps://service-mangement-final-rxc3.onrender.com/providers/update/${editableData.id}`,
        editableData
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile. Please try again.");
    }
  };

  if (!providerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-light rounded-3 p-3">
                  <li className="breadcrumb-item active" aria-current="page">
                    Provider Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mt-2">
                    {providerData.firstName} {providerData.lastName}
                  </h5>
                  <p className="text-muted">{providerDatacat?.category?.title || "No Category"}</p>

                  <Link to="/Provider/ProvHistoriqueReservations">
                    <button className="btn btn-secondary">
                      View Historic Reservation
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {[{ label: "First Name", key: "firstName" }, { label: "Last Name", key: "lastName" }, { label: "Email", key: "email" }, { label: "Phone", key: "phoneNumber" }, { label: "State", key: "state" }, { label: "Description", key: "activity_description" }, { label: "Price", key: "price" }].map(
                    ({ label, key }) => (
                      <div key={key}>
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">{label}</p>
                          </div>
                          <div className="col-sm-9">
                            {isEditing ? (
                              <input
                                type="text"
                                name={key}
                                value={editableData[key]}
                                onChange={handleInputChange}
                                className="form-control"
                              />
                            ) : (
                              <p className="text-muted mb-0">{providerData[key]}</p>
                            )}
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  )}
                  <div className="d-flex justify-content-end mt-3">
                    {isEditing ? (
                      <button className="btn btn-success" onClick={handleSaveChanges}>
                        Save Changes
                      </button>
                    ) : (
                      <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Request service from the client */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5>Client requests</h5>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations && reservations.length > 0 ? (
                      reservations.map((reservation) => (
                        <tr key={reservation._id}>
                          <td>{reservation.client ? reservation.client.firstName : "Unknown"}</td>
                          <td>{reservation.client ? reservation.client.address : "Unknown"}</td>
                          <td>{reservation.client ? reservation.client.phone : "Unknown"}</td>
                          <td>{reservation.client ? reservation.client.email : "Unknown"}</td>
                          <td>{reservation.status}</td>
                          <td>
                            <button className="btn btn-sm btn-success" onClick={() => handleAccept(reservation._id)}>
                              Accept
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleReject(reservation._id)}>
                              Decline
                            </button>
                            <Link className="btn btn-sm btn-secondary" to="/provider/Providermessanger">
                              Contact
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No requests yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
